import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-course-page',
  standalone: true,
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule
    // Ajoutez ici d'autres modules nécessaires, comme FormsModule si vous utilisez ngModel
  ] // Ajoutez ici les modules nécessaires
})
export class CoursePageComponent implements OnInit {
  courses: Course[] = [];
  courseForm: FormGroup;
  selectedCourseId: number | null = null;

  constructor(private courseService: CourseService, private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      departX: [''],
      departY: [''],
      arriveeX: [''],
      arriveeY: [''],
      camionId: ['']
    });
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAll().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }

  onSubmit(): void {
    const formValue = this.courseForm.value;
    const course: Course = {
      depart: { x: formValue.departX, y: formValue.departY },
      arrivee: { x: formValue.arriveeX, y: formValue.arriveeY },
      camionId: formValue.camionId
    };

    if (this.selectedCourseId) {
      this.courseService.update(this.selectedCourseId, course).subscribe(() => {
        this.loadCourses();
        this.courseForm.reset();
        this.selectedCourseId = null;
      });
    } else {
      this.courseService.create(course).subscribe(() => {
        this.loadCourses();
        this.courseForm.reset();
      });
    }
  }

  editCourse(course: Course): void {
    this.selectedCourseId = course.id || null;
    this.courseForm.patchValue({
      departX: course.depart.x,
      departY: course.depart.y,
      arriveeX: course.arrivee.x,
      arriveeY: course.arrivee.y,
      camionId: course.camionId
    });
  }

  deleteCourse(id: number): void {
    this.courseService.delete(id).subscribe(() => {
      this.loadCourses();
    });
  }
}
