const recipeContainer = document.querySelector(".recipe-container");
const searchBox = document.querySelector(".searchBox");
const searchButton = document.querySelector(".searchButton");

const recipeDetails = document.querySelector(".recipe-details");
const recipeDetailContent = document.querySelector(".recipe-detail-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

async function fetchRecipes(searchData){

    recipeContainer.innerHTML =
        "<h2>Fetching Recipes...</h2>";

    try{

        const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchData}`
        );

        const data = await res.json();

        recipeContainer.innerHTML = "";

        if(!data.meals){
            recipeContainer.innerHTML =
                "<h2>No recipes found 😢</h2>";
            return;
        }

        data.meals.forEach((meal)=>{

            const recipeDiv = document.createElement("div");

            recipeDiv.classList.add("recipe");

            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

                <div class="recipe-content">
                    <h3>${meal.strMeal}</h3>

                    

                    <p>
                        Category:
                        <span>${meal.strCategory}</span>
                    </p>
                </div>
            `;

            const button = document.createElement("button");

            button.textContent = "View Recipe";

            button.addEventListener("click", ()=>{
                openRecipePopup(meal);
            });

            recipeDiv.appendChild(button);

            recipeContainer.appendChild(recipeDiv);
        });

    }
    catch(error){

        recipeContainer.innerHTML =
            "<h2>Something went wrong. Please try again.</h2>";

        console.error(error);
    }
}

function fetchIngredients(meal){

    let ingredientsList = "";

    for(let i=1;i<=20;i++){

        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if(ingredient && ingredient.trim() !== ""){

            ingredientsList += `
                <li>${measure} ${ingredient}</li>
            `;
        }
    }

    return ingredientsList;
}

function openRecipePopup(meal){

    recipeDetailContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>

        <h3>Ingredients</h3>

        <ul class="ingrediantList">
            ${fetchIngredients(meal)}
        </ul>

        <div class="recipeInstructions">
            <h3>Instructions</h3>

            <p>${meal.strInstructions}</p>
        </div>
    `;

    recipeDetails.style.display = "block";
}
// to close the recipe details popup when the close button is clicked
recipeCloseBtn.addEventListener("click", ()=>{

    recipeDetails.style.display = "none";
});

searchButton.addEventListener("click",(e)=>{

    e.preventDefault();
    //if we don't use preventDefault() here, the page will reload when we click the search button,
    //and we will lose our search results.
    const searchInput = searchBox.value.trim();

    if(!searchInput){

        recipeContainer.innerHTML =
            "<h2>Please enter a meal name.</h2>";

        return;
    }

    fetchRecipes(searchInput);
});
