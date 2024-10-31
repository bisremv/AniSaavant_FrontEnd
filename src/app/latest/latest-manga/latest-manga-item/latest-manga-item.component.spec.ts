import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestMangaItemComponent } from './latest-manga-item.component';

describe('LatestMangaItemComponent', () => {
  let component: LatestMangaItemComponent;
  let fixture: ComponentFixture<LatestMangaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestMangaItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestMangaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
