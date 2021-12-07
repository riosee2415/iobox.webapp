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

import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";

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
  margin: 0 0 35px;
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
  width: ${(props) => props.width || `130px`};
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
  margin: 0 0 0 -50px;

  &:hover {
    .circle {
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

  ////// HOOKS //////

  const [tab, setTab] = useState(false);

  const [top, setTop] = useState(0);

  const [drawar, setDrawar] = useState(false);

  const { me, st_logoutDone } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
  return (
    <>
      {/* <Wrapper zIndex={`100000`} bgColor={Theme.black2_C} height={`300px`}>
        <RotateMenu dataSource={data} onClick={(e, d) => console.log(d, e)} />
      </Wrapper> */}

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
          onClick={() => {
            if (tab) {
              tabToggle();
            } else {
              return;
            }
          }}
        >
          <Wrapper
            width={`auto`}
            al={`flex-start`}
            display={tab ? `flex` : `none`}
            margin={width < 700 ? `0 0 170px` : `0 0 150px`}
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
          >
            <ButtonWrapper
              bottom={tab ? (width < 700 ? `230px` : `280px`) : `50px`}
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
                  }
                  bounce={false}
                  friction={0}
                  orbitStyle={(defaultStyle) => ({
                    ...defaultStyle,
                    borderWidth: 0,
                    background: "rgba(255,255,255,0.8)",
                  })}
                  open={tab}
                  onClick={tabToggle}
                  autoClose
                  orbitRadius={width < 700 ? 170 : 200}
                  rotation={-30}
                >
                  <IconBox
                    display={tab ? `flex` : `none`}
                    margin={`-70px 0 0`}
                    width={width < 700 ? `100px !important` : `130px`}
                    onClick={() => {
                      moveLinkHandler(`/iobox?type=tentBox`);
                    }}
                  >
                    <Image
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/box_dial.png`}
                      alt={`icon`}
                      width={width < 700 ? `60px` : `70px`}
                    />
                    <Text fontSize={width < 700 ? `0.8rem` : `1rem`}>
                      텐트보관 박스
                    </Text>
                  </IconBox>

                  <IconBox
                    display={tab ? `flex` : `none`}
                    margin={`-30px 0 0 100px`}
                    onClick={() => {
                      moveLinkHandler("/bullet");
                    }}
                  >
                    <Image
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/bullet_dial.png`}
                      alt={`icon`}
                      width={width < 700 ? `60px` : `70px`}
                    />
                    <Text fontSize={width < 700 ? `0.8rem` : `1rem`}>
                      총알배송
                    </Text>
                  </IconBox>

                  <IconBox
                    display={tab ? `flex` : `none`}
                    margin={`50px 0 0 100px`}
                    onClick={() => {
                      moveLinkHandler(`/locker`);
                    }}
                  >
                    <Image
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/truck_dial.png`}
                      alt={`icon`}
                      width={width < 700 ? `40px` : `50px`}
                    />
                    <Text fontSize={width < 700 ? `0.8rem` : `1rem`}>
                      배송현황
                    </Text>
                  </IconBox>

                  <IconBox
                    display={tab ? `flex` : `none`}
                    margin={`70px 0 0`}
                    width={width < 700 ? `100px !important` : `130px`}
                    onClick={() => {
                      moveLinkHandler(`/iobox?type=iobox`);
                    }}
                  >
                    <Image
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/iobox_dial.png`}
                      alt={`icon`}
                      width={width < 700 ? `40px` : `50px`}
                    />
                    <Text fontSize={width < 700 ? `0.8rem` : `1rem`}>
                      아이오 박스
                    </Text>
                  </IconBox>

                  <IconBox
                    display={tab ? `flex` : `none`}
                    margin={width < 700 ? `50px 0 0 -80px` : `50px 100px 0 0`}
                    onClick={() => {
                      moveLinkHandler(`/iobox?type=hangerBox`);
                    }}
                  >
                    <Image
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/hagner_dial.png`}
                      alt={`icon`}
                      width={width < 700 ? `40px` : `50px`}
                    />
                    <Text fontSize={width < 700 ? `0.8rem` : `1rem`}>
                      행거박스
                    </Text>
                  </IconBox>

                  <IconBox
                    display={tab ? `flex` : `none`}
                    margin={width < 700 ? `-30px 0 0 -80px` : `-30px 100px 0 0`}
                  >
                    <Image
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/large_dial.png`}
                      alt={`icon`}
                      width={width < 700 ? `40px` : `50px`}
                    />
                    <Text
                      fontSize={width < 700 ? `0.8rem` : `1rem`}
                      onClick={() => {
                        moveLinkHandler(`/iobox?type=bigBox`);
                      }}
                    >
                      대용량 박스
                    </Text>
                  </IconBox>
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
                      margin={`0 0 50px`}
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
          <Wrapper
            bgColor={Theme.basicTheme_C}
            padding={`50px`}
            color={Theme.white_C}
            dr={`row`}
            ju={`space-between`}
            display={tab ? `none` : `flex`}
          >
            <Image
              width={`50px`}
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/logo/LOGO_W.png`}
            />

            <Wrapper width={`auto`} al={`flex-start`}>
              <Text>상호명 : io박스</Text>
              <Text>사업자등록번호 : 0000000</Text>
              <Text>대표자명 : io박스</Text>
              <Text>주소 : io박스</Text>
              <Text>대표번호 : io박스</Text>
              <Text>통신판매업번호 : io박스</Text>
            </Wrapper>
          </Wrapper>
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
