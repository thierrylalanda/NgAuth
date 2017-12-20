import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeUserFormComponent } from './edite-user-form.component';

describe('EditeUserFormComponent', () => {
  let component: EditeUserFormComponent;
  let fixture: ComponentFixture<EditeUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditeUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditeUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
