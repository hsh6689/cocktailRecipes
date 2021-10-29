var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var ingredientVal = document.querySelector('#format-input').value;

  if (!ingredientVal) {
    alert('You need a search input value!');
    return;
  }

  var queryString = './cocktail-list.html?i=' + ingredientVal;

  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
