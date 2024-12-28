/* 
Document: https://openweathermap.org/current#zip 
 - Example api: https://api.openweathermap.org/data/2.5/weather?zip=94040&APPID=8ebd77d80c17a5646380412b04210ffd
*/

/* Global Variables */
const apiKey = "8ebd77d80c17a5646380412b04210ffd&units=imperial";
const generateBtn = document.getElementById("generate");
const zipInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");

const baseURL = "https://api.openweathermap.org/data/2.5/weather";
const localURL = "http://localhost:8000/projectData";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// helper functions
const fetchWeatherData = async (zipCode) => {
  try {
    const url = `${baseURL}?zip=${zipCode}&appid=${apiKey}`;
    const response = await fetch(url);

    const data = await response.json();
    const temp = data.main.temp;

    return temp;
  } catch (err) {
    console.log("Error fetchWeatherData :", err);
  }
};

const updateLocalData = async (body) => {
  try {
    const response = await fetch(localURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (err) {
    console.log("Error updateLocalData :", err);
  }
};

const updateUI = async () => {
  const response = await fetch(localURL);
  try {
    const recentData = await response.json();

    date.innerHTML = "* Date :      " + recentData.date;
    temp.innerHTML =
      "* Temperature: " + Math.round(recentData.temp) + " degrees";
    content.innerHTML = "* Feelings:    " + recentData.content;
  } catch (error) {
    console.log("Error updateUI", error);
  }
};

// main function
const handleGenerate = async () => {
  const zipCode = zipInput.value;
  const content = feelingsInput.value;

  if (!zipCode || !content) {
    alert("Please enter a zip code and your feelings");
    return;
  }

  const temp = await fetchWeatherData(zipCode);
  const body = {
    date: newDate,
    temp: temp,
    content: content,
  };

  await updateLocalData(body);

  updateUI();
};

// add lister for button
generateBtn.addEventListener("click", handleGenerate);
