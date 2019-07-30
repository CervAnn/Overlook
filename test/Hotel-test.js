import chai from 'chai';
const expect = chai.expect;
import customerData from '../sampleData/customerData'
import roomData from '../sampleData/roomData'
import bookingsData from '../sampleData/bookingsData'
import roomServicesData from '../sampleData/roomServicesData'
import Hotel from '../src/Hotel'
let today = "2019/10/28"

describe('Hotel', function () {

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  let hotel;

  beforeEach(() => {
    hotel = new Hotel(customerData, bookingsData, roomData, roomServicesData, today);
  });

  it('should be an instance of Hotel', () => {
    expect(hotel).to.be.an.instanceof(Hotel);
  });

  it('should hold the customer dataset as a property', () => {
    expect(hotel.customerData).to.not.equal(undefined);
    expect(hotel.customerData[0]).to.eql({ id: 1, name: 'Matilde Larson' })
  });

  it('should hold the booking dataset as a property', () => {
    expect(hotel.bookingsData).to.not.equal(undefined);
    expect(hotel.bookingsData[0].roomNumber).to.equal(5)
  });

  it('should hold the room dataset as a property', () => {
    expect(hotel.roomData).to.not.equal(undefined);
    expect(hotel.roomData[0].roomType).to.equal("residential suite")
  });

  it('should hold the room service dataset as a property', () => {
    expect(hotel.roomServicesData).to.not.equal(undefined);
    expect(hotel.roomServicesData[0].date).to.equal("2019/07/29")
  });

  it('should return the number of available rooms for today', () => {
    expect(hotel.availableRoomsToday()).to.not.equal(undefined);
    expect(hotel.availableRoomsToday()).to.equal(34)
  });

  it('should return the revenue from booked rooms on a specific day', () => {
    expect(hotel.totalRoomRevenueToday()).to.not.equal(undefined);
    expect(hotel.totalRoomRevenueToday()).to.equal(5069.78)
  });

  it('should return the revenue from room service orders on a specific day', () => {
    expect(hotel.totalOrderRevenueToday()).to.not.equal(undefined);
    expect(hotel.totalOrderRevenueToday()).to.equal(30.05)
  });

  it('should return the total revenue from room service orders and booked rooms on a specific day', () => {
    expect(hotel.totalRoomAndOrderRevenueToday()).to.not.equal(undefined);
    expect(hotel.totalRoomAndOrderRevenueToday()).to.equal(5099.83)
  });

  it('should return the percentage of rooms occupied for a specific day', () => {
    expect(hotel.percentOccupied()).to.not.equal(undefined);
    expect(hotel.percentOccupied()).to.equal(32)
  });

  it('should return the most popular booking date', () => {
    expect(hotel.mostPopularBookingDate()).to.not.equal(undefined);
    expect(hotel.mostPopularBookingDate()).to.eql(["2019/09/07"])
  });

  it('should return the least popular booking date', () => {
    expect(hotel.leastPopularBookingDate()).to.not.equal(undefined);
    expect(hotel.leastPopularBookingDate()).to.eql(['2019/08/29', '2019/09/21'])
  });
})