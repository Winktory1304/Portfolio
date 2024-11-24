import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Project } from './project.model';
import { MobileDetailsComponent } from '../mobile-details/mobile-details.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MobileDetailsComponent
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  constructor(private breakpointObserver: BreakpointObserver, private translate: TranslateService) { }

  closeDialogImageSrc: string = '/assets/img/close-dialog.png';
  selectedProject: Project | null = null;
  isDialogOpen: boolean = false;
  isMobileView: boolean = false;
  showJoinProject: boolean = false;
  showElPolloLocoProject: boolean = false;
  showDaBubbleProject: boolean = false;

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


  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset, '(max-width: 1200px)'])
      .subscribe((result: BreakpointState) => {
        this.isMobileView = result.matches;
      });
  }


  getProjectKey(title: string | undefined): string {
    if (!title) return '';
    return title.toLowerCase().replace(/\s+/g, '_');
  }


  getFormattedNumber(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }


  openDialog(index: number) {
    if (!this.isDialogOpen) {
      this.selectedProject = this.projectDetails[index];
      this.isDialogOpen = true;
    }
  }


  showNextProject() {
    if (this.selectedProject) {
      const currentIndex = this.projectDetails.indexOf(this.selectedProject);
      const nextIndex = (currentIndex + 1) % this.projectDetails.length;
      this.selectedProject = this.projectDetails[nextIndex];
    }
  }


  closeDialog() {
    this.isDialogOpen = false;
    this.selectedProject = null;
  }


  onHoverCloseDialog(isHovering: boolean): void {
    this.closeDialogImageSrc = isHovering
      ? '/assets/img/close-dialog-hover.png'
      : '/assets/img/close-dialog.png';
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


  // getTechnologiesForDABubble() {
  //   return [
  //     { icon: "/assets/img/html-icon-green.png", name: "HTML" },
  //     { icon: "/assets/img/css-icon-green.png", name: "CSS" },
  //     { icon: "/assets/img/typescript-icon-green.png", name: "TypeScript" },
  //     { icon: "/assets/img/angular-icon-green.png", name: "Angular" },
  //     { icon: "/assets/img/firebase-icon-green.png", name: "Firebase" }
  //   ];
  // }
}
