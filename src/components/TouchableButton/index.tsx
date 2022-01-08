import Colors from "../../common/Colors";
import React, { FunctionComponent } from "react";

type Props = {
  label: string;
  style?: any;
  textStyle?: any;
  reverse?: boolean;
  onPress?: () => void;
  transparent?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

const TouchableButton: FunctionComponent<Props> = ({
  label,
  style,
  reverse = false,
  onPress,
  transparent,
  loading,
  textStyle,
  disabled,
}) => {
  const onClick = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };
  return (
    <button
      disabled={disabled}
      className="py-3"
      onClick={onClick}
      style={{
        backgroundColor: transparent
          ? "transparent"
          : reverse
          ? Colors.white
          : Colors.primaryColor,
        marginBottom: 10,
        borderRadius: 20,
        justifyContent: "center",
        color: "#ffffff",
        alignItems: "center",
        width: "100%",
        border: "none",
        ...(disabled
          ? {
              background: `linear-gradient(
          181.58deg,
          darkgray,
          rgb(124, 124, 124),
          rgb(82, 82, 82)
        )`,
              cursor: "not-allowed",
            }
          : {
              background: `linear-gradient(181.58deg,
            #389f55 1.33%,
            rgba(14, 94, 37, 0.933684) 98.62%,
            rgba(46, 143, 74, 0.797954) 98.63%,
            rgba(30, 118, 55, 0.468697) 98.64%,
            rgba(7, 81, 27, 0) 98.65%,
            rgba(7, 81, 27, 0) 98.66%
          )`,
            }),
        ...style,
      }}
    >
      <div
        style={{
          // height: transparent ? Fonts.h(24) : Fonts.h(42),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading ? (
          <div>loading</div>
        ) : (
          <div style={reverse ? { color: Colors.darkText } : {}}>{label}</div>
        )}
      </div>
    </button>
  );
};

export default TouchableButton;
