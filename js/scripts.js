const gallery = document.getElementById("gallery");
// Variable to hold employees from api
let allEmployees = [];
// Pull 12 random employees from the api
function fetchEmployees() {
    fetch('https://randomuser.me/api/?results=12&nat=US,CA,GB,AU,NZ,IE')
      .then(response => response.json())
      .then(data => {
        allEmployees = data.results;
        displayEmployees(allEmployees);
    })
    .catch(error => {
        console.error('Error fetching employees:', error);
    });
}
// Function to add search bar to page
function addSearchBar() {
  const searchBar = `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>`
  const search = document.querySelector('.search-container');
  search.insertAdjacentHTML('beforeend', searchBar);
}
// add search bar to page and select the search input
addSearchBar();
// Display employees based on search term
function displayEmployees(employees) {
  gallery.innerHTML = ''; // Clear the gallery first
  employees.forEach((employee, index) => {
      generateHTML(employee, index);
  });
}

// Search function for employees
const searchInput = document.getElementById('search-input');
searchInput.addEventListener("keyup", (e) => {
  const searchTerm = e.target.value.toLowerCase(); // Sanitize search term
  const filteredEmployees = allEmployees.filter(employee => {
      const fullName = `${employee.name.first} ${employee.name.last}`.toLowerCase();
      return fullName.includes(searchTerm);
  });
  displayEmployees(filteredEmployees);
});

function generateHTML(employee, index) {
    const employeeHTML = `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src=${employee.picture.thumbnail} alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="card-text">${employee.email}</p>
            <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
        </div>
    </div>`;
    const cardDiv = document.createElement('div');
    cardDiv.dataset.index = index;
    cardDiv.innerHTML = employeeHTML;
    gallery.insertAdjacentElement('beforeend', cardDiv);
    
    cardDiv.addEventListener('click', (e) => {
      e.preventDefault();
      modalHTML(employee, index);
  });
}

function modalHTML(employee, index) {
  let currentEmployeeIndex = index; // Initialize the currentEmployeeIndex
  const modalHTML = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${employee.picture.medium} alt="profile picture">
                <h3 class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.city}</p>
                <hr>
                <p class="modal-text">${employee.phone}</p>
                <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                <p class="modal-text">Birthday: ${employee.dob.date}</p>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
    </div>
    `;
  const modalDiv = document.createElement('div');
  modalDiv.innerHTML = modalHTML;
  gallery.insertAdjacentElement('beforeend', modalDiv);

  const closeButton = modalDiv.querySelector('#modal-close-btn');
  closeButton.addEventListener('click', () => {
      modalDiv.parentNode.removeChild(modalDiv);
  });

  const prevButton = modalDiv.querySelector('#modal-prev');
  prevButton.addEventListener('click', () => {
      currentEmployeeIndex = (currentEmployeeIndex - 1 + allEmployees.length) % allEmployees.length;
      const prevEmployee = allEmployees[currentEmployeeIndex];
      updateModalContent(modalDiv, prevEmployee);
  });

  const nextButton = modalDiv.querySelector('#modal-next');
  nextButton.addEventListener('click', () => {
      currentEmployeeIndex = (currentEmployeeIndex + 1) % allEmployees.length;
      const nextEmployee = allEmployees[currentEmployeeIndex];
      updateModalContent(modalDiv, nextEmployee);
  });
}

function updateModalContent(modalDiv, employee) {
  const modalText = document.querySelectorAll('.modal-text');
  modalDiv.querySelector('.modal-img').src = employee.picture.medium;
  modalDiv.querySelector('.modal-name').textContent = `${employee.name.first} ${employee.name.last}`;
  modalText[0].textContent = `${employee.email}`;
  modalText[1].textContent = `${employee.location.city}`;
  modalText[2].textContent = employee.phone;
  modalText[3].textContent = `${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}`;
  modalText[4].textContent = `Birthday: ${employee.dob.date}`;
}

fetchEmployees();
