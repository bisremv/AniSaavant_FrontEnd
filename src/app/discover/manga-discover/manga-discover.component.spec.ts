import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaDiscoverComponent } from './manga-discover.component';

describe('MangaDiscoverComponent', () => {
  let component: MangaDiscoverComponent;
  let fixture: ComponentFixture<MangaDiscoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaDiscoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaDiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
