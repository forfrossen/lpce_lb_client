import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtikelstammanlageComponent } from './artikelstammanlage.component';

describe('ArtikelstammanlageComponent', () => {
  let component: ArtikelstammanlageComponent;
  let fixture: ComponentFixture<ArtikelstammanlageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtikelstammanlageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtikelstammanlageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
