"use client";

import { useFormStatus } from "react-dom";

export default function FormSubmit() {
  const status = useFormStatus();

  if (status.pending) {
    return (
      <p className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
        Creating post...
      </p>
    );
  }

    return (
        <>
          <button
            type="reset"
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Add Post
          </button>
        </>
      );
}
  

{
  /* <button
        type="reset"
        className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Reset
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        Add Post
      </button> */
}
