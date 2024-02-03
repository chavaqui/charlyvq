import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P5sketchComponent } from './p5sketch.component';

describe('P5sketchComponent', () => {
  let component: P5sketchComponent;
  let fixture: ComponentFixture<P5sketchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [P5sketchComponent]
    });
    fixture = TestBed.createComponent(P5sketchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
