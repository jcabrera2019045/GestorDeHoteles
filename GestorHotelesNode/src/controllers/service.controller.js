"use strict";

var Service = require("../models/service.model");
var Hotel = require("../models/hotel.model");
const strings = require("../constants/strings");

exports.createService = (req, res) => {
    var service = new Service();
    var hotelId = req.params.hotelID;
    var params = req.body;
  
    if (req.user.role === strings.adminRole) {
      if (params.name && params.price) {
        service.name = params.name;
        service.price = params.price;
        service.hotelId = hotelId;
  
          Service.find({$and: [{ name: service.name, hotelId: hotelId }],}).exec((err, findedService) => {
              if(err) return res.status(500).send({Error: strings.requestError});
              if(findedService && findedService.length >= 1) return res.status(500).send({Error: strings.existingService});
              service.save((err, savedService) => {
                if (err)
                  return res.status(404).send({ mensaje: strings.saveHotelError });
                if (savedService) {
                  return res.status(200).send(savedService);
                } else {
                  return res.status(404).send({ mensaje: strings.notSavedSeviceError });
                }
              });
          })
      } else {
          return res.status(500).send({Error: strings.unfilledDataError});
      };
      } else {
          return res.status(500).send({Error: strings.permissionsError});
      };
  }

  exports.updateService = (req, res) => {
    var serviceId = req.params.serviceID;
    var params = req.body;
  
    if (req.user.role != strings.adminRole) return res.status(500).send({mensaje: strings.permissionsError});
        Service.findByIdAndUpdate(
          serviceId,
          params,
          { new: true },
          (err, updatedService) => {
            if (err) return res.status(500).send({ mensaje: strings.requestError });
            if (!updatedService) return res.status(500).send({ mensaje: strings.updateServiceError });
            return res.status(200).send({ updatedService });
          }
        );

  };

  exports.deleteService = (req, res) => {
    var serviceId = req.params.serviceID;
  
    if (req.user.role != strings.adminRole) return res.status(500).send({mensaje: strings.permissionsError});
        Service.findByIdAndDelete(
          serviceId,
          (err, deletedService) => {
            if (err) return res.status(500).send({ mensaje: strings.requestError });
            if (!deletedService) return res.status(500).send({ mensaje: strings.deleteServiceError });
            return res.status(200).send({ deletedService });
          }
        );

  };

  exports.getServices = (req, res) => {
      Service.find((err, getServices) => {
        if(err) return res.status(500).send({Error: strings.requestError});
        if(!getServices || getServices.length == 0) return res.status(500).send({Error: strings.noDataError});
        return res.status(200).send(getServices);
      }) 
};

