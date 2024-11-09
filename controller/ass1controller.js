const fibonacci = (num) => {
  let a = 0, b = 1, temp;
  const result = [a, b];
  for (let i = 2; i < num; i++) {
    temp = a + b;
    a = b;
    b = temp;
    result.push(b);
  }
  return result;
};

exports.generateFibonacci = (req, res) => {
  const num = parseInt(req.params.num);
  if (isNaN(num) || num < 1) {
    res.status(400).json({ error: 'Invalid input' });
  } else {
    res.json(fibonacci(num));
  }
};
