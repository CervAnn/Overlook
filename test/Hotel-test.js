import chai from 'chai';
const expect = chai.expect;
import customerData from '../sampleData/customerData'
import roomData from '../sampleData/roomData'
import bookingsData from '../sampleData/bookingsData'
import roomServicesData from '../sampleData/roomServicesData'
import Hotel from '../src/Hotel'

describe('Hotel', function () {

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of Hotel', () => {
    let hotel = new Hotel(customerData, bookingsData, roomData, roomServicesData)
    expect(hotel).to.be.an.instanceof(Hotel);
  });

  it('should hold the customer dataset as a property', () => {
    let hotel = new Hotel(customerData, bookingsData, roomData, roomServicesData)
    expect(hotel.customerData).to.not.equal(undefined);
    expect(hotel.customerData.users[0]).to.eql({ id: 1, name: 'Matilde Larson' })
  });

  it('should hold the booking dataset as a property', () => {
    let hotel = new Hotel(customerData, bookingsData, roomData, roomServicesData)
    expect(hotel.bookingsData).to.not.equal(undefined);
    expect(hotel.bookingsData.bookings[0].roomNumber).to.equal(5)
  });

  it('should hold the room dataset as a property', () => {
    let hotel = new Hotel(customerData, bookingsData, roomData, roomServicesData)
    expect(hotel.roomData).to.not.equal(undefined);
    expect(hotel.roomData.rooms[0].roomType).to.equal("residential suite")
  });

  it('should hold the room service dataset as a property', () => {
    let hotel = new Hotel(customerData, bookingsData, roomData, roomServicesData)
    expect(hotel.roomData).to.not.equal(undefined);
    expect(hotel.roomServicesData.roomServices[0].date).to.equal("2019/07/29")
  });
})