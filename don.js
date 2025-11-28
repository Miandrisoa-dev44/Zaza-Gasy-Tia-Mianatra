document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('donationForm').addEventListener('submit', handleDonationSubmit);
    document.getElementById('resetBtn').addEventListener('click', resetForm);
});

function handleDonationSubmit(e) {
    e.preventDefault(); // Empêche l'envoi classique du formulaire

    const montantInput = document.getElementById('montant');
    const reseauInput = document.getElementById('reseau');
    const submitBtn = document.getElementById('submitBtn');
    const loader = document.querySelector('.loader');
    const simulationResult = document.getElementById('simulationResult');
    
    // Réinitialisation des erreurs
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    simulationResult.classList.add('hidden');

    let isValid = true;
    const montant = parseFloat(montantInput.value);
    const reseau = reseauInput.value;
    
    // Simuler le compte marchand de l'association (À REMPLACER PAR VOTRE VRAI NUMÉRO)
    const receiverAccountOrange = '0325230418'
    const receiverAccount = '0341108401'; // Numéro fictif pour l'exemple

    // --- 1. Validation du Montant ---
    if (isNaN(montant) || montant < 100) {
        document.getElementById('montantError').textContent = 'Le montant doit être un nombre valide (min. 100).';
        isValid = false;
    }

    // --- 2. Validation du Réseau ---
    if (!reseau) {
        document.getElementById('reseauError').textContent = 'Veuillez choisir un réseau Mobile Money.';
        isValid = false;
    }

    // Le champ numéro n'est pas strictement obligatoire pour l'USSD deep link (car l'utilisateur compose depuis son propre téléphone)
    
    if (isValid) {
        // --- Simulation de Traitement ---
        submitBtn.setAttribute('disabled', 'disabled');
        submitBtn.innerHTML = '<span class="icon"><i class="fas fa-paper-plane"></i></span> //<span class="loader"></span>';
       // loader.classList.remove('hidden');

        // Délai pour simuler le temps de préparation avant la redirection
        setTimeout(() => {
            
            // Masquer le formulaire et afficher le résultat de la SIMULATION
            document.getElementById('donationForm').classList.add('hidden');
            simulationResult.classList.remove('hidden');

            // Afficher les détails de la simulation
            document.getElementById('resultMontant').textContent = `${montant.toLocaleString('fr-FR')} de votre devise`;
            document.getElementById('resultReseau').textContent = reseau;
            
            let ussdCode;
            let paymentUrl; 
            
            // --- Logique USSD Deep Link (Simulation) ---
            if (reseau === 'OrangeMoney') {
                // Code USSD Fictif pour un paiement marchand Orange Money (Peut varier : ex: *144# ou *145#)
                ussdCode = `#144*1*1*${receiverAccountOrange}*${receiverAccountOrange}*${montant}*2#`; 
                // Le Deep Link tel: encode le '#' en '%23'
                paymentUrl = `tel:${ussdCode.replace(/#/g, '%23')}`;
            } else if (reseau === 'MVola') {
                // Code USSD Fictif pour un paiement marchand MVola (Madagascar)
                ussdCode = `*111*1*2*${receiverAccount}*${montant}*2*1111#`; 
                paymentUrl = `tel:${ussdCode.replace(/#/g, '%23')}`;
            } else {
                 // Fallback ou autre : Simule un deep link d'application générique
                 ussdCode = "Non applicable (Autre)";
                 paymentUrl = `myapp://pay?amount=${montant}`; 
            }

            // Mise à jour de la section résultat
            document.getElementById('ussdCode').textContent = ussdCode;
            const paymentLink = document.getElementById('paymentLink');
            paymentLink.href = paymentUrl;
            paymentLink.textContent = `Ouvrir l'interface ${reseau}`;
            
            // Rétablir le bouton
            submitBtn.removeAttribute('disabled');
            submitBtn.innerHTML = '<span class="icon"><i class="fas fa-paper-plane"></i></span> Envoyer le Don & Payer';
            //loader.classList.add('hidden');

        }, 2000); // Attendre 2 secondes
    }
}

function resetForm() {
    document.getElementById('donationForm').reset();
    document.getElementById('donationForm').classList.remove('hidden');
    document.getElementById('simulationResult').classList.add('hidden');
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
}
