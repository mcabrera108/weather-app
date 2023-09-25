// All methods that interact with the UI go here
// Change Background Function goes here
import fetchWeatherData from "./weatherApi";

let inputValue = "Seattle";

const toggleTemperatureType = (weatherData) => {
    const tempContainer = document.querySelector(".temperature-container");
    const cfContainer = document.querySelector(".cf-container");
    const degreeContainer = document.querySelector(".degree-container");
    const humidityContainer  = document.querySelector(".humidity-percent-container");
    const windSpeedContainer = document.querySelector(".wind-speed");

    weatherData.then((result) => {
        if(tempContainer.textContent === `${result.current.temp_c  } \u00B0C`)
        {
            tempContainer.textContent = `${result.current.temp_f  } \u00B0F`;
            degreeContainer.textContent = `${result.current.feelslike_f} \u00B0F`
            humidityContainer.textContent = `${result.current.humidity} %`;
            windSpeedContainer.textContent = `${result.current.wind_mph} mp/h`; 
            cfContainer.textContent = "Display \u00B0C"
        }else
        {
            tempContainer.textContent = `${result.current.temp_c  } \u00B0C`;
            degreeContainer.textContent = `${result.current.feelslike_c} \u00B0C`
            humidityContainer.textContent = `${result.current.humidity} %`;
            windSpeedContainer.textContent = `${result.current.wind_kph} km/h`; 
            cfContainer.textContent = "Display \u00B0F"
        }
    })
    .catch((err) => {
        console.log(err);
    })
}
const removeChildren = () => {
    const iconContainer = document.querySelector(".condition-icon-container");
    while(iconContainer.firstChild)
    {
        iconContainer.removeChild(iconContainer.firstChild);
    }
}
const displayWeatherIcon = (result) => {
    const iconContainer = document.querySelector(".condition-icon-container");
    const weatherIcon = document.createElement("i");

    if(result.current.condition.text.includes("Sun"))
    {
        removeChildren();
        weatherIcon.classList.add("fa","fa-sun-o", "fa-4x");
        iconContainer.appendChild(weatherIcon);
    }
    else if(result.current.condition.text.includes("cloud") || result.current.condition.text.includes("Rain") || result.current.condition.text.includes("Overcast") || result.current.condition.text.includes("rain"))
    {
        removeChildren();
        weatherIcon.classList.add("fa", "fa-cloud", "fa-4x");
        iconContainer.appendChild(weatherIcon);
    }
    else if(result.current.condition.text.includes("snow") || result.current.condition.text.includes("Blizzard"))
    {
        removeChildren();
        weatherIcon.classList.add("fa", "fa-snowflake-o", "fa-4x");
        iconContainer.appendChild(weatherIcon);
    }
    else {
        console.log("Default Icon");
        removeChildren();
        weatherIcon.classList.add("fa","fa-minus", "fa-4x");
        iconContainer.appendChild(weatherIcon);
    }
}
const displayTemperatureData = (weatherData) =>
{
    const temperatureContainer = document.querySelector(".temperature-container");
    const feelContainer  = document.querySelector(".feel-container");
    const humidityContainer  = document.querySelector(".humidity-percent-container");
    const windSpeedContainer = document.querySelector(".wind-speed");
    const degreeContainer = document.querySelector(".degree-container");

    weatherData.then((result) => {
        degreeContainer.textContent = `${result.current.feelslike_f} \u00B0F`;
        humidityContainer.textContent = `${result.current.humidity} %`; 
        windSpeedContainer.textContent = `${result.current.wind_mph} mp/h`;

    }).catch((err) => {
        console.log(`Couldn't display location data.Error message: ${ err}`);
    });
}
const displayLocationData = (weatherData) => {
    // const locationContainer = document.querySelector(".location-container");
    const conditionContainer  = document.querySelector(".condition-container");
    const regionContainer = document.querySelector(".region-container");
    const dateContainer = document.querySelector(".date-container");
    const tempContainer = document.querySelector(".temperature-container");
    const cfContainer = document.querySelector(".cf-container");
    const invalidContainer = document.querySelector(".invalid-container");

    weatherData.then((result) => { // We unwrap the promise with a then statement 
        console.log(result);
        conditionContainer.textContent = result.current.condition.text;

        if(result.location.region.includes(result.location.name))
        {
            regionContainer.textContent = `${result.location.name  },${ result.location.country}`;
        }
        else
        {
            regionContainer.textContent = `${result.location.name  },${ result.location.region}`;
        }
        dateContainer.textContent = result.location.localtime;
        tempContainer.textContent = `${result.current.temp_f  }  \u00B0F`;
        cfContainer.textContent = "Display \u00B0C";
        invalidContainer.textContent = "";
        displayWeatherIcon(result);
    }).catch((err) => {
        invalidContainer.textContent = `Couldn't display location data.Error message: ${ err}`;
    })
}
const displayWeatherData = () => {
    const locationForm = document.getElementById("locationForm");
    const locationInput = document.getElementById("location");
    const cfContainer = document.querySelector(".cf-container");

    locationInput.addEventListener("click", () => {
        if(locationInput.value !== "")
        {
            inputValue = locationInput.value;
        }
        locationInput.value = "";
    })
    locationForm.addEventListener("submit", (event) => {
        event.preventDefault();
        inputValue = locationInput.value;
        const weatherData = fetchWeatherData(inputValue);
        displayLocationData(weatherData);
    })
    cfContainer.addEventListener("click", () => {
        const weatherData = fetchWeatherData(inputValue);
        toggleTemperatureType(weatherData);
    })


    displayLocationData(fetchWeatherData(inputValue)); // Setting a default value for display
    displayTemperatureData(fetchWeatherData(inputValue));
}
export default displayWeatherData;