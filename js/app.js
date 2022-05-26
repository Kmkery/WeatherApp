const appContainer = document.querySelector('[data-js="outer-container"]')
const cityNotFoundMessage = document.querySelector('[data-js="city-not-found-message"]')
const cityForm = document.querySelector('[data-js="search-form"]')
const weatherInfoContainer = document.querySelector('[data-js="weather-info-container"]')
const cityTitle = document.querySelector('[data-js="city-title"]')
const dayTime = document.querySelector('[data-js="time"]')
const weatherIcon = document.querySelector('[data-js="weather-icon"]')
const weatherText = document.querySelector('[data-js="weather-text"]')
const temperatureInfo = document.querySelector('[data-js="temperature"]')


const showWeatherInfoContainer = () => {
    const weatherInfoContainerIsHidden = weatherInfoContainer.classList.contains('d-none')
    
    if( weatherInfoContainerIsHidden ) {
        appContainer.classList.remove('initial-app-container-style')
        weatherInfoContainer.classList.remove('d-none')                  
    }
}

const showMessage = message => {
    cityNotFoundMessage.innerText = message
    appContainer.classList.add('initial-app-container-style')
    weatherInfoContainer.classList.add('d-none')
}

const getWeatherInfo = async cityName => {
    const  [ cityData ]  = await getCityData(cityName)
   
    if( !cityData ) {
        showMessage("Cidade não encontrada")
        return
    } 
    
    const [ weatherInfo ] = await getCityWeatherData(cityData.Key)

    return [ weatherInfo, cityData.LocalizedName ]
}

const showWeatherInfo = async event => {
    event.preventDefault()

    const cityName = event.target.city.value 

    if( cityName === '' ) {
        alert('Você deve digitar uma cidade')
        return
    }

    const weatherInfo = await getWeatherInfo(cityName)

    if (!weatherInfo) {
        return
    }

    const [ {IsDayTime, WeatherIcon, WeatherText, Temperature}, LocalizedName ] = weatherInfo

    cityNotFoundMessage.innerText = ''
    dayTime.src = IsDayTime ? './src/day.svg' : './src/night.svg'
    weatherIcon.src = `./src/icons/${WeatherIcon}.svg`
    cityTitle.innerText = LocalizedName
    weatherText.innerText = WeatherText
    temperatureInfo.innerText = Temperature.Metric.Value
    
    showWeatherInfoContainer()
  
    cityForm.reset()
}

cityForm.addEventListener('submit', showWeatherInfo)

