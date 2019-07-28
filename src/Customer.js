class Customer {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.bookings = [];
    this.roomService = [];
    // this.id = customerData.users.length + 1 || id;
    // this.name = customerData.users.find(user => this.id === user.id).name || name;
    // this.bookings = bookingsData.bookings.filter(user => user.userID === this.id) || [];
    // this.roomService = roomServicesData.roomServices.filter(user => user.userID === this.id) || [];
  }
}

export default Customer;
