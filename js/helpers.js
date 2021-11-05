//resultObj fields: 
//1. strDrink (name of the cocktail), 2. strDrinkThumb (thumbnail of the coctail), 3. idDrink (unique ID of drink) 
/*PARAMETERS
1. resultObj
2. rowNum
3. type - boolean
*/
function printResults(resultObj, rowNum, multiple) {
    //we have unique ID, so search with this ID to get ingridients and recipes
    const cocktailID = resultObj.idDrink;
    //save the name of cocktail
    const cocktailName = resultObj.strDrink;
    //save the thumbnail
    const cocktailThumb = resultObj.strDrinkThumb;
    //get the row you will add the cards
    const rowEl = document.getElementById(`row-${rowNum}`);

    var locQueryUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php";
    locQueryUrl = locQueryUrl + '?i=' + cocktailID;

    fetch(locQueryUrl)
        .then(response => {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        }).then(drinkRes => {
            //set up "<DIV>" to hold result content
            var drinkItem = drinkRes.drinks[0];

            var resultCol = document.createElement('div');

            if (multiple === true) {
                resultCol.classList.add('col-3', "col-12", "col-sm-12", "col-md-6", "col-lg-4");
            }
            else if (multiple === false) {
                resultCol.classList.add('col-3', "col-12", "col-sm-12", "col-md-6");
            }

            var resultCard = document.createElement('div');
            resultCard.classList.add('card', 'text-dark', 'mt-1', 'mb-1', 'p-3', 'bg-light');

            resultCol.append(resultCard);

            //var resultCard = document.createElement('div');
            //resultCard.classList.add('card', 'text-dark', 'mb-3', 'p-3', 'col-3', "col-12", "col-sm-12", "col-md-6", "col-lg-4");

            var resultBody = document.createElement('div');
            resultBody.classList.add('card-body');
            resultCard.append(resultBody);

            //Add coctail name to the card
            var nameEl = document.createElement('h3');
            nameEl.setAttribute("class", "text-center");
            nameEl.textContent = cocktailName;
            resultBody.append(nameEl);

            //Create a grid
            var gridEl = document.createElement('div');
            gridEl.setAttribute("class", "row");
            resultBody.append(gridEl);

            //Add pictures on the card
            var pictureEl = document.createElement('img');
            pictureEl.src = cocktailThumb;
            pictureEl.setAttribute("class", "ct-pic col-6");
            gridEl.append(pictureEl);

            //Add ingredient list to the card
            var ingredientList = document.createElement('ul');
            ingredientList.setAttribute("class", "ct-ingredient col-6");
            gridEl.append(ingredientList);
            //Add ingredients to the list
            for (var i = 1; i < 16; i++) {
                //gather values from the API
                var ingrTemp = drinkItem[`strIngredient${i}`];
                var measTemp = drinkItem[`strMeasure${i}`];

                if ((ingrTemp !== null && ingrTemp !== "") && (measTemp !== null && measTemp !== "")) {
                    var ingredientTemp = ingrTemp + ": " + measTemp;
                    var ingredientEl = document.createElement('li');
                    ingredientEl.textContent = ingredientTemp;
                    ingredientList.append(ingredientEl);
                }
            }
            //Add instructions on the card
            var instEl = document.createElement('p3');
            instEl.textContent = "Instructions: " + drinkItem.strInstructions;
            resultBody.append(instEl);
            rowEl.append(resultCol);
        })
}