import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {
  @Output() eventChildToFather = new EventEmitter<string>();
  @Output() eventChildChangeTheme = new EventEmitter<void>();
  @Input() parentActiveSection = ''
  @Input() parentWidthScreen = 0
  themeSwitchWhite = true;
  sendSectionToFather(sectionId: string) {
    this.eventChildToFather.emit(sectionId)
  }
  sendChangeTheme() {
    this.themeSwitchWhite = !this.themeSwitchWhite
    this.eventChildChangeTheme.emit();
  }

  ngOnChanges(): void {
    // console.log('parent message', this.parentActiveSection)
  }
}
