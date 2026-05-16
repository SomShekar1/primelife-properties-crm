// Load clients from localStorage
let clients =
    JSON.parse(localStorage.getItem("clients")) || [];
    let editIndex = -1;


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

        /// Check edit mode
        if (editIndex === -1) {

            // Add new client
            clients.push(client);

        } else {

            // Update existing client
            clients[editIndex] = client;

            // Reset edit mode
            editIndex = -1;

        }

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
                        onclick="matchProperties(${index})"
                        class="match-btn"
                    >
                        Match
                    </button>

                    <button
                        onclick="editClient(${index})"
                        class="edit-btn"
                    >
                        Edit
                    </button>

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

// Edit Client
function editClient(index) {

    const client = clients[index];

    // Fill form
    document.getElementById("clientName").value =
        client.name;

    document.getElementById("clientPhone").value =
        client.phone;

    document.getElementById("clientBudget").value =
        client.budget;

    document.getElementById("clientLocation").value =
        client.location;

    document.getElementById("clientRequirement").value =
        client.requirement;

    document.getElementById("clientRemarks").value =
        client.remarks;

    // Store edit index
    editIndex = index;

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


// ==========================
// PROPERTY MANAGEMENT
// ==========================

// Load properties
let properties =
    JSON.parse(localStorage.getItem("properties")) || [];

let propertyEditIndex = -1;

// Display existing properties
displayProperties();


// Property Form Submit
document
    .getElementById("propertyForm")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        // Get values
        const propertyId =
            document.getElementById("propertyId").value;

        const ownerName =
            document.getElementById("ownerName").value;

        const location =
            document.getElementById("propertyLocation").value;

        const price =
            document.getElementById("propertyPrice").value;

        const type =
            document.getElementById("propertyType").value;

        const status =
            document.getElementById("propertyStatus").value;

        const remarks =
            document.getElementById("propertyRemarks").value;

        // Create object
        const property = {
            propertyId,
            ownerName,
            location,
            price,
            type,
            status,
            remarks
        };

        // Add or update
        if (propertyEditIndex === -1) {

            properties.push(property);

        } else {

            properties[propertyEditIndex] = property;

            propertyEditIndex = -1;

        }

        // Save
        saveProperties();

        // Display
        displayProperties();

        // Reset form
        document.getElementById("propertyForm").reset();

    });


// Display Properties
function displayProperties() {

    const tableBody =
        document.getElementById("propertyTableBody");

    tableBody.innerHTML = "";

    properties.forEach(function (property, index) {

        const row = `
            <tr>

                <td>${property.propertyId}</td>

                <td>${property.ownerName}</td>

                <td>${property.location}</td>

                <td>${property.price}</td>

                <td>${property.type}</td>

                <td>${property.status}</td>

                <td>${property.remarks}</td>

                <td>

                    <button
                        onclick="editProperty(${index})"
                        class="edit-btn"
                    >
                        Edit
                    </button>

                    <button
                        onclick="deleteProperty(${index})"
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


// Delete Property
function deleteProperty(index) {

    properties.splice(index, 1);

    saveProperties();

    displayProperties();

}


// Edit Property
function editProperty(index) {

    const property = properties[index];

    document.getElementById("propertyId").value =
        property.propertyId;

    document.getElementById("ownerName").value =
        property.ownerName;

    document.getElementById("propertyLocation").value =
        property.location;

    document.getElementById("propertyPrice").value =
        property.price;

    document.getElementById("propertyType").value =
        property.type;

    document.getElementById("propertyStatus").value =
        property.status;

    document.getElementById("propertyRemarks").value =
        property.remarks;

    propertyEditIndex = index;

}


// Save Properties
function saveProperties() {

    localStorage.setItem(
        "properties",
        JSON.stringify(properties)
    );

}

// Show Client Section
function showClients() {

    document.getElementById("clientSection")
        .style.display = "block";

    document.getElementById("propertySection")
        .style.display = "none";

}


// Show Property Section
function showProperties() {

    document.getElementById("clientSection")
        .style.display = "none";

    document.getElementById("propertySection")
        .style.display = "block";

}

// Match Properties
function matchProperties(clientIndex) {

    const client = clients[clientIndex];

    // Convert budget text to number
    const clientBudget =
        parseInt(client.budget);

    // Find matching properties
    const matches = properties.filter(function (property) {

        const propertyPrice =
            parseInt(property.price);

        return (

            property.type === client.requirement &&

            property.location.toLowerCase() ===
            client.location.toLowerCase() &&

            propertyPrice <= clientBudget &&

            property.status === "Available"

        );

    });

    // No matches
    if (matches.length === 0) {

        alert("No matching properties found.");

        return;

    }

    // Create match result text
    let result = "Matching Properties:\n\n";

    matches.forEach(function (property) {

        result +=
`
Property ID: ${property.propertyId}
Type: ${property.type}
Location: ${property.location}
Price: ${property.price}
Owner: ${property.ownerName}

`;

    });

    alert(result);

}