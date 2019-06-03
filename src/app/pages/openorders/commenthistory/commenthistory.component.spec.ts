import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommenthistoryComponent } from './commenthistory.component';

describe('CommenthistoryComponent', () => {
  let component: CommenthistoryComponent;
  let fixture: ComponentFixture<CommenthistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommenthistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommenthistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
