import { Gouvernorat } from "./Gouvernorat.model";
export interface Delegation {
  id: number;
  name: string;
  gouvernorat: Gouvernorat; // Relation avec l'objet Gouvernorat
}
