import React from 'react'

const Table = () => {
  return (
    <div className="relative overflow-x-auto shadow rounded-sm mt-3">
          <table className="w-full text-sm text-left rtl:text-right text-gray-700 ">
            <thead className="text-sm text-gray-700 uppercase bg-gray-100 text-nowrap">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Quiz Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Participates
                </th>
                <th scope="col" className="px-6 py-3">
                  Avarage Score
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {quizzes && quizzes.length > 0 ? (
                quizzes.map((obj, index) => (
                  <tr key={index} className="bg-slate-50 border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {obj.title}
                    </th>
                    <td className="px-6 py-4">{obj.totalParticipated}</td>
                      <td className="px-6 py-4">{obj.avarageScore}/{obj.questions.length}</td>
                    <td className="px-6 py-4 flex gap-3">
                      <button
                        className="bg-blue-500 text-white py-2 px-6 rounded-md"
                        onClick={() => editBtnHandler(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white py-2 px-6 rounded-md"
                        onClick={() => deleteQuiz(obj._id)}
                      >
                        Delete
                      </button>
                    </td>
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
  )
}

export default Table