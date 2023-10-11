
const apiURL = 'http://localhost:5678/api/';

// *********** FUNCTIONS ***************

// Fetching works from API
async function getWorks(){
    let response = await fetch(apiURL+'works', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    });
    let works = await response.json();
    return works;
}

// Display ALL works
async function displayWorks() {
    try {
        const works = await getWorks();

        const gallery = document.getElementById('gallery');

        works.forEach(work => {
            // Creating the DOM elements
            let newFigure = document.createElement('figure');
            let newImg = document.createElement('img');
            let newCaption = document.createElement('figcaption');

            // Setting DOM elements' attributes
            newImg.setAttribute('src', work.imageUrl);
            newImg.setAttribute('alt', work.title);

            newCaption.textContent = work.title;

            // Appending DOM elements to their respective parent    
            newFigure.appendChild(newImg);
            newFigure.appendChild(newCaption);
            gallery.appendChild(newFigure);
        });

    } catch (error) {
        console.error("Error: ", error);
    }
}

async function displayObjets() {
    try {
        const works = await getWorks();

        // Filtering works that belong to the 'Objets' category
        let onlyObjetsWorks = works.filter(work => {
            return work.category.name.toLowerCase() === 'objets';
        }); 
        
        // Erasing previously displayed works on the DOM before displaying the newly filtered ones
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = '';

        onlyObjetsWorks.forEach(work => {
            // Creating the DOM elements
            let newFigure = document.createElement('figure');
            let newImg = document.createElement('img');
            let newCaption = document.createElement('figcaption');

            // Setting DOM elements' attributes
            newImg.setAttribute('src', work.imageUrl);
            newImg.setAttribute('alt', work.title);

            newCaption.textContent = work.title;

            // Appending DOM elements to their respective parent    
            newFigure.appendChild(newImg);
            newFigure.appendChild(newCaption);
            gallery.appendChild(newFigure);
        });

    } catch (error) {
        console.error("Error: ", error);
    }
}

async function displayAppartements() {
    try {
        const works = await getWorks();

        // Filtering works that belong to the 'Objets' category
        let onlyAppartWorks = works.filter(work => {
            return work.category.name.toLowerCase() === 'appartements';
        }); 
        
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = '';

        // Displaying each filtered work on the DOM
        onlyAppartWorks.forEach(work => {
            // Creating the DOM elements
            let newFigure = document.createElement('figure');
            let newImg = document.createElement('img');
            let newCaption = document.createElement('figcaption');

            // Setting DOM elements' attributes
            newImg.setAttribute('src', work.imageUrl);
            newImg.setAttribute('alt', work.title);

            newCaption.textContent = work.title;

            // Appending DOM elements to their respective parent

            newFigure.appendChild(newImg);
            newFigure.appendChild(newCaption);
            gallery.appendChild(newFigure);
        });

    } catch (error) {
        console.error("Error: ", error);
    }
}

async function displayhotelsResto() {
    try {
        const works = await getWorks();

        // Filtering works that belong to the 'Objets' category
        let onlyHotelsRestoWorks = works.filter(work => {
            return work.category.name.toLowerCase() === 'hotels & restaurants';
        }); 
        
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = '';

        // Displaying each filtered work on the DOM
        onlyHotelsRestoWorks.forEach(work => {
            // Creating the DOM elements
            let newFigure = document.createElement('figure');
            let newImg = document.createElement('img');
            let newCaption = document.createElement('figcaption');

            // Setting DOM elements' attributes
            newImg.setAttribute('src', work.imageUrl);
            newImg.setAttribute('alt', work.title);

            newCaption.textContent = work.title;

            // Appending DOM elements to their respective parent

            newFigure.appendChild(newImg);
            newFigure.appendChild(newCaption);
            gallery.appendChild(newFigure);
        });

    } catch (error) {
        console.error("Error: ", error);
    }
}

// *******************************************

// *********** EVENT LISTENERS ***************

// Displaying ALL works upon page load
document.addEventListener('DOMContentLoaded', ()=>{
    displayWorks();
});

// Displaying all works upon click on "Tous" button
const tous = document.getElementById('tous');
tous.addEventListener('click', () => {
    displayWorks();
});


// Filtering Object  works
const objets = document.getElementById('objets');
objets.addEventListener('click', () => {    
    displayObjets();
});

// Filtering Appartment works
const appartements = document.getElementById('appartements');
appartements.addEventListener('click', () => {    
    displayAppartements();
});

// Filtering Hotels and Restaurants works
const hotelsResto = document.getElementById('hotels-resto');
hotelsResto.addEventListener('click', ()=>{
    displayhotelsResto();
});

// *******************************************

