const weatherform = document.querySelector(".weatherform");
const cityip = document.querySelector(".cityip");
const card = document.querySelector(".card");
const apikey = "2fd3bbee593e60fac321a963b461ab96";

weatherform.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityip.value;
    if (city) {
        try {
            const weatherdata = await getweatherdata(city);
            displayweatherinfo(weatherdata);
        } catch (error) {
            console.log(error);
            displayError(error.message);
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getweatherdata(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiurl);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    return data;
}

function displayweatherinfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    card.textContent = "";
    card.style.display = "flex";

    const citydisp = document.createElement("h1");
    const tempdisp = document.createElement("p");
    const humiddisp = document.createElement("p");
    const descdisp = document.createElement("p");
    const weatem = document.createElement("p");

    citydisp.textContent = city;
    tempdisp.textContent = `${(temp - 273.15).toFixed(1)} C`;
    humiddisp.textContent = `Humidity: ${humidity}%`;
    descdisp.textContent = description.charAt(0).toUpperCase() + description.slice(1);
    weatem.textContent = getWeatherEmoji(id);

    citydisp.classList.add("citydisp");
    tempdisp.classList.add("tempdisp");
    humiddisp.classList.add("humiddisp");
    descdisp.classList.add("descdisp");
    weatem.classList.add("weatem");

    card.appendChild(citydisp);
    card.appendChild(tempdisp);
    card.appendChild(humiddisp);
    card.appendChild(descdisp);
    card.appendChild(weatem);
}

function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "🌩️"; 
        case (weatherId >= 300 && weatherId < 400):
            return "🌦️"; 
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️"; 
        case (weatherId >= 600 && weatherId < 700):
            return "❄️"; 
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️"; 
        case (weatherId === 800):
            return "☀️"; 
        case (weatherId >= 801 && weatherId <= 804):
            return "🌥️"; 
        default:
            return "💀"; 
    }
}

function displayError(message) {
    const errordisp = document.createElement("p");
    errordisp.textContent = message;
    errordisp.classList.add("errordisp");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errordisp);
}
