import { TestBed, async, inject } from '@angular/core/testing';

import { BookingGuard } from './booking.guard';

describe('BookingGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookingGuard]
    });
  });

  it('should ...', inject([BookingGuard], (guard: BookingGuard) => {
    expect(guard).toBeTruthy();
  }));
});
