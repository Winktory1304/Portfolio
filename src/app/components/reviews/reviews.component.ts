import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements AfterViewInit {

  arrowBackImageSrc: string = 'assets/img/arrow-back-white.png';
  arrowForwardImageSrc: string = 'assets/img/arrow-forward-white.png';


  reviews = [
    { quote: "Working with Lukas in a group project was great. He is very cool, focused, and made our project a success. He's super collaborative, and I'd happily work with him again.", author: "A. Fischer - Team Partner" },
    { quote: "Our project benefited enormously from Simon's efficient way of working.", author: "T. Schulz - Frontend Developer" },
    { quote: "Lukas has proven to be a reliable team member with strong technical skills and a proactive approach to the success of our project.", author: "J. Doe - Project Manager" }
  ];


  // reviews: any[] = [];
  currentIndex: number = 0;
  reviewsCount = 3;
  direction: 'next' | 'prev' = 'next';
  reviewCount = this.reviews.length;


  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }


  switchLanguage(language: string) {
    this.translate.use(language);
  }


  loadTranslatedReviews() {
    this.translate.get('reviews').subscribe((translatedReviews: any[]) => {
      this.reviews = translatedReviews;
    });
  }


  nextReview() {
    this.direction = 'next';
    this.currentIndex = (this.currentIndex + 1) % this.reviewCount;
  }

  prevReview() {
    this.direction = 'prev';
    this.currentIndex = (this.currentIndex - 1 + this.reviewCount) % this.reviewCount;
  }


  updateCarousel() {
    const reviews = document.querySelectorAll('.review');

    reviews.forEach((review, index) => {
      review.classList.remove('active', 'prev-review', 'next-review', 'hidden');

      if (index === this.currentIndex) {
        review.classList.add('active');
      } else if (index === (this.currentIndex - 1 + this.reviews.length) % this.reviews.length) {
        review.classList.add('prev-review');
      } else if (index === (this.currentIndex + 1) % this.reviews.length) {
        review.classList.add('next-review');
      } else {
        review.classList.add('hidden');
      }
    });
  }


  ngOnInit() {
    this.translate.get('reviews').subscribe((data) => {
      console.log("Reviews loaded:", data);
    });
  }


  ngAfterViewInit() {
    this.updateCarousel();
  }
}