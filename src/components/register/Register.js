import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import "./register.css"

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/")
        // handle successful registration
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Email already exists');
    }
  };

  return (

    <form onSubmit={handleSubmit} class="registration-form">
      <h1>Register Here 🔐</h1>
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          placeholder='Enter your First Name'
          onChange={(event) => setFirstName(event.target.value)}
          required
        />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          placeholder='Enter your Last Name'
          onChange={(event) => setLastName(event.target.value)}
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder='Enter a valid email'
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <div class="password-input">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            placeholder="Enter password"
            onChange={(event) => setPassword(event.target.value)}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </button>
        </div>
      </div>
      {error && <div class="error">{error}</div>}
      <button type="submit">Register</button>
      <p>Wanna go to, <Link to="/">Login Page</Link> instead.</p>
    </form>

  );
}

export default Register;
