import { Component } from '@angular/core';
import { VideoPlayerComponent } from '../video-player/video-player.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [VideoPlayerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
