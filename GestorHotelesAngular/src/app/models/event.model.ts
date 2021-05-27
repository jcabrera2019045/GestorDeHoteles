export class Event {
  constructor(
    public _id: String,
    public name: String,
    public eventTypeId: String,
    public capacity: Number,
    public hotelId: String,
    public date: String,
  ) { }
}
