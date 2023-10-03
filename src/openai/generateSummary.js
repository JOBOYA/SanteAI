
export function generateSummary(scores, diagnosisData) {
    const toWatch = [];
    const occasional = [];
    const noProblem = [];
  
    for (const key in scores) {
      if (scores[key] >= diagnosisData.thresholds[key]) {
        toWatch.push(key);
      } else if (scores[key] > 0) {
        occasional.push(key);
      } else {
        noProblem.push(key);
      }
    }
  
    const summary = `
    ### Diagnostic Résumé
    - **À surveiller :** ${toWatch.join(', ')}
    - **Occasionnels :** ${occasional.join(', ')}
    - **Sans problème :** ${noProblem.join(', ')}
  
    ### Actions Suggérées
    - **Consultation Médicale :** ${toWatch.length ? 'Une consultation avec un professionnel de la santé est recommandée.' : 'Pas nécessaire pour le moment.'}
    - **Auto-Surveillance :** ${occasional.length ? 'Prenez note de tout changement concernant ces symptômes.' : 'Pas nécessaire pour le moment.'}
    `;
  
    return summary;
  }
  