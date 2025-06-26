import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deleteth } from './deleteth';

describe('Deleteth', () => {
  let component: Deleteth;
  let fixture: ComponentFixture<Deleteth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deleteth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Deleteth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
