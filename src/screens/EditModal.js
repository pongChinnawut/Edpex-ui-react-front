import React from "react";
import { Form, FormGroup } from "react-bootstrap";
import { useFormik } from "formik";
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
  const [agency, setagency] = React.useState({ id: props.agency });
  const [role, setrole] = React.useState(props.role);
  // const [statusCheck, setStatusCheck] = React.useState(
  //   props.status == 1 ? true : false
  // );
  const [status, setstatus] = React.useState(props.status);

  const agencys = [
    "กองบริหารวิชาการกลาง",
    "สำนักบริการกลางวิทยาเขตกำแพงแสน",
    "งานบริการซ่อมบำรุงเครื่องมือวัสดุ",
  ];

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

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      name: props.name,
      phone: props.phone,
      username: props.username,
      password: props.password,
    },
    validate,
    onSubmit(values) {
      console.log(values);
      callSetPattern(
        values.name,
        values.phone,
        values.username,
        values.password
      );
    },
  });

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
        console.log(res.data.message);
        window.location.reload(true);
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
          className="row modal justify-content-center modal-dialog-centered edit-modal "
          style={{
            backgroundColor: " rgba(22, 4, 4, 0.55)",
            width: `100wv`,
            marginLeft: `5%`,
            marginTop: `2%`,
            // transition: `0.6s`,
          }}
          id="signupPage"
        >
          <div
            className="col-6 col-sm-6 col-md-6 col-lg-5 col-xl-5 edit-modal-in"
            style={{
              backgroundColor: "#e4e6e5c2",
              borderRadius: `9px`,
              boxShadow: `4px 4px rgba(22, 4, 4, 0.3)`, //ขวา ล่าง
            }}
          >
            <div className="adduser-header-edit-modal">
              <ion-icon
                name="person-add-sharp"
                className="icon-adduser"
              ></ion-icon>
              <h2 className="adduser-head">แก้ไขข้อมูล</h2>
            </div>

            <Form
              onSubmit={handleSubmit}
              style={{
                marginBottom: 20,
                backgroundColor: "#e4e6e5c2",
              }}
              // className="form-modal-big"
              // id="form-modal-big-id"
            >
              <Form.Group controlId="validationFormik103">
                <div className="filed-input-adduser name-top-edit">
                  <Form.Label className="field-description-input-edit">
                    ชื่อ-นามสกุล
                  </Form.Label>

                  <div className="name">
                    <Form.Control
                      type="text"
                      // placeholder={props.name}
                      className="form-control"
                      name="name"
                      onChange={handleChange}
                      // value={"ชินนวุฒิ"}
                      // values={values.name}
                      value={values.name}
                      // onChange={}
                      isInvalid={errors.name}
                      style={{
                        backgroundColor: "#e4e6e5",
                        fontSize: 14,
                        fontFamily: "kanit",
                        fontWeight: 100,
                      }}
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group controlId="validationFormik103" className="formgroup">
                <div className="filed-input-adduser">
                  <Form.Label className="field-description-input-edit">
                    เบอร์โทรศัพท์
                  </Form.Label>
                  <div className="phone">
                    <Form.Control
                      type="number"
                      // placeholder="555"
                      className="form-control"
                      name="phone"
                      onChange={handleChange}
                      // value={5555}
                      value={values.phone}
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
              </Form.Group>
              <Form.Group controlId="validationFormik103" className="formgroup">
                <div className="filed-input-adduser">
                  <Form.Label className="field-description-input-edit">
                    ชื่อผู้ใช้งาน
                  </Form.Label>
                  <div className="username">
                    <Form.Control
                      type="text"
                      // placeholder="ชื่อผู้ใช้งาน"
                      className="form-control"
                      name="username"
                      onChange={handleChange}
                      value={values.username}
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
              </Form.Group>
              <Form.Group controlId="validationFormik103" className="formgroup">
                <div className="filed-input-adduser">
                  <Form.Label className="field-description-input-edit">
                    รหัสผ่าน
                  </Form.Label>
                  <div className="password">
                    <Form.Control
                      type="text"
                      // placeholder="รหัสผ่าน"
                      className="form-control"
                      name="password"
                      onChange={handleChange}
                      value={values.password}
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
              </Form.Group>

              <div className="filed-input-adduser">
                <Form.Label className="field-description-input-edit">
                  ชื่อหน่วยงาน
                </Form.Label>
                <div className="agency">
                  <select
                    id="Location"
                    className="custom-select "
                    onChange={(e) => {
                      setagency({ id: e.target.value * 1 });
                    }}
                    style={{
                      backgroundColor: "#e4e6e5",
                      fontSize: 14,
                      fontFamily: "kanit",
                      fontWeight: 100,
                    }}
                  >
                    <option value="" selected disabled hidden>
                      {/* {"กรุณาเลือก"} */}
                      {agency.id ? agency.id : "กรุณาเลือกหน่วยงาน"}
                    </option>
                    {agencys &&
                      agencys.map((agency, index) => (
                        <option key={index} value={index}>
                          {agency}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="filed-input-adduser">
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
                    style={{
                      backgroundColor: "#e4e6e5",
                      fontSize: 14,
                      fontFamily: "kanit",
                      fontWeight: 100,
                    }}
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
              </div>
              <div className="filed-input-adduser">
                <Form.Label className="field-description-input-edit">
                  สถานะการใช้งาน
                </Form.Label>
                {/* {console.log("status check = " + statusCheck)} */}
                <div className="toggleBox">
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
              <div className="row no-gutters ">
                <div
                  className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6"
                  style={{ textAlign: "center" }}
                >
                  <button
                    type="submit"
                    variant="secondary"
                    class="btn btn-outline-success btn-lg"
                    style={{
                      fontFamily: "Kanit",
                      fontSize: 16,
                      fontWeight: 300,
                      width: `90%`,
                      marginTop: `2%`,
                      marginBottom: `3%`,
                    }}
                  >
                    ยืนยันข้อมูล
                  </button>
                </div>
                <div
                  className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6"
                  style={{ textAlign: "center" }}
                >
                  <button
                    type="button"
                    // data-toggle="modal"
                    // data-target="#modalYT"
                    onClick={closeModal}
                    // onClick={checkDataMiss}
                    class="btn btn-outline-danger btn-lg"
                    style={{
                      fontFamily: "Kanit",
                      fontSize: 16,
                      fontWeight: 300,
                      width: `90%`,
                      marginTop: `2%`,
                      marginBottom: `3%`,
                    }}
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
