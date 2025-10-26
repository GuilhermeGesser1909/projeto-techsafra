document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_Name').value.trim();

    if (!cityName) {
        document.querySelector("#weather").classList.remove('show');
        alert('Por favor, insira o nome de uma cidade...');
        return;
    }

    const apiKey = '5049a84272b2c2ce54f8202e65407d11';

    try {
        // 🌤️ Buscar clima atual
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;
        const currentRes = await fetch(currentUrl);
        const currentData = await currentRes.json();

        if (currentData.cod !== 200) {
            showAlert(`
                Não foi possível localizar...
                <img src="\\projeto-techsafra\\src\\img\\undraw_location-tracking_q3yd.svg">
            `);
            return;
        }

        // Exibir informações atuais
        showInfo({
            city: currentData.name,
            country: currentData.sys.country,
            temp: currentData.main.temp,
            tempMax: currentData.main.temp_max,
            tempMin: currentData.main.temp_min,
            description: currentData.weather[0].description,
            tempIcon: currentData.weather[0].icon,
            windSpeed: currentData.wind.speed,
            humidity: currentData.main.humidity,
        });

        // 📅 Buscar previsão dos próximos 5 dias (3h em 3h)
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;
        const forecastRes = await fetch(forecastUrl);
        const forecastData = await forecastRes.json();

        // Exibir previsão diária (agrupando por dia)
        showForecast(forecastData.list);

    } catch (error) {
        console.error("Erro:", error);
        showAlert("Erro ao buscar dados do clima.");
    }
});

function showInfo(json) {
    const weatherDiv = document.querySelector("#weather");
    weatherDiv.classList.remove('show');
    showAlert('');
    weatherDiv.classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>°C</sup>`;
    document.querySelector('#temp_description').innerHTML = json.description;
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')}°C`;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')}°C`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)} km/h`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
}

function showForecast(list) {
    const forecastGrid = document.querySelector("#forecast-grid");
    if (!forecastGrid) return;

    forecastGrid.innerHTML = ""; // limpar conteúdo anterior

    // Agrupar por data (para pegar só 1 previsão por dia)
    const daily = {};
    list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (!daily[date]) daily[date] = item;
    });

    const days = Object.values(daily).slice(0, 7);
    const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    days.forEach((day) => {
        const date = new Date(day.dt_txt);
        const weekday = weekdays[date.getDay()];
        const icon = day.weather[0].icon;
        const desc = day.weather[0].description;
        const max = day.main.temp_max;
        const min = day.main.temp_min;

        const card = document.createElement("div");
        card.classList.add("forecast-day");
        card.innerHTML = `
            <h4>${weekday}</h4>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}">
            <p>${desc}</p>
            <p><strong>Máx:</strong> ${Math.round(max)}°C</p>
            <p><strong>Mín:</strong> ${Math.round(min)}°C</p>
        `;
        forecastGrid.appendChild(card);
    });
}

function showAlert(msg) {
    document.querySelector('#Alert').innerHTML = msg;
}
