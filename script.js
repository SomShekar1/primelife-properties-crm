// Client Array
let clients = [];

// Form Submit
document
    .getElementById("clientForm")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        // Get input values
        const name = document.getElementById("clientName").value;

        const phone = document.getElementById("clientPhone").value;

        const budget = document.getElementById("clientBudget").value;

        const location = document.getElementById("clientLocation").value;

        const requirement =
            document.getElementById("clientRequirement").value;

        // Create client object
        const client = {
            name,
            phone,
            budget,
            location,
            requirement
        };

        // Push into array
        clients.push(client);

        // Update table
        displayClients();

        // Reset form
        document.getElementById("clientForm").reset();

    });


// Display Clients
function displayClients() {

    const tableBody =
        document.getElementById("clientTableBody");

    // Clear old rows
    tableBody.innerHTML = "";

    // Loop through clients
    clients.forEach(function (client) {

        const row = `
            <tr>
                <td>${client.name}</td>
                <td>${client.phone}</td>
                <td>${client.budget}</td>
                <td>${client.location}</td>
                <td>${client.requirement}</td>
            </tr>
        `;

        tableBody.innerHTML += row;

    });

}