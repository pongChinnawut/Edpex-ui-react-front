import React from "react";
import { useFormik } from "formik";
import { Form, FormGroup } from "react-bootstrap";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Axios from "axios";
import TableUser from "./TableUser";
import AdminScreenn from "./AdminScreen";

export default function AddUser(props) {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [agency, setagency] = React.useState("");
  const [roles, setrole] = React.useState([]);
  const [alertExistUser, setalertExistUser] = React.useState(false);
  const [alertDataMissing, setalertDataMissing] = React.useState(false);
  const [alertSuccess, setalertSuccess] = React.useState(false);
  const [allAgency, setallAgency] = React.useState([]);

  React.useEffect(() => {
    Axios.get("http://localhost:8080/api/v1/allAgency").then((res) => {
      setallAgency(res.data);
    });
  }, []);

  const agencys = [
    "กองบริหารวิชาการกลาง",
    "สำนักบริการกลางวิทยาเขตกำแพงแสน",
    "งานบริการซ่อมบำรุงเครื่องมือวัสดุ",
  ];

  const roless = ["ADMIN", "USER", "EXCUTIVE"];

  const checkforblank = () => {
    var location = document.getElementById("Location");
    var invalid = location.value == "Please Select";

    if (invalid) {
      alert("Please enter first name");
      location.className = "error";
    } else {
      location.className = "";
    }

    return !invalid;
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "กรุณากรอกชื่อ-นามสกุล";
    }
    if (!values.phone) {
      errors.phone = "กรุณากรอกเบอร์โทรศัพท์";
    }
    if (!values.username) {
      errors.username = "กรุณากรอกชื่อผู้ใช้งาน";
    }
    if (!values.password) {
      errors.password = "กรุณากรอกรหัสผ่าน";
    }
    // if (!values.agency) {
    //   errors.agency = "กรุณากรอกหน่วยงาน";
    // }
    // if (!values.role) {
    //   errors.agency = "กรุณากรอกสิทธิ์";
    // }
    return errors;
  };

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      name: "",
      phone: "",
      username: "",
      password: "",
      // agency: "",
      // role: "",
    },
    validate,
    onSubmit(values) {
      console.log(values);
      // console.log(roles);
      setalertDataMissing(false);
      setalertExistUser(false);
      setalertSuccess(false);
      if (agency != "" && roles.length != 0) {
        checkRegister(
          values.name,
          values.phone,
          values.username,
          values.password,
          agency,
          roles
        );
      }

      if (name == "" || phone == "" || username == "" || password == "") {
        setalertExistUser(false);
        setalertSuccess(false);
        setalertDataMissing(true);
      }
    },
  });

  const checkRegister = (name, phone, username, password, agency, roles) => {
    setName(name);
    setPhone(phone);
    setUsername(username);
    setPassword(password);
    const status = 1;
    if (roles[0] == "0") {
      roles[0] = "ADMIN";
    } else if (roles[0] == "1") {
      roles[0] = "USER";
    } else if (roles[0] == "2") {
      roles[0] = "EXECUTIVE";
    }
    console.log(
      `State == ${name}  ${phone} ${username} ${password} ${roles} ${agency}`
    );
    // console.log(roles);
    Axios.post("http://localhost:8080/token/register", {
      name,
      agency,
      phone,
      username,
      password,
      roles,
      status,
    }).then(
      (res) => {
        setalertSuccess(true);
        setTimeout(() => {
          window.location.reload(true);
          // props.history.push("/adminscreen");
        }, 1000);
        // alert("pass call api");
        console.log("pass call api");
        console.log(res.data.message);
      },
      (error) => {
        if (error.response.status != 200) {
          // console.log("Not pass Test");
          if (error.response.status == 400) {
            setalertExistUser(true);
          }
          console.log(error.response.data.message);
        }
      }
    );
  };

  const checkDataMiss = () => {
    if (agency == "" || roles.length == 0) {
      setalertDataMissing(true);
      console.log("กรอกข้อมูลไม่ครบ");
    }
  };

  return (
    // <AdminScreen />
    // <div className="container-fluid full-width-row">
    <div className="container-fluid p-0  pageAddUser">
      <div className="row no-gutters">
        <div
          className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2"
          style={{ backgroundColor: "#e4e6e5" }}
        ></div>

        <div
          className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8"
          style={{ backgroundColor: "#e4e6e5" }}
        >
          <div className="adduser-header">
            <ion-icon
              name="person-add-sharp"
              className="icon-adduser"
            ></ion-icon>
            <h2 className="adduser-head">เพิ่มข้อมูลผู้ใช้งาน</h2>
          </div>
          {alertDataMissing ? (
            <div className="alert-adduser alert-username-exist ">
              <div className="in-alert-adduser alert alert-danger">
                กรอกข้อมูลไม่ครบ
              </div>
            </div>
          ) : alertExistUser ? (
            <div className="alert-adduser alert-username-exist ">
              <div className="in-alert-adduser alert alert-danger">
                ชื่อผู้ใช้นี้มีอยู่แล้ว กรุณาตั้งใหม่
              </div>
            </div>
          ) : alertSuccess ? (
            <div className="alert-adduser alert-username-exist ">
              <div className="in-alert-adduser alert alert-danger">
                ลงทะเบียนสำเร็จ
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {/* <div className="alert-adduser alert-username-exist ">
            <div className="in-alert-adduser alert alert-danger">
              ชื่อผู้ใช้นี้มีอยู่แล้ว กรุณาตั้งใหม่
            </div>
          </div> */}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="validationFormik103">
              <div className="filed-input-adduser">
                <Form.Label className="field-description-input">
                  ชื่อ-นามสกุล
                </Form.Label>
                {/* <div style={{display: "flex", flexDirection: "column"}}> */}

                <div className="name">
                  <Form.Control
                    type="text"
                    placeholder="ชื่อ-นามสกุล"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    values={values.name}
                    isInvalid={errors.name}
                    style={{
                      backgroundColor: "#e4e6e5",
                      fontSize: 14,
                      fontFamily: "kanit",
                      fontWeight: 100,
                    }}
                  />
                </div>

                {/* <span style={{ fontFamily: "kanit", fontSize: 16 }}>
                  {errors.username}
                </span> */}
                {/* </div> */}
              </div>
              {/* <span style={{ fontFamily: "kanit" }}>{errors.username}</span> */}
            </Form.Group>
            <Form.Group controlId="validationFormik103" className="formgroup">
              <div className="filed-input-adduser">
                <Form.Label className="field-description-input">
                  เบอร์โทรศัพท์
                </Form.Label>
                <div className="phone">
                  <Form.Control
                    type="number"
                    placeholder="เบอร์โทรศัพท์"
                    className="form-control"
                    name="phone"
                    onChange={handleChange}
                    values={values.phone}
                    isInvalid={errors.phone}
                    style={{
                      backgroundColor: "#e4e6e5",
                      fontSize: 14,
                      fontFamily: "kanit",
                      fontWeight: 100,
                    }}
                  />
                </div>
              </div>
              {/* <span style={{ fontFamily: "kanit" }}>{errors.username}</span> */}
            </Form.Group>
            <Form.Group controlId="validationFormik103" className="formgroup">
              <div className="filed-input-adduser">
                <Form.Label className="field-description-input">
                  ชื่อผู้ใช้งาน
                </Form.Label>
                <div className="username">
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
                      fontSize: 14,
                      fontFamily: "kanit",
                      fontWeight: 100,
                    }}
                  />
                </div>
              </div>
              {/* <span style={{ fontFamily: "kanit" }}>{errors.username}</span> */}
            </Form.Group>
            <Form.Group controlId="validationFormik103" className="formgroup">
              <div className="filed-input-adduser">
                <Form.Label className="field-description-input">
                  รหัสผ่าน
                </Form.Label>
                <div className="password">
                  <Form.Control
                    type="text"
                    placeholder="รหัสผ่าน"
                    className="form-control"
                    name="password"
                    onChange={handleChange}
                    values={values.password}
                    isInvalid={errors.password}
                    style={{
                      backgroundColor: "#e4e6e5",
                      fontSize: 14,
                      fontFamily: "kanit",
                      fontWeight: 100,
                    }}
                  />
                </div>
              </div>
              {/* <span style={{ fontFamily: "kanit" }}>{errors.username}</span> */}
            </Form.Group>
            {/* <Form.Group controlId="validationFormik103" className="formgroup"> */}
            <div className="filed-input-adduser">
              <Form.Label className="field-description-input">
                ชื่อหน่วยงาน
              </Form.Label>
              <div className="agency">
                <select
                  id="Location"
                  className="custom-select "
                  // onChange={handleChange}
                  onChange={(e) => {
                    setagency(e.target.value);
                  }}
                  style={{
                    backgroundColor: "#e4e6e5",
                    fontSize: 14,
                    fontFamily: "kanit",
                    fontWeight: 100,
                  }}
                >
                  <option value="" selected disabled hidden>
                    กรุณาระบุหน่วยงาน*
                  </option>
                  {allAgency &&
                    allAgency.map((agency, index) => (
                      <option key={index} value={index}>
                        {agency.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            {/* </Form.Group> */}
            {/* <Form.Group controlId="validationFormik103" className="formgroup"> */}
            <div className="filed-input-adduser">
              <Form.Label className="field-description-input">
                สิทธิ์การใช้งาน
              </Form.Label>
              <div className="role">
                <select
                  id="Location"
                  className="custom-select "
                  // onChange={handleChange}
                  onChange={(e) => {
                    setrole([...roles, e.target.value]);
                  }}
                  style={{
                    backgroundColor: "#e4e6e5",
                    fontSize: 14,
                    fontFamily: "kanit",
                    fontWeight: 100,
                  }}
                >
                  <option value="" selected disabled hidden>
                    กรุณาระบุสิทธิ์การใช้งาน*
                  </option>
                  {roles &&
                    roless.map((role, index) => (
                      <option key={index} value={index}>
                        {role}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            {/* </Form.Group> */}

            <div className="row no-gutters ">
              <div
                className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                style={{ textAlign: "center" }}
              >
                <button
                  type="submit"
                  // data-toggle="modal"
                  // data-target="#modalYT"
                  variant="secondary"
                  onClick={checkDataMiss}
                  class="btn btn-success"
                  style={{
                    fontFamily: "Kanit",
                    fontSize: 16,
                    fontWeight: 300,
                    width: `50%`,
                    marginTop: `2%`,
                    marginBottom: `2%`,
                  }}
                >
                  ยืนยันข้อมูล
                </button>
              </div>
            </div>
          </Form>
          {/* <TableUser />
          <TableUser /> */}
        </div>

        <div
          className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2"
          style={{ backgroundColor: "#e4e6e5" }}
        ></div>
      </div>
    </div>
  );
}
