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
import styled from "styled-components";
import ClientLayout from "../../../components/ClientLayout";
import useWidth from "../../../hooks/useWidth";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import { NotificationOutlined } from "@ant-design/icons";

const TableWrapper = styled(Wrapper)`
  border-bottom: 1px solid ${Theme.lightGrey_C};
  padding: 10px 0;
  flex-direction: row;
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid ${Theme.basicTheme_C};
  }
`;

const Index = () => {
  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////
  const [tab, setTab] = useState(false);

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
          ju={`space-between`}
          position={`relative`}
          al={`flex-start`}
          padding={`30px 0`}
          bgColor={Theme.white_C}
          minHeight={`100vh`}
        >
          <Wrapper al={`flex-start`}>
            <Text bold={true} fontSize={`2rem`} margin={`0 0 10px`}>
              공지사항
            </Text>

            <TableWrapper>
              <Wrapper
                width={`50px`}
                color={Theme.basicTheme_C}
                fontSize={`25px`}
              >
                <NotificationOutlined />
              </Wrapper>
              <Wrapper width={`calc(100% - 50px)`} al={`flex-start`}>
                <Text>내용이 들어올 곳 입니다.</Text>
                <Text fontSize={`0.7rem`} color={Theme.grey_C}>
                  날짜가 들어올 곳 입니다.
                </Text>
              </Wrapper>
            </TableWrapper>

            <TableWrapper>
              <Wrapper
                width={`50px`}
                color={Theme.basicTheme_C}
                fontSize={`25px`}
              >
                <NotificationOutlined />
              </Wrapper>
              <Wrapper width={`calc(100% - 50px)`} al={`flex-start`}>
                <Text>내용이 들어올 곳 입니다.</Text>
                <Text fontSize={`0.7rem`} color={Theme.grey_C}>
                  날짜가 들어올 곳 입니다.
                </Text>
              </Wrapper>
            </TableWrapper>

            <TableWrapper>
              <Wrapper
                width={`50px`}
                color={Theme.basicTheme_C}
                fontSize={`25px`}
              >
                <NotificationOutlined />
              </Wrapper>
              <Wrapper width={`calc(100% - 50px)`} al={`flex-start`}>
                <Text>내용이 들어올 곳 입니다.</Text>
                <Text fontSize={`0.7rem`} color={Theme.grey_C}>
                  날짜가 들어올 곳 입니다.
                </Text>
              </Wrapper>
            </TableWrapper>

            <TableWrapper>
              <Wrapper
                width={`50px`}
                color={Theme.basicTheme_C}
                fontSize={`25px`}
              >
                <NotificationOutlined />
              </Wrapper>
              <Wrapper width={`calc(100% - 50px)`} al={`flex-start`}>
                <Text>내용이 들어올 곳 입니다.</Text>
                <Text fontSize={`0.7rem`} color={Theme.grey_C}>
                  날짜가 들어올 곳 입니다.
                </Text>
              </Wrapper>
            </TableWrapper>

            <TableWrapper>
              <Wrapper
                width={`50px`}
                color={Theme.basicTheme_C}
                fontSize={`25px`}
              >
                <NotificationOutlined />
              </Wrapper>
              <Wrapper width={`calc(100% - 50px)`} al={`flex-start`}>
                <Text>내용이 들어올 곳 입니다.</Text>
                <Text fontSize={`0.7rem`} color={Theme.grey_C}>
                  날짜가 들어올 곳 입니다.
                </Text>
              </Wrapper>
            </TableWrapper>
          </Wrapper>
        </RsWrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default Index;
