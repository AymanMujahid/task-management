import React from "react";

const TaskDropdown = ({ label, options, onChange, value }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskDropdown;