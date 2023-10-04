<template>
  <div>
    <!---Title-->
    <h1>SanteAI</h1>
  
    <!---Center Container-->
    <div class="center-container">
      
      <!---Question-->
      <div id="question" :style="{ opacity: opacity }">
        <span v-for="(letter, index) in displayedQuestion.split('')" :key="index" class="fixed-width">
          {{ letter }}
        </span>
      </div>
  
      <!---Input and Button-->
      <div class="field-and-loader-container">
        <div class="input-button-container">
          <input v-model="input" @keyup.enter="input && nextQuestion()" placeholder="(possibilité de phrases)"/>
          <n-button class="btn" type="tertiary" @click="nextQuestion" :disabled="!input">valider</n-button>
        </div>
      </div>
  
      <!---Diagnostic-->
      <div v-if="diagnosis">
        <h2>Diagnostic</h2>
        <div>
          <h3>Résumé</h3>
          <p><strong>Possibilités à considérer :</strong></p>
          <div class="cards-container">
            <div v-for="(item, index) in formatDiagnosis(diagnosis.openaiDiagnosis)" :key="index" class="diagnosis-card">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
  
      <!---Loader-->
      <div v-if="isLoading" class="loader-container">
        <Loader />
      </div>
  
    </div> <!---End of center-container-->
  </div> <!---End of main div-->
</template>

<script>
import questions from './data/questions.js';
import { NButton } from 'naive-ui';
import diagnosisMethods from './openai/getDiagnosis.js';
import Loader from './components/Loader.vue';

    export default {
      components: {
        NButton,
        Loader
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
          diagnosis: null,
          isLoading: false,
        };
      },
  mounted() {
    this.currentQuestion = this.questions[this.currentQuestionIndex].text;
    this.displayedQuestion = this.currentQuestion;
    
  },
  methods: {
    ...diagnosisMethods.methods,
    formatDiagnosis(diagnosis) {
  const items = diagnosis.split(/[\r\n]+/).filter(Boolean);
  return items;
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
    }

  }
};

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


  li {
    margin-bottom: 10px;
  }

  .field-and-loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

/* Style de base pour les cartes */
.diagnosis-card {
  border: 2px solid white;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  flex: 1 1 calc(33.333% - 20px); /* Largeur de base pour les cartes */
 
}

/* Container pour les cartes */
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

/* Media query pour les écrans mobiles */
@media screen and (max-width: 768px) {
  .diagnosis-card {
    flex: 1 1 100%; /* Sur mobile, prendre toute la largeur disponible */
  }
}





</style>
