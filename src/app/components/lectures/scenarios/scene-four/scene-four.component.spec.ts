import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneFourComponent } from './scene-four.component';

describe('SceneFourComponent', () => {
  let component: SceneFourComponent;
  let fixture: ComponentFixture<SceneFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceneFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
