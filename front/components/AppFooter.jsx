import React, { useCallback, useState, useEffect } from "react";
import {
  Image,
  Wrapper,
  Text,
  GradientText,
  WholeWrapper,
  RsWrapper,
} from "./commonComponents";
import Theme from "./Theme";
import styled, { ThemeContext } from "styled-components";
import { Drawer, notification } from "antd";
import useWidth from "../hooks/useWidth";
import { useRouter } from "next/dist/client/router";
import { Planet } from "react-planet";
import { MenuOutlined } from "@ant-design/icons";
import { LOAD_MY_INFO_REQUEST, LOGOUT_REQUEST } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Footer from "./Footer";

import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";

const FirstDisplay = styled(Wrapper)`
  width: auto;

  position: absolute;
  top: -40px;
  left: -110px;
  z-index: -1;

  @media (max-width: 700px) {
    left: -93px;
  }
  * {
    margin: 0;
    padding: 0;
    -webkit-backface-visibility: hidden;
  }

  /*MAIN CIRCLE*/
  .circle {
    position: relative;
    width: 420px;
    height: 420px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    /* rotate */
    -webkit-transform: ${(props) => `rotate(${props.rotate}deg)`};
    -moz-transform: ${(props) => `rotate(${props.rotate}deg)`};
    -ms-transform: ${(props) => `rotate(${props.rotate}deg)`};
    -o-transform: ${(props) => `rotate(${props.rotate}deg)`};
    transform: ${(props) => `rotate(${props.rotate}deg)`};

    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -ms-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;

    @media (max-width: 700px) {
      width: 360px;
      height: 360px;
    }
  }

  /*LITTLE CIRCLES*/
  .circle ${Wrapper} {
    position: absolute;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    list-style-type: none;
    text-align: center;
    top: 0;
    left: 0;
    transition: none !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 700px) {
      width: 60px;
      height: 60px;
    }
  }

  .box {
    transition: all;
  }

  .circle .box:nth-child(1) {
    top: 21px;
    left: 175px;
    transition: none !important;

    -webkit-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -moz-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -ms-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -o-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    transform: ${(props) => `rotate(${props.rotate * -1}deg)`};

    @media (max-width: 700px) {
      top: 18px;
      left: 150px;
    }
  }

  .circle .box:nth-child(2) {
    top: 98px;
    left: 308px;
    transition: none !important;

    -webkit-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -moz-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -ms-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -o-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    transform: ${(props) => `rotate(${props.rotate * -1}deg)`};

    @media (max-width: 700px) {
      top: 84px;
      left: 264px;
    }
  }

  .circle .box:nth-child(3) {
    top: 245px;
    left: 308px;
    transition: none !important;

    -webkit-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -moz-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -ms-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -o-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    transform: ${(props) => `rotate(${props.rotate * -1}deg)`};

    @media (max-width: 700px) {
      top: 210px;
      left: 264px;
    }
  }

  .circle .box:nth-child(4) {
    top: 329px;
    left: 175px;
    transition: none !important;

    -webkit-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -moz-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -ms-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -o-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    transform: ${(props) => `rotate(${props.rotate * -1}deg)`};

    @media (max-width: 700px) {
      top: 282px;
      left: 150px;
    }
  }

  .circle .box:nth-child(5) {
    top: 245px;
    left: 35px;
    transition: none !important;

    -webkit-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -moz-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -ms-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -o-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    transform: ${(props) => `rotate(${props.rotate * -1}deg)`};

    @media (max-width: 700px) {
      top: 210px;
      left: 30px;
    }
  }

  .circle .box:nth-child(6) {
    top: 98px;
    left: 35px;
    transition: none !important;

    -webkit-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -moz-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -ms-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -o-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    transform: ${(props) => `rotate(${props.rotate * -1}deg)`};

    @media (max-width: 700px) {
      top: 84px;
      left: 30px;
    }
  }
`;

const BoxWrapper = styled(Wrapper)`
  padding: 0 30px;
  flex-direction: row;
  justify-content: space-between;
  height: 70px;
  margin: 0 0 5px;
  background: ${Theme.lightGrey_C};
  cursor: pointer;

  &:hover {
    background: ${Theme.basicTheme_C};
    color: ${Theme.white_C};
  }

  @media (max-width: 700px) {
    height: 50px;
  }
`;

const TextHover = styled(Text)`
  font-size: 1.4rem;
  margin: 0 0 15px;
  position: relative;
  cursor: pointer;
  transition: 0.5s;

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
    font-weight: 700;
    &:before {
      width: 100%;
    }
  }

  @media (max-width: 1350px) {
    font-size: 1.2rem;
    margin: 0 0 25px;
  }

  @media (max-width: 700px) {
    font-size: 1rem;
    margin: 0 0 20px;
  }
`;

const IconBox = styled(Wrapper)`
  width: ${(props) => props.width || `70px`};
  cursor: pointer;

  ${Image} {
    transition: 0.5s;
    margin: 0 0 5px;
  }

  &:hover ${Image} {
    transform: scale(1.2);
  }

  @media (max-width: 700px) {
    width: auto;
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

  left: 50%;
  cursor: pointer;
  width: auto;
  margin: 0 0 0 -65px;

  &:hover {
    .circle2 {
      width: 30px;
      height: 30px;
    }
  }

  @media (max-width: 700px) {
    margin: 0 0 0 -60px;
  }
`;

const TextWrapper = styled(Wrapper)`
  width: auto;
  cursor: pointer;
  transition: 0.5s;

  & h2 {
    color: ${Theme.darkGrey_C} !important;
    background: initial;
    -webkit-text-fill-color: initial !important;
    -webkit-background-clip: initial !important;

    transition: 0.5s;
  }

  .hoverIcon {
    display: none;
  }

  &:hover {
    .noHoverIcon {
      display: none;
    }

    .hoverIcon {
      display: flex;
    }

    h2 {
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
  }
`;

const Logo = styled(Image)`
  width: 200px !important;

  @media (max-width: 700px) {
    width: 150px !important;
    margin-top: 10px;
  }
`;

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const AppFooter = () => {
  const width = useWidth();
  const router = useRouter();
  const Vue = router.Vue;

  const data = {
    1: [
      [6, 5],
      [2, 3, 4],
    ],
    2: [
      [1, 6],
      [3, 4, 5],
    ],
    3: [
      [2, 1],
      [4, 5, 6],
    ],
    4: [
      [3, 2],
      [5, 6, 1],
    ],
    5: [
      [4, 3],
      [6, 1, 2],
    ],
    6: [
      [5, 4],
      [1, 2, 3],
    ],
  };

  ////// HOOKS //////

  const [tab, setTab] = useState(false);

  const [top, setTop] = useState(0);

  const [drawar, setDrawar] = useState(false);

  const { me, st_logoutDone } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [rotate, setRotate] = useState(0);
  const [currentMenu, setCurrentMenu] = useState(1);

  ////// REDUX //////

  ////// USEEFFECT //////
  useEffect(() => {
    setDrawar(false);
  }, [router.asPath]);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (st_logoutDone) {
      LoadNotification;

      dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });

      router.push("/");

      return LoadNotification("LOGOUT SUCCESS", "로그아웃 되었습니다.");
    }
  }, [st_logoutDone]);

  ////// TOGGLE ///////

  const tabToggle = useCallback(() => {
    setTab(!tab);
  }, [tab]);

  const drawarToggle = useCallback(() => {
    setDrawar(!drawar);
  }, [drawar]);
  ///// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const logoutHandler = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, []);

  ////// DATAVIEW //////
  if (!width) {
    return null;
  }

  return (
    <>
      <Wrapper bgColor={width < 700 ? Theme.white_C : Theme.lightGrey_C}>
        <Wrapper
          position={tab ? `fixed` : ``}
          bottom={`0`}
          left={width < 700 ? `0` : `50%`}
          margin={tab ? (width < 700 ? `0` : `0 0 0 -250px`) : ``}
          width={width < 700 ? `100%` : `500px`}
          height={tab ? `100vh` : `auto`}
          bgColor={tab ? `rgba(0,0,0,0.8)` : Theme.white_C}
          zIndex={`1000`}
          overflow={tab ? `hidden` : ``}
          // onClick={() => {
          //   if (tab) {
          //     tabToggle();
          //   } else {
          //     return;
          //   }
          // }}
        >
          <Wrapper
            width={`auto`}
            al={`flex-start`}
            display={tab ? `flex` : `none`}
            margin={width < 700 ? `0 0 200px` : `0 0 170px`}
          >
            <Image
              width={`60px`}
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/paperbox.png`}
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

          <Wrapper
            dr={`row`}
            height={`100px`}
            shadow={tab ? `none` : `0px -3px 10px ${Theme.grey_C}`}
            position={width < 700 ? `relative` : ``}
          >
            <ButtonWrapper
              margin={
                width < 700
                  ? tab
                    ? `0 0 -100px -60px`
                    : `0 0 100px -60px`
                  : tab
                  ? `0 0 -50px -65px`
                  : `0 0 0 -65px`
              }
              bottom={
                tab
                  ? width < 700
                    ? `100px`
                    : `280px`
                  : width < 700
                  ? `150px`
                  : `50px`
              }
              transition={`0.5s`}
            >
              <GradientText
                className="gradient"
                fontWeight={`900`}
                opacity={tab ? `0` : `1`}
                padding={`0`}
              >
                내 물건 맡기기
              </GradientText>

              <Wrapper
                margin={`0 0 0 -100px`}
                transition={`0.5s`}
                zIndex={`100`}
              >
                <Planet
                  tension={200}
                  centerContent={
                    <Wrapper
                      opacity={tab ? `0` : `1`}
                      width={`100px`}
                      height={`100px`}
                      radius={`50%`}
                      className={"ajklsuajksdnajksdnajksdn"}
                      bgColor={`linear-gradient(90deg,rgb(249, 2, 80),rgb(247, 141, 150),rgb(242, 146, 98),rgb(241, 115, 80))`}
                    >
                      <Wrapper
                        width={`45px`}
                        height={`45px`}
                        radius={`50%`}
                        bgColor={Theme.white_C}
                        className="circle2"
                      ></Wrapper>
                    </Wrapper>
                  }
                  bounce={false}
                  friction={0}
                  orbitStyle={(defaultStyle) => ({
                    ...defaultStyle,
                    borderWidth: 0,
                  })}
                  open={tab}
                  onClick={tabToggle}
                  orbitRadius={width < 700 ? 170 : 200}
                  rotation={-30}
                >
                  <FirstDisplay
                    className="wrapper"
                    rotate={rotate}
                    zIndex={`1000 !important`}
                    position={`relative`}
                    display={tab ? `flex` : `none`}
                  >
                    <Wrapper className="circle" position={`relative`}>
                      <Wrapper
                        className="box"
                        onClick={() => {
                          if (currentMenu === 1) {
                            moveLinkHandler(`/iobox?type=iobox`);
                          } else {
                            const firIndex = data[currentMenu][0].indexOf(1);

                            if (firIndex !== -1) {
                              setRotate(rotate + 60 * (firIndex + 1));
                            } else {
                              const secIndex = data[currentMenu][1].indexOf(1);
                              setRotate(rotate - 60 * (secIndex + 1));
                            }

                            setCurrentMenu(1);
                          }
                        }}
                      >
                        <IconBox>
                          <Image
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/iobox_dial.png`}
                            alt={`icon`}
                            width={width < 700 ? `30px` : `40px`}
                          />
                          <Text fontSize={`0.8rem`}>아이오 박스</Text>
                        </IconBox>
                      </Wrapper>
                      <Wrapper
                        className="box"
                        onClick={() => {
                          if (currentMenu === 2) {
                            moveLinkHandler(`/iobox?type=hangerBox`);
                          } else {
                            const firIndex = data[currentMenu][0].indexOf(2);

                            if (firIndex !== -1) {
                              setRotate(rotate + 60 * (firIndex + 1));
                            } else {
                              const secIndex = data[currentMenu][1].indexOf(2);

                              setRotate(rotate - 60 * (secIndex + 1));
                            }

                            setCurrentMenu(2);
                          }
                        }}
                      >
                        <IconBox>
                          <Image
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/hagner_dial.png`}
                            alt={`icon`}
                            width={width < 700 ? `25px` : `32px`}
                          />
                          <Text fontSize={`0.8rem`}>행거박스</Text>
                        </IconBox>
                      </Wrapper>
                      <Wrapper
                        className="box"
                        onClick={() => {
                          if (currentMenu === 3) {
                            moveLinkHandler(`/iobox?type=tentBox`);
                          } else {
                            const firIndex = data[currentMenu][0].indexOf(3);
                            if (firIndex !== -1) {
                              setRotate(rotate + 60 * (firIndex + 1));
                            } else {
                              const secIndex = data[currentMenu][1].indexOf(3);
                              setRotate(rotate - 60 * (secIndex + 1));
                            }

                            setCurrentMenu(3);
                          }
                        }}
                      >
                        <IconBox>
                          <Image
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/large_dial.png`}
                            alt={`icon`}
                            width={width < 700 ? `30px` : `40px`}
                          />
                          <Text fontSize={`0.8rem`}>대용량 박스</Text>
                        </IconBox>
                      </Wrapper>
                      <Wrapper
                        className="box"
                        onClick={() => {
                          if (currentMenu === 4) {
                            moveLinkHandler(`/iobox?type=bigBox`);
                          } else {
                            const firIndex = data[currentMenu][0].indexOf(4);
                            if (firIndex !== -1) {
                              setRotate(rotate + 60 * (firIndex + 1));
                            } else {
                              const secIndex = data[currentMenu][1].indexOf(4);
                              setRotate(rotate - 60 * (secIndex + 1));
                            }

                            setCurrentMenu(4);
                          }
                        }}
                      >
                        <IconBox>
                          <Image
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/box_dial.png`}
                            alt={`icon`}
                            width={width < 700 ? `50px` : `60px`}
                          />
                          <Text fontSize={`0.7rem`}>텐트보관 박스</Text>
                        </IconBox>
                      </Wrapper>

                      <Wrapper
                        className="box"
                        onClick={() => {
                          if (currentMenu === 5) {
                            moveLinkHandler(`/iobox?type=tentBox`);
                          } else {
                            const firIndex = data[currentMenu][0].indexOf(5);
                            if (firIndex !== -1) {
                              setRotate(rotate + 60 * (firIndex + 1));
                            } else {
                              const secIndex = data[currentMenu][1].indexOf(5);
                              setRotate(rotate - 60 * (secIndex + 1));
                            }

                            setCurrentMenu(5);
                          }
                        }}
                      >
                        <IconBox>
                          <Image
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/bullet_dial.png`}
                            alt={`icon`}
                            width={width < 700 ? `50px` : `60px`}
                          />
                          <Text fontSize={`0.8rem`}>총알배송</Text>
                        </IconBox>
                      </Wrapper>
                      <Wrapper
                        className="box"
                        onClick={() => {
                          if (currentMenu === 6) {
                            moveLinkHandler(`/locker`);
                          } else {
                            const firIndex = data[currentMenu][0].indexOf(6);
                            if (firIndex !== -1) {
                              setRotate(rotate + 60 * (firIndex + 1));
                            } else {
                              const secIndex = data[currentMenu][1].indexOf(6);
                              setRotate(rotate - 60 * (secIndex + 1));
                            }

                            setCurrentMenu(6);
                          }
                        }}
                      >
                        <IconBox>
                          <Image
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/truck_dial.png`}
                            alt={`icon`}
                            width={width < 700 ? `40px` : `50px`}
                          />
                          <Text fontSize={`0.8rem`}>배송현황</Text>
                        </IconBox>
                      </Wrapper>
                    </Wrapper>

                    <Wrapper
                      onClick={tabToggle}
                      position={`absolute`}
                      top={`calc(50% - 50px)`}
                      left={`calc(50% - 50px)`}
                      width={`100px`}
                      height={`100px`}
                      radius={`50%`}
                      zIndex={`1000 !important`}
                      className={"ajklsuajksdnajksdnajksdn"}
                      bgColor={`linear-gradient(90deg,rgb(249, 2, 80),rgb(247, 141, 150),rgb(242, 146, 98),rgb(241, 115, 80))`}
                    >
                      <Wrapper
                        width={`45px`}
                        height={`45px`}
                        radius={`50%`}
                        bgColor={Theme.white_C}
                        className="circle2"
                      ></Wrapper>
                    </Wrapper>
                  </FirstDisplay>
                </Planet>
              </Wrapper>
            </ButtonWrapper>

            <Wrapper
              dr={`row`}
              ju={`space-around`}
              display={tab ? `none` : `flex`}
            >
              <TextWrapper width={`auto`} onClick={drawarToggle}>
                <Wrapper
                  fontSize={`30px`}
                  width={`auto`}
                  margin={`0 0 5px`}
                  color={`rgb(224,222,222)`}
                  height={`35px`}
                  className="noHoverIcon"
                >
                  <MenuOutlined />
                </Wrapper>

                <Image
                  margin={`0 0 5px`}
                  height={`35px`}
                  width={`30px`}
                  objectFit={`contain`}
                  className="hoverIcon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/menu_gra.png`}
                />

                <GradientText fontSize={`0.8rem`} bold={true} padding={`0`}>
                  메 뉴
                </GradientText>
              </TextWrapper>
              <TextWrapper
                width={`auto`}
                onClick={() => {
                  moveLinkHandler("/locker");
                }}
              >
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/grey_box.png`}
                  alt={`menuIcon`}
                  className="noHoverIcon"
                  height={`30px`}
                  width={`auto`}
                  margin={`0 0 11px`}
                />
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/iobox_dial.png`}
                  alt={`menuIcon`}
                  className="hoverIcon"
                  height={`30px`}
                  width={`auto`}
                  margin={`0 0 11px`}
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
                <Wrapper
                  height={`100vh !important`}
                  ju={`space-between`}
                  overflowX={`hidden`}
                >
                  <RsWrapper
                    al={`flex-start`}
                    height={`auto`}
                    margin={width < 700 ? `50px 0 0` : `20px 0 0`}
                  >
                    <Image
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/logo_square.png`}
                      width={width < 1350 ? `80px` : `100px`}
                      alt={`logo`}
                      margin={`0 0 20px`}
                    />

                    <Wrapper ju={`flex-start`} al={`flex-start`}>
                      <Wrapper al={`flex-start`}>
                        <TextHover
                          onClick={() => {
                            moveLinkHandler("/guide?type=iobox");
                          }}
                        >
                          아이오 박스란?
                        </TextHover>
                      </Wrapper>

                      <Wrapper al={`flex-start`}>
                        <TextHover
                          onClick={() => {
                            moveLinkHandler("/guide?type=way");
                          }}
                        >
                          서비스 이용방법
                        </TextHover>
                      </Wrapper>

                      <Wrapper al={`flex-start`}>
                        <TextHover
                          onClick={() => {
                            moveLinkHandler("/guide?type=pay");
                          }}
                        >
                          서비스 이용료
                        </TextHover>
                      </Wrapper>

                      <Wrapper al={`flex-start`}>
                        <TextHover
                          onClick={() => {
                            moveLinkHandler("/guide?type=center");
                          }}
                        >
                          IO박스 보관센터
                        </TextHover>
                      </Wrapper>
                      <Wrapper al={`flex-start`}>
                        <TextHover
                          onClick={() => {
                            moveLinkHandler(`/locker`);
                          }}
                        >
                          배송현황
                        </TextHover>
                      </Wrapper>
                      <Wrapper al={`flex-start`}>
                        <TextHover
                          onClick={() => {
                            moveLinkHandler(`/locker/mylocker`);
                          }}
                        >
                          내 물건 찾기
                        </TextHover>
                      </Wrapper>
                    </Wrapper>
                  </RsWrapper>

                  <Wrapper>
                    <Wrapper al={`flex-start`}>
                      <BoxWrapper
                        onClick={() => moveLinkHandler(`/center/event`)}
                      >
                        <Text>io박스 이벤트 보기</Text>
                        <Image
                          width={width < 700 ? `30px` : `40px`}
                          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/sidemenu/event.png`}
                          alt={`event_image`}
                        />
                      </BoxWrapper>
                      <BoxWrapper onClick={() => moveLinkHandler(`/calculate`)}>
                        <Text>1초만에 보관료 계산하기</Text>
                        <Image
                          width={width < 700 ? `30px` : `40px`}
                          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/sidemenu/calculator.png`}
                          alt={`calculate_image`}
                        />
                      </BoxWrapper>
                      <BoxWrapper>
                        <Text>실시간 카톡문의</Text>
                        <Image
                          width={width < 700 ? `30px` : `40px`}
                          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/sidemenu/kakao.png`}
                          alt={`kakao_image`}
                        />
                      </BoxWrapper>
                    </Wrapper>

                    <Wrapper dr={`row`} ju={`flex-end`} padding={`10px`}>
                      {!me ? (
                        <Text
                          cursor={`pointer`}
                          display={`flex`}
                          margin={`0 10px 0 0`}
                          onClick={() => moveLinkHandler(`/login`)}
                        >
                          로그인
                        </Text>
                      ) : (
                        <>
                          <Text
                            cursor={`pointer`}
                            margin={`0 10px 0 0`}
                            onClick={() => moveLinkHandler(`/myInfo`)}
                          >
                            내 정보
                          </Text>
                          <Text
                            onClick={logoutHandler}
                            cursor={`pointer`}
                            margin={`0 10px 0 0`}
                          >
                            로그아웃
                          </Text>
                        </>
                      )}

                      {/* 공통 */}
                      <Text
                        cursor={`pointer`}
                        onClick={() => moveLinkHandler(`/center`)}
                      >
                        고객센터
                      </Text>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              </Drawer>
            )}
          </Wrapper>
          <Footer />
        </Wrapper>
      </Wrapper>
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

export default AppFooter;
