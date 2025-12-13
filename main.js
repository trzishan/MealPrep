// Confirmation that JavaScript is loaded and working
console.log("Yay! JS is working.");

/**
 * Fetches meal data from TheMealDB API and renders meal cards on the page.
 * This function makes an API request to get all available meals,
 * then dynamically creates and appends card elements to display them.
 */
async function loadAll() {
  // API endpoint for retrieving all meals from TheMealDB
  // https://www.themealdb.com/api/json/v1/1/search.php?s
  
  // Fetch meal data from the API
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s"
  );
  
  // Parse the response as JSON to get the meal objects
  const data = await res.json();

  // Get the container element where meal cards will be inserted
  const cardList = document.getElementById("main");

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
                    <div class="khanarNam"><b>Name:</b> ${meal.strMeal}</div>
                    <div class="type"><b>Category:</b> ${meal.strCategory}</div>
                    <a href="details/?id=${meal.idMeal}"><button class="simorButton"> See Details</button></a>
                </div>
            
        `;
    
    // Append the card to the cardList container to display it on the page
    cardList.appendChild(card);
  });

  // Log the fetched data to the console for debugging purposes
  console.log(data);
}

// Execute the loadAll function to fetch and display meals when the page loads
loadAll();



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
                    <div class="khanarNam"><b>Name:</b> ${meal.strMeal}</div>
                    <div class="type"><b>Category:</b> ${meal.strCategory}</div>
                    <a href="details/?id=${meal.idMeal}"><button class="simorButton"> See Details</button></a>
                </div>
            
        `;
    
    // Append the card to the cardList container to display it on the page
    cardList.appendChild(card);
  });

  // Log the fetched data to the console for debugging purposes
  console.log(data);
})



