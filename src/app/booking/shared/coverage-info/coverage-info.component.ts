import { Component, Input, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { BookingStoreService } from '../../store/booking-store.service';

@Component({
  selector: 'sc-coverage-info',
  templateUrl: './coverage-info.component.html',
  styleUrls: ['./coverage-info.component.scss']
})
export class CoverageInfoComponent implements OnInit {
	public insuranceOptions$: any;
	public showContent:boolean = false;

  constructor(
		public bookingService: BookingService,
		public bookingStoreService: BookingStoreService
	) {
	}

	ngOnInit() {
		this.insuranceOptions$ = this.bookingStoreService.getInsuranceOptions();
	}

	public toggleShowContent(){
		this.showContent = !this.showContent;
	}
}
