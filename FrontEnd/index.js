const apiURL = "http://localhost:5678/api/";

// *********** FUNCTIONS ***************

// GETTING works from API
async function getWorks() {
  let response = await fetch(apiURL + "works");
  let works = await response.json();
  return works;
}

// ADDING a new work
async function addWork(token, formData) {
  try {
    const response = await fetch(apiURL + "works", {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: formData,
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to add new work. ", response.status);
    }
  } catch (error) {
    console.error("Error: ", error);
  }
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

  // ADDING new works

  // Directing the user to the Add Photo modal page when he clicks on the "Ajouter une photo" button
  const modalContent1 = document.querySelector(".modal-content-1");
  const modalContent2 = document.querySelector(".modal-content-2");
  const arrowLeft = document.querySelector(".fa-arrow-left");

  document.querySelector("#add-work-btn").addEventListener("click", () => {
    modalContent1.setAttribute("style", "display:none");
    modalContent2.toggleAttribute("style");
    arrowLeft.toggleAttribute("style");
  });

  arrowLeft.addEventListener("click", () => {
    if (!modalContent2.classList.contains("style")) {
      // If there is no style="display:none" it means that modal-content-2 is being displayed and a click on the left arrow means we need to come back to modal-content-1
      modalContent1.toggleAttribute("style");
      modalContent2.setAttribute("style", "display:none");
      arrowLeft.setAttribute("style", "display:none");
    }
  });
}

// Replacing the .img-to-upload div with the uploaded image
const imgContainer = document.querySelector(".img-to-upload");
const imgInput = document.querySelector("#image");
const imgElem = document.createElement("img");

imgInput.addEventListener("change", () => {
  if (imgInput.files.length > 0) {
    // If an image has been uploaded:
    imgElem.src = URL.createObjectURL(imgInput.files[0]);

    imgContainer.innerHTML = "";
    imgContainer.appendChild(imgElem);
  }
});

// ADDING a new work through form submission and POST API request
const addWorkForm = document.querySelector("#add-work-form");
addWorkForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Grabbing all user inputs: image, title, and category
  const imgFile = imgInput.files[0];
  const title = document.querySelector("#titre-photo").value;
  const category = document.querySelector("#categorie").value;

  // Creating a FormData object that will be passed as an argument to the addWork() function
  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);

  if (imgFile) {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const fileContent = e.target.result;
      const fileObject = new File([fileContent], imgFile.name, {
        type: imgFile.type,
      });

      formData.append("image", fileObject);

      // Retrieve token from local storage
      const token = localStorage.getItem("token");

      // Call the addWork function with the token and formData
      try {
        const addedWork = await addWork(token, formData);

        // Handle the response, e.g., display a success message, update UI, etc.
        console.log("Work added successfully:", addedWork);
        await displayWorks();

        // Close the modal after form submission
        const modalWrapper = document.querySelector(".modal-wrapper");
        modalWrapper.setAttribute("style", "display:none");
      } catch (error) {
        console.error("Error adding work:", error);
      }
    };

    reader.readAsArrayBuffer(imgFile);
  }
});
