import React, { useCallback, useState } from "react";
import Theme from "../../../components/Theme";
import {
  Wrapper,
  WholeWrapper,
  RsWrapper,
  Text,
  Image,
  CommonButton,
} from "../../../components/commonComponents";
import styled from "styled-components";
import ClientLayout from "../../../components/ClientLayout";
import useWidth from "../../../hooks/useWidth";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";

const TextHover = styled(Wrapper)`
  width: auto;
  color: ${Theme.grey_C};
  font-size: 1.2rem;
  position: relative;

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
    color: ${Theme.basicTheme_C};

    &:before {
      width: 100%;
    }
  }
`;

const PayButtton = styled(Wrapper)`
  color: ${Theme.basicTheme_C};
  width: auto;
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
    font-weight: 700;
  }
`;

const Index = () => {
  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////
  const [tab, setTab] = useState(false);

  const [modal, setModal] = useState(false);

  ////// REDUX //////

  ////// USEEFFECT //////

  ////// TOGGLE ///////

  const modalToggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

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

  ////// DATAVIEW //////
  return (
    <>
      <WholeWrapper bgColor={width < 700 ? Theme.white_C : Theme.lightGrey_C}>
        <Wrapper
          width={width < 700 ? `100%` : `500px`}
          height={`100%`}
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
          <Wrapper>
            <RsWrapper
              ju={`flex-start`}
              position={`relative`}
              al={`flex-start`}
              padding={`30px 0`}
              bgColor={Theme.white_C}
              minHeight={`100vh`}
            >
              <Text fontSize={`2rem`} bold={true}>
                내 보관함
              </Text>

              <Wrapper ju={`flex-start`}>
                <Wrapper
                  ju={`space-between`}
                  dr={`row`}
                  margin={`10px 0 0`}
                  padding={`0 0 10px`}
                  borderBottom={`1px solid ${Theme.grey_C}`}
                >
                  <Wrapper width={`auto`} al={`flex-start`}>
                    <Text fontWeight={`700`} fontSize={`1.2rem`}>
                      고객번호
                    </Text>
                    <Text>05466</Text>
                  </Wrapper>

                  <CommonButton
                    radius={`30px`}
                    width={`120px`}
                    height={`40px`}
                    onClick={moveBackHandler}
                  >
                    내 보관함
                  </CommonButton>
                </Wrapper>
              </Wrapper>

              <Wrapper minHeight={`calc(100vh - 250px)`} ju={`space-between`}>
                <Wrapper>
                  <Wrapper dr={`row`} margin={`10px 0 0`}>
                    <Text margin={`0 10px 0 0`} fontSize={`1.2rem`}>
                      보관함을 선택 해주세요.
                    </Text>
                    <Wrapper
                      width={`auto`}
                      cursor={`pointer`}
                      onClick={modalToggle}
                    >
                      <DownOutlined />
                    </Wrapper>
                  </Wrapper>
                </Wrapper>

                <Wrapper dr={`row`} ju={`space-around`}>
                  <TextHover bold={true}>부분 찾기</TextHover>
                  <TextHover bold={true}>전체 찾기</TextHover>
                </Wrapper>
              </Wrapper>
            </RsWrapper>
          </Wrapper>
        </Wrapper>
      </WholeWrapper>

      <Wrapper
        position={`fixed`}
        bottom={`0`}
        left={`0`}
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
              <PayButtton bold={true}>배송비 5,000원</PayButtton>
            </Wrapper>
            <CommonButton width={`130px`} height={`50px`}>
              찾기
            </CommonButton>
          </RsWrapper>
        </Wrapper>
      </Wrapper>

      {modal && (
        <Wrapper
          position={`absolute`}
          top={`0`}
          left={`0`}
          height={`100vh`}
          bgColor={`rgba(0,0,0,0.4)`}
        >
          <Wrapper padding={`30px`} radius={`20px`} bgColor={Theme.white_C}>
            <Wrapper al={`flex-end`}>
              <CloseOutlined />
            </Wrapper>
          </Wrapper>
        </Wrapper>
      )}
    </>
  );
};

export default Index;
