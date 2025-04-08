import { Component } from '@angular/core';

@Component({
  selector: 'app-camions',
  standalone:true,
  templateUrl: './camions.component.html',
  styleUrls: ['./camions.component.scss']
})
export class CamionsComponent {
  camions = [
    { id: 1, nom: 'Camion A', capacite: 10 },
    { id: 2, nom: 'Camion B', capacite: 20 }
  ];
}
