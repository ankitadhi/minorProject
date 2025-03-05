// import NavBar from "./NavBar"
// import { useNavigate } from "react-router-dom";



// const Dashboard = () => {
//   const templates = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate("/resumes/edit");
//   };

//   return (
//     <div className="text-center items-center">
//       <NavBar />
//       <div>
//         <h1 className="text-2xl mb-6">Select Templates</h1>
//         <div className="grid grid-cols-3 gap-4 px-6 md:grid-cols-5 lg:grid-cols-7">
//           {templates.map((template, index) => (
//             <div
//               key={index}
//               className="border rounded-lg overflow-hidden shadow-lg"
//             >
//               <img
//                 className="cursor-pointer w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                 src={`/assets/${template}`}
//                 alt={`Template ${index + 1}`}
//                 onClick={handleClick}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideNavBar";

const Dashboard = () => {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8080/templates/templates/"
        );
        if (!response.ok) throw new Error("Failed to fetch templates");
        const data = await response.json();
        setTemplates(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };
    fetchTemplates();
  }, []);

  const handleClick = (templateId) => {
    navigate(`/resumes/edit/${templateId}`);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <h1 className="text-2xl mb-6">Select Templates</h1>
        <div className="grid grid-cols-3 gap-4 px-6 md:grid-cols-5 lg:grid-cols-7">
          {templates.map((template) => (
            <div
              key={template.id}
              className="border rounded-lg overflow-hidden shadow-lg"
            >
              <img
                className="cursor-pointer w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                src={template.image} // Directly use the image URL from API
                alt={`Template ${template.name}`}
                onClick={() => handleClick(template.id)}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
