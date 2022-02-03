import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../../components/AdminLayout";
import PageHeader from "../../../../components/admin/PageHeader";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Modal,
  Select,
  notification,
  message,
  Popconfirm,
  Form,
  Input,
} from "antd";

import { useRouter, withRouter } from "next/router";
import wrapper from "../../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
  Wrapper,
  AdminContent,
  SearchForm,
  SearchFormItem,
  ModalBtn,
  GuideUl,
  GuideLi,
} from "../../../../components/commonComponents";
import {
  LOAD_MY_INFO_REQUEST,
  USERLIST_REQUEST,
} from "../../../../reducers/user";
import {
  CREATE_MODAL_TOGGLE_REQUEST,
  UPDATE_MODAL_TOGGLE_REQUEST,
  MODAL_TOGGLE_REQUEST,
  RETURNBOX_CREATE_REQUEST,
  RETURNBOX_DELETE_REQUEST,
  RETURNBOX_LIST_REQUEST,
  RETURNBOX_UPDATE_REQUEST,
} from "../../../../reducers/returnBox";
import { numberWithCommas } from "../../../../components/commonUtils";
import { CSVLink } from "react-csv";

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

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

const Index = ({}) => {
  const { st_loadMyInfoDone, me, users } = useSelector((state) => state.user);

  const headers = [
    { label: "번호", key: "no" },
    { label: "박스 유형", key: "boxes" },
    { label: "구매 유형", key: "type" },
    { label: "주소", key: "address" },
    { label: "구매자", key: "name" },
    { label: "연락처", key: "mobile" },
    { label: "택배사", key: "deliveyCom" },
    { label: "송장번호", key: "deliveryNo" },
    { label: "구매일", key: "createdAt" },
  ];

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

  const dataArr = [
    //
    ["행거박스", "W58 x H100 x D30 (CM)", "월", 19000],
    ["행거박스 plus+", "W58 x H130 x D60 (CM)", "월", 39000],
    ["텐트박스", "W100 x H45 x D45 (CM)", "월", 39000],
    ["캠핑박스 plus+", "W110 x H50 x D50 (CM)", "월", 59000],
  ];

  ////// HOOKS //////
  const dispatch = useDispatch();

  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  const [currentId, setCurrentId] = useState(null);

  const [updateData, setUpdateData] = useState(null);
  const [csvData, setCsvData] = useState(null);

  const formRef = useRef();

  const {
    returnBoxs,
    //
    st_returnBoxCreateDone,
    st_returnBoxCreateError,
    st_returnBoxUpdateDone,
    st_returnBoxUpdateError,
    st_returnBoxDeleteDone,
    st_returnBoxDeleteError,
    //
    modal,
    createModal,
    updateModal,
  } = useSelector((state) => state.returnBox);

  console.log(returnBoxs);

  ////// USEEFFECT //////
  useEffect(() => {
    if (returnBoxs) {
      const tempArr = [];

      returnBoxs.map((data, idx) => {
        let type = "";

        console.log(data);

        if (data.BoxImages[0].KeepBox.boxcount1) {
          type = dataArr[0];
        }
        if (data.BoxImages[0].KeepBox.boxcount2) {
          type = dataArr[1];
        }
        if (data.BoxImages[0].KeepBox.boxcount3) {
          type = dataArr[2];
        }
        if (data.BoxImages[0].KeepBox.boxcount4) {
          type = dataArr[3];
        }

        tempArr.push({
          no: data.id,
          boxes: type[0],
          type:
            data.BoxImages[0].KeepBox.type === "일반 배송"
              ? "일반 배송"
              : "하루 배송",
          address:
            data.BoxImages[0].KeepBox.address +
            " " +
            data.BoxImages[0].KeepBox.detailAddress,
          name: data.BoxImages[0].KeepBox.name,
          mobile: `${data.BoxImages[0].KeepBox.mobile.slice(
            0,
            3
          )}-${data.BoxImages[0].KeepBox.mobile.slice(
            3,
            7
          )}-${data.BoxImages[0].KeepBox.mobile.slice(7, 11)}`,
          deliveryCom: data.deliveryCom,
          deliveryNo: data.deliveryNo,
          createdAt: data.createdAt.slice(0, 10),
        });
      });

      setCsvData(tempArr);
    }
  }, [returnBoxs]);

  useEffect(() => {
    dispatch({
      type: RETURNBOX_LIST_REQUEST,
      data: {
        qs: router.query.listType,
      },
    });
  }, [router]);

  useEffect(() => {
    if (st_returnBoxCreateDone) {
      message.success("배송 정보가 등록되었습니다.");

      dispatch({
        type: CREATE_MODAL_TOGGLE_REQUEST,
      });

      dispatch({
        type: RETURNBOX_LIST_REQUEST,
        data: {
          qs: router.query.listType,
        },
      });
    }
  }, [st_returnBoxCreateDone, router]);
  useEffect(() => {
    if (st_returnBoxCreateError) {
      message.error(st_returnBoxCreateError);
    }
  }, [st_returnBoxCreateError]);

  useEffect(() => {
    if (st_returnBoxUpdateDone) {
      message.success("배송 정보가 등록되었습니다.");

      dispatch({
        type: UPDATE_MODAL_TOGGLE_REQUEST,
      });

      dispatch({
        type: RETURNBOX_LIST_REQUEST,
        data: {
          qs: router.query.listType,
        },
      });
    }
  }, [st_returnBoxUpdateDone, router]);
  useEffect(() => {
    if (st_returnBoxUpdateError) {
      message.error(st_returnBoxUpdateError);
    }
  }, [st_returnBoxUpdateError]);

  useEffect(() => {
    if (st_returnBoxDeleteDone) {
      message.success("기존 상품유형이 삭제되었습니다.");

      dispatch({
        type: RETURNBOX_LIST_REQUEST,
        data: {
          qs: router.query.listType,
        },
      });
    }
  }, [st_returnBoxDeleteDone, router]);

  useEffect(() => {
    if (st_returnBoxDeleteError) {
      message.error(st_returnBoxDeleteError);
    }
  }, [st_returnBoxDeleteError]);

  ////// HANDLER //////
  const createModalOk = useCallback(() => {
    formRef.current.submit();
  }, []);

  const deleteHandler = useCallback((data) => {
    dispatch({
      type: RETURNBOX_DELETE_REQUEST,
      data: {
        returnBoxId: data.id,
      },
    });
  }, []);

  const guideModalToggle = useCallback(() => {
    dispatch({
      type: MODAL_TOGGLE_REQUEST,
    });
  }, [modal]);

  const createModalToggle = useCallback(() => {
    createForm.resetFields();

    dispatch({
      type: CREATE_MODAL_TOGGLE_REQUEST,
    });
  }, [createModal]);

  const updateModalToggle = useCallback(
    (data) => {
      setCurrentId(data ? data.id : null);
      updateForm.resetFields();

      setUpdateData(data);

      dispatch({
        type: UPDATE_MODAL_TOGGLE_REQUEST,
      });
    },
    [updateModal, currentId]
  );

  const updateOnFill = useCallback(
    (data) => {
      updateForm.setFieldsValue({
        value: data.value,
      });
    },
    [updateForm]
  );

  const createSubmitHandler = useCallback((data) => {
    console.log(data);

    dispatch({
      type: RETURNBOX_CREATE_REQUEST,
      data,
    });
  }, []);

  const updateSubmitHandler = useCallback(
    (data) => {
      dispatch({
        type: RETURNBOX_UPDATE_REQUEST,
        data: {
          id: currentId,
          value: data.value,
        },
      });
    },
    [currentId]
  );

  const updateDelivery = useCallback(
    (value) => {
      dispatch({
        type: RETURNBOX_UPDATE_REQUEST,
        data: {
          id: updateData.id,
          deliveryCom: "대한통운",
          deliveryCode: value.deliveryCode,
        },
      });
    },
    [updateData]
  );
  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const columns = [
    {
      title: "No",
      dataIndex: "id",
    },
    {
      title: "배송 유형",
      render: (data) => <div>{data.BoxImages[0].KeepBox.type}</div>,
    },
    {
      title: "반환 요청자",
      render: (data) => <div>{data.BoxImages[0].KeepBox.name}</div>,
    },
    {
      title: "반환 요청한 상품 수",
      render: (data) => (
        <div>
          {data.BoxImages[0].imagePath === "-"
            ? "전체"
            : numberWithCommas(data.BoxImages.length)}
        </div>
      ),
    },
    {
      title: "연락처",
      render: (data) => <div>{data.BoxImages[0].KeepBox.mobile}</div>,
    },
    {
      title: "신청일",
      render: (data) => <div>{data.createdAt.slice(0, 10)}</div>,
    },
    {
      title: "상세정보",
      render: (data) => (
        <Button onClick={() => moveLinkHandler(`/admin/returnBox/${data.id}`)}>
          확인
        </Button>
      ),
    },

    {
      title: "송장번호 등록",
      render: (data) => (
        <Button type="primary" onClick={() => updateModalToggle(data)}>
          등록
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["반환 요청 관리", "반환 관리"]}
        title={`반환`}
        subTitle={`사용저가 요청한 반환 박스를 확인하고 관리할 수 있습니다.`}
      />

      <AdminContent>
        {/* <SearchForm layout="inline">
          <SearchFormItem label="사용자명" name="selectUserId">
            <Select size="small" style={{ width: "200px" }}>
              <Select.Option value="1">dasdasdasdd</Select.Option>
            </Select>
          </SearchFormItem>

          <SearchFormItem>
            <Button size="small" type="primary" htmlType="submit">
              검색
            </Button>
          </SearchFormItem>
        </SearchForm> */}

        <Wrapper margin="0px 0px 20px 0px" dr="row" ju="flex-end">
          {csvData && (
            <DownloadBtn
              filename={`배송 정보`}
              headers={headers}
              data={csvData}
            >
              배송 정보 출력
            </DownloadBtn>
          )}
          <ModalBtn type="dashed" size="small">
            전체조회
          </ModalBtn>
          <ModalBtn type="primary" size="small">
            미처리 조회
          </ModalBtn>
          <ModalBtn type="primary" size="small">
            처리 조회
          </ModalBtn>
        </Wrapper>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={returnBoxs ? returnBoxs : []}
          size="small"
        />
      </AdminContent>

      <Modal
        visible={createModal}
        width="600px"
        footer={null}
        onCancel={() => createModalToggle()}
        title="새로운 상품유형 추가"
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          form={createForm}
          onFinish={createSubmitHandler}
        >
          <Form.Item
            label="유형명"
            name="value"
            rules={[{ required: true, message: "유형은 필수값 입니다." }]}
          >
            <Input />
          </Form.Item>

          <Wrapper dr="row" ju="flex-end">
            <Button size="small" type="primary" htmlType="submit">
              추가하기
            </Button>
          </Wrapper>
        </Form>
      </Modal>

      <Modal
        visible={updateModal}
        width={`600px`}
        title={`송장번호 입력 관리`}
        size="small"
        onCancel={() => updateModalToggle(null)}
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
        visible={modal}
        width="900px"
        onCancel={guideModalToggle}
        title="주의사항"
        footer={false}
      >
        <GuideUl>
          <GuideLi>호스트가 틈새를 만들 수 있는 유형 목록 입니다.</GuideLi>
          <GuideLi isImpo={true}>
            삭제 시 같은 유형으로 이미 등록된 상품이 홈페이지 내에서 보이지
            않으니 주의하셔야 합니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            삭제 시 데이터 복구가 불가능하니 신중한 처리가 필요합니다.
          </GuideLi>
        </GuideUl>
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

    context.store.dispatch({
      type: USERLIST_REQUEST,
      data: {
        listType: 1,
        name: "",
        email: "",
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Index);
