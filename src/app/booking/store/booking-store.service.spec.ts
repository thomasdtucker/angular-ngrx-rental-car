import { TestBed, inject } from '@angular/core/testing';

import { BookingStoreService } from './booking-store.service';

describe('BookingStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookingStoreService]
    });
  });

  it('should be created', inject([BookingStoreService], (service: BookingStoreService) => {
    expect(service).toBeTruthy();
  }));
});
