import React, { useState, useEffect } from 'react';

const EmployeePage = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState({});
  const [form, setForm] = useState(new Array(8).fill({ project: '', task: '', details: '' }));
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/api/Projects');
      const data = await response.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const handleProjectChange = async (index, projectId) => {
    const updatedForm = [...form];
    updatedForm[index].project = projectId;
    setForm(updatedForm);

    if (!tasks[projectId]) {
      const response = await fetch(`/api/Tasks/${projectId}`);
      const data = await response.json();
      setTasks((prev) => ({ ...prev, [projectId]: data }));
    }
  };

  const handleSave = () => {
    console.log('Form saved temporarily:', form);
  };

  const handlePost = async () => {
    try {
      await fetch('/api/Sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, form }),
      });
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error posting form:', error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Daily Task Form</h1>
      <div>
        <label>Date:</label>
        <input
          type="date"
          className="mb-4 p-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      {form.map((entry, index) => (
        <div key={index} className="mb-4 p-4 bg-white shadow-md rounded">
          <h2 className="text-lg font-semibold">Hour {index + 1}</h2>
          <select
            className="w-full mb-2 p-2 border rounded"
            value={entry.project}
            onChange={(e) => handleProjectChange(index, e.target.value)}
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
          <select
            className="w-full mb-2 p-2 border rounded"
            value={entry.task}
            onChange={(e) => {
              const updatedForm = [...form];
              updatedForm[index].task = e.target.value;
              setForm(updatedForm);
            }}
          >
            <option value="">Select Task</option>
            {(tasks[entry.project] || []).map((task) => (
              <option key={task.id} value={task.id}>{task.name}</option>
            ))}
          </select>
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Additional details"
            value={entry.details}
            onChange={(e) => {
              const updatedForm = [...form];
              updatedForm[index].details = e.target.value;
              setForm(updatedForm);
            }}
          />
        </div>
      ))}
      <button className="bg-green-500 text-white py-2 px-4 rounded mr-4" onClick={handleSave}>Save</button>
      <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handlePost}>Post</button>
    </div>
  );
};

export default EmployeePage;