import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaSitesComponent } from './manga-sites.component';

describe('MangaSitesComponent', () => {
  let component: MangaSitesComponent;
  let fixture: ComponentFixture<MangaSitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaSitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
