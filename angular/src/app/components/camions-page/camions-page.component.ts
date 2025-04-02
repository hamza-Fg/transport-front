import { Component } from '@angular/core';
import { Camion } from '../../models/model';
import { CamionService } from '../../services/camion.service';

@Component({
  selector: 'app-camions-page',
  standalone: true,
  imports: [],
  templateUrl: './camions-page.component.html',
  styleUrl: './camions-page.component.scss'
})
export class CamionsPageComponent {
  camions: Camion[] = [];
  
  constructor(private camionService: CamionService) {}

  ngOnInit(): void {
    this.loadCamions();
  }


  loadCamions(): void {
    this.camionService.getAllCamions().subscribe({
      next: (data) => this.camions = data,
      error: (err) => console.error('Error loading camions:', err)
    });
  }

}
