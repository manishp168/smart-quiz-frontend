import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaChartLine,
  FaGift,
  FaTimes,
  FaRegClock,
  FaClock,
  FaSmile,
} from "react-icons/fa";
import logo from "../../assets/kkc.jpg";
import clock from "../../assets/clock.png";
import stars from "../../assets/stars.png";
import robot from "../../assets/robot.png";

const LandingPage = () => {
  // Fade-in animation with a slight bounce
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  // Scale-up animation
  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  // Rotate animation
  const rotate = {
    hidden: { opacity: 0, rotate: -90 },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  // Hover animations for cards
  const cardHover = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  // Image hover animation
  const imageHover = {
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: { type: "spring", stiffness: 200 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white z-10 py-4 px-4 md:px-16 flex justify-between items-center shadow-md">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Smart Quiz Logo" className="h-10 w-10" />
          <span className="text-2xl font-bold text-blue-600">Smart Quiz</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link
            to="/login"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once:false }}
        variants={fadeInUp}
        className="pt-32 pb-16 px-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-blue-50 to-gray-50"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="text-gray-900">Smart Quiz</span> - Your BCA Learning
          Companion
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl text-gray-600">
          Elevate your skills with AI-powered quizzes designed for BCA students
          and teachers.
        </p>
        <div className="mt-8 flex space-x-6">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Get Started
          </Link>
          <Link
            to="/signup"
            className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            Create Account
          </Link>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once:false }}
        variants={fadeInUp}
        className="py-16 px-4 md:px-16 bg-gray-100"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          What Makes Us Special
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <motion.div
            variants={scaleUp}
            whileHover="hover"
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
          >
            <div className="flex justify-center mb-4">
              <motion.img
                src={robot}
                className="max-w-16 max-h-16 h-full w-full"
                variants={imageHover}
              />
            </div>
            <h3 className="text-2xl font-semibold text-blue-600 mb-3 text-center">
              AI Quiz Generator
            </h3>
            <p className="text-gray-600 text-center">
              Effortlessly create quizzes with AI, tailored for BCA topics by
              teachers.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            variants={scaleUp}
            whileHover="hover"
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
          >
            <div className="flex justify-center mb-4">
              <motion.img
                src={clock}
                className="max-w-12 max-h-12 h-full w-full"
                variants={imageHover}
              />
            </div>
            <h3 className="text-2xl font-semibold text-blue-600 mb-3 text-center">
              Timed Quizzes
            </h3>
            <p className="text-gray-600 text-center">
              Challenge yourself with timed quizzes and improve your speed.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            variants={scaleUp}
            whileHover="hover"
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
          >
            <div className="flex justify-center mb-4">
              <motion.img
                src={stars}
                className="max-w-12 max-h-12 h-full w-full"
                variants={imageHover}
              />
            </div>
            <h3 className="text-2xl font-semibold text-blue-600 mb-3 text-center">
              Simple & Free
            </h3>
            <p className="text-gray-600 text-center">
              A user-friendly platform, completely free for BCA learners.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once:false }}
        variants={rotate}
        className="py-16 bg-blue-600 text-center text-white"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Get Smarter?</h2>
        <p className="text-lg mb-6">
          Join Smart Quiz and transform the way you learn and teach.
        </p>
        <Link
          to="/signup"
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-md"
        >
          Sign Up Today
        </Link>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once:false }}
        variants={fadeInUp}
        className="bg-gray-800 py-6 text-center text-gray-300"
      >
        <p>
          © 2025 Smart Quiz. Developed by{" "}
          <span className="text-blue-400 font-semibold">Manish Choudhary</span>.
        </p>
      </motion.footer>
    </div>
  );
};

export default LandingPage;