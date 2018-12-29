import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { BookingStoreService } from './booking-store.service';
import { BookingEffects } from './booking.effects';
import { bookingReducer } from './booking.reducer';

// import TaskStoreModule in the TaskModule
@NgModule({
  imports: [
    StoreModule.forFeature('booking', bookingReducer),
    EffectsModule.forFeature([BookingEffects])
  ],
  exports: [StoreModule, EffectsModule],
  providers: [BookingStoreService]
})
export class BookingStoreModule {}
