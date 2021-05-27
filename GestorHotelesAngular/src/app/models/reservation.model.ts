export class Reservation {
  constructor(
    public _id: String,
    public userId: String,
    public startDate: String,
    public endDate: String,
    public roomId: String,
    public hotelId: String,
    public services: [{
      price: Number,
      name: String,
      serviceId: String,
    }]
  ) { }
}
