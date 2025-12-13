const searchString = window.location.search;
const searchParams = new URLSearchParams(searchString)

const id = searchParams.get('id')
const fetchEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`;

async function getReq(fetchEndpoint){
    const res = await fetch(fetchEndpoint);
    const data = await res.json();
    const meal = data.meals[0];
    console.log(meal);

    const detail = document.getElementById('main');
    const intro = document.createElement('div');
    intro.setAttribute('class', 'intro');
    intro.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal} Photo">
            <div class="info">
                <h1>${meal.strMeal}</h1>
                <p>${meal.strArea} ${meal.strCategory} dish</p>
                <a href="${meal.strYoutube} ↗" target="blank">Watch video</a>
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