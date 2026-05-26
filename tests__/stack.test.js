const Stack = require('../src/stack');

describe('Stack', () => {
  let stack;

  // beforeEach garantiza que cada test empiece con un stack vacío
  beforeEach(() => {
    stack = new Stack();
  });

  it('Inicia el vacío', () => {
    expect(stack.isEmpty()).toBe(true);
    expect(stack.size).toBe(0);
  });

  it('Push agrega elementos y aumenta el tamaño', () => {
    stack.push('A');
    stack.push('B');
    expect(stack.size).toBe(2);
  });

  it('Pop devuelve el último elemento agregado', () => {
    stack.push(10);
    stack.push(20);

    const result = stack.pop();

    expect(result).toBe(20);
    expect(stack.size).toBe(1);   // queda un elemento
  });

  it('Pop lanza error si el stack está vacío', () => {
    expect(() => stack.pop()).toThrow('El stack está vacío.');
  });

  it('Peek devuelve el tope sin eliminarlo', () => {
    stack.push('X');
    expect(stack.peek()).toBe('X');
    expect(stack.size).toBe(1);   // sigue intacto
  });
});