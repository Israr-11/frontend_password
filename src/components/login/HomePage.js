import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import "./login.css"


function HomePage() {
  const cookies = new Cookies();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        cookies.set('TOKEN', data.token, { path: '/'});
        navigate('/data', { state: { token: data.token } });
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      setError("Incorrect email or password");
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <h1>Login 🚀</h1>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div>
  <label htmlFor="password">Password</label>
  <div className="password-field">
    <input
      type={showPassword ? "text" : "password"}
      id="password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
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

      {error && <div>{error}</div>}
      <button type="submit">Log in</button>
      <p>If you don't have an account, <Link to="/register">Create One</Link> instead.</p>
    </form>
    </>
  );
}

export default HomePage;
