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
} from "antd";
import { END } from "redux-saga";
import axios from "axios";
import { useRouter } from "next/router";
import { LOAD_MY_INFO_REQUEST } from "../../../../../reducers/user";
import wrapper from "../../../../../store/configureStore";
import {
  MODAL_OPEN_REQUEST,
  MODAL_CLOSE_REQUEST,
  INFO_TYPE_CREATE_REQUEST,
  INFO_TYPE_DELETE_REQUEST,
  INFO_TYPE_LIST_REQUEST,
  INFO_TYPE_UPDATE_REQUEST,
  INFO_TYPE_UPLOAD_REQUEST,
} from "../../../../../reducers/info";
import useInput from "../../../../../hooks/useInput";
import {
  ColWrapper,
  RowWrapper,
  Wrapper,
} from "../../../../../components/commonComponents";
import { SearchOutlined } from "@ant-design/icons";
import { FAQ_TYPE_UPDATE_REQUEST } from "../../../../../reducers/faq";

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

  const inputValue = useInput("");

  const [deletePopVisible, setDeletePopVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const {
    infoTypes,
    uploadInfoTypePath,
    maxPage,
    modal,
    //
    st_infoTypeListError,
    st_infoTypeCreateDone,
    st_infoTypeCreateError,
    st_infoTypeUpdateDone,
    st_infoTypeUpdateError,
    st_infoTypeDeleteDone,
    st_infoTypeDeleteError,

    st_infoTypeUploadLoading,
  } = useSelector((state) => state.info);

  ////// USEEFFECT //////
  useEffect(() => {
    const qs = getQs();
    dispatch({
      type: INFO_TYPE_LIST_REQUEST,
      data: {
        qs,
      },
    });
  }, [router.query]);

  useEffect(() => {
    if (st_infoTypeCreateDone) {
      const qs = getQs();
      dispatch({
        type: INFO_TYPE_LIST_REQUEST,
        data: {
          qs,
        },
      });

      dispatch({
        type: MODAL_CLOSE_REQUEST,
      });
    }
  }, [st_infoTypeCreateDone, router.query]);

  useEffect(() => {
    if (st_infoTypeUpdateDone) {
      const qs = getQs();
      dispatch({
        type: INFO_TYPE_LIST_REQUEST,
        data: {
          qs,
        },
      });

      dispatch({
        type: MODAL_CLOSE_REQUEST,
      });
    }
  }, [st_infoTypeUpdateDone, router.query]);

  useEffect(() => {
    if (st_infoTypeDeleteDone) {
      const qs = getQs();
      dispatch({
        type: INFO_TYPE_LIST_REQUEST,
        data: {
          qs,
        },
      });

      dispatch({
        type: MODAL_CLOSE_REQUEST,
      });
    }
  }, [st_infoTypeDeleteDone, router.query]);

  useEffect(() => {
    if (st_infoTypeListError) {
      return message.error(st_infoTypeListError);
    }
  }, [st_infoTypeListError]);

  useEffect(() => {
    if (st_infoTypeCreateError) {
      return message.error(st_infoTypeCreateError);
    }
  }, [st_infoTypeCreateError]);

  useEffect(() => {
    if (st_infoTypeUpdateError) {
      return message.error(st_infoTypeUpdateError);
    }
  }, [st_infoTypeUpdateError]);

  useEffect(() => {
    if (st_infoTypeDeleteError) {
      return message.error(st_infoTypeDeleteError);
    }
  }, [st_infoTypeDeleteError]);

  useEffect(() => {
    if (!modal) {
      setUpdateData(null);
      inputValue.setValue("");
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
  const createModalOpen = useCallback(() => {
    dispatch({
      type: MODAL_OPEN_REQUEST,
    });
  }, [modal]);

  const createModalClose = useCallback(() => {
    dispatch({
      type: MODAL_CLOSE_REQUEST,
    });

    inputValue.setValue("");
  }, [modal, inputValue]);

  const updateModalOpen = useCallback(
    (data) => {
      dispatch({
        type: MODAL_OPEN_REQUEST,
      });

      inputValue.setValue(data.value);
      setUpdateData(data);
    },
    [modal, inputValue]
  );

  const updateModalClose = useCallback(() => {
    dispatch({
      type: MODAL_CLOSE_REQUEST,
    });
    setUpdateData(null);
    inputValue.setValue("");
  }, [modal, inputValue]);

  const deletePopToggle = useCallback(
    (id) => () => {
      setDeleteId(id);
      setDeletePopVisible((prev) => !prev);
    },
    [deletePopVisible, deleteId]
  );

  ////// HANDLER //////

  const createModalOk = useCallback(() => {
    if (!inputValue.value || inputValue.value.trim() === "") {
      return LoadNotification("ADMIN SYSTEM ERRLR", "문의 유형을 입력해주세요");
    }

    dispatch({
      type: INFO_TYPE_CREATE_REQUEST,
      data: { value: inputValue.value },
    });
  }, [inputValue]);

  const onSubmitUpdate = useCallback(() => {
    if (!inputValue.value || inputValue.value.trim() === "") {
      return LoadNotification("ADMIN SYSTEM ERRLR", "문의 유형을 입력해주세요");
    }

    console.log({ id: updateData.id, value: inputValue.value });

    dispatch({
      type: INFO_TYPE_UPDATE_REQUEST,
      data: { id: updateData.id, value: inputValue.value },
    });
  }, [inputValue, updateData]);

  const onChangeImages = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: INFO_TYPE_UPLOAD_REQUEST,
      data: formData,
    });
  });

  const clickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const otherPageCall = useCallback(
    (changePage) => {
      setCurrentPage(changePage);
      const queryString = `?page=${changePage}&search=${searchValue}`;

      dispatch({
        type: INFO_TYPE_LIST_REQUEST,
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
      type: INFO_TYPE_DELETE_REQUEST,
      data: { infoTypeId: deleteId },
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
    // dispatch({
    //   type: UPDATE_INFO_TYPE_PATH,
    //   data: data.ima,
    // });
  }, []);
  ////// DATAVIEW //////

  // Table
  const columns = [
    {
      title: "No",
      dataIndex: "id",
    },
    {
      title: "유형명",
      render: (data) => <div>{data.value}</div>,
    },
    {
      title: "수정",
      render: (data) => (
        <Button type="primary" onClick={() => updateModalOpen(data)}>
          수정
        </Button>
      ),
    },
    {
      title: "삭제",
      render: (data) => (
        <Button type="danger" onClick={deletePopToggle(data.id)}>
          삭제
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["게시판 관리", "이용 안내 유형 리스트"]}
        title={`이용 안내 유형 리스트`}
        subTitle={`이용 안내 유형 리스트를 관리할 수 있습니다.`}
      />

      <AdminTop createButton={true} createButtonAction={createModalOpen} />

      <AdminContent>
        {/* <Row gutter={[10, 10]} style={{ padding: "0 0 10px 0" }}>
          <Col span={`6`}>
            <Input
              style={{ width: "100%" }}
              placeholder="검색어"
              {...inputSearch}
            />
          </Col>

          <Col>
            <Button
              onClick={() =>
                moveLinkHandler(
                  `/admin/infoType?page=${currentPage}&search=${inputSearch.value}`
                )
              }
            >
              <SearchOutlined />
              검색
            </Button>
          </Col>
        </Row> */}
        <Table
          rowKey="id"
          columns={columns}
          dataSource={infoTypes ? infoTypes : []}
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
        width={`400px`}
        title={`문의 유형`}
        onCancel={updateData ? updateModalClose : createModalClose}
        onOk={updateData ? onSubmitUpdate : createModalOk}
      >
        <Wrapper padding={`10px`}>
          <Input {...inputValue} />
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
