export const PageNotFound = () => {
  return (
    <div className="flex flex-col w-full h-[100vh] bg-gray-100 text-gray-800 items-center justify-center">
      <h1 className="font-bold text-[10rem]">404</h1>
      <h4 className="font-semibold text-[2rem]">Page Not Found</h4>
      <a className="font-semibold text-[1.3rem] text-blue-500 mt-5" href="/">Go Back Home</a>
    </div>
  );
};
