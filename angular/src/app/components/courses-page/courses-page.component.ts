import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Courses du camion</h1>
      
      <div *ngIf="isLoading" class="text-center py-4">
        Chargement des courses...
      </div>

      <div *ngIf="errorMessage" class="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
        {{ errorMessage }}
      </div>

      <table *ngIf="courses.length > 0" class="w-full mt-4 border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-3 border border-gray-300">ID</th>
            <th class="p-3 border border-gray-300">Point de départ</th>
            <th class="p-3 border border-gray-300">Point d'arrivée</th>
            <th class="p-3 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let course of courses" class="hover:bg-gray-50">
            <td class="p-3 border border-gray-300 text-center">{{ course.id }}</td>
            <td class="p-3 border border-gray-300 text-center">
              {{ course.depart?.x }}, {{ course.depart?.y }}
            </td>
            <td class="p-3 border border-gray-300 text-center">
              {{ course.arrivee?.x }}, {{ course.arrivee?.y }}
            </td>
            <td class="p-3 border border-gray-300 text-center space-x-2">
              <button 
                class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Détails
              </button>
              <button 
                class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
              >
                Modifier
              </button>
              <button 
                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div *ngIf="courses.length === 0 && !isLoading" class="p-4 bg-gray-100 rounded-lg">
        <p class="text-gray-600">Aucune course disponible pour ce camion.</p>
      </div>
    </div>
  `
})
export class CoursesPageComponent implements OnInit {
  courses: Course[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const camionId = params['idCamion'];
      if (camionId) {
        this.loadCourses(camionId);
      }
    });
  }

  loadCourses(camionId: number): void {
    this.isLoading = true;
    this.courseService.getAllCoursesByCamionId(camionId).subscribe({
      next: (data) => {
        this.courses = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur de chargement des courses :', err);
        this.errorMessage = 'Impossible de charger les courses.';
        this.isLoading = false;
      }
    });
  }
} 