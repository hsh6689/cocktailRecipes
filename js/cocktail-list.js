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
          printResults(cocktailList.drinks[i], rowNum, true);
        }
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}
//getParams();
displayLoading();
