import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camion, Course } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class OptimisationService {
    private apiUrl = 'http://localhost:8080/api/trajets';

  constructor(private http: HttpClient) { }

  /**
   * Envoie une requête POST pour optimiser le trajet d'un camion
   * @param camion Objet Camion avec ses courses à optimiser
   * @returns Observable avec la liste des courses optimisées
   */
  optimiserTrajet(camion: Camion): Observable<Course[]> {
    return this.http.post<Course[]>(`${this.apiUrl}/optimiser`, camion);
  }
  
  /**
   * Crée un objet de test pour l'API
   * @returns Un objet Camion avec des courses de test
   */
  creerObjetTest(): Camion {
    return {
      nomCamion: 'Camion Test',
      courses: [
        {
          depart: { x: 10, y: 20 },
          arrivee: { x: 30, y: 40 }
        },
        {
          depart: { x: 50, y: 60 },
          arrivee: { x: 70, y: 80 }
        },
        {
          depart: { x: 15, y: 25 },
          arrivee: { x: 35, y: 45 }
        },
        {
          depart: { x: 5, y: 12 },
          arrivee: { x: 22, y: 38 }
        }
      ]
    };
  }

  
}
