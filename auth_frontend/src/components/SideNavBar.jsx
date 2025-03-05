import { Link } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg">
      <div className="p-6">
        <div className="mb-8">
          <Link
            to="/"
            className="flex items-center space-x-3 text-black hover:text-blue-600"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="text-lg font-medium">Back to Home</span>
          </Link>
        </div>

        <div className="space-y-4">
          <Link
            to="/resumes"
            className="flex items-center space-x-3 rounded-lg p-3 text-black hover:bg-gray-100 hover:text-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span className="font-medium">Resumes</span>
          </Link>

          <Link
            to="/parser"
            className="flex items-center space-x-3 rounded-lg p-3 text-black hover:bg-gray-100 hover:text-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 6V4m0 2a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m-6 8a2 2 0 1 0 0-4m0 4a2 2 0 1 1 0-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 1 0 0-4m0 4a2 2 0 1 1 0-4m0 4v2m0-6V4" />
            </svg>
            <span className="font-medium">Parse</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
