import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

// Définition des icônes
const redIcon = L.icon({
  iconUrl: 'assets/red-marker.svg',
  iconSize: [32, 32],   // Taille de l'icône
  iconAnchor: [16, 32],  // L'ancrage de l'icône
  popupAnchor: [0, -30]  // Position de la popup par rapport à l'icône
});

const blueIcon = L.icon({
  iconUrl: 'assets/blue-marker.svg',
  iconSize: [32, 32],   // Taille de l'icône
  iconAnchor: [16, 32],  // L'ancrage de l'icône
  popupAnchor: [0, -30]  // Position de la popup par rapport à l'icône
});

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map: any;
  centerLongitude = 120.95;
  centerLatitude = 23.75;
  zoomsize = 7;

  // Liste des points avec leur couleur
  points = [
    { lat: 48.8566, lng: 2.3522, label: 'Paris', color: 'red' },
    { lat: 45.7640, lng: 4.8357, label: 'Lyon', color: 'blue' },
    { lat: 43.2965, lng: 5.3698, label: 'Marseille', color: 'red' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap(): void {
    // Initialisation de la carte
    this.map = L.map('map', {
      center: [this.centerLatitude, this.centerLongitude],
      zoomControl: false,
      zoom: this.zoomsize,
      attributionControl: false,
    });

    // Ajouter les tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Ajout des marqueurs et des popups
    this.points.forEach(point => {
      const icon = point.color === 'red' ? redIcon : blueIcon;

      L.marker([point.lat, point.lng], { icon })
        .addTo(this.map)
        .bindPopup(`<b>${point.label}</b>`);
    });

    // Tracer une ligne entre les points
    const latlngs = this.points.map(p => [p.lat, p.lng]) as [number, number][];
    const polyline = L.polyline(latlngs, { color: 'blue' }).addTo(this.map);

    // Ajuster le zoom pour afficher toute la ligne
    this.map.fitBounds(polyline.getBounds());
  }
}
