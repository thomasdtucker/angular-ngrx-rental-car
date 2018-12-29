import { NgRxAction } from '../../store/ngrx-action';

export enum AccountActions {
	GET_LOCATIONS = '[Booking] Locations Requested',
	GET_LOCATIONS_SUCCESS = '[Booking] Locations Requested Success',

	GET_LOCATION_ASSETS = '[Account] Location Assets Requested',
	GET_LOCATION_ASSETS_SUCCESS = '[Account] Location Assets Success',

  GET_UPCOMING_RESERVATIONS = '[Account] Reservations Requested',
	GET_UPCOMING_RESERVATIONS_SUCCESS = '[Account] Reservations Success',
	ERROR = '[Account] Error'
}

export class GetLocationsAction extends NgRxAction<any> { type = AccountActions.GET_LOCATIONS; }
export class GetLocationsSuccessAction extends NgRxAction<any> { type = AccountActions.GET_LOCATIONS_SUCCESS; }

export class GetLocationAssetsAction extends NgRxAction<any> { type = AccountActions.GET_LOCATION_ASSETS; }
export class GetLocationAssetsSuccessAction extends NgRxAction<any> { type = AccountActions.GET_LOCATION_ASSETS_SUCCESS; }

export class GetUpcomingReservationsAction extends NgRxAction<any> { type = AccountActions.GET_UPCOMING_RESERVATIONS; }
export class GetUpcomingReservationsSuccessAction extends NgRxAction<any> { type = AccountActions.GET_UPCOMING_RESERVATIONS_SUCCESS; }

export class ErrorAction extends NgRxAction<any> { type = AccountActions.ERROR; }

export type AccountAction =
	GetLocationsAction | GetLocationsSuccessAction |
	GetUpcomingReservationsAction | GetUpcomingReservationsSuccessAction |
	ErrorAction;
