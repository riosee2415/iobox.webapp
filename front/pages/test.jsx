import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST, LOGIN_REQUEST } from "../reducers/user";
import useInput from "../hooks/useInput";
import ClientLayout from "../components/ClientLayout";

import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";

import {
  Image,
  WholeWrapper,
  RsWrapper,
  Wrapper,
  Text,
} from "../components/commonComponents";
import useWidth from "../hooks/useWidth";
import Theme from "../components/Theme";
import { useRouter } from "next/dist/client/router";
import { KEEPBOX_LIST_REQUEST } from "../reducers/keepBox";
import { useCountUp, CountUp } from "use-count-up";
import styled from "styled-components";
const FirstWrapper = styled(Wrapper)`
  width: 100%;
  height: 100vh;
`;

const FirstDisplay = styled(Wrapper)`
  * {
    margin: 0;
    padding: 0;
    -webkit-backface-visibility: hidden;
  }

  /*HEADER*/
  .header {
    height: 25px;
    background: #222;
    color: #eee;
    text-align: center;
    font: 10px/25px Helvetica, Verdana, sans-serif;
  }

  .header a {
    color: #999;
  }

  /*WRAPPER*/
  .wrapper {
    position: relative;
    overflow: hidden;
    margin: 20px auto;
    width: 370px;
  }

  .menu a {
    margin-right: -4px;
    padding: 10px 30px;
    width: 50px;
    color: #333;
    text-decoration: none;
    font: 15px/25px Helvetica, Arial, sans-serif;
  }

  .menu a:hover {
    background: #eee;
  }

  /*INNER CIRCLE*/
  .wrapper:before {
    content: "DS";
    text-align: center;
    font: 70px/135px Georgia, Times, serif;
    color: #efefef;
    position: absolute;
    top: 140px;
    left: 110px;
    z-index: 10;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    background: #fff;

    -webkit-box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
  }

  /*MAIN CIRCLE*/
  .circle {
    position: relative;
    margin-top: 30px;
    margin-bottom: 20px;
    margin-left: 25px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: #093b62;
    /* rotate */
    -webkit-transform: ${(props) => `rotate(${props.rotate}deg)`};
    -moz-transform: ${(props) => `rotate(${props.rotate}deg)`};
    -ms-transform: ${(props) => `rotate(${props.rotate}deg)`};
    -o-transform: ${(props) => `rotate(${props.rotate}deg)`};
    transform: ${(props) => `rotate(${props.rotate}deg)`};

    box-shadow: inset 0px 0px 30px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0px 0px 30px rgba(0, 0, 0, 0.3);

    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -ms-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
  }

  /*LITTLE CIRCLES*/
  .circle li {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: white;
    list-style-type: none;
    text-align: center;
    font: 20px/50px Helvetica, Arial, sans-serif;
    top: 0;
    left: 0;
  }

  .circle li:nth-child(1) {
    transition: none;
    top: 15px;
    left: 125px;
    -webkit-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -moz-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -ms-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -o-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
  }

  .circle li:nth-child(2) {
    transition: none;
    top: 70px;
    left: 220px;
    -webkit-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -moz-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -ms-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -o-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
  }

  .circle li:nth-child(3) {
    transition: none;
    top: 175px;
    left: 220px;
    -webkit-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -moz-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -ms-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -o-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
  }

  .circle li:nth-child(4) {
    transition: none;
    top: 235px;
    left: 125px;
    -webkit-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -moz-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -ms-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -o-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
  }

  .circle li:nth-child(5) {
    transition: none;
    top: 175px;
    left: 25px;
    -webkit-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -moz-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -ms-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -o-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
  }

  .circle li:nth-child(6) {
    transition: none;
    top: 70px;
    left: 25px;
    -webkit-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -moz-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -ms-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    -o-transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
    transform: ${(props) => `rotate(${props.rotate * -1}deg)`};
  }
  /* 

  .menu > .one:hover ~ .circle {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  .menu > .two:hover ~ .circle {
    -webkit-transform: rotate(-60deg);
    -moz-transform: rotate(-60deg);
    -ms-transform: rotate(-60deg);
    -o-transform: rotate(-60deg);
    transform: rotate(-60deg);
  }

  .menu > .three:hover ~ .circle {
    -webkit-transform: rotate(-120deg);
    -moz-transform: rotate(-120deg);
    -ms-transform: rotate(-120deg);
    -o-transform: rotate(-120deg);
    transform: rotate(-120deg);
  }

  .menu > .four:hover ~ .circle {
    -webkit-transform: rotate(-180deg);
    -moz-transform: rotate(-180deg);
    -ms-transform: rotate(-180deg);
    -o-transform: rotate(-180deg);
    transform: rotate(-180deg);
  } */
`;

const Home = () => {
  const data = {
    1: [
      [6, 5],
      [2, 3, 4],
    ],
    2: [
      [1, 6],
      [3, 4, 5],
    ],
    3: [
      [2, 1],
      [4, 5, 6],
    ],
    4: [
      [3, 2],
      [5, 6, 1],
    ],
    5: [
      [4, 3],
      [6, 1, 2],
    ],
    6: [
      [5, 4],
      [1, 2, 3],
    ],
  };

  ////// HOOKS //////

  const [rotate, setRotate] = useState(0);
  const [currentMenu, setCurrentMenu] = useState(1);

  ////// REDUX //////

  ////// USEEFFECT //////

  ////// TOGGLE ///////

  ///// HANDLER //////

  ////// DATAVIEW //////
  console.log(rotate, rotate - rotate);

  return (
    <FirstDisplay className="wrapper" rotate={rotate}>
      <div className="menu">
        <a href="#" className="one">
          One
        </a>
        <a href="#" className="two">
          Two
        </a>
        <a href="#" className="three">
          Three
        </a>
        <a href="#" className="four">
          Four
        </a>

        {/* {console.log(currentMenu)} */}
        <div className="circle">
          <ul>
            <li
              onClick={() => {
                const firIndex = data[currentMenu][0].indexOf(1);

                if (firIndex !== -1) {
                  setRotate(rotate + 60 * (firIndex + 1));
                } else {
                  console.log(secIndex);
                  const secIndex = data[currentMenu][1].indexOf(1);
                  setRotate(rotate - 60 * (secIndex + 1));
                }

                setCurrentMenu(1);
              }}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/box_dial.png`}
                alt={`icon`}
                width={`70px`}
              />
            </li>
            <li
              onClick={() => {
                const firIndex = data[currentMenu][0].indexOf(2);

                if (firIndex !== -1) {
                  setRotate(rotate + 60 * (firIndex + 1));
                } else {
                  const secIndex = data[currentMenu][1].indexOf(2);

                  setRotate(rotate - 60 * (secIndex + 1));
                }

                setCurrentMenu(2);
              }}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/box_dial.png`}
                alt={`icon`}
                width={`70px`}
              />
            </li>
            <li
              onClick={() => {
                const firIndex = data[currentMenu][0].indexOf(3);
                if (firIndex !== -1) {
                  setRotate(rotate + 60 * (firIndex + 1));
                } else {
                  const secIndex = data[currentMenu][1].indexOf(3);
                  setRotate(rotate - 60 * (secIndex + 1));
                }

                setCurrentMenu(3);
              }}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/box_dial.png`}
                alt={`icon`}
                width={`70px`}
              />
            </li>
            <li
              onClick={() => {
                const firIndex = data[currentMenu][0].indexOf(4);
                if (firIndex !== -1) {
                  setRotate(rotate + 60 * (firIndex + 1));
                } else {
                  const secIndex = data[currentMenu][1].indexOf(4);
                  setRotate(rotate - 60 * (secIndex + 1));
                }

                setCurrentMenu(4);
              }}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/box_dial.png`}
                alt={`icon`}
                width={`70px`}
              />
            </li>
            {/* 
            1 => 5, 6 
            2 => 6
            5 => 1 
            6 => 1, 2 
            */}
            <li
              onClick={() => {
                const firIndex = data[currentMenu][0].indexOf(5);
                if (firIndex !== -1) {
                  setRotate(rotate + 60 * (firIndex + 1));
                } else {
                  const secIndex = data[currentMenu][1].indexOf(5);
                  setRotate(rotate - 60 * (secIndex + 1));
                }

                setCurrentMenu(5);
              }}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/box_dial.png`}
                alt={`icon`}
                width={`70px`}
              />
            </li>
            <li
              onClick={() => {
                const firIndex = data[currentMenu][0].indexOf(6);
                if (firIndex !== -1) {
                  setRotate(rotate + 60 * (firIndex + 1));
                } else {
                  const secIndex = data[currentMenu][1].indexOf(6);
                  setRotate(rotate - 60 * (secIndex + 1));
                }

                setCurrentMenu(6);
              }}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/box_dial.png`}
                alt={`icon`}
                width={`70px`}
              />
            </li>
          </ul>
        </div>
      </div>
    </FirstDisplay>
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
export default Home;
