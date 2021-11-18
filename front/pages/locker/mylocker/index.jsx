import React, { useCallback, useEffect, useState } from "react";
import Theme from "../../../components/Theme";
import {
  Wrapper,
  WholeWrapper,
  RsWrapper,
  Text,
  Image,
  CommonButton,
} from "../../../components/commonComponents";
import styled from "styled-components";
import ClientLayout from "../../../components/ClientLayout";
import useWidth from "../../../hooks/useWidth";
import {
  CloseOutlined,
  DownOutlined,
  UpOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import { Checkbox } from "antd";

const ModalWrapper = styled(Wrapper)`
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  padding: 5px 20px;

  &:hover {
    background: ${Theme.lightGrey_C};
  }
`;

const TextHover = styled(Wrapper)`
  width: auto;
  color: ${Theme.grey_C};
  font-size: 1.2rem;
  position: relative;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: ${Theme.basicTheme_C};
    transition: 0.5s;
  }

  &:hover {
    color: ${Theme.basicTheme_C};

    &:before {
      width: 100%;
    }
  }
`;

const PayButtton = styled(Wrapper)`
  color: ${Theme.basicTheme_C};
  width: auto;
  position: relative;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${Theme.basicTheme_C};
  }

  &:hover {
    font-weight: 700;
  }
`;

const Index = () => {
  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////
  const [tab, setTab] = useState(false);

  const [modal, setModal] = useState(false);

  const [boxNum, setBoxNum] = useState(0);
  const [hangNum, setHangNum] = useState(0);
  const [tentNum, setTentNum] = useState(0);
  const [bigNum, setBigNum] = useState(0);

  ////// REDUX //////

  ////// USEEFFECT //////

  useEffect(() => {}, [boxNum, hangNum, tentNum, bigNum]);

  ////// TOGGLE ///////

  const modalToggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  ///// HANDLER //////

  const resetHandler = useCallback(
    (data) => {
      if (data === "iobox") {
        setBoxNum(0);
      } else if (data === "hanger") {
        setHangNum(0);
      } else if (data === "tent") {
        setTentNum(0);
      } else {
        setBigNum(0);
      }
    },
    [boxNum, hangNum, tentNum, bigNum]
  );

  // iobox
  const numPlusHandler = useCallback(
    (data) => {
      if (data === "iobox") {
        setBoxNum(boxNum + 1);
      } else if (data === "hanger") {
        setHangNum(hangNum + 1);
      } else if (data === "tent") {
        setTentNum(tentNum + 1);
      } else {
        setBigNum(bigNum + 1);
      }
    },
    [boxNum, hangNum, tentNum, bigNum]
  );

  const numMiunsHandler = useCallback(
    (data) => {
      if (data === "iobox") {
        setBoxNum(boxNum - 1);
        if (boxNum === 0) {
          setBoxNum(0);
        }
      } else if (data === "hanger") {
        setHangNum(hangNum - 1);

        if (hangNum === 0) {
          setHangNum(0);
        }
      } else if (data === "tent") {
        setTentNum(tentNum - 1);

        if (tentNum === 0) {
          setTentNum(0);
        }
      } else {
        setBigNum(bigNum - 1);

        if (tentNum === 0) {
          setBigNum(0);
        }
      }
    },
    [boxNum, hangNum, tentNum, bigNum]
  );

  const moveBackHandler = useCallback(() => {
    router.back();
  }, []);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const tabToggle = useCallback(() => {
    setTab(!tab);
  }, [tab]);

  ////// DATAVIEW //////
  return (
    <>
      <WholeWrapper bgColor={width < 700 ? Theme.white_C : Theme.lightGrey_C}>
        <Wrapper
          width={width < 700 ? `100%` : `500px`}
          height={`100%`}
          shadow={`0px 0px 10px ${Theme.grey_C}`}
          bgColor={Theme.white_C}
          al={`flex-start`}
          ju={`flex-start`}
          position={`relative`}
        >
          <Wrapper
            padding={`5px`}
            width={`auto`}
            position={`absolute`}
            top={`30px`}
            right={`30px`}
            fontSize={`20px`}
            cursor={`pointer`}
            onClick={moveBackHandler}
            zIndex={`100`}
          >
            <CloseOutlined />
          </Wrapper>
          <Wrapper>
            <RsWrapper
              ju={`flex-start`}
              position={`relative`}
              al={`flex-start`}
              padding={`30px 0`}
              bgColor={Theme.white_C}
              minHeight={`100vh`}
            >
              <Text fontSize={`2rem`} bold={true}>
                내 보관함
              </Text>

              <Wrapper ju={`flex-start`}>
                <Wrapper
                  ju={`space-between`}
                  dr={`row`}
                  margin={`10px 0 0`}
                  padding={`0 0 10px`}
                  borderBottom={`1px solid ${Theme.grey_C}`}
                >
                  <Wrapper width={`auto`} al={`flex-start`}>
                    <Text fontWeight={`700`} fontSize={`1.2rem`}>
                      고객번호
                    </Text>
                    <Text>05466</Text>
                  </Wrapper>

                  <CommonButton
                    radius={`30px`}
                    width={`120px`}
                    height={`40px`}
                    onClick={moveBackHandler}
                  >
                    내 보관함
                  </CommonButton>
                </Wrapper>
              </Wrapper>

              <Wrapper minHeight={`calc(100vh - 250px)`} ju={`space-between`}>
                <Wrapper>
                  <Wrapper
                    dr={`row`}
                    margin={`10px 0 0`}
                    display={
                      (boxNum || hangNum || tentNum || bigNum) > 0
                        ? `none`
                        : `flex`
                    }
                  >
                    <Text margin={`0 10px 0 0`} fontSize={`1.2rem`}>
                      보관함을 선택 해주세요.
                    </Text>
                    <Wrapper
                      width={`auto`}
                      cursor={`pointer`}
                      onClick={modalToggle}
                    >
                      <DownOutlined />
                    </Wrapper>
                  </Wrapper>

                  <Wrapper>
                    <Wrapper
                      dr={`row`}
                      margin={`10px 0 0`}
                      display={
                        (boxNum || hangNum || tentNum || bigNum) === 0
                          ? `none`
                          : `flex`
                      }
                    >
                      <Wrapper dr={`row`}>
                        <Text bold={true}>iobox {boxNum}개 </Text>

                        <Wrapper
                          width={`auto`}
                          cursor={`pointer`}
                          onClick={() => {
                            resetHandler("iobox");
                          }}
                          display={boxNum === 0 ? `none` : `flex`}
                        >
                          <CloseOutlined />
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    padding={`20px 0 10px`}
                    borderBottom={`1px solid ${Theme.grey_C}`}
                  >
                    <Text bold={true} fontSize={`1.3rem`}>
                      행거박스 A-1
                    </Text>
                    <Checkbox />
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    height={`100px`}
                    borderBottom={`1px solid ${Theme.grey_C}`}
                  >
                    <Image src={`#`} alt={`image`} width={`30%`} />

                    <Wrapper width={`auto`}>
                      <Checkbox />
                    </Wrapper>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    height={`100px`}
                    borderBottom={`1px solid ${Theme.grey_C}`}
                  >
                    <Image src={`#`} alt={`image`} width={`30%`} />

                    <Wrapper width={`auto`}>
                      <Checkbox />
                    </Wrapper>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    height={`100px`}
                    borderBottom={`1px solid ${Theme.grey_C}`}
                  >
                    <Image src={`#`} alt={`image`} width={`30%`} />

                    <Wrapper width={`auto`}>
                      <Checkbox />
                    </Wrapper>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    height={`100px`}
                    borderBottom={`1px solid ${Theme.grey_C}`}
                  >
                    <Image src={`#`} alt={`image`} width={`30%`} />

                    <Wrapper width={`auto`}>
                      <Checkbox />
                    </Wrapper>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    padding={`50px 0 10px`}
                    borderBottom={`1px solid ${Theme.grey_C}`}
                  >
                    <Text bold={true} fontSize={`1.3rem`}>
                      행거박스 A-2
                    </Text>
                    <Checkbox />
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    height={`100px`}
                    borderBottom={`1px solid ${Theme.grey_C}`}
                  >
                    <Image src={`#`} alt={`image`} width={`30%`} />

                    <Wrapper width={`auto`}>
                      <Checkbox />
                    </Wrapper>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    height={`100px`}
                    borderBottom={`1px solid ${Theme.grey_C}`}
                  >
                    <Image src={`#`} alt={`image`} width={`30%`} />

                    <Wrapper width={`auto`}>
                      <Checkbox />
                    </Wrapper>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    height={`100px`}
                    borderBottom={`1px solid ${Theme.grey_C}`}
                  >
                    <Image src={`#`} alt={`image`} width={`30%`} />

                    <Wrapper width={`auto`}>
                      <Checkbox />
                    </Wrapper>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    height={`100px`}
                    borderBottom={`1px solid ${Theme.grey_C}`}
                  >
                    <Image src={`#`} alt={`image`} width={`30%`} />

                    <Wrapper width={`auto`}>
                      <Checkbox />
                    </Wrapper>
                  </Wrapper>
                </Wrapper>

                <Wrapper dr={`row`} ju={`space-around`} margin={`50px 0 0`}>
                  <TextHover bold={true}>부분 찾기</TextHover>
                  <TextHover bold={true}>전체 찾기</TextHover>
                </Wrapper>
              </Wrapper>
            </RsWrapper>
          </Wrapper>
        </Wrapper>
      </WholeWrapper>

      <Wrapper
        position={`sticky`}
        bottom={`0`}
        left={`0`}
        bgColor={Theme.lightGrey_C}
        zIndex={`1000`}
      >
        <Wrapper
          width={width < 700 ? `100%` : `500px`}
          bgColor={Theme.white_C}
          borderTop={`1px solid ${Theme.grey_C}`}
          padding={`20px 0`}
        >
          <RsWrapper dr={`row`} ju={`space-between`}>
            <Wrapper width={`auto`} al={`flex-start`}>
              <PayButtton bold={true}>배송비 5,000원</PayButtton>
            </Wrapper>
            <CommonButton width={`130px`} height={`50px`}>
              찾기
            </CommonButton>
          </RsWrapper>
        </Wrapper>
      </Wrapper>

      {modal && (
        <Wrapper
          position={`absolute`}
          top={`0`}
          left={`0`}
          height={`100vh`}
          bgColor={`rgba(0,0,0,0.4)`}
          zIndex={`10000`}
        >
          <Wrapper radius={`20px`} bgColor={Theme.white_C} width={`220px`}>
            <Wrapper
              al={`flex-end`}
              cursor={`pointer`}
              onClick={modalToggle}
              padding={`20px 20px 10px`}
            >
              <CloseOutlined />
            </Wrapper>

            <ModalWrapper dr={`row`} ju={`space-between`} cursor={`pointer`}>
              <Text
                fontSize={`1.2rem`}
                bold={true}
                onClick={() => {
                  numPlusHandler("iobox");
                }}
              >
                io박스
              </Text>

              <Wrapper dr={`row`} width={`auto`}>
                <Wrapper
                  width={`auto`}
                  display={boxNum === 0 ? `none` : `flex`}
                  onClick={() => {
                    numMiunsHandler("iobox");
                  }}
                >
                  <MinusCircleOutlined />
                </Wrapper>
                <Text fontSize={`1.2rem`} margin={`0 0 0 3px`}>
                  {boxNum}개
                </Text>
              </Wrapper>
            </ModalWrapper>

            <ModalWrapper dr={`row`} ju={`space-between`}>
              <Text
                fontSize={`1.2rem`}
                bold={true}
                onClick={() => {
                  numPlusHandler("hanger");
                }}
              >
                행거박스
              </Text>
              <Wrapper dr={`row`} width={`auto`}>
                <Wrapper
                  width={`auto`}
                  display={hangNum === 0 ? `none` : `flex`}
                  onClick={() => {
                    numMiunsHandler("hanger");
                  }}
                >
                  <MinusCircleOutlined />
                </Wrapper>
                <Text fontSize={`1.2rem`} margin={`0 0 0 3px`}>
                  {hangNum}개
                </Text>
              </Wrapper>
            </ModalWrapper>

            <ModalWrapper dr={`row`} ju={`space-between`}>
              <Text
                fontSize={`1.2rem`}
                bold={true}
                onClick={() => {
                  numPlusHandler("tent");
                }}
              >
                텐트박스
              </Text>
              <Wrapper dr={`row`} width={`auto`}>
                <Wrapper
                  width={`auto`}
                  display={tentNum === 0 ? `none` : `flex`}
                  onClick={() => {
                    numMiunsHandler("tent");
                  }}
                >
                  <MinusCircleOutlined />
                </Wrapper>
                <Text fontSize={`1.2rem`} margin={`0 0 0 3px`}>
                  {tentNum}개
                </Text>
              </Wrapper>
            </ModalWrapper>

            <ModalWrapper dr={`row`} ju={`space-between`}>
              <Text
                fontSize={`1.2rem`}
                bold={true}
                onClick={() => {
                  numPlusHandler("big");
                }}
              >
                대용량보관함
              </Text>
              <Wrapper dr={`row`} width={`auto`}>
                <Wrapper
                  width={`auto`}
                  display={bigNum === 0 ? `none` : `flex`}
                  onClick={() => {
                    numMiunsHandler("big");
                  }}
                >
                  <MinusCircleOutlined />
                </Wrapper>
                <Text fontSize={`1.2rem`} margin={`0 0 0 3px`}>
                  {bigNum}개
                </Text>
              </Wrapper>
            </ModalWrapper>

            <CommonButton
              width={`80%`}
              margin={`10px 0 0`}
              onClick={modalToggle}
              margin={`0 0 20px`}
            >
              확인
            </CommonButton>
          </Wrapper>
        </Wrapper>
      )}
    </>
  );
};

export default Index;
