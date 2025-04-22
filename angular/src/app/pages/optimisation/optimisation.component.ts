import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-optimisation',
  standalone: true,
  templateUrl: './optimisation.component.html',
  styleUrls: ['./optimisation.component.scss'],
  imports: [DatePipe]  // Assurez-vous que DatePipe est importé ici
})
export class OptimisationComponent {
  derniereOptimisation = {
    date: new Date(),
    trajet: 'A → B → C',
    gainTemps: '25%'
  };

  formattedDate: string;

  constructor(private datePipe: DatePipe) {
    this.formattedDate = this.datePipe.transform(this.derniereOptimisation.date, 'short') || '';  // Format de la date
  }
}
