import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAnimeComponent } from './library-anime.component';

describe('LibraryAnimeComponent', () => {
  let component: LibraryAnimeComponent;
  let fixture: ComponentFixture<LibraryAnimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAnimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
