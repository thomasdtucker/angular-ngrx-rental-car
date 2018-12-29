import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface AuthState extends EntityState<any> {
	token: string,
	authenticated: boolean;
	error: any;
	user: any;
}

export const authAdapter: EntityAdapter<any> = createEntityAdapter<any>({
});

export const authInitialState: AuthState = authAdapter.getInitialState({
  token: '',
  authenticated: false,
	error: null,
	user: null
});

export const isAuthenticated = (state: AuthState) => state.authenticated;
export const selectToken = (state: AuthState) => state.token;
export const selectUser = (state: AuthState) => state.user;
export const selectError = (state: AuthState) => state.error;
