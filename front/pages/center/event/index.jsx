import React, { useCallback, useEffect, useState } from "react";
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
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { EVENT_LIST_REQUEST } from "../../../reducers/event";
import useInput from "../../../hooks/useInput";
import { Pagination } from "antd";

const ImageBox = styled(Wrapper)`
  height: 150px;
  background: ${Theme.grey_C};
  margin: 0 0 20px;
  cursor: pointer;
  overflow: hidden;

  ${Image} {
    transition: 0.5s;
  }

  &:hover ${Image} {
    transform: scale(1.1);
  }
`;

const Index = () => {
  const width = useWidth();
  const router = useRouter();

  const dispatch = useDispatch();

  ////// HOOKS //////
  const [tab, setTab] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const inputSearch = useInput("");
  const [searchValue, setSearchValue] = useState("");

  const { events, uploadEventPath, maxPage } = useSelector(
    (state) => state.event
  );

  console.log(events);

  ////// REDUX //////

  ////// USEEFFECT //////

  useEffect(() => {
    const qs = getQs();
    dispatch({
      type: EVENT_LIST_REQUEST,
      data: {
        qs,
      },
    });
  }, [router.query]);

  ////// TOGGLE ///////

  ///// HANDLER //////

  const otherPageCall = useCallback(
    (changePage) => {
      setCurrentPage(changePage);
      const queryString = `?page=${changePage}`;

      dispatch({
        type: EVENT_LIST_REQUEST,
        data: {
          qs: queryString || "",
        },
      });
    },
    [searchValue]
  );

  const getQs = () => {
    const qs = router.query;

    let value = "";

    if (!qs.page) {
      setCurrentPage(1);
      value = "?page=1";
    } else {
      setCurrentPage(qs.page);
      value = `?page=${qs.page}`;
    }

    return value;
  };

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
              이벤트
            </Text>

            {events &&
              events.map((data) => {
                return (
                  <ImageBox
                    key={data.id}
                    onClick={() => moveLinkHandler(`/center/event/${data.id}`)}
                  >
                    <Image src={data.imagePath} alt={`thumbnail`} />
                  </ImageBox>
                );
              })}
            <Pagination
              defaultCurrent={1}
              current={parseInt(currentPage)}
              total={maxPage * 10}
              onChange={(page) => otherPageCall(page)}
            />
          </Wrapper>
        </RsWrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default Index;
