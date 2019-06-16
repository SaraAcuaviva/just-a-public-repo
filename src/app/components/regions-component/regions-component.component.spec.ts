import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionsComponentComponent } from './regions-component.component';

describe('RegionsComponentComponent', () => {
  let component: RegionsComponentComponent;
  let fixture: ComponentFixture<RegionsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
