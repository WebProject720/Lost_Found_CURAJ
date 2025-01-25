import { Input, Button, Button_Link, Line } from "../../components/utility/utility";


const Register = () => {

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-nowrap gap-5 flex-col ">
        <div className="py-3">
          <h1 className="text-black font-bold text-3xl">
            <center>
              Registration
            </center>
          </h1>
        </div>
        <Line />
        <form action="" className="flex flex-col gap-5">
          <Input label="Username" placeholder="Username"></Input>
          <Input label="Enrollment" placeholder="Enrollment"></Input>
          <Input label="Password" placeholder="Password"></Input>
          <div className="w-full">
            {/* <p className="text-center text-red-600">
              Invalid Email
            </p> */}
            <p className="text-center text-green-600">
              Registration Success !!
            </p>
          </div>
          <div className="flex w-full justify-center">
            <Button type="submit">Submit</Button>
          </div>
        </form>
        <Line />
        <div className="w-full flex items-center justify-center ">
          <div className="flex flex-row gap-5 flex-wrap justify-evenly w-full">
            <Button_Link to="/" className="bg-green-500">Login</Button_Link>
            <Button_Link className="bg-gray-400 text-black border-0 border-black">Forget Password</Button_Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
