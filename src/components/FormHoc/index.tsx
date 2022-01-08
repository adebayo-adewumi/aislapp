import React, { forwardRef, ForwardRefRenderFunction } from "react";
import "./index.scss";
import Form, { formRef, IForm as TForm } from "../Form/index";

const FormHOC: ForwardRefRenderFunction<formRef, TForm> = ({
  data,
  buttonLabel,
  noButton = false,
  onInputChanged,
  controlStyle = {},
  onSubmitPress,
  buttonDisabled,
  buttonStyle = {},
  onValidate,
  invertValidationStatus = false,
}) => {
  const btnDisabled = buttonDisabled ? styles.buttonStyleDisabled : {};
  return (
    <Form
      cubeSelectActiveColor="#254926"
      className="i-form-data"
      rowWrapperStyle={styles.rowWrapper}
      controlStyle={styles.control}
      controlWrapperStyle={styles.controlWrapper}
      noButton={noButton}
      data={data}
      buttonLabel={buttonLabel}
      buttonStyle={{ ...styles.buttonStyle, ...btnDisabled, ...buttonStyle }}
      onInputChanged={onInputChanged}
      onSubmitPress={onSubmitPress}
      labelStyle={styles.labelStyle}
      onValidate={onValidate}
      invertValidationStatus={invertValidationStatus}
    />
  );
};

const styles = {
  buttonStyle: {
    padding: "10px 18px",
    border: "none",
    position: "relative",
    height: 44,
    color: "white",
    background:'#254926',
    borderRadius: 4,
  },

  buttonStyleDisabled: {
    background: 'rgb(124, 124, 124)',
    cursor: "not-allowed",
  },

  controlWrapper: {
    position: "relative",
    backgroundColor: "unset",
    marginBottom: 2,
    marginTop: 0,
  },

  rowWrapper: {
    alignItems: "center",
  },

  control: {
    backgroundColor: "#f3f5f6",
    border: "1px solid #d9d9d9",
    borderRadius: 6,
    padding: 12,
    boxSizing: "border-box",
    color: "#354052",
    fontStyle: "normal",
    fontSize: 12,
    height: 47.74,
    outline: 'none',
  },

  labelStyle: {
    color: "#354052",
    fontStyle: "normal",
    fontWeight: 800,
    marginBottom: 0,
    fontSize: 12,
  },
};

export default forwardRef(FormHOC);
