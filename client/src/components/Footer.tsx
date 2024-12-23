import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-600 py-4 text-center text-white">
      <p className="text-sm">
        Designed and developed by{" "}
        <span className="font-bold hover:underline">
          <Link to={"https://www.linkedin.com/in/sooryakrishna/"}>
            Soorya Krishna
          </Link>
        </span>{" "}
        with ❤️
      </p>
    </footer>
  );
};

export default Footer;
