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

    const recipe = document.createElement('div');
    recipe.setAttribute('class', 'recipe');

    meal.forEach(entry => {
        if ('ingredient' in entry){
            console.log(entry)
        }
        
    });

    detail.appendChild(recipe);
}

getReq(fetchEndpoint.toString());