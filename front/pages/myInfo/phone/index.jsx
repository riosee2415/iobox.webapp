import React, { useCallback, useState } from "react";
import Theme from "../../../components/Theme";
import {
  Wrapper,
  WholeWrapper,
  RsWrapper,
  Text,
  Image,
  CommonButton,
  TextInput,
} from "../../../components/commonComponents";
import styled, { ThemeContext } from "styled-components";
import ClientLayout from "../../../components/ClientLayout";
import useWidth from "../../../hooks/useWidth";
import {
  CloseOutlined,
  DownOutlined,
  UpOutlined,
  IssuesCloseOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import { useDispatch } from "react-redux";
import Footer from "../../../components/Footer";

const Button = styled(CommonButton)`
  width: 100%;
  height: 50px;
  background: ${(props) => props.bgColor || Theme.grey_C};
  color: ${Theme.white_C};
  border: ${(props) => props.border || `1px solid ${Theme.grey_C}`};

  &:hover {
    background: ${(props) => props.hoverBgColor || Theme.grey_C};
    color: ${(props) => props.hoverColor || Theme.white_C};
    border: ${(props) => props.border || `1px solid ${Theme.grey_C}`};
  }
`;

const TextButton = styled(Text)`
  color: ${Theme.grey_C};
  border-bottom: 1px solid ${Theme.grey_C};
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    color: ${Theme.black_C};
    border-bottom: 1px solid ${Theme.black_C};
  }
`;

const Index = () => {
  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////
  const [tab, setTab] = useState(false);
  const [reqTab, setReqTab] = useState(0);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const dispatch = useDispatch();

  ////// REDUX //////

  ////// USEEFFECT //////

  ////// TOGGLE ///////

  ///// HANDLER //////
  const moveBackHandler = useCallback(() => {
    router.back();
  }, []);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const tabToggle = useCallback(() => {
    setTab(!tab);
  }, [tab]);

  const reqHandler = useCallback(() => {
    dispatch({
      type: "A",
      data: {
        "": "",
      },
    });
  }, []);

  ////// DATAVIEW //////
  return (
    <WholeWrapper bgColor={width < 700 ? Theme.white_C : Theme.lightGrey_C}>
      <Wrapper
        width={width < 700 ? `100%` : `500px`}
        minHeight={`100vh`}
        shadow={`0px 0px 10px ${Theme.grey_C}`}
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
          onClick={moveBackHandler}
          zIndex={`100`}
        >
          <CloseOutlined />
        </Wrapper>
        <RsWrapper
          height={`100vh`}
          ju={`space-between`}
          position={`relative`}
          al={`flex-start`}
          padding={`30px 0`}
          bgColor={Theme.white_C}
        >
          <Wrapper al={`flex-start`}>
            <Text bold={true} fontSize={`2rem`}>
              전화번호
            </Text>

            {/* 인증요청 누르기 전 text */}
            {reqTab === 0 ? (
              <Text>전화번호를 입력 후 인증요청 버튼을 눌러주세요.</Text>
            ) : (
              //  인증요청 누르기 후 text
              <Text fontSize={`0.9rem`}>
                01000000000로 전송된 6자리 코드를 입력해주세요.
              </Text>
            )}

            {/* 인증요청 누른 후 나타남 */}
            {reqTab === 1 && (
              <Wrapper dr={`row`} ju={`space-between`} margin={`30px 0 0`}>
                <TextButton>전화번호 재입력</TextButton>

                <CommonButton
                  width={`auto`}
                  radius={`30px`}
                  hieght={`25px`}
                  fontSize={`0.8rem`}
                >
                  인증번호 재요청
                </CommonButton>
              </Wrapper>
            )}
            {/* 인증요청 버튼 누르기 전 */}
            {reqTab === 0 && (
              <TextInput
                width={`100%`}
                height={`50px`}
                margin={`10px 0 0`}
                placeholder="(-) 없이 전화번호 입력해주세요."
              />
            )}

            {/* 인증요청 버튼 누른 후 나타남 */}
            {reqTab === 1 && (
              <>
                <TextInput
                  width={`100%`}
                  height={`50px`}
                  margin={`10px 0 0`}
                  placeholder="인증번호 6자리를 입력해주세요."
                />

                {/* 인증시간 */}
                <Wrapper al={`flex-start`} margin={`5px 0 0`}>
                  <Text fontSize={`0.8rem`}>0:00</Text>
                </Wrapper>
              </>
            )}

            {/* 인증시간 초과했을 때 */}
            {isTimeOut === true && (
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                al={`flex-start`}
                margin={`5px 0 0`}
                color={Theme.red_C}
              >
                <IssuesCloseOutlined />
                <Wrapper width={`auto`} al={`flex-start`} margin={`0 0 0 5px`}>
                  <Text fontSize={`0.8rem`} color={Theme.red_C}>
                    입력시간이 초과되었습니다.
                  </Text>
                  <Text fontSize={`0.8rem`} color={Theme.red_C}>
                    재요청을 눌러 새 인증번호를 입력하세요.
                  </Text>
                </Wrapper>
              </Wrapper>
            )}
          </Wrapper>

          <Button
            radius={`0`}
            width={`100%`}
            height={`50px`}
            bgColor={`${Theme.grey_C} !important`}
            onClick={reqHandler}
            // 번호 안썼을 때 bgColor={`initial`} 번호 쓰면 bgColor={Theme.basicTheme_C}
            // 번호 안썼을 때 hoverBgColor={`initial`} 번호 쓰면 hoverBgColor={Theme.basicTheme_C}
            // 번호 안썼을 때 border={`initial`} 번호 쓰면 border={`1px solid ${Theme.basicTheme_C}`}
            // 번호 안썼을 때 hoverColor={`initial`} 번호 쓰면 hoverColor={Theme.basicTheme_C}
          >
            {reqTab === 0 ? `인증 요청` : `인증`}
          </Button>
        </RsWrapper>

        <Footer />
      </Wrapper>
    </WholeWrapper>
  );
};

export default Index;
