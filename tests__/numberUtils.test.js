const { factorial, isPrime, clamp } = require('../src/numberUtils');

describe('numberUtils', () => {



  describe('factorial()', () => {

    it('devuelve el factorial correcto para un numero positivo', () => {
      expect(factorial(5)).toBe(120);
      expect(factorial(3)).toBe(6);
    });

    it('devuelve 1 cuando n es 0', () => {
      expect(factorial(0)).toBe(1);
    });

    it('lanza RangeError para numeros negativos', () => {
      expect(() => factorial(-5)).toThrow(RangeError);
      expect(() => factorial(-5)).toThrow('negativo');
    });

    it('lanza TypeError si n no es un entero', () => {
      expect(() => factorial(3.5)).toThrow(TypeError);
      expect(() => factorial('hola')).toThrow(TypeError);
    });

  });



  describe('isPrime()', () => {

    it('devuelve true para numeros primos conocidos', () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(7)).toBe(true);
      expect(isPrime(13)).toBe(true);
    });

    it('devuelve false para numeros no primos', () => {
      expect(isPrime(4)).toBe(false);
      expect(isPrime(9)).toBe(false);
    });

    it('devuelve false para 0 y 1', () => {
      expect(isPrime(0)).toBe(false);
      expect(isPrime(1)).toBe(false);
    });

    it('devuelve false para numeros negativos', () => {
      expect(isPrime(-7)).toBe(false);
    });

  });



  describe('clamp()', () => {

    it('devuelve el valor si esta dentro del rango', () => {
      expect(clamp(5, 1, 10)).toBe(5);
    });

    it('devuelve min si el valor es menor al rango', () => {
      expect(clamp(-3, 1, 10)).toBe(1);
    });

    it('devuelve max si el valor es mayor al rango', () => {
      expect(clamp(15, 1, 10)).toBe(10);
    });

    it('funciona cuando min === max', () => {
      expect(clamp(5, 5, 5)).toBe(5);
    });

    it('lanza RangeError si min > max', () => {
      expect(() => clamp(5, 10, 1)).toThrow(RangeError);
      expect(() => clamp(5, 10, 1)).toThrow('mayor');
    });

  });

});