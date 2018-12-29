import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { SharedModule } from '../../shared/shared.module';

import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { AuthStoreModule } from './store/auth-store.module';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SendConfirmationComponent } from './send-confirmation/send-confirmation.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
		LoginComponent,
		ForgotPasswordComponent,
		SendConfirmationComponent,
		SignUpComponent
	],
  imports: [
		AuthRoutingModule,
		AuthStoreModule,
    CommonModule,
		FormsModule,
		SharedModule
  ],
	providers: [AuthService, AuthGuard]

})
export class AuthModule { }
