import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import * as P5 from 'p5';
@Component({
  selector: 'app-p5sketch',
  templateUrl: './p5sketch.component.html',
  styleUrls: ['./p5sketch.component.scss']
})
export class P5sketchComponent implements OnInit, OnChanges, OnDestroy {
  // @ViewChild('canvasContainer') canvasContainer: ElementRef | undefined;
  @Input() colorBackground: boolean = false;
  private p5js: any;
  // colorRed = 15;
  // colorGreen = 16;
  // colorBlue = 16;
  colorRed = 21;
  colorGreen = 21;
  colorBlue = 21;

  ngOnInit() {
    this.createCanvas();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['colorBackground']) {
      if (this.colorBackground) {
        this.colorRed = 238;
        this.colorGreen = 239;
        this.colorBlue = 239;
        // this.colorRed = 243;
        // this.colorGreen = 243;
        // this.colorBlue = 245;
      } else { //black
        this.colorRed = 19;
        this.colorGreen = 19;
        this.colorBlue = 19;
        // this.colorRed = 15;
        // this.colorGreen = 16;
        // this.colorBlue = 16;
      }
    }
  }

  ngOnDestroy() {
    this.destroyCanvas();
  }

  private createCanvas() {
    this.p5js = new P5(this.sketch.bind(this));
  }

  private destroyCanvas() {
    this.p5js.remove();
  }

  private sketch(p: any) {
    let angleSquare = 0.0;
    let angleTriangle = 0.0;
    let angleBox = 0.0;
    let xPos = 0;

    // p.windowResized = () => {
    //   if (p.width !== window.innerWidth || p.height !== window.innerHeight) {
    //     p.resizeCanvas(window.innerWidth, window.innerHeight);
    //   }
    // }

    p.setup = () => {
      // p.createCanvas(p.windowWidth, p.windowHeight).parent(this.canvasContainer!.nativeElement);
      // p.createCanvas(window.innerWidth, window.innerHeight).parent(this.canvasContainer!.nativeElement).style('z-index', '-1');
      p.createCanvas(window.innerWidth, window.innerHeight).parent('sketch-holder').style('z-index', '-1');
      // p.style('z-index', '-1');
      p.noStroke();

    };

    p.draw = () => {
      //square
      p.noStroke()
      p.background(this.colorRed,this.colorGreen,this.colorBlue);
      p.fill(165, 105, 189);
      p.translate(p.width / 5, p.height / 5);
      p.rotate(p.radians(angleSquare));
      p.rectMode(p.CENTER);
      p.rect(0, 0, 40, 40);

      // triangle
      if (p.windowWidth>940) {
        p.stroke(255, 255, 0);
        p.strokeWeight(1);
        p.noFill();
        p.resetMatrix(); // Restablecer la matriz de transformación
        p.translate(8 * p.width / 9,3 * p.height / 4);
        p.rotate(p.radians(angleTriangle));
        p.triangle(-25, -25, 25, -25, 0, 25);
      } else {
        p.stroke(105, 105, 0);
        p.strokeWeight(1);
        p.noFill();
        p.resetMatrix(); // Restablecer la matriz de transformación
        p.translate(1 * p.width / 9,5 * p.height / 7);
        p.rotate(p.radians(angleTriangle));
        p.triangle(-10, -10, 10, -10, 0, 10);
      }

      //elipse
      if (p.windowWidth>940) {
        p.noStroke();
        p.resetMatrix();
        p.translate(2 * p.width / 9,5 * p.height / 9);
        p.fill(255,200,0);
        p.circle(50,50,20);
      } else {
        p.noStroke();
        p.resetMatrix();
        p.translate(6 * p.width / 9,2 * p.height / 4);
        p.fill(255,200,0);
        p.circle(50,50,20);
      }

      //line
      p.stroke(31,255,0);
      p.strokeWeight(6);
      xPos = xPos + 0.6;  // Ajusta la velocidad según sea necesario
      if (xPos > p.width) {
        xPos = 0;  // Reiniciar la posición al borde derecho
      }
      p.resetMatrix();
      p.translate(xPos,2 * p.height / 3);
      p.line(-15,0,15,0);

      //apple
      p.stroke(240,0,0);
      p.strokeWeight(6);
      p.resetMatrix();
      p.translate(xPos+ 33,2 * p.height / 3);
      p.line(0,0,1,0);

      //two circles
      if (p.windowWidth >940) {
        p.noFill();
        p.colorMode(p.RGB, 255, 255, 255, 1);
        // p.background(255);
        p.strokeWeight(4);
        p.stroke(255, 0, 10, 0.3);
        p.resetMatrix();
        p.translate(3 * p.width / 7,6 * p.height / 8);
        p.circle(40, 40, 50);
        p.circle(50, 60, 50);
      }

      //cyan box
      if (p.windowWidth>940) {
        p.stroke(9,255,233);
        p.strokeWeight(7);
        p.noFill();
        p.resetMatrix(); // Restablecer la matriz de transformación
        p.translate(11 * p.width / 18,2 * p.height / 7);
        p.rotate(p.radians(angleBox));
        p.square(-50, -50, 245, 8);
      } else {
        // p.stroke(9,255,233);
        p.stroke(55,105,103);
        p.strokeWeight(1);
        p.noFill();
        p.resetMatrix(); // Restablecer la matriz de transformación
        p.translate(7 * p.width / 9,2 * p.height / 10);
        p.rotate(p.radians(angleBox));
        p.square(-25, -15, 150, 8);
      }

      //rotations
      angleSquare += 0.2;
      angleTriangle -= 0.20;
      angleBox -= 0.07;
    };
    // p.windowResized = () => {
    //   p.resizeCanvas(p.windowWidth, p.windowHeight);
    //   console.log('values:',p.windowWidth,p.windowHeight)
    // }
    p.windowResized = () => {
      if (p.windowWidth>940) {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        // p.resizeCanvas(p.windowWidth, p.windowHeight,true);
      }
    }

  }
}
