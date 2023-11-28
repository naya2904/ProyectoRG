//#region Variables
var url_front = 'https://proyectorg.azurewebsites.net/'
var base_url = 'https://proyectorg-api.azurewebsites.net/api'

var currentCustomerID = 0;
var currentCustomerName = ""

var listConversion = [
    { id: 0, name: "No Convierte" },
    { id: 1, name: "De Colon a Dolar" },
    { id: 2, name: "De Dolar a Colon" }
];

var listAccountType = [
    { id: 1, name: "Activo" },
    { id: 2, name: "Gasto" },
    { id: 3, name: "Ingreso" },
    { id: 4, name: "Pasivo" },
    { id: 5, name: "Patrimonio" },
];

//#endregion


