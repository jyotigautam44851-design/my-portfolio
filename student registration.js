

const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const searchInput = document.getElementById("search");

// Register Student
studentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.getElementById("studentId").value.trim();
    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const gender = document.getElementById("gender").value;
    const course = document.getElementById("course").value;

    if (!id || !name || !email || !phone || !gender || !course) {
        alert("Please fill in all fields!");
        return;
    }

    // Check duplicate Student ID
    const existingRows = studentTable.querySelectorAll("tr");

    for (const row of existingRows) {
        if (row.cells[0].textContent === id) {
            alert("Student ID already exists!");
            return;
        }
    }

    // Add student record
    const row = studentTable.insertRow();

    [id, name, email, phone, gender, course].forEach(function (value) {
        const cell = row.insertCell();
        cell.textContent = value;
    });

    // Delete button
    const actionCell = row.insertCell();
    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";
    deleteButton.type = "button";

    deleteButton.addEventListener("click", function () {
        row.remove();
    });

    actionCell.appendChild(deleteButton);

    studentForm.reset();

    // Apply current search after registration
    searchInput.dispatchEvent(new Event("input"));

    alert("Student registered successfully!");
});


// Search Student Records
searchInput.addEventListener("input", function () {
    const searchValue = this.value.toLowerCase().trim();
    const rows = studentTable.querySelectorAll("tr");

    rows.forEach(function (row) {
        const rowText = row.textContent.toLowerCase();

        row.style.display = rowText.includes(searchValue)
            ? ""
            : "none";
    });
});
