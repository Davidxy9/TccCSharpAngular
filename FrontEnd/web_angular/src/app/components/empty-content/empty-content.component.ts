import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-empty-content',
  templateUrl: './empty-content.component.html',
  styleUrls: ['./empty-content.component.css'],
})
export class EmptyContentComponent {
  options: AnimationOptions = {
    loop: true,
    autoplay: true,
    path: '/assets/85557-empty.json',
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
}
