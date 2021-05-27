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

  if (req.user.role != strings.adminRole) return res.status(500).send({mensaje: strings.permissionsError});
    if (params.name && params.capacity && params.date) {
      event.name = params.name;
      event.capacity = params.capacity;
      event.date = params.date;
      event.eventTypeId = eventTypeId;
      event.hotelId = hotelId;

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
    } else {
        return res.status(500).send({Error: strings.unfilledDataError});
    };
}

exports.updateEvent = (req, res) => {
  var eventID = req.params.eventID;
  var params = req.body;

  if (req.user.role != strings.adminRole) return res.status(500).send({mensaje: strings.permissionsError});
      Event.findByIdAndUpdate(eventID, params, { new: true }, (err, updatedEvent) => {
        if(err) return res.status(500).send({Error: strings.requestError});
        if(!updatedEvent) return res.status(500).send({Error: strings.updateEventError});
        return res.status(200).send(updatedEvent);
      }) 
};

exports.deleteEvent = (req, res) => {
  var eventID = req.params.eventID;
  if (req.user.role != strings.adminRole) return res.status(500).send({mensaje: strings.permissionsError});
      Event.findByIdAndDelete(eventID, (err, deletedEvent) => {
        if(err) return res.status(500).send({Error: strings.requestError});
        if(!deletedEvent) return res.status(500).send({Error: strings.deleteEventError});
        return res.status(200).send(deletedEvent);
      }) 
};

exports.getEvents = (req, res) => {
      var hotelId = req.params.hotelID;
      Event.find({hotelId: hotelId}, (err, getEvents) => {
        if(err) return res.status(500).send({Error: strings.requestError});
        if(!getEvents || getEvents.length == 0) return res.status(500).send({Error: strings.noDataError});
        return res.status(200).send(getEvents);
      }) 
};