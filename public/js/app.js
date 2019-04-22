document.querySelector("#getWeather").addEventListener("submit", (e) => {
  e.preventDefault();

  let address = document.querySelector("#address").value;

  const url = `/weather?address=${address}`;

  let message1 = document.querySelector(".message1");
  let message2 = document.querySelector(".message2");
  let message3 = document.querySelector(".message3");

  message1.classList.remove("text-danger");
  message1.textContent = "Loading...";
  message2.textContent = "";
  message3.textContent = "";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        message1.classList.add("text-danger");
        message1.textContent = data.error;
        message2.textContent = "";
        message3.textContent = "";
      } else {
        message1.textContent = data.location;
        message2.textContent = data.forecast.message;
        message3.textContent = `The high is ${data.forecast.tempHigh} degress and the low is ${data.forecast.tempLow} degress`;
        document.querySelector("#address").value = "";
      }
    });
});

