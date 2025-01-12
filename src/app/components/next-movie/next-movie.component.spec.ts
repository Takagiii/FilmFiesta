import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextMovieComponent } from './next-movie.component';

describe('NextMovieComponent', () => {
  let component: NextMovieComponent;
  let fixture: ComponentFixture<NextMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextMovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NextMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
