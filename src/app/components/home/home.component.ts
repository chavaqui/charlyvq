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
      console.log('form is not valid :D');
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
        console.log('received from backend:',data)
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
    console.log('navbar height:', navbarHeight)
    const myNavbarOpen = this.elemRef.nativeElement.querySelector('.navbar-collapse');
    console.log('navbar height-collapse:', myNavbarOpen.offsetHeight)
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
          console.log('is not open', navbarHeight)
        } else { // Scroll to section mobile
          this.elemRef.nativeElement.querySelector('.navbar-toggler').click(); //closes the navbar toggle when clicked
          const newPosition = currentSection.getBoundingClientRect().top + window.scrollY - navbarHeight;
          window.scrollTo({
            top: newPosition,
            behavior: 'smooth'
          });
          console.log('is opened')
        }
      }
    }
  }

  getChangedTheme() {
    this.themeLighter = !this.themeLighter;
  }

}
