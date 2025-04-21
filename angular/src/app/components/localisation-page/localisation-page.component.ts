import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { Localisation } from '../../models/localisation.model';
import { LocalisationService } from '../../services/localisation.service';



@Component({
  selector: 'app-localisations-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl:'./localisation-page.component.html',
  styleUrls: ['./localisation-page.component.scss']
})
export class LocalisationsPageComponent implements OnInit {
  localisations: Localisation[] = [];
  newLocalisation: Localisation = { x: 0, y: 0 };
  selectedLocalisation: Localisation | null = null;
  isEditing = false;

  constructor(private localisationService: LocalisationService) {}

  ngOnInit(): void {
    this.loadLocalisations();
  }

  loadLocalisations(): void {
    this.localisationService.getAll().subscribe(data => this.localisations = data);
  }

  addLocalisation(): void {
    this.localisationService.create(this.newLocalisation).subscribe(loc => {
      this.localisations.push(loc);
      this.newLocalisation = { x: 0, y: 0 };
    });
  }

  edit(localisation: Localisation): void {
    this.selectedLocalisation = { ...localisation };
    this.isEditing = true;
  }

  updateLocalisation(): void {
    if (!this.selectedLocalisation) return;

    this.localisationService.update(this.selectedLocalisation.id!, this.selectedLocalisation).subscribe(updated => {
      const index = this.localisations.findIndex(l => l.id === updated.id);
      if (index !== -1) this.localisations[index] = updated;
      this.selectedLocalisation = null;
      this.isEditing = false;
    });
  }

  deleteLocalisation(id: number): void {
    this.localisationService.delete(id).subscribe(() => {
      this.localisations = this.localisations.filter(l => l.id !== id);
    });
  }
}
