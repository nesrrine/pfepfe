// Infrastructurestype.model.ts
import { ProgrammeIntervention } from "./ProgrammeIntervention.model";

export interface Infrastructurestype {
  id: number;
  type: string;
  infrastructurestypeList: ProgrammeIntervention[];
}
