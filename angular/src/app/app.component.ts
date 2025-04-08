import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapComponent } from './components/map/map.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapComponent,RouterModule,SidebarComponent,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
// Initialisation de la carte
onButtonClick() {
throw new Error('Method not implemented.');
}
  title = 'OpenStreetMap avec Angular';
  private map: L.Map | undefined; // Variable pour stocker l'instance de la carte

  constructor() { }

  ngOnInit(): void {
    
  }

  // Méthode pour initialiser la carte
  private initializeMap(): void {
    // Coordonnées du centre de la carte (exemple : Paris)
    const parisCoordinates: L.LatLngExpression = [48.8566, 2.3522];

    // Initialisation de la carte
    this.map = L.map('map').setView(parisCoordinates, 13);

    // Ajout de la couche OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Ajout d'un marqueur
    const marker = L.marker(parisCoordinates).addTo(this.map);
    marker.bindPopup('Paris, France').openPopup();

    // Gestion des clics sur la carte
    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      alert(`Clic sur la carte : Latitude = ${lat}, Longitude = ${lng}`);
    });
  }

  // Méthode pour zoomer sur la carte
  public zoomIn(): void {
    if (this.map) {
      this.map.zoomIn();
    }
  }

  // Méthode pour dézoomer sur la carte
  public zoomOut(): void {
    if (this.map) {
      this.map.zoomOut();
    }
  }
}