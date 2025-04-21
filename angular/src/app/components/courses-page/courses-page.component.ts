import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { FormsModule } from '@angular/forms';
import { LocalisationService } from '../../services/localisation.service';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {
  courses: Course[] = [];
  isLoading = false;
  errorMessage = '';
  showEditForm = false;
  showDeleteDialog = false;
  showAddForm = false;

  courseToEdit: Course = {
    id: 0,
    depart: { x: 0, y: 0 },
    arrivee: { x: 0, y: 0 }
  };

  newCourse: Course = {
    id: 0,
    depart: { x: 0, y: 0 },
    arrivee: { x: 0, y: 0 }
  };

  courseToDelete: Course | null = null;
  camionId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private localisationService: LocalisationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.camionId = params['idCamion'];
      if (this.camionId) {
        this.loadCourses(this.camionId);
      }
    });
  }

  loadCourses(camionId: number): void {
    this.isLoading = true;
    this.courseService.getAllCoursesByCamionId(camionId).subscribe({
      next: (data) => {
        this.courses = data.map(course => ({
          ...course,
          depart: course.depart || { x: 0, y: 0 },
          arrivee: course.arrivee || { x: 0, y: 0 }
        }));
        this.isLoading = false;
      },
      error: (err: Error) => {
        console.error('Erreur :', err);
        this.errorMessage = 'Impossible de charger les courses.';
        this.isLoading = false;
      }
    });
  }

  showAddCourseForm(): void {
    this.showAddForm = true;
    this.newCourse = {
      id: 0,
      depart: { x: 0, y: 0 },
      arrivee: { x: 0, y: 0 }
    };
  }

  addCourse(): void {
    if (!this.camionId) {
      this.errorMessage = "ID du camion manquant.";
      return;
    }

    this.isLoading = true;
    console.log(this.newCourse)
    this.courseService.createCourse(this.newCourse).subscribe({
      next: (createdCourse: Course) => {
        this.courses.push(createdCourse);
        this.showAddForm = false;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Erreur lors de l’ajout :', err);
        this.errorMessage = 'Impossible d’ajouter la course.';
        this.isLoading = false;
      }
    });
  }

  editCourse(course: Course): void {
    this.courseToEdit = {
      ...course,
      depart: course.depart || { x: 0, y: 0 },
      arrivee: course.arrivee || { x: 0, y: 0 }
    };
    this.showEditForm = true;
  }

  updateCourse(): void {
    if (!this.courseToEdit.id) {
      this.errorMessage = 'ID manquant';
      return;
    }

    this.isLoading = true;
    this.courseService.updateCourse(this.courseToEdit.id, this.courseToEdit).subscribe({
      next: (updatedCourse: Course) => {
        const index = this.courses.findIndex(c => c.id === updatedCourse.id);
        if (index !== -1) {
          this.courses[index] = updatedCourse;
        }
        this.showEditForm = false;
        this.isLoading = false;
      },
      error: (err: Error) => {
        console.error('Erreur MAJ :', err);
        this.errorMessage = 'Erreur MAJ course';
        this.isLoading = false;
      }
    });
  }

  showDeleteConfirmation(course: Course): void {
    this.courseToDelete = course;
    this.showDeleteDialog = true;
  }

  confirmDelete(): void {
    if (!this.courseToDelete?.id) {
      this.errorMessage = 'ID manquant';
      return;
    }

    this.isLoading = true;
    this.courseService.deleteCourse(this.courseToDelete.id).subscribe({
      next: () => {
        this.courses = this.courses.filter(c => c.id !== this.courseToDelete?.id);
        this.showDeleteDialog = false;
        this.courseToDelete = null;
        this.isLoading = false;
      },
      error: (err: Error) => {
        console.error('Erreur suppression :', err);
        this.errorMessage = 'Erreur suppression course';
        this.isLoading = false;
      }
    });
  }
}
