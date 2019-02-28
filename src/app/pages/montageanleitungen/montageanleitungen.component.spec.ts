import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontageanleitungenComponent } from './montageanleitungen.component';

describe('MontageanleitungenComponent', () => {
  let component: MontageanleitungenComponent;
  let fixture: ComponentFixture<MontageanleitungenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontageanleitungenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontageanleitungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
