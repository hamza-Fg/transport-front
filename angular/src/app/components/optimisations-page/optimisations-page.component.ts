import { Component } from '@angular/core';
import { OptimalRouteResponse } from '../../models/optimal-route-response.model';
import { OptimisationService } from '../../services/optimisation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-optimisation-pages',
  standalone:true,
  imports: [
    CommonModule,
    FormsModule // Ajoute FormsModule ici
  ],
  templateUrl: './optimisations-page.component.html',
  styleUrls: ['./optimisations-page.component.scss']
})
export class OptimisationPagesComponent {
  response: OptimalRouteResponse | null = null;
  isLoading = false;
  error: string | null = null;
camionId: number=0;
  constructor(private optimisationService: OptimisationService) {}

  optimize(camionId: number): void {
    this.isLoading = true;
    this.error = null;

    this.optimisationService.optimizeRoute(camionId).subscribe({
      next: (res: any) => {
        this.response = res;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.error = 'Erreur lors de l\'optimisation';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
