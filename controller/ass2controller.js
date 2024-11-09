const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };
  
  exports.checkPrime = (req, res) => {
    const num = parseInt(req.params.num);
    if (isNaN(num)) {
      res.status(400).json({ error: 'Invalid input' });
    } else {
      res.json({ number: num, isPrime: isPrime(num) });
    }
  };
  