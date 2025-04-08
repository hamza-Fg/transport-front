import { Localisation } from './localisation.model';

export interface OptimisationResult {
  cheminOptimise: Localisation[];  // Liste des localisations optimisées (chemin optimal)
  distanceTotale: number;  // Distance totale du trajet optimisé
  tempsEstime: number;  // Temps estimé pour le trajet optimisé (en heures)
}
