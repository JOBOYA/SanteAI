<template>
  <div class="banner" :style="backgroundStyle">
    <div 
      class="banner-item" 
      v-for="(item, index) in bannerItems" 
      :key="index"
      @mousemove="updateTooltip($event, index)"
      @mouseleave="hideTooltip(index)"
    >
      <div class="icon-container">
        <img :src="require('@/assets/' + item.icon)" :alt="item.title">
      </div>
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
      <span 
        class="tooltip" 
        :style="item.tooltipStyle"
      >
        {{ item.tooltip }}
      </span>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      backgroundStyle: {
        color: 'white',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '10px',
        width: '100%',
        boxSizing: 'border-box'
      },
      bannerItems: [
        {
         icon: 'decentralized.svg',
          title: 'Évaluation Personnalisée',
          description: 'Répondez à quelques questions et obtenez une évaluation de santé adaptée spécialement pour vous.',
          tooltip: 'Informations sur l\'évaluation personnalisée',
          tooltipStyle: { display: 'none' }
        },
        {
          icon: 'scalable.svg',
          title: 'Insights Précis',
          description: 'Notre IA analyse vos réponses pour fournir des insights précieux sur votre santé.',
          tooltip: 'Détails sur les insights',
          tooltipStyle: { display: 'none' }
        },
        {
          icon: 'security-audit.svg',
          title: 'Confidentialité & Sécurité',
          description: 'Vos données sont en sécurité avec nous. Nous donnons la priorité à votre vie privée et à la confidentialité.',
          tooltip: 'Infos sur la sécurité',
          tooltipStyle: { display: 'none' }
        }
      ]
    };
  },
  methods: {
    updateTooltip(event, index) {
      const boundingRect = event.currentTarget.getBoundingClientRect();
      const tooltipX = event.clientX - boundingRect.left; // position X relative à l'élément
      const tooltipY = event.clientY - boundingRect.top; // position Y relative à l'élément
      const item = this.bannerItems[index];
      item.tooltipStyle = {
        display: 'block',
        position: 'absolute',
        left: `${tooltipX}px`,
        top: `${tooltipY}px`,
        transform: 'translate(-50%, -100%)',
        opacity: 1,
        pointerEvents: 'none',
        // Assurez-vous que le tooltip ne dépasse pas les bords de l'élément
        visibility: tooltipX < 0 || tooltipY < 0 ? 'hidden' : 'visible'
      };
    },
    hideTooltip(index) {
      const item = this.bannerItems[index];
      item.tooltipStyle = {
        display: 'none'
      };
    }
  }
}
</script>

<style>

.tooltip {
  transition: opacity 0.3s;
  opacity: 0;
  position: absolute;
  pointer-events: none;
  /* ... autres styles de tooltip ... */
}

.banner {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  flex-wrap: wrap;
}

.icon-container {
  background-color: #0b0915;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 60px;
  max-height: 60px;
  width: 100%;
  height: 100%;
}

.banner-item {
  width: auto;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
}

.banner-item img {
  width: 50px;
  margin-bottom: 10px;
}

.banner-item h3 {
  font-size: 1.25rem;
  margin: 0.5rem 0;
  color: black;
}

.banner-item p {
  text-align: center;
  color: black;
  margin: 0;
  font-size: 1rem;
}
.tooltip {
  background-color: #1f1f1fc2; /* Couleur de fond de la vignette */
 
  color: white;
  
  padding: 15px 30px 30px;
  border-radius: 6px; /* Bords arrondis pour la vignette */
  font-size: 0.875rem; /* Taille de la police de la vignette */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25); /* Ombre portée pour donner de la profondeur */
  transition: opacity 0.3s, transform 0.3s;
  transform: translateX(-50%) translateY(-10px) scale(1); /* Ajusté pour que la bulle apparaisse plus grande dès le début */
  transform-origin: bottom center;
  opacity: 0;
  pointer-events: none;
  white-space: nowrap; /* Gardez le texte sur une seule ligne */
  z-index: 10; /* Assurez-vous que la vignette est au-dessus des autres éléments */
  font-family: 'IBM Plex Mono', 'monospace'; /* Police spécifique pour la vignette */
  position: absolute; /* Nécessaire pour positionner la vignette par rapport au parent */
  bottom: 100%; /* Positionnez en bas de l'élément parent */
  left: 50%; /* Commencez à la moitié de l'élément parent */
  margin-bottom: 20px; /* Espace entre la vignette et l'élément parent */
}

.banner-item:hover .tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-10px); /* Afficher et décaler légèrement la vignette vers le haut */
}

@media (max-width: 768px) {
  .banner-item {
    flex-basis: 100%;
    padding: 10px 0;
  }

  .banner-item h3 {
    font-size: 1rem;
  }

  .banner-item p {
    font-size: 0.9rem;
  }

  .icon-container {
    padding: 8px;
    max-width: 50px;
    max-height: 50px;
  }

  .banner-item img {
    width: 40px;
    height: auto;
  }
}
</style>
