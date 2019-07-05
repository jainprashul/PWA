// offine approach
db.enablePersistence().catch(err => {
    if(err.code == "failed-precondition"){
        // due to multiple tabs opened
        console.log("Persistence failed");
    } 
    else if(err.code == "unimplemented"){
        // due to lack of browser support
        console.log("Persistence not available");
    } 
} )

// real- time listener

db.collection('recipes').onSnapshot((snapshot) => {
    //console.log(snapshot.docChanges());
    var changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change);
        if(change.type === 'added'){
            //add doc data to page
            renderRecipes(change.doc.data(), change.doc.id)
        }
        else if(change.type === 'removed'){
            //remove doc data to page
        }

    });

    
})