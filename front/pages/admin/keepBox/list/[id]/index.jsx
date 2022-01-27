import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../../../components/AdminLayout";
import PageHeader from "../../../../../components/admin/PageHeader";
import AdminTop from "../../../../../components/admin/AdminTop";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  notification,
  Row,
  Col,
  message,
  Spin,
} from "antd";
import { END } from "redux-saga";
import axios from "axios";
import { useRouter } from "next/router";
import { LOAD_MY_INFO_REQUEST } from "../../../../../reducers/user";
import wrapper from "../../../../../store/configureStore";
import {
  MODAL_CLOSE_REQUEST,
  MODAL_OPEN_REQUEST,
  KEEPBOX_DELETE_REQUEST,
  KEEPBOX_LIST_DETAIL_REQUEST,
  KEEPBOX_UPDATE_REQUEST,
} from "../../../../../reducers/keepBox";
import useInput from "../../../../../hooks/useInput";
import {
  ColWrapper,
  CommonButton,
  RowWrapper,
  Text,
  Wrapper,
} from "../../../../../components/commonComponents";
import { SearchOutlined } from "@ant-design/icons";
import { numberWithCommas } from "../../../../../components/commonUtils";
import { SUBSCRIPTION_CANCEL_REQUEST } from "../../../../../reducers/subscription";
import Theme from "../../../../../components/Theme";

const AdminContent = styled.div`
  padding: 20px;
`;

const FileBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const Filename = styled.span`
  margin-right: 15px;
  color: #555;
  font-size: 13px;
`;

const ImageWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UploadImage = styled.img`
  width: 400px;
  height: 400px;
  object-fit: cover;
`;
const UploadWrapper = styled.div`
  width: 400px;
  margin: 5px 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const GuideWrapper = styled.section`
  width: 80%;
  padding: 5px;
  margin-bottom: 10px;

  border-radius: 3px;
  background-color: #eeeeee;
`;

const GuideText = styled.div`
  font-size: 13.5px;
  color: #5e5e5e;
  font-weight: 700;
`;

const Guide = styled.p`
  font-weight: 700;
  color: #b1b1b1;
`;

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const Index = () => {
  const _WIDTH = `400`;
  const _HEIGHT = `400`;
  // LOAD CURRENT INFO AREA /////////////////////////////////////////////
  const { me, st_loadMyInfoDone } = useSelector((state) => state.user);

  const router = useRouter();

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);
  /////////////////////////////////////////////////////////////////////////

  ////// HOOKS //////
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const inputSearch = useInput("");
  const [searchValue, setSearchValue] = useState("");

  const formRef = useRef();
  const imageInput = useRef();

  const [updateData, setUpdateData] = useState(null);

  const [deletePopVisible, setDeletePopVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [yearInput, setYearInput] = useState("2021");
  const [monthInput, setMonthInput] = useState("01");

  const {
    keepBoxDetails,
    uploadKeepBoxPath,
    maxPage,
    modal,
    //
    st_keepBoxListDetailError,
    st_keepBoxCreateDone,
    st_keepBoxCreateError,
    st_keepBoxUpdateDone,
    st_keepBoxUpdateError,
    st_keepBoxDeleteDone,
    st_keepBoxDeleteError,

    st_keepBoxUploadLoading,
  } = useSelector((state) => state.keepBox);

  ////// USEEFFECT //////
  useEffect(() => {
    const qs = getQs();
    dispatch({
      type: KEEPBOX_LIST_DETAIL_REQUEST,
      data: {
        qs,
      },
    });
  }, [router.query, yearInput, monthInput]);

  useEffect(() => {
    if (st_keepBoxCreateDone) {
      const qs = getQs();
      dispatch({
        type: KEEPBOX_LIST_DETAIL_REQUEST,
        data: {
          qs,
        },
      });

      dispatch({
        type: MODAL_CLOSE_REQUEST,
      });
    }
  }, [st_keepBoxCreateDone, router.query, yearInput, monthInput]);

  useEffect(() => {
    if (st_keepBoxUpdateDone) {
      const qs = getQs();
      dispatch({
        type: KEEPBOX_LIST_DETAIL_REQUEST,
        data: {
          qs,
        },
      });

      dispatch({
        type: MODAL_CLOSE_REQUEST,
      });
    }
  }, [st_keepBoxUpdateDone, router.query, yearInput, monthInput]);

  useEffect(() => {
    if (st_keepBoxDeleteDone) {
      const qs = getQs();
      dispatch({
        type: KEEPBOX_LIST_DETAIL_REQUEST,
        data: {
          qs,
        },
      });

      dispatch({
        type: MODAL_CLOSE_REQUEST,
      });
    }
  }, [st_keepBoxDeleteDone, router.query, yearInput, monthInput]);

  useEffect(() => {
    if (st_keepBoxListDetailError) {
      return message.error(st_keepBoxListDetailError);
    }
  }, [st_keepBoxListDetailError]);

  useEffect(() => {
    if (st_keepBoxCreateError) {
      return message.error(st_keepBoxCreateError);
    }
  }, [st_keepBoxCreateError]);

  useEffect(() => {
    if (st_keepBoxUpdateError) {
      return message.error(st_keepBoxUpdateError);
    }
  }, [st_keepBoxUpdateError]);

  useEffect(() => {
    if (st_keepBoxDeleteError) {
      return message.error(st_keepBoxDeleteError);
    }
  }, [st_keepBoxDeleteError]);

  useEffect(() => {
    if (!modal && formRef.current) {
      formRef.current.resetFields();
    }
  }, [modal, formRef]);

  useEffect(() => {
    if (updateData) {
      setTimeout(() => {
        onFill(updateData);
      }, 500);
    }
  }, [updateData]);

  useEffect(() => {
    const date = new Date();

    setYearInput(date.getFullYear());
  }, []);

  ////// TOGGLE //////
  const modalOpen = useCallback(() => {
    dispatch({
      type: MODAL_OPEN_REQUEST,
    });
  }, [modal]);

  const modalClose = useCallback(() => {
    dispatch({
      type: MODAL_CLOSE_REQUEST,
    });

    setUpdateData(null);
  }, [modal]);

  const updateModalOpen = useCallback(
    (data) => {
      dispatch({
        type: MODAL_OPEN_REQUEST,
      });

      setUpdateData(data);
    },
    [modal]
  );

  const deletePopToggle = useCallback(
    (id) => () => {
      setDeleteId(id);
      setDeletePopVisible((prev) => !prev);
    },
    [deletePopVisible, deleteId]
  );

  ////// HANDLER //////
  const createModalOk = useCallback(() => {
    formRef.current.submit();
  }, []);

  const deleteGalleryHandler = useCallback(() => {
    if (!deleteId) {
      return LoadNotification(
        "ADMIN SYSTEM ERROR",
        "일시적인 장애가 발생되었습니다. 잠시 후 다시 시도해주세요."
      );
    }
    dispatch({
      type: KEEPBOX_DELETE_REQUEST,
      data: { keepBoxId: deleteId },
    });

    setDeleteId(null);
    setDeletePopVisible((prev) => !prev);
  }, [deleteId]);

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

    if (qs.id) {
      value += `&masterId=${qs.id}`;
    }

    return value;
  };

  const onFill = useCallback((data) => {
    formRef.current.setFieldsValue({
      hint: data.hint,
      content: data.title,
      answer: data.answer,
    });

    // dispatch({
    //   type: UPDATE_KEEPBOX_PATH,
    //   data: data.ima,
    // });
  }, []);

  const updateDelivery = useCallback(
    (value) => {
      dispatch({
        type: KEEPBOX_UPDATE_REQUEST,
        data: {
          id: updateData.id,
          userId: updateData.User.id,
          // userCode: updateData.User.userCode,
          deliveryCom: value.deliveryCom,
          deliveryCode: value.deliveryCode,
        },
      });
    },
    [updateData]
  );

  ////// DATAVIEW //////

  // Table
  const columns = [
    {
      title: "No",
      dataIndex: "id",
      width: `5%`,
    },
    {
      title: "송장번호",
      render: (data) => <div>{data.deliveryCode}</div>,
      width: `60%`,
    },

    {
      title: "배송 상태",
      render: (data) => (
        <div>{data.deliveryCode ? `송장번호 입력완료` : `송장번호 미입력`}</div>
      ),
      width: `12%`,
    },

    {
      title: "상세정보",
      render: (data) => (
        <Button onClick={() => moveLinkHandler(`/admin/keepBox/${data.id}`)}>
          확인
        </Button>
      ),
    },
    {
      title: "배송",
      render: (data) => (
        <Button type="primary" onClick={() => updateModalOpen(data)}>
          배송 정보 작성
        </Button>
      ),
    },
    // {
    //   title: "DELETE",
    //   render: (data) => (
    //     <Button type="danger" onClick={deletePopToggle(data.id)}>
    //       DEL
    //     </Button>
    //   ),
    // },
  ];

  console.log(keepBoxDetails);

  if (!keepBoxDetails) {
    return <Spin />;
  }

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["박스 관리", "박스 리스트"]}
        title={`박스 리스트`}
        subTitle={`박스 리스트를 관리할 수 있습니다.`}
      />

      <AdminContent>
        <Wrapper margin={`20px 0 `} al={`flex-start`}>
          <Text
            fontSize={`20px`}
            borderBottom={`1px solid ${Theme.black_C}`}
            width={`100%`}
            margin={`0 0 10px 0`}
            fontWeight={`bold`}
          >
            구매자 정보
          </Text>
          <Wrapper dr={`row`} ju={`space-between`}>
            <Text>구매자 : {keepBoxDetails[0].name}</Text>
            <CommonButton>정기 결제 시작</CommonButton>
          </Wrapper>
          <Wrapper dr={`row`} al={`flex-start`} al={`space-between`}>
            <Wrapper width={`50%`} al={`fles-start`}>
              <Text>연락처 : {keepBoxDetails[0].mobile}</Text>
              <Text>
                주소 : {keepBoxDetails[0].address}{" "}
                {keepBoxDetails[0].detailAddress}
              </Text>
              <Text>배송 방식 : {keepBoxDetails[0].pickWay}</Text>
              <Text>보관 기간 : {keepBoxDetails[0].period} 보관</Text>
            </Wrapper>
            <Wrapper width={`50%`} al={`flex-start`}>
              특이사항 :
              <Text>
                {keepBoxDetails[0].remark &&
                  keepBoxDetails[0].remark.split("\n").map((data, idx) => {
                    return <Text key={idx}>{data}</Text>;
                  })}
              </Text>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={keepBoxDetails ? keepBoxDetails : []}
          size="small"
          pagination={false}
        />
      </AdminContent>

      <Modal
        visible={modal}
        width={`600px`}
        title={`송장번호 입력 관리`}
        size="small"
        onCancel={modalClose}
        onOk={createModalOk}
      >
        <Wrapper padding={`10px`}>
          <Form
            style={{ width: `80%` }}
            onFinish={updateDelivery}
            ref={formRef}
          >
            <Form.Item
              name={"deliveryCode"}
              label="송장번호"
              rules={[{ required: true }]}
            >
              <Input allowClear size="small" placeholder="송장번호" />
            </Form.Item>
          </Form>
        </Wrapper>
      </Modal>

      <Modal
        visible={deletePopVisible}
        onOk={deleteGalleryHandler}
        onCancel={deletePopToggle(null)}
        title="정말 삭제하시겠습니까?"
      >
        <Wrapper>삭제 된 데이터는 다시 복구할 수 없습니다.</Wrapper>
        <Wrapper>정말 삭제하시겠습니까?</Wrapper>
      </Modal>
    </AdminLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
