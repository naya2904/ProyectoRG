document.addEventListener("DOMContentLoaded", () => {
    loadDataFromAPI()
});

var accountId = 0

function loadDataFromAPI() {
    fetch(base_url + '/Account')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('tableBody');

            data.forEach(item => {

                var conversion = "";

                listConversion.forEach(opc => {
                    if (item.conversion == opc.id) {
                        conversion = opc.name;
                    }
                })

                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                                            <td>${item.accountCode}</td>
                                            <td>${item.accountName}</td>
                                            <td>${item.accountType}</td>
                                            <td>${conversion}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <a class="dropdown-toggle icon-burger-mini" href="#" role="button" id="dropdownMenuLink"
                                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                                    </a>
                                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                                        <a class="dropdown-item" data-toggle="modal" data-target="#modal-edit-contact" onclick="setDataModal(${item.accountId})" href="#">Editar</a>
                                                        <a class="dropdown-item" onclick="deleteAccount(${item.accountId})" href="#">Eliminar</a>
                                                    </div>
                                                </div>
                                            </td>
                                        `;

                tableBody.appendChild(newRow);
            });
        })
        .catch(error => {
            console.error('Error al cargar datos desde la API:', error);
        });

}

function addAccount() {
    // Obtener los valores de los campos
    var AccountId = 0;
    var AccountCode = $("#accountCode").val();
    var NameAccount = $("#nameAccount").val();
    var TypeAccount = $("#typeAccount").val();
    var conversionValue = $("#conversion").val();

    // Verificar si alg�n campo est� vac�o
    if (AccountCode === "" || NameAccount === "" || TypeAccount === "" || conversionValue === "") {
        alert("Todos los campos son obligatorios. Por favor, complete todos los campos.");
        return; // Detener la ejecuci�n si hay campos vac�os
    }

    // Si todas las validaciones pasan, enviar los datos al servidor
    var formData = {
        accountId: AccountId,
        accountName: NameAccount,
        accountCode: AccountCode,
        accountType: TypeAccount,
        conversion: conversionValue
    };

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: base_url + '/Account',
        data: JSON.stringify(formData),
        dataType: "json",
        success: function (data) {
            clearDataModal()
            location.reload();
        },
        error: function (error) {
            // Manejar errores si es necesario
            console.error(error);
        }
    });
}

function setDataModal(id) {
    accountId = id;

    fetch(base_url + '/Account/' + id)
        .then(response => response.json())
        .then(data => {

            $("#accountCodeEdit").val(data.accountCode);
            $("#nameAccountEdit").val(data.accountName);
            $("#typeAccountEdit").val(data.accountType);
            $("#conversionEdit").val(data.conversion);

        })
        .catch(error => {
            console.error('Error al cargar datos desde la API:', error);
        });
}

function clearDataModal() {
    accountId = 0;
    $("#nameAccount").val("");
    $("#accountCode").val("");
    $("#typeAccount").val("");
    $("#conversion").val("");
}

function editAccount() {
    // Obtener los valores de los campos
    var AccountId = accountId;
    var AccountCode = $("#accountCodeEdit").val();
    var NameAccount = $("#nameAccountEdit").val();
    var TypeAccount = $("#typeAccountEdit").val();
    var conversionValue = $("#conversionEdit").val();

    // Verificar si alg�n campo est� vac�o
    if (AccountCode === "" || NameAccount === "" || TypeAccount === "" || conversionValue === "") {
        alert("Todos los campos son obligatorios. Por favor, complete todos los campos.");
        return; // Detener la ejecuci�n si hay campos vac�os
    }

    // Si todas las validaciones pasan, enviar los datos al servidor
    var formData = {
        accountId: AccountId,
        accountName: NameAccount,
        accountCode: AccountCode,
        accountType: TypeAccount,
        conversion: conversionValue
    };

    $.ajax({
        type: "PUT",
        contentType: "application/json",
        url: base_url + '/Account',
        data: JSON.stringify(formData),
        dataType: "json",
        success: function (data) {
            clearDataModal();
            location.reload();
        },
        error: function (error) {
            console.error(error);
        }
    });
}

function deleteAccount(id) {

    accountId = id;

    Swal.fire({
        title: "Desea eliminar el Catalogo de cuentas seleccionado?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "DELETE",
                contentType: "application/json",
                url: base_url + '/Account/' + accountId,
                dataType: "json",
                success: function (data) {
                    clearDataModal()
                    location.reload();
                },
                error: function (error) {
                    console.error(error);
                }
            });
        }
    });


}