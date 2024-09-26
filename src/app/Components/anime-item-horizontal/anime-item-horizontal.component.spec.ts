import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeItemHorizontalComponent } from './anime-item-horizontal.component';

describe('AnimeItemHorizontalComponent', () => {
  let component: AnimeItemHorizontalComponent;
  let fixture: ComponentFixture<AnimeItemHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeItemHorizontalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeItemHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
