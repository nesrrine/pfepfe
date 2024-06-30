import { CouvertureReseaux } from "./CouvertureReseaux.model";
export interface TypeReseau {
  id: number;
  type: string;
  couvertureReseauxList: CouvertureReseaux[];
}
