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

document.addEventListener("DOMContentLoaded", () => {

    user = localStorage.getItem("username");
    if (!user && location.href != url_front && !location.href.includes("Auth")) {
        window.location.href = url_front;
    }

});


function alertWarning(title) {
    Swal.fire({ title: title, icon: "warning" });
}

function alertSuccess(title) {
    Swal.fire({ title: title, icon: "success" });
}

function alertError(title) {
    Swal.fire({ title: title, icon: "error" });
}

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("employeeId");
    window.location.href = url_front;
}

function addLog(description) {
    // Obtener los valores de los campos
    var employeeId = localStorage.getItem("employeeId");
    
    // Si todas las validaciones pasan, enviar los datos al servidor
    var formData = {
        logId:0,
        employeeId: employeeId,
        logDescription: description,
        dateTime: new Date(),        
        employee: null
    };


    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: base_url + '/Log',
        data: JSON.stringify(formData),
        dataType: "json",
        success: function (data) {

        },
        error: function (error) {
            console.log(error);
        }
    });
}