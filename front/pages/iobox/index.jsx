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
} from "../../components/commonComponents";
import styled from "styled-components";
import ClientLayout from "../../components/ClientLayout";
import useWidth from "../../hooks/useWidth";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import BoxSlider from "../../components/slide/BoxSlider";
import { Checkbox, Radio } from "antd";
import { numberWithCommas } from "../../components/commonUtils";

const PayButtton = styled(Wrapper)`
  color: ${Theme.basicTheme_C};
  width: auto;
  font-size: 1.2rem;
  position: relative;

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

const Index = () => {
  const width = useWidth();
  const router = useRouter();

  const dataArr = [
    //
    ["io박스", "W55 x H35 x D30 (CM)", "iO 베이직 월", 9000],
    ["행거박스", "W55 x H35 x D30 (CM)", "iO 베이직 월", 19000],
    ["텐트박스", "W55 x H35 x D30 (CM)", "iO 베이직 월", 29000],
    ["대용량 박스", "W55 x H35 x D30 (CM)", "iO 베이직 월", 39000],
  ];

  ////// HOOKS //////
  const [tab, setTab] = useState(false);

  const [type, setType] = useState("");
  const [moreTab, setMoreTab] = useState(false);

  const [currentBox, setCurrentBox] = useState(0);
  const [currentBuy, setCurrentBuy] = useState([0, 0, 0, 0]);

  const [totalPay, setTotalPay] = useState(0);

  ////// REDUX //////

  ////// USEEFFECT //////
  useEffect(() => {
    let tempPay = 0;

    currentBuy.map((data, idx) => {
      tempPay += dataArr[idx][3] * data;
    });

    setTotalPay(tempPay);
  }, [currentBuy]);

  ////// TOGGLE ///////

  const moreTabToggle = useCallback(() => {
    setMoreTab(!moreTab);
  }, [moreTab]);

  ///// HANDLER //////
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
        <Wrapper
          width={width < 700 ? `100%` : `500px`}
          height={`100%`}
          shadow={`0px 0px 10px ${Theme.grey_C}`}
          bgColor={Theme.white_C}
          overflowX={`hidden`}
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
              moveLinkHandler("/");
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
                  setCurrentBox={setCurrentBox}
                />
              </Wrapper>
              <Wrapper ju={`flex-end`} dr={`row`}>
                <Wrapper
                  width={`30px`}
                  height={`30px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.darkGrey2_C}`}
                  onClick={() => numberHandler(-1)}
                  cursor={`pointer`}
                >
                  <MinusOutlined />
                </Wrapper>
                <Text fontWeight={`700`} margin={`0 20px`}>
                  {currentBuy[currentBox]}
                </Text>
                <Wrapper
                  width={`30px`}
                  height={`30px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.darkGrey2_C}`}
                  onClick={() => numberHandler(+1)}
                  cursor={`pointer`}
                >
                  <PlusOutlined />
                </Wrapper>
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

                        <Wrapper
                          width={`18px`}
                          height={`18px`}
                          bgColor={Theme.black2_C}
                          radius={`50%`}
                          margin={`0 0 0 5px`}
                          color={Theme.white_C}
                          onClick={() => {
                            deleteBuyHandler(idx);
                          }}
                        >
                          <CloseOutlined />
                        </Wrapper>
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

                <Wrapper
                  width={`20px`}
                  height={`20px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.grey_C}`}
                  color={Theme.grey_C}
                  cursor={`pointer`}
                >
                  <Text margin={`1px 0 0 2px`}>?</Text>
                </Wrapper>
              </Wrapper>

              <Wrapper
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
              </Wrapper>
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
                      6개월 이상, 선 결제 30% 할인
                    </Text>
                  </Wrapper>
                </Radio>
              </Wrapper>
            </RsWrapper>
          </Wrapper>
        </Wrapper>
      </WholeWrapper>

      <Wrapper
        position={`sticky`}
        bottom={`0`}
        left={width < 700 ? `0` : `50%`}
        margin={width < 700 ? `0` : `0 0 0 -250px`}
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
              <Text bold={true} fontSize={`1.2rem`}>
                월 {numberWithCommas(totalPay)}원
              </Text>
              <PayButtton bold={true} fontSize={`1.2rem`} cursor={`pointer`}>
                예상금액 상세
              </PayButtton>
            </Wrapper>

            <CommonButton
              width={`130px`}
              height={`50px`}
              onClick={() => {
                moveLinkHandler("/iobox/service");
              }}
            >
              다음
            </CommonButton>
          </RsWrapper>
        </Wrapper>
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
              종이박스 배송
            </GradientText>
            <Text color={Theme.white_C} bold={true} fontSize={`1.4rem`}>
              의류,물건,서류,책
            </Text>
            <Text color={Theme.white_C} bold={true} fontSize={`1.4rem`}>
              각종 내 방안의 집
            </Text>
            <Text color={Theme.white_C} bold={true} fontSize={`1.4rem`}>
              원할 때 맡기고 원할 때 찾기
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
                월 8,900원
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
                월 5,000원
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
                to. 8,900원
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

export default Index;
