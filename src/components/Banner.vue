<template>
    <div class="banner" :style="backgroundStyle">
      <div class="banner-item">
        <div class="icon-container">
        <img src="@/assets/decentralized.svg" alt="Decentralized">
        </div>
        <h3>Decentralized</h3>
        <p>Cross-chain protocol uses the best from different blockchains</p>
      </div>
    
      <div class="banner-item">
        <div class="icon-container">
        <img src="@/assets/scalable.svg" alt="High Profitable">
        </div>
        <h3>High Profitable</h3>
        <p>High-effective yield strategies for maximizing earnings from CLMMs</p>
      
      </div>
      
      <div class="banner-item">
        <div class="icon-container">
        <img src="@/assets/security-audit.svg" alt="Secure">
        </div>
        <h3>Secure</h3>
        <p>OpenZeppelin best practices for smart contracts engineering</p>
      
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Banner',
    data() {
      return {
        backgroundStyle: {
         
          color: 'white',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '20px',
          borderRadius: '10px',
          width: '100%', // Assurez-vous que la bannière s'étend sur toute la largeur
          boxSizing: 'border-box' // Pour que padding ne dépasse pas la largeur fixée
        }
      }
    }
  }
  </script>
  
  <style scoped>
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
  max-width: 60px; /* Ou la taille maximale que vous souhaitez pour le cercle */
  max-height: 60px; /* Assurez-vous que cette valeur est la même que max-width pour garder la forme de cercle */
  width: 100%; /* Ceci permet au cercle de s'adapter au contenu */
  height: 100%; /* Ceci permet au cercle de s'adapter au contenu */
}


  
  .banner-item {
    width: auto;
   
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


  /* Responsive styles */
@media (max-width: 768px) {
  .banner-item {
    flex-basis: 100%; /* Prend toute la largeur sur les petits écrans */
    padding: 10px 0; /* Réduit le padding vertical sur les petits écrans */
  }

  .banner-item h3 {
    font-size: 1rem; /* Réduit la taille du texte pour les petits écrans */
  }

  .banner-item p {
    font-size: 0.9rem; /* Réduit la taille du texte pour les petits écrans */
  }
  
  .icon-container {
    padding: 8px; /* Réduit le padding autour des icônes pour les petits écrans */
    max-width: 50px; /* Réduit la taille du cercle pour les icônes */
    max-height: 50px;
  }

  .banner-item img {
    width: 40px; /* Réduit la taille des icônes pour les petits écrans */
    height: auto; /* Maintient le ratio de l'icône */
  }
}
 
  </style>