// ===============================
// Previsão do Tempo - TechSafra
// ===============================

const apiKey = "e2c52125e70b3fc87ef41d80f29f37fd";

// Referências do DOM
const form = document.getElementById("search");
const cityInput = document.getElementById("city_Name");
const title = document.getElementById("title");
const tempValue = document.getElementById("temp_value");
const tempDescription = document.getElementById("temp_description");
const tempImg = document.getElementById("temp_img");
const tempMax = document.getElementById("temp_max");
const tempMin = document.getElementById("temp_min");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const forecastGrid = document.getElementById("forecast-grid");

// Ao enviar o formulário
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city !== "") {
    buscarPrevisao(city);
  }
});

// Função principal
async function buscarPrevisao(city) {
  try {
    // Primeira requisição: busca dados atuais
    const responseCurrent = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`
    );
    if (!responseCurrent.ok) throw new Error("Cidade não encontrada.");

    const data = await responseCurrent.json();

    // Atualiza infos principais
    title.textContent = `${data.name}, ${data.sys.country}`;
    tempValue.innerHTML = `${Math.round(data.main.temp)} <sup>°C</sup>`;
    tempDescription.textContent = data.weather[0].description
      .charAt(0)
      .toUpperCase() + data.weather[0].description.slice(1);
    tempImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    tempImg.alt = data.weather[0].description;

    tempMax.textContent = `${Math.round(data.main.temp_max)}°C`;
    tempMin.textContent = `${Math.round(data.main.temp_min)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;

    // Pega coordenadas para previsão de 7 dias
    const { lat, lon } = data.coord;

    // Segunda requisição: previsão estendida
    const responseForecast = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&lang=pt_br&appid=${apiKey}`
    );
    const forecastData = await responseForecast.json();

    mostrarPrevisao7Dias(forecastData.daily);
  } catch (error) {
    console.error("Erro:", error);
    alert("Não foi possível obter os dados da cidade.");
  }
}

// Função para renderizar cards de 7 dias
function mostrarPrevisao7Dias(dailyData) {
  forecastGrid.innerHTML = ""; // limpa o grid

  // Pega apenas os 7 próximos dias
  const dias = dailyData.slice(1, 8);

  dias.forEach((dia) => {
    const date = new Date(dia.dt * 1000);
    const dayName = date.toLocaleDateString("pt-BR", { weekday: "short" });

    const card = document.createElement("div");
    card.classList.add("day-card");
    card.innerHTML = `
      <h4>${dayName.charAt(0).toUpperCase() + dayName.slice(1)}</h4>
      <img src="https://openweathermap.org/img/wn/${dia.weather[0].icon}.png" alt="${dia.weather[0].description}" />
      <p>${dia.weather[0].description}</p>
      <p><strong>Máx:</strong> ${Math.round(dia.temp.max)}°C</p>
      <p><strong>Mín:</strong> ${Math.round(dia.temp.min)}°C</p>
    `;
    forecastGrid.appendChild(card);
  });
}

// Carrega Blumenau por padrão ao abrir
buscarPrevisao("Blumenau");
