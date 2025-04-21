import { Camion } from './camion.model';
import { Localisation } from './localisation.model';

export interface Course {
  id?: number;
  camion?: Camion;  // Référence au camion
  depart: Localisation;  // Localisation de départ
  arrivee: Localisation;  // Localisation d'arrivée
}
