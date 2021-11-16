import React, { useCallback, useState } from "react";
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

  ////// HOOKS //////
  const [tab, setTab] = useState(false);
  const [number, setNumber] = useState(0);

  const [moreTab, setMoreTab] = useState(false);

  ////// REDUX //////

  ////// USEEFFECT //////

  ////// TOGGLE ///////

  const moreTabToggle = useCallback(() => {
    setMoreTab(!moreTab);
  }, [moreTab]);

  ///// HANDLER //////
  const minusNumberHandler = useCallback(() => {
    setNumber(number - 1);

    if (number === 0) {
      setNumber(0);
    }
  }, [number]);

  const plusNumberHandler = useCallback(() => {
    setNumber(number + 1);
  }, [number]);

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
              <Text bold={true} fontSize={`2rem`}>
                io박스
              </Text>
              <Wrapper al={`flex-start`} margin={`10px 0 0`}>
                <Text>배송&#38;보관박스 크기</Text>
                <Text fontWeight={`700`}>W55 x H35 x D30 (CM)</Text>
              </Wrapper>

              <Wrapper width={`auto`} al={`flex-end`}>
                <Text
                  color={Theme.grey_C}
                  bold={true}
                  fontSize={`1.5rem`}
                  margin={`30px 0 0`}
                >
                  iO 베이직 월 9,000원
                </Text>
                <TextButton onClick={moreTabToggle}>자세히 보기</TextButton>
              </Wrapper>

              <Wrapper minHeight={`300px`} margin={`10px 0`} zIndex={`1`}>
                <BoxSlider datum={[1, 2, 3, 4]} line={1} row={1} />
              </Wrapper>

              <Wrapper ju={`flex-end`} dr={`row`}>
                <Wrapper
                  width={`30px`}
                  height={`30px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.darkGrey2_C}`}
                  onClick={minusNumberHandler}
                  cursor={`pointer`}
                >
                  <MinusOutlined />
                </Wrapper>
                <Text fontWeight={`700`} margin={`0 20px`}>
                  {number}
                </Text>
                <Wrapper
                  width={`30px`}
                  height={`30px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.darkGrey2_C}`}
                  onClick={plusNumberHandler}
                  cursor={`pointer`}
                >
                  <PlusOutlined />
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={`row`}
                ju={`space-between`}
                margin={`20px 0 0`}
                opacity={number === 0 ? `0` : `1`}
                trnansition={`0.5s`}
              >
                <Text fontSize={`1.1rem`}>iO 박스 W55 x H35 x D30 (CM)</Text>

                <Wrapper dr={`row`} width={`auto`}>
                  <Text fontSize={`1.1rem`} fontWeight={`700`}>
                    {number}개
                  </Text>

                  <Wrapper
                    width={`18px`}
                    height={`18px`}
                    bgColor={Theme.black2_C}
                    radius={`50%`}
                    margin={`0 0 0 5px`}
                    color={Theme.white_C}
                    onClick={() => {
                      setNumber(0);
                    }}
                  >
                    <CloseOutlined />
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`} ju={`space-between`} margin={`50px 0 0`}>
                <Wrapper width={`auto`} dr={`row`}>
                  <Image src={`#`} alt={`icon`} width={`30px`} />
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
                <Radio />
                <Wrapper width={`auto`} al={`flex-start`}>
                  <Text>단기</Text>
                  <Text color={Theme.grey_C} fontSize={`0.8rem`}>
                    월 단위
                  </Text>
                </Wrapper>
              </Wrapper>

              <Wrapper
                padding={`20px 0`}
                dr={`row`}
                ju={`flex-start`}
                al={`flex-start`}
                borderBottom={`1px solid ${Theme.grey_C}`}
              >
                <Radio />
                <Wrapper width={`auto`} al={`flex-start`}>
                  <Text>장기약정</Text>
                  <Text color={Theme.grey_C} fontSize={`0.8rem`}>
                    6개월 이상, 선 결제 30% 할인
                  </Text>
                </Wrapper>
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
                월 9,000
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
            <Image src={`#`} width={`60px`} margin={`0 0 10px`} />

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
                src={`#`}
                alt={`arrow`}
                width={`50px`}
                margin={`0 10px 0 30px`}
              />
              <Text fontSize={`1.2rem`} bold={true} color={Theme.basicTheme_C}>
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
