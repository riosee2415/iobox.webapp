import React, { useCallback, useState } from "react";
import {
  Image,
  Wrapper,
  Text,
  GradientText,
  WholeWrapper,
} from "./commonComponents";
import Theme from "./Theme";
import styled from "styled-components";
import { Drawer } from "antd";
import useWidth from "../hooks/useWidth";

const IconBox = styled(Wrapper)`
  width: 200px;
  cursor: pointer;

  ${Image} {
    transition: 0.5s;
    margin: 0 0 5px;
  }

  &:hover ${Image} {
    width: 50px;
  }

  @media (max-width: 700px) {
    width: 130px;
  }
`;

const CircleWrapper = styled(Wrapper)`
  cursor: pointer;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 700px) {
    width: 110px;
    height: 110px;
  }
`;

const ButtonWrapper = styled(Wrapper)`
  position: absolute;
  top: -90px;
  left: 50%;
  cursor: pointer;
  width: auto;
  margin: 0 0 0 -76px;

  &:hover {
    .circle {
      width: 30px;
      height: 30px;
    }
  }
`;

const TextWrapper = styled(Wrapper)`
  width: auto;
  cursor: pointer;

  & h2 {
    color: ${Theme.darkGrey_C} !important;
    background: initial !important;
    -webkit-text-fill-color: initial !important;
    -webkit-background-clip: initial !important;

    transition: 0.5s;
  }

  &:hover h2 {
    background: linear-gradient(
      90deg,
      rgb(249, 2, 80),
      rgb(247, 141, 150),
      rgb(242, 146, 98),
      rgb(241, 115, 80)
    );

    -webkit-text-fill-color: transparent !important;
    -webkit-background-clip: text !important;
  }
`;

const Logo = styled(Image)`
  width: 200px !important;

  @media (max-width: 700px) {
    width: 150px !important;
    margin-top: 10px;
  }
`;

const AppFooter = () => {
  const width = useWidth();
  ////// HOOKS //////

  const [tab, setTab] = useState(false);

  const [drawar, setDrawar] = useState(false);

  ////// REDUX //////

  ////// USEEFFECT //////

  ////// TOGGLE ///////

  const tabToggle = useCallback(() => {
    setTab(!tab);
  }, [tab]);

  const drawarToggle = useCallback(() => {
    setDrawar(!drawar);
  });
  ///// HANDLER //////

  ////// DATAVIEW //////
  return (
    <>
      {tab ? (
        <Wrapper
          position={`absolute`}
          bottom={`0`}
          left={width < 700 ? `0` : `50%`}
          margin={width < 700 ? `0` : `0 0 0 -250px`}
          width={width < 700 ? `100%` : `500px`}
          height={`100vh`}
          zIndex={`1000`}
        >
          <Wrapper
            bgColor={`rgba(0,0,0,0.7)`}
            height={`100%`}
            ju={`flex-end`}
            overflow={`hidden`}
          >
            <Wrapper width={`auto`} al={`flex-start`}>
              <Image
                width={`60px`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/circle7.png`}
              />

              <GradientText bold={true} fontSize={`2rem`} margin={`10px 0 0`}>
                종이박스 배송
              </GradientText>

              <Text
                color={Theme.white_C}
                bold={true}
                fontSize={`1.5rem`}
                margin={`15px 0`}
              >
                의류,물건,서류,책
              </Text>
              <Text color={Theme.white_C} bold={true} fontSize={`1.5rem`}>
                각종 내 방안의 짐
              </Text>
              <Text
                color={Theme.white_C}
                bold={true}
                fontSize={`1.5rem`}
                margin={`15px 0 0`}
              >
                원할 때 맡기고 원할 때 찾기
              </Text>
            </Wrapper>

            <Wrapper padding={`0 10px`} margin={`40px 0 -5px`}>
              <Wrapper
                height={width < 700 ? `355px` : `480px`}
                bgColor={`rgba(255,255,255,0.7)`}
                radius={`50%`}
                position={`relative`}
              >
                <Wrapper
                  height={`100%`}
                  position={`absolute`}
                  top={`0`}
                  left={`0`}
                >
                  <Wrapper width={`auto`} height={`calc(100% / 4)`}>
                    <IconBox>
                      <Image
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/box.png`}
                        alt={`icon`}
                        width={`40px`}
                      />
                      <Text>io 박스</Text>
                    </IconBox>
                  </Wrapper>
                  <Wrapper
                    height={`calc(100% / 4)`}
                    ju={`space-between`}
                    dr={`row`}
                    margin={`-20px 0 0`}
                  >
                    <IconBox>
                      <Image
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/truck.png`}
                        alt={`icon`}
                        width={`40px`}
                      />
                      <Text>배송현황</Text>
                    </IconBox>
                    <IconBox>
                      <Image
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/case.png`}
                        alt={`icon`}
                        width={`40px`}
                      />
                      <Text>io 베이직</Text>
                    </IconBox>
                  </Wrapper>

                  <Wrapper
                    height={`calc(100% / 4)`}
                    ju={`space-between`}
                    dr={`row`}
                  >
                    <IconBox>
                      <Image
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/user.png`}
                        alt={`icon`}
                        width={`40px`}
                      />
                      <Text>내 정보</Text>
                    </IconBox>
                    <IconBox>
                      <Image
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/Locker.png`}
                        alt={`icon`}
                        width={`40px`}
                      />
                      <Text>io 프리미엄</Text>
                    </IconBox>
                  </Wrapper>
                  <Wrapper height={`calc(100% / 4)`} margin={`-20px 0 0`}>
                    <IconBox>
                      <Image
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/likes.png`}
                        alt={`icon`}
                        width={`40px`}
                      />
                      <Text>io 정기구독</Text>
                    </IconBox>
                  </Wrapper>
                </Wrapper>

                <CircleWrapper
                  onClick={tabToggle}
                  bgColor={`linear-gradient(90deg,rgb(249, 2, 80),rgb(247, 141, 150),rgb(242, 146, 98),rgb(241, 115, 80))`}
                >
                  <Wrapper
                    cursor={`pointer`}
                    width={width < 700 ? `40px` : `60px`}
                    height={width < 700 ? `40px` : `60px`}
                    radius={`50%`}
                    bgColor={Theme.white_C}
                    className="circle"
                  ></Wrapper>
                </CircleWrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      ) : (
        <Wrapper
          position={`absolute`}
          bottom={`0`}
          left={width < 700 ? `0` : `50%`}
          margin={width < 700 ? `0` : `0 0 0 -250px`}
          width={width < 700 ? `100%` : `500px`}
        >
          <Wrapper
            dr={`row`}
            height={`100px`}
            shadow={`0px -3px 10px ${Theme.grey_C}`}
            position={`relative`}
          >
            <ButtonWrapper onClick={tabToggle}>
              <GradientText className="gradient" bold={true}>
                내 물건 맡기기
              </GradientText>

              <Wrapper
                width={`100px`}
                height={`100px`}
                radius={`50%`}
                bgColor={`linear-gradient(90deg,rgb(249, 2, 80),rgb(247, 141, 150),rgb(242, 146, 98),rgb(241, 115, 80))`}
              >
                <Wrapper
                  width={`45px`}
                  height={`45px`}
                  radius={`50%`}
                  bgColor={Theme.white_C}
                  className="circle"
                ></Wrapper>
              </Wrapper>
            </ButtonWrapper>

            <Wrapper dr={`row`} ju={`space-around`}>
              <TextWrapper width={`auto`} onClick={drawarToggle}>
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/menu_home.png`}
                  alt={`menuIcon`}
                  width={`30px`}
                  margin={`0 0 5px`}
                />

                <GradientText fontSize={`0.8rem`} bold={true} padding={`0`}>
                  메 뉴
                </GradientText>
              </TextWrapper>
              <TextWrapper width={`auto`}>
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/menu_box.png`}
                  alt={`menuIcon`}
                  width={`30px`}
                  margin={`0 0 5px`}
                />
                <GradientText fontSize={`0.8rem`} bold={true} padding={`0`}>
                  내 보관함
                </GradientText>
              </TextWrapper>
            </Wrapper>

            {drawar && (
              <Drawer
                placement="left"
                closable={true}
                onClose={drawarToggle}
                // visible={drawarToggle}
                visible={true}
                getContainer={false}
              >
                <Image
                  src={`https://via.placeholder.com/100x100`}
                  margin={`50px 0 100px 40px`}
                  width={`100px`}
                  alt={`logo`}
                />
                <Wrapper padding={`0 0 0 30px`} al={`flex-start`}>
                  <Wrapper al={`flex-start`}>
                    <Text fontSize={`1.4rem`} margin={`0 0 40px`}>
                      아이오 박스란?
                    </Text>
                  </Wrapper>
                  <Wrapper al={`flex-start`}>
                    <Text fontSize={`1.4rem`} margin={`0 0 40px`}>
                      서비스 이용방법
                    </Text>
                  </Wrapper>
                  <Wrapper al={`flex-start`}>
                    <Text fontSize={`1.4rem`} margin={`0 0 40px`}>
                      서비스 이용료
                    </Text>
                  </Wrapper>
                  <Wrapper al={`flex-start`}>
                    <Text fontSize={`1.4rem`} margin={`0 0 40px`}>
                      IO박스 보관센터
                    </Text>
                  </Wrapper>
                  <Wrapper al={`flex-start`}>
                    <Text fontSize={`1.4rem`} margin={`0 0 40px`}>
                      배송현황
                    </Text>
                  </Wrapper>
                  <Wrapper al={`flex-start`}>
                    <Text fontSize={`1.4rem`} margin={`0 0 40px`}>
                      내 물건 찾기
                    </Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper al={`flex-start`}>
                  <Wrapper height={`30px`} bgColor={Theme.lightGrey_C}>
                    1
                  </Wrapper>
                  <Wrapper height={`30px`} bgColor={Theme.lightGrey_C}>
                    2
                  </Wrapper>
                  <Wrapper height={`30px`} bgColor={Theme.lightGrey_C}>
                    3
                  </Wrapper>
                </Wrapper>

                <Wrapper dr={`row`}>
                  <Text display={`flex`}>로그인</Text>
                  <Text>고객센터</Text>
                </Wrapper>
              </Drawer>
            )}
          </Wrapper>
        </Wrapper>
      )}
    </>
  );
};

export default AppFooter;
