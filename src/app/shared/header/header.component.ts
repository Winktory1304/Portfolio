import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { SmoothScrollDirective } from '../../smooth-scroll.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SmoothScrollDirective
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']  // kleiner Fehler behoben: sollte "styleUrls" statt "styleUrl" sein
})
export class HeaderComponent {
  @Output() languageChange = new EventEmitter<string>();

  imageSrc: string = 'assets/img/english.png';
  isGerman: boolean = false;
  isMenuOpen: boolean = false;

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  translateWebsite() {
    this.isGerman = !this.isGerman;
    let newLang = this.isGerman ? 'de' : 'en';
    this.translate.use(newLang);
    this.updateImage();
  }

  updateImage() {
    this.imageSrc = this.isGerman ? 'assets/img/german.png' : 'assets/img/english.png';
  }

  onMouseOver() {
    this.imageSrc = this.isGerman ? 'assets/img/german-hover.png' : 'assets/img/english-hover.png';
  }

  onMouseOut() {
    this.updateImage();
  }

  // HostListener hinzufügen, um Klicks außerhalb des Menüs zu behandeln
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event): void {
    const targetElement = event.target as HTMLElement;

    // Wenn das mobile Menü geöffnet ist und der Klick außerhalb des Menüs oder des Burgermenüs ist
    if (
      this.isMenuOpen &&
      targetElement &&
      !targetElement.closest('.open_menu') && // Prüft, ob der Klick auf das Menü-Container-Element erfolgt
      !targetElement.closest('.mobile_menu')  // Prüft, ob der Klick auf das Burger-Icon erfolgt
    ) {
      this.isMenuOpen = false; // Menü schließen
    }
  }
}
