import React from "react";

const Loader = ({ loading, bgWhite = null }) => {
  return loading ? (
    <div className={`fixed h-screen w-screen top-0 flex flex-col ${bgWhite ? 'bg-[#eaeaea]' : 'bg-[#83838331]'}  border shadow-sm rounded-xl z-50`}>
      <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
        <div className="flex justify-center">
          <div
            className="animate-spin inline-block size-10 border-[6px] border-current border-t-transparent text-blue-800 rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Loader;
