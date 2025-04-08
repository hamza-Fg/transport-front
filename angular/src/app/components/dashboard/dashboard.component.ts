import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Données d'exemple pour les statistiques et optimisations
  statistics = {
    deliveriesCompleted: 120,
    averageDeliveryTime: 30, // en minutes
    trucksAvailable: 15
  };

  optimizations = [
    { date: '2025-04-01', description: 'Optimisation du trajet pour camion #23' },
    { date: '2025-04-02', description: 'Réduction du temps de livraison pour camion #5' },
    { date: '2025-04-03', description: 'Optimisation des itinéraires pour 3 camions' }
  ];

  // Carte interactive - données de géolocalisation (exemple)
  mapData = {
    lat: 48.8566,
    lng: 2.3522, // Paris (exemple)
    zoom: 10
  };
}
