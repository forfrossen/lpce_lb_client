import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnweisungenListComponent } from './anweisungen-list.component';

describe('AnweisungenListComponent', () => {
  let component: AnweisungenListComponent;
  let fixture: ComponentFixture<AnweisungenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnweisungenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnweisungenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
