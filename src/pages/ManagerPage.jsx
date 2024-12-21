import React, { useState, useEffect } from 'react';

const ManagerPage = () => {
  const [subordinates, setSubordinates] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchSubordinates = async () => {
      const response = await fetch('/api/Users/subordinates');
      const data = await response.json();
      setSubordinates(data);
    };
    fetchSubordinates();
  }, []);

  const handleEmployeeClick = async (employeeId) => {
    const response = await fetch(`/api/Sheet?employeeId=${employeeId}`);
    const data = await response.json();
    setForms(data);
    setSelectedEmployee(employeeId);
  };

  const handleUpdateStatus = async (formId, status) => {
    try {
      await fetch('/api/Sheet/updatestatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formId, status }),
      });
      alert(`Form ${status}`);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>
      <div className="flex">
        <div className="w-1/3 bg-white shadow-md rounded p-4">
          <h2 className="text-lg font-bold mb-4">Employees</h2>
          {subordinates.map((employee) => (
            <div
              key={employee.id}
              className="cursor-pointer p-2 hover:bg-gray-200"
              onClick={() => handleEmployeeClick(employee.id)}
            >
              {employee.name}
            </div>
          ))}
        </div>
        <div className="w-2/3 bg-white shadow-md rounded p-4 ml-4">
          <h2 className="text-lg font-bold mb-4">Employee Forms</h2>
          {selectedEmployee && forms.map((form) => (
            <div key={form.id} className="mb-4 p-4 border rounded">
              <h3 className="text-lg font-semibold">Date: {form.date}</h3>
              {form.tasks.map((task, index) => (
                <div key={index} className="mb-2">
                  <p><strong>Hour {index + 1}:</strong> {task.project} - {task.task}</p>
                  <p>Details: {task.details}</p>
                </div>
              ))}
              <button
                className="bg-green-500 text-white py-1 px-3 rounded mr-2"
                onClick={() => handleUpdateStatus(form.id, 'approved')}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded"
                onClick={() => handleUpdateStatus(form.id, 'rejected')}
              >
                Reject
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagerPage;
