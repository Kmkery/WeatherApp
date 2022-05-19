const container = document.querySelector('[data-js="container')
const cityNotFoundMessage = document.querySelector('[data-js="city-not-found-message"]')

const cityForm = document.querySelector('[data-js="search-form"]')
const weatherInfoContainer = document.querySelector('[data-js="weather-info-container"]')
const cityName = document.querySelector('[data-js="city-name"]')
const dayTime = document.querySelector('[data-js="time"]')
const weatherIcon = document.querySelector('[data-js="weather-icon"]')
const weatherInfo = document.querySelector('[data-js="weather-text"]')
const temperatureInfo = document.querySelector('[data-js="temperature"]')


const setWeatherImages = (IsDayTime, WeatherIcon) => {
    IsDayTime 
        ? dayTime.src = "./src/day.svg" 
        : dayTime.src = "./src/night.svg"
    
    weatherIcon.src = `./src/icons/${WeatherIcon}.svg`
}



const displayContainer = (cityData) => {

    const containerIsHidden = weatherInfoContainer.classList.contains('d-none')
    
    if(containerIsHidden && cityData) {
        container.classList.remove('initial')
        weatherInfoContainer.classList.remove('d-none')   
    } else if(!cityData) {
        container.classList.add('initial')
        weatherInfoContainer.classList.add('d-none')   
    }
}


const setWeatherTexts = (LocalizedName, WeatherText, Temperature) => {
    cityName.innerText = LocalizedName
    weatherInfo.innerText = WeatherText
    temperatureInfo.innerText = Temperature.Metric.Value
}


cityForm.addEventListener('submit', async event => {
    event.preventDefault()

    const inputValue = event.target.city.value 
    const [cityData] = await getCityData(inputValue)

    if(!cityData) {
        cityNotFoundMessage.innerText = "Cidade não encontrada."
        
        displayContainer(cityData)
        return

    } else {
        cityNotFoundMessage.innerText = ""
    
        const [{ IsDayTime, WeatherIcon, WeatherText, Temperature }] = await getCityWeatherData(cityData.Key)

        setWeatherImages(IsDayTime, WeatherIcon)
        setWeatherTexts(cityData.LocalizedName, WeatherText, Temperature)
        
        displayContainer(cityData)
    }
    
    cityForm.reset()

})

