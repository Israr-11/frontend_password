import React from 'react';
import { Link } from 'react-router-dom';
import './AuthMessage.css'; // Import the CSS file


const AuthMessage = () => {
  return (
    <div className="auth-message-container">
      <p>
        Authentication failed. Please{' '}
        <Link to="/" className="login-link">
          login
        </Link>{' '}
        first to continue.
        <br/>
        <br/>
        NOTE: If you entered correct credentials and are redirected here then click{" "}
            <span
              style={{ fontWeight: "bold", cursor: "pointer", color: "blue", textDecoration: "underline" }}
              onClick={() => window.location.reload()}
            >
              HERE
            </span>{" "}
                 </p>
    </div>
  );
};

export default AuthMessage;

