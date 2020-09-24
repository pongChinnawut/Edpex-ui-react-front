import React from "react";
import Cookie from "js-cookie";
import UserScreen from "./UserScreen";
import Axios from "axios";
import Footer from "./Footer";
import { Form, FormGroup, Button } from "react-bootstrap";
// import Backgroundd from "../screens/kuu.png";

export default function ProcessUserButton(props) {
  const userData = Cookie.getJSON("userData");
  // const [processId, setprocessId] = React.useState(props.p);
  const [arrInput, setarrInput] = React.useState([]);
  const [yearSemesterNow, setyearSemesterNow] = React.useState("");

  React.useEffect(() => {
    if (userData == undefined || !userData) {
      props.history.push("/homelogin");
    }
    if (userData) {
      //ต้องตรวจสอบก่อนว่า userคนนี้
      Axios.get(
        `http://localhost:8080/api/v1/id/processinput?processId=${props.location.state.processId}`
      ).then((res) => {
        setarrInput(res.data);
        Axios.get("http://localhost:8080/api/v1/getSemester").then((res) => {
          setyearSemesterNow(res.data);
        });
      });
    }
  }, []);

  const arrProcess = [
    "จำนวนครั้งที่ไฟฟ้าดับ2",
    "จำนวนครั้งที่เกิดอุบัติเหตุในมหาวิทยาลัย",
    "คะแนนเฉลี่ยผลการประเมินความพึงพอใจของผู้รับบริการที่มีต่อการให้บริหารฝึกอบรมแต่ละด้านมีค่าเฉลี่ยเท่าบริการที่มีต่อ",
    "จำนวนครั้งที่เกิดอุบัติเหตุในมหาวิทยาลัย",
    "จำนวนครั้งที่เกิดอุบัติเหตุในมหาวิทยาลัย",
    "คะแนนเฉลี่ยผลการประเมินความพึงพอใจของผู้รับบริการที่มีต่อการให้บริหารฝึกอบรมแต่ละด้านมีค่าเฉลี่ยเท่าบริการที่มีต่อ",
    "จำนวนครั้งที่เกิดอุบัติเหตุในมหาวิทยาลัย",
    "จำนวนครั้งที่เกิดอุบัติเหตุในมหาวิทยาลัย",
  ];

  const gotoProcessInBut = () => {
    props.history.push("/processuser");
  };

  return (
    <div className="grid-container">
      <header className="header">
        <UserScreen />
      </header>
      <main className="main">
        <div className="content">
          <div className="container-fluid p-0">
            <div className="row no-gutters userscreen-fixinput-grid ">
              <div
                className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2 "
                style={{
                  backgroundColor: "#E4E6E5",
                }}
              >
                <div className="back-user-small" onClick={gotoProcessInBut}>
                  <div className="btn-back">
                    <ion-icon
                      name="arrow-back-circle-outline"
                      id="back-icon"
                    ></ion-icon>
                    <span className="back-word">ย้อนกลับ</span>
                  </div>
                </div>
                {/* <div className="back-user">{`<  กลับหน้าแรก`}</div> */}
              </div>
              <div
                className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 "
                style={{ backgroundColor: "#E4E6E5" }}
              >
                <div className="input-header-big">
                  {/* <ion-icon name="radio-button-on" id="create-edit"></ion-icon> */}
                  {/* <ion-icon name="create-outline" id="create-edit"></ion-icon> */}
                  <div className="back-and-inputfix">
                    <ion-icon
                      name="arrow-back-circle"
                      id="back-icon-hide"
                      onClick={gotoProcessInBut}
                    ></ion-icon>
                    <span className="input-header-big-input">
                      <span className="slash">|</span> ข้อมูลที่ต้องกรอก
                    </span>
                    <span></span>
                  </div>
                  <div className="btn-recommence">
                    <span className="add-word">ปีการศึกษา</span>{" "}
                    <span className="edit-word">{yearSemesterNow}</span>
                  </div>
                </div>
                <div className="process-name-head-2">
                  <span className="process-name-true-2">
                    <span className="name-descrip-pro-name-2">
                      ชื่อกระบวนการ
                    </span>{" "}
                    <span className="process-name-in-2">
                      {arrInput.processName}
                      {/* ด้านความปลอดภัยด้านไฟฟ้าและประปาด้านความปลอดภัยด้านไฟฟ้า */}
                    </span>
                  </span>
                </div>
                {/* <span className="process-name">
                  <span className="name-descrip-pro-name">ชื่อกระบวนการ</span>{" "}
                  <span className="process-name-true">
                    ด้านความปลอดภัยด้านไฟฟ้าและประปา
                  </span>
                </span> */}
                {/* <span className="input-header-big">
        ข้อมูลที่ต้องกรอก /{" "}
        <span className="add-word">เพิ่มข้อมูล</span> /
        <span className="edit-word">แก้ไขประวัติของข้อมูล</span>
        </span> */}
                <div className="background-inputfix">
                  {arrInput.listInput &&
                    arrInput.listInput.map((process, index) => (
                      <div className="inputfix-round">
                        <span className="card-inputfix-number">{`${
                          index + 1
                        }`}</span>
                        <span className="card-inputfix-descrip">
                          {process.description}
                        </span>
                        <div className="card-inputfix-button">
                          <button
                            className="btn-add"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <ion-icon
                                name="add-circle-outline"
                                style={{ fontSize: `20px`, marginTop: `-2px` }}
                              ></ion-icon>
                              <span
                              // type="button"
                              // class="btn btn-primary"
                              // data-toggle="modal"
                              // data-target="#exampleModalCenter"
                              >
                                เพิ่มข้อมูล
                              </span>
                            </div>
                          </button>
                          <button className="btn-edit">
                            {" "}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <ion-icon
                                name="folder-open-outline"
                                style={{ fontSize: `20px`, marginTop: `-2px` }}
                              ></ion-icon>
                              <span>ประวัติข้อมูล</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div
                className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2  "
                style={{ backgroundColor: "#E4E6E5" }}
                //   className="footer-grid"
              >
                {/* <footer className="footer-last">
        2020 © งานประกันคุณภาพการศึกษา สำนักวิทยาเขตกำแพงแสน Kasetsart
        University
        </footer> */}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer-last-bottom">
        2020 © งานประกันคุณภาพการศึกษา สำนักวิทยาเขตกำแพงแสน Kasetsart
        University
      </footer>
      {/* <Footer /> */}
      {/* ใส่ modal */}
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
      {/* modal 2 */}
      <div
        class="modal fade"
        id="exampleModalCenterSubmit"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                ยืนยัน
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
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
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
