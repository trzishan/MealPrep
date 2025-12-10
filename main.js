console.log("Yay! JS is working.");

async function loadAll(){

    // All of them API
    // https://www.themealdb.com/api/json/v1/1/search.php?s
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s");
    const data = await res.json();
            
    const cardList = document.getElementById("cardList");

    data.meals.forEach( meal => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card')
        card.innerHTML = `
            <div class="khanarNam">Name: ${meal.strMeal}</div>
            <div class="type">Category: ${meal.strCategory}</div>
            <div class="origin">Area: ${meal.strArea}</div>

        `;
        cardList.appendChild(card);
    });

    console.log(data)
}

loadAll();

const card = document.getElementsByClassName('card')
