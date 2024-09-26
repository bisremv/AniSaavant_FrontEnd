import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaGroupComponent } from './manga-group.component';

describe('MangaGroupComponent', () => {
  let component: MangaGroupComponent;
  let fixture: ComponentFixture<MangaGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
