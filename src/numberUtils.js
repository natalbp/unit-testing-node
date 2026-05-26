function factorial(n) {
 
  if (!Number.isInteger(n)) {
    throw new TypeError('El número debe ser un entero');
  }

 
  if (n < 0) {
    throw new RangeError('No se puede ingresar un número negativo');
  }

 
  if (n === 0) {
    return 1;
  }


  return n * factorial(n - 1);
}

function isPrime(n) {
  if (n < 2) {
    return false;
  }

  for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

function clamp(value, min, max) {

  if (min > max) {
    throw new RangeError('El minimo no puede ser mayor que el maximo');
  }


  return Math.min(Math.max(value, min), max);
}


module.exports = { factorial, isPrime, clamp };