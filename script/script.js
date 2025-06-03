// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    window.onscroll = function () {
        const top = window.scrollY;
        if (top >= 100) {
            header.classList.add("navbarDark");
        } else {
            header.classList.remove("navbarDark");
        }
    };
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarSupportedContent");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            new bootstrap.Collapse(menuToggle).toggle();
        });
    });
}

// Function to dynamically create HTML elements from the JSON file
function createSkillsFromJSON() {
  const container = document.querySelector("#skills .container");
  let row = document.createElement("div");
  row.classList.add("row");

  fetch("data/skills.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("col-lg-4", "mt-4");

        card.innerHTML = `
  <div class="card skillsText skill-card" data-index="${index}" style="cursor: pointer;">
    <div class="card-body">
      <img 
        src="images/${item.image}" 
        alt="${item.alt}" 
        class="img-fluid mb-3"
      />
      <h4 class="card-title">${item.title}</h4>
      <p class="card-text">${item.text}</p>
    </div>
  </div>
`;


        row.appendChild(card);

        if ((index + 1) % 3 === 0 || index === data.length - 1) {
          container.appendChild(row);
          row = document.createElement("div");
          row.classList.add("row");
        }
      });

      // MODAL LOGIC
      const modal = document.getElementById("modal");
      const modalTitle = document.getElementById("modal-title");
      const modalText = document.getElementById("modal-text");
      const modalClose = document.getElementById("modal-close");

      document.querySelectorAll(".skill-card").forEach((card) => {
  card.addEventListener("click", () => {
    const i = card.getAttribute("data-index");
    modalTitle.textContent = data[i].title;

    // TEXTO EXTENDIDO PERSONALIZADO (puedes reemplazar por item.longText si lo agregas al JSON)
    modalText.innerHTML = `
      <p><strong>${data[i].longText}</strong></p>
      <p style="margin-top: 10px;">Cette compétence comprend également : gestion des délais, suivi de l'avancement, communication avec les parties prenantes et ajustements stratégiques du projet si nécessaire.</p>
    `;

    modal.style.display = "block";
  });
});


      modalClose.onclick = () => modal.style.display = "none";
      window.onclick = (e) => {
        if (e.target === modal) modal.style.display = "none";
      };
    });
}

// Function to dynamically create HTML elements from the JSON file
function createPortfolioFromJSON() {
    const container = document.querySelector("#portfolio .container");
    let row = document.createElement("div");
    row.classList.add("row");

    // Load the JSON file
    fetch("data/portfolio.json")
        .then((response) => response.json())
        .then((data) => {
            // Iterate through the JSON data and create HTML elements
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `
                    <div class="card portfolioContent">
                    <img class="card-img-top" src="images/${item.image}" style="width:100%">
                    <div class="card-body">
                        <h4 class="card-title">${item.title}</h4>
                        <p class="card-text">${item.text}</p>
                        <div class="text-center">
                            <a href="${item.link}" class="btn btn-success">Lien</a>
                        </div>
                    </div>
                </div>
                `;

                // Append the card to the current row
                row.appendChild(card);


                // If the index is a multiple of 3 or it's the last element, create a new row
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        });
}

// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createPortfolioFromJSON();
