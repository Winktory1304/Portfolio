import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { TranslateModule } from '@ngx-translate/core';
import { SmoothScrollDirective } from '../../smooth-scroll.directive';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    TranslateModule,
    SmoothScrollDirective
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

  githubImageSrc: string = 'assets/img/github-icon-green.png';
  linkedinImageSrc: string = 'assets/img/linkedin-icon-green.png';
  mailImageSrc: string = 'assets/img/mail-icon-green.png';

}