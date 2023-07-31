import React from "react";

export const CommonButton = ({ title,isSelected=false, isButtonsDisabled = false , handleClick }) => {
  return (
      <button
        key={title}
        className={ ((title === "START") || (title === "RESET")) ? ("start-button")  : isSelected ? ("selected-speed") : ("not-selected-speed") }
        disabled={isButtonsDisabled}
        onClick={handleClick}
        type="button"
      >
        {title}
      </button>
  );
};
