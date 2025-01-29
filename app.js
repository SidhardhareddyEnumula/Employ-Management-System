angular.module('employeeApp', [])
  .controller('employeeController', function($scope, $http) {
    // Fetch employees from the API endpoint
    $http.get('http://localhost:3000/api/employees')  // Make sure this matches the backend route
      .then(function(response) {
        console.log(response.data);  // Log the employee data to verify

        // Map each employee's properties to lowercase keys for Angular compatibility
        $scope.employees = response.data.map(employee => ({
          id: employee.ID,
          name: employee.NAME,
          position: employee.POSITION,
          salary: employee.SALARY
        }));
      })
      .catch(function(error) {
        console.error('Error fetching employees:', error);
      });

    // For adding a new employee
    $scope.newEmployee = {};

    $scope.addEmployee = function() {
      $http.post('http://localhost:3000/api/employees', $scope.newEmployee)
        .then(function(response) {
          console.log('Employee added successfully:', response.data);
          $scope.employees.push(response.data);  // Add new employee to list
          $scope.newEmployee = {};  // Reset form
        })
        .catch(function(error) {
          console.error('Error adding employee:', error);
        });
    };

    // For updating an employee
    $scope.updatedEmployee = {};

    $scope.updateEmployee = function() {
      $http.put('http://localhost:3000/api/employees', $scope.updatedEmployee)
        .then(function(response) {
          console.log('Employee updated successfully:', response.data);
          
          // Update employee in the list
          const index = $scope.employees.findIndex(employee => employee.id === $scope.updatedEmployee.id);
          if (index !== -1) {
            $scope.employees[index] = response.data;
          }

          $scope.updatedEmployee = {};  // Reset form
        })
        .catch(function(error) {
          console.error('Error updating employee:', error);
        });
    };

    // For deleting an employee
    $scope.employeeToDelete = {};

    $scope.deleteEmployee = function() {
      $http.delete('http://localhost:3000/api/employees/' + $scope.employeeToDelete.id)
        .then(function(response) {
          console.log('Employee deleted successfully:', response.data);
          
          // Remove deleted employee from the list
          const index = $scope.employees.findIndex(employee => employee.id === $scope.employeeToDelete.id);
          if (index !== -1) {
            $scope.employees.splice(index, 1);
          }

          $scope.employeeToDelete = {};  // Reset form
        })
        .catch(function(error) {
          console.error('Error deleting employee:', error);
        });
    };
  });
