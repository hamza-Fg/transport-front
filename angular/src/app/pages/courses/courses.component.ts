import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  standalone:true,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses = [
    { id: 1, depart: 'Point A', arrivee: 'Point B', priorite: 'URGENT' },
    { id: 2, depart: 'Point C', arrivee: 'Point D', priorite: 'LOW' }
  ];
}
