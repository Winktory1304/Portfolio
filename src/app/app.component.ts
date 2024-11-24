import { Component, OnInit, NgModule, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { MainContentComponent } from "./components/main-content/main-content.component";
import { TranslateConfigModule } from './translate-config.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import AOS from 'aos';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,   
    TranslateModule,
    TranslateConfigModule,
    HttpClientModule,
    FormsModule,   
    RouterModule
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Portfolio';
  currentLanguage: string = 'en';


  constructor(public translate: TranslateService, public router: Router) {
    this.translate.setDefaultLang('en');
  }


  ngOnInit() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'assets/css/aos.css';
    document.head.appendChild(link);

  }

  ngAfterViewInit() {
    AOS.init();
  }




  changeLanguage(language: string) {
    this.translate.use(language);
  }
}
