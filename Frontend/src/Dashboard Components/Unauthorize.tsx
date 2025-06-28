
const Wrongpage404 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen  bg-zinc-900">
      <div className="text-center p-6 bg-zinc-800 shadow-lg rounded-lg outline outline-white">
        <h1 className="text-2xl font-semibold text-red-500">Access Denied</h1>
        <p className="mt-4 text-white">
          You are not authorized to view this page. Please log in to continue.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Wrongpage404;
