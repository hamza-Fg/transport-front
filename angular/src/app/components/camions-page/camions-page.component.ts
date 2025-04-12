import { Component, OnInit } from '@angular/core';
import { Camion, Course } from '../../models/model';
import { CamionService } from '../../services/camion.service';
import { OptimisationService } from '../../services/optimisation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-camions-page',
  standalone: true,
  
  imports: [CommonModule],
  templateUrl: './camions-page.component.html',
  styleUrls: ['./camions-page.component.scss']
})
export class CamionsPageComponent implements OnInit {

  camions: Camion[] = [];
  camionTest: Camion = {} as Camion;  // Initialisation typée
  coursesOptimisees: Course[] = [];

  isLoading = false;
  isOptimising = false;
  errorMessage = '';

  constructor(
    private camionService: CamionService,
    private optimisationService: OptimisationService
  ) {}

  ngOnInit(): void {
    this.loadCamions();
  }

  // Récupération des camions depuis le backend
  loadCamions(): void {
    this.isLoading = true;
    this.camionService.getAllCamions().subscribe({
      next: (data) => {
        this.camions = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur de chargement des camions :', err);
        this.errorMessage = 'Impossible de charger les camions.';
        this.isLoading = false;
      }
    });
  }

  // Sélection d’un camion à tester
  setCamionTest(camion: Camion): void {
    this.camionTest = camion;
    this.envoyerRequeteTest();
  }

  // Appel de l’optimisation pour le camion sélectionné
  envoyerRequeteTest(): void {
    this.isOptimising = true;
    this.errorMessage = '';
    this.coursesOptimisees = [];

    this.optimisationService.optimiserTrajet(this.camionTest).subscribe({
      next: (courses) => {
        this.coursesOptimisees = courses;
        this.isOptimising = false;
      },
      error: (err) => {
        console.error('Erreur lors de l\'optimisation :', err);
        this.errorMessage = 'Échec de l\'optimisation.';
        this.isOptimising = false;
      }
    });
  }

}
