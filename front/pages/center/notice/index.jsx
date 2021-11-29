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
import { NotificationOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../../hooks/useInput";
import { NOTICE_LIST_REQUEST } from "../../../reducers/notice";
import { Pagination } from "antd";

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

  const dispatch = useDispatch();
  const [tab, setTab] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const inputSearch = useInput("");

  const [searchValue, setSearchValue] = useState("");

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

  const { notices, maxPage } = useSelector((state) => state.notice);

  ////// REDUX //////

  ////// USEEFFECT //////

  useEffect(() => {
    const qs = getQs();
    dispatch({
      type: NOTICE_LIST_REQUEST,
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
      const queryString = `?page=${changePage}&search=${searchValue}`;

      dispatch({
        type: NOTICE_LIST_REQUEST,
        data: {
          qs: queryString || "",
        },
      });
    },
    [searchValue]
  );
  const moveBackHandler = useCallback(() => {
    router.back();
  }, []);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const tabToggle = useCallback(() => {
    setTab(!tab);
  }, [tab]);
  console.log(maxPage);
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
          onClick={() => {
            moveLinkHandler("/");
          }}
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
          <Wrapper
            al={`flex-start`}
            minHeight={`calc(100vh - 60px)`}
            ju={`space-between`}
          >
            <Wrapper
              minHeight={`calc(100% - 100px)`}
              ju={`flex-start`}
              al={`flex-start`}
            >
              <Text bold={true} fontSize={`2rem`} margin={`0 0 10px`}>
                공지사항
              </Text>
              {notices &&
                notices.map((data) => {
                  return (
                    <TableWrapper
                      key={data.id}
                      onClick={() =>
                        moveLinkHandler(`/center/notice/${data.id}`)
                      }
                    >
                      <Wrapper
                        width={`50px`}
                        color={Theme.basicTheme_C}
                        fontSize={`25px`}
                      >
                        <NotificationOutlined />
                      </Wrapper>
                      <Wrapper width={`calc(100% - 50px)`} al={`flex-start`}>
                        <Text>{data.title}</Text>
                        <Text fontSize={`0.7rem`} color={Theme.grey_C}>
                          {data.createdAt.slice(0, 10)}
                        </Text>
                      </Wrapper>
                    </TableWrapper>
                  );
                })}
            </Wrapper>

            <Wrapper margin={`50px 0 0`}>
              <Pagination
                defaultCurrent={1}
                current={parseInt(currentPage)}
                total={maxPage * 10}
                onChange={(page) => otherPageCall(page)}
              />
            </Wrapper>
          </Wrapper>
        </RsWrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default Index;
