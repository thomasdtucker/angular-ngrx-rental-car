import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [
		CommonModule
	],
  exports: [
    HttpClientModule,
		MaterialModule
  ]
})
export class SharedModule {}
