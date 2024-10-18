"use client";
export default function FilterError({ error }) {
  return (
    <div>
        <span className=" block text-center m-8 ">
        <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        {" "}
        An Error Occured
      </h1>
      <p className=" text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        {error.message}
      </p>
        </span>
      
    </div>
  );
}
