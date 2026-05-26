const TaskManager = require('../src/taskManager');

describe('TaskManager', () => {
  let manager;

  beforeEach(() => {
    manager = new TaskManager();
  });

  it('una tarea nueva tiene completed false', () => {
    const task = manager.addTask('Estudiar');

    expect(task.completed).toBe(false);
  });

  it('addTask aumenta el total de tareas', () => {
    manager.addTask('Tarea 1');

    expect(manager.getAll().length).toBe(1);
  });

  it('completeTask cambia el estado sin afectar otras tareas', () => {
    const task1 = manager.addTask('Tarea 1');
    const task2 = manager.addTask('Tarea 2');

    manager.completeTask(task1.id);

    expect(task1.completed).toBe(true);
    expect(task2.completed).toBe(false);
  });

  it('removeTask disminuye tareas', () => {
    const task = manager.addTask('Tarea');

    manager.removeTask(task.id);

    expect(manager.getAll().length).toBe(0);
  });

  it('getPending no incluye completadas', () => {
    const task1 = manager.addTask('Tarea 1');
    manager.addTask('Tarea 2');

    manager.completeTask(task1.id);

    expect(manager.getPending().length).toBe(1);
  });

  it('getCompleted no incluye pendientes', () => {
    const task1 = manager.addTask('Tarea 1');
    manager.addTask('Tarea 2');

    manager.completeTask(task1.id);

    expect(manager.getCompleted().length).toBe(1);
  });

  it('id inválido lanza error', () => {
    expect(() => manager.completeTask(99))
      .toThrow(Error);

    expect(() => manager.removeTask(99))
      .toThrow(Error);
  });

  it('title vacío lanza error', () => {
    expect(() => manager.addTask(''))
      .toThrow(Error);
  });
});