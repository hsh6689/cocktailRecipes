var resultContentEl = document.querySelector('#result-content');
const random_ct = "https://www.thecocktaildb.com/api/json/v1/1/random.php"

function getRandomCT() {
    fetch(random_ct)
        .then(response => {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(randomCocktail => {
            if (randomCocktail.idDrink === 0) {
                console.log("ERROR Finding random drink");
            } else {
                var gridEl = document.createElement('div');
                gridEl.setAttribute("class", 'row');
                gridEl.setAttribute("id", `row-${0}`);
                gridEl.setAttribute("style", 'justify-content: center');
                resultContentEl.append(gridEl);
                printResults(randomCocktail.drinks[0], 0, false);
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}
getRandomCT();