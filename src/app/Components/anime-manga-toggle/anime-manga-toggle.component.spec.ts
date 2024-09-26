import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeMangaToggleComponent } from './anime-manga-toggle.component';

describe('AnimeMangaToggleComponent', () => {
  let component: AnimeMangaToggleComponent;
  let fixture: ComponentFixture<AnimeMangaToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeMangaToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeMangaToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
