export abstract class Logement {
  id?: number;
  type: string;
  pourcentage: number; // Changement de description à pourcentage
  qualite: string; // Ajout de la propriété de qualité

  constructor(type: string, pourcentage: number, qualite: string, id?: number) {
    this.type = type;
    this.pourcentage = pourcentage;
    this.qualite = qualite; // Initialisation de la propriété de qualité
    if (id) {
      this.id = id;
    }
  }
}
export enum LogementType {
  MAISON = 'MAISON',
  HOUCH = 'HOUCH',
  APPARTEMENT = 'APPARTEMENT',
  VILLA = 'VILLA'
}

export enum Qualite {
  BONNE = 'BONNE',
  MOYENNE = 'MOYENNE',
  MAUVAISE = 'MAUVAISE'
}
export class LogementTypique extends Logement {
  typologie: LogementType;

  constructor(pourcentage: number, qualite: Qualite, typologie: LogementType, id?: number) {
    super(typologie, pourcentage, qualite, id);
    this.typologie = typologie;
  }
}


