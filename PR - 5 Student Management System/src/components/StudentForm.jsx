import React, { useEffect, useState } from "react";

export default function StudentForm({ addStudent, editStudent }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    course: "",
  });

  const courseOptions = [
    "BCA",
    "BBA",
    "BCom",
    "BA",
    "BSc",
    "BTech",
    "BE",
    "BEd",
    "BPharm",
    "BPT",
    "BArch",
    "MCA",
    "MBA",
    "MCom",
    "MA",
    "MSc",
    "MTech",
    "Diploma",
    "ITI",
    "Polytechnic",
  ];

  useEffect(() => {
    if (editStudent) {
      setFormData(editStudent);
    } else {
      setFormData({
        id: "",
        name: "",
        email: "",
        course: "",
      });
    }
  }, [editStudent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.course) {
      alert("Please fill all fields");
      return;
    }

    addStudent(formData);

    setFormData({
      id: "",
      name: "",
      email: "",
      course: "",
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Enter name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={formData.email}
        onChange={handleChange}
      />

      <select
        name="course"
        value={formData.course}
        onChange={handleChange}
      >
        <option value="">Select Course</option>
        {courseOptions.map((course, index) => (
          <option key={index} value={course}>
            {course}
          </option>
        ))}
      </select>

      <button type="submit">
        {editStudent ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}