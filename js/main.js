//Another
function foodSearch(){
    const inputItem = document.getElementById('input-item').value;
    
    async function foodSearchResult(){
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+inputItem);
        const data = await response.json();
        return data;
    }
    foodSearchResult().then(data => {
        displayFoods(data);
    })
    .catch(err => alert("Please enter the correct food name"));
}

const displayFoods = foodItems =>{
    console.log(foodItems);
    const foodsMainInfo = document.getElementById('foods');
    cleanPreviousInfo('foods');
    cleanPreviousInfo('food-details');

    foodItems.meals.forEach(food => {
        console.log(food);
        const colDiv = document.createElement('div');
        colDiv.className = 'col-lg-3';
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        const foodImageDiv = document.createElement('div');
        foodImageDiv.className = 'food-image';
        const itemNameDiv = document.createElement('div');
        itemNameDiv.className = 'item-name';

        const foodImageInfo = `
            <a href="#" onclick="displayFoodDetails('${food.strMeal}')">
                <img src="${food.strMealThumb}" class="img-fluid">
            </a>
        `;
        const foodNameInfo = `
            <a href="#">
                <h4 onclick="displayFoodDetails('${food.strMeal}')">${food.strMeal}</h4>
            </a>
        `;
        foodImageDiv.innerHTML = foodImageInfo;
        itemDiv.appendChild(foodImageDiv);
        itemNameDiv.innerHTML = foodNameInfo;
        itemDiv.appendChild(itemNameDiv);
        colDiv.appendChild(itemDiv);
        foodsMainInfo.appendChild(colDiv);
    });
    document.getElementById('input-item').value = "";
};






const displayFoodDetails = mealName =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    fetch(url)
    .then(res => res.json())
    .then(data => renderFoodInfo(data.meals[0]));
};

const renderFoodInfo = food => {
    const foodDiv = document.getElementById('food-details');
    cleanPreviousInfo('food-details');

    const colDiv = document.createElement('div');
    colDiv.className = 'col-lg-6';
    const foodItemDiv = document.createElement('div');
    foodItemDiv.className = 'item';
    const itemImageDiv = document.createElement('div');
    itemImageDiv.className = 'food-image';
    const itemNameDiv = document.createElement('div');
    itemNameDiv.className = 'food-name';

    const foodImage = `
        <a href="#">
            <img src="${food.strMealThumb}" class="food-img">
        </a>
    `; 
    const foodNameDetails = `
        <a href="#">
            <h2>${food.strMeal}</h4>
        </a>
        <div class="ingredients">
            <h3>Ingredients</h5>
            <ul id="ingredients-list">
                <li class="listItem">
                    <input type="checkbox" id="item1" checked="checked">
                    <label for="item1" class="check-item">${food.strMeasure1+ ' ' +food.strIngredient1}</label>
                </li>
                <li>
                    <input type="checkbox" id="item1" checked="checked">
                    <label for="item1" class="check-item">${food.strMeasure2+ ' ' +food.strIngredient2}</label>
                </li>
                <li>
                    <input type="checkbox" id="item1" checked="checked">
                    <label for="item1" class="check-item">${food.strMeasure3+ ' ' +food.strIngredient3}</label>
                </li>
            </ul>
        </div>
    `;
    itemImageDiv.innerHTML = foodImage; 
    foodItemDiv.appendChild(itemImageDiv);
    itemNameDiv.innerHTML = foodNameDetails;
    foodItemDiv.appendChild(itemNameDiv);
    colDiv.appendChild(foodItemDiv);
    foodDiv.appendChild(colDiv);
};

//Clear previous food item
const cleanPreviousInfo = details => {
    const FoodDetails = document.getElementById(details);
    FoodDetails.innerHTML = "";
};
