import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import {
  Text,
  WholeWrapper,
  Wrapper,
  RsWrapper,
  Image,
  IoBoxWrapper,
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { MENU_LIST_REQUEST } from "../../reducers/menuImage";
import { Empty } from "antd";

const Index = () => {
  const width = useWidth();

  const router = useRouter();

  const dispatch = useDispatch();

  const { menuImages } = useSelector((state) => state.menuImage);

  ////// HOOKS //////
  const [qs, setQs] = useState(0);

  ////// REDUX //////

  ////// USEEFFECT //////

  useEffect(() => {
    dispatch({
      type: MENU_LIST_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (router.query.type === "iobox") {
      setQs(0);
    } else if (router.query.type === "way") {
      setQs(1);
    } else if (router.query.type === "pay") {
      setQs(2);
    } else if (router.query.type === "center") {
      setQs(3);
    }
  }, [router.query.type]);

  ////// TOGGLE ///////

  ///// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  return (
    <ClientLayout>
      <WholeWrapper
        overflow={`hidden`}
        height={`90vh`}
        bgColor={width < 700 ? Theme.white_C : Theme.lightGrey_C}
      >
        <IoBoxWrapper
          minHeight={`100vh`}
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
            onClick={() => {
              moveLinkHandler("/main");
            }}
            zIndex={`100`}
          >
            <CloseOutlined />
          </Wrapper>

          {qs === 0 && (
            <>
              {menuImages ? (
                menuImages.length === 0 ? (
                  <Wrapper>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </Wrapper>
                ) : (
                  <Image src={menuImages[0].imagePath} />
                )
              ) : (
                <Wrapper></Wrapper>
              )}
            </>
          )}
          {qs === 1 && (
            <>
              {menuImages ? (
                menuImages.length === 0 ? (
                  <Wrapper>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </Wrapper>
                ) : (
                  <Image src={menuImages[1].imagePath} />
                )
              ) : (
                <Wrapper></Wrapper>
              )}
            </>
          )}
          {qs === 2 && (
            <>
              {menuImages ? (
                menuImages.length === 0 ? (
                  <Wrapper>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </Wrapper>
                ) : (
                  <Image src={menuImages[2].imagePath} />
                )
              ) : (
                <Wrapper></Wrapper>
              )}
            </>
          )}
          {qs === 3 && (
            <>
              {menuImages ? (
                menuImages.length === 0 ? (
                  <Wrapper>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </Wrapper>
                ) : (
                  <Image src={menuImages[3].imagePath} />
                )
              ) : (
                <Wrapper></Wrapper>
              )}
            </>
          )}
        </IoBoxWrapper>
      </WholeWrapper>
    </ClientLayout>
  );
};

export default Index;
