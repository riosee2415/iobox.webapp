import React, { useCallback, useState } from "react";
import Theme from "../../components/Theme";
import {
  Wrapper,
  WholeWrapper,
  RsWrapper,
  Text,
  Image,
  CommonButton,
  TextInput,
} from "../../components/commonComponents";
import styled from "styled-components";
import ClientLayout from "../../components/ClientLayout";
import useWidth from "../../hooks/useWidth";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";

const Index = () => {
  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////
  const [tab, setTab] = useState(false);

  ////// REDUX //////

  ////// USEEFFECT //////

  ////// TOGGLE ///////

  ///// HANDLER //////

  const clip = useCallback(() => {
    let url = "";
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    url = window.document.location.href;
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }, []);

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
    <WholeWrapper
      bgColor={
        width < 700
          ? `linear-gradient(90deg,rgb(249, 2, 80),rgb(247, 141, 150),rgb(242, 146, 98),rgb(241, 115, 80))`
          : Theme.lightGrey_C
      }
    >
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
          color={Theme.white_C}
        >
          <CloseOutlined />
        </Wrapper>
        <RsWrapper
          height={`100vh`}
          ju={`flex-start`}
          position={`relative`}
          al={`flex-start`}
          padding={`30px 0`}
          bgColor={`linear-gradient(160deg,rgb(249, 2, 80),rgb(247, 141, 150),rgb(242, 146, 98),rgb(241, 115, 80))`}
        >
          <Image src={`#`} alt={`logo`} />
          <Text color={Theme.white_C}>상담 가능 시간</Text>
          <Text fontSize={`0.7rem`} color={Theme.white_C}>
            평일 오전 10:00시 ~ 오후 18:00시 (토,일,공휴일 휴무)
          </Text>

          <Wrapper
            radius={`20px`}
            bgColor={Theme.white_C}
            margin={`50px 0 30px`}
            padding={`20px`}
          >
            <Wrapper dr={`row`} al={`flex-start`}>
              <Wrapper width={`18%`}>
                <Image src={`#`} alt={`logo`} />
              </Wrapper>
              <Wrapper
                width={`78%`}
                al={`flex-start`}
                color={Theme.basicTheme_C}
              >
                <Text
                  fontWeight={`700`}
                  fontSize={`0.9rem`}
                  margin={`0 0 30px`}
                >
                  아이오 박스
                </Text>
                <Text fontWeight={`700`} fontSize={`0.9rem`}>
                  주거 공간을 넓게!
                </Text>
                <Text fontWeight={`700`} fontSize={`0.9rem`}>
                  미니멀리즘 라이프 스타일을
                </Text>
                <Text fontWeight={`700`} fontSize={`0.9rem`}>
                  실현하는 서비스 아이오박스 입니다.
                </Text>
                <Text fontWeight={`700`} fontSize={`0.9rem`}>
                  무엇을 도와드릴까요 ?
                </Text>
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} al={`flex-start`} margin={`20px 0 0`}>
              <Wrapper width={`18%`}>
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/consulitng/emoji.png`}
                  alt={`logo`}
                  width={`25px`}
                />
              </Wrapper>
              <Wrapper
                width={`78%`}
                al={`flex-start`}
                color={Theme.basicTheme_C}
              >
                <Text fontWeight={`700`} fontSize={`0.9rem`}>
                  상담원과 빠른 상담을 원하시면
                </Text>
                <Text fontWeight={`700`} fontSize={`0.9rem`}>
                  실시간 상담 버튼을 눌러주세요.
                </Text>
              </Wrapper>
            </Wrapper>

            <CommonButton
              width={`140px`}
              height={`50px`}
              radius={`30px`}
              margin={`30px 0 0`}
            >
              실시간 상담
            </CommonButton>
          </Wrapper>

          <Wrapper dr={`row`}>
            <Wrapper
              width={`50px`}
              height={`50px`}
              radius={`50%`}
              bgColor={Theme.kakao_C}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/consulitng/kakao.png`}
                alt={`kakao_image`}
              />
            </Wrapper>
            <Wrapper
              width={`50px`}
              height={`50px`}
              radius={`50%`}
              bgColor={Theme.white_C}
              margin={`0 10px`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/consulitng/call.png`}
                alt={`kakao_image`}
              />
            </Wrapper>

            <Wrapper
              width={`50px`}
              height={`50px`}
              radius={`50%`}
              bgColor={Theme.white_C}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/consulitng/link.png`}
                alt={`kakao_image`}
                onClick={clip}
                cursor={`pointer`}
              />
            </Wrapper>
          </Wrapper>
        </RsWrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default Index;
