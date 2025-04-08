import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
})
export class HeaderComponent {
  userName = 'Admin'; // ou à récupérer depuis AuthService

  constructor(private router: Router) {}

  logout() {
    // Logique de déconnexion : vider le token, rediriger, etc.
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
