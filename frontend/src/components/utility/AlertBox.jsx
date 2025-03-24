const AlertBox = ({ param }) => {
  return (
    <div
      className="fixed w-screen h-screen right-0 left-0 bottom-0 top-0
         bg-black bg-opacity-70 flex justify-center items-center z-20"
    >
      <div className="bg-slate-500  bg-transparent text-white w-1/2 h-1/4 rounded-md flex justify-center items-center
      Max650:w-4/5
      ">
        {param.Loader && (
          <div className="Loader size-full text-xl flex justify-center items-center">
            <div
              className=" size-24 rounded-full animate-spin origin-center
               bg-transparent border-white border-l-4 border-r-4 border-t-0"
            ></div>
          </div>
        )}
        {!param.Loader && (
          <div
            className={`border-x-4  ${
              param.type
                ? "bg-green-300 border-white"
                : "bg-red-500 border-white"
            }   size-full rounded-md flex flex-col gap-2 justify-center items-center
            `}
          >
            <p className="text-blue-50 text-4xl font-extralight text-center">{param.Msg}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { AlertBox };