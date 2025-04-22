import { Localisation } from './localisation.model';

export interface Course {
  id?: number;
  camionId?: number;
  depart: Localisation;
  arrivee: Localisation;
}
