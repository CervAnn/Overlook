import chai from "chai";
const expect = chai.expect;
import Customer from "../src/Customer";
import customerData from "../sampleData/customerData"
let randomIndex = Math.floor(Math.random() * (customerData.length - 1)) + 1;
let randomCustomerID = customerData.find(user => user.id === randomIndex).id
let randomCustomerName = customerData.find(user => user.id === randomIndex).name
// import hotel from "../src/Hotel";

describe("Customer", function() {
  it("should be a function", () => {
    expect(Customer).to.be.a("function");
  });

  let customer;
  beforeEach(() => {
    customer = new Customer(randomCustomerID, randomCustomerName);
  });

  it("should be an instance of Customer", () => {
    expect(customer).to.be.an.instanceof(Customer);
  });

  it("should establish id properties", () => {
    expect(customer).to.not.equal(undefined);
    expect(customer.id).to.equal(randomCustomerID);
  });

  it("should establish name properties", () => {
    expect(customer).to.not.equal(undefined);
    expect(customer.name).to.equal(randomCustomerName);
  });

});
