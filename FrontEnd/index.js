const apiURL = "http://localhost:5678/api/";

// *********** FUNCTIONS ***************

// GETTING works from API
async function getWorks() {
  let response = await fetch(apiURL + "works");
  let works = await response.json();
  return works;
}

// DELETING works
async function deleteWorks(token, workId) {
  try {
    const response = await fetch(apiURL + "works/" + workId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (response.status === 200) {
      console.log("Work deleted successfully");
      // Here you can update your UI or perform any other actions
    } else {
      console.error("Failed to delete work. Status code: " + response.status);
    }
  } catch (error) {
    console.error("Error: ", error);
    // Handling network or other errors here
  }
}

// Display ALL works
async function displayWorks() {
  try {
    const works = await getWorks();

    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    const miniGallery = document.getElementById("mini-gallery"); // For Modal window on Edition Mode
    miniGallery.innerHTML = "";

    works.forEach((work) => {
      // Creating the DOM elements
      let newFigure = document.createElement("figure");
      let newImg = document.createElement("img");
      let newCaption = document.createElement("figcaption");

      // Setting DOM elements' attributes
      newImg.setAttribute("src", work.imageUrl);
      newImg.setAttribute("alt", work.title);

      newCaption.textContent = work.title;

      // Appending DOM elements to their respective parent
      newFigure.appendChild(newImg);

      // -----> Displaying images on Modal window on Edition Mode
      //   Need to clone it before appending to miniGallery, because when you append an element that already exists in the DOM to another location, it will be moved, not duplicated.
      let newFigureClone = newFigure.cloneNode(true);
      newFigureClone.setAttribute("id", "figure-mini-gallery");

      const trashIcon = document.createElement("icon");
      trashIcon.classList.add("fa-solid", "fa-trash-can");
      trashIcon.setAttribute("id", "trash-icon");
      trashIcon.setAttribute("data-id", work.id); // ID that will be used for deleting a work

      newFigureClone.appendChild(trashIcon);
      miniGallery.appendChild(newFigureClone);

      // Had to let these two lines down here otherwise images in the mini gallery would have a caption too, which they're not supposed to.
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
    let onlyObjetsWorks = works.filter((work) => {
      return work.category.name.toLowerCase() === "objets";
    });

    // Erasing previously displayed works on the DOM before displaying the newly filtered ones
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    onlyObjetsWorks.forEach((work) => {
      // Creating the DOM elements
      let newFigure = document.createElement("figure");
      let newImg = document.createElement("img");
      let newCaption = document.createElement("figcaption");

      // Setting DOM elements' attributes
      newImg.setAttribute("src", work.imageUrl);
      newImg.setAttribute("alt", work.title);

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
    let onlyAppartWorks = works.filter((work) => {
      return work.category.name.toLowerCase() === "appartements";
    });

    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    // Displaying each filtered work on the DOM
    onlyAppartWorks.forEach((work) => {
      // Creating the DOM elements
      let newFigure = document.createElement("figure");
      let newImg = document.createElement("img");
      let newCaption = document.createElement("figcaption");

      // Setting DOM elements' attributes
      newImg.setAttribute("src", work.imageUrl);
      newImg.setAttribute("alt", work.title);

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
    let onlyHotelsRestoWorks = works.filter((work) => {
      return work.category.name.toLowerCase() === "hotels & restaurants";
    });

    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    // Displaying each filtered work on the DOM
    onlyHotelsRestoWorks.forEach((work) => {
      // Creating the DOM elements
      let newFigure = document.createElement("figure");
      let newImg = document.createElement("img");
      let newCaption = document.createElement("figcaption");

      // Setting DOM elements' attributes
      newImg.setAttribute("src", work.imageUrl);
      newImg.setAttribute("alt", work.title);

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
document.addEventListener("DOMContentLoaded", () => {
  displayWorks();
});

// Displaying all works upon click on "Tous" button
const tous = document.getElementById("tous");
tous.addEventListener("click", () => {
  displayWorks();
});

// Filtering Object  works
const objets = document.getElementById("objets");
objets.addEventListener("click", () => {
  displayObjets();
});

// Filtering Appartment works
const appartements = document.getElementById("appartements");
appartements.addEventListener("click", () => {
  displayAppartements();
});

// Filtering Hotels and Restaurants works
const hotelsResto = document.getElementById("hotels-resto");
hotelsResto.addEventListener("click", () => {
  displayhotelsResto();
});

// *******************************************

// ******** ADMIN MODE ********* //

// Retrieving the token variable from local storage
const token = localStorage.getItem("token");

if (token) {
  console.log(token);
  // Enabling "Edition mode" DOM elements
  const bandeauEdition = document.querySelector("#bandeau-edition");
  bandeauEdition.toggleAttribute("style");

  const titreEdition = document.querySelector("#titre-edition");
  titreEdition.toggleAttribute("style");

  // Modal activation after clicking on the "Edit" icon
  const modal = document.querySelector("#modal");
  const modalWrapper = document.querySelector(".modal-wrapper");
  document.querySelector("#icone-edition").addEventListener("click", () => {
    modalWrapper.toggleAttribute("style");
    modal.toggleAttribute("style");
  });

  const closeModalIcon = document.querySelector("#close-modal-icon");
  closeModalIcon.addEventListener("click", () => {
    modalWrapper.setAttribute("style", "display:none;");
  });
  document.addEventListener("keydown", (event) => {
    console.log(event.target);
    if (event.key == "Escape" || event.key == "Esc") {
      modalWrapper.setAttribute("style", "display:none;");
    }
  });

  // DELETING works
  const miniGallery = document.getElementById("mini-gallery");
  miniGallery.addEventListener("click", (event) => {
    if (event.target && event.target.matches("#trash-icon")) {
      const dataId = event.target.getAttribute("data-id");
      console.log(dataId);
      deleteWorks(token, dataId);
    }
  });
}
