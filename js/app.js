const url = "https://randomuser.me/api/" 
// Pull 12 random employees from the api
function fetchEmployees() {
    fetch('https://randomuser.me/api/?results=12')
      .then(response => response.json())
      .then(data => {
        const employees = data.results;
        employees.forEach(employee => {
          console.log(employee);
        });
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }

function displayEmployees(employee) {
    
}