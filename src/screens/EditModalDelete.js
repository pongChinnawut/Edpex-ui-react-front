import React from "react";
import { Form, FormGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Divider from "@material-ui/core/Divider";
// import swal from "sweetalert";
import swal from "@sweetalert/with-react";
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

export default function EditModalDelete(props) {
  const [modal, setmodal] = React.useState(false);
  const [showEditDelete, setShowModalDelete] = React.useState(true);
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

  const toggleModal = () => {
    // setmodal(showModalEdit);
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
    // if (!values.password) {
    //   errors.password = "กรุณากรอกรหัสผ่าน";
    // }

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

    // if (statusCheck == true) {
    //   await setstatus(1);
    //   await callEditApi(name, phone, username, password);
    // } else if (statusCheck == false) {
    //   await setstatus(0);
    //   await callEditApi(name, phone, username, password);
    // }

    callEditApi(name, phone, username);
  };

  const checkSubmitchange = () => {
    // setNewPassword(e);
    if (newPassword != "") {
      setclickSubmit_password(true);
    } else {
      setclickSubmit_password(false);
    }
  };

  const callEditApi = (name, phone, username) => {
    let password = oldPassword;
    if (newPassword != "") {
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

  const callApiDelete = () => {
    // swal({
    //   buttons: false,
    //   content: (
    //     <div>
    //       <Form onSubmit={handleSubmit}>
    //         <Form.Group controlId="validationFormik103">
    //           <div className="filed-input-adduser-modal">
    //             <Form.Label>ชื่อ-นามสกุล</Form.Label>
    //             <div className="name">
    //               <Form.Control
    //                 type="text"
    //                 // placeholder={props.name}
    //                 className={`form-control ${
    //                   touched.name
    //                     ? errors.name
    //                       ? "is-invalid"
    //                       : "is-valid"
    //                     : ""
    //                 }`}
    //                 name="name"
    //                 onChange={handleChange}
    //                 value={values.name}
    //               />
    //             </div>
    //           </div>
    //         </Form.Group>
    //       </Form>
    //     </div>
    //   ),
    // });
    Axios.delete(
      `http://localhost:8080/api/v1/user/deleteUser?userId=${id}`
    ).then(() => {
      // swal({
      //   title: "Good job!",
      //   text: "You clicked the button!",
      //   icon: "success",
      //   button: "Aww yiss!",
      // });
      console.log("success DELETE");
      setTimeout(() => {
        window.location.reload(true);
      }, 1000);
    });
  };

  const closeModal = () => {
    setShowModalDelete(false);
    // console.log(showModalEdit);
    // props.location.push("/adminscreen");
    window.location.reload(true);
  };

  return (
    <div>
      {/* {console.log("สถานะ" + status)}
      {console.log(agency)}*/}
      {/* {console.log("modal " + showModalEdit)} */}
      {showEditDelete ? (
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
            className="col-8 col-sm-6 col-md-5 col-lg-4 col-xl-3 edit-page-all-delete"
            style={{
              backgroundColor: `#E4E6E5`,
              borderRadius: `5px`,
              boxShadow: `0px 0px 7px 0px rgba(10, 10, 10, 0.178)`, //ขวา ล่าง
            }}
          >
            <div className="adduser-header-edit-modal">
              <div className="head-modal-and-icon">
                {/* {iconCorrect && (
                  <ion-icon
                    name="checkmark-outline"
                    id="correct-modal"
                  ></ion-icon>
                )} */}
                <div className="delete-user-header">
                  <ion-icon
                    name="trash-outline"
                    id="delete-modal-icon"
                  ></ion-icon>
                  {/* <div className="divider">
                    ---------------------------------------------------
                  </div> */}
                  <span className="deleteuser-head">ลบข้อมูล</span>
                  <span className="nameUser-of-delete">{`คุณ ${props.name}`}</span>

                  <div className="confirm-delete-btn">
                    <span className="btn-submit-delete" onClick={callApiDelete}>
                      ยืนยัน
                    </span>
                    <span className="btn-cancle-delete" onClick={closeModal}>
                      ยกเลิก
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-2 col-sm-2 col-md-2 col-lg-2.5 col-xl-2.5"></div> */}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
