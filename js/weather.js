const APIKey = 'R0wAH9G6pilL3IyU6alXm9MebULzk6XI'

const getCityUrl = cityName => `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`
const getCityWeatherUrl = cityKey => `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${APIKey}&language=pt-br`


const fetchData = async url => {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Não foi possível obter os dados')
        }
        return response.json()
    } catch ({name, message}) {
        alert(`${name}: ${message}`)
    }
}

const getCityData = cityName => fetchData(getCityUrl(cityName))

const getCityWeatherData = cityKey => fetchData(getCityWeatherUrl(cityKey))
     




