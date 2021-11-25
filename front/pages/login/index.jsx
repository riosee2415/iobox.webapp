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

  ////// REDUX //////

  ////// USEEFFECT //////

  ////// TOGGLE ///////

  ///// HANDLER //////

  ////// DATAVIEW //////
  return (
    <WholeWrapper
      height={`100vh`}
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
            <Image
              position={`absolute`}
              bottom={`calc(50% - 170px / 2)`}
              left={`calc(50% - 87px / 2)`}
              width={`87px`}
              src={`https://via.placeholder.com/87x170`}
              alt={`logo_Image`}
            />

            {/* <KakaoLogin
              jsKey={process.env.SNS_KAKAO_KEY}
              onSuccess={loginKakaoHandler}
              onFailure={(error) => {
                console.log(error);
              }}
              getProfile="true"
              render={(props) => ( */}
            <CustomButton
              width={width < 700 ? `100%` : `300px`}
              height={`60px`}
              radius={`10px`}
              className={`kakao`}
              margin={`20px 0`}
            >
              <Image
                width={`37px`}
                margin={`0 10px 0 0`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/kakao.png`}
                alt={`kakao image`}
              />
              카카오로 로그인
            </CustomButton>
            {/* )} */}
            {/* /> */}

            <CustomButton
              width={width < 700 ? `100%` : `300px`}
              height={`60px`}
              radius={`10px`}
              className={`naver`}
              margin={`0 0 85px`}
            >
              <Image
                margin={`0 10px 0 0`}
                width={`17px`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/naver.png`}
                alt={`kakao image`}
              />
              네이버로 로그인
            </CustomButton>
          </RsWrapper>
        </Wrapper>
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
