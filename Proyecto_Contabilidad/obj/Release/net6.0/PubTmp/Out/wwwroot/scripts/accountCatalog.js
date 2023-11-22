document.addEventListener("DOMContentLoaded", () => {
    loadDataFromAPI()
});

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
                                                        <a class="dropdown-item" data-toggle="modal" data-target="#modal-edit-contact" href="#">Editar</a>
                                                        <a class="dropdown-item" href="#">Eliminar</a>
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

    //let table = new DataTable('#productsTable');
    //console.log(table)
}


function addAccount() {
    // Obtener los valores de los campos
    var AccountId = $("#accountId").val();
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
            // Procesar la respuesta si es necesario
            // Puedes mostrar un mensaje de �xito o actualizar la lista de clientes, por ejemplo
            $("#accountId").val("");
            $("#nameAccount").val("");
            $("#accountCode").val("");
            $("#typeAccount").val("");
            $("#conversion").val("");
            location.reload();
        },
        error: function (error) {
            // Manejar errores si es necesario
            console.log(error);
        }
    });
}
