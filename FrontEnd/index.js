
const apiURL = 'http://localhost:5678/api/';

async function getWorks(){
    let response = await fetch(apiURL+'works', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    });
    let works = await response.json();
    return works;
}

async function displayWorks() {
    try {
        const works = await getWorks();

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
            const gallery = document.getElementById('gallery');

            newFigure.appendChild(newImg);
            newFigure.appendChild(newCaption);
            gallery.appendChild(newFigure);
        });

    } catch (error) {
        console.error("Error: ", error);
    }
}

displayWorks();
