import { ActiveBooking, AvailableTimes, Booking, LocationModel, Pricing, ReceiptData, Reservation, ReservationInsurance, Time } from '../models/';

export class BookingState extends Booking {
}

export const bookingInitialState: Booking = new Booking;

export const selectError = (state: BookingState) => state.error;
export const selectActiveBooking = (state: BookingState) => state.activeBooking;
export const selectAvailableTimes = (state: BookingState) => state.availableTimes;
export const selectInsuranceOptions = (state: BookingState) => state.insuranceOptions;
export const selectLocations = (state: BookingState) => state.locations;
