import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import httpStatus from "http-status";
import Loader from "../Loader";
import { MdClose, MdSearch } from "react-icons/md";

const StudentList = () => {
  const { userData } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const getStudentList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_TEACHER_API_URL}/student-list`,
        {
          headers: {
            Authorization: `Bearer ${userData.accessToken}`,
          },
        }
      );

      if (res.status === httpStatus.OK) {
        setStudentList(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudentList();
  }, []);

  const filteredStudents = studentList.filter((student) =>
    student.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{ scrollbarWidth: "none" }}
    >
      <Loader loading={loading} />

      <div className="px-3">
        <h3 className="text-xl text-gray-800 font-semibold mt-2">
          Students List
        </h3>
        <div className="bg-white mt-2 p-4 rounded-md shadow">
          <div className="flex justify-end ">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md pr-2">
              <input
                type="text"
                className="outline-none max-w-md w-full p-2 bg-inherit rounded-md"
                placeholder="Search by name"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                required
              />
              {searchInput.length > 0 ? (
                <MdClose
                  className="text-gray-400  text-2xl font-bold"
                  onClick={() => setSearchInput("")}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="relative overflow-x-auto shadow rounded-sm mt-3">
            <table className="w-full text-sm text-left rtl:text-right text-gray-700 ">
              <thead className="text-sm text-gray-700 uppercase bg-gray-100 text-nowrap">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S.N
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Class
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents && filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr key={index} className="bg-slate-50 border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {index + 1}.
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {student.name}
                      </th>
                      <td className="px-6 py-4">
                        BCA-{student.semester}-Semester
                      </td>
                      <td className="px-6 py-4">{student.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-500">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
