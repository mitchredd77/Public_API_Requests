const gallery = document.getElementById("gallery");

// Pull 12 random employees from the api
function fetchEmployees() {
    fetch('https://randomuser.me/api/?results=12')
      .then(response => response.json())
      .then(data => {
        const employees = data.results;
        employees.forEach(employee => {
          generateHTML(employee);
        });
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }

function generateHTML(employee) {
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
                </div>
                `;
    const cardDiv = document.createElement('div');
    cardDiv.innerHTML = employeeHTML;
    gallery.insertAdjacentElement('beforeend', cardDiv);
    
    cardDiv.addEventListener('click', (e) => {
      e.preventDefault();
      modalHTML(employee);
  });
  }
function modalHTML(employee) {
  const modalHTML = `
  <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src=${employee.picture.medium} alt="profile picture">
                        <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                        <p class="modal-text">${employee.email}</p>
                        <p class="modal-text cap">${employee.location.city}</p>
                        <hr>
                        <p class="modal-text">${employee.phone}</p>
                        <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                        <p class="modal-text">Birthday: ${employee.dob.date}</p>
                    </div>
                </div>
                `;
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = modalHTML;
    gallery.insertAdjacentElement('beforeend', modalDiv);
    // Add close button listener
    const closeButton = modalDiv.querySelector('#modal-close-btn');
    closeButton.addEventListener('click', () => {
        modalDiv.parentNode.removeChild(modalDiv); // Remove the modal from the DOM
    });

  }
fetchEmployees();



