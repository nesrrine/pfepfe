  // programme-intervention.model.ts
  import { Infrastructurestype } from "./Infrastructurestype.model";
  export interface ProgrammeIntervention {
    id: number;
    quantites: number;
    cout: number;
    infrastructurestype: Infrastructurestype;
  }