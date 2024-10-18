import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-gray-900 to-black flex flex-col items-center justify-center text-white">
      <div className="max-w-lg text-center">
        {/* Error Code */}
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-pulse">
          404
        </h1>
        {/* Error Message */}
        <h2 className="mt-4 text-3xl font-bold">
          Oops! Page Not Found
        </h2>
        <p className="mt-4 text-gray-300 text-lg">
          The page you are looking for might have been removed or temporarily unavailable.
        </p>  

        {/* Call to Action */}
        <div className="mt-8">
          <Link href="/"> Retun to Home
            
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-pink-500 to-indigo-500 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute top-10 right-10 w-48 h-48 bg-gradient-to-l from-yellow-500 to-red-500 opacity-20 rounded-full blur-3xl"></div>
    </div>
  );
};

export default NotFoundPage;
