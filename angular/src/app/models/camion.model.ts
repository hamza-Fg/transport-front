import { Course } from './course.model';
import { Localisation } from './localisation.model';

export interface Camion {
  id: number;
  nomCamion: string;
  capacite: number;
  positionActuelle: Localisation;  // Localisation actuelle du camion
  courses: Course[];  // Liste des courses effectuées par le camion
}
