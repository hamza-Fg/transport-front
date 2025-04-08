import { Localisation } from './localisation.model';

export interface Course {
  id: number;
  camionId: number;  // Référence au camion
  depart: Localisation;  // Localisation de départ
  arrivee: Localisation;  // Localisation d'arrivée
  heureDepart: string;  // Format ISO String : "2025-04-10T08:00:00"
  heureArriveePrevue: string;
  priorite: 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW';  // Priorité de la course
  poids: number;  // Poids de la marchandise à transporter
}
