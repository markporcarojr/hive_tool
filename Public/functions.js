document.getElementById('allInspections').addEventListener('click', showAllHives);
require('dotenv').config();


// Universal Functions

// Slider function

function initSlider() {
    const slider = document.getElementById('hiveStrength');
    const sliderValue = document.getElementById('sliderValue');
    slider.addEventListener('input', updateSlider);

    function updateSlider() {
        const value = slider.value;
        sliderValue.textContent = value;
    }
}



// Weather Functions

async function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

async function checkWeather(apiKey) {
    try {
        const position = await getCurrentLocation();
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const apiUrl =
            "https://api.openweathermap.org/data/2.5/weather?units=imperial";

        const response = await fetch(
            `${apiUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        const data = await response.json();

        console.log(data);
        document.querySelector("#city").innerHTML = data.name;
        document.querySelector("#temp").innerHTML =
            Math.round(data.main.temp) + "℉";

        // 🌥️ 🌤️ 🌤️
        const clouds = document.querySelector("#clouds");
        if (data.weather[0].main == "Clouds") {
            clouds.src = "https://openweathermap.org/img/wn/04d@2x.png";
        } else if (data.weather[0].main == "Clear") {
            clouds.src = "https://openweathermap.org/img/wn/01d@2x.png";
        } else if (data.weather[0].main == "Rain") {
            clouds.src = "https://openweathermap.org/img/wn/09d@2x.png";
        } else if (data.weather[0].main == "Drizzle") {
            clouds.src = "https://openweathermap.org/img/wn/10d@2x.png";
        } else if (data.weather[0].main == "Mist") {
            clouds.src = "https://openweathermap.org/img/wn/50d@2x.png";
        } else if (data.weather[0].main == "Thunderstorm") {
            clouds.src = "https://openweathermap.org/img/wn/11d@2x.png";
        } else if (data.weather[0].main == "Snow") {
            clouds.src = "https://openweathermap.org/img/wn/13d@2x.png";
        }
    } catch (error) {
        console.error("Error getting location or weather data:", error);
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
// HARVEST PAGE

function updateIcons() {
    const iconContainers = document.querySelectorAll(".icon");

    iconContainers.forEach((iconContainer) => {
        const harvestType = iconContainer.getAttribute("data-harvest-type");

        // Add the appropriate class based on harvestType
        if (harvestType === "Honey") {
            iconContainer.classList.add("svg-honey");
        } else {
            iconContainer.classList.add("svg-wax");
        }
    });
};
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