export interface Localisation {
    id: number;
    nom: string;  // Nom de la localisation (par exemple, ville, entrepôt)
    x: number;  // Coordonnée X (latitude/longitude)
    y: number;  // Coordonnée Y (latitude/longitude)
    distanceTo(other: Localisation): number;  // Méthode pour calculer la distance entre deux localisations
  }
  