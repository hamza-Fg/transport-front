import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  createCourseToCamion(camionId: number, newCourse: Course) {
    throw new Error('Method not implemented.');
  }
  addCourseToCamion(camionId: number, newCourse: Course) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8080/courses';

  constructor(private http: HttpClient) { }

  getAllCoursesByCamionId(camionId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/camion/${camionId}`);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}`, course );
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
} 