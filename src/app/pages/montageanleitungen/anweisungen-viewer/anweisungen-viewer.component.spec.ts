import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnweisungenViewerComponent } from './anweisungen-viewer.component';

describe('AnweisungenViewerComponent', () => {
  let component: AnweisungenViewerComponent;
  let fixture: ComponentFixture<AnweisungenViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnweisungenViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnweisungenViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
