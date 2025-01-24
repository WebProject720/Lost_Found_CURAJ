const Register = () => {
  return (
    <div>
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
        <label htmlFor="username" className="input-label">
          Enrollment No.
        </label>
        <div className="curaj-input">
          <input
            type="text"
            id="username"
            placeholder="Enter Enrollment"
            className="enroll-input"
          />
          <span className="email-domain">@curaj.ac.in</span>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="username" className="input-label">
          Password
        </label>
        <input
          type="password"
          id="username"
          placeholder="Enter Password"
          className="login-input"
        />
      </div>
    </div>
  );
};
export default Register;
