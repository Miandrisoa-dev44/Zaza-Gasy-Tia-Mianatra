document.addEventListener('DOMContentLoaded', () => {
    // Éléments du Catalogue et du Header
    const niveauSelecteur = document.getElementById('niveau-selecteur');
    const ressourcesListe = document.getElementById('ressources-liste');
    const titreNiveau = document.getElementById('titre-niveau');
    const headerSection = document.querySelector('.hero-section'); 
    
    // Éléments du Menu Kebab
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const menuOverlay = document.getElementById('menu-overlay');
    const closeMenuBtn = menuOverlay.querySelector('.close-menu-btn');
    const donationMenuLink = menuOverlay.querySelector('.donation-menu-link'); 

    // Éléments de la Recherche
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchButton = document.getElementById('search-button');

    // Éléments de la Donation
  //  const donationBox = document.getElementById('donation-box');
  //  const donationForm = document.getElementById('donation-form');
    
    // --- FONCTIONNALITÉS PRINCIPALES ---

    function afficherRessources(niveau) {
        // ... (Logique d'affichage des cartes de ressources) ...
        const ressourcesFiltrees = ressourcesData.filter(res => res.niveau === niveau);
        
        titreNiveau.textContent ='- ${niveau.charAt(0).toUpperCase() + niveau.slice(1)}'; 
        ressourcesListe.innerHTML = '';

        if (ressourcesFiltrees.length === 0) {
         
           ressourcesListe.innerHTML = '<p class="message-initial">Aucune ressource trouvée pour ce niveau.</p>';
            return;
        }
        // Génération des cartes
        ressourcesFiltrees.forEach(ressource => {
            const card = document.createElement('div');
            card.classList.add('ressource-card');
            const icone = ressource.type === 'examen' ? '📝' : '📖';
            card.innerHTML = `
                <h3>${icone} ${ressource.titre}</h3>
                <p><strong>Matière :</strong> ${ressource.matiere}</p>
                <p><strong>Type :</strong> ${ressource.type.charAt(0).toUpperCase() + ressource.type.slice(1)}</p>
                <a href="${ressource.fichier}" target="_blank" rel="noopener noreferrer">
                    Télécharger le PDF
                </a>
            `;
            ressourcesListe.appendChild(card);
        });
    }

    // Gestionnaire : Changement de Niveau et Animation Header
    niveauSelecteur.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('btn-niveau')) {
            const niveau = target.dataset.niveau;
            
            headerSection.classList.remove('bg-primaire', 'bg-college', 'bg-lycee');
            headerSection.classList.add(`bg-${niveau}`); 

            document.querySelectorAll('.btn-niveau').forEach(btn => {
                btn.classList.remove('actif');
            });
            target.classList.add('actif');
            
            afficherRessources(niveau);
        }
    });
    
    // Affichage initial
    afficherRessources('primaire');


    // --- LOGIQUE DU MENU KEBAB (TROIS POINTS) ---

    menuToggleBtn.addEventListener('click', () => { menuOverlay.style.width = '100%'; });
    closeMenuBtn.addEventListener('click', () => { menuOverlay.style.width = '0%'; });
    
    menuOverlay.querySelectorAll('.overlay-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (!link.classList.contains('donation-menu-link')) {
                menuOverlay.style.width = '0%';
            }
        });
    });

    /*donationMenuLink.addEventListener('click', (event) => {
        event.preventDefault(); 
        menuOverlay.style.width = '0%'; 
        donationBox.style.display = 'block'; 
    });*/

   // --- LOGIQUE DE RECHERCHE DYNAMIQUE ---

// script.js (Fonction filtrerRessourcesParRecherche - Recherche globale)

function filtrerRessourcesParRecherche(termeRecherche) {
    
    const ressourcesListe = document.getElementById('ressources-liste');
    const titreNiveau = document.getElementById('titre-niveau');
    
    // Définir le niveau actuel (pour réinitialisation et contexte)
    const urlParams = new URLSearchParams(window.location.search);
    const niveauActuel = urlParams.get('niveau') || 'primaire';

    // 1. Initialisation des jeux de données (Assurez-vous qu'ils sont définis globalement)
    const donneesRessources = ressourcesData; 
    const donneesCorrections = correctionsData;

    const termeMin = termeRecherche.toLowerCase().trim();
    titreNiveau.textContent = `(Résultats pour "${termeRecherche}")`;

    // Nettoyage de l'affichage
   
     ressourcesListe.innerHTML = ''; 

    if (termeMin.length < 3) {
        ressourcesListe.innerHTML = '<p class="message-initial">Veuillez entrer au moins 3 caractères pour la recherche.</p>';
        return;
    }

    // 2. Filtrage des Ressources Classiques
    const resultatsRessources = donneesRessources.filter(item => {
        return item.titre.toLowerCase().includes(termeMin) ||
               item.type.toLowerCase().includes(termeMin) ||
               item.niveau.toLowerCase().includes(termeMin);
    });

    // 3. Filtrage des Corrections Premium
    const resultatsCorrections = donneesCorrections.filter(item => {
        return item.titre.toLowerCase().includes(termeMin) ||
               (item.matiere && item.matiere.toLowerCase().includes(termeMin)) ||
               item.type.toLowerCase().includes(termeMin) ||
               item.niveau.toLowerCase().includes(termeMin);
    });

    // 4. Combinaison des résultats
    const resultatsTotaux = [...resultatsRessources, ...resultatsCorrections];

    if (resultatsTotaux.length === 0) {
        ressourcesListe.innerHTML = `
  
            <p class="message-initial">
                ❌ Aucun document trouvé (Ressources ou Corrections) pour "${termeRecherche}".
            </p>
        `;
        return;
    }

    // 5. Affichage et rendu des cartes
    resultatsTotaux.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('ressource-card'); 

        // Déterminer si c'est une Correction (car les correctionsData ont un 'id' unique)
        const isCorrection = item.id && item.id.startsWith(item.niveau.toUpperCase().charAt(0));

        if (isCorrection) {
            // Rendu pour une Correction Premium (bouton WhatsApp)
            card.classList.add('correction-card');
            const icone = item.type === 'Examen' || item.type === 'Concours' ? '⭐' : '📖';
            
            const message = `Bonjour, je suis intéressé par la correction suivante : ${item.titre} (ID : ${item.id}). Merci de me confirmer la procédure et le tarif.`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`; 

            card.innerHTML = `
                <span class="tag-correction">PREMIUM - ${item.niveau.toUpperCase()}</span>
                <h3>${icone} ${item.titre}</h3>
                <p><strong>Type :</strong> ${item.type}</p>
                <p><strong>Matière :</strong> ${item.matiere}</p>
                <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
                    <i class="fab fa-whatsapp"></i> Commander la Correction
                </a>
            `;

        } else {
            // Rendu pour une Ressource Classique (bouton Télécharger)
            card.innerHTML = `
                <span class="tag-ressource">RESSOURCE GRATUITE - ${item.niveau.toUpperCase()}</span>
                <h3>${item.titre}</h3>
                <p>Type: ${item.type}</p>
                <a href="${item.lien}" target="_blank" class="btn-universite">Télécharger</a>
            `;
        }
        ressourcesListe.appendChild(card);
    });

    // Optionnel : Réinitialiser la zone de sélection de niveau si on est en mode recherche globale
    document.querySelectorAll('.btn-niveau').forEach(btn => {
        btn.classList.remove('actif');
    });
}






    function displaySearchResults(results) {
        searchResults.innerHTML = ''; 

        if (results.length === 0 && searchInput.value.length > 0) {
           /* const li = document.createElement('li');
            li.textContent = "Aucun résultat trouvé.";
            searchResults.appendChild(li);
            return;
      */  }
        
      /*  results.forEach(res => {
            const li = document.createElement('li');
            const typeLabel = res.type.charAt(0).toUpperCase() + res.type.slice(1);
            const niveauLabel = res.niveau.charAt(0).toUpperCase() + res.niveau.slice(1);
            
            li.innerHTML = `
                <strong>${res.titre}</strong> (${typeLabel})
                <br>
                <small>${niveauLabel} | ${res.matiere}</small>
            `;
            
            li.onclick = () => {
                window.open(res.fichier, '_blank');
                searchInput.value = '';
                searchResults.innerHTML = '';
            };
            
            searchResults.appendChild(li);
        });*/
    }

    searchInput.addEventListener('input', (e) => {
        const termeRecherche = e.target.value.toLowerCase().trim();
        
        if (termeRecherche.length < 3) {
            searchResults.innerHTML = '';
            return;
        }

        const filtered = ressourcesData.filter(res => 
            res.titre.toLowerCase().includes(termeRecherche) ||
            res.matiere.toLowerCase().includes(termeRecherche) ||
            res.niveau.toLowerCase().includes(termeRecherche)
        );

        displaySearchResults(filtered);
    });

    searchButton.addEventListener('click', () => {
        searchInput.dispatchEvent(new Event('input')); 
        searchInput.focus();
    });

    // Cacher les résultats si l'utilisateur clique en dehors
    document.addEventListener('click', (e) => {
        const isClickInside = searchInput.contains(e.target) || searchButton.contains(e.target);
        if (!isClickInside) {
            setTimeout(() => {
                searchResults.innerHTML = '';
            }, 200);
        }
    });
  });

 




// script.js (Intégrer ou remplacer votre fonction de recherche existante)

// *******************************************************************
// ASSUREZ-VOUS QUE CES VARIABLES SONT DÉFINIES AU NIVEAU GLOBAL :
// const WHATSAPP_NUMBER = "26133xxxxxxx"; 
// const correctionsData = [...]; // Votre tableau de données de corrections
// const ressourcesData = [...];   // Votre tableau de données de ressources
// *******************************************************************


/*function filtrerRessourcesParRecherche(termeRecherche) {
    
    // NOUVEAU SÉLECTEUR pour l'affichage des résultats
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results'); // Utilisation de votre ID #search-results
    
    // Nettoyer l'affichage précédent
    searchResults.innerHTML = ''; 

    const termeMin = termeRecherche.toLowerCase().trim();

    // Condition pour commencer la recherche (minimum 3 caractères)
    if (termeMin.length < 3) {
        searchResults.style.display = 'none'; 
        return;
    }*/
    
    // Afficher la liste déroulante
    /*searchResults.style.display = 'block'; 

    // --- 1. Filtrage des deux jeux de données ---
    const donneesRessources = ressourcesData; 
    const donneesCorrections = correctionsData;

    // Filtrage des Ressources Classiques
    const resultatsRessources = donneesRessources.filter(item => {
        return item.titre.toLowerCase().includes(termeMin) ||
               item.type.toLowerCase().includes(termeMin) ||
               item.niveau.toLowerCase().includes(termeMin);
    }).map(item => ({ ...item, isPremium: false, fichier: item.lien }));

    // Filtrage des Corrections Premium
    const resultatsCorrections = donneesCorrections.filter(item => {
        return item.titre.toLowerCase().includes(termeMin) ||
               (item.matiere && item.matiere.toLowerCase().includes(termeMin)) ||
               item.type.toLowerCase().includes(termeMin) ||
               item.niveau.toLowerCase().includes(termeMin);
    }).map(item => ({ 
        ...item, 
        isPremium: true, 
        // Création d'un lien WhatsApp comme action par défaut
        fichier: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Je souhaite commander la correction : ' + item.titre)}` 
    })); */

    // 2. Combinaison des résultats
    /*const results = [...resultatsRessources, ...resultatsCorrections];

    // --- 3. Création des éléments <li> ---
    if (results.length === 0) {
        const li = document.createElement('li');
        li.textContent = "Aucun résultat trouvé.";
        li.classList.add('no-result');
        searchResults.appendChild(li);
        return;
    }
    
    results.forEach(res => {
        const li = document.createElement('li');
        const typeLabel = res.type.charAt(0).toUpperCase() + res.type.slice(1);
        const niveauLabel = res.niveau.charAt(0).toUpperCase() + res.niveau.slice(1);
        
        // Ajouter une classe pour le style
        li.classList.add(res.isPremium ? 'premium-result' : 'resource-result');
        
        li.innerHTML = `
            <strong>${res.titre}</strong> 
            <span class="result-tag">${res.isPremium ? '⭐ Premium' : '✅ Gratuit'}</span>
            <br>
            <small>${niveauLabel} | ${res.matiere || res.type}</small>
        `; */
        
        // Action au clic
      /*  li.onclick = () => {
            // Ouvrir le lien (fichier direct pour ressource, WhatsApp pour correction)
            window.open(res.fichier, '_blank');
            // Cacher et nettoyer le champ de recherche après l'action
            searchInput.value = '';
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
        };
        
        searchResults.appendChild(li);
    });
}*/


// --- GESTIONNAIRE D'ÉVÉNEMENTS ---

/*document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    
    // Cacher la liste de résultats par défaut
    searchResults.style.display = 'none'; 
    
    if (searchInput) {
        // 1. Écoute de la saisie (événement 'input')
        searchInput.addEventListener('input', (event) => {
            const terme = event.target.value.trim();
            filtrerRessourcesParRecherche(terme);
        });*/
        
        // 2. Écoute du clic sur le bouton (pour lancer une recherche immédiate si l'utilisateur ne tape pas)
    /*    if (searchButton) {
             searchButton.addEventListener('click', () => {
                filtrerRessourcesParRecherche(searchInput.value.trim());
            });
        }

        // 3. Cacher les résultats si on clique n'importe où ailleurs sur la page
        document.addEventListener('click', (event) => {
            const isClickInside = document.getElementById('search-bar-container').contains(event.target);
            if (!isClickInside) {
                searchResults.style.display = 'none';
            }
        });
        
        // Empêcher la liste de se cacher si on clique dedans
        searchResults.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }
});*/
