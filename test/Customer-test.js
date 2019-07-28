import chai from "chai";
const expect = chai.expect;
import customerData from '../sampleData/customerData'
// import roomData = '../sampleData/roomData'
import bookingsData from '../sampleData/bookingsData'
import roomServicesData from '../sampleData/roomServicesData'
import Customer from "../src/Customer";
// import hotel from "../src/Hotel";

describe("Customer", function() {
  it("should be a function", () => {
    expect(Customer).to.be.a("function");
  });

  it("should be an instance of Customer", () => {
    let customer = new Customer(4, "Brook Christiansen", customerData, bookingsData, roomServicesData);
    expect(customer).to.be.an.instanceof(Customer);
  });

  it("should establish name and id properties", () => {
    let customer = new Customer(4, "Brook Christiansen", customerData, bookingsData, roomServicesData);
    expect(customer).to.not.equal(undefined);
    expect(customer.id).to.equal(7);
    expect(customer.name).to.equal("Josianne Huels");
  });
});
