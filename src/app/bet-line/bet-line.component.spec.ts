import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetLineComponent } from './bet-line.component';

describe('BetLineComponent', () => {
  let component: BetLineComponent;
  let fixture: ComponentFixture<BetLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
