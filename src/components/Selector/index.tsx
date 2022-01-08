import React, { useEffect, useState } from "react";
import { getClassNames } from "../../common/Utilities";
import "./index.scss";

export interface SelectorProps<T> {
  defaultSelected?: boolean;
  onSelected: (id: string, status: boolean, value?: T) => void;
  values?: T[];
  id: string;
}

const Selector = <T,>(props: SelectorProps<T>) => {
  const [active, setActive] = useState(false);

  const onChange = () => {
    if (props.values) {
      const isActive = !active;
      props.onSelected(props.id, isActive, props.values[isActive ? 1 : 0]);
    } else {
      props.onSelected(props.id, !active);
    }
    setActive((active) => !active);
  };

  useEffect(() => {
    if (props.defaultSelected) {
      setActive(props.defaultSelected);
    }
  }, [active, props.defaultSelected]);

  return (
    <div className="selector-wrapper-value">
      <div
        className={getClassNames(
          "selector-wrapper",
          active ? "selector-wrapper-active" : ""
        )}
        onClick={onChange}
      >
        <div
          className={getClassNames(
            "selector-ball",
            active ? "selector-ball-active" : ""
          )}
        ></div>
      </div>
      <span>{props.values ? props.values[active ? 1 : 0] : ""}</span>
    </div>
  );
};

export default Selector;
