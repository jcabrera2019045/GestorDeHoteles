"use strict";

var Event = require("../models/event.model");
var Hotel = require("../models/hotel.model");
var EventType = require("../models/eventType.model");
const strings = require("../constants/strings");

exports.createEvent = (req, res) => {
  var event = new Event();
  var hotelId = req.params.hotelID;
  var eventTypeId = req.params.eventTypeID;
  var params = req.body;

  if (req.user.role === strings.hotelAdminRole) {
    if (params.name && params.capacity && params.date) {
      event.name = params.name;
      event.capacity = params.capacity;
      event.date = params.date;
      event.eventTypeId = eventTypeId;
      event.hotelId = hotelId;

      Hotel.findById(hotelId, (err, findedHotel) => {
        if(err) return res.status(500).send({Error: strings.requestError});
        if(!findedHotel) return res.status(500).send({Error: strings.notFindHotel});
        if(findedHotel.manager != req.user.sub) return res.status(500).send({Error: strings.permissionsError});
        EventType.findById(eventTypeId, (err, findedEventType) => {
            if(err) return res.status(500).send({Error: strings.requestError});
            if(!findedEventType) return res.status(500).send({Error: strings.notFindEventTypeError});
            Event.find({
                $and: [{ name: event.name, date: event.date, hotelId: event.hotelId }],
            }).exec((err, findedEvent) => {
                if(err) return res.status(500).send({Error: strings.requestError});
                if(findedEvent && findedEvent.length >= 1) {
                    return res.status(500).send({Error: strings.existingEvent});
                } else {
                    event.save((err, savedEvent) => {
                        if (err) return res.status(404).send({ mensaje: strings.saveEventError });
                        if (savedEvent) {
                          return res.status(200).send(savedEvent);
                        } else {
                          return res.status(404).send({ mensaje: strings.notSavedEvent });
                        }
                      });
                }
            })
        })
      })
    } else {
        return res.status(500).send({Error: strings.unfilledDataError});
    };
    } else {
        return res.status(500).send({Error: strings.permissionsError});
    };
}