import { NgRxAction } from '../../store/ngrx-action';
import { Booking } from './../models/booking';

export enum BookingActions {
	GET_LOCATIONS = '[Booking] Locations Requested',
	GET_LOCATIONS_SUCCESS = '[Booking] Locations Requested Success',

	GET_AVAILABLE_TIMES = '[Booking] Avaiable Times Requested',
	GET_AVAILABLE_TIMES_SUCCESS = '[Booking] Avaiable Times Requested Success',

	GET_AVAILABLE_VEHICLES = '[Booking] Available Vehicles Requested',
	GET_AVAILABLE_VEHICLES_SUCCESS = '[Booking] Available Vehicles Requested Success',

	GET_INSURANCE_OPTIONS = '[Booking] Insurance Options Requested',
	GET_INSURANCE_OPTIONS_SUCCESS = '[Booking] Insurance Options Requested Success',

	POST_RESERVATION = '[Booking] Reservation Post Request',
	POST_RESERVATION_SUCCESS = '[Booking] Reservation Post Request Success',

	SEARCH_LOCATIONS = '[Booking] Search Locations',
	SEARCH_LOCATIONS_SUCCESS = '[Booking] Search Locations Success',

	COVERAGE_Rental_SELECT = '[Booking] Coverage Rental Selection',
	COVERAGE_PERSONAL_SELECT = '[Booking] Coverage Personal Selection',
	COVERAGE_CORPORATE_SELECT = '[Booking] Coverage Corporate Selection',

	COVERAGE_TYPE_SELECT = '[Booking] Coverage Type Selection',

	LOCATION_SELECT = '[Booking] Location Selection Requested',
	LOCATION_SELECT_SUCCESS = '[Booking] Location Selection Success',

	VEHICLE_SELECT = '[Booking] Vehicle Selection',

	PICKUP_DATE_SELECT = '[Booking] Pickup Date Selection',
	PICKUP_TIME_SELECT = '[Booking] Pickup Time Selection',

	DROPOFF_DATE_SELECT = '[Booking] Dropoff Date Selection',
	DROPOFF_TIME_SELECT = '[Booking] Dropoff Time Selection',

  ERROR = '[Booking] Error'
}

export class GetLocationsAction extends NgRxAction<any> { type = BookingActions.GET_LOCATIONS; }
export class GetLocationsSuccessAction extends NgRxAction<any> { type = BookingActions.GET_LOCATIONS_SUCCESS; }

export class GetAvailableTimesAction extends NgRxAction<any> { type = BookingActions.GET_AVAILABLE_TIMES; }
export class GetAvailableTimesSuccessAction extends NgRxAction<any> { type = BookingActions.GET_AVAILABLE_TIMES_SUCCESS; }

export class GetAvailableVehiclesAction extends NgRxAction<any> { type = BookingActions.GET_AVAILABLE_VEHICLES; }
export class GetAvailableVehiclesSuccessAction extends NgRxAction<any> { type = BookingActions.GET_AVAILABLE_VEHICLES_SUCCESS; }

export class GetInsuranceOptions extends NgRxAction<any> { type = BookingActions.GET_INSURANCE_OPTIONS; }
export class GetInsuranceOptionsSuccess extends NgRxAction<any> { type = BookingActions.GET_INSURANCE_OPTIONS_SUCCESS; }

export class SearchLocationsAction extends NgRxAction<any> { type = BookingActions.SEARCH_LOCATIONS; }
export class SearchLocationsSuccessAction extends NgRxAction<any> { type = BookingActions.SEARCH_LOCATIONS_SUCCESS }

export class CoverageRentalSelectionAction extends NgRxAction<any> { type = BookingActions.COVERAGE_Rental_SELECT; }
export class CoveragePersonalSelectionAction extends NgRxAction<any> { type = BookingActions.COVERAGE_PERSONAL_SELECT; }
export class CoverageCorporateSelectionAction extends NgRxAction<any> { type = BookingActions.COVERAGE_CORPORATE_SELECT; }
export class CoverageTypeSelectionAction extends NgRxAction<any> { type = BookingActions.COVERAGE_TYPE_SELECT; }

export class LocationSelectionAction extends NgRxAction<any> { type = BookingActions.LOCATION_SELECT; }

export class VehicleSelectAction extends NgRxAction<any> { type = BookingActions.VEHICLE_SELECT; }

export class PickupDateSelectAction extends NgRxAction<any> { type = BookingActions.PICKUP_DATE_SELECT; }
export class PickupTimeSelectAction extends NgRxAction<any> { type = BookingActions.PICKUP_TIME_SELECT; }

export class PostReservationAction extends NgRxAction<any> { type = BookingActions.POST_RESERVATION; }
export class PostReservationSuccessAction extends NgRxAction<any> { type = BookingActions.POST_RESERVATION_SUCCESS }

export class DropoffDateSelectAction extends NgRxAction<any> { type = BookingActions.DROPOFF_DATE_SELECT; }
export class DropoffTimeSelectAction extends NgRxAction<any> { type = BookingActions.DROPOFF_TIME_SELECT; }

export class ErrorAction extends NgRxAction<any> { type = BookingActions.ERROR; }

export type BookingAction =
	GetLocationsAction | GetLocationsSuccessAction |
	GetAvailableTimesAction | GetAvailableTimesSuccessAction |
	GetAvailableVehiclesAction | GetAvailableVehiclesSuccessAction |
	GetInsuranceOptions | GetInsuranceOptionsSuccess |
	SearchLocationsAction | SearchLocationsSuccessAction |
	CoverageRentalSelectionAction | CoveragePersonalSelectionAction | CoverageCorporateSelectionAction | CoverageTypeSelectionAction |
	LocationSelectionAction |
	VehicleSelectAction |
	PickupDateSelectAction |
	PickupTimeSelectAction |
	DropoffDateSelectAction |
	DropoffTimeSelectAction |
	PostReservationAction | PostReservationSuccessAction |
	ErrorAction;
