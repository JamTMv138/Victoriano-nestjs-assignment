const calculateFactorial = (num) => {
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    return result;
  };
  
  exports.getFactorial = (req, res) => {
    const num = parseInt(req.params.num);
    if (isNaN(num) || num < 0) {
      res.status(400).json({ error: 'Invalid input' });
    } else {
      res.json({ number: num, factorial: calculateFactorial(num) });
    }
  };
  