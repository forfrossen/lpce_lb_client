import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnlageformularComponent } from './anlageformular.component';

describe('AnlageformularComponent', () => {
  let component: AnlageformularComponent;
  let fixture: ComponentFixture<AnlageformularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnlageformularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnlageformularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
