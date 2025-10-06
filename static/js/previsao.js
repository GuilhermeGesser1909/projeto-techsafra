document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_Name').value;

    if (!cityName) {
        document.querySelector("#weather").classList.remove('show');
        alert('Por favor, insira o nome de uma cidade...');
        return;
    }

    const apiKey = `5049a84272b2c2ce54f8202e65407d11`
const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${`5049a84272b2c2ce54f8202e65407d11`}&units=metric&lang=pt_br`;

    const results = await fetch(apiurl);
    const json = await results.json();

    if (json.cod === 200) {
        showInfo({
        city: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempMax: json.main.temp_max,
        tempMin: json.main.temp_min,
        description: json.weather[0].description,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        humidity: json.main.humidity,

    });
    } else {
        showAlert(`
            Não foi possível localizar...
            <img src="/img/undraw_location_tracking_q3yd.svg">
        `);
    }

    console.log(json);
    

});

function showInfo(json) {
    
    showAlert('');


    document.querySelector("#weather").classList.add('show');

document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;

document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>°C</sup>`;

document.querySelector('#temp_description').innerHTML = `${json.description}`;

document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')}`;

document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')}`;

document.querySelector('#humidity').innerHTML = `${json.humidity}%`;

document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;

}

function showAlert(msg) {
    document.querySelector('#Alert').innerHTML = msg;
}