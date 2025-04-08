import { Component } from '@angular/core';
import { Camion, Course } from '../../models/model';
import { CamionService } from '../../services/camion.service';
import { OptimisationService } from '../../services/optimisation.service';

@Component({
  selector: 'app-camions-page',
  standalone: true,
  imports: [],
  templateUrl: './camions-page.component.html',
  styleUrl: './camions-page.component.scss'
})
export class CamionsPageComponent {
  camions: Camion[] = [];
  camionTest: Camion = {};
  coursesOptimisees: Course[] = [];
  constructor(private camionService: CamionService,private optimisationService: OptimisationService) {}

  ngOnInit(): void {
    this.loadCamions();
    this.camionTest = this.optimisationService.creerObjetTest();

  }


  loadCamions(): void {
    this.camionService.getAllCamions().subscribe({
      next: (data) => this.camions = data,
      error: (err) => console.error('Error loading camions:', err)
    });
  }

  envoyerRequeteTest() {
 
    
    this.optimisationService.optimiserTrajet(this.camionTest)
      .subscribe({
        next: (courses) => {
          this.coursesOptimisees = courses;
        },
        error: (err) => {
          console.log(`Erreur lors de l'optimisation : ${err.message}`);
        }
      });
  }

}
