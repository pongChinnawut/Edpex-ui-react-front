import React from "react";
import { Link } from "react-router-dom";
import {
  Form,
  FormGroup,
  Navbar,
  Nav,
  NavDropdown,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import UserTable from "./TableUser";
import { useHistory } from "react-router-dom";
import Cookie from "js-cookie";
import { AnimateOnChange, HideUntilLoaded } from "react-animation";
import {
  bounce,
  slideInRight,
  slideInLeft,
  fadeInLeft,
  fadeInRight,
  fadeOutLeft,
  fadeOutRight,
  fadeOutRightBig,
  flipInX,
} from "react-animations";
import styled, { keyframes } from "styled-components";

export default function UserScreen(props) {
  const [modal14, setmodal14] = React.useState(false);
  const [roleStatus, setroleStatus] = React.useState();
  const [name, setname] = React.useState();
  const userData = Cookie.getJSON("userData");
  const [current, setCurrent] = React.useState(0);

  let history = useHistory();

  React.useEffect(() => {
    setname(userData.userInfo.name);
    const arr = [];
    userData.userInfo.roles.forEach((cur, index) => {
      arr.push(cur.id);
    });
    if (arr.includes(1)) {
      setroleStatus("admin");
    }
    if (arr.includes(2)) {
      setroleStatus("user");
    }
    //ขาด executive
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (current === words.length - 1) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  });

  const FadeInLeft = styled.div`
    animation: 5s ${keyframes`${fadeInLeft}`} infinite;
  `;
  const Flip = styled.div`
    animation: 3s ${keyframes`${flipInX}`} infinite;
  `;

  const words = ["ยินดีต้อนรับ", "คุณสุนทรีย์"];

  const goAdminPage = (e) => {
    const arr = [];
    userData.userInfo.roles.forEach((cur, index) => {
      arr.push(cur.id);
    });
    if (arr.includes(1)) {
      setTimeout(() => {
        history.push({
          pathname: "/adminscreen",
        });
      });
    }
  };

  const arrProcess = [
    "กระบวนการไฟฟ้า",
    "กระบวนการประปา",
    "กรพบวนการสาธารณูปโภค",
  ];

  const checkLogout = () => {
    Cookie.remove("userData");
    // props.history.push("/");
  };

  const toggle = (nr) => () => {
    let modalNumber = "modal" + nr;
    setmodal14(!modal14);
  };

  // const goAdminPage = () => {
  //   props.history.push("/adminscreen");
  // };

  return (
    <>
      <Navbar
        // class="navbar navbar-expand-lg navbar-dark kkk "
        className="navbar-custom"
        // bg="dark"
        sticky="top"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex" }} onClick={goAdminPage}>
          <Flip>
            <img
              src="/images/ku44.png"
              width="65"
              height="50"
              className="d-inline-block align-top logo-ku-userpage"
              alt="logo-ku"
              // loading="lazy"
              onClick={goAdminPage}
              // data-toggle="tooltip"
              // data-placement="top"
              // title="Tooltip on left"
            />
          </Flip>
          {/* <h1>
            <AnimateOnChange>{words[current]}</AnimateOnChange>
          </h1> */}
          {roleStatus && roleStatus == "admin" && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                className="backAdmin"
                style={{ display: "flex", alignItems: "center" }}
              >
                {/* <ion-icon name="home" id="home"></ion-icon> */}
                <span
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="กลับหน้าหลักของ Admin"
                  // className="adminword"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    fontFamily: "Prompt",
                    fontSize: `1.4rem`,
                    color: "#E4E6E5",
                    fontWeight: 400,
                    paddingRight: `8px`,
                    paddingLeft: `8px`,
                    // letterSpacing: `1px`,
                  }}
                >
                  หน้าหลัก
                </span>
              </div>
              {/* <ion-icon name="home" id="home"></ion-icon> */}
            </div>
          )}
        </div>
        <div className="head-userpage usernav">
          <strong className="user-welcomee">
            {/* <FadeInLeft>{words[current]}</FadeInLeft> */}
            {/* <AnimateOnChange
              animationOut="bounceOut"
              animationIn="bounceIn"
              durationOut="500"
            >
              {words[current]}
            </AnimateOnChange> */}
            ยินดีต้อนรับคุณ
          </strong>
          <font className="user-welcomee-name">{name}</font>
          <div className="admin-word-nav-user">
            <div
              className="head-nav-user"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span
                className="goadminword-user"
                style={
                  {
                    // display: "flex",
                    // flexDirection: "column",
                    // justifyContent: "center",
                    // fontFamily: "kanit",
                    // fontSize: `2rem`,
                    // color: "#000",
                    // fontWeight: 400,
                  }
                }
              >
                {roleStatus}
              </span>
            </div>
          </div>
        </div>
        {/* <IconButton> */}
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <div className="logout-user" onClick={checkLogout}>
            {/* <p className="p-logout">ออกจากระบบ</p> */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: `6px`,
              }}
            >
              <div
                className="backlogout"
                style={{ display: "flex", alignItems: "center" }}
              >
                <span
                  className="goadminword"
                  style={{
                    color: "rgba(222, 237, 238, 0.998)",
                    // fontWeight: 400,
                  }}
                >
                  ออกจากระบบ
                </span>
              </div>
            </div>
            <div className="logo-logout-navbar">
              <ExitToAppIcon style={{ fontSize: 35, color: "#03a96c" }} />
            </div>
          </div>
        </Link>
        {/* </IconButton> */}
      </Navbar>
      {/* หลัง nav ใน note */}
    </>
  );
}
