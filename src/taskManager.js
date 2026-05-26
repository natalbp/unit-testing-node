class TaskManager {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  addTask(title) {
    if (title === '') {
      throw new Error('Titulo vacio');
    }

    const task = {
      id: this.nextId++,
      title,
      completed: false,
      createdAt: new Date()
    };

    this.tasks.push(task);
    return task;
  }

  completeTask(id) {
    const task = this.tasks.find(t => t.id === id);

    if (!task) {
      throw new Error('ID no existe');
    }

    task.completed = true;
  }

  removeTask(id) {
    const task = this.tasks.find(t => t.id === id);

    if (!task) {
      throw new Error('ID no existe');
    }

    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  getPending() {
    return this.tasks.filter(t => t.completed === false);
  }

  getCompleted() {
    return this.tasks.filter(t => t.completed === true);
  }

  getAll() {
    return this.tasks;
  }
}

module.exports = TaskManager;