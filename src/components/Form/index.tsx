import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { checkInputValidation, testMail } from "../../common/Utilities";
import { MyInputHandles, ITextInput } from "../Input";
import Radio from "../Radio";
import SelectList, { ISelectList } from "./../SelectList";
import TouchableButton from "../TouchableButton";
import TextInput from "../Input";
import useToast from "../../hooks/useToast";
import "./form.scss";
import CubeSelect, { ICubeProps } from "../CubeSelect";

export type FormType =
  | "input"
  | "select"
  | "radio"
  | "cubeSelect"
  | "custom"
  | "customFundingSrc"
  | "phoneNumber"
  | "customAmount"
  | "switch"
  | "withdrawal";
export type TForm = {
  id: string;
  type: FormType;
  step?: number;
  description?: string;
  content?: any;
  func?: () => void;
  itemStyle?: {};
  props?: any;
  inputs?: ITextInput;
  cubeSelect?: ICubeProps;
  selectList?: ISelectList;
};

export type TFormData = Array<TForm | Array<TForm>>;
export interface IForm {
  data: TFormData;
  onInputChanged?: (id: string, text: string) => void;
  innerContainerStyle?: any;
  onValidate?: (validated: boolean) => void;
  onInputBlurred?: (id: string) => void;
  onSubmitPress?: (data: any) => void;
  noButton?: boolean;
  noPinValidation?: boolean;
  buttonLabel?: string;
  buttonStyle?: any;
  buttonDisabled?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onConfirm?: (state: { [key: string]: string }) => void;
  deep?: boolean;
  pinProps?: PinProps;
  rowWrapperStyle?: {};
  className?: string;
  controlStyle?: {};
  controlWrapperStyle?: {};
  cubeSelectActiveColor?: string;
  labelStyle?: {};
  invertValidationStatus?: boolean;
}

export interface PinProps {
  info: string;
  label: string;
  deep: boolean;
}

export interface formRef {
  submitForm(): void;
}

const Form: ForwardRefRenderFunction<formRef, IForm> = (
  {
    data,
    innerContainerStyle,
    onInputChanged,
    onInputBlurred,
    onValidate,
    noButton,
    noPinValidation = true,
    buttonLabel,
    buttonStyle,
    buttonDisabled = false,
    onConfirm,
    disabled,
    loading,
    onSubmitPress,
    rowWrapperStyle,
    className,
    controlStyle,
    controlWrapperStyle,
    cubeSelectActiveColor = "lightgray",
    labelStyle,
    invertValidationStatus,
  },
  ref
) => {
  const inputRefs = useRef<{ [key: string]: MyInputHandles }>({});
  const pinModalRef = useRef<any>(null);

  const [activeStep] = useState(0);
  const [state, setState] = useState<{ [key: string]: any }>({});
  const [currency] = useState("NGN");
  const Toast = useToast();

  useEffect(() => {}, [data]);

  function onValueChange(id: string, text: any) {
    const s = {
      ...state,
      [id]: text,
    };
    setState(s);
    if (onInputChanged) onInputChanged(id, text);
    if (onValidate) validate(false);
  }

  useImperativeHandle(ref, () => ({
    submitForm() {
      validate(true);
    },
  }));

  function renderSelectList(item: any, key: number, keyName: string) {
    const { id } = item;

    const value = state[id]
      ? state[id]
      : item.selectList
      ? item.selectList.text
      : "";
    return (
      <div className="select-list">
        <SelectList
          labelStyle={labelStyle}
          disabled
          selectStyle={controlStyle}
          ref={(input) => {
            if (input) inputRefs.current[id + "Select"] = input;
          }}
          key={keyName}
          value={value}
          onChange={(t: string) => {
            onValueChange(id, t);
          }}
          {...item.selectList}
        />
      </div>
    );
  }

  function renderRadio(item: any, key: number, keyName: string) {
    const { id } = item;

    const value = state[id] ? state[id] : item.props ? item.props.text : "";
    return (
      <div>
        <Radio
          disabled
          ref={(input) => {
            if (input) inputRefs.current[id + "Radio"] = input;
          }}
          key={keyName}
          value={value}
          onChange={(t: string) => {
            onValueChange(id, t);
          }}
          {...item.props}
        />
      </div>
    );
  }

  function renderCubeList(item: any, key: number) {
    const { id } = item;
    return (
      <div>
        <CubeSelect
          labelStyle={labelStyle}
          disabled
          activeColor={cubeSelectActiveColor}
          ref={(input) => {
            if (input) inputRefs.current[id + "CubeSelect"] = input;
          }}
          value={
            state[id] ? state[id] : item.cubeSelect ? item.cubeSelect.text : ""
          }
          key={key}
          onChange={(t: string) => {
            onValueChange(id, t);
          }}
          {...item.cubeSelect}
        />
      </div>
    );
  }

  function renderInput(item: any, key: number, keyName: string, data: any[]) {
    const nextItem = data[key + 1];
    const isNextFieldExisting = nextItem;

    const isNextFieldAnInput = isNextFieldExisting
      ? nextItem.type === "input"
      : false;

    const { id } = item;
    if (!(id in state) && item.inputs) {
      if (item.inputs?.text) onValueChange(id, item.inputs?.text);
    }

    const textStyle = item.inputs ? item.inputs.style : {};
    return (
      <div
        style={{
          ...{ marginBottom: 17 },
          ...controlWrapperStyle,
          ...item.itemStyle,
        }}
      >
        <TextInput
          className={item.inputs?.className}
          editable={!disabled && !loading}
          innerContainerStyle={innerContainerStyle}
          textStyle={{ ...controlStyle, ...textStyle }}
          key={keyName}
          ref={(input) => {
            if (input) inputRefs.current[id + "Input"] = input;
          }}
          labelStyle={labelStyle}
          onChangeText={(t: any) => onValueChange(id, t)}
          onBlur={() => (onInputBlurred ? onInputBlurred(id) : null)}
          value={id in state ? state[id] : item.inputs ? item.inputs.text : ""}
          returnKeyType={
            isNextFieldExisting && isNextFieldAnInput ? "next" : "done"
          }
          blurOnSubmit={
            isNextFieldExisting && isNextFieldAnInput ? false : true
          }
          onSubmitEditing={() => {
            if (isNextFieldExisting && isNextFieldAnInput) {
              if (inputRefs?.current[`${nextItem.id}Input`]) {
                inputRefs?.current[`${nextItem.id}Input`]?.focusInput();
                return;
              }

              if (inputRefs?.current[`${nextItem.id}PhoneNumber`]) {
                inputRefs?.current[`${nextItem.id}PhoneNumber`]?.focusInput();
              }
            }
          }}
          {...(item.inputs && item.inputs.format === "amount"
            ? { currency: currency }
            : null)}
          {...item.inputs}
        />

        {item.description && (
          <div style={{}}>
            <div onClick={item.func}>
              <div style={{}}>{item.description}</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  function returnItemType(
    item: TForm,
    key: number,
    keyName: string,
    data: any[]
  ) {
    if (item) {
      if (item.step && activeStep < item.step) {
        return;
      }

      switch (item.type) {
        case "input":
          return renderInput(item, key, keyName, data);
        case "select":
          return renderSelectList(item, key, keyName);
        case "radio":
          return renderRadio(item, key, keyName);
        case "cubeSelect":
          return renderCubeList(item, key);
        case "custom":
          return renderCustom(item, key);
        default:
          return React.cloneElement({ ...item.content, key: item.id }, { key });
      }
    }
  }

  function renderCustom(item: any, key: any) {
    if (item.content) {
      return React.cloneElement(item.content, { key });
    }
  }

  function renderContent() {
    if (data && data.length) {
      return data.map((item, key) => (
        <div key={key} style={{ marginTop: 17 }}>
          {Array.isArray(item) ? (
            <div
              className="row "
              style={{ ...{ display: "flex" }, ...rowWrapperStyle }}
              // className="form-row-wrapper"
            >
              {item.map((itemBox, key2) => {
                return (
                  <div className="col-md-6 ">
                    {returnItemType(itemBox, key2, `item${key2}`, item)}
                  </div>
                );
              })}
            </div>
          ) : (
            returnItemType(item, key, `noBox${key}`, data)
          )}
        </div>
      ));
    }
  }

  function validate(buttonTriggered: boolean) {
    const elementsToValidate: Array<MyInputHandles> = [];
    const validateRule = (item: TForm) => {
      if (item) {
        if (
          item.type === "input" &&
          item.inputs &&
          item.inputs.validationRules?.includes("required")
        ) {
          elementsToValidate.push(inputRefs?.current[item.id + "Input"]);
        }
        if (
          item.type === "select" &&
          item.selectList &&
          item.selectList.validationRules?.includes("required")
        ) {
          elementsToValidate.push(inputRefs?.current[item.id + "Select"]);
        }
        if (
          item.type === "cubeSelect" &&
          item.cubeSelect &&
          item.cubeSelect.validationRules?.includes("required")
        ) {
          elementsToValidate.push(inputRefs?.current[item.id + "CubeSelect"]);
        }
        if (
          item.type === "radio" &&
          item.props &&
          item.props.validationRules?.includes("required")
        ) {
          elementsToValidate.push(inputRefs?.current[item.id + "Radio"]);
        }
        if (
          item.type === "withdrawal" &&
          item.props &&
          item.props.validationRules?.includes("required")
        ) {
          elementsToValidate.push(inputRefs?.current[item.id + "withdrawal"]);
        }
        if (
          item.type === "switch" &&
          item.props &&
          item.props.validationRules?.includes("required")
        ) {
          elementsToValidate.push(inputRefs?.current[item.id + "Switch"]);
        }

        if (
          item.type === "customAmount" &&
          item.props &&
          item.props.validationRules?.includes("required")
        ) {
          elementsToValidate.push(inputRefs?.current[item.id + "amountInput"]);
        }

        if (
          item.type === "phoneNumber" &&
          item.props &&
          item.props.validationRules?.includes("required")
        ) {
          elementsToValidate.push(inputRefs?.current[item.id + "PhoneNumber"]);
        }

        if (
          item.type === "customFundingSrc" &&
          item.props &&
          item.props.validationRules?.includes("required")
        ) {
          elementsToValidate.push(
            inputRefs?.current[item.id + "customFundingSrc"]
          );
        }
      }
    };
    data.forEach((item) => {
      if (!Array.isArray(item)) {
        validateRule(item);
      } else {
        item.forEach((item) => validateRule(item));
      }
    });
    let validationState = false;
    if (noPinValidation) {
      if (state && state.email && !testMail(state.email))
        if (buttonTriggered) {
          return Toast.error("Invalid email");
        }
      if (checkInputValidation(elementsToValidate)) {
        validationState = true;
        if (onConfirm) onConfirm(state);
      }
    } else if (checkInputValidation(elementsToValidate)) {
      pinModalRef?.current?.toggle();
    }

    if (onSubmitPress && buttonTriggered) onSubmitPress(state);
    if (onValidate)
      onValidate(invertValidationStatus ? !validationState : validationState);
  }

  function renderButton() {
    if (noButton) return;

    const button = (
      <div style={{ paddingTop: 20 }}>
        <TouchableButton
          onPress={() => validate(true)}
          label={buttonLabel ? buttonLabel : ""}
          style={buttonStyle}
          disabled={buttonDisabled}
          loading={loading}
        />
      </div>
    );
    // if (steps && steps.length) {
    //   if (activeStep === _.last(this.state.steps)) {
    //     return button;
    //   }
    // } else {
    return button;
    // }
  }

  function renderModals() {}

  return (
    <div className={className}>
      <div
        style={{
          ...(data && data.length > 0
            ? { flexGrow: 1, paddingBottom: 10 }
            : {}),
        }}
      >
        <div style={{ flexGrow: 1 }}>{renderContent()}</div>
      </div>
      {!noButton ? renderButton() : null}
      {renderModals()}
    </div>
  );
};

export default forwardRef(Form);
