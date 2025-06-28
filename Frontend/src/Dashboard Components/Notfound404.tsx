const NotFound404 = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-900">
        <div className="text-center p-6 bg-zinc-800 shadow-lg rounded-lg outline outline-white">
          <h1 className="text-2xl font-semibold text-red-500">404 - Page Not Found</h1>
          <p className="mt-4 text-white">
            Sorry, the page you are looking for does not exist. It might have been removed or you may have entered the URL incorrectly.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  };
  
  export default NotFound404;
  