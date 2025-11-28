const ressourcesData = [
    { niveau: "primaire",
      type: "examen", 
      matiere: "Maths", 
      titre: "Sujet MAths-CEPE-2000", 
      fichier: "https://drive.google.com/file/d/1lN0XaWVDePePu428G9Z0FEZ3rgpPfaq9/view?usp=drive_link" },  
       
    { niveau:"primaire",
      type: "Examen", 
      matiere: "Français", 
      titre: "Sujet Français-CEPE-2000",    
      fichier: "https://drive.google.com/file/d/1lN0XaWVDePePu428G9Z0FEZ3rgpPfaq9/view?usp=drive_link" },
      
        { niveau:"primaire",
      type: "cours", 
      matiere: "Malagasy", 
      titre: "Sujet Malagasy-CEPE-2000",    
      fichier: "https://drive.google.com/file/d/1lN0XaWVDePePu428G9Z0FEZ3rgpPfaq9/view?usp=drive_link" },
      
        { niveau:"primaire",
      type: "Examen", 
      matiere: "tantara", 
      titre: "Sujet tantara-CEPE-2000",    
      fichier: "https://drive.google.com/file/d/1lN0XaWVDePePu428G9Z0FEZ3rgpPfaq9/view?usp=drive_link" },
      
        { niveau:"primaire",
      type: "Examen", 
      matiere: "géographie", 
      titre: "Sujet géographie-CEPE-2000",    
      fichier: "https://drive.google.com/file/d/1lN0XaWVDePePu428G9Z0FEZ3rgpPfaq9/view?usp=drive_link" },
      
        { niveau:"primaire",
      type: "Examen", 
      matiere: "SVT", 
      titre: "Sujet SVT-CEPE-2000",    
      fichier: "https://drive.google.com/file/d/1lN0XaWVDePePu428G9Z0FEZ3rgpPfaq9/view?usp=drive_link" },
      
      
      
    { niveau:"college", 
      type: "examen", 
      matiere: "Mathématiques", 
      titre: "Sujet Mathématiques-BEPC-2000", 
      fichier: "https://drive.google.com/file/d/1lN0XaWVDePePu428G9Z0FEZ3rgpPfaq9/view?usp=drive_link" },
      
      { niveau:"college",
      type: "examen", 
      matiere: "Français", 
      titre: "Sujet Français-BEPC-2000", 
      fichier: "https://drive.google.com/file/d/1lN0XaWVDePePu428G9Z0FEZ3rgpPfaq9/view?usp=drive_link" },
      
      { niveau:"college",
      type: "Examen", 
      matiere: "Malagasy", 
      titre: " Sujet Malagasy-BEPC-2000", 
      fichier: "https://drive.google.com/file/d/1lN0XaWVDePePu428G9Z0FEZ3rgpPfaq9/view?usp=drive_link" },
      
      { niveau:"college", 
      type: "examen", 
      matiere: "Anglais", 
      titre: "Sujet Anglais-BEPC-2000", 
      fichier: "https://drive.google.com/file/d/1lN0XaWVDePePu428G9Z0FEZ3rgpPfaq9/view?usp=drive_link" },
      
      { niveau:"college", 
      type: "examen", 
      matiere: "Histoire-Géographie", 
      titre: "Sujet Histo-Géo-BEPC-2000", 
      fichier: "https://drive.google.com/file/d/1lN0XaWVDePePu428G9Z0FEZ3rgpPfaq9/view?usp=drive_link" },
      
      { niveau:"college", 
      type: "examen", 
      matiere: "SVT", 
      titre: "Sujet SVT-BEPC-2000", 
      fichier: "https://drive.google.com/file/d/1lN0XaWVDePePu428G9Z0FEZ3rgpPfaq9/view?usp=drive_link" },
      
      { niveau:"college", 
      type: "examen", 
      matiere: "Physique", 
      titre: "Sujet Physique-BEPC-2000", 
      fichier: "https://drive.google.com/file/d/1lN0XaWVDePePu428G9Z0FEZ3rgpPfaq9/view?usp=drive_link" },
      
      
     
     
// Donnez de Baccalauréat année 2000
      
      { niveau:"lycee", 
      type: "examen", 
      matiere: "Mathématiques", 
      titre: "Sujet Mathématiques-Bac-2000", 
      fichier: "https://drive.google.com/file/d/1lN0XaWVDePePu428G9Z0FEZ3rgpPfaq9/view?usp=drive_link" },
      
      { niveau:"lycee",
      type: "examen", 
      matiere: "Français", 
      titre: "Sujet Français-Bac-2000", 
      fichier: "https://drive.google.com/file/d/1lN0XaWVDePePu428G9Z0FEZ3rgpPfaq9/view?usp=drive_link" },
      
      { niveau:"lycee",
      type: "Examen", 
      matiere: "Malagasy", 
      titre: " Sujet Malagasy-Bac-2000", 
      fichier: "https://drive.google.com/file/d/1lN0XaWVDePePu428G9Z0FEZ3rgpPfaq9/view?usp=drive_link" },
      
      { niveau:"lycee", 
      type: "examen", 
      matiere: "Anglais", 
      titre: "Sujet Anglais-Bac-2000", 
      fichier: "https://drive.google.com/file/d/1lN0XaWVDePePu428G9Z0FEZ3rgpPfaq9/view?usp=drive_link" },
      
      { niveau:"lycee", 
      type: "examen", 
      matiere: "Histoire-Géographie", 
      titre: "Sujet Histo-Géo-Bac-2000", 
      fichier: "https://drive.google.com/file/d/1lN0XaWVDePePu428G9Z0FEZ3rgpPfaq9/view?usp=drive_link" },
      
      { niveau:"lycee", 
      type: "examen", 
      matiere: "SVT", 
      titre: "Sujet SVT-Bac-2000", 
      fichier: "https://drive.google.com/file/d/1lN0XaWVDePePu428G9Z0FEZ3rgpPfaq9/view?usp=drive_link" },
      
      { niveau:"lycee", 
      type: "examen", 
      matiere: "Physique", 
      titre: "Sujet Physique-Bac-2000", 
      fichier: "https://drive.google.com/file/d/1lN0XaWVDePePu428G9Z0FEZ3rgpPfaq9/view?usp=drive_link" },
];



          
