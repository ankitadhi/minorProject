import Chatbot from "./ChatBot";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

    const handleClick = () => {
      navigate("/resumes");
    };
  return (
    <div className="bg-gray-100 text-gray-900">
      <NavBar />

      {/* Hero Section */}
      <header
        className="p-24 bg-cover bg-center text-center text-white flex flex-col items-center justify-center min-h-screen"
        style={{ backgroundImage: "url('/assets/io.jpeg')", opacity: "15"}}
      >
        <h1 className="text-6xl font-extrabold drop-shadow-lg">
          Build Your Dream Resume
        </h1>
        <p className="mt-4 text-2xl max-w-2xl">
          Create a standout resume in minutes with our easy-to-use builder.
        </p>
        <button
          className="mt-8 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all"
          onClick = {handleClick}
        >
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <section className="py-20 px-10 bg-white text-center">
        <h2 className="text-5xl font-bold mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-8 bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all">
            <h3 className="text-2xl font-semibold mb-4">Template Variety</h3>
            <p className="text-gray-300">
              Choose from a wide range of professional templates.
            </p>
          </div>
          <div className="p-8 bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all">
            <h3 className="text-2xl font-semibold mb-4">Auto Formatting</h3>
            <p className="text-gray-300">
              Automatically format your resume with consistent styling.
            </p>
          </div>
          <div className="p-8 bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all">
            <h3 className="text-2xl font-semibold mb-4">Real-Time Editing</h3>
            <p className="text-gray-300">
              Edit your resume in real time and see instant feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-900 py-20 px-10 text-center text-white">
        <h2 className="text-5xl font-bold mb-12">
          Hear from our awesome users!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-8 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all">
            <p className="text-lg italic">
              “ResumeMaster made job applications a breeze!”
            </p>
            <span className="block mt-4 font-semibold">- Emily Johnson</span>
          </div>
          <div className="p-8 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all">
            <p className="text-lg italic">
              “Effectively created a professional resume in minutes.”
            </p>
            <span className="block mt-4 font-semibold">- Michael Smith</span>
          </div>
          <div className="p-8 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all">
            <p className="text-lg italic">
              “Impressive templates that landed me interviews.”
            </p>
            <span className="block mt-4 font-semibold">- Sophia Lee</span>
          </div>
        </div>
      </section>
      {/* chatbot */}
      <Chatbot/>

      {/* Footer */}
      <section>
        <Footer/>
      </section>
    </div>
  );
};

export default Home;
