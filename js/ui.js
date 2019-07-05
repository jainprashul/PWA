document.addEventListener("DOMContentLoaded", ()=> {

    // nav menu
    const menus = document.querySelector('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});

    // recipe form
    const forms = document.querySelector('.side-form');
    M.Sidenav.init(forms, {edge: 'left'});

});

const recipes = document.querySelector('.recipes');
const renderRecipes = (data, id) => {
    const html = `
    <!-- recipe card -->
    <div class=" card-panel recipe white row" data-id="${id}">
      <img src="/img/dish.png" alt="recipe thumb" />
      <div class="recipe-details">
        <div class="recipe-title">${data.title}</div>
        <div class="recipe-ingredients">${data.ingredients}</div>
      </div>
      <div class="recipe-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
    `;
    recipes.innerHTML += html;
}