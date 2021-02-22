import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutFactoryComponent } from './donut-factory.component';

describe('DonutFactoryComponent', () => {
  let component: DonutFactoryComponent;
  let fixture: ComponentFixture<DonutFactoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonutFactoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
