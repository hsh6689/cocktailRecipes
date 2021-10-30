var resultContentEl = document.querySelector('#result-content');

var time = 1;
function displayLoading() {
  const load_gif = "https://media.giphy.com/media/sEH3lMz5hMBEc/giphy.gif";
  var messageEl = document.createElement("p3");
  messageEl.setAttribute("class", "loading-msg");
  messageEl.textContent = "Your drink will be out shortly...";
  resultContentEl.append(messageEl);
  resultContentEl.append(document.createElement("br"));

  var imgEl = document.createElement("img");
  imgEl.setAttribute("src", load_gif);
  resultContentEl.append(imgEl);

  //timeEl.textContent = "Your cocktail will be right"
  var timeInterval = setInterval(function () {
    time--;
    if (time === 0) {
      clearInterval(time);
      getParams();
    }
  }, 1000);
}

function getParams() {
  //get the search param(ingredient) out of the URL
  var ingredient_val = document.location.search;
  //get the query of value, e.a query=gins
  var query = ingredient_val.split('=').pop();
  if (query === "") {
    return;
  }
  searchApi(query);
}

//resultObj fields: 
//1. strDrink (name of the cocktail), 2. strDrinkThumb (thumbnail of the coctail), 3. idDrink (unique ID of drink) 
function printResults(resultObj, rowNum) {
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
      resultCol.classList.add('col-3', "col-12", "col-sm-12", "col-md-6", "col-lg-4");

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

function searchApi(query) {
  //we are going to search by ingredient, e.a query=gin
  var locQueryUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php";
  //If user selected the format, filter with format value

  locQueryUrl = locQueryUrl + '?i=' + query;

  fetch(locQueryUrl)
    .then(response => {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(cocktailList => {
      // write query to page so user knows what they are viewing
      //resultTextEl.textContent = cocktailList.search.query;

      if (!cocktailList.drinks.length) {
        console.log('No drinks found!');
        resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      } else {
        resultContentEl.textContent = '';
        for (var i = 0; i < cocktailList.drinks.length; i++) {
          //Create a grid(2 card in a row)
          var rowNum = Math.floor(i / 3);
          if (i % 3 === 0) {
            var gridEl = document.createElement('div');
            gridEl.setAttribute("class", 'row');
            gridEl.setAttribute("id", `row-${rowNum}`);
            gridEl.setAttribute("style", 'justify-content: center');
            resultContentEl.append(gridEl);
          }
          //Print list of coctails with instruction
          printResults(cocktailList.drinks[i], rowNum);
        }
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}
//getParams();
displayLoading();