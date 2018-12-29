import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AccountStoreService } from './account-store.service';
import { AccountEffects } from './account.effects';
import { accountReducer } from './account.reducer';

// import TaskStoreModule in the TaskModule
@NgModule({
  imports: [
    StoreModule.forFeature('account', accountReducer),
    EffectsModule.forFeature([AccountEffects])
  ],
  exports: [StoreModule, EffectsModule],
  providers: [AccountStoreService]
})
export class AccountStoreModule {}
