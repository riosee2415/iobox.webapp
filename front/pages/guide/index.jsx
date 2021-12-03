import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import {
  Text,
  WholeWrapper,
  Wrapper,
  RsWrapper,
  Image,
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";

const Index = () => {
  const width = useWidth();

  const router = useRouter();

  ////// HOOKS //////
  const [qs, setQs] = useState(0);

  ////// REDUX //////

  ////// USEEFFECT //////

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
        <Wrapper
          width={width < 700 ? `100%` : `500px`}
          height={`100%`}
          shadow={`0px 0px 10px ${Theme.grey_C}`}
        >
          {qs === 0 && <Text>이오박스란 ?</Text>}
          {qs === 1 && <Text>서비스 이용방법</Text>}
          {qs === 2 && <Text>서비스 이용료</Text>}
          {qs === 3 && <Text>보관센터</Text>}
        </Wrapper>
      </WholeWrapper>
    </ClientLayout>
  );
};

export default Index;
