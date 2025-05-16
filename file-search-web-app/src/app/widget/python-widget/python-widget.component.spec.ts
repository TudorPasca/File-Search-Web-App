import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PythonWidgetComponent } from './python-widget.component';

describe('PythonWidgetComponent', () => {
  let component: PythonWidgetComponent;
  let fixture: ComponentFixture<PythonWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PythonWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PythonWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
