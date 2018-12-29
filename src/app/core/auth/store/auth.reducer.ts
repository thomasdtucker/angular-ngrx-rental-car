import { AuthAction, AuthActions } from './auth.actions';
import { authAdapter, authInitialState, AuthState } from './auth.state';

export function authReducer(
	state = authInitialState,
	action: AuthAction
): AuthState {

	switch (action.type) {
		case AuthActions.LOGIN: {
			return Object.assign({}, state, {});
		}

		case AuthActions.LOGOUT: {
			return {
				...state,
				authenticated: false,
				token: '',
				error:'',
				user:{}
			}
		}

		case AuthActions.LOGIN_SUCCESS: {
			return Object.assign({}, state, {
				authenticated: true,
				error:'',
				token: action.payload.authentication_token,
				user: null
			});
		}

		case AuthActions.GET_USER: {
			return Object.assign({}, state, {});
		}

		case AuthActions.GET_USER_SUCCESS: {
			return Object.assign({}, state, {
				user: action.payload,
				error: null
			});
		}

		case AuthActions.ERROR: {
			return Object.assign({}, state, {
				authenticated: false,
				error: action.payload.error.message,
				token: '',
				user: null
			});
		}

		default: {
			return state;
		}
	}
}
