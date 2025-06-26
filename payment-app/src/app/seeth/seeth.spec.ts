import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Seeth } from './seeth';

describe('Seeth', () => {
  let component: Seeth;
  let fixture: ComponentFixture<Seeth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Seeth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Seeth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
