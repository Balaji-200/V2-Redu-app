import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneThreeComponent } from './scene-three.component';

describe('SceneThreeComponent', () => {
  let component: SceneThreeComponent;
  let fixture: ComponentFixture<SceneThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceneThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
