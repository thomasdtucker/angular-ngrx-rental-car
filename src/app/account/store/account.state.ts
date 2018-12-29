import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface AccountState extends EntityState<any> {
	locations: any;
	reservations: any;
	error: any;
}

export const accountAdapter: EntityAdapter<any> = createEntityAdapter<any>({
});

export const accountInitialState: AccountState = accountAdapter.getInitialState({
	error:'',
	locations: [],
	reservations: []
});

export const selectLocations = (state: AccountState) => state.locations;
export const selectReservations = (state: AccountState) => state.reservations;
export const selectError = (state: AccountState) => state.error;
