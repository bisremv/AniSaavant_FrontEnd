import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiredEpisodeComponent } from './aired-episode.component';

describe('AiredEpisodeComponent', () => {
  let component: AiredEpisodeComponent;
  let fixture: ComponentFixture<AiredEpisodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiredEpisodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiredEpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
