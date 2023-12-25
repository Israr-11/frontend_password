import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { GoogleLogin } from "react-google-login";
import Cookies from "universal-cookie";
import "./login.css";

function HomePage() {
  const cookies = new Cookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://password-protector.cyclic.app/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        const { token } = data.user;
        
        // Use the Promise returned by cookies.set to wait for it to complete
        await new Promise((resolve) => {
          cookies.set("TOKEN", data.user.token, { path: "/" });
          resolve();
        });
        
        console.log("Navigating to /data");
        navigate("/data", { state: { token } });
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Incorrect email or password");
    }
  };
  

  // //Handle Success
  // const handleGoogleLoginSuccess = (response) => {
  //   console.log(response);
  // };

  // //Handle Failure
  // const handleGoogleLoginFailure = (error) => {
  //   console.log(error);
  // };


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
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
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

        {/* Google Sign-in */}
{/* 
        <GoogleLogin
          clientId="905359159778-ugjr6n0rdpviu4d950u0i8kk2rnse9n9.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy={"single_host_origin"}
          redirectUri="https://password-email-saver.netlify.app/data"
        /> */}

        <p>
          If you don't have an account, <Link to="/register">Create One</Link>{" "}
          instead.
        </p>
      </form>
    </>
  );
}

export default HomePage;
