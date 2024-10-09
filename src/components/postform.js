import FormSubmit from "./post-submit";
import { useFormState } from "react-dom";
export default function PostForm({
  handleSubmit,
  handleFileChange,
  error,
  title,
  content,
  user,
  setContent,
  setTitle,
  setUser,
}) {
  const[state,formaction]=useFormState(handleSubmit,{})
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">
            Create New Post
          </h1>
          <form className="space-y-6" action={formaction}>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Image
              </label>
              <input
                type="file"
                accept="image/jpg, image/png"
                id="image"
                name="image"
                onChange={handleFileChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600"
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white resize-none"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="user"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                User
              </label>
              <input
                type="text"
                id="user"
                name="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white resize-none"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <FormSubmit />
            </div>
          </form>
          
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
