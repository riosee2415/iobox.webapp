import React, { useCallback, useState, useEffect } from "react";
import Theme from "../../../components/Theme";
import {
  Wrapper,
  WholeWrapper,
  RsWrapper,
  Text,
  Image,
  CommonButton,
  TextInput,
  Question,
  IoBoxWrapper,
} from "../../../components/commonComponents";
import styled from "styled-components";
import ClientLayout from "../../../components/ClientLayout";
import useWidth from "../../../hooks/useWidth";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import { message, Radio, Spin } from "antd";
import { numberWithCommas } from "../../../components/commonUtils";
import Footer from "../../../components/Footer";

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
    font-size: 1.3rem;
  }
`;

const Index = () => {
  const width = useWidth();
  const router = useRouter();

  const dataArr = {
    방문택배: 5000,
    예약방문: 7000,
    "편의점 셀프": 5000,
    "무인택배함 셀프": 3000,
  };

  ////// HOOKS //////
  const [tab, setTab] = useState(false);

  const [storeData, setStoreData] = useState(null);

  const [isCapture, setIsCapture] = useState(true);
  const [pickUp, setPickUp] = useState("");

  const [pickUpPrice, setPickUpPrice] = useState(0);

  ////// REDUX //////

  ////// USEEFFECT //////
  useEffect(() => {
    scrollTo(0, 0);
  }, [router.route]);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("DATA"));

    if (!data) {
      router.push("/");
      return;
    }

    if (data) {
      setIsCapture(data.isCapture ? data.isCapture : true);
      setPickUp(data.pickUp);
      setPickUpPrice(data.pickUpPrice ? data.pickUpPrice : 0);
      setStoreData(data);
    }
  }, []);

  useEffect(() => {
    if (pickUp) {
      let count = 0;

      storeData.boxs.map((data) => (count += data));

      console.log(count, dataArr[pickUp]);
      setPickUpPrice(count * dataArr[pickUp]);
    }
  }, [pickUp, storeData]);

  ////// TOGGLE ///////

  ///// HANDLER //////
  const nextStepHandler = useCallback(() => {
    if (!pickUp) {
      return message.error("픽업 방식을 선택해주세요.");
    }

    moveLinkHandler("/iobox/keep");
    sessionStorage.setItem(
      "DATA",
      JSON.stringify({
        ...storeData,
        pickUp,
        pickUpPrice,
        isCapture,
      })
    );
  }, [pickUp, pickUpPrice]);

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
  if (!storeData) {
    return <Spin />;
  }

  console.log(storeData);

  return (
    <>
      <WholeWrapper bgColor={Theme.lightGrey_C}>
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
          <RsWrapper
            minHeight={`100vh`}
            ju={`flex-start`}
            position={`relative`}
            al={`flex-start`}
            padding={`30px 0`}
          >
            <Wrapper dr={`row`} ju={`flex-start`}>
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/payment/present.png`}
                width={`30px`}
                margin={`0 10px 0 0`}
                alt={`icon`}
              />
              <Text bold={true} fontSize={`1.5rem`} margin={`0 0 0 5px`}>
                io박스 무료 서비스
              </Text>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`} margin={`20px 0`}>
              <Wrapper width={`auto`} dr={`row`}>
                <Radio
                  style={{ display: "flex", alignItems: "center" }}
                  checked={isCapture}
                  onClick={() => setIsCapture(!isCapture)}
                >
                  <Wrapper width={`auto`} al={`flex-start`}>
                    <Text>상자 보관 물건 촬영</Text>
                    <Text color={Theme.basicTheme_C} fontWeight={`700`}>
                      무료
                    </Text>
                  </Wrapper>
                </Radio>
              </Wrapper>
              <Question>
                <Text margin={`1px 0 0 2px`}>?</Text>
              </Question>
            </Wrapper>

            <Wrapper bgColor={Theme.lightGrey_C} height={`10px`}></Wrapper>

            <Wrapper dr={`row`} ju={`space-between`} margin={`20px 0 0`}>
              <Wrapper dr={`row`} width={`auto`}>
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/payment/bullet.png`}
                  width={`40px`}
                  margin={`0 10px 0 0 `}
                  alt={`icon`}
                />
                <Text bold={true} fontSize={`1.5rem`} margin={`0 0 0 5px`}>
                  픽업 방식
                </Text>
              </Wrapper>

              <Question>
                <Text margin={`1px 0 0 2px`}>?</Text>
              </Question>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              padding={`20px 0`}
              al={`flex-start`}
              borderBottom={`1px solid ${Theme.grey_C}`}
            >
              <Radio
                style={{ display: "flex", alignItems: "center" }}
                checked={pickUp === "방문택배"}
                onClick={() => setPickUp("방문택배")}
              >
                <Wrapper width={`auto`} al={`flex-start`}>
                  <Text>방문택배</Text>
                  {/* <Text>(21년 11월 03일 ~ 21년 11월 05일 방문)</Text> */}
                  {/* <Text color={Theme.grey_C} fontSize={`0.8rem`}>
                    {numberWithCommas(dataArr["방문택배"])}원 (보관함 1개당)
                  </Text> */}
                </Wrapper>
              </Radio>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              padding={`20px 0`}
              al={`flex-start`}
              borderBottom={`1px solid ${Theme.grey_C}`}
            >
              <Radio
                style={{ display: "flex", alignItems: "center" }}
                checked={pickUp === "예약방문"}
                onClick={() => setPickUp("예약방문")}
              >
                <Wrapper width={`auto`} al={`flex-start`}>
                  <Text>예약방문 - 서울 (방문일 지정)</Text>
                  {/* <Text color={Theme.grey_C} fontSize={`0.8rem`}>
                    {numberWithCommas(dataArr["예약방문"])}원 (보관함 1개당)
                  </Text> */}
                </Wrapper>
              </Radio>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={`20px 0`}
              borderBottom={`1px solid ${Theme.grey_C}`}
            >
              <Wrapper dr={`row`} width={`auto`} al={`flex-start`}>
                <Radio
                  style={{ display: "flex", alignItems: "center" }}
                  checked={pickUp === "편의점 셀프"}
                  onClick={() => setPickUp("편의점 셀프")}
                >
                  <Wrapper width={`auto`} al={`flex-start`}>
                    <Text>편의점 셀프 접수</Text>
                    {/* <Text color={Theme.grey_C} fontSize={`0.8rem`}>
                      {numberWithCommas(dataArr["편의점 셀프"])}원 (보관함
                      1개당)
                    </Text> */}
                  </Wrapper>
                </Radio>
              </Wrapper>

              <Wrapper
                padding={`5px 10px`}
                radius={`20px`}
                fontSize={`0.7rem`}
                bgColor={Theme.lightBaiscTheme_C}
                color={Theme.basicTheme_C}
                width={`auto`}
                cursor={`pointer`}
              >
                빠른접수
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={`20px 0`}
              borderBottom={`1px solid ${Theme.grey_C}`}
            >
              <Wrapper dr={`row`} width={`auto`} al={`flex-start`}>
                <Radio
                  style={{ display: "flex", alignItems: "center" }}
                  checked={pickUp === "무인택배함 셀프"}
                  onClick={() => setPickUp("무인택배함 셀프")}
                >
                  <Wrapper width={`auto`} al={`flex-start`}>
                    <Text>무인택배함 셀프 접수</Text>
                    {/* <Text color={Theme.grey_C} fontSize={`0.8rem`}>
                      {numberWithCommas(dataArr["무인택배함 셀프"])}원 (보관함
                      1개당)
                    </Text> */}
                  </Wrapper>
                </Radio>
              </Wrapper>

              <Wrapper
                padding={`5px 10px`}
                radius={`20px`}
                fontSize={`0.7rem`}
                bgColor={Theme.lightBaiscTheme_C}
                color={Theme.basicTheme_C}
                width={`auto`}
                cursor={`pointer`}
              >
                빠른접수
              </Wrapper>
            </Wrapper>
          </RsWrapper>
        </IoBoxWrapper>
      </WholeWrapper>

      <Wrapper
        position={`sticky`}
        bottom={`0`}
        left={`0`}
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
                storeData.totalPay
                // -  (storeData.type === "정기" ? storeData.totalPay * 0.1 : 0)
              )}
              원
            </Text>
            <PayButtton bold={true} fontSize={`1.2rem`} cursor={`pointer`}>
              예상금액 상세
            </PayButtton>
          </Wrapper>
          <CommonButton
            width={width < 700 ? `95px` : `110px`}
            height={width < 700 ? `40px` : `50px`}
            onClick={moveBackHandler}
            kindOf={`white`}
          >
            이전
          </CommonButton>
          <CommonButton
            width={width < 700 ? `95px` : `110px`}
            height={width < 700 ? `40px` : `50px`}
            onClick={nextStepHandler}
          >
            다음
          </CommonButton>
        </IoBoxWrapper>
      </Wrapper>

      <Wrapper bgColor={Theme.lightGrey_C}>
        <Footer />
      </Wrapper>
    </>
  );
};

export default Index;
