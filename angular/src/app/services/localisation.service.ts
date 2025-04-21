import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Localisation } from '../models/localisation.model';

@Injectable({
  providedIn: 'root'
})
export class LocalisationService {
  private apiUrl = 'http://localhost:8080/localisations'; // adapte au besoin

  constructor(private http: HttpClient) {}

  getAll(): Observable<Localisation[]> {
    return this.http.get<Localisation[]>(this.apiUrl);
  }

  getById(id: number): Observable<Localisation> {
    return this.http.get<Localisation>(`${this.apiUrl}/${id}`);
  }

  create(localisation: Localisation): Observable<Localisation> {
    return this.http.post<Localisation>(this.apiUrl, localisation);
  }

  update(id: number, localisation: Localisation): Observable<Localisation> {
    return this.http.put<Localisation>(`${this.apiUrl}/${id}`, localisation);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
