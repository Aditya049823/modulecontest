import React, { useState } from "react";

const App = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'num1') {
      setNum1(value);
    } else if (name === 'num2') {
      setNum2(value);
    }
  };

  const handleOperation = (op) => {
    if (num1 === '') {
      setError('NUM1 cannot be empty');
    }
    else if(num2 === ''){
        setError('NUM2 cannot be empty')
    } else if (!isValidNumber(num1) || !isValidNumber(num2)) {
      setError('Please enter valid numbers.');
    } else {
      setError('');
      setOperator(op);
      calculateResult(parseFloat(num1), parseFloat(num2), op);
    }
  };

  const isValidNumber = (str) => {
    return !isNaN(str) && isFinite(str);
  };

  const calculateResult = (a, b, op) => {
    switch (op) {
      case '+':
        setResult(a + b);
        break;
      case '-':
        setResult(a - b);
        break;
      case '*':
        setResult(a * b);
        break;
      case '/':
        if (b === 0) {
          setError('Division by zero is not allowed.');
          setResult('');
        } else {
          setResult(a / b);
        }
        break;
      default:
        setResult('');
        setError('Invalid operator.');
    }
  };

  return (
    <div>
      <h1>React Calculator</h1>
      <div className="values">
        <input type="text" name="num1" onChange={handleInputChange} value={num1} required placeholder="NUM1" />
        <input type="text" name="num2" onChange={handleInputChange} value={num2} required placeholder="NUM2" />
      </div>
      <div className="button">
        <button onClick={() => handleOperation('+')}>+</button>
        <button onClick={() => handleOperation('-')}>-</button>
        <button onClick={() => handleOperation('*')}>*</button>
        <button onClick={() => handleOperation('/')}>/</button>
      </div>
      {error && <div className="error">{error}</div>}
      {result!==' ' && <div className="success">Result: {result}</div>}
    </div>
  );
}

export default App;