import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Project } from '../projects/project.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-details',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule
  ],
  templateUrl: './mobile-details.component.html',
  styleUrls: ['./mobile-details.component.scss']
})
export class MobileDetailsComponent {
  @Input() selectedProject: Project | null = null;
  @Output() dialogClose = new EventEmitter<void>();


  closeDialogImageSrc: string = '/assets/img/close-dialog.png';
  isDialogOpen: boolean = false;
  
  constructor(private translate: TranslateService) { }

  projectDetails: Project[] = [
    {
      number: 1,
      title: "Join",
      technologies: this.getTechnologiesForJoin(),
      githubLink: "https://github.com/Winktory1304/Join",
      // livetestLink: "",
      imageSrc: "assets/img/join-preview.png",
      descriptionKey: "join"
    },
    {
      number: 2,
      title: "El Pollo Loco",
      technologies: this.getTechnologiesForElPolloLoco(),
      githubLink: "https://github.com/Winktory1304/PolloLoco",
      // livetestLink: "",
      imageSrc: "assets/img/el-pollo-loco-preview.png",
      descriptionKey: "el_pollo_loco"
    },
    // {
    //   number: 3,
    //   title: "DABubble",
    //   technologies: this.getTechnologiesForDABubble(),
    //   githubLink: "",
    //   livetestLink: "",
    //   imageSrc: "assets/img/el-pollo-loco-preview.png",
    //   descriptionKey: "daBubble"
    // }
  ];


  getProjectKey(title: string | undefined): string {
    if (!title) return '';
    return title.toLowerCase().replace(/\s+/g, '_');
  }


  getTechnologiesForJoin() {
    return [
      { icon: "/assets/img/html-icon-green.png", name: "HTML" },
      { icon: "/assets/img/css-icon-green.png", name: "CSS" },
      { icon: "/assets/img/javascript-icon-green.png", name: "JavaScript" },
      { icon: "/assets/img/firebase-icon-green.png", name: "Firebase" }
    ];
  }

  getTechnologiesForElPolloLoco() {
    return [
      { icon: "/assets/img/html-icon-green.png", name: "HTML" },
      { icon: "/assets/img/css-icon-green.png", name: "CSS" },
      { icon: "/assets/img/javascript-icon-green.png", name: "JavaScript" }
    ];
  }

  getTechnologiesForDABubble() {
    return [
      { icon: "/assets/img/html-icon-green.png", name: "HTML" },
      { icon: "/assets/img/css-icon-green.png", name: "CSS" },
      { icon: "/assets/img/typescript-icon-green.png", name: "TypeScript" },
      { icon: "/assets/img/angular-icon-green.png", name: "Angular" },
      { icon: "/assets/img/firebase-icon-green.png", name: "Firebase" }
    ];
  }


  get projectDescription(): string {
    if (this.selectedProject) {
      return this.translate.instant(`projectPopUp.${this.selectedProject.descriptionKey}.description`);
    }
    return '';
  }


  showNextProject() {
    if (this.selectedProject) {
      const currentIndex = this.projectDetails.indexOf(this.selectedProject);
      const nextIndex = (currentIndex + 1) % this.projectDetails.length;
      this.selectedProject = this.projectDetails[nextIndex];
    }
  }


  getFormattedNumber(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }


  onHoverCloseDialog(isHovering: boolean): void {
    this.closeDialogImageSrc = isHovering
      ? '/assets/img/close-dialog-hover.png'
      : '/assets/img/close-dialog.png';
  }


  closeDialog() {
    this.dialogClose.emit();
  }
}
