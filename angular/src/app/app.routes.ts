import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component'; // Assure-toi que l'import est correct
import { Routes } from '@angular/router';
import { CamionsPageComponent } from './components/camions-page/camions-page.component';


export const routes: Routes = [
    { path: 'map', component: MapComponent }, // Route pour /map
    { path: 'camions', component: CamionsPageComponent }, // Route pour /map
  ];

