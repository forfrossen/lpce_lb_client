import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnweisungenEditorComponent } from './anweisungen-editor.component';

describe('AnweisungenEditorComponent', () => {
  let component: AnweisungenEditorComponent;
  let fixture: ComponentFixture<AnweisungenEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnweisungenEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnweisungenEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
