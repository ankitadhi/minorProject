import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I assist you today?", fromBot: true },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isChatVisible, setChatVisible] = useState(false);

  const handleSendMessage = () => {
    if (userInput.trim()) {
      // Add user message
      setMessages([...messages, { text: userInput, fromBot: false }]);
      setUserInput("");

      // Add bot response (predefined response based on user input)
      let botResponse = "";

      // Basic Greetings and Goodbyes
      const greetings = [
        "hi",
        "hello",
        "hey",
        "good morning",
        "good afternoon",
        "good evening",
        "howdy",
      ];
      const goodbyes = ["bye", "goodbye", "see you", "take care"];
      const gratitude = [
        "thank you",
        "thanks",
        "thanks a lot",
        "thanks so much",
      ];
      const inquiries = ["how are you", "what's up", "how's it going"];

      // Predefined responses for basic interactions
      if (
        greetings.some((greeting) => userInput.toLowerCase().includes(greeting))
      ) {
        botResponse = "Hello! How can I assist you today?";
      } else if (
        goodbyes.some((goodbye) => userInput.toLowerCase().includes(goodbye))
      ) {
        botResponse = "Goodbye! Have a great day!";
      } else if (
        gratitude.some((grat) => userInput.toLowerCase().includes(grat))
      ) {
        botResponse = "You're welcome! Let me know if you need any more help.";
      } else if (
        inquiries.some((inquiry) => userInput.toLowerCase().includes(inquiry))
      ) {
        botResponse =
          "I'm doing great, thank you! How can I help you with your resume today?";
      }

      // FAQ Responses
      else if (
        userInput.toLowerCase().includes("template") ||
        userInput.toLowerCase().includes("available templates")
      ) {
        botResponse =
          "We offer a variety of professional templates including modern, minimalist, and creative designs. You can choose one when creating your resume!";
      } else if (
        userInput.toLowerCase().includes("upload") ||
        userInput.toLowerCase().includes("upload resume")
      ) {
        botResponse =
          "You can upload your existing resume by clicking on the 'Upload Resume' option in the 'Parser' section.";
      } else if (
        userInput.toLowerCase().includes("change design") ||
        userInput.toLowerCase().includes("change layout")
      ) {
        botResponse =
          "You can change the design or layout of your resume at any time by selecting a different template from the available options.";
      } else if (
        userInput.toLowerCase().includes("format") ||
        userInput.toLowerCase().includes("download formats")
      ) {
        botResponse =
          "You can download your resume in PDF and TXT format after completing it.";
      } else if (
        userInput.toLowerCase().includes("add section") ||
        userInput.toLowerCase().includes("add a section")
      ) {
        botResponse =
          "To add a new section, go to the 'Edit Resume' page and select the 'Add Section' option, where you can choose from various sections like Experience, Education, Skills, etc.";
      } else if (
        userInput.toLowerCase().includes("contact") ||
        userInput.toLowerCase().includes("support")
      ) {
        botResponse =
          "You can reach out to our support team at support@resumemaster.com for further assistance.";
      } else if (
        userInput.toLowerCase().includes("pricing") ||
        userInput.toLowerCase().includes("cost")
      ) {
        botResponse =
          "Our service is free to use for basic features. For premium features, you can check out our pricing plans on the website.";
      } else if (
        userInput.toLowerCase().includes("login") ||
        userInput.toLowerCase().includes("sign in")
      ) {
        botResponse =
          "You can log in by clicking the 'Get Started' button at the top right corner of the page.";
      } else if (
        userInput.toLowerCase().includes("sign up") ||
        userInput.toLowerCase().includes("register")
      ) {
        botResponse =
          "Click on the 'Sign Up' button to create an account and start building your resume.";
      } else if (userInput.toLowerCase().includes("save")) {
        botResponse =
          "You can save your resume at any time by clicking the 'Save' button in the editor.";
      } else if (userInput.toLowerCase().includes("share")) {
        botResponse =
          "You can share your resume by clicking the 'Share' button and choosing how you'd like to share it.";
      } else if (userInput.toLowerCase().includes("download")) {
        botResponse =
          "After completing your resume, you can download it in PDF, DOCX, or TXT format.";
      } else if (
        userInput.toLowerCase().includes("career advice") ||
        userInput.toLowerCase().includes("job tips")
      ) {
        botResponse =
          "I can provide some tips! Focus on showcasing your skills, experience, and achievements in the most professional way. Make sure to tailor your resume for each job application!";
      } else if (userInput.toLowerCase().includes("what is resume master")) {
        botResponse =
          "ResumeMaster is an online platform that helps you create and download professional resumes in minutes using customizable templates and an easy-to-use editor.";
      } else if (
        userInput.toLowerCase().includes("help") ||
        userInput.toLowerCase().includes("assist")
      ) {
        botResponse =
          "Sure! How can I assist you today? Feel free to ask about resume creation or any other help you might need.";
      } else if (
        userInput.toLowerCase().includes("email") ||
        userInput.toLowerCase().includes("contact")
      ) {
        botResponse =
          "You can contact us at support@resumemaster.com for assistance.";
      } else if (
        userInput.toLowerCase().includes("payment") ||
        userInput.toLowerCase().includes("billing")
      ) {
        botResponse =
          "Our basic plan is free to use, but for advanced features, you can check out our pricing page for more details.";
      } else if (
        userInput.toLowerCase().includes("feedback") ||
        userInput.toLowerCase().includes("suggestions")
      ) {
        botResponse =
          "We welcome feedback! You can send us your suggestions at feedback@resumemaster.com.";
      } else if (
        userInput.toLowerCase().includes("resume review") ||
        userInput.toLowerCase().includes("resume feedback")
      ) {
        botResponse =
          "We don't currently offer resume reviews, but we provide tips and guidance to help you build a strong resume!";
      } else if (
        userInput.toLowerCase().includes("how to write a resume") ||
        userInput.toLowerCase().includes("resume tips")
      ) {
        botResponse =
          "When writing a resume, focus on your skills, experience, and education. Keep it concise and tailor it to the job you're applying for!";
      } else if (
        userInput.toLowerCase().includes("update resume") ||
        userInput.toLowerCase().includes("edit resume")
      ) {
        botResponse =
          "You can easily edit your resume by going to the 'Edit Resume' section and making changes to the content or layout.";
      } else {
        botResponse =
          "Thank you for your question! We'll get back to you shortly.";
      }

      // Add bot response after a delay
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponse, fromBot: true },
        ]);
      }, 1000);
    }
  };

  const toggleChatVisibility = () => {
    setChatVisible(!isChatVisible);
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Icon Button to Open Chat */}
      <div
        onClick={toggleChatVisibility}
        className="fixed bottom-8 right-8 p-4 bg-blue-500 rounded-full cursor-pointer shadow-lg hover:bg-blue-400 transition"
      >
        <i className="fas fa-comments text-white text-3xl"></i>{" "}
        {/* Chat bubble icon */}
      </div>

      {/* Chatbot Window */}
      {isChatVisible && (
        <div className="fixed bottom-0 right-0 m-8 w-80 p-4 bg-gray-800 rounded-lg shadow-lg">
          <div className="flex justify-between items-center text-white mb-4">
            <div className="text-lg font-semibold flex items-center">
              <i className="fas fa-comments text-blue-500 mr-2 text-xl"></i>{" "}
              {/* Chat logo */}
              Chat with us
            </div>
            <button
              onClick={toggleChatVisibility}
              className="text-white text-2xl"
            >
              &times; {/* Close button */}
            </button>
          </div>
          <div className="h-60 overflow-y-auto mt-4 mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  message.fromBot ? "text-left" : "text-right"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.fromBot ? "bg-blue-500" : "bg-green-500"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown} // Trigger send on Enter
              className="w-full p-2 rounded-l-lg bg-white text-black"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-r-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
