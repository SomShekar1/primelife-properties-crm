// Load clients from localStorage
let clients =
    JSON.parse(localStorage.getItem("clients")) || [];


// Display existing clients
displayClients();


// Form Submit
document
    .getElementById("clientForm")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        // Get values
        const name =
            document.getElementById("clientName").value;

        const phone =
            document.getElementById("clientPhone").value;

        const budget =
            document.getElementById("clientBudget").value;

        const location =
            document.getElementById("clientLocation").value;

        const requirement =
            document.getElementById("clientRequirement").value;

        const remarks =
            document.getElementById("clientRemarks").value;

        // Create object
        const client = {
            name,
            phone,
            budget,
            location,
            requirement,
            remarks
        };

        // Add client
        clients.push(client);

        // Save
        saveClients();

        // Display
        displayClients();

        // Reset form
        document.getElementById("clientForm").reset();

    });


// Display Clients
function displayClients(filteredClients = clients) {

    const tableBody =
        document.getElementById("clientTableBody");

    tableBody.innerHTML = "";

    filteredClients.forEach(function (client, index) {

        const row = `
            <tr>
                <td>${client.name}</td>
                <td>${client.phone}</td>
                <td>${client.budget}</td>
                <td>${client.location}</td>
                <td>${client.requirement}</td>
                <td>${client.remarks}</td>

                <td>
                    <button
                        onclick="deleteClient(${index})"
                        class="delete-btn"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        `;

        tableBody.innerHTML += row;

    });

}


// Delete Client
function deleteClient(index) {

    // Remove from array
    clients.splice(index, 1);

    // Save updated array
    saveClients();

    // Refresh table
    displayClients();

}


// Save Clients
function saveClients() {

    localStorage.setItem(
        "clients",
        JSON.stringify(clients)
    );

}

// Search Clients
document
    .getElementById("searchInput")
    .addEventListener("keyup", function () {

        const searchValue =
            this.value.toLowerCase();

        const filteredClients = clients.filter(function (client) {

            return (

                client.name.toLowerCase().includes(searchValue) ||

                client.location.toLowerCase().includes(searchValue) ||

                client.requirement.toLowerCase().includes(searchValue) ||

                client.remarks.toLowerCase().includes(searchValue)

            );

        });

        displayClients(filteredClients);

    });