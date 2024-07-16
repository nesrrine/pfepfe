import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})
export class TableauComponent implements OnInit {
  breadCrumbItems: { label: string; active?: boolean; }[] = [];
  submitted = false;
  showAddItemButton: boolean = true;
  customers = [
    { name: 'Customer Name', email: 'customer@example.com', phone: '123456789', joiningDate: '2024-05-12', deliveryStatus: 'Delivered' }
  ];
  imageUrl: string | ArrayBuffer | null = null; // Ajout de la propriété pour stocker l'URL de l'image sélectionnée
  isLargeImage: boolean = false; // Ajout de la propriété pour déterminer la taille de l'image

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Invoices' },
      { label: 'Invoice Details', active: true }
    ];
  }

  removeCustomer(customerToRemove: any) {
    // Recherchez le client dans le tableau
    const index = this.customers.indexOf(customerToRemove);
    // Si le client est trouvé, supprimez-le
    if (index !== -1) {
      this.customers.splice(index, 1);
    }
  }
  isFolderOpen: boolean = false;

  toggleFolder() {
    this.isFolderOpen = !this.isFolderOpen;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = reader.result; // Stockez l'URL de l'image sélectionnée
        this.isLargeImage = false; // Réinitialiser la taille de l'image à sa valeur initiale
      };
      reader.readAsDataURL(file);
    }
  }

  toggleImageSize() {
    this.isLargeImage = !this.isLargeImage;
  }
}
