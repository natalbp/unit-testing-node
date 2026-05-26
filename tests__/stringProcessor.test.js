const {maskEmail,reverseWords,extractHashtags} = require('../src/stringProcessor');

describe('stringProcessor', () => {

  describe('maskEmail()', () => {

    it('oculta un email normal', () => {
      expect(maskEmail('sergio@gmail.com'))
        .toBe('s****o@gmail.com');
    });

    it('devuelve el email igual si tiene un solo caracter', () => {
      expect(maskEmail('a@gmail.com'))
        .toBe('a@gmail.com');
    });

    it('lanza error si no tiene @', () => {
      expect(() => maskEmail('correo.com'))
        .toThrow(Error);
    });

  });

  describe('reverseWords()', () => {

    it('invierte las palabras', () => {
      expect(reverseWords('hola mundo node'))
        .toBe('node mundo hola');
    });

    it('maneja espacios multiples', () => {
      expect(reverseWords('hola    mundo'))
        .toBe('mundo hola');
    });

    it('devuelve vacio si no hay texto', () => {
      expect(reverseWords('')).toBe('');
      expect(reverseWords('    ')).toBe('');
    });

    it('funciona con una sola palabra', () => {
      expect(reverseWords('hola'))
        .toBe('hola');
    });

  });

  describe('extractHashtags()', () => {

    it('extrae hashtags', () => {
      expect(
        extractHashtags('Me gusta #node y #testing')
      ).toEqual(['#node', '#testing']);
    });

    it('devuelve array vacio si no hay hashtags', () => {
      expect(extractHashtags('Hola mundo'))
        .toEqual([]);
    });

    it('ignora # solo', () => {
      expect(extractHashtags('Hola #'))
        .toEqual([]);
    });

  });

});