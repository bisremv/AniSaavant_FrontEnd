import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestAnimeItemComponent } from './latest-anime-item.component';

describe('LatestAnimeItemComponent', () => {
  let component: LatestAnimeItemComponent;
  let fixture: ComponentFixture<LatestAnimeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestAnimeItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestAnimeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
