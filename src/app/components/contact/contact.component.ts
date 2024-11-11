import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  contactData = {
    name: "",
    email: "",
    message: ""
  }

  checkboxIsBlank: string = 'assets/img/checkbox_blank.png';
  checkboxIsChecked: string = 'assets/img/checkbox_checked.png';
  checkboxImage: string = this.checkboxIsBlank;
  isCheckboxChecked: boolean = false;
  checkboxError: boolean = false;


  http = inject(HttpClient);


  toggleCheckbox() {
    this.isCheckboxChecked = !this.isCheckboxChecked;
    this.checkboxImage = this.isCheckboxChecked ? this.checkboxIsChecked : this.checkboxIsBlank;
  }


  checkField(input: any) {
    if (input.invalid && input.touched) {
      console.error(`The field ${input.name} is invalid.`);
    }
  }


  mailTest = false;


  post = {
    endPoint: 'https://thomas.com/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'text' as const 
    },
  };


  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      // Prüfe, ob die Daten korrekt sind
      console.log("Contact data:", this.contactData);

      // Die Anfrage absenden
      this.http.post(this.post.endPoint, this.post.body(this.contactData), this.post.options)
        .subscribe({
          next: (response) => {
            console.log("Email sent successfully:", response);
            ngForm.resetForm();  // Formular zurücksetzen nach erfolgreichem Senden
          },
          error: (error) => {
            console.error('Error occurred:', error);
            // Zusätzliche Fehlerbehandlung
            alert(`Fehler: ${error.message || error.statusText}`);
          },
          complete: () => console.info('Post request complete')
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      ngForm.resetForm();  // Nur zurücksetzen, wenn mailTest aktiv ist
    }
  }
}