import React from "react";
import { Form, FormGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import Cookie from "js-cookie";
import {
  bounce,
  slideInRight,
  slideInLeft,
  fadeInLeft,
  fadeInRight,
  fadeOutLeft,
  fadeOutRight,
  fadeOutRightBig,
  zoomIn,
  flipInX,
} from "react-animations";
import styled, { keyframes } from "styled-components";
import { Link, Redirect } from "react-router-dom";

export default function AddTransaction(props) {
  const [showAddTransaction, setshowAddTransaction] = React.useState(
    props.showw
  );
  const [moreDescrip, setMoreDescrip] = React.useState("");
  const [adjustData, setadjustData] = React.useState([]);
  const [inputId, setinputId] = React.useState(props.inputId);
  const [showModal, setshowModal] = React.useState("");
  const [showIconCorrect, setshowIconCorrect] = React.useState(false);
  const userData = Cookie.getJSON("userData");

  const validate = (values) => {
    const errors = {};
    if (!values.val) {
      errors.val = "**กรุณาใส่ค่าให้ครบ";
    }
    return errors;
  };

  const Flip = styled.div`
    animation: 1s ${keyframes`${flipInX}`} infinite;
  `;

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      val: "",
    },
    validate,
    validationSchema: Yup.object({
      val: Yup.string().required("Required"),
    }),
    onSubmit(values) {
      // alert(values.val);
      //   alert(moreDescrip);
      adjustValueToApi(values.val, moreDescrip);
    },
  });

  const adjustValueToApi = (val, val_area) => {
    if (val_area != "") {
      setadjustData([
        {
          inputID: inputId,
          keyID: 1,
          value: val,
          updateBy: userData.userInfo.name,
        },
        {
          inputID: inputId,
          keyID: 2,
          value: val_area,
          updateBy: userData.userInfo.name,
        },
      ]);
    } else if (val_area == "") {
      setadjustData([
        {
          inputID: inputId,
          keyID: 2,
          value: val,
          updateBy: userData.userInfo.name,
        },
      ]);
    }
    // setadjustData(adjustData);
  };

  // React.useEffect(() => {
  //   setshowAddTransaction(true);
  //   // return () => {
  //   //   set
  //   // }
  // }, [props.showw]);

  React.useEffect(() => {
    if (adjustData != "") {
      Axios.post(
        "http://localhost:8080/api/v1/inputtotransaction",
        adjustData
      ).then((res) => {
        // setshowAddTransaction(false);
        // alert("add transaction success");
        setTimeout(() => {
          setshowIconCorrect(true);
        }, 1000);

        setTimeout(() => {
          window.location.reload(true);
          // props.history.push("/adminscreen");
        }, 2000);

        // setshowAddTransaction(false);
      });
    }
  }, [adjustData]);

  return (
    <SweetAlert
      // closeOnClickOutside={true}
      showConfirm={false}
      show={showAddTransaction}
      style={{
        width: `57em`,
        backgroundColor: "#E4E6E5",
        padding: `0px`,
        borderRadius: `7px`,
      }}
    >
      {/* {console.log(props.showw)} */}
      {/* {alert(showAddTransaction)} */}
      <div className="add-transaction-head">
        <strong className="questionn">คำถาม </strong>
        {props.inputName}
        {/* จำนวนครั้งที่ไฟฟ้าดับในแต่ละวันจำนวนครั้งที่แต่ละวันจำนวนครั้งที่ */}
      </div>
      <div className="div-alert">
        {false && (
          // <Flip>
          <ion-icon
            name="checkmark-circle-outline"
            id="success-icon-add-trans"
          ></ion-icon>
          // </Flip>
        )}
        {/* <div className="filed-input-adduser-alert">บันทึกข้อมูลสำเร็จ</div> */}
      </div>
      {/* <div className="inputname-add-trans">
        <strong className="questionn">คำถาม </strong>{" "}
        <div className="questionn-descrip">
          จำนวนครั้งที่ไฟฟ้าดับในแต่ละวันจำนวนครั้งที่ไฟฟ้าดับในแต่ละวันจำนวนครั้งที่ไฟฟ้าดับในแต่ละวัน
        </div>
      </div> */}

      <Form onSubmit={handleSubmit}>
        {/* {alert(errors.val)} */}
        <Form.Group controlId="validationFormik103">
          <div className="">
            <Form.Label className="name-head-transaction">
              *ค่าที่ต้องการกรอก
            </Form.Label>
            <div className="name-swal-add-trans">
              <Form.Control
                type="text"
                placeholder="กรุณาระบุค่าข้อมูล"
                className={`form-control ${
                  touched.val ? (errors.val ? "is-invalid" : "is-valid") : ""
                }`}
                name="val"
                onChange={handleChange}
                value={values.val}
                id="formcontrol-swal-add-trans"
              />
            </div>
            {errors.val && touched.val && (
              <p className="error-add-trans-value">{errors.val}</p>
            )}
          </div>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label className="name-head-transaction">
            ข้อมูลเพิ่มเติม
          </Form.Label>
          <div className="name-swal-add-trans">
            <Form.Control
              as="textarea"
              rows="4"
              id="formcontrol-swal-add-trans-area"
              placeholder="อธิบายเพิ่มเติม"
              onChange={(e) => {
                setMoreDescrip(e.target.value);
              }}
            />
          </div>
          <p className="error-add-trans-value">
            {"**สามารถไม่กรอกได้ถ้าไม่มีข้อมูลส่วนนี้**"}
          </p>
        </Form.Group>
        <button
          type="submit"
          className="btn-submit-add-trans"
          // data-toggle={showModal == "" ? "" : "modal"}
          // data-target="#exampleModalCenter"
        >
          ยืนยัน
        </button>
        <button
          type="button"
          className="btn-cancle-add-trans"
          onClick={() => {
            // return <Redirect to="/processuserinput"></Redirect>;
            // setshowAddTransaction(false);
            props.fn(false);
            // window.location.reload();
          }}
        >
          ยกเลิก
        </button>
      </Form>
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
      {showIconCorrect && (
        <SweetAlert
          // hideOverlay={true}
          showConfirm={false}
          style={{
            width: `27em`,
            backgroundColor: "#9bddc5c4",
            padding: `0px`,
            borderRadius: `15px`,
          }}
        >
          <Flip>
            <ion-icon
              name="checkmark-circle"
              id="success-icon-add-trans"
            ></ion-icon>
          </Flip>
          <div className="success-swl">บันทึกข้อมูลสำเร็จ</div>
        </SweetAlert>
      )}
    </SweetAlert>
  );
}
