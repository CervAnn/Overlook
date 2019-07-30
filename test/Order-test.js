import chai from 'chai';
const expect = chai.expect;
import roomServicesData from '../sampleData/roomServicesData'
import Order from '../src/Order'
let randomIndex = Math.floor(Math.random() * (roomServicesData.length - 1)) + 1;
let randomCustomerID = roomServicesData[randomIndex].userID
let randomDate = roomServicesData[randomIndex].userID
let randomFood = roomServicesData[randomIndex].food
let randomCost = roomServicesData[randomIndex].totalCost

describe('Order', function () {
  
  it("should be a function", () => {
    expect(Order).to.be.a("function");
  });
  
  let order;
  beforeEach(() => {
    order = new Order(randomCustomerID, randomDate, randomFood, randomCost);
  });
  
  it("should be an instance of Booking", () => {
    expect(order).to.be.an.instanceof(Order);
  });
  
  it("should establish an id property", () => {
    expect(order).to.not.equal(undefined);
    expect(order.userID).to.equal(randomCustomerID);
  });
  
  it("should establish a date property", () => {
    expect(order).to.not.equal(undefined);
    expect(order.date).to.equal(randomDate);
  });

  it("should establish a room number property", () => {
    expect(order).to.not.equal(undefined);
    expect(order.food).to.equal(randomFood);
  });

  it("should establish a room number property", () => {
    expect(order).to.not.equal(undefined);
    expect(order.totalCost).to.equal(randomCost);
  });

})