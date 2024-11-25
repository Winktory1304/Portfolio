import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {


  constructor(private router: Router) {}


  contactData = {
    name: '',
    email: '',
    message: ''
  }

  checkboxIsBlank: string = 'assets/img/checkbox_blank.png';
  checkboxIsChecked: string = 'assets/img/checkbox_checked.png';
  checkboxImage: string = this.checkboxIsBlank;
  isCheckboxChecked: boolean = false;
  showFieldErrorNotification: boolean = false;
  showSuccessNotification: boolean = false;
  emailIsNotCorrect: boolean = false;
  checkboxError: boolean = false;
  mailTest: boolean = false;
  showErrors = false;
  isSubmitted: boolean = false;

  http = inject(HttpClient);


  toggleCheckbox() {
    this.isCheckboxChecked = !this.isCheckboxChecked;
    this.checkboxImage = this.isCheckboxChecked ? this.checkboxIsChecked : this.checkboxIsBlank;
    this.checkboxError = false;
  }


  checkInputFields(isValid: boolean): boolean {
    // Name überprüfen
    if (!this.contactData.name.trim()) {
        isValid = false;
    }

    // E-Mail überprüfen
    if (!this.contactData.email.trim()) {
        // E-Mail ist leer
        this.emailIsNotCorrect = false;  // Hier kein Formatfehler anzeigen
        isValid = false;
    } else if (!this.validateEmail(this.contactData.email)) {
        // E-Mail ist nicht leer, aber ungültig
        this.emailIsNotCorrect = true;
        isValid = false;
    } else {
        // E-Mail ist korrekt
        this.emailIsNotCorrect = false;
    }

    // Nachricht überprüfen
    if (!this.contactData.message.trim()) {
        isValid = false;
    }

    // Datenschutz-Checkbox überprüfen
    if (!this.isCheckboxChecked) {
        this.checkboxError = true;
        isValid = false;
    } else {
        this.checkboxError = false;
    }

    return isValid;
}


  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }


  inputFieldsNotValid(isValid: boolean): boolean {
    if (!isValid) {
      this.showFieldErrorNotification = true;
      setTimeout(() => {
        this.showFieldErrorNotification = false;
      }, 3000);
      return true;
    }
    return false;
  }


  resetForm(ngForm: NgForm) {
    if (!this.checkInputFields(true)) {
        this.showFieldErrorNotification = true;
        setTimeout(() => {
            this.showFieldErrorNotification = false;
        }, 3000);
        return; 
    }

    if (!this.validateEmail(this.contactData.email)) {
        this.emailIsNotCorrect = true;
        setTimeout(() => {
            this.emailIsNotCorrect = false;
        }, 4000);
        return;
    }

    ngForm.resetForm();
    this.contactData = { name: '', email: '', message: '' };
    this.isCheckboxChecked = false;
    this.checkboxError = false;
    this.showFieldErrorNotification = false;
    this.emailIsNotCorrect = false;
    this.checkboxImage = this.checkboxIsBlank;

    this.showSuccessNotification = true;

    this.isSubmitted = false; 
    setTimeout(() => {
        this.showSuccessNotification = false;
    }, 3500);
}


  sendMail(ngForm: NgForm) {
    this.http.post(this.post.endPoint, this.post.body(this.contactData), this.post.options)
      .subscribe({
        next: () => {
          this.resetForm(ngForm);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }


  post = {
    endPoint: 'https://thomas-thw-winkler.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json' as const
    },
  };


  onSubmit(ngForm: NgForm) {
    this.isSubmitted = true;
    let isValid = true;

    // Überprüfe die Felder mit der Methode
    isValid = this.checkInputFields(isValid);

    if (!isValid) {
      return; // Abbruch bei ungültigen Eingaben
    }

    // E-Mail senden und Erfolgsmeldung anzeigen
    this.sendMail(ngForm);
  }
}