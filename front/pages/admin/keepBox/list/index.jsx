import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../../components/AdminLayout";
import PageHeader from "../../../../components/admin/PageHeader";
import AdminTop from "../../../../components/admin/AdminTop";
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
} from "antd";
import { END } from "redux-saga";
import axios from "axios";
import { useRouter } from "next/router";
import { LOAD_MY_INFO_REQUEST } from "../../../../reducers/user";
import wrapper from "../../../../store/configureStore";
import {
  MODAL_CLOSE_REQUEST,
  MODAL_OPEN_REQUEST,
  KEEPBOX_DELETE_REQUEST,
  KEEPBOX_DATE_LIST_REQUEST,
  KEEPBOX_UPDATE_REQUEST,
} from "../../../../reducers/keepBox";
import useInput from "../../../../hooks/useInput";
import {
  ColWrapper,
  RowWrapper,
  Wrapper,
} from "../../../../components/commonComponents";
import { SearchOutlined } from "@ant-design/icons";
import { numberWithCommas } from "../../../../components/commonUtils";
import { SUBSCRIPTION_CANCEL_REQUEST } from "../../../../reducers/subscription";

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
  //   // LOAD CURRENT INFO AREA /////////////////////////////////////////////
  //   const { me, st_loadMyInfoDone } = useSelector((state) => state.user);

  const router = useRouter();

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  //   useEffect(() => {
  //     if (st_loadMyInfoDone) {
  //       if (!me || parseInt(me.level) < 3) {
  //         moveLinkHandler(`/admin`);
  //       }
  //     }
  //   }, [st_loadMyInfoDone]);
  //   /////////////////////////////////////////////////////////////////////////

  const year = [
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
    //
  ];

  const month = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    //
  ];

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
    keepBoxes,
    uploadKeepBoxPath,
    maxPage,
    modal,
    //
    st_keepBoxListError,
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
      type: KEEPBOX_DATE_LIST_REQUEST,
      data: {
        searchDate: `${yearInput}-${monthInput}-01`,
      },
    });
  }, [router.query, yearInput, monthInput]);

  useEffect(() => {
    if (st_keepBoxCreateDone) {
      const qs = getQs();
      dispatch({
        type: KEEPBOX_DATE_LIST_REQUEST,
        data: {
          searchDate: `${yearInput}-${monthInput}-01`,
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
        type: KEEPBOX_DATE_LIST_REQUEST,
        data: {
          searchDate: `${yearInput}-${monthInput}-01`,
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
        type: KEEPBOX_DATE_LIST_REQUEST,
        data: {
          searchDate: `${yearInput}-${monthInput}-01`,
        },
      });

      dispatch({
        type: MODAL_CLOSE_REQUEST,
      });
    }
  }, [st_keepBoxDeleteDone, router.query, yearInput, monthInput]);

  useEffect(() => {
    if (st_keepBoxListError) {
      return message.error(st_keepBoxListError);
    }
  }, [st_keepBoxListError]);

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
  const onSubmit = useCallback(
    (value) => {
      dispatch({
        type: KEEPBOX_CREATE_REQUEST,
        data: {
          hint: value.hint,
          title: value.content,
          answer: value.answer,
          outLink: "-",
        },
      });
    },
    [uploadKeepBoxPath]
  );

  const onSubmitUpdate = useCallback(
    (value) => {
      dispatch({
        type: KEEPBOX_UPDATE_REQUEST,
        data: {
          id: updateData.id,
          hint: value.hint,
          title: value.content,
          answer: value.answer,
          outLink: "-",
        },
      });
    },
    [uploadKeepBoxPath, updateData]
  );

  const onChangeImages = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: KEEPBOX_UPLOAD_REQUEST,
      data: formData,
    });
  });

  const createModalOk = useCallback(() => {
    formRef.current.submit();
  }, []);

  const clickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const otherPageCall = useCallback(
    (changePage) => {
      setCurrentPage(changePage);
      const queryString = `?page=${changePage}&search=${searchValue}`;

      dispatch({
        type: KEEPBOX_DATE_LIST_REQUEST,
        data: {
          qs: queryString || "",
        },
      });
    },
    [searchValue]
  );

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

    if (qs.search) {
      value += `&searchTitle=${qs.search}`;
      setSearchValue(qs.search);
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
      console.log(updateData.User);

      dispatch({
        type: KEEPBOX_UPDATE_REQUEST,
        data: {
          id: updateData.id,
          userId: updateData.User.id,
          userCode: updateData.User.userCode,
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
    },
    {
      title: "구매자",
      dataIndex: "name",
    },
    {
      title: "구매한 상자 수",
      render: (data) => (
        <div>
          {data.boxcount1 + data.boxcount2 + data.boxcount3 + data.boxcount4}
        </div>
      ),
    },
    {
      title: "월 요금",
      render: (data) => (
        <div>{numberWithCommas(data.price + parseInt(data.deliveryPay))}원</div>
      ),
    },
    {
      title: "연락처",
      dataIndex: "mobile",
    },
    {
      title: "신청일",
      render: (data) => <div>{data.createdAt.slice(0, 10)}</div>,
    },
    {
      title: "상세정보",
      render: (data) => (
        <Button type="primary" onClick={() => updateModalOpen(data)}>
          UPDATE
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

  console.log(keepBoxes);

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["박스 관리", "박스 리스트"]}
        title={`박스 리스트`}
        subTitle={`박스 리스트를 관리할 수 있습니다.`}
      />

      {/* <AdminTop createButton={true} createButtonAction={modalOpen} /> */}

      <AdminContent>
        <Row gutter={[10, 10]} style={{ padding: "0 0 10px 0" }}>
          <Col style={{ width: `150px` }}>
            <Select
              style={{ width: `100%` }}
              value={yearInput}
              onChange={(value) => setYearInput(value)}
            >
              {year.map((data) => {
                return <Select.Option value={data}>{data}년</Select.Option>;
              })}
            </Select>
          </Col>

          <Col style={{ width: `150px` }}>
            <Select
              style={{ width: `100%` }}
              value={monthInput}
              onChange={(value) => setMonthInput(value)}
            >
              {month.map((data) => {
                return <Select.Option value={data}>{data}월</Select.Option>;
              })}
            </Select>
          </Col>
        </Row>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={keepBoxes ? keepBoxes : []}
          size="small"
          pagination={
            false
            //   {
            //   defaultCurrent: 1,
            //   current: parseInt(currentPage),

            //   total: maxPage * 10,
            //   onChange: (page) => otherPageCall(page),
            // }
          }
        />
      </AdminContent>

      <Modal
        visible={modal}
        width={`600px`}
        title={`매입 관리`}
        size="small"
        onCancel={modalClose}
        onOk={createModalOk}
      >
        <Wrapper padding={`10px`}>
          {/* <ImageWrapper>
            <GuideWrapper>
              <GuideText>
                이미지 사이즈는 가로 {_WIDTH}px 과 세로
                {_HEIGHT}px을 기준으로 합니다.
              </GuideText>
              <GuideText>
                이미지 사이즈가 상이할 경우 화면에 올바르지 않게 보일 수 있으니
                이미지 사이즈를 확인해주세요.
              </GuideText>
            </GuideWrapper>

            <UploadImage
              src={
                uploadKeepBoxPath
                  ? `${uploadKeepBoxPath}`
                  : `https://via.placeholder.com/${_WIDTH}x${_HEIGHT}`
              }
              alt="main_GALLEY_image"
            />
            <Guide>
              {uploadKeepBoxPath && `이미지 미리보기 입니다.`}
            </Guide>

            <UploadWrapper>
              <input
                type="file"
                name="image"
                accept=".png, .jpg"
                // multiple
                hidden
                ref={imageInput}
                onChange={onChangeImages}
              />
              <Button
                size="small"
                type="primary"
                onClick={clickImageUpload}
                loading={st_keepBoxUploadLoading}
              >
                UPLOAD
              </Button>
            </UploadWrapper>
          </ImageWrapper> */}

          <Form
            style={{ width: `80%` }}
            onFinish={updateDelivery}
            ref={formRef}
          >
            <Form.Item
              name={"deliveryCom"}
              label="배송 택배사"
              rules={[{ required: true }]}
            >
              <Input size="small" placeholder="택배사" />
            </Form.Item>

            <Form.Item
              name={"deliveryCode"}
              label="송장번호"
              rules={[{ required: true }]}
            >
              <Input allowClear size="small" placeholder="송장번호" />
            </Form.Item>

            <Button size="small" type="primary" htmlType="submit">
              배송 시작
            </Button>
            <Button
              size="small"
              type="danger"
              onClick={() => {
                dispatch({
                  type: SUBSCRIPTION_CANCEL_REQUEST,
                  data: {
                    id: updateData.id,
                    userCode: updateData.User.userCode,
                    userId: updateData.User.id,
                  },
                });
              }}
            >
              배송 취소
            </Button>
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
