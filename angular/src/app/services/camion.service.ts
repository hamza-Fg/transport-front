import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Camion } from '../models/camion.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CamionService {

  private apiUrl = `${environment.apiUrl}/camions`;

  constructor(private http: HttpClient) { }

  // Create a new Camion
  createCamion(camion: Camion): Observable<Camion> {
    return this.http.post<Camion>(this.apiUrl, camion)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get all Camions
  getAllCamions(): Observable<Camion[]> {
    return this.http.get<Camion[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get a single Camion by ID
  getCamionById(id: number): Observable<Camion> {
    return this.http.get<Camion>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update a Camion
  updateCamion(id: number, camion: Camion): Observable<Camion> {
    return this.http.put<Camion>(`${this.apiUrl}/${id}`, camion);
  }

  // Delete a Camion
  deleteCamion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
