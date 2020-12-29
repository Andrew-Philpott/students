import React from "react";
import Circle from "../assets/circle.png";
import Comment from "../assets/comment.png";
import Moon from "../assets/moon.png";
import Star from "../assets/star.png";
import Triangle from "../assets/triangle.png";
import X from "../assets/x.png";
import Arrow from "./Arrow";

const initialState = [
  { img: Circle, path: "circle" },
  { img: Comment, path: "comment" },
  { img: Moon, path: "moon" },
  { img: Star, path: "star" },
  { img: Triangle, path: "triangle" },
  { img: X, path: "x" },
];

interface Props {
  picValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AvatarSelect: React.FunctionComponent<Props> = ({
  picValue,
  onChange,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState(0);
  const [avatars] = React.useState(initialState);
  const maxWidth = 190;
  const handleClickArrow = (direction: number) => {
    if (ref !== null && ref.current) {
      ref.current.scrollLeft = ref.current.scrollLeft + 70 * direction;
      setPosition(ref.current.scrollLeft);
    }
  };
  return (
    <div className="avatar-select">
      <Arrow
        direction={-1}
        position={position}
        maxWidth={maxWidth}
        onClickArrow={handleClickArrow}
      />
      {avatars.length !== 0 && (
        <div className="row" style={{ width: maxWidth }} ref={ref}>
          {avatars.map((x, i) => (
            <div key={i} className="avatar-checkbox">
              <img src={x.img} height="50" width="50" alt="" />
              <input
                type="radio"
                name="pic"
                checked={picValue === x.path}
                value={x.path}
                onChange={onChange}
              />
            </div>
          ))}
        </div>
      )}
      <Arrow
        direction={1}
        position={position}
        maxWidth={maxWidth}
        onClickArrow={handleClickArrow}
      />
    </div>
  );
};
export default AvatarSelect;
