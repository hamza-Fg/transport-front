export interface Camion {
    id?: number;  // Optional for creation
    nomCamion: string;
    courses?: Course[]; // Include if you need nested data
  }
  
  // Optional: If you need Course interface
  export interface Course {
    id?: number;
    depart: Localisation;
    arrivee: Localisation;
  }
  
  export interface Localisation {
    x: number;
    y: number;
  }