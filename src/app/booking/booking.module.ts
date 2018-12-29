import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { BookingGuard } from './booking.guard';
import { BookingService } from './services/booking.service';
import { BookingStoreModule } from './store/booking-store.module';
import { BookingRoutingModule } from './booking-routing.module';

import { BookingComponent } from './booking/booking.component';
import { LocationSelectionComponent } from './location-selection/location-selection.component';
import { DateSelectionComponent } from './date-selection/date-selection.component';
import { TimeSelectionComponent } from './time-selection/time-selection.component';
import { VehicleSelectionComponent } from './vehicle-selection/vehicle-selection.component';
import { CoverageSelectionComponent } from './coverage-selection/coverage-selection.component';

import { SimpleTimePipe } from './pipes/simple-time.pipe';
import { VehicleComponent } from './shared/vehicle/vehicle.component';
import { CoverageInfoComponent } from './shared/coverage-info/coverage-info.component';

@NgModule({
  declarations: [
		BookingComponent,
		CoverageSelectionComponent,
		DateSelectionComponent,
		LocationSelectionComponent,
		TimeSelectionComponent,
		VehicleSelectionComponent,
		SimpleTimePipe,
		VehicleComponent,
		CoverageInfoComponent
	],
  imports: [
		BookingStoreModule,
		BookingRoutingModule,
		CommonModule,
		CoreModule,
		FormsModule,
		ReactiveFormsModule, 
		SharedModule
  ],
	providers: [ BookingGuard, BookingService ],
	entryComponents: [LocationSelectionComponent]

})
export class BookingModule { }
