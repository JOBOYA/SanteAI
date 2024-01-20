<template>
  <div ref="graph" class="graph-container"></div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'CurvedPathsGraph',
  data() {
    return {
      width: 700,
      height: 400,
      startPoint: { x: 100, y: 300 },
      endPointA: { x: 700, y: 150 },
      endPointB: { x: 700, y: 450 },
      controlPoint1A: { x: 300, y: 50 },
      controlPoint2A: { x: 600, y: 50 },
      controlPoint1B: { x: 300, y: 550 },
      controlPoint2B: { x: 600, y: 550 },
      animationDuration: 2000,
    };
  },
  mounted() {
    const svg = d3.select(this.$refs.graph)
      .append('svg')
      .attr('width', '100%') // Utilisation de '100%' pour la largeur pour s'adapter aux mobiles
      .attr('height', this.height);

    const lineGenerator1 = d3.line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveNatural);
    const lineGenerator2 = d3.line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveNatural);

    // Ajuster les points de contrôle pour créer un croisé
    this.controlPoint1A = { x: this.startPoint.x + 100, y: this.startPoint.y - 100 }; // Courbe vers le haut
    this.controlPoint1B = { x: this.startPoint.x + 100, y: this.startPoint.y + 100 }; // Courbe vers le bas
    // Les points de contrôle 2A et 2B sont ajustés pour maintenir la fluidité de la courbe
    this.controlPoint2A = { x: this.endPointA.x - 200, y: this.endPointA.y + 100 };
    this.controlPoint2B = { x: this.endPointB.x - 200, y: this.endPointB.y - 100 };

    const pathData1 = [this.startPoint, this.controlPoint1A, this.controlPoint2A, this.endPointA];
    const pathData2 = [this.startPoint, this.controlPoint1B, this.controlPoint2B, this.endPointB];

    svg.append('path')
      .attr('d', lineGenerator1(pathData1))
      .attr('fill', 'none')
      .attr('stroke', 'green')
      .attr('stroke-width', 2);
    svg.append('path')
      .attr('d', lineGenerator2(pathData2))
      .attr('fill', 'none')
      .attr('stroke', 'green')
      .attr('stroke-width', 2);

    const bounds = svg.node().getBBox();
    const margin = 30; // Ajuster la marge si nécessaire

    // Utilisation de viewBox pour assurer la réactivité
    svg.attr('viewBox', `${bounds.x - margin} ${bounds.y - margin} ${bounds.width + 3 * margin} ${bounds.height + 3 * margin}`);

    this.$nextTick(() => {
      const path1 = svg.select('path:first-child');
      const path2 = svg.select('path:last-child');

      if (path1.node() && path2.node()) {
        this.animatePath(path1, () => {
          this.addBlinkingPoint(svg, this.endPointA, "réussi");
        });
        this.animatePath(path2, () => {
          this.addBlinkingPoint(svg, this.endPointB, "réussi");
        });
      }

      this.addBlinkingPoint(svg, this.startPoint, "Analyse cours...");
      this.addIntermediatePoint(svg, pathData1, "Requête traitée par l'IA");
    });
  },
  methods: {
    animatePath(path, callback) {
      const totalLength = path.node().getTotalLength();
      path
        .attr('stroke-dasharray', totalLength + " " + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0)
        .on('end', callback);
    },
    addBlinkingPoint(svg, point, label) {
      svg.append('circle')
        .attr('cx', point.x)
        .attr('cy', point.y)
        .attr('r', 4)
        .attr('fill', 'white')
        .classed('blinking-point', true);
      svg.append("text")
        .attr("x", point.x + 10)
        .attr("y", point.y - 10)
        .text(label)
        .attr("fill", "white") // Changer la couleur du texte
        .attr("font-size", "15px") // Augmenter la taille de la police
        .attr("font-family", "Arial, sans-serif"); // Choisir une police
    },
    addIntermediatePoint(svg, pathData, label) {
      const intermediatePoint = pathData[2]; // exemple, vous pouvez ajuster
      this.addBlinkingPoint(svg, intermediatePoint, label);
    }
  },
};
</script>

<style>
.blinking-point {
  animation: blink-animation 1s infinite;
}

@keyframes blink-animation {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

/* Ajouter des styles spécifiques pour les mobiles */
@media (max-width: 767px) {
  /* Styles pour les mobiles ici */
  .graph-container {
    width: 100%;
  }
}
</style>
