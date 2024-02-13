import {Component, Input} from '@angular/core';
// interface slide {
//   imageSrc: string, title: string, description: string
// }

@Component({
  selector: 'app-card-slider',
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.scss']
})
export class CardSliderComponent {
  @Input() slide: { imageSrc: string; title: string; description: string } = {imageSrc: '', title: '', description: ''};
  @Input() themeLighter = false;
}
