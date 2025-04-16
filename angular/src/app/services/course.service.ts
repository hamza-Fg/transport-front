import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) { }

  getAllCoursesByCamionId(camionId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/camion/${camionId}`);
  }
} 