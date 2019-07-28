import chai from 'chai';
const expect = chai.expect;
// import userData = '../sampleData/userData'
// import roomData = '../sampleData/roomData'
// import bookingsData = '../sampleData/bookingsData'
// import roomServicesData = '../sampleData/roomServicesData'
import Booking from '../src/Booking'

describe('Booking', function () {


  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of Booking', () => {
    let booking1 = new Booking()
    expect(booking1).to.be.an.instanceof(Booking);
  });
})