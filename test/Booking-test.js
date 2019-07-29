import chai from 'chai';
const expect = chai.expect;
import bookingsData from '../sampleData/bookingsData'
import Booking from '../src/Booking'

let randomIndex = Math.floor(Math.random() * (bookingsData.bookings.length - 1)) + 1;
let randomCustomerID = bookingsData.bookings[randomIndex].userID
let randomDate = bookingsData.bookings[randomIndex].date
let randomRoomNumber = bookingsData.bookings[randomIndex].roomNumber

describe('Booking', function () {
  
  it("should be a function", () => {
    expect(Booking).to.be.a("function");
  });
  
  let booking;
  beforeEach(() => {
    booking = new Booking(randomCustomerID, randomDate, randomRoomNumber);
  });
  
  it("should be an instance of Booking", () => {
    expect(booking).to.be.an.instanceof(Booking);
  });
  
  it("should establish an id property", () => {
    expect(booking).to.not.equal(undefined);
    expect(booking.userID).to.equal(randomCustomerID);
  });
  
  it("should establish a date property", () => {
    expect(booking).to.not.equal(undefined);
    expect(booking.date).to.equal(randomDate);
  });

  it("should establish a room number property", () => {
    expect(booking).to.not.equal(undefined);
    expect(booking.roomNumber).to.equal(randomRoomNumber);
  });
})