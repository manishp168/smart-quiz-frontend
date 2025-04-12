import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// add nhi karte
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Dashboard from "./pages/Teacher/Dashboard.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import CreateQuiz from "./pages/Teacher/CreateQuiz.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import Logout from "./pages/Auth/Logout.jsx";
import Quizzes from "./pages/Teacher/Quizzes.jsx";
import StudentDashboard from "./pages/Student/StudentDashboard.jsx"
import AttemptQuiz from "./pages/Student/AttemptQuiz.jsx";
import Result from "./components/Student/Result.jsx";
import LiveQuizzes from "./pages/Student/LiveQuizzes.jsx";
import QuizHistory from "./pages/Student/QuizHistory.jsx";
import StudentList from "./components/Teacher/StudentList.jsx";
import Profile from "./components/Teacher/Profile.jsx";
import LandingPage from "./pages/Landing/LandingPage.jsx";
import LandingPageTwo from "./pages/Landing/LandingPageTwo.jsx";
import QuizDetails from "./pages/Teacher/QuizDetails.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        element={
          <ProtectedRoute allowedRoles={["teacher"]}/>
        }
      >
        <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/teacher/create-quiz" element={<CreateQuiz />} />
        <Route path="/teacher/quizzes" element={<Quizzes />} />
        <Route path="/teacher/quiz-details/:id" element={<QuizDetails />} />
        <Route
          path="/teacher/student-list"
          element={<StudentList />}
        />
        <Route path="/teacher/notification" element={<h1>Notification</h1>} />
        <Route path="/teacher/profile" element={<Profile/>} />
      </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
      <Route element={<Layout />}>
        <Route path="/home" element={<StudentDashboard />} />
        <Route path="/quizzes" element={<LiveQuizzes />} />
        <Route path="/history" element={<QuizHistory />} />
        <Route path="/progress" element={<h1>Progress Dashboard</h1>} />
        <Route path="/notification" element={<h1>Notification Dashboard</h1>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/result/:id?" element={<Result />} />
        </Route>
        <Route path="/quiz/:id" element={<AttemptQuiz />} />
      </Route>

      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/1" element={<LandingPageTwo/>}/>
      <Route path="*" element={<h1>NOT FOUND</h1>} />
    </Route>
  ), 
  // for deploy
  // {
  //   basename: "/smart-quiz"
  // }
);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </AuthContextProvider>
  // </StrictMode>
);
