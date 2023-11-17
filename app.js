const ApiKey = "6b52cc980762b1c663f3f0acbbe566e9";
const temperature = document.querySelector("#temp");
const windSpeed = document.querySelector("#wind");
const humidity = document.querySelector("#humidity");
const image = document.querySelector("img");
const description = document.querySelector("#description");

const updateWeather = (city) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        image.src = "images/404.png";
        image.style.height = "230px";
        temperature.innerHTML = ``;
        description.innerHTML = `location not found!`;
        document.getElementById("b").style.display = "none";
      } else {
        switch (json.weather[0].main) {
          case "Clear":
            image.src = "images/clear.png";
            break;
          case "Rain":
            image.src = "images/rain.png";
            break;
          case "Clouds":
            image.src = "images/cloud.png";
            break;
          case "Snow":
            image.src = "images/snow.png";
            break;
          case "Mist":
          case "Haze":
            image.src = "images/mist.png";
            break;
          default:
            image.src = "images/cloud.png";
        }

        temperature.innerHTML = `${parseInt(
          json.main.temp
        )}<span><sup>o</sup>C</span>`;
        windSpeed.innerHTML = `${parseInt(json.wind.speed)}km/hr`;
        humidity.innerHTML = `${json.main.humidity}%`;
        description.innerHTML = `${json.weather[0].description}`;
        document.getElementById("b").style.display = "flex";
        image.style.height = "170px";
        document.querySelector("input").value="";
      }
    });
};

document.querySelector("button").addEventListener("click", () => {
  const city = document.querySelector("input").value;
  updateWeather(city);
});
document.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    const city = document.querySelector("input").value;
    updateWeather(city);
  }
});
// document.querySelector("input").addEventListener("keyup", () => {
//  const city = document.querySelector("input").value;
//  updateWeather(city);
// });
