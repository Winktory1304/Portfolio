import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appSmoothScroll]',
  standalone: true  // Füge dieses Attribut hinzu, um die Direktive standalone zu machen
})
export class SmoothScrollDirective {
  @Input('appSmoothScroll') targetId!: string;

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.preventDefault();
    const targetElement = document.getElementById(this.targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}


