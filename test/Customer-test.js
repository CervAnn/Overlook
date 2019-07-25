import chai from "chai";
const expect = chai.expect;
// import userData = '../sampleData/userData'
// import roomData = '../sampleData/roomData'
// import bookingsData = '../sampleData/bookingsData'
// import roomServicesData = '../sampleData/roomServicesData'
import Customer from "../src/Customer";
import hotel from "../src/Hotel";

describe("Customer", function() {
  it("should be a function", () => {
    expect(Customer).to.be.a("function");
  });

  it("should be an instance of Hotel", () => {
    let customer = new Customer(hotel, 7, "Josianne Huels");
    expect(customer).to.be.an.instanceof(Customer);
  });

  it("should establish name and id properties", () => {
    let customer = new Customer(hotel, 7, "Josianne Huels");
    expect(customer).to.not.equal(undefined);
    expect(customer.id).to.equal(7);
    expect(customer.name).to.equal("Josianne Huels");
  });
});
