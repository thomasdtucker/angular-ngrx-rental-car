import { ActiveBooking, AvailableTimes, Booking, Coverage, CoverageItem, LocationModel, Pricing, ReceiptData, Rental, Reservation, ReservationInsurance, Time }  from '../models';

import { BookingAction, BookingActions } from './booking.actions';
import { bookingInitialState, BookingState } from './booking.state';

export function bookingReducer(
	state = bookingInitialState,
	action: BookingAction
): BookingState {

	switch (action.type) {
		case BookingActions.GET_AVAILABLE_TIMES_SUCCESS: {
			return {
				...state,
				availableTimes: action.payload,
				isLoading:false,
				error: null
			};
		}

		case BookingActions.GET_AVAILABLE_VEHICLES_SUCCESS: {
			return {
				...state,
				activeBooking: {
					...state.activeBooking,
					receiptData:action.payload.receipt_data
				},
				isLoading:false,
				error: null
			};
		}

		case BookingActions.GET_INSURANCE_OPTIONS_SUCCESS: {
			let insurance_options = [];
			let nestedOptions = [];
			if(action && action.payload && action.payload.insurance_options){
				insurance_options = action.payload.insurance_options;
				nestedOptions = insurance_options.filter( x => !x.parent_id);
				nestedOptions.forEach( option => {
					option.total = option.prices_by_location[state.activeBooking.location.id]
				});
				insurance_options.filter( x => x.parent_id).forEach( (option, index) => {
					option.total = option.prices_by_location[state.activeBooking.location.id]
					if(option.parent_id){
						let parent = nestedOptions.filter(x => x.id === option.parent_id).shift();
						if(parent.hasOwnProperty('children')){
							parent.children.push(option);
						} else {
							parent.children = [option];
						}
					}
				});
			}

			return {
				...state,
				insuranceOptions: nestedOptions,
				isLoading:false,
				error: null
			};
		}


		case BookingActions.GET_LOCATIONS: {
			return {
				...state,
				isLoading: true,
				error: null
			};
		}

		case BookingActions.GET_LOCATIONS_SUCCESS: {
			return {
				...state,
				isLoading: false,
				locations: action.payload,
				error: null
			};
		}

		case BookingActions.SEARCH_LOCATIONS: {
			return {
				...state,
				isLoading:true,
				locationSearch:action.payload,
				error: null
			};
		}

		case BookingActions.SEARCH_LOCATIONS_SUCCESS: {
			return {
				...state,
				isLoading:false,
				locations: action.payload,
				error: null
			};
		}

		// setters
		case BookingActions.COVERAGE_Rental_SELECT: {
			let selectedCoverage = action.payload;
			let coverageState = [...state.activeBooking.coverage.selectedCoverage];

			let newCoverageItem = Object.assign({},new CoverageItem, {
				insurance_option_id: selectedCoverage.id,
				is_Rental: true,
			});


			// working with a single coverage option
			if(coverageState.filter(x => x.insurance_option_id === newCoverageItem.insurance_option_id).length){
				coverageState.splice(coverageState.findIndex( x => x.insurance_option_id === newCoverageItem.insurance_option_id),1);
				if(selectedCoverage.children){
					selectedCoverage.children.forEach( (child, index) => {
						coverageState.splice(coverageState.findIndex( x => x.insurance_option_id === child.insurance_option_id),1);
					});
				}
			} else {
				coverageState.push(newCoverageItem);
				if(selectedCoverage.children){
					selectedCoverage.children.forEach( (child, index) => {
						let childCoverageItem = Object.assign({},new CoverageItem, {
							insurance_option_id: child.id,
							is_Rental: true,
						});
						if(coverageState.findIndex( x => x.insurance_option_id === child.id) < 0){
							coverageState.push(childCoverageItem);
						}
					});
				}
			}

			return {
				...state,
				activeBooking: {
					...state.activeBooking,
					coverage:{
						...state.activeBooking.coverage,
						selectedCoverage:coverageState
					}
				}
			};
		}

		case BookingActions.COVERAGE_PERSONAL_SELECT: {
			console.log(action);
			let newCoverageItem = Object.assign({},new CoverageItem, {
				carrier: action.payload.carrier,
				policy_number: action.payload.policyNumber,
				is_personal: true,
			});

			return {
				...state,
				activeBooking: {
					...state.activeBooking,
					coverage:{
						...state.activeBooking.coverage,
						selectedCoverage:[newCoverageItem]
					}
				}
			};
		}

		case BookingActions.COVERAGE_CORPORATE_SELECT: {
			let newCoverageItem = Object.assign({},new CoverageItem, {
				carrier: action.payload.carrier,
				policy_number: action.payload.policyNumber,
				is_corporate: true,
			});

			return {
				...state,
				activeBooking: {
					...state.activeBooking,
					coverage:{
						...state.activeBooking.coverage,
						selectedCoverage:[newCoverageItem]
					}
				}
			};
		}

		case BookingActions.COVERAGE_TYPE_SELECT: {
			if(state.activeBooking.coverage.selectedType === action.payload){
				action.payload = '';
			}
			return {
				...state,
				activeBooking: {
					...state.activeBooking,
					coverage:{
						...state.activeBooking.coverage,
						selectedType:action.payload
					}
				}
			};
		}

		case BookingActions.LOCATION_SELECT: {
			return {
				...state,
				activeBooking: {
					...state.activeBooking,
					location:action.payload,
					pickupDate: '',
					pickupTime: '',
					dropoffDate: '',
					dropoffTime: '',
					receiptData: new ReceiptData,
					vehicle: {}
				},
				availableTimes: null,
				error: null
			};
		}

		case BookingActions.PICKUP_DATE_SELECT: {
			return {
				...state,
				activeBooking: {
					...state.activeBooking,
					pickupDate:action.payload
				},
				error: null
			};
		}

		case BookingActions.DROPOFF_DATE_SELECT: {
			return {
				...state,
				activeBooking: {
					...state.activeBooking,
					dropoffDate:action.payload
				},
				error: null
			};
		}

		case BookingActions.PICKUP_TIME_SELECT: {
			return {
				...state,
				activeBooking: {
					...state.activeBooking,
					pickupTime:action.payload
				},
				error: null
			};
		}

		case BookingActions.DROPOFF_TIME_SELECT: {
			return {
				...state,
				activeBooking: {
					...state.activeBooking,
					dropoffTime:action.payload
				},
				error: null
			};
		}

		case BookingActions.VEHICLE_SELECT: {
			return {
				...state,
				activeBooking: {
					...state.activeBooking,
					vehicle:action.payload
				},
				error: null
			};
		}

		case BookingActions.ERROR: {
			return {
				...state,
				isLoading:false,
				locations:null,
				error: action.payload.error.message
			};
		}

		default: {
			return state;
		}
	}
}
