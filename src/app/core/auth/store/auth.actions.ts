import { NgRxAction } from '../../../store/ngrx-action';
import { Login } from './../models/login';

export enum AuthActions {
  LOGIN = '[Auth] Login Requested',
	LOGIN_SUCCESS = '[Auth] LOGIN Success',
	LOGOUT = '[Auth] Logout Requested',
	GET_USER = '[Auth] User Requested',
	GET_USER_SUCCESS = '[Auth] GET_USER Success',
	ERROR = '[Auth] Error'
}

export class LoginAction extends NgRxAction<any> { type = AuthActions.LOGIN; }
export class LoginSuccessAction extends NgRxAction<any> { type = AuthActions.LOGIN_SUCCESS; }

export class LogoutAction extends NgRxAction<any> { type = AuthActions.LOGOUT; }

export class GetUserAction extends NgRxAction<any> { type = AuthActions.GET_USER; }
export class GetUserSuccessAction extends NgRxAction<any> { type = AuthActions.GET_USER_SUCCESS; }

export class ErrorAction extends NgRxAction<any> { type = AuthActions.ERROR; }

export type AuthAction =
	LoginAction | LoginSuccessAction |
	LogoutAction |
	GetUserAction | GetUserSuccessAction |
	ErrorAction;
