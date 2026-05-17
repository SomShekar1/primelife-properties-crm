// ==========================
// CLIENT MANAGEMENT
// ==========================

// Load clients from localStorage
let clients =
    JSON.parse(localStorage.getItem("clients")) || [];

// Edit tracking
let editIndex = -1;


// ==========================
// PROPERTY MANAGEMENT
// ==========================

// Load properties
let properties =
    JSON.parse(localStorage.getItem("properties")) || [];

let propertyEditIndex = -1;


// ==========================
// INITIAL LOAD
// ==========================

displayClients();
displayProperties();
updateDashboard();


// ==========================
// CLIENT FORM SUBMIT
// ==========================

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

        // Add or update
        if (editIndex === -1) {

            clients.push(client);

        } else {

            clients[editIndex] = client;

            editIndex = -1;

        }

        // Save
        saveClients();

        // Display
        displayClients();

        // Update dashboard
        updateDashboard();

        // Reset form
        document.getElementById("clientForm").reset();

    });


// ==========================
// DISPLAY CLIENTS
// ==========================

function displayClients(filteredClients = clients) {

    const tableBody =
        document.getElementById("clientTableBody");

    tableBody.innerHTML = "";

    filteredClients.forEach(function (client, index) {

        // Row color logic
        let rowClass = "";

        const remarks =
            client.remarks.toLowerCase();

        if (remarks.includes("not interested")) {

            rowClass = "not-interested-row";

        }
        else if (remarks.includes("interested")) {

            rowClass = "interested-row";

        }
        else if (remarks.includes("follow")) {

            rowClass = "followup-row";

        }
        else if (remarks.includes("site")) {

            rowClass = "sitevisit-row";

        }

        const row = `
            <tr class="${rowClass}">

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


// ==========================
// DELETE CLIENT
// ==========================

function deleteClient(index) {

    clients.splice(index, 1);

    saveClients();

    displayClients();

    updateDashboard();

}


// ==========================
// EDIT CLIENT
// ==========================

function editClient(index) {

    const client = clients[index];

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

    editIndex = index;

}


// ==========================
// SAVE CLIENTS
// ==========================

function saveClients() {

    localStorage.setItem(
        "clients",
        JSON.stringify(clients)
    );

}


// ==========================
// SEARCH CLIENTS
// ==========================

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
// PROPERTY FORM SUBMIT
// ==========================

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

        // Update dashboard
        updateDashboard();

        // Reset form
        document.getElementById("propertyForm").reset();

    });


// ==========================
// DISPLAY PROPERTIES
// ==========================

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


// ==========================
// DELETE PROPERTY
// ==========================

function deleteProperty(index) {

    properties.splice(index, 1);

    saveProperties();

    displayProperties();

    updateDashboard();

}


// ==========================
// EDIT PROPERTY
// ==========================

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


// ==========================
// SAVE PROPERTIES
// ==========================

function saveProperties() {

    localStorage.setItem(
        "properties",
        JSON.stringify(properties)
    );

}


// ==========================
// MATCH PROPERTIES
// ==========================

function matchProperties(clientIndex) {

    const client = clients[clientIndex];

    const clientBudget =
        parseInt(client.budget);

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

    if (matches.length === 0) {

        alert("No matching properties found.");

        return;

    }

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


// ==========================
// DASHBOARD ANALYTICS
// ==========================

function updateDashboard() {

    // Total Clients
    document.getElementById("totalClients")
        .textContent = clients.length;

    // Total Properties
    document.getElementById("totalProperties")
        .textContent = properties.length;

    // Interested Clients
    const interestedClients = clients.filter(function (client) {

        return client.remarks
            .toLowerCase()
            .includes("interested");

    });

    document.getElementById("interestedClients")
        .textContent = interestedClients.length;

    // Available Properties
    const availableProperties = properties.filter(function (property) {

        return property.status === "Available";

    });

    document.getElementById("availableProperties")
        .textContent = availableProperties.length;

}


// ==========================
// DASHBOARD NAVIGATION
// ==========================

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