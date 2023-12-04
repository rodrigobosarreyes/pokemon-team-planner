import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamPreviewComponent} from './team-preview.component';

describe('TeamPreviewComponent', () => {
  let component: TeamPreviewComponent;
  let fixture: ComponentFixture<TeamPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
