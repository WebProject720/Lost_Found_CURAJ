import Button_Link from "../../components/utility/btn_link";
import { Button } from "../../components/utility/button";

const Register = () => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="font-bold text-2xl">
          <center>
            Registration
          </center>
        </h1>
      </div>
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

      <div className="input-group ">
        <label htmlFor="username" className="input-label">
          Enrollment No.
        </label>
        <div className="flex  flex-row gap-0 w-full border-[1px] rounded-[5px] border-gray-400">
          <input
            type="text"
            id="enrollment"
            placeholder="Enter Enrollment"
            className="w-4/6 border-0 outline-0 p-1.5"
          />
          <span className="w-2/6 bg-gray-200 p-1.5 text-xl text-gray-600 font-light rounded-r-[5px]">@curaj.ac.in</span>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="username" className="input-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter Password"
          className="login-input"
        />
      </div>
      <div className="mb-1">
        <Button value='Register' type="submit"></Button>
      </div>
      <div className="w-full flex flex-row justify-between  flex-wrap">
        <Button_Link to={'/'} className="">Back To Login</Button_Link>
        <Button_Link to={'/Reset'} className="">Reset Password</Button_Link>
      </div>
    </div>
  );
};
export default Register;
