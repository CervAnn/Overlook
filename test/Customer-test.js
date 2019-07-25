import chai from 'chai';
const expect = chai.expect;
// import userData = '../sampleData/userData'
// import roomData = '../sampleData/roomData'
// import bookingsData = '../sampleData/bookingsData'
// import roomServicesData = '../sampleData/roomServicesData'
import Customer from '../src/Customer'

describe('Customer', function () {


  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of Hotel', () => {
    let customer = new Customer()
    expect(customer).to.be.an.instanceof(Customer);
  });
})