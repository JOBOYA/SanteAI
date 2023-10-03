import axios from 'axios';
import diagnosisData from '@/data/diagnosisMatrix.json';
import questions from '../data/questions.js';
import { generateSummary } from './generateSummary.js';




const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.VUE_APP_OPENAI_API_KEY;

export default {
  
  methods: {
    async getDiagnosis(answers) {
      const scores = {}; 
      // Initialisez les scores avec 0
    for (const key in diagnosisData.thresholds) {
      scores[key] = 0;
    }

    // Mettez à jour les scores en fonction des réponses
    answers.forEach((answer, index) => {
      for (const key in diagnosisData.matrix[index]) {
        scores[key] += diagnosisData.matrix[index][key] * answer;
      }
    });

// Générer le résumé
const summary = generateSummary(scores, diagnosisData);

    // Comparez les scores aux seuils
    const diagnosisResults = [];
    for (const key in scores) {
      if (scores[key] >= diagnosisData.thresholds[key]) {
        diagnosisResults.push(key);
      }
    }
      try {
        const response = await axios.post(OPENAI_API_URL, {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: `Analyse des réponses du questionnaire : ${answers.map((answer, index) => `${questions[index].text}: ${answer}`).join(', ')}.` }

          ]
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          }
        });
        return {
          summary: summary, 
          openaiDiagnosis: response.data.choices[0].message.content
        };

       
     

      } catch (error) {
        console.error('Error:', error);
        return 'Une erreur est survenue lors de la récupération du diagnostic.';
      }
    },
    async nextQuestion() {
      const answers = []; // Récupère les réponses du questionnaire
      const diagnosis = await this.getDiagnosis(answers);
      
      console.log(diagnosis); // Affiche le diagnostic
    }
  }
}
