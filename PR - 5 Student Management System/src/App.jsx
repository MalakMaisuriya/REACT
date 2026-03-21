import React, { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import DeletedList from "./components/DeletedList";
import "./App.css";

export default function App() {
  const [students, setStudents] = useState([]);
  const [deletedStudents, setDeletedStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);

  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem("students")) || [];
    const savedDeletedStudents =
      JSON.parse(localStorage.getItem("deletedStudents")) || [];

    setStudents(savedStudents);
    setDeletedStudents(savedDeletedStudents);
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("deletedStudents", JSON.stringify(deletedStudents));
  }, [deletedStudents]);

  const addStudent = (student) => {
    if (editStudent) {
      const updatedStudents = students.map((s) =>
        s.id === student.id ? student : s
      );
      setStudents(updatedStudents);
      setEditStudent(null);
    } else {
      setStudents([...students, { ...student, id: Date.now() }]);
    }
  };

  const deleteStudent = (id) => {
    const studentToDelete = students.find((s) => s.id === id);
    if (!studentToDelete) return;

    setStudents(students.filter((s) => s.id !== id));
    setDeletedStudents([...deletedStudents, studentToDelete]);

    if (editStudent && editStudent.id === id) {
      setEditStudent(null);
    }
  };

  const recoverStudent = (id) => {
    const studentToRecover = deletedStudents.find((s) => s.id === id);
    if (!studentToRecover) return;

    setDeletedStudents(deletedStudents.filter((s) => s.id !== id));
    setStudents([...students, studentToRecover]);
  };

  const editStudentData = (student) => {
    setEditStudent(student);
  };

  return (
    <div className="container">
      <h1>Student CRUD App</h1>

      <StudentForm addStudent={addStudent} editStudent={editStudent} />

      <StudentList
        students={students}
        deleteStudent={deleteStudent}
        editStudentData={editStudentData}
      />

      {deletedStudents.length > 0 && (
        <DeletedList
          deletedStudents={deletedStudents}
          recoverStudent={recoverStudent}
        />
      )}
    </div>
  );
}