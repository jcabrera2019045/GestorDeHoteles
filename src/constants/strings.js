'use strict'

module.exports = Object.freeze({
    // General texts
    permissionsError : "No tienes los permisos necesarios",
    serverError : "Error en el servidor, intentalo más tarde",
    existingUserError : "Usuario o correo ya existente",
    welcomeMsg : "Bienvenido",
    incorrectPassError : "Contraseña incorrecta",
    enterPassError : "Debe de ingresar su contraseña",
    enterUserError : "Debe de ingresar su correo o username",
    updatePassError : "Se ha producido un error al intentar actualizar la contraseña",
    noDataError : "No se han encontrado datos a mostrar",
    alphabetical : "alfabeticamente",
    priceDesc : "precio-descendente",
    priceAsc : "precio-ascendente",
    unexpectedError : "Error inesperado",
    unfilledDataError : "Ingrese todos los datos necesarios",
    comparePassError : "Error al comparar contraseñas",
    encryptPassError : "Error al encriptar la contraseña",
    requestError : "Error en la petición",
    userRole : "user_role",
    hotelRole : "hotel_role",
    adminRole : "admin_role",

    // Index texts
    succesfullyConnectoToDB : "Se ha conectado a la base de datos exitosamente",
    serverPort : "El servidor esta corriendo en el puerto 3000",
    connectToDBError : "Error al conectar con la base de datos",
    defaultAdminName : "Erick Bran",
    defaultAdminPass : "12345",
    defaultAdminRole : "admin_role",
    defaultAdminUsername : "ebran",
    defaultAdminEmail : "ebran@gmail.com",

    // Authenticated texts
    requestHeadersError : "Petición sin cabeceras de autorización.",
    expiredToken : "Token expirado.",
    invalidToken : "Token invalido.",

    // Hotel Controller texts
    saveHotelError : "Error al guardar el hotel",
    succesfullyHotelCreated : "Hotel creado exitosamente",
    notSavedHotel : "Se ha producido un error, hotel no guardado",
    datesRangeError : "El rango de fechas ingresado es incorrecto",
    incorrectHotelDataError : "Datos del hotel incorrectos",
    notFindHotelToDeleteError : "No se ha encontrado el hotel a eliminar",
    notFindHotelToUpdateError : "No se ha encontrado el hotel a actualizar",
    notFindHotelDateAndQualificationError : "No se han encontrado hoteles en la fecha o con la calificación ingresada",
    enterDataAndQualificationError : "Debe de ingresar una fecha o calificación a buscar",
    invalidOptionError : "Debe de ingresar una opción valida para ordenar los datos",

    // User Controller texts
    saveuserError : "Error al guardar usuario",
    userCreated : "Usuario Creado",
    userMS: "USER",
    notSavedUser : "Se ha producido un error, usuario no guardado",
    incorrectUserDataError : "Datos de usuario incorrectos",
    cantUpdateRole : "El campo role no puede ser actualizado",
    notFindUserToUpdateError : "No se ha encontrado el usuario a actualizar",
    notFindUserToDeleteError : "No se ha encontrado el usuario a eliminar",
    invalidRoleError : "Rol invalido, por favor ingrese un rol valido: user_role, hotel_role",
    updateUserError : "Error al actualizar usuario",
    notFindUserError : "Usuario no encontrado",
    comparePassError : "Error al comparar contraseñas",
    cantAssignRoleError : "El campo rol no puede ser asignado",
});