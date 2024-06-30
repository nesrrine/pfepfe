import { TypeReseau } from "./TypeReseau.model";

export interface CouvertureReseaux {
  id: number;
  pourcentage: number;
  typeReseau: TypeReseau;
}
