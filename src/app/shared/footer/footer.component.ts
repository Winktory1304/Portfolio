import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SmoothScrollDirective } from '../../smooth-scroll.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    TranslateModule,
    SmoothScrollDirective
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  // router = inject(Router);

  // toImprint() {
  //   this.router.navigate(['/imprint']);
  // }
}
