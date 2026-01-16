const searchString = window.location.search;
const searchParams = new URLSearchParams(searchString)

const id = searchParams.get('id')
const fetchEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`;

async function getReq(fetchEndpoint){
    const res = await fetch(fetchEndpoint);
    const data = await res.json();
    const meal = data.meals[0];
    console.log(meal);

    const detail = document.getElementById('details');
    const intro = document.createElement('div');
    intro.setAttribute('class', 'intro');
    intro.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal} Photo">
            <div class="info">
                <h1>${meal.strMeal}</h1>
                <p>${meal.strArea} ${meal.strCategory} dish</p>
                <a href="${meal.strYoutube}" target="blank">Watch video ↗</a>
            </div>
    `

    detail.appendChild(intro);

    const ingredientList = document.createElement('ul');
    ingredientList.setAttribute('class', 'ingredientList');


    for (entry in meal) {
        // Checks if the entry is and ingredient and if it has a value
        if (entry.includes('strIngredient') && meal[entry] !== ''){
            const ingredient = document.createElement('li');
            const ingText = `${meal[entry]}`
            // console.log(ingText)
            const number = parseInt(entry.toString().match( /\d+/g))
            const measure = `strMeasure${number}`
            // console.log(measure)

            const strinToPrint = `${ingText}: ${meal[measure]}`
            console.log(strinToPrint)

            ingredient.innerHTML = `${strinToPrint}`
            ingredientList.appendChild(ingredient)

        }
        
    };

    const procedure = document.createElement('div');
    procedure.setAttribute('class', 'procedure')
    procedure.innerHTML= `
        <h2>Procedure</h2>
        <pre>${meal['strInstructions']}</pre>
    `

    detail.appendChild(ingredientList);
    detail.appendChild(procedure)
}

getReq(fetchEndpoint.toString());






// Crappy Search

const searchBox = document.getElementById('searchContainer');
searchBox.addEventListener('submit', async function (event) {
  // API endpoint for retrieving all meals from TheMealDB
  // https://www.themealdb.com/api/json/v1/1/search.php?s
  
  event.preventDefault()
  const searchTerm = document.getElementById('searchBox').value
  console.log(searchTerm)

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
  );
  
  // Parse the response as JSON to get the meal objects
  const data = await res.json();

  // Get the container element where meal cards will be inserted
  const cardList = document.getElementById("main");
  cardList.innerHTML = '';

  // Clear out the details
  document.getElementById("details").innerHTML = '';

  
  // Iterate through each meal in the API response
  data.meals.forEach((meal) => {
    // Create a new div element to serve as the meal card
    const card = document.createElement("div");
    
    // Add the "card" CSS class to style the card element
    card.setAttribute("class", "card");

    
    // Set the inner HTML of the card (currently empty, to be populated with meal details)
    card.innerHTML = `

                <div class="image">
                    <img src="${meal.strMealThumb}" alt="Photo of ${meal.strMeal}">
                </div>
                <div class="cardText">
                    <div class="mealTitle"><b>Name:</b> ${meal.strMeal}</div>
                    <div class="type"><b>Category:</b> ${meal.strCategory}</div>
                    <a href="details/?id=${meal.idMeal}"><button class="seeMoreButton"> See Details</button></a>
                </div>
            
        `;
    
    // Append the card to the cardList container to display it on the page
    cardList.appendChild(card);
  });

  // Log the fetched data to the console for debugging purposes
  console.log(data);
})



