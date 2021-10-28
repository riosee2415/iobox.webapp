import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST, LOGIN_REQUEST } from "../reducers/user";
import useInput from "../hooks/useInput";
import ClientLayout from "../components/ClientLayout";
import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import { ColWrapper, RowWrapper, Image } from "../components/commonComponents";
import useWidth from "../hooks/useWidth";
import Theme from "../components/Theme";

const Home = ({}) => {
  const width = useWidth();
  return (
    <ClientLayout>
      <RowWrapper>
        <ColWrapper
          span={24}
          height={`100vh`}
          bgImg={`url("https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SOUL%2Fassets%2Fimages%2Fbanner%2Fbanner.png?alt=media&token=c12d963d-f88f-4034-9392-524cac91ab39")`}
          position={`relative`}
        >
          <ColWrapper
            width={`100%`}
            height={`100%`}
            bgColor={`rgba(0,0,0,0.25)`}
          >
            <RowWrapper>
              <ColWrapper xs={1} sm={2}></ColWrapper>
              <ColWrapper xs={22} sm={20} al={`flex-end`}>
                <ColWrapper al={`flex-end`}>
                  <Image
                    width={width < 700 ? `100%` : `30%`}
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/SOUL/assets/images/logo/logo_long_white.png`}
                  />
                </ColWrapper>
                <ColWrapper
                  fontSize={width < 700 ? `2rem` : `2.4rem`}
                  color={Theme.white_C}
                  margin={`30px 0`}
                  isNanum={true}
                >
                  진심을 내건 소울 한의원
                </ColWrapper>

                <ColWrapper
                  fontSize={`1.3rem`}
                  lineHeight={`1.8`}
                  color={Theme.white_C}
                  textAlign={`right`}
                  display={width < 700 ? `flex` : `none`}
                >
                  저희 소울 한의원은 대표 박정재 원장님과 공동대표 김주익
                  원장님의 가장 한의학다운 환자중심의 의료를 실현하는 공동
                  프로젝트입니다. 통합의학에 기반하여 진짜 한의학 개념을 환자와
                  함께 나눌 수 있는 한의원, 이제 시작합니다.
                </ColWrapper>

                <ColWrapper
                  color={Theme.white_C}
                  fontSize={`1.3rem`}
                  display={width < 700 ? `none` : `flex`}
                  lineHeight={`1.8`}
                >
                  저희 소울 한의원은 대표 박정재 원장님과 공동대표 김주익
                  원장님의
                </ColWrapper>
                <ColWrapper
                  color={Theme.white_C}
                  fontSize={`1.3rem`}
                  display={width < 700 ? `none` : `flex`}
                  lineHeight={`1.8`}
                >
                  가장 한의학다운 환자중심의 의료를 실현하는 공동
                  프로젝트입니다.
                </ColWrapper>
                <ColWrapper
                  color={Theme.white_C}
                  fontSize={`1.3rem`}
                  display={width < 700 ? `none` : `flex`}
                  lineHeight={`1.8`}
                >
                  통합의학에 기반하여 진짜 한의학 개념을 환자와 함께 나눌 수
                  있는 한의원,
                </ColWrapper>
                <ColWrapper
                  color={Theme.white_C}
                  fontSize={`1.3rem`}
                  display={width < 700 ? `none` : `flex`}
                  lineHeight={`1.8`}
                >
                  이제 시작합니다.
                </ColWrapper>
              </ColWrapper>
              <ColWrapper xs={1} sm={2}></ColWrapper>
            </RowWrapper>
          </ColWrapper>
        </ColWrapper>
      </RowWrapper>
    </ClientLayout>
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
