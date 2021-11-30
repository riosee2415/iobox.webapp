import React, { useCallback, useState } from "react";
import Theme from "../../components/Theme";
import {
  Wrapper,
  WholeWrapper,
  RsWrapper,
  Text,
  Image,
  CommonButton,
} from "../../components/commonComponents";
import styled from "styled-components";
import ClientLayout from "../../components/ClientLayout";
import useWidth from "../../hooks/useWidth";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const Index = () => {
  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////
  const [tab, setTab] = useState(false);
  const [number, setNumber] = useState(0);

  ////// REDUX //////

  ////// USEEFFECT //////

  ////// TOGGLE ///////

  ///// HANDLER //////
  const minusNumberHandler = useCallback(() => {
    setNumber(number - 1);

    if (number === 0) {
      setNumber(0);
    }
  }, [number]);

  const plusNumberHandler = useCallback(() => {
    setNumber(number + 1);
  }, [number]);

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
        height={`100%`}
        shadow={`0px 0px 10px ${Theme.grey_C}`}
        bgColor={Theme.white_C}
        overflowX={`hidden`}
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
            <Image
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/logo/LOGO.png`}
              width={`50px`}
              alt={`LOGO`}
            />

            <Wrapper dr={`row`} ju={`space-between`} margin={`50px 0 0`}>
              <Text>장기보관(6개월이상)</Text>
              <Text fontWeight={`700`}>0원</Text>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 50px`}>
              <Text>단기보관</Text>
              <Text fontWeight={`700`}>0원</Text>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`}>
              <Wrapper width={`auto`} dr={`row`}>
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/paperbox_dial.png`}
                  alt={`icon`}
                  width={`25px`}
                />
                <Text fontWeight={`700`} margin={`0 5px`} fontSize={`0.9rem`}>
                  박스
                </Text>
                <Text
                  color={Theme.basicTheme_C}
                  fontWeight={`700`}
                  fontSize={`0.9rem`}
                >
                  0
                </Text>
              </Wrapper>

              <Wrapper width={`auto`} dr={`row`}>
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/hanger.png`}
                  alt={`icon`}
                  width={`30px`}
                />
                <Text fontWeight={`700`} margin={`0 5px`} fontSize={`0.9rem`}>
                  행거
                </Text>
                <Text
                  color={Theme.basicTheme_C}
                  fontWeight={`700`}
                  fontSize={`0.9rem`}
                >
                  0
                </Text>
              </Wrapper>

              <Wrapper width={`auto`} dr={`row`}>
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/box_dial.png`}
                  alt={`icon`}
                  width={`35px`}
                />
                <Text fontWeight={`700`} margin={`0 5px`} fontSize={`0.9rem`}>
                  텐트박스
                </Text>
                <Text
                  color={Theme.basicTheme_C}
                  fontWeight={`700`}
                  fontSize={`0.9rem`}
                >
                  0
                </Text>
              </Wrapper>
            </Wrapper>

            <Text margin={`10px 0`} fontWeight={`700`}>
              보관할 물건을 선택해주세요.
            </Text>

            <Wrapper
              dr={`row`}
              padding={`10px`}
              border={`1px solid ${Theme.grey_C}`}
              margin={`0 0 10px`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/tee.png`}
                alt={`thumbnail`}
                width={`30%`}
              />
              <Wrapper
                width={`30%`}
                padding={`0 10px`}
                al={`flex-start`}
                fontSize={`0.8rem`}
                fontWeight={`700`}
              >
                티셔츠
              </Wrapper>
              <Wrapper width={`40%`} dr={`row`} ju={`space-between`}>
                <Wrapper
                  width={`30px`}
                  height={`30px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.darkGrey2_C}`}
                  onClick={minusNumberHandler}
                  cursor={`pointer`}
                >
                  <MinusOutlined />
                </Wrapper>
                <Text fontWeight={`700`}>{number}</Text>
                <Wrapper
                  width={`30px`}
                  height={`30px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.darkGrey2_C}`}
                  onClick={plusNumberHandler}
                  cursor={`pointer`}
                >
                  <PlusOutlined />
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              padding={`10px`}
              border={`1px solid ${Theme.grey_C}`}
              margin={`0 0 10px`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/knit.png`}
                alt={`thumbnail`}
                width={`30%`}
              />
              <Wrapper
                width={`30%`}
                padding={`0 10px`}
                al={`flex-start`}
                fontSize={`0.8rem`}
                fontWeight={`700`}
              >
                니트류
              </Wrapper>
              <Wrapper width={`40%`} dr={`row`} ju={`space-between`}>
                <Wrapper
                  width={`30px`}
                  height={`30px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.darkGrey2_C}`}
                  onClick={minusNumberHandler}
                  cursor={`pointer`}
                >
                  <MinusOutlined />
                </Wrapper>
                <Text fontWeight={`700`}>{number}</Text>
                <Wrapper
                  width={`30px`}
                  height={`30px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.darkGrey2_C}`}
                  onClick={plusNumberHandler}
                  cursor={`pointer`}
                >
                  <PlusOutlined />
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              padding={`10px`}
              border={`1px solid ${Theme.grey_C}`}
              margin={`0 0 10px`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/onepiece.png`}
                alt={`thumbnail`}
                width={`30%`}
              />
              <Wrapper
                width={`30%`}
                padding={`0 10px`}
                al={`flex-start`}
                fontSize={`0.8rem`}
                fontWeight={`700`}
              >
                원피스
              </Wrapper>
              <Wrapper width={`40%`} dr={`row`} ju={`space-between`}>
                <Wrapper
                  width={`30px`}
                  height={`30px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.darkGrey2_C}`}
                  onClick={minusNumberHandler}
                  cursor={`pointer`}
                >
                  <MinusOutlined />
                </Wrapper>
                <Text fontWeight={`700`}>{number}</Text>
                <Wrapper
                  width={`30px`}
                  height={`30px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.darkGrey2_C}`}
                  onClick={plusNumberHandler}
                  cursor={`pointer`}
                >
                  <PlusOutlined />
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              padding={`10px`}
              border={`1px solid ${Theme.grey_C}`}
              margin={`0 0 10px`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/shirt.png`}
                alt={`thumbnail`}
                width={`30%`}
              />
              <Wrapper
                width={`30%`}
                padding={`0 10px`}
                al={`flex-start`}
                fontSize={`0.8rem`}
                fontWeight={`700`}
              >
                셔츠
              </Wrapper>
              <Wrapper width={`40%`} dr={`row`} ju={`space-between`}>
                <Wrapper
                  width={`30px`}
                  height={`30px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.darkGrey2_C}`}
                  onClick={minusNumberHandler}
                  cursor={`pointer`}
                >
                  <MinusOutlined />
                </Wrapper>
                <Text fontWeight={`700`}>{number}</Text>
                <Wrapper
                  width={`30px`}
                  height={`30px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.darkGrey2_C}`}
                  onClick={plusNumberHandler}
                  cursor={`pointer`}
                >
                  <PlusOutlined />
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              padding={`10px`}
              border={`1px solid ${Theme.grey_C}`}
              margin={`0 0 10px`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/bag.png`}
                alt={`thumbnail`}
                width={`30%`}
              />
              <Wrapper
                width={`30%`}
                padding={`0 10px`}
                al={`flex-start`}
                fontSize={`0.8rem`}
                fontWeight={`700`}
              >
                텐트
              </Wrapper>
              <Wrapper width={`40%`} dr={`row`} ju={`space-between`}>
                <Wrapper
                  width={`30px`}
                  height={`30px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.darkGrey2_C}`}
                  onClick={minusNumberHandler}
                  cursor={`pointer`}
                >
                  <MinusOutlined />
                </Wrapper>
                <Text fontWeight={`700`}>{number}</Text>
                <Wrapper
                  width={`30px`}
                  height={`30px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.darkGrey2_C}`}
                  onClick={plusNumberHandler}
                  cursor={`pointer`}
                >
                  <PlusOutlined />
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              padding={`10px`}
              border={`1px solid ${Theme.grey_C}`}
              margin={`0 0 10px`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/luxury.png`}
                alt={`thumbnail`}
                width={`30%`}
              />
              <Wrapper
                width={`30%`}
                padding={`0 10px`}
                al={`flex-start`}
                fontSize={`0.8rem`}
                fontWeight={`700`}
              >
                신발/가방
              </Wrapper>
              <Wrapper width={`40%`} dr={`row`} ju={`space-between`}>
                <Wrapper
                  width={`30px`}
                  height={`30px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.darkGrey2_C}`}
                  onClick={minusNumberHandler}
                  cursor={`pointer`}
                >
                  <MinusOutlined />
                </Wrapper>
                <Text fontWeight={`700`}>{number}</Text>
                <Wrapper
                  width={`30px`}
                  height={`30px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.darkGrey2_C}`}
                  onClick={plusNumberHandler}
                  cursor={`pointer`}
                >
                  <PlusOutlined />
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              padding={`10px`}
              border={`1px solid ${Theme.grey_C}`}
              margin={`0 0 10px`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/book.png`}
                alt={`thumbnail`}
                width={`30%`}
              />
              <Wrapper
                width={`30%`}
                padding={`0 10px`}
                al={`flex-start`}
                fontSize={`0.8rem`}
                fontWeight={`700`}
              >
                책
              </Wrapper>
              <Wrapper width={`40%`} dr={`row`} ju={`space-between`}>
                <Wrapper
                  width={`30px`}
                  height={`30px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.darkGrey2_C}`}
                  onClick={minusNumberHandler}
                  cursor={`pointer`}
                >
                  <MinusOutlined />
                </Wrapper>
                <Text fontWeight={`700`}>{number}</Text>
                <Wrapper
                  width={`30px`}
                  height={`30px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.darkGrey2_C}`}
                  onClick={plusNumberHandler}
                  cursor={`pointer`}
                >
                  <PlusOutlined />
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              padding={`10px`}
              border={`1px solid ${Theme.grey_C}`}
              margin={`0 0 10px`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/coat.png`}
                alt={`thumbnail`}
                width={`30%`}
              />
              <Wrapper
                width={`30%`}
                padding={`0 10px`}
                al={`flex-start`}
                fontSize={`0.8rem`}
                fontWeight={`700`}
              >
                코트
              </Wrapper>
              <Wrapper width={`40%`} dr={`row`} ju={`space-between`}>
                <Wrapper
                  width={`30px`}
                  height={`30px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.darkGrey2_C}`}
                  onClick={minusNumberHandler}
                  cursor={`pointer`}
                >
                  <MinusOutlined />
                </Wrapper>
                <Text fontWeight={`700`}>{number}</Text>
                <Wrapper
                  width={`30px`}
                  height={`30px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.darkGrey2_C}`}
                  onClick={plusNumberHandler}
                  cursor={`pointer`}
                >
                  <PlusOutlined />
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              padding={`10px`}
              border={`1px solid ${Theme.grey_C}`}
              margin={`0 0 10px`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/padding.png`}
                alt={`thumbnail`}
                width={`30%`}
              />
              <Wrapper
                width={`30%`}
                padding={`0 10px`}
                al={`flex-start`}
                fontSize={`0.8rem`}
                fontWeight={`700`}
              >
                두터운 패딩
              </Wrapper>
              <Wrapper width={`40%`} dr={`row`} ju={`space-between`}>
                <Wrapper
                  width={`30px`}
                  height={`30px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.darkGrey2_C}`}
                  onClick={minusNumberHandler}
                  cursor={`pointer`}
                >
                  <MinusOutlined />
                </Wrapper>
                <Text fontWeight={`700`}>{number}</Text>
                <Wrapper
                  width={`30px`}
                  height={`30px`}
                  radius={`50%`}
                  border={`1px solid ${Theme.darkGrey2_C}`}
                  onClick={plusNumberHandler}
                  cursor={`pointer`}
                >
                  <PlusOutlined />
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Text fontSize={`1.2rem`} fontWeight={`700`} margin={`10px 0`}>
              예상 보관함 수량
            </Text>

            <Wrapper dr={`row`} ju={`flex-start`}>
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/paperbox.png`}
                alt={`thumbnail`}
                width={`auto`}
                margin={`0 10px 0 0`}
                width={`40px`}
              />
              <Text fontSize={`1.1rem`} fontWeight={`700`}>
                박스
              </Text>
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`10px 0`}>
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/hagner.png`}
                alt={`thumbnail`}
                width={`40px`}
                margin={`0 10px 0 0`}
              />
              <Text fontSize={`1.1rem`} fontWeight={`700`}>
                행거박스
              </Text>
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`}>
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/box.png`}
                alt={`thumbnail`}
                width={`40px`}
                margin={`0 10px 0 0`}
              />
              <Text fontSize={`1.1rem`} fontWeight={`700`}>
                텐트박스
              </Text>
            </Wrapper>
          </RsWrapper>
        </Wrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default Index;
