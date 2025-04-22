import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { Localisation } from '../../models/course.model'; // adapte le chemin si nécessaire

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input() depart!: Localisation;
  @Input() arrivee!: Localisation;

  private map!: L.Map;
  private departMarker?: L.Marker;
  private arriveeMarker?: L.Marker;

  ngAfterViewInit(): void {
    this.map = L.map('map', {
      center: [33.589886, -7.603869], // point central initial
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(this.map);

    this.addMarkers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map) {
      this.addMarkers();
    }
  }

  private addMarkers(): void {
    if (this.departMarker) this.map.removeLayer(this.departMarker);
    if (this.arriveeMarker) this.map.removeLayer(this.arriveeMarker);

    if (this.depart) {
      this.departMarker = L.marker([this.depart.y, this.depart.x])
        .addTo(this.map)
        .bindPopup('Départ')
        .openPopup();
    }

    if (this.arrivee) {
      this.arriveeMarker = L.marker([this.arrivee.y, this.arrivee.x])
        .addTo(this.map)
        .bindPopup('Arrivée');
    }

    // Centrer entre les deux points s'ils existent
    if (this.depart && this.arrivee) {
      const bounds = L.latLngBounds(
        [this.depart.y, this.depart.x],
        [this.arrivee.y, this.arrivee.x]
      );
      this.map.fitBounds(bounds, { padding: [50, 50] });
    }
  }
}
