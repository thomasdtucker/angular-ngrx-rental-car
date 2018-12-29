import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthStoreService } from './auth-store.service';
import { AuthEffects } from './auth.effects';
import { authReducer } from './auth.reducer';

// import TaskStoreModule in the TaskModule
@NgModule({
  imports: [
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: [StoreModule, EffectsModule],
  providers: [AuthStoreService]
})
export class AuthStoreModule {}
