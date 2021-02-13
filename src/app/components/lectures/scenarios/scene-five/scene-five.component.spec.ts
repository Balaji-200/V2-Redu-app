import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneFiveComponent } from './scene-five.component';

describe('SceneFiveComponent', () => {
  let component: SceneFiveComponent;
  let fixture: ComponentFixture<SceneFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceneFiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
