<template>
 <h1>SanteAI</h1>
  <div class="center-container">
    <div id="question" :style="{ opacity: opacity }">
      <span 
        v-for="(letter, index) in displayedQuestion.split('')" 
        :key="index" 
        class="fixed-width"
      >
        {{ letter }}
      </span>
    </div>
    <div class="input-button-container">
      <input v-model="input" @keyup.enter="nextQuestion" />
      <n-button class="btn" type="tertiary" @click="nextQuestion">  <!-- Bouton Naive UI -->
        valider
      </n-button>
    </div>
  </div>
  <canvas id="canvas3d"></canvas>

</template>




<script>
import questions from './data/questions.js';
import { NButton } from 'naive-ui';
import { Application } from '@splinetool/runtime';
import diagnosisMethods from './openai/getDiagnosis.js';

export default {
  components: {
    NButton,
  },
  data() {
    return {
      questions: questions,
      currentQuestionIndex: 0,
      input: '',
      currentQuestion: '',
      displayedQuestion: '',
      opacity: 1,
      answers: [],
    };
  },
  mounted() {
    this.currentQuestion = this.questions[this.currentQuestionIndex].text;
    this.displayedQuestion = this.currentQuestion;
    this.initializeSpline();
  },
  methods: {
    ...diagnosisMethods.methods,
    initializeSpline() {
      const canvas = document.getElementById('canvas3d');
      const app = new Application(canvas);
      app.load('https://draft.spline.design/pmJMaSyiOdZqObMP/scene.splinecode');
    },
    async fadeOut() {
      this.opacity = 0;
      await new Promise(resolve => setTimeout(resolve, 500));
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
      this.answers.push(this.input);
      await this.scrambleText();

      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.currentQuestion = this.questions[this.currentQuestionIndex].text;
        this.displayedQuestion = this.currentQuestion;
      } else {
        const diagnosis = await this.getDiagnosis(this.answers);
        console.log(diagnosis);
      }

      this.input = '';
      this.opacity = 1;
    }
  }
}

</script>

<style>
#question {
  transition: opacity 0.5s ease-in-out;
  font-family: "Courier New", monospace; /* Police à chasse fixe */
  font-size: 1.5rem;
}

.fixed-width {
  display: inline-block;
  width: 1ch;  /* Largeur fixe pour chaque caractère */
}

.input-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  
 
}
.input-button-container input {
    margin-right: 20px; 
  }
  .input-button-container .btn {
    margin-left: 20px;  
  }


  h1 {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 2rem;
  }





</style>
