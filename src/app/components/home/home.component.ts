import {Component, ElementRef, HostListener} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SendEmailService} from "../../services/send-email.service";
import {Observable} from "rxjs";
import {logMessages} from "@angular-devkit/build-angular/src/tools/esbuild/utils";

interface responseBodyMessage {
  data: {
    name: string,
    email: string,
    message: string,
  }
}
interface bodyMessage {
    name: string,
    email: string,
    message: string,
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  themeLighter = false;
  screenWidth: number = 0;
  sectionId = '';
  activeSection = 'sectionHome';
  shakeAnimation= false;
  statusSendMessage = false;
  slides = [
    { imageSrc: 'scp1.webp', title: 'Smart Cities Peru', description: 'Worked as Frontend developer, with technologies as Angular, Git and Linux.' },
    { imageSrc: 'portCer1.webp', title: '2nd place Startup competition', description: 'Recognized for innovation and social impact.' },
    { imageSrc: 'certificationAngular3.webp', title: 'Angular certification', description: 'I have succesfully finished a course with Angular technologies.' }
  ];
  contactForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required)
  })

  constructor(private elemRef: ElementRef,
              private serviceContact: SendEmailService) {
    this.screenWidth = window.innerWidth;
  }

  async sendMessage() {
    if (!this.contactForm.valid) {
      this.shakeAnimationEffect();
      this.contactForm.markAllAsTouched();
    } else {
      this.sendMessageToBackend();
    }
  }
  sendMessageToBackend() {
    const bodyMessage = this.contactForm.value;
    this.serviceContact.connectionToBackend(bodyMessage).subscribe(
      data => {
        if (data.success) {
          this.contactForm.reset()
          this.statusSendMessage = true;
        }
      }
    )
  }
  shakeAnimationEffect() {
    this.shakeAnimation = true;
    setTimeout(() => {
      this.shakeAnimation = false;
    },400)
  }

  @HostListener('window:resize', ['$event'])
  onResizeScreen() {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:scroll', ['$event'])
  checkToScroll() {
    const navbarHeight = this.elemRef.nativeElement.querySelector('.navbar-my-header').offsetHeight;
    const scrollPosition = window.scrollY + navbarHeight || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const sectionHome = document.getElementById('sectionHome');
    const sectionNoteworthy = document.getElementById('sectionNoteworthy');
    const sectionAbout = document.getElementById('sectionAbout');
    const sectionSkills = document.getElementById('sectionSkills');
    const sectionContact = document.getElementById('sectionContact');
    if (sectionHome && scrollPosition >= sectionHome.offsetTop) {
      this.activeSection = 'sectionHome';
    }
    if (sectionNoteworthy && scrollPosition >= sectionNoteworthy.offsetTop) {
      this.activeSection = 'sectionNoteworthy';
    }
    if (sectionAbout && scrollPosition >= sectionAbout.offsetTop) {
      this.activeSection = 'sectionAbout';
    }
    if (sectionSkills && scrollPosition >= sectionSkills.offsetTop) {
      this.activeSection = 'sectionSkills';
    }
    if (sectionContact && scrollPosition >= sectionContact.offsetTop) {
      this.activeSection = 'sectionContact';
    }
  }

  getSectionIdToScroll(dataSectionId: string) {
    this.sectionId = dataSectionId;
    const navbarHeight = this.elemRef.nativeElement.querySelector('.navbar-my-header').offsetHeight;
    const myNavbarOpen = this.elemRef.nativeElement.querySelector('.navbar-collapse');
    if (dataSectionId === 'sectionHomeIcon') { // Icon go home
      const currentSectionIcon = document.querySelector('#sectionHome');
      if (currentSectionIcon) {
        const newPosition = currentSectionIcon.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({
          top: newPosition,
          behavior: 'smooth'
        });
      }
    } else { // Go to desired section
      const currentSection = document.querySelector('#' + dataSectionId);
      const isNavbarTogglerOpen = myNavbarOpen.classList.contains('show');
      if (currentSection) { // scrolls to section
        if (!isNavbarTogglerOpen) {
          const newPosition = currentSection.getBoundingClientRect().top + window.scrollY - navbarHeight;
          window.scrollTo({
            top: newPosition,
            behavior: 'smooth'
          });
        } else { // Scroll to section mobile
          this.elemRef.nativeElement.querySelector('.navbar-toggler').click(); //closes the navbar toggle when clicked
          const newPosition = currentSection.getBoundingClientRect().top + window.scrollY - navbarHeight;
          window.scrollTo({
            top: newPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  }

  getChangedTheme() {
    this.themeLighter = !this.themeLighter;
  }

}
