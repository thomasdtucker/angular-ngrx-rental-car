import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingGuard } from './booking.guard';

import { BookingComponent } from './booking/booking.component';
import { DateSelectionComponent } from './date-selection/date-selection.component';
import { CoverageSelectionComponent } from './coverage-selection/coverage-selection.component';
import { LocationSelectionComponent } from './location-selection/location-selection.component';
import { TimeSelectionComponent } from './time-selection/time-selection.component';
import { VehicleSelectionComponent } from './vehicle-selection/vehicle-selection.component';

const routes: Routes = [
	{
		path: '', component: BookingComponent,
		children: [
			{path: '', redirectTo: 'location'},
			{path: 'location', component: LocationSelectionComponent, data: { title: 'Choose Location'} },
			{path: 'date', component: DateSelectionComponent, data: { title: 'Choose Dates'} },
			{path: 'pickup', component: DateSelectionComponent, data: { title: 'Choose Dates'} },
			{path: 'dropoff', component: DateSelectionComponent, data: { title: 'Choose Dates'} },
			{path: 'coverage', component: CoverageSelectionComponent, data: { title: 'Choose Coverage'} },
			{path: 'vehicle', component: VehicleSelectionComponent, data: { title: 'Choose Vehicle'} },
			{path: '**', redirectTo: 'location'}
		]
	}
];

export const BookingRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
