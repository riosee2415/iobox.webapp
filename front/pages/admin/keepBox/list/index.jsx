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
  MASTER_KEEPBOX_UPDATE_REQUEST,
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
import { CSVLink } from "react-csv";
import Theme from "../../../../components/Theme";

const DownloadBtn = styled(CSVLink)`
  width: 200px;
  height: 25px;
  margin: 0 0 0 10px;
  border-radius: 3px;

  background: ${(props) => props.theme.basicTheme_C};
  color: ${(props) => props.theme.white_C};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  transition: 0.4s;
`;

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

  const dataArr = [
    //
    ["행거박스", "W58 x H100 x D30 (CM)", "월", 19000],
    ["행거박스 plus+", "W58 x H130 x D60 (CM)", "월", 39000],
    ["텐트박스", "W100 x H45 x D45 (CM)", "월", 39000],
    ["캠핑박스 plus+", "W110 x H50 x D50 (CM)", "월", 59000],
  ];

  const headers = [
    { label: "번호", key: "no" },
    { label: "박스 유형", key: "boxes" },
    { label: "구매 유형", key: "type" },
    { label: "구매자", key: "name" },
    { label: "연락처", key: "mobile" },
    { label: "배송 방법", key: "pickWay" },
    { label: "특이사항", key: "remark" },
    { label: "택배사", key: "deliveyCom" },
    { label: "송장번호", key: "deliveryNo" },
    { label: "구매일", key: "createdAt" },
  ];

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

  const [csvData, setCsvData] = useState(null);

  const {
    keepBoxes,
    uploadKeepBoxPath,
    maxPage,
    modal,
    //
    st_keepBoxListError,
    st_keepBoxCreateDone,
    st_keepBoxCreateError,
    st_masterKeepBoxUpdateDone,
    st_masterKeepBoxUpdateError,
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
        qs,
      },
    });
  }, [router.query, yearInput, monthInput]);

  useEffect(() => {
    if (st_masterKeepBoxUpdateDone) {
      const qs = getQs();
      dispatch({
        type: KEEPBOX_DATE_LIST_REQUEST,
        data: {
          searchDate: `${yearInput}-${monthInput}-01`,
          qs,
        },
      });

      dispatch({
        type: MODAL_CLOSE_REQUEST,
      });
    }
  }, [st_masterKeepBoxUpdateDone, router.query, yearInput, monthInput]);

  useEffect(() => {
    if (st_keepBoxDeleteDone) {
      const qs = getQs();
      dispatch({
        type: KEEPBOX_DATE_LIST_REQUEST,
        data: {
          searchDate: `${yearInput}-${monthInput}-01`,
          qs,
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
    if (st_masterKeepBoxUpdateError) {
      return message.error(st_masterKeepBoxUpdateError);
    }
  }, [st_masterKeepBoxUpdateError]);

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

  useEffect(() => {
    if (keepBoxes) {
      const tempArr = [];

      keepBoxes.map((data, idx) => {
        data.KeepBoxes.map((info) => {
          let type = "";

          if (info.boxcount1) {
            type = dataArr[0];
          }
          if (info.boxcount2) {
            type = dataArr[1];
          }
          if (info.boxcount3) {
            type = dataArr[2];
          }
          if (info.boxcount4) {
            type = dataArr[3];
          }

          tempArr.push({
            no: data.id,
            boxes: type[0],
            type: info.type === "일반 배송" ? "일반 배송" : "하루 배송",
            name: info.name,
            mobile: `${info.mobile.slice(0, 3)}-${info.mobile.slice(
              3,
              7
            )}-${info.mobile.slice(7, 11)}`,
            pickWay: info.pickWay ? info.pickWay : "하루 배송",
            remark: info.remark,
            deliveryCom: info.deliveryCom,
            deliveryNo: info.deliveryNo,
            createdAt: data.createdAt.slice(0, 10),
          });
        });
      });

      setCsvData(tempArr);
    }
  }, [keepBoxes]);

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

    if (!qs.listType) {
      value = "/3";
    } else {
      value = `/${qs.listType}`;
    }

    return value;
  };

  const onFill = useCallback((data) => {
    formRef.current.setFieldsValue({
      status: data.status,
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
        type: MASTER_KEEPBOX_UPDATE_REQUEST,
        data: {
          id: updateData.id,
          status: value.status,
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
      render: (data) => <div>{data.KeepBoxes[0].name}</div>,
    },
    {
      title: "구매한 상자 수",
      render: (data) => <div>{numberWithCommas(data.KeepBoxes.length)}</div>,
    },
    {
      title: "월 요금",
      render: (data) => (
        <div>{numberWithCommas(data.KeepBoxes[0].price)}원</div>
      ),
    },
    {
      title: "연락처",
      render: (data) => <div>{data.KeepBoxes[0].mobile}</div>,
    },
    {
      title: "신청일",
      render: (data) => <div>{data.createdAt.slice(0, 10)}</div>,
    },
    {
      title: "상세정보",
      render: (data) => (
        <Button
          onClick={() => moveLinkHandler(`/admin/keepBox/list/${data.id}`)}
        >
          확인
        </Button>
      ),
    },
    {
      title: "진행상황",
      render: (data) => (
        <Wrapper al={`flex-start`}>
          {data.status === "찾기완료" ? (
            <Text>찾기완료</Text>
          ) : data.status === "보관중" ? (
            <Text>보관중</Text>
          ) : (
            <Button type="primary" onClick={() => updateModalOpen(data)}>
              진행상황 수정
            </Button>
          )}
        </Wrapper>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["박스 관리", "박스 리스트"]}
        title={`박스 리스트`}
        subTitle={`박스 리스트를 관리할 수 있습니다.`}
      />

      <AdminContent>
        <Wrapper padding={"0 0 10px 0"} dr={`row`} ju={`space-between`}>
          <Wrapper width={`auto`} dr={`row`}>
            <Wrapper width={`150px`}>
              <Select
                style={{ width: `100%` }}
                value={yearInput}
                onChange={(value) => setYearInput(value)}
              >
                {year.map((data) => {
                  return <Select.Option value={data}>{data}년</Select.Option>;
                })}
              </Select>
            </Wrapper>

            <Wrapper width={`150px`} margin={`0 10px`}>
              <Select
                style={{ width: `100%` }}
                value={monthInput}
                onChange={(value) => setMonthInput(value)}
              >
                {month.map((data) => {
                  return <Select.Option value={data}>{data}월</Select.Option>;
                })}
              </Select>
            </Wrapper>
            <Wrapper width={`86px`}>
              <Button
                onClick={() =>
                  moveLinkHandler("/admin/keepBox/list?listType=3")
                }
              >
                전체 조회
              </Button>
            </Wrapper>
            <Wrapper width={`86px`} margin={`0 5px`}>
              <Button
                onClick={() =>
                  moveLinkHandler("/admin/keepBox/list?listType=1")
                }
              >
                일반 배송
              </Button>
            </Wrapper>
            <Wrapper width={`86px`}>
              <Button
                onClick={() =>
                  moveLinkHandler("/admin/keepBox/list?listType=2")
                }
              >
                하루 배송
              </Button>
            </Wrapper>
          </Wrapper>
          {csvData && (
            <DownloadBtn
              filename={`배송 정보`}
              headers={headers}
              data={csvData}
            >
              배송 정보 출력
            </DownloadBtn>
          )}
        </Wrapper>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={keepBoxes ? keepBoxes : []}
          size="small"
        />
      </AdminContent>

      <Modal
        visible={modal}
        width={`600px`}
        title={`진행 관리`}
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
            onFinish={() => updateDelivery()}
            ref={formRef}
          >
            <Form.Item
              name={"status"}
              label="진행 상태"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value={"보관예약"}>보관 예약</Select.Option>
                <Select.Option value={"수거중"}>수거중</Select.Option>
                <Select.Option value={"센터도착"}>센터 도착</Select.Option>
                <Select.Option value={"보관중"}>보관중</Select.Option>
              </Select>
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
