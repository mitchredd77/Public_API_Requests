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
  const body = document.querySelector('body');
  const modalHTML = `
  <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                        <p class="modal-text">email</p>
                        <p class="modal-text cap">city</p>
                        <hr>
                        <p class="modal-text">(555) 555-5555</p>
                        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                        <p class="modal-text">Birthday: 10/21/2015</p>
                    </div>
                </div>
                `;
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = modalHTML;
    body.insertAdjacentHTML('beforeend', modalDiv);
  }
fetchEmployees();


//  Don't use body to select for the modal. Select within the function..
