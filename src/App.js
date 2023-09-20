import React, { useState } from 'react';
import './App.css';
import employeesData from './data';


function App() {
  const [employees, setEmployees] = useState(employeesData[0].employees);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');


  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term === '') {
      setEmployees(employeesData[0].employees); // Update this line to access the correct array
    } else {
      const filteredEmployees = employeesData[0].employees.filter((employee) => {
        const fullName = `${employee.first_name} ${employee.last_name}`.toLowerCase();
        return fullName.includes(term.toLowerCase());
      });
      setEmployees(filteredEmployees);
    }
    setCurrentPage(1);
  };

  const handleSort = () => {
    if (sortOrder === 'asc') {
      const sortedEmployees = [...employees].sort((a, b) =>
        `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`)
      );
      setEmployees(sortedEmployees);
      setSortOrder('desc');
    } else {
      const sortedEmployees = [...employees].sort((a, b) =>
        `${b.first_name} ${b.last_name}`.localeCompare(`${a.first_name} ${a.last_name}`)
      );
      setEmployees(sortedEmployees);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };
  
  
  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div className="App">
      <h1 className='heading'>Employee Management</h1>
      <input
        className='input-bar'
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={handleSort} className='btn'>
        Sort by Name {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
      </button>

      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Salary</th>
            <th>Skills-Programming</th>
            <th>Languages</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.employee_id}>
              <td>{employee.employee_id}</td>
              <td>{`${employee.first_name} ${employee.last_name}`}</td>
              <td>{formatDate(employee.date_of_birth)}</td>
              <td>${employee.salary.toFixed(2)}</td>
              <td>{employee.skills.programming.join(',')}</td>
              <td>{employee.skills.languages.join(',')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(employees.length / employeesPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
