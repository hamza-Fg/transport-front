import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OptimalRouteResponse {
  camionId: number;
  nomCamion: string;
  ordreCourseIds: number[];
  distanceTotale: number;
}

@Injectable({
  providedIn: 'root',
})
export class OptimisationService {
  private baseUrl = 'http://localhost:8080/api/routes';

  constructor(private http: HttpClient) {}

  optimizeRoute(camionId: number): Observable<OptimalRouteResponse> {
    return this.http.get<OptimalRouteResponse>(`${this.baseUrl}/optimize/${camionId}`);
  }
}
