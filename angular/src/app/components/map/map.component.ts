import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

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

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.centerLatitude, this.centerLongitude],
      zoomControl: false,
      zoom: this.zoomsize,
      attributionControl: false,
    });
   

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }


   
}