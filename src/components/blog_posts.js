import Link from "next/link";

export default function Blog_Posts({ posts }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <Link href={`feed/${post.id}`}>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-400 mb-4 truncate">{post.content}</p>
                <b className="text-gray-400 mb-4">{post.user}</b>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">
                    {new Date(post.createdAt.toDate()).toLocaleDateString()}
                  </span>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    Read More
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
