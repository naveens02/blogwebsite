document.addEventListener("DOMContentLoaded", () => {
    const carTable = document.getElementById("car-table");
    const producerInput = document.getElementById("car-producer");
    const modelInput = document.getElementById("car-model");
    const colorInput = document.getElementById("car-color");
    const priceInput = document.getElementById("car-price");
    const addCarButton = document.getElementById("add-car");
    let editingRowId = null; 

    addCarButton.addEventListener("click", () => {
        const producer = producerInput.value.trim();
        const model = modelInput.value.trim();
        const color = colorInput.value.trim();
        const price = priceInput.value.trim();

        if (producer === "" || model === "" || color === "" || price === "") {
            alert("Please fill in all fields.");
            return;
        }
        if (editingRowId !== null) { 
            const row = document.getElementById(editingRowId);
            row.cells[0].textContent = producer;
            row.cells[1].textContent = model;
            row.cells[2].textContent = color;
            row.cells[3].textContent = price;
            editingRowId = null;
            producerInput.value = "";
            modelInput.value = "";
            colorInput.value = "";
            priceInput.value = "";
            addCarButton.textContent = "Add Car";
        } else {
            const newRow = document.createElement("tr");
            const rowId = `car-${Date.now()}`;
            newRow.id = rowId;
            newRow.innerHTML = `
                <td>${producer}</td>
                <td>${model}</td>
                <td>${color}</td>
                <td>${price}</td>
                <td>
                    <button class="delete-button">X</button>
                    <button class="edit-button" data-row-id="${rowId}">Edit</button>
                   
                </td>
            `;

            const tableBody = carTable.getElementsByTagName("tbody")[0];
            tableBody.appendChild(newRow);
            producerInput.value = "";
            modelInput.value = "";
            colorInput.value = "";
            priceInput.value = "";
        }
    });

    carTable.addEventListener("click", (event) => {
        if (event.target.classList.contains("edit-button")) {
            const rowId = event.target.getAttribute("data-row-id");
            editingRowId = rowId;
            const row = document.getElementById(rowId);
            const cells = row.cells;
            producerInput.value = cells[0].textContent;
            modelInput.value = cells[1].textContent;
            colorInput.value = cells[2].textContent;
            priceInput.value = cells[3].textContent;
            addCarButton.textContent = "Edit Car";
        } else if (event.target.classList.contains("delete-button")) {
            const row = event.target.closest("tr");
            row.remove();
        }
    });
});
