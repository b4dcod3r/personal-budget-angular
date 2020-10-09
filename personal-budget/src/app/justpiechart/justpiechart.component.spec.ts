import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustpiechartComponent } from './justpiechart.component';

describe('JustpiechartComponent', () => {
  let component: JustpiechartComponent;
  let fixture: ComponentFixture<JustpiechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JustpiechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JustpiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
