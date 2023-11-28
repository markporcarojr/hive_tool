document.getElementById('allInspections').addEventListener('click', showAllHives);


// Universal Functions
function getLocation() {
    if ("geolocation" in navigator) {
        // Prompt the user for location access
        navigator.geolocation.getCurrentPosition(
            // Success callback
            function (position) {
                // Access the user's latitude and longitude from the position object
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Now you can use the latitude and longitude to fetch weather information
                // You might want to make an API call to a weather service here

                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            },
            // Error callback
            function (error) {
                // Handle errors (e.g., user denied access or there was an issue)
                console.error("Error getting location:", error.message);
            }
        );
    } else {
        // Geolocation is not supported
        console.error("Geolocation is not supported by your browser");
    }
}

function updateDateTime() {
    const now = new Date();

    const optionsDate = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const optionsTime = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    };

    const content = `${now.toLocaleDateString("en-US", optionsDate)}`;

    document.querySelector("#datetime").innerHTML = content;
}

// *************************** PAGE FUNCTIONS ********************************

// Home Page


// Inspection page 
function filterByHiveNumber() {
    // Prompt the user to enter a hive number
    // var hiveNumber = prompt("Enter Hive Number:");
    let hiveNumber = document.getElementById('hiveNumberInput').value;

    // Get all hive card elements
    const hiveCards = document.querySelectorAll('.col');


    // Check if the user entered a value
    if (hiveNumber !== '') {
        // Convert the input to a number
        hiveNumber = parseInt(hiveNumber);


        // Loop through each hive card
        hiveCards.forEach((hiveCard) => {

            // Get the hive number from the data attribute
            const cardHiveNumber = parseInt(hiveCard.getAttribute('data-hive-number'));

            // Check if the hive number matches the entered value
            if (cardHiveNumber === hiveNumber) {
                // Show the matching hive card
                hiveCard.style.display = 'block';
            } else {
                // Hide non-matching hive cards
                hiveCard.style.display = 'none';
            }
        });
    } else {
        hiveCards.forEach(hiveCard => hiveCard.style.display = 'block');
    }
}

function showAllHives() {

    const hiveCards = document.querySelectorAll('.col');
    hiveCards.forEach(hiveCard => hiveCard.style.display = 'block');

};