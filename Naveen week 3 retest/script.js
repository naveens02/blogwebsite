document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("employee-table");
    const nameInput = document.getElementById("employee-name");
    const addressInput = document.getElementById("employee-address");
    const salaryInput = document.getElementById("employee-salary");
    const showButton = document.getElementById("show-form-button");
    const addButton = document.getElementById("add-employee");
    let editingRowId = null;
    const data = JSON.parse(localStorage.getItem("employeeData")) || [];
    populateTable(data);

    showButton.addEventListener("click", () => {
        document.querySelector(".employee-form").style.display = "block";
        showButton.style.display = "none";
    });

    addButton.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const address = addressInput.value.trim();
        const salary = salaryInput.value.trim();
        const namePattern = /\d/;
        if (name === "" || address === "" || salary === "") {
            alert("Please fill in all fields.");
            return;
        }
        if (namePattern.test(name)) {
            alert("Name cannot contain numbers.");
            return;
        }
        if (editingRowId !== null) {
            const row = document.getElementById(editingRowId);
            row.cells[1].textContent = name;
            row.cells[2].textContent = address;
            row.cells[3].textContent = salary;
            editingRowId = null;
            nameInput.value = "";
            addressInput.value = "";
            salaryInput.value = "";
            addButton.textContent = "Submit";
        } else {
            const newRow = document.createElement("tr");
            const rowId = `emp-${Date.now()}`;
            newRow.id = rowId;
            newRow.innerHTML = `
                <td>${table.tBodies[0].rows.length + 1}</td>
                <td>${name}</td>
                <td>${address}</td>
                <td>${salary}</td>
                <td>
                    <button class="edit-button" data-row-id="${rowId}">Edit</button>
                    <button class="delete-button">Delete</button>
                </td>
            `;
            const tbody = table.getElementsByTagName("tbody")[0];
            tbody.appendChild(newRow);
            nameInput.value = "";
            addressInput.value = "";
            salaryInput.value = "";
            data.push({
                id: rowId,
                name,
                address,
                salary,
            });
            localStorage.setItem("employeeData", JSON.stringify(data));
        }
    });

    table.addEventListener("click", (event) => {
        if (event.target.classList.contains("edit-button")) {
            const rowId = event.target.getAttribute("data-row-id");
            editingRowId = rowId;
            const row = document.getElementById(rowId);
            const cells = row.cells;
            nameInput.value = cells[1].textContent;
            addressInput.value = cells[2].textContent;
            salaryInput.value = cells[3].textContent;
            addButton.textContent = "Edit";
        } else if (event.target.classList.contains("delete-button")) {
            const row = event.target.closest("tr");
            row.remove();
            const rows = table.tBodies[0].rows;
            for (let i = 0; i < rows.length; i++) {
                rows[i].cells[0].textContent = i + 1;
            }
            const rowId = row.id;
            const updatedData = data.filter((employee) => employee.id !== rowId);
            localStorage.setItem("employeeData", JSON.stringify(updatedData));
        }
    });

    function populateTable(data) {
        const tbody = table.getElementsByTagName("tbody")[0];
        tbody.innerHTML = "";
        data.forEach((employee, index) => {
            const newRow = document.createElement("tr");
            newRow.id = employee.id;
            newRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${employee.name}</td>
                <td>${employee.address}</td>
                <td>${employee.salary}</td>
                <td>
                    <button class="edit-button" data-row-id="${employee.id}">Edit</button>
                    <button class="delete-button">Delete</button>
                </td>
            `;
            tbody.appendChild(newRow);
        });
    }
});
