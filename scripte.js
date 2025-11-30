
/**
 * Affiche la liste des corrections et crée les boutons WhatsApp pré-remplis.
 */
function afficherCorrections(niveau) {
    const correctionsListe = document.getElementById('ressources-liste');
    const titreNiveau = document.getElementById('titre-niveau');
    
   // const correctionsFiltrees => cor.niveau === niveau);
    const correctionsFiltrees = correctionsData.filter(cor => cor.niveau === niveau);
    
    titreNiveau.textContent = `Mode Corrections de sujet examen "CEPE,BEPC,BACC" au niveau- ${niveau.charAt(0).toUpperCase() + niveau.slice(1)}👇👇👇`; 
    correctionsListe.innerHTML = '';

    if (correctionsFiltrees.length === 0) {
        correctionsListe.innerHTML = '<p class="message-initial">Aucune correction n\'est disponible pour ce niveau.</p>';
        return;
    }

    correctionsFiltrees.forEach(correction => {
        const card = document.createElement('div');
        card.classList.add('ressource-card', 'correction-card'); 
        const icone = correction.type === 'Examen' || correction.type === 'Concours' ? '⭐' : '📖';
        
        // 1. CONSTRUIRE LE MESSAGE WHATSAPP DYNAMIQUE
        const message = `Bonjour, je suis intéressé par la correction suivante : ${correction.titre} (Type : ${correction.type} / Matière : ${correction.matiere} / ID : ${correction.id}). Merci de me confirmer la procédure et le tarif.`;
        
        // Encoder le message pour l'URL
        const encodedMessage = encodeURIComponent(message);
        
        // Construire l'URL WhatsApp
        const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;


        card.innerHTML = `
            <h3>${icone} ${correction.titre}</h3>
            <p><strong>Type :</strong> ${correction.type}</p>
            <p><strong>Matière :</strong> ${correction.matiere}</p>
            
            <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
                <i class="fab fa-whatsapp"></i> Commander la Correction
            </a>
        `;
        correctionsListe.appendChild(card);
    });
}

/**
 * Affiche la liste des ressources classiques.
 */
function afficherRessources(niveau) {
    const ressourcesListe = document.getElementById('ressources-liste');
    const titreNiveau = document.getElementById('titre-niveau');
    
    const ressourcesFiltrees = ressourcesData.filter(res => res.niveau === niveau);
    
    titreNiveau.textContent = `Mode Ressources d'examen "CEPE,BEPC,BACC" au  niveau- ${niveau.charAt(0).toUpperCase() + niveau.slice(1)}👇👇👇`; 
    ressourcesListe.innerHTML = '';
    
    if (ressourcesFiltrees.length === 0) {
        ressourcesListe.innerHTML = '<p class="message-initial">Aucune ressource n\'est disponible pour ce niveau.</p>';
        return;
    }

    ressourcesFiltrees.forEach(res => {
        const card = document.createElement('div');
        card.classList.add('ressource-card'); 
        card.innerHTML = `
            <h3>${res.titre}</h3>
            <p>Type: ${res.type}</p>
            <a href="${res.fichier}" class="btn-universite">Télécharger</a>
        `;
        ressourcesListe.appendChild(card);
    });
}


// *******************************************************************
// 3. FONCTIONS D'HISTORIQUE DE DON (pour la cohérence du projet)
// *******************************************************************

const HISTORIQUE_KEY = 'donsHistorique'; 

function getDonsHistorique() {
    try {
        const historique = localStorage.getItem(HISTORIQUE_KEY);
        return historique ? JSON.parse(historique) : [];
    } catch (e) {
        return [];
    }
}

function chargerHistorique() {
    const historiqueContainer = document.getElementById('historique-dons');
    if (!historiqueContainer) return;

    const historique = getDonsHistorique().reverse(); 
    historiqueContainer.innerHTML = ''; 

    if (historique.length === 0) {
        historiqueContainer.innerHTML = '<p class="message-initial-histoire">Aucun don enregistré localement pour l\'instant.</p>';
        return;
    }

    historique.forEach(don => {
        const item = document.createElement('div');
        item.classList.add('historique-item');
        
        const numeroAffiche = don.phone && don.phone.length > 4 
            ? don.phone.slice(0, 2) + '... ' + don.phone.slice(-3) 
            : (don.phone || 'Non spécifié'); 
            
        const dateFormatted = new Date(don.date).toLocaleDateString('fr-FR', {
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        item.innerHTML = `
            <div class="historique-details">
                Don de <strong>${don.amount} Ar</strong> via ${don.provider ? don.provider.toUpperCase() : 'MM'}
                <span class="historique-date">(${dateFormatted})</span>
            </div>
            <div class="historique-montant">${numeroAffiche}</div>
        `;
        historiqueContainer.appendChild(item);
    });
}


// *******************************************************************
// 4. INITIALISATION ET GESTIONNAIRES D'ÉVÉNEMENTS
// *******************************************************************

document.addEventListener('DOMContentLoaded', () => {
    const niveauSelecteur = document.getElementById('niveau-selecteur');
    
    // Récupérer les paramètres de l'URL pour déterminer le mode
    const urlParams = new URLSearchParams(window.location.search);
    const modeAffichage = urlParams.get('mode') || 'ressources'; 
    const niveauInitial = urlParams.get('niveau') || 'primaire';

    // Appeler l'affichage par défaut au chargement
    if (modeAffichage === 'corrections') {
        afficherCorrections(niveauInitial);
    } else {
        afficherRessources(niveauInitial);
    }
    
    // Mettre en évidence le bouton de niveau initial
    const btnInitial = document.querySelector(`.btn-niveau[data-niveau="${niveauInitial}"]`);
    if(btnInitial) btnInitial.classList.add('actif');


    // GESTIONNAIRE D'ÉVÉNEMENTS POUR LE CHANGEMENT DE NIVEAU
    if (niveauSelecteur) {
        niveauSelecteur.addEventListener('click', (event) => {
            const target = event.target;
            
            if (target.classList.contains('btn-niveau')) {
                const niveau = target.dataset.niveau;
                
                // Gestion de la classe 'actif'
                document.querySelectorAll('.btn-niveau').forEach(btn => {
                    btn.classList.remove('actif');
                });
                target.classList.add('actif');
                
                // Appel de la fonction appropriée
                if (modeAffichage === 'corrections') {
                    afficherCorrections(niveau);
                } else {
                    afficherRessources(niveau);
                }
            }
        });
    }
    
    // Initialisation de l'historique des dons au chargement
    chargerHistorique();
});

// NOTE: La logique de soumission du formulaire de don doit être gérée
// dans un gestionnaire d'événements pour le formulaire 'donation-form',
// et elle devrait appeler `enregistrerNouveauDon` puis `chargerHistorique()`
// si la transaction simulée ou réelle réussit.

// script.js (Intégrez ou remplacez votre fonction de recherche existante)

function filtrerRessourcesParRecherche(termeRecherche) {
    // 1. Déterminer le mode d'affichage actuel (Ressources ou Corrections)
    const urlParams = new URLSearchParams(window.location.search);
    const modeAffichage = urlParams.get('mode') || 'ressources';

    // 2. Sélectionner le jeu de données approprié
    let donnees;
    if (modeAffichage === 'corrections') {
        // Utiliser les données de corrections (avec les titres spécifiques)
        donnees = correctionsData;
    } else {
        // Utiliser les données de ressources classiques
        donnees = ressourcesData;
    }

    // 3. Filtrage basé sur le terme de recherche
    const termeMin = termeRecherche.toLowerCase();
    const resultatsFiltres = donnees.filter(item => {
        // Recherche dans le titre, la matière et le type (pour les corrections)
        return item.titre.toLowerCase().includes(termeMin) ||
               (item.matiere && item.matiere.toLowerCase().includes(termeMin)) ||
               item.type.toLowerCase().includes(termeMin);
    });

    // 4. Affichage des résultats
    const ressourcesListe = document.getElementById('ressources-liste');
    ressourcesListe.innerHTML = ''; // Nettoyer la liste existante

    if (resultatsFiltres.length === 0) {
        ressourcesListe.innerHTML = `
            <p class="message-initial">
                ❌ Aucun résultat trouvé pour "${termeRecherche}" dans le mode ${modeAffichage.toUpperCase()}.
            </p>
        `;
        return;
    }

    // 5. Injection des résultats avec le mode d'affichage approprié
    resultatsFiltres.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('ressource-card'); 

        if (modeAffichage === 'corrections') {
            // Logique d'affichage spécifique aux Corrections (avec bouton WhatsApp)
            card.classList.add('correction-card');
            const icone = item.type === 'Examen' || item.type === 'Concours' ? '⭐' : '📖';
            
            const message = `Bonjour, je suis intéressé par la correction suivante : ${item.titre} (Type : ${item.type} / Matière : ${item.matiere} / ID : ${item.id}). Merci.`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

            card.innerHTML = `
                <h3>${icone} ${item.titre}</h3>
                <p><strong>Type :</strong> ${item.type}</p>
                <p><strong>Matière :</strong> ${item.matiere}</p>
                <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
                    <i class="fab fa-whatsapp"></i> Commander la Correction
                </a>
            `;

        } else {
            // Logique d'affichage des Ressources classiques
            card.innerHTML = `
                <h3>${item.titre}</h3>
                <p>Type: ${item.type}</p>
                <p>Niveau: ${item.niveau.charAt(0).toUpperCase() + item.niveau.slice(1)}</p>
                <a href="${item.lien}" class="btn-universite">Télécharger</a>
            `;
        }
        ressourcesListe.appendChild(card);
    });
}

// 6. GESTIONNAIRE D'ÉVÉNEMENTS POUR LA BARRE DE RECHERCHE
// Assurez-vous d'avoir une barre de recherche avec l'ID 'search-input' ou ajustez si nécessaire

document.addEventListener('DOMContentLoaded', () => {
    // ... (Votre code existant) ...
    
    const searchInput = document.getElementById('search-input'); // Assurez-vous que l'ID est correct
    const searchForm = document.getElementById('search-form'); // Si vous utilisez un formulaire

    if (searchInput) {
        // Écouter la saisie pour filtrage immédiat ou au moins sur 'submit'
        searchInput.addEventListener('input', (event) => {
            const terme = event.target.value.trim();
            // Filtrer uniquement si le terme a au moins 3 caractères pour des performances
            if (terme.length > 2) {
                filtrerRessourcesParRecherche(terme);
            } else if (terme.length === 0) {
                // Si la recherche est vide, réinitialiser l'affichage au niveau actuel
                const urlParams = new URLSearchParams(window.location.search);
                const modeAffichage = urlParams.get('mode') || 'ressources';
                const niveauInitial = urlParams.get('niveau') || 'primaire';
                
                if (modeAffichage === 'corrections') {
                    afficherCorrections(niveauInitial);
                } else {
                    afficherRessources(niveauInitial);
                }
            }
        });
        
        // Si vous utilisez un formulaire de recherche, désactiver le rechargement de page
        if (searchForm) {
            searchForm.addEventListener('submit', (event) => {
                event.preventDefault();
                filtrerRessourcesParRecherche(searchInput.value.trim());
            });
        }
    }
});
