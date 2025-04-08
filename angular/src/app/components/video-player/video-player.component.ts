

import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-video-player',
  standalone:true,
  templateUrl: './video-player.component.html'
})
export class VideoPlayerComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  togglePlay() {
    const video = this.videoPlayer.nativeElement;
    video.paused ? video.play() : video.pause();
  }
}
