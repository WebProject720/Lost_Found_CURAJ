import { Loader, Input, Button, Button_Link, Line } from "../../components/utility/utility";



const Login = () => {
  return (
    <div>
      <div className="flex flex-nowrap gap-5 flex-col ">
        <div className="py-3">
          <h1 className="text-black font-bold text-3xl">
            <center>
              Login Portal
            </center>
          </h1>
        </div>
        <Line />
        <form action="" className="flex flex-col gap-5">
          <Input label="Username" placeholder="Username"></Input>
          <Input label="Password" placeholder="Password"></Input>
          <div className="flex w-full justify-center">
            <Button type="submit">Submit</Button>
          </div>
        </form>
        <div className="w-full flex justify-center">
          <Loader >
            Loading...
          </Loader>
        </div>
        <Line />
        <div className="w-full flex items-center justify-center ">
          <div className="flex flex-row gap-5 flex-wrap justify-evenly w-full">
            <Button_Link to="/register" className="bg-green-500">Register</Button_Link>
            <Button_Link className="bg-gray-400 text-black border-0 border-black">Forget Password</Button_Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
