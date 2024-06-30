import { Commune } from './commune.model';

export interface Quartier {
  id: number;
  name: string;
  commune: Commune;  // Reference to the Commune interface
}
