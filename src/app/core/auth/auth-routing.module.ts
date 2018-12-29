import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SendConfirmationComponent } from './send-confirmation/send-confirmation.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
	{ path: 'auth', component: LoginComponent},
	{ path: 'auth/confirmation', component: SendConfirmationComponent},
	{ path: 'auth/forgot_password', component: ForgotPasswordComponent},
	{ path: 'auth/signup', component: SignUpComponent},
	{ path: 'auth/login', redirectTo: 'auth'},
	{ path: 'auth/**', redirectTo: 'auth'}

];
export const AuthRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
