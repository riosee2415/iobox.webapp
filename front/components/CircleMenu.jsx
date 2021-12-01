import React, { useCallback, useState } from "react";
import { WholeWrapper, Wrapper } from "./commonComponents";
import Theme from "./Theme";

const Index = () => {
  const circle = useCallback(() => {
    const el = document.getElementsByClassName("id");

    console.log(el.children);
  }, []);

  return (
    <WholeWrapper>
      <Wrapper
        height={`100vh`}
        bgColor={`rgba(0,0,0,0.5)`}
        width={`500px`}
        padding={`0 10px`}
      >
        <Wrapper
          width={`300px`}
          height={`300px`}
          bgColor={`rgba(255,255,255,0.5)`}
          radius={`40%`}
          position={`relative`}
          onClick={circle}
          className="id"
        >
          <Wrapper
            width={`50px`}
            height={`50px`}
            bgColor={Theme.basicTheme_C}
            radius={`50%`}
            position={`absolute`}
            top={`20px`}
            left={`50%`}
            margin={`0 0 0 -25px`}
          ></Wrapper>
        </Wrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default Index;
