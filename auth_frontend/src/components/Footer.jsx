export default function Footer() {
  return (
    <footer className="bg-gray-900 p-8">
      {/* ResumeMaster Title */}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white">ResumeMaster</h3>
      </div>

      {/* Contact Information Section */}
      <div className="mt-5 text-center text-white">
        <p>
          Contact Us:{" "}
          <a
            href="mailto:resumemaster@gmail.com"
            className="hover:text-sky-400"
          >
            resumemaster@gmail.com
          </a>
        </p>
      </div>

      {/* Copyright Section */}
      <div className="mt-5 text-center text-white">
        <p>&copy; 2025 ResumeMaster. All rights reserved.</p>
      </div>
    </footer>
  );
}
