    let form = document.getElementById("formulario");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        transactionFormData = new FormData(form);

        DataObj = FormDataObj(transactionFormData);

        saveDataObj(DataObj)

        insertLista(DataObj)

        form.reset()

        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'El producto se agrego a la lista',
            showConfirmButton: false,
            timer: 1500
        })

    })

    document.addEventListener("DOMContentLoaded", function (event) {
        DataObjArr = JSON.parse(localStorage.getItem("Productos"))
        DataObjArr.forEach(
            function (arrayElement) {
                insertLista(arrayElement)
            }
        )
    });

    function crearId() {
        let lastId = localStorage.getItem("lastId") || "-1";
        let newTransId = JSON.parse(lastId) + 1;
        localStorage.setItem("lastId", JSON.stringify(newTransId))
        return newTransId;
    }

    function FormDataObj(transactionFormData) {
        nombre = transactionFormData.get("nombre");
        stock = transactionFormData.get("stock");
        precio = transactionFormData.get("precio");
        transId = crearId();
        return {
            "ID": transId,
            "NOMBRE": nombre,
            "STOCK": stock,
            "PRECIO": precio,
        }
    }

    function insertLista(DataObj) {
        lista = document.getElementById("lista");

        NewRow = lista.insertRow(-1);
        NewRow.setAttribute("ID", DataObj["ID"])

        NewCell = NewRow.insertCell(0);
        NewCell.textContent = DataObj["ID"];

        NewCell = NewRow.insertCell(1);
        NewCell.textContent = DataObj["NOMBRE"];;

        NewCell = NewRow.insertCell(2);
        NewCell.textContent = DataObj["STOCK"];

        NewCell = NewRow.insertCell(3);
        NewCell.textContent = DataObj["PRECIO"];

        DeleteCell = NewRow.insertCell(4);
        DeleteButton = document.createElement("button");
        DeleteButton.textContent = "Eliminar"
        DeleteCell.appendChild(DeleteButton)

        ChangeCell = NewRow.insertCell(5);
        ChangeButton = document.createElement("button");
        ChangeButton.textContent = "Cambiar"
        ChangeCell.appendChild(ChangeButton)

        DeleteButton.addEventListener("click", (event) => {
            selectRow = event.target.parentNode.parentNode;
            selectIdRow = selectRow.getAttribute("ID");

            Swal.fire({
                title: 'Desea eliminar el producto?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, deseo eliminarlo'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'El producto fue eliminado',
                        '...',
                        'success'
                    )
                    selectRow.remove();
                    deleteObj(selectIdRow);
                } else location.reload()
            })
        })

        ChangeButton.addEventListener("click", (event) => {
            selectRow = event.target.parentNode.parentNode;
            selectIdRow = selectRow.getAttribute("ID");
            selectRow.remove();

            DataObjArr = JSON.parse(localStorage.getItem("Productos"))

            Swal.fire({
                    title: 'Desea cambiar los datos sobre este producto?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, deseo hacer un cambio'
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Eliminado!',
                            'El producto fue eliminado, ingrese sus cambios y vuelva a agregarlo.',
                            'success'
                        )

                        let nuevoNombre = DataObj["NOMBRE"];
                        let nuevoStock = DataObj["STOCK"];
                        let nuevoPrecio = DataObj["PRECIO"];

                        document.getElementById("nombre").value = nuevoNombre;
                        document.getElementById("stock").value = nuevoStock;
                        document.getElementById("precio").value = nuevoPrecio;

                        deleteObj(selectIdRow);
                    } else location.reload()
                })
        })
    }

    function deleteObj(transId) {
        DataObjArr = JSON.parse(localStorage.getItem("Productos"))

        filterObjArr = DataObjArr.findIndex(element => element.transId === transId);

        DataObjArr.splice(filterObjArr, 1)

        listaprodJSON = JSON.stringify(DataObjArr);
        localStorage.setItem("Productos", listaprodJSON)
    }

    function saveDataObj(DataObj) {

        listaprod = JSON.parse(localStorage.getItem("Productos")) || [];
        listaprod.push(DataObj);

        let listaprodJSON = JSON.stringify(listaprod);
        localStorage.setItem("Productos", listaprodJSON)
    }