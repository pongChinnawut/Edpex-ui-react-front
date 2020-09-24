import React from "react";
import { Form, FormGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "@sweetalert/with-react";
import SweetAlert from "react-bootstrap-sweetalert";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";
import {
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBIcon,
  MDBBadge,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdbreact";
import Axios from "axios";

export default function SwalEditModal(props) {
  const [modal, setmodal] = React.useState(false);
  const [showModalEdit, setShowModalEdit] = React.useState(true);
  const [id, setID] = React.useState(props.id);
  const [agency, setagency] = React.useState({ id: props.agency.id });
  const [agencys_option, setagencys_option] = React.useState([]);
  const [role, setrole] = React.useState(props.role);
  const [iconCorrect, seticonCorrect] = React.useState(false);
  const [errAgency, setErrorAgency] = React.useState(false);
  const [oldPassword, setOldPassword] = React.useState(props.password);
  const [newPassword, setNewPassword] = React.useState("");
  const [changePassword, setchangePassword] = React.useState("");
  const [clickSubmit_password, setclickSubmit_password] = React.useState(false);
  const [confirmSubmit, setconfirmSubmit] = React.useState(false);
  //   const [xxxx, setXXXX] = React.useState("");
  // const [statusCheck, setStatusCheck] = React.useState(
  //   props.status == 1 ? true : false
  // );
  const [status, setstatus] = React.useState(props.status);

  React.useEffect(() => {
    Axios.get("http://localhost:8080/api/v1/allAgency").then((res) => {
      setagencys_option(res.data);
    });
  }, []);

  // const agencys = [
  //   "กองบริหารวิชาการกลาง",
  //   "สำนักบริการกลางวิทยาเขตกำแพงแสน",
  //   "งานบริการซ่อมบำรุงเครื่องมือวัสดุ",
  // ];

  React.useEffect(() => {
    checkSubmitchange();
  }, [newPassword]);

  const roless = ["ADMIN", "USER", "EXCUTIVE"];

  const closeModal = () => {
    // console.log(showModalEdit);
    // props.location.push("/adminscreen");
    setShowModalEdit(false);
    window.location.reload(true);
  };

  const toggleModal = () => {
    setmodal(showModalEdit);
  };

  const validate = (values) => {
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

    return errors;
  };

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      name: props.name,
      phone: props.phone,
      username: props.username,
      // password: props.password,
    },
    validate,
    validationSchema: Yup.object({
      name: Yup.string().required("Required!"),
      phone: Yup.string().required("Required!"),
      username: Yup.string().required("Required!"),
      // password: Yup.string().required("Required!"),
    }),
    onSubmit(values) {
      if (agency.id != "") {
        const zero = "0";
        console.log(values);
        callSetPattern(
          values.name,
          zero.concat(values.phone.toString()),
          values.username
          // values.password
        );
      }
    },
  });

  const checkDataMiss = () => {
    // setalertExistUser(false);
    // setalertSuccess(false);
    if (agency.id == "") {
      setErrorAgency(true);
    }
  };

  const callSetPattern = async (name, phone, username) => {
    console.log("callPattern");
    console.log("status in patter =  " + status);

    callEditApi(name, phone, username);
  };

  const checkSubmitchange = () => {
    // setNewPassword(e);
    if (newPassword != "") {
      setclickSubmit_password(true);
    } else {
      setNewPassword("");
      setOldPassword(props.password);
      setclickSubmit_password(false);
      setconfirmSubmit(false);
    }
  };
  //   React.useEffect(() => {
  //     showModall();
  //   }, [xxxx]);

  const callEditApi = (name, phone, username) => {
    let password = oldPassword;
    if (confirmSubmit && newPassword != "") {
      password = newPassword;
    }
    console.log("callAPi");
    // console.log(statusCheck);
    console.log(status);
    // console.log("status api = " + status + typeof status);
    Axios.put(`http://localhost:8080/api/v1/user/editUserDetail?userId=${id}`, {
      name,
      phone,
      username,
      password,
      agency,
      status,
    }).then(
      (res) => {
        seticonCorrect(true);
        console.log(res.data.message);
        setTimeout(() => {
          window.location.reload(true);
        }, 2000);
      },
      (error) => {
        console.log(error.response.data.message);
      }
    );
  };

  const formatInput = (e) => {
    let count = 0;
    // Prevent characters that are not numbers ("e", ".", "+" & "-") ✨
    let checkIfNum;
    if (e.key !== undefined) {
      // Check if it's a "e", ".", "+" or "-"
      checkIfNum = e.key === "e" || e.key === "+" || e.key === "-";
    }

    return checkIfNum && e.preventDefault();
  };

  return (
    <SweetAlert
      // title={"Uses render props"}
      showConfirm={false}
      //   id="xvxv"
      style={{
        width: `60em`,
        backgroundColor: "#E4E6E5",
        borderRadius: `7px`,
      }}
    >
      <div className="adduser-header-edit-modal-swal">
        <div className="head-modal-and-icon-swal">
          {iconCorrect && (
            <ion-icon name="checkmark-outline" id="correct-modal"></ion-icon>
          )}
          <span className="adduser-head-swal-edit">แก้ไขข้อมูล</span>
        </div>
        <div className="adduser-head-role-swal-edit">{`สถานะ ${props.role}`}</div>
      </div>
      <Form
        onSubmit={handleSubmit}
        // style={{
        //   marginBottom: 20,
        //   backgroundColor: `#E4E6E5`,
        // }}
      >
        <Form.Group controlId="validationFormik103">
          {/* <div className="filed-input-adduser-modal"> */}
          <div className="field-and-description-swal-edit">
            <Form.Label className="field-description-swal-edit">
              ชื่อ-นามสกุล
            </Form.Label>
            <div className="name-swal">
              <Form.Control
                type="text"
                // placeholder={props.name}
                className={`form-control ${
                  touched.name ? (errors.name ? "is-invalid" : "is-valid") : ""
                }`}
                name="name"
                onChange={handleChange}
                value={values.name}
                id="formcontrol-swal-edit"
              />
              {/* <p className="error-helptext-swal-edit">
                    กรุณาใส่ชื่อนามสกุล
                  </p> */}
              {errors.name && touched.name && (
                <p className="error-helptext-swal-edit">{errors.name}</p>
              )}
            </div>
          </div>
        </Form.Group>

        <Form.Group controlId="validationFormik103">
          {/* <div className="filed-input-adduser-modal"> */}
          <div className="field-and-description-swal-edit">
            <Form.Label className="field-description-swal-edit">
              เบอร์โทรศัพท์
            </Form.Label>
            <div className="phone-swal">
              <Form.Control
                type="number"
                // onKeyDown={(e) => {
                //   formatInput(e);
                // }}
                onKeyDown={(e) => {
                  (e.keyCode === 69 ||
                    e.keyCode === 106 ||
                    e.keyCode === 107 ||
                    e.keyCode === 109 ||
                    e.keyCode === 189 ||
                    e.keyCode === 190) &&
                    e.preventDefault();
                }}
                // ValidationExpression="^[0-9](\.[0-9]+)?$"
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
                id="formcontrol-swal-edit"
              />
              {/* <p className="error-helptext-swal-edit">
                    กรุณาใส่เบอร์โทรศัพท์
                  </p> */}
              {errors.phone && touched.phone && (
                <p className="error-helptext-swal-edit">{errors.phone}</p>
              )}
            </div>
          </div>
        </Form.Group>

        <Form.Group controlId="validationFormik103">
          {/* <div className="filed-input-adduser-modal"> */}
          <div className="field-and-description-swal-edit">
            <Form.Label className="field-description-swal-edit">
              ชื่อผู้ใช้งาน
            </Form.Label>
            <div className="username-swal">
              <Form.Control
                type="text"
                // placeholder={props.username}
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
                id="formcontrol-swal-edit"
              />
              {/* <p className="error-helptext-swal-edit">
                    กรุณาใส่ชื่อผู้ใช้งาน
                  </p> */}
              {errors.username && touched.username && (
                <p className="error-helptext-swal-edit">{errors.username}</p>
              )}
            </div>
          </div>
        </Form.Group>

        <div className="field-and-description-swal-edit">
          <Form.Label className="field-description-swal-edit">
            รหัสผ่าน
          </Form.Label>
          <div className="username-swal">
            <div id="formcontrol-swal-edit-password">
              <div className="accordion" id="accordionExample ">
                <div class="cardd">
                  <div className="card-headerr" id="headingTwo">
                    <h2 class="mb-0">
                      <button
                        class="btn  btn-block text-left collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                        id="text-changepassword"
                      >
                        {newPassword
                          ? `รหัสผ่านใหม่ คือ ${newPassword}`
                          : "ต้องการตั้งรหัสผ่านใหม่"}
                      </button>
                    </h2>
                  </div>
                  <div
                    id="collapseTwo"
                    class={`collapse ${changePassword}`}
                    aria-labelledby="headingTwo"
                    data-parent="#accordionExample"
                  >
                    <div class="card-body">
                      <div className="password">
                        <Form.Control
                          // type="text"
                          placeholder="กรุณาใส่รหัสผ่านใหม่"
                          value={`${newPassword}`}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                            // checkSubmitchange();
                          }}
                          // value={values.password}
                          // isInvalid={errors.password}
                          id="changePassword"
                        />
                        <div className="btn-changepassword">
                          {clickSubmit_password && (
                            <span
                              className="btn-change-submit"
                              onClick={() => {
                                if (changePassword == "hide") {
                                  setchangePassword("");
                                  setconfirmSubmit(true);
                                } else {
                                  setchangePassword("hide");
                                  setconfirmSubmit(true);
                                }
                              }}
                            >
                              ยืนยัน
                            </span>
                          )}
                          <span
                            onClick={() => {
                              if (changePassword == "hide") {
                                setchangePassword("");
                                setNewPassword("");
                                setconfirmSubmit(false);
                                // if (newPassword != "") {
                                //   setNewPassword(newPassword);
                                // } else {
                                //   setNewPassword("");
                                // }
                              } else {
                                setchangePassword("hide");
                                setNewPassword("");
                                setconfirmSubmit(false);
                                // if (newPassword != "") {
                                //   setNewPassword(newPassword);
                                // } else {
                                //   setNewPassword("");
                                // }
                              }
                            }}
                            className="btn-change-cancle"
                          >
                            ยกเลิก
                          </span>
                        </div>
                        {/* {errors.name && touched.password && (
                                      <p className="error-helptext-modal-edit">
                                        {errors.password}
                                      </p>
                                    )} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </Form.Group> */}

        <div className="field-and-description-swal-edit">
          <Form.Label className="field-description-swal-edit">
            ชื่อหน่วยงาน
          </Form.Label>
          <div className="username-swal">
            <select
              id="Location"
              className="custom-select "
              onChange={(e) => {
                setagency({ id: e.target.value * 1 });
                setErrorAgency(false);
              }}
              id="formcontrol-swal-edit"
            >
              {/* {alert(props.agency.name)} */}
              <option value="" selected disabled hidden>
                {props.agency.name ? props.agency.name : "กรุณาเลือกหน่วยงาน"}
              </option>
              {agencys_option &&
                agencys_option.map((agency, index) => (
                  <option key={index} value={agency.id}>
                    {agency.name}
                  </option>
                ))}
            </select>
            {errAgency && (
              <p className="error-helptext-swal-edit">
                {"**กรุณาระบุหน่วยงาน"}
              </p>
            )}
          </div>
        </div>

        <div className="field-and-description-swal-edit">
          <Form.Label className="field-description-swal-edit extra-status">
            สถานะการใช้งาน
          </Form.Label>
          <div className="status-switch">
            <div className="toggle">
              <input
                // checked={statusCheck}
                checked={status == 1 ? true : false}
                type="checkbox"
                onChange={(e) => {
                  // setStatusCheck(!statusCheck);
                  // setstatus(statusCheck == true ? 1 : 0);
                  setstatus(status == 1 ? 0 : 1);
                }}
              ></input>
              <label for="" className="onbtn labell">
                ON
              </label>
              <label for="" className="ofbtn labell">
                OFF
              </label>
            </div>
          </div>
        </div>
        {/* </Form.Group> */}
        <div className="row no-gutters mix-btn-swal-edit">
          <div
            className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"
            style={{ textAlign: "center" }}
          >
            <button
              type="submit"
              variant="secondary"
              onClick={checkDataMiss}
              className=" btn-lg ssuccess"
              style={{
                fontSize: `1.6rem`,
                fontWeight: 300,
                color: "#fff",
              }}
            >
              ยืนยันข้อมูล
            </button>
          </div>
          <div
            className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"
            style={{ textAlign: "center" }}
          >
            <button
              type="button"
              // data-toggle="modal"
              // data-target="#modalYT"
              onClick={closeModal}
              // onClick={checkDataMiss}
              className="btn-lg ddanger "
              style={{
                // fontFamily: "Prompt",
                fontSize: `1.6rem`,
                fontWeight: 300,
                color: "#fff",
              }}
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </Form>
    </SweetAlert>
  );
}
