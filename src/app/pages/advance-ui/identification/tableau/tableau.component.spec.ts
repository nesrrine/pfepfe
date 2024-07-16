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
  imageUrl: string | ArrayBuffer | null = null;

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Invoices' },
      { label: 'Invoice Details', active: true }
    ];
  }

  removeCustomer(customerToRemove: any) {
    const index = this.customers.indexOf(customerToRemove);
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
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
