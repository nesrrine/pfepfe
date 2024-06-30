export class DonneeGenerale {
  id?: number;
  surface?: number;
  surfaceUrbanisee?: number;
  nombreLogements?: number;
  densite?: number;


  constructor() {
    // Optionnel: Vous pouvez laisser le constructeur vide
  }

  calculerDensite(): void {
    if (this.surfaceUrbanisee !== undefined && this.surfaceUrbanisee !== 0) {
      this.densite = this.nombreLogements! / this.surfaceUrbanisee;
    } else {
      this.densite = 0;
    }
  }
}
