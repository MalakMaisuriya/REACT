import React from "react";

export default function DeletedList({ deletedStudents, recoverStudent }) {
  return (
    <div className="list-container">
      <h2>Recover Student List</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {deletedStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>
                <button
                  className="recover-btn"
                  onClick={() => recoverStudent(student.id)}
                >
                  Recover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}