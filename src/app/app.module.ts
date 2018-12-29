import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

// Analytics
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2Segment } from 'angulartics2/segment';

// Route State Watcher
import { CustomRouterStateSerializer } from './shared/utils';

// Core Module Imports
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// App Component Imports
import { AppStoreModule } from './store/app-store.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Additional Component Imports
import { HomeComponent } from './home/home.component';
import { PromoComponent } from './promo/promo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PromoComponent
  ],
  imports: [
		Angulartics2Module.forRoot([Angulartics2Segment]),
		AppRoutingModule,
		AppStoreModule,
		BrowserAnimationsModule,
		BrowserModule,
		CoreModule,
		SharedModule
  ],
	providers: [{ provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule { }
