import React from "react";

interface Props {
  direction: number;
  onClickArrow: (direction: number) => void;
  position: number;
  maxWidth: number;
}

const Arrow: React.FunctionComponent<Props> = ({
  direction,
  onClickArrow,
  position,
  maxWidth,
}) => {
  return (
    <React.Fragment>
      {((direction === -1 && position !== 0) ||
        (direction === 1 && position <= maxWidth)) && (
        <button type="button" onClick={() => onClickArrow(direction)}>
          {direction === -1 ? <>&#60;</> : <>&#62;</>}
        </button>
      )}
    </React.Fragment>
  );
};
export default Arrow;
