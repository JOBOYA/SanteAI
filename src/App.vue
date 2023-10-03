<template>
  <div>
    <div id="question" :style="{ opacity: opacity }">
      <span 
        v-for="(letter, index) in displayedQuestion.split('')" 
        :key="index" 
        class="fixed-width"
      >
        {{ letter }}
      </span>
    </div>
    <input v-model="input" @keyup.enter="nextQuestion" />
  </div>
</template>




<script>
import questions from './data/questions.js'

export default {
  data() {
    return {
      questions: questions,
      currentQuestionIndex: 0,
      input: '',
      currentQuestion: '',
      displayedQuestion: '',
      opacity: 1
    }
  },
  mounted() {
    this.currentQuestion = this.questions[this.currentQuestionIndex].text;
    this.displayedQuestion = this.currentQuestion;
  },
  methods: {
    async fadeOut() {
      this.opacity = 0;
      await new Promise(resolve => setTimeout(resolve, 500)); // Pause de 500ms pour l'effet d'opacité
    },
    async scrambleText() {
      const originalText = this.currentQuestion;
      let iterations = 10;
      
      while (iterations > 0) {
        const scrambled = originalText.split('').map(char => {
          if (char === ' ') return ' ';
          const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
          return randomChar;
        }).join('');
        
        this.displayedQuestion = scrambled;
        
        await new Promise(resolve => setTimeout(resolve, 100));
        iterations--;
      }
      
      await this.fadeOut();
      
      this.displayedQuestion = originalText;
    },
    async nextQuestion() {
      await this.scrambleText();
      
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.currentQuestion = this.questions[this.currentQuestionIndex].text;
        this.displayedQuestion = this.currentQuestion;
      } else {
        // Faire quelque chose lorsque toutes les questions sont terminées
      }
      
      this.input = '';
      this.opacity = 1;  // Réinitialiser l'opacité pour la prochaine question
    }
  }
}
</script>

<style>
#question {
  transition: opacity 0.5s ease-in-out;
  font-family: "Courier New", monospace; /* Police à chasse fixe */
}

.fixed-width {
  display: inline-block;
  width: 1ch;  /* Largeur fixe pour chaque caractère */
}
</style>
