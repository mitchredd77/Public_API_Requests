const url = "https://randomuser.me/api/" 
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
  }

fetchEmployees()