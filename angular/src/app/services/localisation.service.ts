import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Localisation } from '../models/localisation.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalisationService {
  private apiUrl = `http://localhost:8080/courses`;


  constructor(private http: HttpClient) {}

  getAll(): Observable<Localisation[]> {
    return this.http.get<Localisation[]>(this.apiUrl);
  }

  getById(id: number): Observable<Localisation> {
    return this.http.get<Localisation>(`${this.apiUrl}/${id}`);
  }

  create(loc: Localisation): Observable<Localisation> {
    return this.http.post<Localisation>(this.apiUrl, loc);
  }

  update(id: number, loc: Localisation): Observable<Localisation> {
    return this.http.put<Localisation>(`${this.apiUrl}/${id}`, loc);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
