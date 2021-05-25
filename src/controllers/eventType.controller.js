"use strict";

var EventType = require("../models/eventType.model");
const strings = require("../constants/strings");

exports.createEventType = (req, res) => {
    var eventType = new EventType();
    var params = req.body;

    if (req.user.role === strings.adminRole || req.user.role === strings.hotelAdminRole ) {
        if (params.name && params.description) {
          eventType.name = params.name;
          eventType.description = params.description;
    
            EventType.find({
               name: eventType.name,
            }).exec((err, findedEventType) => {
              if (err)
                return res.status(500).send({ mensaje: strings.saveEventTypeError });
              if (findedEventType && findedEventType.length >= 1) {
                return res.status(500).send({ mensaje: strings.existingEventType });
              } else {
                eventType.save((err, savedEventType) => {
                  if (err)
                    return res.status(404).send({ mensaje: strings.saveEventTypeError });
                  if (savedEventType) {
                    return res.status(200).send(savedEventType);
                  } else {
                    return res.status(404).send({ mensaje: strings.notSavedEventType });
                  }
                });
              }
            });
        } else {
          return res.status(500).send({ mensaje: strings.unfilledDataError });
        }
      } else {
        return res.status(404).send({ mensaje: strings.permissionsError });
      }
}

exports.updateEventType = (req, res) => {
    var eventTypeID = req.params.eventTypeID;
    var params = req.body;

if (req.user.role != strings.adminRole && req.user.role != strings.hotelAdminRole) return res.status(500).send({Error: strings.permissionsError}); 
      EventType.findByIdAndUpdate(
        eventTypeID,
        params,
        { new: true },
        (err, updatedEventType) => {
          if (err) return res.status(500).send({ mensaje: strings.requestError });
          if (!updatedEventType) return res.status(500).send({ mensaje: strings.updateEventTypeError });
          return res.status(200).send({ updatedEventType });
        }
      );
  };

exports.deleteEventType = (req, res) => {
    var eventTypeID = req.params.eventTypeID;

if (req.user.role != strings.adminRole && req.user.role != strings.hotelAdminRole) return res.status(500).send({Error: strings.permissionsError}); 
      EventType.findByIdAndDelete(
        eventTypeID,
        (err, deletedEventType) => {
          if (err) return res.status(500).send({ mensaje: strings.requestError });
          if (!deletedEventType) return res.status(500).send({ mensaje: strings.deleteEventTypeError });
          return res.status(200).send({ deletedEventType });
        }
      );
  };

  exports.getEventTypes = (req, res) => {
    if (req.user.role != strings.adminRole && req.user.role != strings.hotelAdminRole) return res.status(500).send({ message: strings.permissionsError });
    EventType.find({}, (err, eventType) => {
      if (err) {
        res.status(500).send({ message: strings.requestError });
      } else if (eventType) {
        res.send({ eventType });
      } else {
        res.status(404).send({ message: strings.noDataError });
      }
    });
  };
