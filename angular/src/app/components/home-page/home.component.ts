import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Déclare des propriétés si nécessaire
  title: string = "Bienvenue sur notre site";
  subtitle: string = "Optimisation du trajet et bien plus encore";

  // Tu peux ajouter des méthodes pour gérer les événements, comme un clic sur un bouton
  startJourney(): void {
    console.log("Début du voyage!");
    // Tu pourrais aussi naviguer vers une autre page ou effectuer une autre action
  }
}
