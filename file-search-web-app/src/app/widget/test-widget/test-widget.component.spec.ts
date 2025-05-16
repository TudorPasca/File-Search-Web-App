import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWidgetComponent } from './test-widget.component';

describe('TestWidgetComponent', () => {
  let component: TestWidgetComponent;
  let fixture: ComponentFixture<TestWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
