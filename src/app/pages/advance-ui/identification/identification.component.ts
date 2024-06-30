import { Component, OnInit } from '@angular/core';
//import { latLng, tileLayer, circle, polygon, marker, icon, Layer } from 'leaflet';
import {Map, control} from 'leaflet';
import * as L from 'leaflet';
import 'leaflet-draw';
import { forkJoin } from 'rxjs';
import { ModalsComponent } from '../../ui/modals/modals.component';   
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, Validators, AbstractControl,FormArray} from '@angular/forms';
import 'leaflet-fullscreen';
import { Quartier } from './Quartier.model';
import { ProgrammeService } from './inden.service';
import { Programme } from './programme.model';
import { Commune } from './commune.model';
//import '../../../../../node_modules/leaflet-fullscreen/dist/Leaflet.fullscreen.js';// Importez le module leaflet-fullscreen
// Importez le module leaflet-fullscreen
import {  Delegation } from './Delegation.model';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Gouvernorat } from './Gouvernorat.model';
import { DonneeGenerale } from './DonneeGenerale.model';
import { Logement } from './Logement.model';
import { LogementModerne } from './logement-moderne.model';
import { LogementTypique } from './logement-typique.model';
import { LogementType } from './Logement.model';
import { Qualite } from './Logement.model';
import { TypeReseau } from './TypeReseau.model';
import { CouvertureReseaux} from './CouvertureReseaux.model';
import { Observation } from './Observation.model';
import { FormControl } from '@angular/forms';

declare module 'leaflet' {
  namespace control {
  
    function fullscreen(): Control;
  
  }
  }


@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit { 
  observations: Observation[] = [];
  pourcentage: number = 0; // Define the pourcentage property

  donneeGenerale: DonneeGenerale = new DonneeGenerale();
  logementsTypiques: LogementTypique[] = [];
  logementsModernes: LogementModerne[] = [];
  allLogements: (LogementTypique | LogementModerne)[] = [];
  LogementType = LogementType;  // Enum reference for template
  Qualite = Qualite;  // Enum reference for template
  delegations: Delegation[] = [];
  typeReseaux: TypeReseau[] = [];
  couvertureReseaux: CouvertureReseaux[]=[];
  Quartiers:Quartier[]=[];
  selectedGouvernoratId: number = 0;
  selectedDelegationId: number = 0; // Assurez-vous de l'initialiser avec une valeur appropriée
  selectedCommuneId: number = 0; // Assurez-vous de l'initialiser avec une valeur appropriée
  alphaNumericErrorMessage: string = '';
  numericErrorMessagesurfaceubanise: string = '';
  breadCrumbItems: { label: string; active?: boolean; }[] = [];
  submitted = false;
  display = 'none';
  InvoicesForm: FormGroup;
  showAddItemButton: boolean = true;
  donneegeneraleName: string = '';
  programmeName: string = ''; // Déclarez la propriété programmeName
  gouvernoratName: string = ''; // Déclarez la propriété programmeName
  delegationName: string = '';
  communeName: string = '';
  observation: string = ''; // Variable to hold the observation value
  numericErrorMessagesurnbr: string = '';
  quartierName:string='';
  nouveauNom: string = ''; // Définissez le type et initialisez-le selon vos besoins
  numericErrorMessage: string = '';
  userForm!: FormGroup; // Assurez-vous que le type est correctement défini
  i: number = 0;

  map: L.Map = {} as L.Map;
  drawingLayer: L.FeatureGroup = {} as L.FeatureGroup;
  gouvernorats: Gouvernorat[] = []; // Example initial options
  GouvernoratByname: string = ''; // Define categoryName variable
  programmes: Programme[] = []; // Déclaration de la propriété programmes
  programme: any; // Définir la propriété programme
  gouvernorat:any;
  communes: Commune[] = [];
  errorMessage: string= '';
  typeReseauName: string= '';
   quartier:any;
   selectedTypeReseauId: number = 0;


constructor(private formBuilder: FormBuilder, private modalService: NgbModal, private programmeService: ProgrammeService) { 
 // Pour userForm
 this.userForm = this.formBuilder.group({
  items: this.formBuilder.array([]) // Initialiser avec un tableau vide
});



   
  

  this.selectedGouvernoratId = 0;
  this.selectedDelegationId = 0; // Assurez-vous de l'initialiser avec une valeur appropriée

  this.InvoicesForm = this.formBuilder.group({
    companyAddress: ['', [Validators.required]],
    companyaddpostalcode: ['', [Validators.required]],
    registrationNumber: ['', [Validators.required]],
    companyEmail: ['', [Validators.required]],
    companyWebsite: ['', [Validators.required]],
    companyContactno: ['', [Validators.required]],
    billingName: ['', [Validators.required]],
    billingAddress: ['', [Validators.required]],
    billingPhoneno: ['', [Validators.required]],
    billingTaxno: ['', [Validators.required]],
    same: ['', [Validators.required]],
    shippingName: ['', [Validators.required]],
    shippingAddress: ['', [Validators.required]],
    shippingPhoneno: ['', [Validators.required]],
    shippingTaxno: ['', [Validators.required]],
    productName: ['', [Validators.required]],
    rate: ['', [Validators.required]],
    items: [''],
    densite: [{ value: '', disabled: true }] 
  });    
}

 
ngOnInit(): void {
  this.pourcentage = 0; // Initialisation du pourcentage
  this.selectedTypeReseauId = 0; // Initialisation de l'ID du type de réseau
  this.loadCouvertureReseaux();

  // Charger tous les types de réseaux
  this.programmeService.getAllTypeReseaux().subscribe(
    (data: TypeReseau[]) => this.typeReseaux = data,
    error => console.error('Erreur lors du chargement des types de réseaux :', error)
  );
  this.loadAllLogements();
  this.loadTypeReseaux();
  this.loadCouvertureReseaux();
  this.programmeService.getObservations().subscribe((data) => {
    this.observations = data;
  });
  this.loadDelegationsByGouvernaurat(0);
  this.loadCommunesByDelegation(0);
  this.getQuartiers();
  this.getAllProgrammes();
  this.getAllGouvernorats();
  this.loadGouvernorats();
  this.addItem();
  this.loadTypeReseaux();
  this.initializeMap();
  this.initializeDrawing();

  this.breadCrumbItems = [
    { label: 'Invoices' },
    { label: 'Invoice Details', active: true }
  ];
  this.userForm.controls['pourcentage'].setValidators([Validators.required]);
  this.userForm.controls['items'].setValidators([Validators.required]);
  // Définir le FormGroup avec les contrôles et les validations requises

  
}
  


createItem(): FormGroup {
  return this.formBuilder.group({
    typeReseauId: ['', Validators.required],
    pourcentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
  });
}
items(): FormArray {
  return this.userForm.get('items') as FormArray; // Utiliser myForm au lieu de userForm
}

newItem(): FormGroup {
  return this.formBuilder.group({
    typeReseauId: ['', Validators.required],
    pourcentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
  });
}

addItem(): void {
  this.items().push(this.newItem());
}

removeItem(index: number): void {
  this.items().removeAt(index);
}


createCouvertureReseau(): void {
  if (this.userForm.valid) {
    const couvertureReseauxList = this.userForm.value.items.map((item: any) => ({
      pourcentage: item.pourcentage,
      typeReseau: { id: item.typeReseauId, type: '', couvertureReseauxList: [] }
    }));

    this.programmeService.createCouvertureReseaux(couvertureReseauxList).subscribe(
      (response) => {
        console.log('New Couverture Reseau created:', response);
        this.userForm.reset();
        this.items().clear();
        this.addItem();
      },
      (error) => {
        console.error('Error creating reseau:', error);
      }
    );
  } else {
    console.error('Form is invalid.');
  }
}

onTypeReseauChange(event: any, index: number): void {
  const selectedTypeReseauId = event.target.value;

  // Vérifiez si l'élément de couverture de réseau à l'index donné existe
  if (this.couvertureReseaux[index]) {
    // Vérifiez si la propriété typeReseau de l'élément de couverture de réseau existe
    if (this.couvertureReseaux[index].typeReseau) {
      // Si elle existe, mettez à jour l'ID du type de réseau
      this.couvertureReseaux[index].typeReseau.id = selectedTypeReseauId;
    } else {
      // Si elle n'existe pas, créez un nouvel objet typeReseau avec l'ID sélectionné et initialisez la propriété couvertureReseauxList
      this.couvertureReseaux[index].typeReseau = { id: selectedTypeReseauId, type: '', couvertureReseauxList: [] };
    }
  } else {
    console.error('Couverture Reseau at index', index, 'does not exist.');
  }
}

createNewTypeReseau(): void {
  const newTypeReseau: TypeReseau = { 
    id: 0, 
    type: this.typeReseauName.trim(),
    couvertureReseauxList: []  // Initialisation avec une liste vide
  };
  
  if (!newTypeReseau.type) {
    alert('Please enter a Type Reseau');
    return;
  }

  this.programmeService.createTypeReseau(newTypeReseau).subscribe(
    res => {
      this.typeReseaux.push(res); // Ajout du nouveau type de réseau à la liste
      this.typeReseauName = ''; // Réinitialisation du champ typeReseauName après l'ajout
    },
    error => {
      console.error('Error creating new Type Reseau:', error);
      alert('Error creating new Type Reseau. Please try again later.');
    }
  );
}



  // createCommune(): void {
  //   if (this.communeName && this.selectedDelegationId !== 0) {
  //     const newCommune: Commune = {
  //       id: 0,
  //       name: this.communeName,
  //       delegation: { id: this.selectedDelegationId, name: '', gouvernorat: { id: 0, name: '' } },
  //     };

  //     this.programmeService.createCommune(newCommune).subscribe(
  //       (createdCommune: Commune) => {
  //         console.log('New commune created:', createdCommune);
  //         this.communes.push(createdCommune);
  //         this.communeName = '';
  //       },
  //       error => {
  //         console.error('Error creating commune:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Please fill in all fields.');
  //   }
  // }
  
  deleteTypeReseau(id: number | undefined): void {
    if (id !== undefined) {
      this.programmeService.deleteTypeReseauById(id).subscribe(() => {
        // Traitez la réponse comme nécessaire
        console.log('TypeReseau supprimé');
        this.loadTypeReseaux();
      });
    } else {
      console.error('ID du TypeReseau est indéfini');
    }
  }
  loadTypeReseaux(): void {
    this.programmeService.getAllTypeReseaux().subscribe(res => {
      this.typeReseaux = res;
    });}

  loadCouvertureReseaux(): void {
    this.programmeService.getAllCouvertureReseaux().subscribe(res => {
      this.couvertureReseaux = res;
    });
  }
   ubmitObservation() {
    const newObservation: Observation = {
      observation: this.observation
    };

    this.programmeService.createObservation(newObservation).subscribe(
      response => {
        console.log('Observation created:', response);
        // Handle success, e.g., reset form or navigate to another page
      },
      error => {
        console.error('Error creating observation:', error);
        // Handle error
      }
    );
  }

  // Ajout d'une méthode pour faciliter l'accès aux contrôles de formulaire dans le template
 
  addLogementTypique() {
    this.logementsTypiques.push(new LogementTypique(LogementType.MAISON, 0, Qualite.BONNE));
  }
  
  addLogementModerne() {
    this.logementsModernes.push(new LogementModerne(LogementType.APPARTEMENT, 0, Qualite.BONNE));
  }
  
  saveLogementsTypiques() {
    const saveObservables = this.logementsTypiques.map(logement =>
      this.programmeService.createLogementTypique(logement)
    );
  
    forkJoin(saveObservables).subscribe(
      () => {
        this.loadAllLogements();
        this.logementsTypiques = [];
      },
      error => {
        console.error('Erreur lors de la sauvegarde des logements typiques', error);
      }
    );
  }
 // Méthode pour mettre à jour un logement
 updateLogement(id: number | undefined, updatedLogement: Logement) {
  if (id === undefined) {
    console.error('Error updating logement: id is undefined');
    return; // Ne rien faire si l'ID est indéfini
  }
  this.programmeService.updateLogement(id, updatedLogement).subscribe(
    response => {
      console.log('Logement updated successfully', response);
    },
    error => {
      console.error('Error updating logement', error);
    }
  );
}




 

  deleteLogement(id: number | undefined): void {
    if (id !== undefined) {
      this.programmeService.deleteLogement(id).subscribe(() => {
        // Traitez la réponse comme nécessaire
        console.log('Logement supprimé');
        this.loadAllLogements();
      });
    } else {
      console.error('ID du logement est indéfini');
    }
  }
  
  saveLogementsModernes() {
    const saveObservables = this.logementsModernes.map(logement =>
      this.programmeService.createLogementModerne(logement)
    );
  
    forkJoin(saveObservables).subscribe(
      () => {
        this.loadAllLogements();
        this.logementsModernes = [];
      },
      error => {
        console.error('Erreur lors de la sauvegarde des logements modernes', error);
      }
    );
  }

  loadAllLogements() {
    this.programmeService.getAllLogements().subscribe(
      logements => {
        this.allLogements = logements;
      },
      error => {
        console.error('Erreur lors du chargement des logements', error);
      }
    );
  }
 
  createQuartier(): void {
    console.log('Quartier Name:', this.quartierName);
    console.log('Selected Commune ID:', this.selectedCommuneId);
    
    // Vérifier que les champs quartierName et selectedCommuneId sont remplis
    if (this.quartierName.trim() !== '' && this.selectedCommuneId !== 0) {
      const selectedCommune = this.communes.find(c => c.id === this.selectedCommuneId);
      console.log('Selected Commune:', selectedCommune);
      
      // Vérifier que la commune sélectionnée est trouvée
      if (selectedCommune) {
        const newQuartier: Quartier = {
          id: 0,
          name: this.quartierName,
          commune: selectedCommune
        };
        this.programmeService.createQuartier(newQuartier).subscribe(
          (createdQuartier: Quartier) => {
            console.log('Nouveau quartier créé :', createdQuartier);
            // Ajouter le nouveau quartier à la liste des quartiers
            this.Quartiers.push(createdQuartier);
            // Réinitialiser le champ quartierName
            this.quartierName = '';
          },
          erreur => {
            console.error('Erreur lors de la création du quartier :', erreur);
          }
        );
      }
    }}

  onInputChange(): void {
    this.donneeGenerale.calculerDensite();
  }

  createDonneeGenerale(): void {
    this.donneeGenerale.calculerDensite();
    this.programmeService.createDonneesGenerales(this.donneeGenerale).subscribe(
      response => {
        console.log(response); // Afficher la réponse du backend (pour le débogage)
        this.donneeGenerale = new DonneeGenerale(); // Réinitialiser l'objet DonneeGenerale après la création réussie
      },
      error => {
        console.log(error); // Afficher l'erreur (pour le débogage)
        // Gérer l'erreur de manière appropriée selon votre application
      }
    );
  }

  getQuartiers(): void {
    this.programmeService.getAllQuartiers().subscribe(quartiers => this.Quartiers = quartiers);
  }
  onChangeGouvernaurat(event: Event): void {
    const selectedValue = +(event.target as HTMLSelectElement).value;
    if (!isNaN(selectedValue) && selectedValue !== 0) {
      this.selectedGouvernoratId = selectedValue;
      this.loadDelegationsByGouvernaurat(this.selectedGouvernoratId);
    } else {
      // Si aucune gouvernorat n'est sélectionnée, réinitialiser la liste des délégations
      this.delegations = [];
    }
  }
  
  
  saveData(): void {
    this.createDonneeGenerale();
    this.createQuartier();
    this.saveLogementsTypiques();
    this.saveLogementsModernes();
    this.ubmitObservation();
  }
  
  





    loadQuartierByCommune(communeId: number): void {
    this.programmeService.getQuartiersByCommune(communeId).subscribe(
      (quartiers: Quartier[]) => {
        this.Quartiers = quartiers;
      },
      error => {
        console.error('Error fetching quartiers by commune', error);
      }
    );
  }

  onChangeCommune(event: Event): void {
    const selectedValue = +(event.target as HTMLSelectElement).value;
    if (!isNaN(selectedValue) && selectedValue !== 0) {
      this.selectedCommuneId = selectedValue;
      this.loadQuartierByCommune(this.selectedCommuneId);
    } else {
      this.Quartiers = [];
    }
  }
  validateInput(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);

    // Regex to allow only alphabets and space
    const regex = /^[a-zA-Z\s]*$/;

    if (!regex.test(inputChar)) {
      // Set the error message if the input is not an alphabet
      this.alphaNumericErrorMessage = 'Seules les lettres et les espaces sont autorisés.';
      
      // Prevent default behavior if the input is not an alphabet
      event.preventDefault();
    } else {
      // Clear the error message if the input is valid
      this.alphaNumericErrorMessage = '';
    }
  }  

  validateNumberInput(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);
  
    // Regex to allow only digits
    const regex = /^[0-9]*$/;
  
    if (!regex.test(inputChar)) {
      // Set the error message if the input is not a digit
      this.numericErrorMessage = 'Seuls les chiffres sont autorisés.';
  
      // Prevent default behavior if the input is not a digit
      event.preventDefault();
    } else {
      // Clear the error message if the input is valid
      this.numericErrorMessage = '';
    }
  }
  
  validateNumberInputsurfaceurbanise(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);
  
    // Regex to allow only digits
    const regex = /^[0-9]*$/;
  
    if (!regex.test(inputChar)) {
      // Set the error message if the input is not a digit
      this.numericErrorMessagesurfaceubanise = 'Seuls les chiffres sont autorisés.';
  
      // Prevent default behavior if the input is not a digit
      event.preventDefault();
    } else {
      // Clear the error message if the input is valid
      this.numericErrorMessagesurfaceubanise = '';
    }
  }
  validateNumberInputnbr(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);

    // Regex pour permettre uniquement les chiffres
    const regex = /^[0-9]*$/;

    if (!regex.test(inputChar)) {
      // Définir le message d'erreur si l'entrée n'est pas un chiffre
      this.numericErrorMessagesurnbr = 'Seuls les chiffres sont autorisés.';

      // Empêcher le comportement par défaut si l'entrée n'est pas un chiffre
      event.preventDefault();
    } else {
      // Effacer le message d'erreur si l'entrée est valide
      this.numericErrorMessagesurnbr = '';
    }
  }
  preventWheelChange(event: WheelEvent): void {
    // Prevent the default behavior of mouse wheel scrolling
    event.preventDefault();
  }


  createDelegation(): void {
    if (this.delegationName && this.selectedGouvernoratId !== 0) {
      const newDelegation: Delegation = {
        id: 0,
        name: this.delegationName,
        gouvernorat: { id: this.selectedGouvernoratId, name: '', }, // Assurez-vous que cette structure est correcte
        
      };
      this.programmeService.createDelegation(newDelegation).subscribe(
        (createdDelegation: Delegation) => {
          console.log('New delegation created:', createdDelegation);
          this.delegations.push(createdDelegation);
          this.delegationName = '';
        },
        error => {
          console.error('Error creating delegation:', error);
        }
      );
    } else {
      console.error('Please fill in all fields.');
    }
  }

  onChangeDelegation(event: Event): void {
    const selectedValue = +(event.target as HTMLSelectElement).value;
    if (!isNaN(selectedValue) && selectedValue !== 0) {
      this.selectedDelegationId = selectedValue;
      this.loadCommunesByDelegation(this.selectedDelegationId);
    } else {
      // Si aucune gouvernorat n'est sélectionnée, réinitialiser la liste des délégations
      this.communes = [];
    }
  }
  
  loadDelegationsByGouvernaurat(gouvernoratId: number): void {
    if (!gouvernoratId) {
      // If no gouvernorat is selected, reset delegations and communes
      this.delegations = [];
      this.communes = [];
      return;
    }
  
    this.programmeService.getDelegationsByGouvernaurat(gouvernoratId)
      .subscribe(
        (delegations: Delegation[]) => {
          this.delegations = delegations;
          // Reset communes as a new gouvernorat has been selected
          this.communes = [];
        },
        error => {
          console.error('Error fetching delegations by gouvernorat', error);
        }
      );
  }
  loadCommunesByDelegation(delegationId: number): void {
    if (!delegationId) {
      // If no delegation is selected, reset communes
      this.communes = [];
      return;
    }
  
    this.programmeService.getCommunesByDelegation(delegationId)
      .subscribe(
        (communes: Commune[]) => {
          this.communes = communes;
        },
        error => {
          console.error('Error fetching communes by delegation', error);
        }
      );
  }
 

  createCommune(): void {
    if (this.communeName && this.selectedDelegationId !== 0) {
      const newCommune: Commune = {
        id: 0,
        name: this.communeName,
        delegation: { id: this.selectedDelegationId, name: '', gouvernorat: { id: 0, name: '' } },
      };

      this.programmeService.createCommune(newCommune).subscribe(
        (createdCommune: Commune) => {
          console.log('New commune created:', createdCommune);
          this.communes.push(createdCommune);
          this.communeName = '';
        },
        error => {
          console.error('Error creating commune:', error);
        }
      );
    } else {
      console.error('Please fill in all fields.');
    }
  }
  deleteCommune(id: number): void {
    this.programmeService.deleteCommune(id).subscribe(
      () => {
        console.log(`commune avec l'ID ${id} supprimé avec succès.`);
        
        this.communes = this.communes.filter(commune => commune.id !== id);
      },
      (error) => {
        // Gérez les erreurs ici
        console.error(`Une erreur est survenue lors de la suppression du programme avec l'ID ${id}:`, error);
      }
    );
  }
  
     // Méthode pour récupérer tous les programmes
     getAllProgrammes(): void {
      this.programmeService.getAllProgrammes().subscribe(
        (programmes: Programme[]) => {
          this.programmes = programmes; // Assignation des programmes récupérés à la propriété
          console.log(programmes);
        },
        (error) => {
          // Gérez les erreurs ici
          console.error('Une erreur est survenue lors de la récupération des programmes:', error);
        }
      );
    }
  
    // Méthode pour récupérer un programme par son ID
    getProgrammeById(id: number): void {
      this.programmeService.getProgrammeById(id).subscribe(
        (programme: Programme) => {
          // Traitez le programme récupéré ici
          console.log(programme);
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(`Une erreur est survenue lors de la récupération du programme avec l'ID ${id}:`, error);
        }
      );
    }
    createProgramme(newProgramme: Programme): void {
      this.programmeService.createProgramme(newProgramme).subscribe(
        (programme: Programme) => {
          console.log('Nouveau programme créé:', programme);
          // Ajouter le nouveau programme au tableau
          this.programmes.push(programme);
          // Effacer le nom du programme après l'ajout
          this.programmeName = '';
        },
        (error) => {
          // Gérez les erreurs ici
          console.error('Une erreur est survenue lors de la création du programme:', error);
        }
      );
    }
    
  
    // Méthode pour mettre à jour un programme existant
    updateProgramme(id: number, updatedProgramme: Programme): void {
      this.programmeService.updateProgramme(id, updatedProgramme).subscribe(
        (programme: Programme) => {
          // Traitez le programme mis à jour ici
          console.log('Programme mis à jour:', programme);
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(`Une erreur est survenue lors de la mise à jour du programme avec l'ID ${id}:`, error);
        }
      );
    }
  
   // Méthode pour supprimer un programme
   deleteProgramme(id: number): void {
    this.programmeService.deleteProgrammeById(id).subscribe(
      () => {
        // Programme supprimé avec succès
        console.log(`Programme avec l'ID ${id} supprimé avec succès.`);
        
        // Retirer le programme supprimé du tableau
        this.programmes = this.programmes.filter(programme => programme.id !== id);
      },
      (error) => {
        // Gérez les erreurs ici
        console.error(`Une erreur est survenue lors de la suppression du programme avec l'ID ${id}:`, error);
      }
    );
  }
  
  
  
     // Méthode pour récupérer tous les gouvernaurat
     getAllGouvernorats(): void {
      this.programmeService.getAllGouvernorats().subscribe(
        (gouvernorats: Gouvernorat[]) => {
          this.gouvernorats = gouvernorats; // Assignation des programmes récupérés à la propriété
          console.log(gouvernorats);
        },
        (error) => {
          // Gérez les erreurs ici
          console.error('Une erreur est survenue lors de la récupération des gouvernorat:', error);
        }
      );
    }

    
     // Méthode pour récupérzer un programme par son ID
     getGouvernoratById(id: number): void {
    this.programmeService.getGouvernoratById(id).subscribe(
      (gouvernorat: Gouvernorat) => {
        // Traitez le programme récupéré ici
        console.log(gouvernorat);
      },
      (error) => {
        // Gérez les erreurs ici
        console.error(`Une erreur est survenue lors de la récupération du gouvernorat avec l'ID ${id}:`, error);
      }
    );
  }
     

  createGouvernorat(newGouvernorat: Gouvernorat): void {
    this.programmeService.createGouvernorat(newGouvernorat).subscribe(
      (gouvernorat: Gouvernorat) => {
        console.log('Nouveau gouvernorat créé:', gouvernorat);
        // Ajouter le nouveau programme au tableau
        this.gouvernorats.push(gouvernorat);
        // Effacer le nom du programme après l'ajout
        this.gouvernoratName = '';
        
      },
      (error) => {
        // Gérez les erreurs ici
        console.error('Une erreur est survenue lors de la création du gouvernorat:', error);
      }
    );
  }

  
  loadGouvernorats(): void {
    this.programmeService.getAllGouvernorats().subscribe(
      (data: Gouvernorat[]) => {
        this.gouvernorats = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des gouvernorats:', error);
      }
    );
  }
  deleteDelegation(id: number): void {
    this.programmeService.deleteDelegation(id).subscribe(
      () => {
        console.log(`delegation avec l'ID ${id} supprimé avec succès.`);
        
        this.delegations = this.delegations.filter(delegation => delegation.id !== id);
      },
      (error) => {
        // Gérez les erreurs ici
        console.error(`Une erreur est survenue lors de la suppression du programme avec l'ID ${id}:`, error);
      }
    );
  }
  updateDelegation(delegation: Delegation): void {
    this.programmeService.updateDelegation(delegation.id, delegation).subscribe(
      updatedDelegation => {
        console.log(`Délégation avec l'ID ${updatedDelegation.id} mise à jour avec succès.`);
        // Remplacez la délégation mise à jour dans la liste des délégations
        const index = this.delegations.findIndex(d => d.id === updatedDelegation.id);
        if (index !== -1) {
          this.delegations[index] = updatedDelegation;
        }
      },
      error => {
        // Gérez les erreurs ici
        console.error(`Une erreur est survenue lors de la mise à jour de la délégation avec l'ID ${delegation.id}:`, error);
      }
    );
  }
  
// Méthode pour supprimer un programme
deleteGouvernoratById(id: number): void {
  this.programmeService.deleteGouvernoratById(id).subscribe(
    () => {
      console.log(`gouvernorat avec l'ID ${id} supprimé avec succès.`);
      
      this.gouvernorats = this.gouvernorats.filter(gouvernorat => gouvernorat.id !== id);
    },
    (error) => {
      // Gérez les erreurs ici
      console.error(`Une erreur est survenue lors de la suppression du programme avec l'ID ${id}:`, error);
    }
  );
}
  // Méthode pour mettre à jour un programme existant
  updateGouvernorat(id: number, nouveauNom: string): void {
    const updateGouvernorat: Gouvernorat = { id: id, name: nouveauNom };
    this.programmeService.updateGouvernorat(id, updateGouvernorat).subscribe(
      (gouvernorat: Gouvernorat) => {
        // Traitez le gouvernorat mis à jour ici
        console.log('Gouvernorat mis à jour:', gouvernorat);
      },
      (error) => {
        // Gérez les erreurs ici
        console.error(`Une erreur est survenue lors de la mise à jour du gouvernorat avec l'ID ${id}:`, error);
      }
    );
  }
 

  
  
  methodes(): void {
    this.createQuartier();
  }
  initializeMap() {
    const osmTileLayer = L.tileLayer('https://mts1.google.com/vt/lyrs=y@186112443&hl=x-local&src=app&x={x}&y={y}&z={z}&s=Galile', {
      attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    
    const googleTileLayer = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
      attribution: 'Google Maps'
    });
  
    const osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const osmAttrib = '';
  
    const osm = L.tileLayer(osmUrl, {
      maxZoom: 22,
      attribution: osmAttrib
    });
  
    // Créez votre couche de tuiles (par exemple, osmTileLayer)
    
    // Créez votre carte Leaflet
    this.map = L.map('map', {
      center: new L.LatLng(34.7365314, 9.5804517),
      zoom: 6,
      layers: [osmTileLayer] 
    });
  
    // Ajoutez le contrôle de plein écran à la carte
// Ajoutez le contrôle de plein écran à la carte
control.fullscreen().addTo(this.map);
  }
  

  initializeDrawing() {
    this.drawingLayer = L.featureGroup().addTo(this.map);
    
    const drawControl = new L.Control.Draw({
      position: 'topleft',
      edit: {
        featureGroup: this.drawingLayer
      },
      draw: {
        polyline: false,
        marker: false,
        polygon: {
          allowIntersection: true,
          drawError: {
            color: '#662d91',
            timeout: 3000
          },
          shapeOptions: {
            color: '#662d91',
            weight: 1.5
          },
          showArea: true,
          repeatMode: true,
          metric: true
        },
        rectangle: {
          repeatMode: true,
          metric: true,
          shapeOptions: {
            color: '#662d91',
            weight: 1.5
          }
        },
        circle: {
          repeatMode: true,
          metric: true,
          shapeOptions: {
            color: '#662d91',
            weight: 1.5
          }
        }
      }
    });
    // const baseLayers = {
    //   'OpenStreetMap': osmTileLayer,
    //   'Google Maps': googleTileLayer
    // };
    //L.control.layers(this.baseLayers).addTo(this.map);
    this.map.addControl(drawControl);

    this.map.on('draw:created', (event: any) => {
      const layer = event.layer;
      this.drawingLayer.addLayer(layer);
    });
  }
   /**
   * Lunch modal
   * @param content modal Acontent
   */
   LunchModal(content: any) {
    this.modalService.open(content);
  }


     /**
   * Open scroll modal
   * @param scrollDataModal scroll modal data
   */
     scrollModal(scrollDataModal: any) {
      this.modalService.open(scrollDataModal, { scrollable: true });
    }
  /**
   * Open modal
   * @param content modal content
   */


  /**
   * Open center modal
   * @param centerDataModal center modal data
   */
   centerModal(centerDataModal: any) {
    this.modalService.open(centerDataModal, { centered: true });
  }
  /**
   * Static modal
   * @param StaticDataModal modal content
   */
  StaticModal(StaticDataModal: any) {
    this.modalService.open(StaticDataModal, { centered: true });
  }
    /**
   * Lunch Demo modal
   * @param content modal content
   */
    LunchDemoModal(content: any) {
      this.modalService.open(content);
    }
    
 

  


getItemFormControls(): AbstractControl[] {
    return (this.userForm.get('items') as FormArray).controls;
  }

  
   /**
  * Save user
  */
   saveUser() {
    this.submitted = true
  }
   /**
   * Form data get
   */
   get form() {
    return this.InvoicesForm.controls;
  }
  addOption() {
    if (this.programmeName.trim() !== '') {
      // Create a new Programme object
      const newProgramme: Programme = { id: 0, name: this.programmeName };
      // Add the new Programme object to the programmes array
      this.programmes.push(newProgramme);
      // Clear the programmeName after adding
      this.programmeName = '';
    }
    
  }
  close(): void {
    // Récupérez la référence du modal ouvert
     this.modalService.dismissAll();

  }
  
  
  openModal(content: any) {
    // Méthode pour ouvrir le modal
    this.modalService.open(content);
  }
  
  
  
}
