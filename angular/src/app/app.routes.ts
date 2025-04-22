import { MapComponent } from './components/map/map.component'; // Assure-toi que l'import est correct
import { Routes } from '@angular/router';
import { CamionsPageComponent } from './components/camions-page/camions-page.component';
import { HomeComponent } from './components/home/home.component';
import { CoursePageComponent } from './components/courses-page/courses-page.component';
import { LocalisationsPageComponent } from './components/localisation-page/localisation-page.component';

export const routes: Routes = [
    { path: 'map', component: MapComponent }, // Route pour /map
    { path: 'camions', component: CamionsPageComponent }, // Route pour /map
    { path: 'home', component: HomeComponent }, // Route pour /map
    { path: 'courses', component: CoursePageComponent },
    { path: 'localisations',component:LocalisationsPageComponent}
];

