import { Component, OnInit } from '@angular/core';
import { CamionService } from '../../services/camion.service';
import { OptimisationService } from '../../services/optimisation.service';
import { CommonModule } from '@angular/common';
import { Camion } from '../../models/camion.model';
import { Course } from '../../models/course.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-camions-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './camions-page.component.html'
})
export class CamionsPageComponent implements OnInit {

  camions: Camion[] = [];
  camionTest: Camion = {} as Camion;  // Initialisation typée
  coursesOptimisees: Course[] = [];
  nouveauCamion: Camion = {} as Camion;
  showAddForm = false;
  showEditForm = false;
  camionToEdit: Camion = {} as Camion;

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

  // Sélection d'un camion à tester
  setCamionTest(camion: Camion): void {
    this.camionTest = camion;
    this.envoyerRequeteTest();
  }

  // Appel de l'optimisation pour le camion sélectionné
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

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    this.showEditForm = false;
    if (this.showAddForm) {
      this.nouveauCamion = {} as Camion;
    }
  }

  ajouterCamion(): void {
    if (!this.nouveauCamion.nomCamion) {
      this.errorMessage = 'Le nom du camion est requis';
      return;
    }

    this.isLoading = true;
    this.camionService.createCamion(this.nouveauCamion).subscribe({
      next: (camion) => {
        this.camions.push(camion);
        this.showAddForm = false;
        this.nouveauCamion = {} as Camion;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la création du camion :', err);
        this.errorMessage = 'Impossible de créer le camion.';
        this.isLoading = false;
      }
    });
  }

  supprimerCamion(camion: Camion): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce camion ?')) {
      this.isLoading = true;
      this.camionService.deleteCamion(camion.id!).subscribe({
        next: () => {
          this.camions = this.camions.filter(c => c.id !== camion.id);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du camion :', err);
          this.errorMessage = 'Impossible de supprimer le camion.';
          this.isLoading = false;
        }
      });
    }
  }

  editCamion(camion: Camion): void {
    this.camionToEdit = { ...camion };
    this.showEditForm = true;
    this.showAddForm = false;
  }

  updateCamion(): void {
    if (!this.camionToEdit.nomCamion) {
      this.errorMessage = 'Le nom du camion est requis';
      return;
    }

    this.isLoading = true;
    this.camionService.updateCamion(this.camionToEdit.id!, this.camionToEdit).subscribe({
      next: (updatedCamion) => {
        const index = this.camions.findIndex(c => c.id === updatedCamion.id);
        if (index !== -1) {
          this.camions[index] = updatedCamion;
        }
        this.showEditForm = false;
        this.camionToEdit = {} as Camion;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du camion :', err);
        this.errorMessage = 'Impossible de mettre à jour le camion.';
        this.isLoading = false;
      }
    });
  }

}
