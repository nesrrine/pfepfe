import { Delegation } from "./Delegation.model";
export interface Commune {
  id: number;
  name: string;
  delegation: Delegation; // Assurez-vous de créer le modèle Delegation si nécessaire
}
