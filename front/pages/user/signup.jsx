import React, { useCallback, useEffect, useState } from "react";
import Router from "next/router";
import { Input, Button, Form } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { SIGNUP_REQUEST } from "../../reducers/user";
import ClientLayout from "../../components/ClientLayout";

const SignUp = () => {
  const { st_signUpLoading, st_signUpDone } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const email = useInput(``);
  const nickname = useInput(``);

  const password = useInput(``);

  const [passwordCheck, setPasswordCheck] = useState(``);
  const [passwordError, setPasswordError] = useState(false);

  const checkPasswordChangeHandler = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password.value);
    },
    [password.value]
  );

  const onSubmit = useCallback(() => {
    if (password.value !== passwordCheck) {
      alert("비밀번호 확인!");
      return setPasswordError(true);
    }

    dispatch({
      type: SIGNUP_REQUEST,
      data: {
        email: email.value,
        password: password.value,
        nickname: nickname.value,
      },
    });
  }, [email, nickname, password, passwordCheck]);

  useEffect(() => {
    if (st_signUpDone) {
      alert("회원가입 성공!");
      Router.replace("/");
    }
  }, [st_signUpDone]);

  return (
    <ClientLayout>
      <div>
        <Form onFinish={onSubmit}>
          <div>
            <label>EMAIL</label>
            <Input type="email" required {...email} />
          </div>
          <div>
            <label>NICKNAME</label>
            <Input type="text" required {...nickname} />
          </div>
          <div>
            <label>PASSOWRD</label>
            <Input.Password type="password" required {...password} />
          </div>
          <div>
            <label>RE-PASSWORD</label>
            <Input.Password
              type="password"
              required
              value={passwordCheck}
              onChange={checkPasswordChangeHandler}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
          <div>{passwordError && <p> 비밀번호가 일치하지 않습니다. </p>}</div>

          <Button type="primary" htmlType="submit" loading={st_signUpLoading}>
            가입하기
          </Button>
        </Form>
      </div>
    </ClientLayout>
  );
};

export default SignUp;
