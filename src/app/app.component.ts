import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { MainContentComponent } from "./components/main-content/main-content.component";
import { TranslateConfigModule } from './translate-config.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import * as AOS from 'aos';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MainContentComponent,
    TranslateModule,
    TranslateConfigModule,
    HttpClientModule,
    FormsModule,
    HeaderComponent,
    FooterComponent
],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Portfolio';
  currentLanguage: string = 'en';


  constructor(public translate: TranslateService, public router: Router) {
    this.translate.setDefaultLang('en');
  }


  ngOnInit() {
    this.AosInit();
  }

  
  AosInit() {
    AOS.init({
      duration: 500,
      delay: 400,
      easing: 'ease-out',
      once: true
    });
  }


  changeLanguage(language: string) {
    this.translate.use(language);
  }
}
