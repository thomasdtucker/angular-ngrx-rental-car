import { AccountAction, AccountActions } from './account.actions';
import { accountAdapter, accountInitialState, AccountState } from './account.state';

export function accountReducer(
	state = accountInitialState,
	action: AccountAction
): AccountState {

	switch (action.type) {

		case AccountActions.GET_LOCATIONS_SUCCESS: {
			return {
				...state,
				locations:action.payload
			}
		}

		case AccountActions.GET_UPCOMING_RESERVATIONS_SUCCESS: {
			let reservations = [...action.payload.reservations];
			reservations.forEach( reservation => {
				let location = state.locations.filter( x => x.id === reservation.pickup_location_id).shift();
				reservation.pickup_location = location;
				reservation.dropoff_location = location;
			});
			return {
				...state,
				reservations:reservations
			}
		}

		case AccountActions.ERROR: {
			return {
				...state,
				error:action.payload.error.message
			}
		}

		default: {
			return state;
		}
	}
}
