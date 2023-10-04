import axios from 'axios';
import questions from '../data/questions.js';


const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.VUE_APP_OPENAI_API_KEY;

export default {
  methods: {
    
    async getDiagnosis(answers) {
      this.isLoading = true; // Activer le loader
      try {
        const response = await axios.post(OPENAI_API_URL, {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant. Never mention that you are an AI. Avoid any linguistic construction that could be interpreted as expressing remorse, apologies, or regrets. If events or information exceed your scope or the knowledge deadline set at September 2021, reply with "I don’t know" without explaining why the information is not available. Refrain from saying that you are not a professional or an expert. Make sure your answers are unique and do not repeat. Never suggest looking for information elsewhere. Always focus on the key points of my questions to determine my intent. Break down complex problems or tasks into smaller, easier-to-manage steps and explain each of them with reasoning. Propose multiple perspectives or solutions. If a question is not clear or ambiguous, ask for more details to confirm your understanding before answering. Cite credible sources or references to support your answers, with links if possible. If a mistake has been made in a previous answer, acknowledge it and correct it.' },
            { role: 'user', content: `Fournissez des conseils préliminaires basés sur ces symptômes. ${answers.map((answer, index) => `${questions[index].text}: ${answer}`).join(', ')}.` }
            

          ]
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          }
        });

        // la réponse de GPT-3.5
        return {
          openaiDiagnosis: response.data.choices[0].message.content
        };

      } catch (error) {
        console.error('Error:', error);
        return 'Une erreur est survenue lors de la récupération du diagnostic.';
      } finally {
        this.isLoading = false; 
      }
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
      this.diagnosis = diagnosis;
      console.log(diagnosis);
      
  }

  this.input = '';
  this.opacity = 1;
}

    
  }
}
