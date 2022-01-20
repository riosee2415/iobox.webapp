import React, { useEffect, useRef } from "react";
import DaumPostCode from "react-daum-postcode";
import { Modal } from "antd";
import { Wrapper } from "../../components/commonComponents";
import { AiOutlineClose } from "react-icons/ai";

const style = {
  overflow: "hidden",
};

const PostCode = ({
  width,
  //
  isPostCode,
  address,
  //
  toggleDialogHandler,
  onCompleteHandler,
}) => {
  const daumRef = useRef();

  useEffect(() => {
    console.log(daumRef, address);
  });

  return (
    <Modal
      width={`700px`}
      style={{ top: 200 }}
      footer={null}
      closable={false}
      visible={isPostCode}
      onCancel={() => toggleDialogHandler()}
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

      {address === "start" && (
        <DaumPostCode
          ref={daumRef}
          onComplete={(data) => {
            onCompleteHandler(data, address);
          }}
          width={width < 600 ? `100%` : `600px`}
          height={`450px`}
          autoClose={false}
          animation
          style={style}
        />
      )}
      {address === "end" && (
        <DaumPostCode
          ref={daumRef}
          onComplete={(data) => {
            onCompleteHandler(data, address);
          }}
          width={width < 600 ? `100%` : `600px`}
          height={`450px`}
          autoClose={false}
          animation
          style={style}
        />
      )}
    </Modal>
  );
};

export default PostCode;
