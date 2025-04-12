import React from "react";
import { FaClipboardList, FaGraduationCap } from "react-icons/fa";
import {
  MdBlock,
  MdFormatListNumbered,
  MdGroup,
  MdLock,
  MdPublish,
  MdQuiz,
  MdTaskAlt,
} from "react-icons/md";

const Tile = ({ bg, title, count, slug }) => {
  let icon;

  if (slug === "created") {
    icon = <FaClipboardList size={26} />;
  } else if (slug === "students") {
    icon = <MdGroup size={26} />;
  } else if (slug === "unpublished") {
    icon = <MdLock size={26} />;
  } else if (slug === "create") {
    icon = <FaClipboardList size={26} />;
  } else if (slug === "quizattempted") {
    icon = <MdFormatListNumbered size={26} />;
  } else if (slug === "avaragescore") {
    icon = <MdTaskAlt size={26} />;
  } else {
    icon = <MdGroup size={26} />;
  }
  return (
    <>
      <div className={`p-6 md:p-8 rounded-lg text-white text-center ${bg}`}>
        <div className="flex items-center justify-between gap-7">
          <div className="bg-white text-black p-5 rounded-full mb-1">
            {icon}
          </div>
          <div className="text-right">
          <h1 className="font-bold text-4xl">{count}</h1>
          <p className="text-white/95 font-semibold text-center text-nowrap">
          {title}
        </p>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Tile;
