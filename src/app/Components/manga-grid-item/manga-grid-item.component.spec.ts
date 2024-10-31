import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaGridItemComponent } from './manga-grid-item.component';

describe('MangaGridItemComponent', () => {
  let component: MangaGridItemComponent;
  let fixture: ComponentFixture<MangaGridItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaGridItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
