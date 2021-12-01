import React from "react";
import DaumPostCode from "react-daum-postcode";
import Dialog from "@material-ui/core/Dialog";
import { Wrapper } from "../../Components/CommonComponents";
import { AiOutlineClose } from "react-icons/ai";

const style = {
  overflow: "hidden",
};

const PostCode = ({
  width,
  //
  isPostCode,
  //
  toggleDialogHandler,
  onCompleteHandler,
}) => {
  return (
    <Dialog
      fullWidth
      maxWidth={`sm`}
      open={isPostCode}
      onClose={() => toggleDialogHandler()}
    >
      <Wrapper
        height={`32px`}
        al={`flex-end`}
        padding={`0 10px`}
        bgColor={`#eee`}
      >
        <Wrapper width={`auto`} cursor={`pointer`}>
          <AiOutlineClose size={18} onClick={() => toggleDialogHandler()} />
        </Wrapper>
      </Wrapper>

      <DaumPostCode
        onComplete={onCompleteHandler}
        width={width < 600 ? `100%` : `600px`}
        height={`450px`}
        autoClose
        animation
        style={style}
      />
    </Dialog>
  );
};

export default PostCode;
