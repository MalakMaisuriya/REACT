const BASE_URL = 'http://localhost:5000/tasks';

export const api = {
  async fetchTasks() {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.statusText}`);
    }
    return response.json();
  },

  async createTask(task) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...task,
        createdAt: new Date().toISOString(),
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to create task: ${response.statusText}`);
    }
    return response.json();
  },

  async updateTask(id, taskData) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update task: ${response.statusText}`);
    }
    return response.json();
  },

  async deleteTask(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete task: ${response.statusText}`);
    }
    return response.json();
  },
};
