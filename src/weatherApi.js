// All methods that fetch data from the Weather API
async function fetchWeatherData(location) {

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=91b0e252b372465581f204124231009&q=${location}&days=3` );
        const weatherData = response.json();

        return weatherData; // If successful returns a Promise

    } catch(error)
    {
        return error; // If not display error message
    }
        
}

export default fetchWeatherData;