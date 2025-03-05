import NavBar from "./NavBar";

export default function AboutUs() {
  return (
    <div className="bg-gray-800 text-white min-h-screen">
      {/* Navbar at the top */}
      <NavBar />

      {/* Main content container */}
      <div className="max-w-5xl mx-auto p-8 text-center">
        <h2 className="text-4xl font-bold mb-12">Meet the Team</h2>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Team Member Cards */}
          {[
            {
              name: "Ankit Adhikari",
              role: "Fullstack Developer",
              img: "assets/ankit.jpg",
            },
            {
              name: "Eron Panta",
              role: "AI/ML Developer",
              img: "assets/eron.jpg",
            },
            {
              name: "Bikrant Pudasaini",
              role: "Frontend Developer",
              img: "assets/bikrant.jpg",
            },
            {
              name: "Aayush Nepal",
              role: "Frontend Developer",
              img: "assets/aayush.jpg",
            },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-48 h-48 rounded-full mx-auto border-4 border-teal-500"
              />
              <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
              <p className="text-lg text-gray-300">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
