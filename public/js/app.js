document.querySelector("#getWeather").addEventListener("submit", (e) => {
  e.preventDefault();

  let address = document.querySelector("#address").value;

  const url = `/weather?address=${address}`;

  let message1 = document.querySelector(".message1");
  let message2 = document.querySelector(".message2");
  let message3 = document.querySelector(".message3");
  let hr = document.querySelector("hr");

  message1.classList.remove("text-danger");
  message1.textContent = "Loading...";
  message2.textContent = "";
  message3.textContent = "";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        hr.style.display = "none";
        message1.classList.add("text-danger");
        message1.textContent = data.error;
        message2.textContent = "";
        message3.textContent = "";
      } else {
        hr.style.display = "block";
        let tempMessage = `It's currently ${data.forecast.deg}\xBA in ${data.location}. The high is ${data.forecast.tempHigh}\xBA and the low is ${data.forecast.tempLow}\xBA.`;
        let summary = `${data.forecast.summary} and a ${data.forecast.rain}% chance of rain.`;
        message1.textContent = data.location;
        message2.textContent = tempMessage;
        message3.textContent = summary;
        document.querySelector("#address").value = "";
      }
    });
});

