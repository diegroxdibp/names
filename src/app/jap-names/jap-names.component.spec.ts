import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JapNamesComponent } from './jap-names.component';

describe('JapNamesComponent', () => {
  let component: JapNamesComponent;
  let fixture: ComponentFixture<JapNamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JapNamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JapNamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
