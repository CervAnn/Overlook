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
    expect(hotel).to.be.an.instanceof(Hotel);
  });
})