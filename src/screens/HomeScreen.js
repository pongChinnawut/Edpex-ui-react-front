import React from "react";
import { Route, Link } from "react-router-dom";
// import { Button, Form } from "react-bootstrap";
import { TextField, Container, Grid } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import { useFormik } from "formik";
import { Form, FormGroup, Button } from "react-bootstrap";
import Axios from "axios";
import Cookie from "js-cookie";

export default function HomeScreen(props) {
  const [showAlertSuccess, setshowAlertSuccess] = React.useState(false);
  const [showAlertStatusOff, setshowAlertStatusOff] = React.useState(false);
  const [showAlertSystemOff, setshowAlertSystemOff] = React.useState(false);
  const [showAlertInvalidData, setshowAlertInvalidData] = React.useState(false);
  const [messagePassword, setessagePassword] = React.useState("");
  const [messageUsername, setessageUsername] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const userData = Cookie.getJSON("userData");

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: "#e0e0e0",
        main: "#bdbdbd",
        dark: "#9e9e9e",
        contrastText: "#000",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });

  // PART  formik
  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "กรุณาใส่ชื่อผู้ใช้งาน";
    }
    if (!values.password) {
      errors.password = "กรุณาใส่รหัสผ่าน";
    }
    return errors;
  };

  // ***กรณีที่ login แล้วแต่จะกลับมา หน้า login อีกจะไม่ได้
  React.useEffect(() => {
    if (userData) {
      // Test ไป user ดูอีกทีว่าจะให้ไปไหน ปกเขียน
      // props.history.push("/adminscreen");
      const arr = [];
      userData.userInfo.roles.forEach((cur, index) => {
        arr.push(cur.id);
      });
      if (arr.includes(1)) {
        setTimeout(() => {
          props.history.push("/adminscreen");
        }, 1000);
      } else if (arr.includes(2)) {
        setTimeout(() => {
          props.history.push("/processuser");
        }, 1000);
      }
      console.log("cookie");
      console.log(userData);
    }
    return () => {};
  }, []);

  // const changePage = () => {
  //   props.history.push("/adminscreen");
  // }

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit(values) {
      setshowAlertInvalidData(false);
      setshowAlertStatusOff(false);
      setshowAlertSuccess(false);
      setshowAlertSystemOff(false);
      console.log(values);
      checkLogin(values.username, values.password);
    },
  });

  const checkLogin = (username, password) => {
    setUsername(username);
    setUsername(password);
    Axios.post("http://localhost:8080/token/generate-token", {
      username,
      password,
    }).then(
      (res) => {
        Cookie.set("userData", JSON.stringify(res.data));
        console.log(res.data);
        console.log("Login Pass");
        console.log(res.data.userInfo.roles);
        const arr = [];
        res.data.userInfo.roles.forEach((cur, index) => {
          arr.push(cur.id);
        });
        console.log(arr);
        // Admin Login
        if (arr.includes(1)) {
          setshowAlertSuccess(true);
          setTimeout(() => {
            props.history.push("/adminscreen");
          }, 1000);
        } else if (arr.includes(2)) {
          setshowAlertSuccess(true);
          setTimeout(() => {
            props.history.push("/processuser");
          }, 1000);
        }
        // else if (arr.includes(3)) {
        //   setshowAlertSuccess(true);
        //   setTimeout(() => {
        //     props.history.push("/exxcutive");
        //   }, 1000);
        // }
        // window.location.reload();
        return res.data;
      },
      (error) => {
        if (error.response.status != 200) {
          // console.log("Not pass Test");
          console.log(error.response.data.message);
          if (error.response.data.message != "") {
            setshowAlertStatusOff(true);
          } else {
            setshowAlertInvalidData(true);
          }
        } else {
          setshowAlertSystemOff(true);
        }
      }
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="container-fluid full-width-row">
        <div className="row no-gutters background-img">
          <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8  left-container">
            <section className="left-section">
              <div className="news">
                <InsertCommentOutlinedIcon
                  style={{
                    fontSize: 40,
                    color: "#000",
                    marginTop: 15,
                    marginLeft: 15,
                  }}
                />
                <span className="news-head">ข่าวสารประชาสัมพันธ์</span>
              </div>
            </section>
          </div>
          <div className=" col-sm-12 col-md-12 col-lg-4 col-xl-4 right-container">
            <section className="right-section">
              <img
                className="image-logo"
                src="logo-thai-ku.png"
                alt="logo-university"
              />
              {showAlertInvalidData ? (
                <div class="alert alert-success alert-login" role="alert">
                  **กรุณากรอกข้อมูลให้ถูกต้อง**
                </div>
              ) : showAlertStatusOff ? (
                <div class="alert alert-success alert-login" role="alert">
                  **รหัสผู้ใช้งานถูกปิด**
                </div>
              ) : showAlertSuccess ? (
                <div class="alert alert-success alert-login" role="alert">
                  เข้าสู่ระบบสำเร็จ
                </div>
              ) : showAlertSystemOff ? (
                <div class="alert alert-success alert-login" role="alert">
                  ระบบยังไม่เปิดให้กรอกข้อมูล
                </div>
              ) : (
                <div></div>
              )}

              <Form onSubmit={handleSubmit}>
                <div className="username-field">
                  <PersonOutlineOutlinedIcon
                    style={{
                      fontSize: 25,

                      marginRight: 7,
                      color: "#006765",
                    }}
                  />
                  <Form.Group controlId="validationFormik103">
                    {/* <Form.Label>FirstName</Form.Label> */}
                    <Form.Control
                      type="text"
                      placeholder="ชื่อผู้ใช้งาน"
                      className="form-control"
                      name="username"
                      onChange={handleChange}
                      values={values.username}
                      isInvalid={errors.username}
                      style={{
                        backgroundColor: "#e4e6e5",
                        fontSize: 15,
                        fontFamily: "kanit",
                        fontWeight: 100,
                      }}
                    />

                    <span style={{ fontFamily: "kanit" }}>
                      {errors.username}
                    </span>
                  </Form.Group>
                  {/* <PersonOutlineOutlinedIcon
                    style={{
                      fontSize: 26,
                      marginTop: 20,
                      marginRight: 7,
                      color: "#006765",
                    }}
                  />
                  <Form.Group>
                    <TextField
                      required
                      label="กรุณาชื่อผู้ใช้งาน"
                      color="secondary"
                      variant="standard"
                      inputProps={{ style: { fontSize: 16 } }}
                      InputLabelProps={{
                        style: {
                          fontSize: 16,
                          fontFamily: "Kanit",
                          fontWeight: 100,
                        },
                      }}
                      fullWidth
                      onChange={(e) => setUsername(e.target.value)}
                    ></TextField>
                  </Form.Group> */}
                </div>
                <div className="password-field">
                  {/* <LockOpenOutlinedIcon
                    style={{
                      fontSize: 26,
                      marginTop: 20,
                      marginRight: 7,
                      color: "#006765",
                    }}
                  />
                  <Form.Group
                  // controlId="validationFormik103"
                  >
                    <TextField
                      required
                      label="กรุณาใส่รหัสผ่าน"
                      type="password"
                      helperText={messagePassword}
                      color="secondary"
                      variant="standard"
                      inputProps={{ style: { fontSize: 16 } }}
                      InputLabelProps={{
                        style: {
                          fontSize: 16,
                          fontFamily: "Kanit",
                          fontWeight: 100,
                        },
                      }}
                      fullWidth
                      onChange={(e) => setPassword(e.target.value)}
                    ></TextField>
                  </Form.Group> */}
                  <LockOpenOutlinedIcon
                    style={{
                      fontSize: 25,

                      marginRight: 7,
                      color: "#006765",
                    }}
                  />
                  <Form.Group controlId="validationFormik103">
                    {/* <Form.Label>FirstName</Form.Label> */}
                    <Form.Control
                      type="password"
                      placeholder="รหัสผ่าน"
                      className="form-control"
                      name="password"
                      onChange={handleChange}
                      values={values.password}
                      isInvalid={errors.password}
                      style={{
                        backgroundColor: "#e4e6e5",
                        fontSize: 15,
                        fontFamily: "kanit",
                        fontWeight: 100,
                      }}
                    />

                    {
                      <span style={{ fontFamily: "kanit" }}>
                        {errors.password}
                      </span>
                    }
                  </Form.Group>
                </div>
                {/* <Link to={"/adminscreen"} style={{ textDecoration: "none" }}> */}
                {/* <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  style={{
                    width: 250,
                    fontFamily: "Kanit",
                    fontSize: 16,
                    fontWeight: 300,
                  }}
                >
                  เข้าสู่ระบบ
                </Button> */}
                <Button
                  type="submit"
                  variant="secondary"
                  className="btn-login"
                  style={{ fontFamily: "Kanit", fontSize: 16, fontWeight: 300 }}
                  // onClick={handleSubmit}
                >
                  เข้าสู่ระบบ
                </Button>
              </Form>
              {/* </Link> */}
              {/* {console.log(username)} */}
            </section>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
