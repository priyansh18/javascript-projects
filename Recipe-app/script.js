const meals = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");
const mealPopup = document.getElementById("meal-popup");
const popupCloseBtn = document.getElementById("close-popup");
const mealInfoEl = document.getElementById("meal-info");

// Function Call
getRandomDeal();
fetchFavMeals();

//  Fetch Random Meals
async function getRandomDeal() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const responseData = await response.json();
  const randomMeal = responseData.meals[0];

  addMeal(randomMeal, true);
}

//  Add Meals Randomly
function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");
  meal.innerHTML = `
                    <div class="meal-header">
                      ${
                        random
                          ? `<span class="random">Random Recipe</span>`
                          : ""
                      }
                      <img src="${mealData.strMealThumb}" alt="${
    mealData.strMeal
  }"/>
                    </div>
                    <div class="meal-body">
                      <h4>${mealData.strMeal}</h4>
                      <button class="fav-btn">
                        <i class="far fa-heart"></i>
                      </button>
                    </div>
                  `;
  meals.appendChild(meal);

  const btn = meal.querySelector(".meal-body .fav-btn");
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealLocalStorage(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealLocalStorage(mealData.idMeal);
      btn.classList.add("active");
    }
    fetchFavMeals();
  });

  meal.addEventListener("click", () => {
    showMealInfo(mealData);
  });
}

// Local Storage
function addMealLocalStorage(mealId) {
  const mealIds = getMealsLocalStorage();

  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLocalStorage(mealId) {
  const mealIds = getMealsLocalStorage();

  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealsLocalStorage() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  console.log(mealIds);
  return mealIds === null ? [] : mealIds;
}

async function getMealById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const respData = await resp.json();
  const meal = respData.meals[0];
  console.log(meal);

  return meal;
}

async function fetchFavMeals() {
  //  Clean the Container
  favoriteContainer.innerHTML = "";

  const mealIds = getMealsLocalStorage();

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];

    meal = await getMealById(mealId);
    addMealToFav(meal);
  }
}

function addMealToFav(mealData) {
  const favmeal = document.createElement("li");
  favmeal.innerHTML = `
                    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                    <span>${mealData.strMeal}</span>
                    <button class="clear"><i class="fas fa-window-close"></i></button>
                  `;
  const btn = favmeal.querySelector(".clear");
  btn.addEventListener("click", () => {
    removeMealLocalStorage(mealData.idMeal);
    fetchFavMeals();
  });

  favmeal.addEventListener("click", () => {
    showMealInfo(mealData);
  });

  favoriteContainer.appendChild(favmeal);
}

function showMealInfo(mealData) {
  mealInfoEl.innerHTML = "";

  const mealInfo = document.createElement("div");

  mealInfoEl.appendChild(mealInfo);

  const ingredients = [];
  // Get Ingredients and measures
  for (let i = 1; i <= 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(
        `${mealData["strIngredient" + i]}/${mealData["strMeasure" + i]}`
      );
    } else {
    }
  }

  // Show the popup
  mealInfoEl.innerHTML = `
    <h1>${mealData.strMeal}</h1>
    <img src="${mealData.strMealThumb}" alt="">
    <p>${mealData.strInstructions}
    </p>
    <h3>Ingredients : </h3>
    <ul>
      ${ingredients.map((ingredient) => `<li class="ing-list" style="list-style-type: disc;">${ingredient}</li>`).join("")}
    </ul>`;

  mealPopup.classList.remove("hidden");
}

popupCloseBtn.addEventListener("click", () => {
  mealPopup.classList.add("hidden");
});
