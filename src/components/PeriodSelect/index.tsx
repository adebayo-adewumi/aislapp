import Form from "./../Form";
import { MyInputHandles } from "./../Input";
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useState,
} from "react";

export interface IPeriodSelect {
  onChange?: (v: string) => void;
}
const PeriodSelect: ForwardRefRenderFunction<MyInputHandles, IPeriodSelect> = ({
  onChange,
}) => {
  const [tenor, setTenor] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (tenor && duration) {
      if (onChange) onChange(`${duration} ${tenor}`);
    } else {
      if (onChange) onChange("");
    }
  }, [tenor, duration]);
  const formData: Array<any> = React.useMemo(() => {
    return [
      {
        id: "period",
        type: "select",
        props: {
          validationRules: "required",
          data: [
            { value: "day", label: "Daily" },
            { value: "week", label: "Weekly" },

            { value: "month", label: "Monthly" },
            { value: "year", label: "Yearly" },
          ],
          map: { desc: "label", val: "value" },
          label: "Select Tenor Type",
          placeholder: "Select Tenor Type",
        },
      },
    ];
  }, [tenor]);

  function handleOnInputChange(id: string, text: string) {
    if (id === "period") {
      if (text.length < 10) {
        setTenor(text);
      } else {
        setTenor("");
      }
    }
    if (id === "duration") {
      setDuration(text);
    }
  }
  return (
    <div style={{ flex: 1 }}>
      <Form data={formData} noButton onInputChanged={handleOnInputChange} />
    </div>
  );
};

export default forwardRef(PeriodSelect);
