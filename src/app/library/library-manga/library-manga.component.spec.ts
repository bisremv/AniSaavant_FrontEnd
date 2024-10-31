import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryMangaComponent } from './library-manga.component';

describe('LibraryMangaComponent', () => {
  let component: LibraryMangaComponent;
  let fixture: ComponentFixture<LibraryMangaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryMangaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
