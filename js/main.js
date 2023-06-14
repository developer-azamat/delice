const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details");
const mealDetailsContentMini = document.querySelector(".meal-datails-content");
const recipeCloseBtn = document.querySelector("#recipe-close-btn");
const loader = document.querySelector('.loader')
//event listeners

window.addEventListener("load", ()=> {
    loader.style.display = "none";
})

searchBtn.addEventListener("click", getMealList);

function getMealList() {
  let searchInputTxt = document.querySelector("#search-input");

  let textSearch = searchInputTxt.value.trim();
  const api_link = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${textSearch}`;

  const getData = async (api) => {
    loader.style.display = "flex"
    const req = await fetch(api);
    const data = await req.json();
    loader.style.display = "none"
    usingData(data.meals);
    searchInputTxt.value = ""
  };
  getData(api_link);
}

function usingData(data) {
  data.forEach((item) => {
    mealList.innerHTML += `
    <div class="meal-item">
        <div class="meal-img">
            <img src="${item.strMealThumb}" alt="food">
        </div>
        <div class="meal-name">
            <h3>${item.strMeal}</h3>
            <a href="#" onclick="detailsById(${item.idMeal})" class="recipe-btn">Get recipe</a>
        </div>
    </div>  
    `;
  });
}

async function detailsById(id = 52772) {
  const details_api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const req = await fetch(details_api);
  const response = await req.json();
  mealDetailsContent.style.display = "block";

  const data = response.meals[0];

  mealDetailsContentMini.innerHTML = `
  <h2 class="recipe-title">${data.strMeal}</h2>
  <p class="recipe-category">${data.strCategory}</p>
  <div class="recipe-instruct">
    <h3>Instructions:</h3>
    <p>
     ${data.strInstructions}
    </p>
  </div>
  <div class="recipe-meal-img">
    <img src="${data.strMealThumb}" alt="${data.strMeal}" />
  </div>
  <div class="recipe-link">
    <a href="${data.strYoutube}" target="_blank">Watch video</a>
  </div>
  `;
}

recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.style.display = "none";
});
