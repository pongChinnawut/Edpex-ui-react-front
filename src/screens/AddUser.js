import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, FormGroup } from "react-bootstrap";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Axios from "axios";
import { Button } from "react-bootstrap";
import TableUser from "./TableUser";
import AdminScreenn from "./AdminScreen";

export default function AddUser(props) {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [agency, setagency] = React.useState("");
  const [roles_fake, setrole] = React.useState([]);
  const [roles, setRolesTrue] = React.useState([]);
  const [alertExistUser, setalertExistUser] = React.useState(false);
  const [alertDataMissing, setalertDataMissing] = React.useState(false);
  const [alertSuccess, setalertSuccess] = React.useState(false);
  const [allAgency, setallAgency] = React.useState([]);
  const [adminSelect, setadminSelect] = React.useState("");
  const [userSelect, setuserSelect] = React.useState("");
  const [exeSelect, setexeSelect] = React.useState("");
  const [errRole, setErrorRole] = React.useState(false);
  const [errAgency, setErrorAgency] = React.useState(false);
  const [role_change, setChangeRole] = React.useState("");

  React.useEffect(() => {
    Axios.get("http://localhost:8080/api/v1/allAgency").then((res) => {
      setallAgency(res.data);
    });
  }, []);

  React.useEffect(() => {
    setadminSelect("");
    setuserSelect("");
    setexeSelect("");
    if (role_change == "ADMIN") {
      setadminSelect("adminSelect");
    } else if (role_change == "USER") {
      setuserSelect("userSelect");
    } else if (role_change == "EXECUTIVE") {
      setexeSelect("exeSelect");
    }
    // if (roles_fake[roles_fake.length - 1] == "1") {
    //   setadminSelect("adminSelect");
    // } else if (roles_fake[roles_fake.length - 1] == "2") {
    //   setuserSelect("userSelect");
    // } else if (roles_fake[roles_fake.length - 1] == "3") {
    //   setexeSelect("exeSelect");
    // }
  }, [role_change]);

  const agencys = [
    "กองบริหารวิชาการกลาง",
    "สำนักบริการกลางวิทยาเขตกำแพงแสน",
    "งานบริการซ่อมบำรุงเครื่องมือวัสดุ",
  ];

  const roless = ["ADMIN", "USER", "EXECUTIVE"];

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
    setRolesTrue([role_change]);
    const errors = {};
    if (!values.name) {
      errors.name = "**กรุณากรอกชื่อ-นามสกุล";
    }
    if (!values.phone) {
      errors.phone = "**กรุณากรอกเบอร์โทรศัพท์";
    }
    if (!values.username) {
      errors.username = "**กรุณากรอกชื่อผู้ใช้งาน";
    }
    if (!values.password) {
      errors.password = "**รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร";
    }
    // if (!values.agency) {
    //   errors.agency = "กรุณากรอกหน่วยงาน";
    // }
    // if (!values.role) {
    //   errors.agency = "กรุณากรอกสิทธิ์";
    // }
    return errors;
  };

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      name: "",
      phone: "",
      username: "",
      password: "",
      // agency: "",
      // role: "",
    },
    validate,
    validationSchema: Yup.object({
      name: Yup.string()
        //   .min(2, "Mininum 2 characters")
        //   .max(15, "Maximum 15 characters")
        .required("Required!"),
      phone: Yup.string()
        //   .email("Invalid email format")

        .required("Required!"),
      username: Yup.string()
        // .min(8, "Minimum 8 characters")
        .required("Required!"),
      password: Yup.string()
        //   .oneOf([Yup.ref("password")], "Password's not match")
        // .min(8, "รหัสผ่านอย่างน้อย 8 ตัวอักษร")
        .required("Required!"),
    }),
    // onSubmit: (values) => {
    //   alert(JSON.stringify(values));
    // },
    onSubmit(values) {
      // setRolesTrue([...roles, role_change]);
      console.log(values);
      setalertDataMissing(false);
      setalertExistUser(false);
      setalertSuccess(false);
      const zero = "0";
      // alert(zero.concat(values.phone.toString()));
      if (agency != "" && role_change != "") {
        checkRegister(
          values.name,
          zero.concat(values.phone.toString()),
          values.username,
          values.password,
          agency,
          roles_fake[roles_fake.length - 1]
        );
      }

      // if (name == "" || phone == "" || username == "" || password == "") {
      //   setalertExistUser(false);
      //   setalertSuccess(false);
      //   setalertDataMissing(true);
      // }
    },
  });

  const checkRegister = (name, phone, username, password, agency, roless) => {
    setName(name);
    setPhone(phone);
    setUsername(username);
    setPassword(password);
    const status = 1;
    let role_true = "";
    if (roless == "1") {
      role_true = "ADMIN";
    } else if (roless == "2") {
      role_true = "USER";
    } else if (roless == "3") {
      role_true = "EXECUTIVE";
    }

    // alert(role_change);
    // alert(roles);

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
        setalertExistUser(false);
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
            setalertSuccess(false);
            setalertExistUser(true);
          }
          console.log(error.response.data.message);
        }
      }
    );
  };

  const checkDataMiss = () => {
    setalertExistUser(false);
    setalertSuccess(false);
    if (agency == "") {
      setErrorAgency(true);
    }
    if (role_change == "") {
      setErrorRole(true);
    }
  };

  // const checkRoleShow = async (roleee) => {
  //   await setrole([...roles_fake, roleee]);
  //   await console.log("บทบาท == " + roles_fake);
  //   await setadminSelect("");
  //   await setuserSelect("");
  //   await setexeSelect("");
  //   if (roles_fake[roles_fake.length - 1] == "0") {
  //     setadminSelect("adminSelect");
  //   } else if (roles_fake[roles_fake.length - 1] == "1") {
  //     setuserSelect("userSelect");
  //   } else if (roles_fake[roles_fake.length - 1] == "2") {
  //     setexeSelect("exeSelect");
  //   }
  // };

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
          <div className="background-adduser">
            <div className="adduser-header">
              {/* <ion-icon name="person-add-sharp" id="icon-adduser"></ion-icon> */}
              <h2 className="adduser-head">เพิ่มข้อมูลผู้ใช้งาน</h2>
            </div>
            {/* {alertDataMissing ? (
              <div className="alert-adduser">
                <ion-icon name="close-circle" id="warning-icon"></ion-icon>
                <div className="in-alert-adduser  dangerr">
                  กรอกข้อมูลไม่ครบ
                </div>
              </div>
            ) : alertExistUser ? (
              <div className="alert-adduser">
                <ion-icon name="close-circle" id="warning-icon"></ion-icon>
                <div className="in-alert-adduser dangerr">
                  ชื่อผู้ใช้นี้มีอยู่แล้ว กรุณาตั้งใหม่
                </div>
              </div>
            ) : alertSuccess ? (
              <div className="alert-adduser">
                <ion-icon name="checkmark-circle" id="success-icon"></ion-icon>
                <div className="in-alert-adduser successs">ลงทะเบียนสำเร็จ</div>
              </div>
            ) : (
              <div></div>
            )} */}

            <Form onSubmit={handleSubmit}>
              {alertDataMissing ? (
                <div className="div-alert">
                  <ion-icon name="close-circle" id="warning-icon"></ion-icon>
                  <div className="filed-input-adduser-alert  dangerr">
                    กรอกข้อมูลไม่ครบ
                  </div>
                </div>
              ) : alertExistUser ? (
                <div className="div-alert">
                  <ion-icon name="close-circle" id="warning-icon"></ion-icon>
                  <div className="filed-input-adduser-alert  dangerr">
                    ชื่อผู้ใช้นี้มีอยู่แล้ว ตั้งชื่อใหม่
                  </div>
                </div>
              ) : alertSuccess ? (
                <div className="div-alert">
                  <ion-icon
                    name="checkmark-circle"
                    id="success-icon"
                  ></ion-icon>
                  <div className="filed-input-adduser-alert  successs">
                    ลงทะเบียนสำเร็จ
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              <div className="name-and-phone">
                <Form.Group controlId="validationFormik103" id="inName">
                  <div className="filed-input-adduser ">
                    <Form.Label className="field-description-input">
                      ชื่อ-นามสกุล
                    </Form.Label>

                    <div className="name">
                      <Form.Control
                        type="text"
                        placeholder="กรุณาใส่ชื่อ-นามสกุล"
                        className={`form-control ${
                          touched.name
                            ? errors.name
                              ? "is-invalid"
                              : "is-valid"
                            : ""
                        }`}
                        name="name"
                        onChange={handleChange}
                        value={values.name}
                        // isInvalid={errors.name}
                        id="input-field-adduser"
                        // style={{
                        //   backgroundColor: "#E4E6E5",
                        //   fontSize: 16,
                        //   fontFamily: "Prompt",
                        //   fontWeight: 300,
                        //   height: `60px`,
                        //   borderRadius: 15,
                        // }}
                      />
                      {errors.name && touched.name && (
                        <p className="error-helptext">{errors.name}</p>
                      )}
                    </div>

                    {/* <span style={{ fontFamily: "kanit", fontSize: 16 }}>
                  {errors.username}
                  </span> */}
                    {/* </div> */}
                  </div>
                  {/* <span style={{ fontFamily: "kanit" }}>{errors.username}</span> */}
                </Form.Group>
                <Form.Group
                  controlId="validationFormik103"
                  className="formgroup"
                  id="inPhone"
                >
                  <div className="filed-input-adduser ">
                    <Form.Label className="field-description-input">
                      เบอร์โทรศัพท์
                    </Form.Label>
                    <div className="phone">
                      <Form.Control
                        type="number"
                        placeholder="เบอร์โทรศัพท์"
                        className={`form-control ${
                          touched.phone
                            ? errors.phone
                              ? "is-invalid"
                              : "is-valid"
                            : ""
                        }`}
                        name="phone"
                        onChange={handleChange}
                        value={values.phone}
                        // isInvalid={errors.phone}
                        id="input-field-adduser"
                        // style={{
                        //   backgroundColor: "#e4e6e5",
                        //   fontSize: 14,
                        //   fontFamily: "kanit",
                        //   fontWeight: 100,
                        // }}
                      />
                      {errors.phone && touched.phone && (
                        <p className="error-helptext">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                  {/* <span style={{ fontFamily: "kanit" }}>{errors.username}</span> */}
                </Form.Group>
              </div>
              <div className="username-and-password">
                <Form.Group
                  controlId="validationFormik103"
                  className="formgroup"
                  id="inUsername"
                >
                  <div className="filed-input-adduser">
                    <Form.Label className="field-description-input">
                      ชื่อผู้ใช้งาน
                    </Form.Label>
                    <div className="username">
                      <Form.Control
                        type="text"
                        placeholder="ชื่อผู้ใช้งาน"
                        className={`form-control ${
                          touched.username
                            ? errors.username
                              ? "is-invalid"
                              : "is-valid"
                            : ""
                        }`}
                        name="username"
                        onChange={handleChange}
                        value={values.username}
                        // isInvalid={errors.username}
                        id="input-field-adduser"
                        // style={{
                        //   backgroundColor: "#e4e6e5",
                        //   fontSize: 14,
                        //   fontFamily: "kanit",
                        //   fontWeight: 100,
                        // }}
                      />
                      {errors.username && touched.username && (
                        <p className="error-helptext">{errors.username}</p>
                      )}
                    </div>
                  </div>
                  {/* <span style={{ fontFamily: "kanit" }}>{errors.username}</span> */}
                </Form.Group>
                <Form.Group
                  controlId="validationFormik103"
                  className="formgroup"
                  id="inPassword"
                >
                  <div className="filed-input-adduser">
                    <Form.Label className="field-description-input">
                      รหัสผ่าน
                    </Form.Label>
                    <div className="password">
                      <Form.Control
                        type="text"
                        placeholder="รหัสผ่าน"
                        className={`form-control ${
                          touched.password
                            ? errors.password
                              ? "is-invalid"
                              : "is-valid"
                            : ""
                        }`}
                        id="email"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                        // isInvalid={errors.password}
                        id="input-field-adduser"
                        // style={{
                        //   backgroundColor: "#e4e6e5",
                        //   fontSize: 14,
                        //   fontFamily: "kanit",
                        //   fontWeight: 100,
                        // }}
                      />
                      {errors.password && touched.password && (
                        <p className="error-helptext">{errors.password}</p>
                      )}
                    </div>
                  </div>
                  {/* <span style={{ fontFamily: "kanit" }}>{errors.username}</span> */}
                </Form.Group>
              </div>
              {/* <Form.Group controlId="validationFormik103" className="formgroup"> */}
              <div className="role-and-role">
                <div className="filed-input-adduser" id="rolee">
                  <Form.Label className="field-description-input">
                    สิทธิ์การใช้งาน
                  </Form.Label>
                  <div className="role">
                    <select
                      id="Location"
                      className="custom-select "
                      // onChange={handleChange}
                      onChange={(e) => {
                        // setrole([]);
                        setChangeRole(roless[e.target.value * 1]);
                        setErrorRole(false);
                        // checkSelect_agen_role();
                        // setrole([...roles_fake, roless[e.target.value * 1]]);
                        // checkRoleShow(e.target.value);
                        // checkRoleShow(e.target.value);
                      }}
                      id="input-field-adduser"
                      // style={{
                      //   backgroundColor: "#e4e6e5",
                      //   fontSize: 14,
                      //   fontFamily: "kanit",
                      //   fontWeight: 100,
                      // }}
                    >
                      <option value="" selected disabled hidden>
                        กรุณาระบุสิทธิ์การใช้งาน*
                      </option>
                      {roles_fake &&
                        roless.map((role, index) => (
                          <option key={index} value={index}>
                            {role}
                          </option>
                        ))}
                    </select>
                    {errRole && (
                      <p className="error-helptext">
                        {"**กรุณาใส่สิทธิ์การใช้งาน"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="role-option">
                  <div className="role-option-in">
                    <div className={`label-in-role ${adminSelect}`}>ADMIN</div>
                    <div className={`label-in-role ${userSelect}`}>USER</div>
                    <div className={`label-in-role ${exeSelect}`}>
                      EXECUTIVE
                    </div>
                  </div>
                </div>
              </div>
              {/* </Form.Group> */}
              <div className="filed-input-adduser">
                <Form.Label className="field-description-input">
                  ชื่อหน่วยงาน
                </Form.Label>
                <div className="agency">
                  <select
                    // id="Location"
                    className="custom-select "
                    // onChange={handleChange}
                    onChange={(e) => {
                      setagency(e.target.value);
                      setErrorAgency(false);
                    }}
                    id="input-field-adduser"
                    // style={{
                    //   backgroundColor: "#e4e6e5",
                    //   fontSize: 14,
                    //   fontFamily: "kanit",
                    //   fontWeight: 100,
                    // }}
                  >
                    <option value="" selected disabled hidden>
                      กรุณาระบุหน่วยงาน
                    </option>
                    {allAgency &&
                      allAgency.map((agency, index) => (
                        <option key={index} value={index}>
                          {agency.name}
                        </option>
                      ))}
                  </select>
                  {errAgency && (
                    <p className="error-helptext">{"**กรุณาระบุหน่วยงาน"}</p>
                  )}
                </div>
              </div>
              {/* </Form.Group> */}
              {/* <Form.Group controlId="validationFormik103" className="formgroup"> */}

              <div className="row no-gutters ">
                <div
                  className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  style={{ textAlign: "center" }}
                >
                  <Button
                    type="submit"
                    // data-toggle="modal"
                    // data-target="#modalYT"
                    // variant="secondary"
                    onClick={checkDataMiss}
                    id="btnSuccess"
                    // class="btn btn-success"
                    // style={{
                    //   fontFamily: "Kanit",
                    //   fontSize: 16,
                    //   fontWeight: 300,
                    //   width: `100%`,
                    //   marginTop: `2%`,
                    //   marginBottom: `2%`,
                    // }}
                  >
                    ยืนยันข้อมูล
                  </Button>
                  {/* <button data-toggle="modal" data-target="#exampleModalCenter">
                    OK
                  </button> */}
                </div>
              </div>
            </Form>
          </div>
          {/* <TableUser />
          <TableUser /> */}
        </div>

        <div
          className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2"
          style={{ backgroundColor: "#e4e6e5" }}
        ></div>
      </div>
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                กรุณาใส่ค่าใหม่
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-dismiss="modal"
                data-target="#exampleModalCenterSubmit"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
