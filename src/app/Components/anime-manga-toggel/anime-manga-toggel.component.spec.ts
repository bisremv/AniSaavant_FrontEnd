import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeMangaToggelComponent } from './anime-manga-toggel.component';

describe('AnimeMangaToggelComponent', () => {
  let component: AnimeMangaToggelComponent;
  let fixture: ComponentFixture<AnimeMangaToggelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeMangaToggelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeMangaToggelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
