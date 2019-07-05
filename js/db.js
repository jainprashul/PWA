// real- time listener

db.collection('recipes').onSnapshot((snapshot) => {
    //console.log(snapshot.docChanges());
    var changes = snapshot.docChanges();
    changes.forEach(change => {
        //console.log(change);
        if(change.type === 'added'){
            //add doc data to page
        }
        else if(change.type === 'removed'){
            //remove doc data to page
        }

    });

    
})