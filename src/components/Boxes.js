import React, { useState, useEffect } from "react";
import "./boxes.css";
import clsx from "clsx";
let order = 0;
let isAllClicked = false;
const Boxes = () => {
  const [boxState, setboxState] = useState(getBoxes("initial"));

  useEffect(() => {
    if (boxState.some((box) => !box.isClicked)) {
      isAllClicked = false;
    } else {
      isAllClicked = true;
    }
    if (isAllClicked) {
      boxState.forEach((item, index) => {
        return setTimeout(() => {
          let tempbox = [...boxState];
          tempbox[index].isClicked = false;
          setboxState(tempbox);
        }, 1000 * (index + 1));
      });
    }
  }, [boxState]);
  const checkisClickedFunc = (i, j) => {
    let selectedbox = boxState.find((item) => item.i === i && item.j === j);
    return selectedbox.isClicked ? selectedbox.isClicked : false;
  };
  const changeColor = (i, j) => {
    let temp = [...boxState];
    let selectedBox = temp.find((item) => item.i === i && item.j === j);
    selectedBox.isClicked = true;
    selectedBox.order = ++order;
    temp.sort((a, b) => a.order - b.order);
    setboxState(temp);
  };

  function getBoxes(type) {
    let boxesData = [];
    const boxes = [0, 1, 2].map((i) => {
      return [0, 1, 2].map((j) => {
        if (!(i === 1 && j > 0)) {
          if (type === "initial") {
            return boxesData.push({ i, j, isClicked: false, order: 0 });
          }

          return (
            <div
              className={clsx("box", { clickedBox: checkisClickedFunc(i, j) })}
              onClick={() => changeColor(i, j)}
            ></div>
          );
        }
        return <div></div>;
      });
    });
    if (type === "initial") {
      return boxesData;
    }
    return boxes;
  }

  return <div className="box-container">{getBoxes()}</div>;
};

export default Boxes;
