import { Link } from "react-router";
import { Button } from "../../components/utility/button";

const Login = () => {
  return (
    <div>
      <h2 className="login-title">Login Portal</h2>
      <form className="login-form">
        <div className="input-group">
          <label htmlFor="username" className="input-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            className="login-input"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" className="input-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            className="login-input"
          />
        </div>
        <div>
          <Button value='Login'></Button>
        </div>
      </form>
      <div className="bottom-buttons">
        <Link className="new-registration" to="/register">
          New Reg
        </Link>
        <Link className="reset-button" to="/reset">
          Reset Password
        </Link>
        {/* <button onClick={()=>navigate('/register')} className="new-registration">New Registration</button>
              <button className="reset-button">Reset Password</button> */}
      </div>
    </div>
  );
};

export default Login;
