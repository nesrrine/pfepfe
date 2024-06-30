import { Logement } from "./Logement.model";
import { LogementType } from "./Logement.model";
import { Qualite } from "./Logement.model";
export class LogementModerne extends Logement {
    constructor(type: LogementType, pourcentage: number, qualite: Qualite, id?: number) {
      super(type, pourcentage, qualite, id);
    }}