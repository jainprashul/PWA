// offine approach
db.enablePersistence().catch(err => {
    if (err.code == "failed-precondition") {
        // due to multiple tabs opened
        console.log("Persistence failed");
    }
    else if (err.code == "unimplemented") {
        // due to lack of browser support
        console.log("Persistence not available");
    }
})

// real- time listener

db.collection('recipes').onSnapshot((snapshot) => {
    //console.log(snapshot.docChanges());
    var changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change);
        if (change.type === 'added') {
            //add doc data to page
            renderRecipes(change.doc.data(), change.doc.id)
        }
        else if (change.type === 'removed') {
            //remove doc data to page
            removeRecipe(change.doc.id);
        }

    });


});

// adding recipes (data)
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    evt.preventDefault();
    const recipe = {
        title: form.title.value,
        ingredients: form.ingredients.value
    };

    db.collection('recipes').add(recipe)
        .catch(err => console.log(err));
    form.title.value = '';
    form.ingredients.value = '';
});

// deleting recipes (data)
const recipeContainer = document.querySelector('.recipes');
recipeContainer.addEventListener('click', evt=> {
    //console.log(evt);
    if(evt.target.tagName =='I'){
        const id = evt.target.getAttribute('data-id');
        console.log(id);
        db.collection('recipes').doc(id).delete();
    }
});