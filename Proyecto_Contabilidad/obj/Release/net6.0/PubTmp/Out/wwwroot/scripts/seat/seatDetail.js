//#region Variables
var route = location.href;
var seat_id = route.split("/")[5]
var seatDetail_id = route.split("/")[6]
//#endregion

document.addEventListener("DOMContentLoaded", () => {
    getAccountCatalog()

});

function addDetail() {
    // Obtener los valores de los campos
    var accountId = $("#accountId").val();
    var amount = $("#amount").val();
    var description = $("#description").val();

    // Verificar si alg�n campo est� vac�o
    if (accountId === "" || amount === "" || description === "") {
        alertWarning("Todos los campos son obligatorios. Por favor, complete todos los campos.");
        return; // Detener la ejecuci�n si hay campos vac�os
    }

    // Si todas las validaciones pasan, enviar los datos al servidor
    var formData = {
        id: 0,
        seat_id: seat_id,
        account_id: accountId,
        amount: amount,
        description: description,
        active: true
    };


    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: base_url + '/SeatDetail',
        data: JSON.stringify(formData),
        dataType: "json",
        success: function (data) {

            $('#accountId').val(null).trigger('change');
            $("#amount").val("");
            $("#description").val("");

            addLog("CREA EL DETALLE DE ASIENTO CON ID: " + data.id)
        },
        error: function (error) {
            // Manejar errores si es necesario
            console.log(error);
        }
    });
}

function getAccountCatalog() {

    $(".account_select").select2({
        ajax: {
            type: "GET",
            url: base_url + "/Account/Select",
            cache: false,
        }
    });
}

function saveDetail() {

    // Obtener los valores de los campos
    var accountId = $("#accountId").val();
    var amount = $("#amount").val();
    var description = $("#description").val();
    var title = ""
    
    if (accountId == null && amount == "" && description == "") {
        title = `&#191;Desea continuar?`
    }
    else {
        title = `Aun no ha guardado los datos, &#191;Desea continuar?`
    }

    Swal.fire({
        title: title,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(base_url + '/SeatDetail/GetBySeat/' + seat_id)
                .then(response => response.json())
                .then(data => {

                    if (data.length > 1) {
                        addLog("GUARDA LOS DETALLES DE ASIENTO, DEL ASIENTO: " + seat_id)
                        window.location.href = url_front + "Seat/Details/" + seat_id;
                    }
                    else {
                        alertWarning("Debe tener 2 asientos como minimo.")
                    }

                })
                .catch(error => {
                    console.error('Error al cargar datos desde la API:', error);
                });
        }
    });


}
