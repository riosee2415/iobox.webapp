import React, { useCallback, useEffect, useState } from "react";
import Theme from "../../components/Theme";
import {
  Wrapper,
  WholeWrapper,
  RsWrapper,
  Text,
  Image,
  CommonButton,
  GradientText,
  Question,
  Canceal,
  IoBoxWrapper,
} from "../../components/commonComponents";
import styled from "styled-components";
import ClientLayout from "../../components/ClientLayout";
import useWidth from "../../hooks/useWidth";
import {
  CloseOutlined,
  DownOutlined,
  UpOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import BoxSlider from "../../components/slide/BoxSlider";
import { Checkbox, message, notification, Radio } from "antd";
import { numberWithCommas } from "../../components/commonUtils";
import Footer from "../../components/Footer";

import axios from "axios";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";

const Box = styled(Wrapper)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid ${Theme.darkGrey2_C};
  cursor: pointer;

  &:hover {
    background: ${Theme.darkGrey2_C};
    color: ${Theme.white_C};
  }
`;

const PayButtton = styled(Wrapper)`
  color: ${Theme.basicTheme_C};
  width: auto;
  font-size: 1.2rem;
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
    font-size: 1.4rem;
  }
`;

const TextButton = styled(Wrapper)`
  color: ${Theme.blue_C};
  width: auto;
  position: relative;
  padding: 0 0 2px;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: ${Theme.blue_C};
    transition: 0.5s;
  }

  &:hover {
    font-weight: 700;
    &:before {
      width: 100%;
    }
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
  const router = useRouter();

  const dataArr = [
    //
    ["행거박스", "W58 x H100 x D30 (CM)", "월", 19000],
    ["행거박스 plus+", "W58 x H130 x D60 (CM)", "월", 39000],
    ["텐트박스", "W100 x H45 x D45 (CM)", "월", 39000],
    ["캠핑박스 plus+", "W110 x H50 x D50 (CM)", "월", 59000],
  ];

  const dataArr2 = [
    [
      "",
      "행거박스",
      "각종 의류 구김 없이",
      "걸어서 보관하는",
      "행거형 박스!",
      "",
      19000,
      5000,
    ],
    [
      "",
      "행거박스 plus+",
      "걸수 있는 옷도 ok",
      "개서 보관할 수 있는 옷도 ok",
      "다용도! 대용량! 의류수납",
      "토탈박스",
      39000,
      8000,
    ],
    [
      "",
      "텐트박스",
      "일반 텐트 1개를",
      "안전하게 보관 할 수",
      "있는 텐트 보관 박스",
      "",
      39000,
      6000,
    ],
    [
      "",
      "캠핑박스 plus+",
      "텐트,각종 캠핑 장비",
      "등을 보관 할 수 있는",
      "대형 강화 박스",
      "",
      59000,
      8000,
    ],
  ];

  ////// HOOKS //////
  const [tab, setTab] = useState(false);

  const [type, setType] = useState("");
  const [moreTab, setMoreTab] = useState(false);

  const [currentBox, setCurrentBox] = useState(0);
  const [currentBuy, setCurrentBuy] = useState([0, 0, 0, 0]);

  const [totalPay, setTotalPay] = useState(0);

  ////// REDUX //////

  const { me } = useSelector((state) => state.user);

  ////// USEEFFECT //////

  useEffect(() => {
    if (!me) {
      router.push("/");

      return LoadNotification("로그인 후 이용해주세요.");
    }
  }, [me]);

  useEffect(() => {
    scrollTo(0, 0);
  }, [router.route]);

  useEffect(() => {
    const type = router.query.type;
    if (type) {
      if (type === "iobox") {
        setCurrentBox(0);
      }
      if (type === "hangerBox") {
        setCurrentBox(1);
      }
      if (type === "tentBox") {
        setCurrentBox(2);
      }
      if (type === "bigBox") {
        setCurrentBox(3);
      }
    }
  }, [router.query]);

  useEffect(() => {
    let tempPay = 0;

    currentBuy.map((data, idx) => {
      tempPay += dataArr[idx][3] * data;
    });

    setTotalPay(tempPay);
  }, [currentBuy]);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("DATA"));

    console.log(data);
    if (data) {
      setCurrentBuy(data.boxs ? data.boxs : [0, 0, 0, 0]);
      setTotalPay(data.totalPay);
      setType(data.type);
    }

    sessionStorage.setItem("DATA", null);
  }, []);

  ////// TOGGLE ///////

  const moreTabToggle = useCallback(() => {
    setMoreTab(!moreTab);
  }, [moreTab]);

  ///// HANDLER //////
  const nextStepHandler = useCallback(() => {
    if (!type || type.trim() === "") {
      return message.error("보관 기간을 선택해주세요.");
    }
    if (totalPay === 0) {
      return message.error("박스를 선택해주세요.");
    }

    moveLinkHandler("/iobox/service");
    sessionStorage.setItem(
      "DATA",
      JSON.stringify({
        boxs: currentBuy,
        type,
        totalPay,
      })
    );
  }, [type, totalPay]);
  const numberHandler = useCallback(
    (value) => {
      let tempArr = currentBuy.map((data, idx) => {
        return idx === currentBox
          ? data + value < 0
            ? 0
            : data + value
          : data;
      });

      console.log(tempArr);

      setCurrentBuy(tempArr);

      // if (number + value >= 0) setNumber(number + value);
    },
    [currentBox, currentBuy]
  );

  const deleteBuyHandler = useCallback(
    (id) => {
      let tempArr = currentBuy.map((data, idx) => {
        return idx === id ? 0 : data;
      });

      setCurrentBuy(tempArr);
    },
    [currentBox, currentBuy]
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
        <IoBoxWrapper
          minHeight={`100vh`}
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
            onClick={() => {
              moveLinkHandler("/main");
              sessionStorage.removeItem("DATA");
            }}
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
              <Text bold={true} fontSize={`2rem`}>
                {dataArr[currentBox][0]}
              </Text>
              <Wrapper al={`flex-start`} margin={`10px 0 0`}>
                <Text>배송&#38;보관박스 크기</Text>
                <Text fontWeight={`700`}> {dataArr[currentBox][1]}</Text>
              </Wrapper>
              <Wrapper width={`auto`} al={`flex-end`}>
                <Text
                  color={Theme.grey_C}
                  bold={true}
                  fontSize={`1.5rem`}
                  margin={`30px 0 0`}
                >
                  {dataArr[currentBox][2]}{" "}
                  {numberWithCommas(dataArr[currentBox][3])}원
                </Text>
                <TextButton onClick={moreTabToggle}>자세히 보기</TextButton>
              </Wrapper>
              <Wrapper minHeight={`300px`} margin={`10px 0`} zIndex={`1`}>
                <BoxSlider
                  datum={[1, 2, 3, 4]}
                  line={1}
                  row={1}
                  //
                  currentBox={currentBox}
                  setCurrentBox={setCurrentBox}
                />
              </Wrapper>
              <Wrapper ju={`flex-end`} dr={`row`}>
                <Box onClick={() => numberHandler(-1)}>
                  <MinusOutlined />
                </Box>
                <Text fontWeight={`700`} margin={`0 20px`}>
                  {currentBuy[currentBox]}
                </Text>
                <Box onClick={() => numberHandler(+1)}>
                  <PlusOutlined />
                </Box>
              </Wrapper>
              {currentBuy.map((data, idx) => {
                return (
                  data > 0 && (
                    <Wrapper
                      key={idx}
                      dr={`row`}
                      ju={`space-between`}
                      margin={`20px 0 0`}
                      trnansition={`0.5s`}
                    >
                      <Text fontSize={`1.1rem`}>
                        {dataArr[idx][0]} {dataArr[idx][1]}
                      </Text>

                      <Wrapper dr={`row`} width={`auto`}>
                        <Text fontSize={`1.1rem`} fontWeight={`700`}>
                          {data}개
                        </Text>

                        <Canceal
                          onClick={() => {
                            deleteBuyHandler(idx);
                          }}
                        >
                          <CloseOutlined />
                        </Canceal>
                      </Wrapper>
                    </Wrapper>
                  )
                );
              })}
              <Wrapper dr={`row`} ju={`space-between`} margin={`50px 0 0`}>
                <Wrapper width={`auto`} dr={`row`}>
                  <Image
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/payment/schedule.png`}
                    alt={`icon`}
                    width={`25px`}
                    margin={`0 10px 0 0`}
                  />
                  <Text bold={true} fontSize={`1.2rem`}>
                    보관기간
                  </Text>
                </Wrapper>

                <Question>
                  <Text margin={`1px 0 0 2px`}>?</Text>
                </Question>
              </Wrapper>

              {/* <Wrapper
                padding={`20px 0`}
                dr={`row`}
                ju={`flex-start`}
                al={`flex-start`}
                borderBottom={`1px solid ${Theme.grey_C}`}
              >
                <Radio
                  style={{ display: "flex", alignItems: "center" }}
                  checked={type === "단기"}
                  onClick={() => setType("단기")}
                >
                  <Wrapper width={`auto`} al={`flex-start`}>
                    <Text>단기</Text>
                    <Text color={Theme.grey_C} fontSize={`0.8rem`}>
                      월 단위
                    </Text>
                  </Wrapper>
                </Radio>
              </Wrapper> */}
              <Wrapper
                padding={`20px 0`}
                dr={`row`}
                ju={`flex-start`}
                al={`flex-start`}
                borderBottom={`1px solid ${Theme.grey_C}`}
              >
                <Radio
                  style={{ display: "flex", alignItems: "center" }}
                  checked={type === "정기"}
                  onClick={() => setType("정기")}
                >
                  <Wrapper width={`auto`} al={`flex-start`}>
                    <Text>장기약정</Text>
                    <Text color={Theme.grey_C} fontSize={`0.8rem`}>
                      {/* 6개월 이상, 선 결제 10% 할인 */}
                    </Text>
                  </Wrapper>
                </Radio>
              </Wrapper>
            </RsWrapper>
          </Wrapper>
        </IoBoxWrapper>
      </WholeWrapper>

      <Wrapper
        position={`sticky`}
        bottom={`0`}
        left={width < 700 ? `0` : `50%`}
        margin={width < 700 ? `0` : `0 0 0 -250px`}
        bgColor={Theme.lightGrey_C}
        zIndex={`1000`}
      >
        <IoBoxWrapper
          bgColor={Theme.white_C}
          padding={width < 700 ? `20px 30px` : `20px 50px`}
          dr={`row`}
          ju={`space-between`}
        >
          <Wrapper width={`auto`} al={`flex-start`}>
            <Text bold={true} fontSize={`1.2rem`}>
              월{" "}
              {numberWithCommas(
                totalPay
                // - (type === "정기" ? totalPay * 0.1 : 0)
              )}
              원
            </Text>
            <PayButtton bold={true} fontSize={`1.2rem`} cursor={`pointer`}>
              예상금액 상세
            </PayButtton>
          </Wrapper>

          <CommonButton
            width={`130px`}
            height={`50px`}
            onClick={nextStepHandler}
          >
            다음
          </CommonButton>
        </IoBoxWrapper>
      </Wrapper>
      <Wrapper bgColor={Theme.lightGrey_C}>
        <Footer />
      </Wrapper>

      {moreTab && (
        <Wrapper
          bgColor={`rgba(0,0,0,0.8)`}
          height={`100vh`}
          width={width < 700 ? `100%` : `500px`}
          position={`fixed`}
          top={`0`}
          left={width < 700 ? `0` : `50%`}
          margin={width < 700 ? `0` : `0 0 0 -250px`}
          zIndex={`1000`}
        >
          <Wrapper
            padding={`5px`}
            width={`auto`}
            position={`absolute`}
            top={`30px`}
            right={`30px`}
            fontSize={`20px`}
            cursor={`pointer`}
            onClick={moreTabToggle}
            color={Theme.white_C}
            zIndex={`100`}
          >
            <CloseOutlined />
          </Wrapper>

          <Wrapper width={`auto`} al={`flex-start`}>
            <Image
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/paperbox.png`}
              width={`60px`}
              margin={`0 0 10px`}
            />

            <GradientText bold={true} fontSize={`2.2rem`}>
              {dataArr2[currentBox][1]}
            </GradientText>
            <Text color={Theme.white_C} bold={true} fontSize={`1.4rem`}>
              {dataArr2[currentBox][2]}
            </Text>
            <Text color={Theme.white_C} bold={true} fontSize={`1.4rem`}>
              {dataArr2[currentBox][3]}
            </Text>
            <Text color={Theme.white_C} bold={true} fontSize={`1.4rem`}>
              {dataArr2[currentBox][4]}
            </Text>
            <Text color={Theme.white_C} bold={true} fontSize={`1.4rem`}>
              {dataArr2[currentBox][5]}
            </Text>

            <Text
              margin={`30px 0 0`}
              color={Theme.basicTheme_C}
              bold={true}
              fontSize={`1.5rem`}
            >
              한 박스 기준
            </Text>

            <Wrapper width={`auto`} dr={`row`}>
              <Text color={Theme.white_C} fontSize={`1.2rem`} bold={true}>
                보관료
              </Text>
              <Text
                color={Theme.white_C}
                fontSize={`1.2rem`}
                bold={true}
                margin={`0 0 0 20px`}
              >
                월 {numberWithCommas(dataArr2[currentBox][6])}원
              </Text>
            </Wrapper>
            <Wrapper width={`auto`} dr={`row`}>
              <Text color={Theme.white_C} fontSize={`1.2rem`} bold={true}>
                배송비
              </Text>
              <Text
                color={Theme.white_C}
                fontSize={`1.2rem`}
                bold={true}
                margin={`0 0 0 20px`}
              >
                월 {numberWithCommas(dataArr2[currentBox][7])}원
              </Text>
            </Wrapper>

            <Wrapper dr={`row`} width={`auto`}>
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/arrow.png`}
                alt={`arrow`}
                width={`40px`}
                margin={`0 10px 0 30px`}
              />
              <Text
                fontSize={`1.2rem`}
                bold={true}
                color={Theme.basicTheme_C}
                margin={`8px 0 0`}
              >
                to.&nbsp;
                {numberWithCommas(
                  dataArr2[currentBox][6] + dataArr2[currentBox][7]
                )}
                원
              </Text>
            </Wrapper>

            <Text
              color={Theme.white_C}
              bold={true}
              margin={`50px 0 0`}
              fontSize={`1.2rem`}
            >
              약정없이 해지도 쿨하게!
            </Text>
          </Wrapper>
        </Wrapper>
      )}
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
