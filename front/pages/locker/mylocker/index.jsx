import React, { useCallback, useEffect, useState } from "react";
import Theme from "../../../components/Theme";
import {
  Wrapper,
  WholeWrapper,
  RsWrapper,
  Text,
  Image,
  CommonButton,
  IoBoxWrapper,
} from "../../../components/commonComponents";
import styled, { ThemeProvider } from "styled-components";
import ClientLayout from "../../../components/ClientLayout";
import useWidth from "../../../hooks/useWidth";
import {
  CloseOutlined,
  DownOutlined,
  UpOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import { Checkbox, message, Modal, notification } from "antd";
import Footer from "../../../components/Footer";
import wrapper from "../../../store/configureStore";
import axios from "axios";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import {
  KEEPBOX_DETAIL_REQUEST,
  MASTER_KEEPBOX_LIST_REQUEST,
} from "../../../reducers/keepBox";
import { RETURNBOX_CREATE_REQUEST } from "../../../reducers/returnBox";
import moment from "moment";

const CheckboxGroup = styled(Checkbox.Group)`
  width: 100%;
`;

const ModalWrapper = styled(Wrapper)`
  flex-direction: row;
  justify-content: space-between;
  height: auto;
  cursor: pointer;
  padding: 5px 20px;

  &:hover {
    background: ${Theme.lightGrey_C};
  }
`;

const TextHover = styled(Wrapper)`
  width: auto;
  font-size: 1.2rem;
  position: relative;
  cursor: pointer;
  color: ${(props) => props.color || Theme.grey_C};

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${(props) => props.beforeWidth || `0`};
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

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const Index = () => {
  const width = useWidth();

  const dataArr = [
    //
    ["행거박스", "W58 x H100 x D30 (CM)", "월", 19000],
    ["행거박스 plus+", "W58 x H130 x D60 (CM)", "월", 39000],
    ["텐트박스", "W100 x H45 x D45 (CM)", "월", 39000],
    ["캠핑박스 plus+", "W110 x H50 x D50 (CM)", "월", 59000],
  ];

  ////// HOOKS //////
  const [tab, setTab] = useState(1);

  const [modal, setModal] = useState(false);

  const [boxNum, setBoxNum] = useState(0);
  const [hangNum, setHangNum] = useState(0);
  const [tentNum, setTentNum] = useState(0);
  const [bigNum, setBigNum] = useState(0);

  const [boxRealNum, setBoxRealNum] = useState(0);
  const [hangRealNum, setHangRealNum] = useState(0);
  const [tentRealNum, setTentRealNum] = useState(0);
  const [bigRealNum, setBigRealNum] = useState(0);

  const [boxes, setBoxes] = useState(null);
  const [currentBox, setCurrentBox] = useState(null);
  const [boxId, setBoxId] = useState(null);

  const [checkBoxes, setCheckBoxes] = useState([]);
  const [checkBox, setCheckBox] = useState(false);

  const [returnFinish, setReturnFinish] = useState(false);
  const [noneReturnBox, setNoneReturnBox] = useState(false);

  ////// REDUX //////
  const router = useRouter();
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);
  const { keepBoxes, detailBox } = useSelector((state) => state.keepBox);
  const { st_returnBoxCreateDone, st_returnBoxCreateError } = useSelector(
    (state) => state.returnBox
  );

  ////// USEEFFECT //////

  useEffect(() => {
    if (!me) {
      router.push("/");

      return LoadNotification("로그인 후 이용해주세요.");
    }
  }, [me]);

  useEffect(() => {
    if (boxId) {
      dispatch({
        type: KEEPBOX_DETAIL_REQUEST,
        data: {
          id: boxId,
        },
      });
    }
  }, [boxId]);

  useEffect(() => {
    if (me) {
      dispatch({
        type: MASTER_KEEPBOX_LIST_REQUEST,
        data: {
          id: me.id,
        },
      });
    }
  }, [me]);

  useEffect(() => {
    scrollTo(0, 0);
  }, [router.route]);

  useEffect(() => {
    if (keepBoxes) {
      let tempBox = { 1: [], 2: [], 3: [], 4: [] };

      for (let i = 0; i < keepBoxes.length; i++) {
        if (keepBoxes[i].status === "보관중") {
          for (let j = 0; j < keepBoxes[i].KeepBoxes.length; j++) {
            if (keepBoxes[i].KeepBoxes[j].boxcount1 !== 0) {
              tempBox[1].push({
                ...keepBoxes[i].KeepBoxes[j],
                updated: keepBoxes[i].updatedAt,
              });
            }
            if (keepBoxes[i].KeepBoxes[j].boxcount2 !== 0) {
              tempBox[2].push({
                ...keepBoxes[i].KeepBoxes[j],
                updated: keepBoxes[i].updatedAt,
              });
            }
            if (keepBoxes[i].KeepBoxes[j].boxcount3 !== 0) {
              tempBox[3].push({
                ...keepBoxes[i].KeepBoxes[j],
                updated: keepBoxes[i].updatedAt,
              });
            }
            if (keepBoxes[i].KeepBoxes[j].boxcount4 !== 0) {
              tempBox[4].push({
                ...keepBoxes[i].KeepBoxes[j],
                updated: keepBoxes[i].updatedAt,
              });
            }
          }
        }
      }

      setBoxes(tempBox);
    }
  }, [keepBoxes]);

  useEffect(() => {
    setCheckBoxes([]);
    setCheckBox(false);
    setReturnFinish(false);

    if (detailBox && detailBox.BoxImages.length !== 0) {
      const tempArr = [];

      detailBox.BoxImages.map((data) => {
        if (data.ReturnKeepId) {
          tempArr.push(data);
        }
      });

      if (tempArr.length === detailBox.BoxImages.length) {
        setReturnFinish(true);
      }
    }
  }, [detailBox]);

  ////// TOGGLE ///////

  const modalOK = useCallback(() => {
    setBoxRealNum(boxNum);
    setHangRealNum(hangNum);
    setTentRealNum(tentNum);
    setBigRealNum(bigNum);

    setModal(!modal);
  }, [modal, boxNum, hangNum, tentNum, bigNum]);

  const modalToggle = useCallback(() => {
    setBoxNum(boxNum);
    setHangNum(hangNum);
    setTentNum(tentNum);
    setBigNum(bigNum);
    setModal(!modal);
  }, [modal]);

  ///// HANDLER //////
  const getBoxHandler = useCallback(
    (id) => {
      if (returnFinish) {
        return message.error("모든 박스를 찾으셨습니다.");
      }

      if (!checkBox && checkBoxes.length === 0) {
        return message.error("찾아올 박스를 선택해주세요.");
      }

      if (noneReturnBox) {
        return message.error(
          "정기 보관의 경우 보관 후 6개월 이후에 찾기가 가능합니다."
        );
      }

      dispatch({
        type: RETURNBOX_CREATE_REQUEST,
        data: {
          imageIds: checkBoxes,
          boxId: id,
        },
      });
    },
    [checkBoxes, checkBox, noneReturnBox]
  );

  const checkBoxAllHandler = useCallback(
    (data) => {
      if (checkBox) {
        setCheckBoxes([]);
        setCheckBox(false);
      } else {
        setCheckBox(true);
        const tempArr = [];

        data.map((info) => {
          if (!info.ReturnKeepId) {
            tempArr.push(info.id);
          }
        });

        setCheckBoxes(tempArr);
      }
    },
    [checkBox]
  );

  const checkBoxImageHandler = useCallback(
    (data) => {
      let tempArr = checkBoxes.map((data) => {
        return data;
      });
      if (checkBoxes.includes(data)) {
        tempArr = tempArr.filter((id) => {
          return data !== id;
        });
      } else {
        tempArr.push(data);
      }

      setCheckBoxes(tempArr);
    },
    [checkBoxes]
  );

  const updateKeepBoxHandler = useCallback((info) => {
    console.log("ASJKDLNAJKLSDNAJKLSNDJKANJKSLNJKLAZD", info.period);
    if (info.period === "정기") {
      const boxDate = moment(info.updated);
      const current = moment();

      console.log(boxDate.add(1, "M").format("DD-MM-YYYY"));

      console.log(boxDate.format("DD-MM-YYYY"));

      if (boxDate.diff(current, "month") < 6) {
        setNoneReturnBox(true);
      }
    }

    setBoxId(info.id);
  }, []);

  const moveBackHandler = useCallback(() => {
    router.back();
  }, []);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  ////// DATAVIEW //////
  return (
    <>
      <WholeWrapper bgColor={width < 700 ? Theme.white_C : Theme.lightGrey_C}>
        <IoBoxWrapper
          height={`100%`}
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
            onClick={() => moveLinkHandler(`/`)}
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
                    {/* <Text fontWeight={`700`} fontSize={`1.2rem`}>
                      고객번호
                    </Text>
                    <Text>05466</Text> */}
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
                      (boxRealNum || hangRealNum || tentRealNum || bigRealNum) >
                      0
                        ? `none`
                        : `flex`
                    }
                    onClick={modalToggle}
                    cursor={`pointer`}
                  >
                    <Text margin={`0 10px 0 0`} fontSize={`1.2rem`}>
                      보관함을 선택 해주세요.
                    </Text>
                    <Wrapper width={`auto`} cursor={`pointer`}>
                      <DownOutlined />
                    </Wrapper>
                  </Wrapper>

                  <Wrapper>
                    <Wrapper
                      dr={`row`}
                      margin={`10px 0`}
                      display={
                        (boxRealNum ||
                          hangRealNum ||
                          tentRealNum ||
                          bigRealNum) === 0
                          ? `none`
                          : `flex`
                      }
                    >
                      <Wrapper
                        dr={`row`}
                        ju={`space-between`}
                        margin={`10px 0 0`}
                        display={boxRealNum === 0 ? `none` : `flex`}
                      >
                        <Text fontSize={`1.5rem`} bold={true}>
                          iobox {boxRealNum}개
                        </Text>

                        <Wrapper
                          width={`auto`}
                          cursor={`pointer`}
                          onClick={modalToggle}
                          display={boxRealNum === 0 ? `none` : `flex`}
                        >
                          <DownOutlined />
                        </Wrapper>
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        ju={`space-between`}
                        margin={`10px 0 0`}
                        display={hangRealNum === 0 ? `none` : `flex`}
                      >
                        <Text fontSize={`1.5rem`} bold={true}>
                          행거박스 {hangRealNum}개
                        </Text>

                        <Wrapper
                          width={`auto`}
                          cursor={`pointer`}
                          onClick={modalToggle}
                          display={hangRealNum === 0 ? `none` : `flex`}
                        >
                          <DownOutlined />
                        </Wrapper>
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        ju={`space-between`}
                        margin={`10px 0 0`}
                        display={tentRealNum === 0 ? `none` : `flex`}
                      >
                        <Text fontSize={`1.5rem`} bold={true}>
                          텐트박스 {tentRealNum}개
                        </Text>

                        <Wrapper
                          width={`auto`}
                          cursor={`pointer`}
                          onClick={modalToggle}
                          display={tentRealNum === 0 ? `none` : `flex`}
                        >
                          <DownOutlined />
                        </Wrapper>
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        ju={`space-between`}
                        margin={`10px 0 0`}
                        display={bigRealNum === 0 ? `none` : `flex`}
                      >
                        <Text fontSize={`1.5rem`} bold={true}>
                          대용량보관함 {bigRealNum}개
                        </Text>

                        <Wrapper
                          width={`auto`}
                          cursor={`pointer`}
                          onClick={modalToggle}
                          display={bigRealNum === 0 ? `none` : `flex`}
                        >
                          <DownOutlined />
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>

                  {detailBox && (
                    <>
                      <Wrapper
                        // bgColor={checkA ? Theme.lightGrey_C : ``}
                        dr={`row`}
                        ju={`space-between`}
                        padding={`20px 0 10px`}
                        borderBottom={`1px solid ${Theme.grey_C}`}
                      >
                        <Text bold={true} fontSize={`1.3rem`}>
                          {currentBox}
                        </Text>

                        <Wrapper
                          width={`auto`}
                          display={tab === 1 ? `flex` : `none`}
                        >
                          <Checkbox
                            checked={checkBox}
                            onClick={() => {
                              checkBoxAllHandler(detailBox.BoxImages);
                            }}
                          />
                        </Wrapper>
                      </Wrapper>
                      {detailBox.isFilming &&
                        detailBox.BoxImages.map((data, idx) => {
                          return (
                            data.imagePath !== "-" && (
                              <Wrapper
                                bgColor={``}
                                dr={`row`}
                                ju={`space-between`}
                                height={`150px`}
                                borderBottom={`1px solid ${Theme.grey_C}`}
                                key={idx}
                              >
                                <Image
                                  src={data.imagePath}
                                  alt={`image`}
                                  width={`30%`}
                                />

                                <Wrapper width={`auto`} display={`flex`}>
                                  <Checkbox
                                    checked={checkBoxes.includes(data.id)}
                                    onChange={() => {
                                      setCheckBox(false);
                                      checkBoxImageHandler(data.id);
                                    }}
                                  />
                                </Wrapper>
                              </Wrapper>
                            )
                          );
                        })}
                    </>
                  )}

                  {/* </CheckboxGroup> */}

                  {/* <Wrapper dr={`row`} ju={`space-around`} margin={`50px 0 0`}>
                    <TextHover
                      onClick={() => {
                        setTab(0);
                      }}
                      bold={true}
                      color={tab === 0 ? Theme.basicTheme_C : Theme.grey_C}
                      beforeWidth={tab === 0 ? `100%` : `0`}
                    >
                      부분 찾기
                    </TextHover>
                    <TextHover
                      onClick={() => {
                        setTab(1);
                      }}
                      bold={true}
                      color={tab === 1 ? Theme.basicTheme_C : Theme.grey_C}
                      beforeWidth={tab === 1 ? `100%` : `0`}
                    >
                      전체 찾기
                    </TextHover>
                  </Wrapper> */}
                </Wrapper>
              </Wrapper>
            </RsWrapper>
          </Wrapper>
        </IoBoxWrapper>
      </WholeWrapper>

      <Wrapper
        // position={
        //   (boxRealNum || hangRealNum || tentRealNum || bigRealNum) === 0
        //     ? `fixed`
        //     : `sticky`
        // }
        position={`sticky`}
        bottom={`0`}
        left={`0`}
        bgColor={Theme.lightGrey_C}
        zIndex={`1000`}
      >
        <IoBoxWrapper
          bgColor={Theme.white_C}
          padding={`20px 50px`}
          shadow={`0px 0px 10px ${Theme.grey_C}`}
          dr={`row`}
          ju={`space-between`}
        >
          <Wrapper width={`auto`} al={`flex-start`}>
            <PayButtton bold={true}>배송비 5,000원</PayButtton>
          </Wrapper>
          <CommonButton
            width={`130px`}
            height={`50px`}
            onClick={() => {
              detailBox && getBoxHandler(detailBox.id);
            }}
          >
            찾기
          </CommonButton>
        </IoBoxWrapper>
      </Wrapper>
      <Wrapper bgColor={Theme.lightGrey_C}>
        <Footer />
      </Wrapper>

      <Modal
        visible={modal}
        footer={false}
        onCancel={modalToggle}
        width={`220px`}
        className="mylocker"
      >
        <Wrapper
          radius={`20px`}
          bgColor={Theme.white_C}
          width={`220px`}
          height={`300px`}
          overflowY={`scroll`}
          wrap={`nowrap`}
          ju={`flex-start`}
          padding={`40px 0 0`}
        >
          {/* <ModalWrapper dr={`row`} ju={`space-between`} cursor={`pointer`}>
              <Text
                fontSize={`1.2rem`}
                bold={true}
                onClick={() => {
                  numPlusHandler("iobox");
                }}
              >
                io박스
              </Text>

              // <Wrapper dr={`row`} width={`auto`}>
              //  <Wrapper
               //   width={`auto`}
               //   display={boxNum === 0 ? `none` : `flex`}
               //   onClick={() => {
               //     numMiunsHandler("iobox");
               //   }}
               // >
               //   <MinusCircleOutlined />
               // </Wrapper>
               // <Text fontSize={`1.2rem`} margin={`0 0 0 3px`}>
               //   {boxNum}개
               // </Text>
              //</Wrapper> 
            </ModalWrapper> */}

          {boxes &&
            Object.values(boxes).map((data, idx) => {
              return data.map((info, key) => {
                return (
                  <ModalWrapper
                    dr={`row`}
                    ju={`space-between`}
                    cursor={`pointer`}
                    key={key}
                    onClick={() => {
                      updateKeepBoxHandler(info);
                      setCurrentBox(
                        `${dataArr[idx][0]} - ${data.length - key}`
                      );
                      modalToggle();
                    }}
                  >
                    <Text fontSize={`1.2rem`} bold={true} onClick={() => {}}>
                      {dataArr[idx][0]} - {data.length - key}
                    </Text>
                  </ModalWrapper>
                );
              });
            })}

          {/* <ModalWrapper dr={`row`} ju={`space-between`}>
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
            </ModalWrapper> */}

          <CommonButton
            width={`80%`}
            margin={`10px 0 0`}
            onClick={modalOK}
            margin={`0 0 20px`}
          >
            확인
          </CommonButton>
        </Wrapper>
      </Modal>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
