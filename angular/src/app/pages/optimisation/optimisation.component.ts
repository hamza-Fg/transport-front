import { Component } from '@angular/core';

@Component({
  selector: 'app-optimisation',
  standalone:true,
  templateUrl: './optimisation.component.html',
  styleUrls: ['./optimisation.component.scss']
})
export class OptimisationComponent {
  derniereOptimisation = {
    date: new Date(),
    trajet: 'A → B → C',
    gainTemps: '25%'
  };
}
