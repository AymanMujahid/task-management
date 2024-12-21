import React, { useState, useEffect } from "react";
import TaskDropdown from "./TaskDropdown";

const TaskForm = ({ projects, onSubmit }) => {
  const [tasks, setTasks] = useState({});
  const [formData, setFormData] = useState(
    Array(8).fill({ projectId: "", taskId: "", details: "" })
  );

  const handleProjectChange = (index, projectId) => {
    fetch(`/api/Tasks/${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        setTasks((prev) => ({ ...prev, [index]: data }));
        const updatedFormData = [...formData];
        updatedFormData[index].projectId = projectId;
        setFormData(updatedFormData);
      });
  };

  const handleTaskChange = (index, taskId) => {
    const updatedFormData = [...formData];
    updatedFormData[index].taskId = taskId;
    setFormData(updatedFormData);
  };

  const handleDetailsChange = (index, details) => {
    const updatedFormData = [...formData];
    updatedFormData[index].details = details;
    setFormData(updatedFormData);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-4"
    >
      {formData.map((hour, index) => (
        <div key={index} className="p-4 border border-gray-300 rounded">
          <h3 className="font-semibold">Hour {index + 1}</h3>
          <TaskDropdown
            label="Project"
            options={projects}
            value={hour.projectId}
            onChange={(value) => handleProjectChange(index, value)}
          />
          <TaskDropdown
            label="Task"
            options={tasks[index] || []}
            value={hour.taskId}
            onChange={(value) => handleTaskChange(index, value)}
          />
          <textarea
            value={hour.details}
            onChange={(e) => handleDetailsChange(index, e.target.value)}
            placeholder="Details (optional)"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
      ))}
      <button
        type="submit"
        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default TaskForm;