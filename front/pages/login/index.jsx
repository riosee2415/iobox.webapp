import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST, LOGIN_REQUEST } from "../../reducers/user";
import useInput from "../../hooks/useInput";
import ClientLayout from "../../components/ClientLayout";
import axios from "axios";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import {
  Image,
  WholeWrapper,
  RsWrapper,
  Wrapper,
  Text,
  CommonButton,
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import styled from "styled-components";
import KakaoLogin from "react-kakao-login";
import { useRouter } from "next/router";
import naver from "naver-id-login";
import { Link } from "@material-ui/core";
import Footer from "../../components/Footer";

const CustomButton = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  border-radius: ${(props) => props.radius};
  margin: ${(props) => props.margin};
  &.naver {
    background: ${Theme.naver_C};
    color: ${Theme.white_C};
    &:hover {
      color: ${Theme.white_C};
      background: ${Theme.naver2_C};
    }
  }

  &.kakao {
    background: ${Theme.kakao_C};
    color: ${Theme.kakaoBrown_C};

    &:hover {
      color: ${Theme.kakaoBrown_C};
      border: none;
      background: ${Theme.kakao2_C};
    }
  }
`;

const Home = ({}) => {
  const width = useWidth();

  ////// HOOKS //////
  const router = useRouter();
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  ////// REDUX //////

  ////// USEEFFECT //////
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(window.Kakao);
      window.Kakao.init("ee41ebc5b6da97b7f6aed5ef579fa9a4");
    }
  }, []);

  useEffect(() => {
    const query = router.query;

    if (query.naver) {
      naver.handleTokenResponse();
    }
  }, [router.query]);

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_MY_INFO_REQUEST,
  //   });
  // }, [router.query]);

  ////// TOGGLE ///////

  ///// HANDLER //////

  const loginKakaoHandler = (req) => {
    const userId = "Kakao_" + req.profile.id;

    const info = {
      userId,
      email: req.profile.kakao_account.email,
    };

    localStorage.setItem("platform", "3r5sKGMdgUoKaKasdaoiJej5TtN");
    localStorage.setItem(
      "3r5sKGMdgUoKaKasdaoiJej5TtN",
      JSON.stringify({ ...info })
    );

    dispatch({
      type: LOGIN_REQUEST,
      data: {
        userId,
        password: req.profile.kakao_account.email,
        nickname: req.profile.kakao_account.profile.nickname + "5호기",
      },
    });
    console.log(me, "me");
    router.push("/");
  };

  const loginNaverHandler = async () => {
    const clientId = process.env.NEXT_PUBLIC_SNS_NAVER_KEY;
    const callbackUrl = process.env.NEXT_PUBLIC_SNS_NAVER_CALLBACK;
    const auth = await naver.login(clientId, callbackUrl);
    console.log(auth);
    const accessToken = auth.access_token;

    const profile = await naver.getProfile(accessToken);
    const userId = "Naver_" + profile.response.id;

    const info = {
      userId,
      email: profile.response.email,
    };

    localStorage.setItem("platform", "3r5sKGMdgUoNasdaverJej5TtN");
    localStorage.setItem(
      "3r5sKGMdgUoNasdaverJej5TtN",
      JSON.stringify({ ...info })
    );

    // setSnsPlatform(info.userId);
    // setLoginSkipPlatform(false);
  };

  ////// DATAVIEW //////
  if (typeof window === "undefined") {
    return null;
  }

  return (
    <WholeWrapper
      minHeight={`100vh`}
      bgColor={width < 700 ? Theme.white_C : Theme.lightGrey_C}
    >
      <Wrapper
        width={width < 700 ? `100%` : `500px`}
        height={`100%`}
        shadow={`0px 0px 10px ${Theme.grey_C}`}
      >
        <Wrapper
          height={`100vh`}
          bgColor={Theme.basicTheme_C}
          ju={`flex-start`}
        >
          <RsWrapper ju={`flex-end`} margin={`0 0 10px`} position={`relative`}>
            <Link href="/main">
              <Image
                position={`absolute`}
                bottom={`50%`}
                left={`50%`}
                width={`90px`}
                margin={`0 0 -45px -33px`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/logo/LOGO_W.png`}
                alt={`logo_Image`}
              />
            </Link>

            {/* <KakaoLogin
              jsKey={process.env.SNS_KAKAO_KEY}
              onSuccess={loginKakaoHandler}
              onFailure={(error) => {
                console.log(error);
              }}
              getProfile="true"
              render={(props) => ( */}

            <KakaoLogin
              jsKey={process.env[`SNS_KAKAO_KEY`]}
              onSuccess={loginKakaoHandler}
              onFailure={(error) => {
                console.log(error);
              }}
              getProfile="true"
              render={({ onClick }) => {
                return (
                  <CustomButton
                    width={width < 700 ? `100%` : `300px`}
                    height={`60px`}
                    radius={`10px`}
                    className={`kakao`}
                    margin={`20px 0`}
                    onClick={(e) => {
                      e.preventDefault();
                      onClick();
                    }}
                  >
                    <Image
                      width={`37px`}
                      margin={`0 10px 0 0`}
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/login/kakao_login.png`}
                      alt={`kakao image`}
                    />
                    카카오로 로그인
                  </CustomButton>
                );
              }}
            />

            {/* )} */}
            {/* /> */}

            <CustomButton
              width={width < 700 ? `100%` : `300px`}
              height={`60px`}
              radius={`10px`}
              className={`naver`}
              margin={`0 0 85px`}
              onClick={loginNaverHandler}
            >
              <Image
                margin={`0 10px 0 0`}
                width={`17px`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/login/naver_login.png`}
                alt={`kakao image`}
              />
              네이버로 로그인
            </CustomButton>
          </RsWrapper>
        </Wrapper>
        <Footer />
      </Wrapper>
    </WholeWrapper>
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
export default Home;
