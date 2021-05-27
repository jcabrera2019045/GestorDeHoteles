"use strict";

module.exports = Object.freeze({
  // General texts
  permissionsError: "No tienes los permisos necesarios",
  serverError: "Error en el servidor, intentalo más tarde",
  existingUserError: "Usuario o correo ya existente",
  welcomeMsg: "Bienvenido",
  incorrectPassError: "Contraseña incorrecta",
  enterPassError: "Debe de ingresar su contraseña",
  enterUserError: "Debe de ingresar su correo o username",
  updatePassError:
    "Se ha producido un error al intentar actualizar la contraseña",
  noDataError: "No se han encontrado datos a mostrar",
  alphabetical: "alfabeticamente",
  priceDesc: "precio-descendente",
  priceAsc: "precio-ascendente",
  unexpectedError: "Error inesperado",
  unfilledDataError: "Ingrese todos los datos necesarios",
  comparePassError: "Error al comparar contraseñas",
  encryptPassError: "Error al encriptar la contraseña",
  requestError: "Error en la petición",
  userRole: "user_role",
  hotelAdminRole: "hotel_admin_role",
  adminRole: "admin_role",

  // Index texts
  succesfullyConnectoToDB: "Se ha conectado a la base de datos exitosamente",
  serverPort: "El servidor esta corriendo en el puerto 3000",
  connectToDBError: "Error al conectar con la base de datos",
  defaultAdminName: "Erick",
  defaultAdminLastName: "Bran",
  defaultAdminPass: "12345",
  defaultAdminRole: "admin_role",
  defaultAdminUsername: "ebran",
  defaultAdminEmail: "ebran@gmail.com",

  // Authenticated texts
  requestHeadersError: "Petición sin cabeceras de autorización.",
  expiredToken: "Token expirado.",
  invalidToken: "Token invalido.",

  // Hotel Controller texts
  saveHotelError: "Error al guardar el hotel",
  succesfullyHotelCreated: "Hotel creado exitosamente",
  notSavedHotel: "Se ha producido un error, hotel no guardado",
  datesRangeError: "El rango de fechas ingresado es incorrecto",
  incorrectHotelDataError: "Datos del hotel incorrectos",
  notFindHotelToDeleteError: "No se ha encontrado el hotel a eliminar",
  notFindHotelToUpdateError: "No se ha encontrado el hotel a actualizar",
  invalidOptionError:
    "Debe de ingresar una opción valida para ordenar los datos",
  existingHotelError: "Hotel ya existente",
  managerRoleError: "El manager asignado no tiene el rol necesario",
  updateHotelError: "Error al actualizar hotel, intentelo de nuevo",
  deleteHotelError: "Error al eliminar hotel, intentelo de nuevo",
  managerError: "Manager ya asignado a un hotel",

  // User Controller texts
  saveuserError: "Error al guardar usuario",
  userCreated: "Usuario Creado",
  userMS: "USER",
  notSavedUser: "Se ha producido un error, usuario no guardado",
  incorrectUserDataError: "Datos de usuario incorrectos",
  cantUpdateRole: "El campo role no puede ser actualizado",
  notFindUserToUpdateError: "No se ha encontrado el usuario a actualizar",
  notFindUserToDeleteError: "No se ha encontrado el usuario a eliminar",
  invalidRoleError:
    "Rol invalido, por favor ingrese un rol valido: user_role, hotel_role",
  updateUserError: "Error al actualizar usuario",
  notFindUserError: "Usuario no encontrado",
  comparePassError: "Error al comparar contraseñas",
  cantAssignRoleError: "El campo rol no puede ser asignado",

  // Room Controller texts
  saveRoomError: "Error al guardar habitación, intentelo de nuevo",
  existingRoomError: "Habitación existente",
  notSavedRoom: "Se ha producido un error, habitación no guardada",
  notFindHotel: "Hotel no encontrado",
  notFindRoom: "Habitación no encontrada",
  updateRoomError: "Error al actualizar habitación",
  deleteRoomError: "Error al eliminar habitación",

  // Event Type Controller texts
  saveEventTypeError: "Error al guardar tipo de evento",
  existingEventType: "Tipo de evento existente",
  notSavedEventType: "Se ha producido un error, tipo de evento no guardado",
  updateEventTypeError: "Error al actualizar tipo de evento",
  deleteEventTypeError: "Error al eliminar tipo de evento",
  notFindEventTypeError: "Tipo de evento no encontrado",

  // Event Controller texts
  notFindedEventError: "Evento no encontrado",
  existingEvent: "Evento existente",
  saveEventError: "Error al guardar evento",
  updateEventError: "Error al actualizar evento",
  deleteEventError: "Error al eliminar evento",
  notSavedEvent: "Se ha producido un error, evento no guardado",

  // Service Controller texts
  existingService: "Servicio existente",
  saveServiceError: "Error al guardar servicio",
  notSavedSeviceError: "Se ha producido un error, servicio no guardado",
  notFindedService: "Servicio no encontrado",
  updateServiceError: "Error al actualizar servicio",
  deleteServiceError: "Error al eliminar servicio",

});
