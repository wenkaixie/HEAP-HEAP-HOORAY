import axiosInstance from "../utils/axiosInstance";

// TODO: edit for specific student/instructor ID (if necessary)

async function postSignup(signup) {
    // Send signup request to backend
    const res = await axiosInstance({
      method: "post",
      url: "/signup", // may be different depending on backend
      data: signup,
    });
  
    // Respond to user if signup is successful
    return res.status === 201;
  }

async function postLogin(login) {
    // Send login request to backend
    const res = await axiosInstance({
      method: "post",
      url: "/login", // may be different depending on backend
      data: login,
    });
  
    // Respond to user if login is successful
    return res.status === 201;
  }

async function getStudentProfile() {
    // Send request to the backend to get a list of student profile attributes
    const res = await axiosInstance({
      method: "get",
      url: "/profile/student", // may be different depending on backend
    });
  
    // Return the list of student profile attributes
    return res.data;
  }

async function getInstructorProfile() {
    // Send request to the backend to get a list of instructor profile attributes
    const res = await axiosInstance({
      method: "get",
      url: "/profile/instructor", // may be different depending on backend
    });
  
    // Return the list of instructor profile attributes
    return res.data;
  }