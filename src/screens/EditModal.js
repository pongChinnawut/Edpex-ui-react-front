import React from "react";
import { Form, FormGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
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

export default function EditModal(props) {
  const [modal, setmodal] = React.useState(false);
  const [showModalEdit, setShowModalEdit] = React.useState(true);
  const [id, setID] = React.useState(props.id);
  const [agency, setagency] = React.useState({ id: props.agency.id });
  const [agencys_option, setagencys_option] = React.useState([]);
  const [role, setrole] = React.useState(props.role);
  const [iconCorrect, seticonCorrect] = React.useState(false);
  const [errAgency, setErrorAgency] = React.useState(false);
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

  const roless = ["ADMIN", "USER", "EXCUTIVE"];

  const closeModal = () => {
    setShowModalEdit(false);
    // console.log(showModalEdit);
    // props.location.push("/adminscreen");
    window.location.reload(true);
  };

  const toggleModal = () => {
    setmodal(showModalEdit);
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

    return errors;
  };

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      name: props.name,
      phone: props.phone,
      username: props.username,
      password: props.password,
    },
    validate,
    validationSchema: Yup.object({
      name: Yup.string().required("Required!"),
      phone: Yup.string().required("Required!"),
      username: Yup.string().required("Required!"),
      password: Yup.string().required("Required!"),
    }),
    onSubmit(values) {
      if (agency.id != "") {
        const zero = "0";
        console.log(values);
        callSetPattern(
          values.name,
          zero.concat(values.phone.toString()),
          values.username,
          values.password
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

  const callSetPattern = async (name, phone, username, password) => {
    console.log("callPattern");
    console.log("status in patter =  " + status);

    // if (statusCheck == true) {
    //   await setstatus(1);
    //   await callEditApi(name, phone, username, password);
    // } else if (statusCheck == false) {
    //   await setstatus(0);
    //   await callEditApi(name, phone, username, password);
    // }

    callEditApi(name, phone, username, password);
  };

  const callEditApi = (name, phone, username, password) => {
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

  return (
    <div>
      {/* {console.log("สถานะ" + status)}
      {console.log(agency)}*/}
      {console.log("modal " + showModalEdit)}
      {showModalEdit ? (
        <div
          className="row modal justify-content-center modal-dialog-centered "
          style={{
            backgroundColor: "  rgba(22, 4, 4, 0.616)",
            // width: `100wv`,
            marginLeft: `5%`,
            marginTop: `2%`,
            // height: `100vh`,
            // transition: `0.6s`,
          }}
          // id="signupPage"
        >
          {/* <div className="col-2 col-sm-2 col-md-2 col-lg-2.5 col-xl-2.5"></div> */}
          <div
            className="col-8 col-sm-8 col-md-8 col-lg-5 col-xl-5 edit-page-all"
            style={{
              backgroundColor: `#E4E6E5`,
              borderRadius: `5px`,
              boxShadow: `0px 0px 7px 0px rgba(10, 10, 10, 0.178)`, //ขวา ล่าง
            }}
          >
            <div className="adduser-header-edit-modal">
              <div className="head-modal-and-icon">
                {iconCorrect && (
                  <ion-icon
                    name="checkmark-outline"
                    id="correct-modal"
                  ></ion-icon>
                  // <ion-icon
                  //   name="checkmark-circle"
                  //   id="correct-modal"
                  // ></ion-icon>
                )}
                <span className="adduser-head">แก้ไขข้อมูล</span>
              </div>
              <div className="adduser-head-role">สถานะ ADMIN</div>
            </div>

            <Form
              onSubmit={handleSubmit}
              style={{
                marginBottom: 20,
                backgroundColor: `#E4E6E5`,
              }}
              // className="form-modal-big"
              // id="form-modal-big-id"
            >
              <Form.Group controlId="validationFormik103">
                <div className="filed-input-adduser-modal">
                  <Form.Label className="field-description-input-edit">
                    ชื่อ-นามสกุล
                  </Form.Label>

                  <div className="name">
                    <Form.Control
                      type="text"
                      // placeholder={props.name}
                      className={`form-control ${
                        touched.name
                          ? errors.name
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      name="name"
                      onChange={handleChange}
                      // value={"ชินนวุฒิ"}
                      // values={values.name}
                      value={values.name}
                      // onChange={}
                      // isInvalid={errors.name}
                      id="input-field-adduser-modal"
                      // style={{
                      //   backgroundColor: "#e4e6e5",
                      //   fontSize: 14,
                      //   fontFamily: "kanit",
                      //   fontWeight: 100,
                      // }}
                    />
                    {errors.name && touched.name && (
                      <p className="error-helptext-modal-edit">{errors.name}</p>
                    )}
                  </div>
                </div>
              </Form.Group>
              <Form.Group controlId="validationFormik103" className="formgroup">
                <div className="filed-input-adduser-modal">
                  <Form.Label className="field-description-input-edit">
                    เบอร์โทรศัพท์
                  </Form.Label>
                  <div className="phone">
                    <Form.Control
                      type="number"
                      // placeholder="555"
                      className={`form-control ${
                        touched.phone
                          ? errors.phone
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      name="phone"
                      onChange={handleChange}
                      // value={5555}
                      value={values.phone}
                      // isInvalid={errors.phone}
                      id="input-field-adduser-modal"
                      // style={{
                      //   backgroundColor: "#e4e6e5",
                      //   fontSize: 14,
                      //   fontFamily: "kanit",
                      //   fontWeight: 100,
                      // }}
                    />
                    {errors.name && touched.phone && (
                      <p className="error-helptext-modal-edit">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </Form.Group>
              <Form.Group controlId="validationFormik103" className="formgroup">
                <div className="filed-input-adduser-modal">
                  <Form.Label className="field-description-input-edit">
                    ชื่อผู้ใช้งาน
                  </Form.Label>
                  <div className="username">
                    <Form.Control
                      type="text"
                      // placeholder="ชื่อผู้ใช้งาน"
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
                      id="input-field-adduser-modal"
                      // style={{
                      //   backgroundColor: "#e4e6e5",
                      //   fontSize: 14,
                      //   fontFamily: "kanit",
                      //   fontWeight: 100,
                      // }}
                    />
                    {errors.name && touched.username && (
                      <p className="error-helptext-modal-edit">
                        {errors.username}
                      </p>
                    )}
                  </div>
                </div>
              </Form.Group>
              <Form.Group controlId="validationFormik103" className="formgroup">
                <div className="filed-input-adduser-modal">
                  <Form.Label className="field-description-input-edit">
                    รหัสผ่าน
                  </Form.Label>
                  <div className="password">
                    <Form.Control
                      type="text"
                      // placeholder="รหัสผ่าน"
                      className={`form-control ${
                        touched.password
                          ? errors.password
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      name="password"
                      onChange={handleChange}
                      value={values.password}
                      // isInvalid={errors.password}
                      id="input-field-adduser-modal"
                      // style={{
                      //   backgroundColor: "#e4e6e5",
                      //   fontSize: 14,
                      //   fontFamily: "kanit",
                      //   fontWeight: 100,
                      // }}
                    />
                    {errors.name && touched.password && (
                      <p className="error-helptext-modal-edit">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>
              </Form.Group>

              <div className="filed-input-adduser-modal">
                <Form.Label className="field-description-input-edit">
                  ชื่อหน่วยงาน
                </Form.Label>
                <div className="agency">
                  <select
                    id="Location"
                    className="custom-select "
                    onChange={(e) => {
                      setagency({ id: e.target.value * 1 });
                      setErrorAgency(false);
                    }}
                    id="input-field-adduser-modal"
                  >
                    {/* {alert(props.agency.name)} */}
                    <option value="" selected disabled hidden>
                      {props.agency.name
                        ? props.agency.name
                        : "กรุณาเลือกหน่วยงาน"}
                    </option>
                    {agencys_option &&
                      agencys_option.map((agency, index) => (
                        <option key={index} value={agency.id}>
                          {agency.name}
                        </option>
                      ))}
                  </select>
                  {errAgency && (
                    <p className="error-helptext-modal-edit">
                      {"**กรุณาระบุหน่วยงาน"}
                    </p>
                  )}
                </div>
              </div>

              {/* <div className="filed-input-adduser-modal">
                <Form.Label className="field-description-input-edit">
                  สิทธิ์การใช้งาน
                </Form.Label>
                <div className="role">
                  <select
                    disabled
                    id="Location"
                    className="custom-select "
                    // onChange={handleChange}
                    onChange={(e) => {
                      setrole([...role, e.target.value]);
                    }}
                    id="input-field-adduser-modal"
                  >
                    <option value="" selected disabled hidden>
                      {role ? role : "กรุณาเลือกสิทธิ์"}
                    </option>
                    {role &&
                      roless.map((role, index) => (
                        <option key={index} value={index}>
                          {role}
                        </option>
                      ))}
                  </select>
                </div>
              </div> */}
              <div className="filed-input-adduser-modal">
                <Form.Label className="field-description-input-edit extra-status">
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
                {/* <div className="toggleBox status-box">
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
                </div> */}
              </div>
              {/* </Form.Group> */}
              <div className="row no-gutters ">
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
                      // fontFamily: "Prompt",
                      // fontSize: 16,
                      // fontWeight: 300,
                      // width: `90%`,
                      // marginTop: `2%`,
                      // marginBottom: `3%`,
                      // backgroundColor: "#03a96b",
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
          </div>
          {/* <div className="col-2 col-sm-2 col-md-2 col-lg-2.5 col-xl-2.5"></div> */}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
