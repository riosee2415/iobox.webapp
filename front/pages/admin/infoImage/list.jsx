import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import PageHeader from "../../../components/admin/PageHeader";
import AdminTop from "../../../components/admin/AdminTop";
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
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import wrapper from "../../../store/configureStore";
import {
  MODAL_CLOSE_REQUEST,
  MODAL_OPEN_REQUEST,
  MENU_CREATE_REQUEST,
  MENU_DELETE_REQUEST,
  MENU_LIST_REQUEST,
  MENU_UPDATE_REQUEST,
  MENU_UPLOAD_REQUEST,
  UPDATE_MENU_PATH,
} from "../../../reducers/menuImage";
import useInput from "../../../hooks/useInput";
import {
  ColWrapper,
  RowWrapper,
  Wrapper,
} from "../../../components/commonComponents";
import { SearchOutlined } from "@ant-design/icons";

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
  const [currentViewImagePath, setCurrentViewImagePath] = useState(``);
  const [updateData, setUpdateData] = useState(null);

  const [deletePopVisible, setDeletePopVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [showData, setShowData] = useState(null);

  const {
    menuImages,
    uploadMenuImagePath,
    maxPage,
    modal,
    //
    st_menuImageListError,
    st_menuImageCreateDone,
    st_menuImageCreateError,
    st_menuImageUpdateDone,
    st_menuImageUpdateError,
    st_menuImageDeleteDone,
    st_menuImageDeleteError,

    st_menuImageUploadLoading,
  } = useSelector((state) => state.menuImage);

  ////// USEEFFECT //////

  useEffect(() => {
    if (menuImages) {
      let data = [];
      for (let i = 0; i < menuImages.length; i++) {
        data.push({
          id: menuImages[i].id,
          key: i,
          imagePath: menuImages[i].imagePath,
          createdAt: menuImages[i].createdAt,
          updatedAt: menuImages[i].updatedAt,
        });
      }
      setShowData(data);
    }
  }, [menuImages]);

  useEffect(() => {
    const qs = getQs();
    dispatch({
      type: MENU_LIST_REQUEST,
      data: {
        qs,
      },
    });
  }, [router.query]);

  useEffect(() => {
    if (st_menuImageCreateDone) {
      const qs = getQs();
      dispatch({
        type: MENU_LIST_REQUEST,
        data: {
          qs,
        },
      });

      dispatch({
        type: MODAL_CLOSE_REQUEST,
      });
    }
  }, [st_menuImageCreateDone, router.query]);

  useEffect(() => {
    if (st_menuImageUpdateDone) {
      const qs = getQs();
      dispatch({
        type: MENU_LIST_REQUEST,
        data: {
          qs,
        },
      });

      dispatch({
        type: MODAL_CLOSE_REQUEST,
      });
    }
  }, [st_menuImageUpdateDone, router.query]);

  useEffect(() => {
    if (st_menuImageDeleteDone) {
      const qs = getQs();
      dispatch({
        type: MENU_LIST_REQUEST,
        data: {
          qs,
        },
      });

      dispatch({
        type: MODAL_CLOSE_REQUEST,
      });
    }
  }, [st_menuImageDeleteDone, router.query]);

  useEffect(() => {
    if (st_menuImageListError) {
      return message.error(st_menuImageListError);
    }
  }, [st_menuImageListError]);

  useEffect(() => {
    if (st_menuImageCreateError) {
      return message.error(st_menuImageCreateError);
    }
  }, [st_menuImageCreateError]);

  useEffect(() => {
    if (st_menuImageUpdateError) {
      return message.error(st_menuImageUpdateError);
    }
  }, [st_menuImageUpdateError]);

  useEffect(() => {
    if (st_menuImageDeleteError) {
      return message.error(st_menuImageDeleteError);
    }
  }, [st_menuImageDeleteError]);

  useEffect(() => {
    if (!modal) {
      dispatch({
        type: UPDATE_MENU_PATH,
        data: "",
      });
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
        type: MENU_CREATE_REQUEST,
        data: {
          hint: value.hint,
          title: value.content,
          answer: value.answer,
          outLink: "-",
        },
      });
    },
    [uploadMenuImagePath]
  );

  const onSubmitUpdate = useCallback(
    (value) => {
      dispatch({
        type: MENU_UPDATE_REQUEST,
        data: {
          id: updateData.id,
          hint: value.hint,
          title: value.content,
          answer: value.answer,
          outLink: "-",
        },
      });
    },
    [uploadMenuImagePath, updateData]
  );

  const onChangeImages = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: MENU_UPLOAD_REQUEST,
      data: formData,
    });
  });

  const createModalOk = useCallback(() => {
    dispatch({
      type: MENU_CREATE_REQUEST,
      data: {
        imagePath: uploadMenuImagePath,
      },
    });
  }, [uploadMenuImagePath, updateData]);

  const updateModalOk = useCallback(() => {
    dispatch({
      type: MENU_UPDATE_REQUEST,
      data: {
        id: updateData.id,
        imagePath: uploadMenuImagePath,
      },
    });
  }, [uploadMenuImagePath, updateData]);

  const clickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const otherPageCall = useCallback(
    (changePage) => {
      setCurrentPage(changePage);
      const queryString = `?page=${changePage}&search=${searchValue}`;

      dispatch({
        type: MENU_LIST_REQUEST,
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
      type: MENU_DELETE_REQUEST,
      data: { menuImageId: deleteId },
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
    // formRef.current.setFieldsValue({
    //   hint: data.hint,
    //   content: data.title,
    //   answer: data.answer,
    // });

    dispatch({
      type: UPDATE_MENU_PATH,
      data: data.imagePath,
    });
  }, []);
  ////// DATAVIEW //////

  // Table

  const nameData = [
    "아이오 박스란?",
    "서비스 이용방법",
    "서비스 이용료",
    "IO박스 보관센터",
  ];

  const columns = [
    {
      title: "No",
      dataIndex: "id",
    },
    {
      title: "이름",
      render: (info) => <div>{nameData[info.key]}</div>,
    },

    {
      title: "수정일",
      render: (data) => <div>{data.updatedAt.slice(0, 10)}</div>,
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
      title: "DEL",
      render: (data) => (
        <Button type="danger" onClick={deletePopToggle(data.id)}>
          DEL
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["안내 관리", "안내 리스트"]}
        title={`안내 리스트`}
        subTitle={`안내 리스트를 관리할 수 있습니다.`}
      />

      <AdminTop createButton={true} createButtonAction={modalOpen} />

      <AdminContent>
        <Row gutter={[10, 10]} style={{ padding: "0 0 10px 0" }}>
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
                  `/admin/info?page=${currentPage}&search=${inputSearch.value}`
                )
              }
            >
              <SearchOutlined />
              검색
            </Button>
          </Col>
        </Row>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={showData ? showData : []}
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
        title={`안내 관리`}
        size="small"
        // footer={false}
        onCancel={modalClose}
        onOk={updateData ? updateModalOk : createModalOk}
      >
        <Wrapper padding={`10px`}>
          <ImageWrapper>
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
                uploadMenuImagePath
                  ? `${uploadMenuImagePath}`
                  : updateData
                  ? updateData.imagePath
                  : `https://via.placeholder.com/${_WIDTH}x${_HEIGHT}`
              }
              alt="main_GALLEY_image"
            />
            <Guide>{uploadMenuImagePath && `이미지 미리보기 입니다.`}</Guide>

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
                loading={st_menuImageUploadLoading}
              >
                UPLOAD
              </Button>
            </UploadWrapper>
          </ImageWrapper>

          {/* <Form
            style={{ width: `80%` }}
            onFinish={updateData ? onSubmitUpdate : onSubmit}
            ref={formRef}
          >
            <Form.Item
              name={"content"}
              label="문제"
              rules={[{ required: true }]}
            >
              <Input.TextArea
                allowClear
                size="small"
                autoSize={{ minRows: 10, maxRows: 10 }}
                placeholder="Content..."
              />
            </Form.Item>

            <Form.Item
              name={"hint"}
              label="힌트 링크"
              rules={[{ required: true }]}
            >
              <Input allowClear size="small" placeholder="Hint..." />
            </Form.Item>

            <Form.Item
              name={"answer"}
              label="정답"
              rules={[{ required: true }]}
            >
              <Input
                allowClear
                size="small"
                placeholder="Answer..."
                type="number"
              />
            </Form.Item>
          </Form> */}
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
