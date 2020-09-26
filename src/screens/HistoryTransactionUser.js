import React from "react";
import Cookie from "js-cookie";
import UserScreen from "./UserScreen";
import Axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import SweetAlert from "react-bootstrap-sweetalert";
import AddTransaction from "./AddTransaction";
import { Form, FormGroup, Button } from "react-bootstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import Backgroundd from "../screens/kuu.png";

export default function HistoryTransactionUser(props) {
  const userData = Cookie.getJSON("userData");
  // const [processId, setprocessId] = React.useState(props.p);
  const [arrInput, setarrInput] = React.useState([]);
  const [showAddTransaction, setshowAddTransaction] = React.useState(false);
  const [yearSemesterNow, setyearSemesterNow] = React.useState("");
  const [inputId, setinputId] = React.useState("");
  const [inputName, setinputName] = React.useState("");
  const [transactionApi, settransactionApi] = React.useState([]);
  const [offset, setoffset] = React.useState(0);
  const [perPage, setperPage] = React.useState(8);
  const [currentPage, setcurrentPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);

  const arrProcess = [
    "คะแนนเฉลี่ยผลการประเมินความพึงพอใจของผู้รับบริการที่มีต่อการให้บริหารฝึกอบรมแต่ละด้านมีค่าเฉลี่ยเท่าบริการที่มีต่อ",
  ];

  const dataa = [
    {
      id: 13,
      inputID: 2,
      keyID: 1,
      value: "20",
      jobDate: "2020-08-25",
      updateDate: "2020-08-25",
      updateBy: "chinnawut",
    },
    {
      id: 100,
      inputID: 2,
      keyID: 2,
      value: "12",
      jobDate: "2020-09-25",
      updateDate: "2020-09-25",
      updateBy: "ชินนวุฒฺ แก้วฉิม",
    },
    {
      id: 103,
      inputID: 2,
      keyID: 2,
      value: "22",
      jobDate: "2020-09-25",
      updateDate: "2020-09-25",
      updateBy: "ชินนวุฒฺ แก้วฉิม",
    },
    {
      id: 114,
      inputID: 2,
      keyID: 1,
      value: "12",
      jobDate: "2020-09-25",
      updateDate: "2020-09-25",
      updateBy: "ชินนวุฒฺ แก้วฉิม",
    },
    {
      id: 115,
      inputID: 2,
      keyID: 2,
      value: "บ้านผมเอง",
      jobDate: "2020-09-25",
      updateDate: "2020-09-25",
      updateBy: "ชินนวุฒฺ แก้วฉิม",
    },
    {
      id: 115,
      inputID: 2,
      keyID: 2,
      value: "บ้านผมเอง",
      jobDate: "2020-09-25",
      updateDate: "2020-09-25",
      updateBy: "ชินนวุฒฺ แก้วฉิม",
    },
    {
      id: 115,
      inputID: 2,
      keyID: 2,
      value: "บ้านผมเอง",
      jobDate: "2020-09-25",
      updateDate: "2020-09-25",
      updateBy: "ชินนวุฒฺ แก้วฉิม",
    },
    {
      id: 116,
      inputID: 2,
      keyID: 2,
      value: "5",
      jobDate: "2020-09-25",
      updateDate: "2020-09-25",
      updateBy: "ชินนวุฒฺ แก้วฉิม",
    },
    {
      id: 116,
      inputID: 2,
      keyID: 2,
      value: "5",
      jobDate: "2020-09-25",
      updateDate: "2020-09-25",
      updateBy: "ชินนวุฒฺ แก้วฉิม",
    },
    {
      id: 116,
      inputID: 2,
      keyID: 2,
      value: "5",
      jobDate: "2020-09-25",
      updateDate: "2020-09-25",
      updateBy: "ชินนวุฒฺ แก้วฉิม",
    },
  ];

  React.useEffect(() => {
    const receiveData = () => {
      Axios.get(
        `http://localhost:8080/api/v1/getTransaction/ByInputAndUserId?userId=${userData.userInfo.id}&inputId=2&nowDate=2020-09-25`
      ).then((res) => {
        settransactionApi(dataa.slice(offset, offset + perPage));
        setPageCount(Math.ceil(dataa.length / perPage));
        // settransactionApi(res.data);
      });
    };
    receiveData();
  }, [offset, currentPage]);

  // const userInfo = [
  //   {
  //     id: 13,
  //     inputID: 2,
  //     keyID: 1,
  //     value: "20",
  //     jobDate: "2020-08-25",
  //     updateDate: "2020-08-25",
  //     updateBy: "chinnawut",
  //   },
  //   {
  //     id: 100,
  //     inputID: 2,
  //     keyID: 2,
  //     value: "12",
  //     jobDate: "2020-09-25",
  //     updateDate: "2020-09-25",
  //     updateBy: "ชินนวุฒฺ แก้วฉิม",
  //   },
  //   {
  //     id: 103,
  //     inputID: 2,
  //     keyID: 2,
  //     value: "22",
  //     jobDate: "2020-09-25",
  //     updateDate: "2020-09-25",
  //     updateBy: "ชินนวุฒฺ แก้วฉิม",
  //   },
  //   {
  //     id: 114,
  //     inputID: 2,
  //     keyID: 1,
  //     value: "12",
  //     jobDate: "2020-09-25",
  //     updateDate: "2020-09-25",
  //     updateBy: "ชินนวุฒฺ แก้วฉิม",
  //   },
  //   {
  //     id: 115,
  //     inputID: 2,
  //     keyID: 2,
  //     value: "บ้านผมเอง",
  //     jobDate: "2020-09-25",
  //     updateDate: "2020-09-25",
  //     updateBy: "ชินนวุฒฺ แก้วฉิม",
  //   },
  //   {
  //     id: 115,
  //     inputID: 2,
  //     keyID: 2,
  //     value: "บ้านผมเอง",
  //     jobDate: "2020-09-25",
  //     updateDate: "2020-09-25",
  //     updateBy: "ชินนวุฒฺ แก้วฉิม",
  //   },
  //   {
  //     id: 115,
  //     inputID: 2,
  //     keyID: 2,
  //     value: "บ้านผมเอง",
  //     jobDate: "2020-09-25",
  //     updateDate: "2020-09-25",
  //     updateBy: "ชินนวุฒฺ แก้วฉิม",
  //   },
  //   {
  //     id: 116,
  //     inputID: 2,
  //     keyID: 2,
  //     value: "5",
  //     jobDate: "2020-09-25",
  //     updateDate: "2020-09-25",
  //     updateBy: "ชินนวุฒฺ แก้วฉิม",
  //   },
  //   {
  //     id: 116,
  //     inputID: 2,
  //     keyID: 2,
  //     value: "5",
  //     jobDate: "2020-09-25",
  //     updateDate: "2020-09-25",
  //     updateBy: "ชินนวุฒฺ แก้วฉิม",
  //   },
  //   {
  //     id: 116,
  //     inputID: 2,
  //     keyID: 2,
  //     value: "5",
  //     jobDate: "2020-09-25",
  //     updateDate: "2020-09-25",
  //     updateBy: "ชินนวุฒฺ แก้วฉิม",
  //   },
  // ];

  const switchMonth = (month_number) => {
    let month_thai = "";
    switch (month_number) {
      case "01":
        return "ม.ค.";
        break;
      case "02":
        return "ก.พ.";
        break;
      case "03":
        return "มี.ค.";
        break;
      case "04":
        return "เม.ย.";
        break;
      case "05":
        return "พ.ค.";
        break;
      case "06":
        return "มิ.ย.";
        break;
      case "07":
        return "ก.ค.";
        break;
      case "08":
        return "ส.ค.";
        break;
      case "09":
        return "ก.ย.";
        break;
      case "10":
        return "ต.ค.";
        break;
      case "11":
        return "พ.ย.";
        break;
      case "12":
        return "ธ.ค.";
        break;
      default:
        alert("NOT FOUND month thai");
    }
  };

  const gotoProcessInBut = () => {
    props.history.push("/processuserinput");
  };

  const setShowAgain = (status) => {
    setshowAddTransaction(status);
  };

  return (
    <div className="grid-container">
      <header className="header">
        <UserScreen />
      </header>
      <main className="main">
        <div className="content">
          <div className="container-fluid p-0">
            <div className="row no-gutters table-transactionHis-grid ">
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
                <div className="input-header-big-history">
                  {/* <ion-icon name="radio-button-on" id="create-edit"></ion-icon> */}
                  {/* <ion-icon name="create-outline" id="create-edit"></ion-icon> */}
                  <div className="back-and-inputfix-history">
                    <ion-icon
                      name="arrow-back-circle"
                      id="back-icon-hide"
                      onClick={gotoProcessInBut}
                    ></ion-icon>
                    <span className="input-header-big-input-history">
                      <span className="slash">|</span>{" "}
                      ประวัติการกรอกข้อมูลของคุณ
                    </span>

                    <span></span>
                  </div>
                  <div className="btn-recommence-history-year">
                    <span className="his-word-year year-descrip-his">
                      ปีการศึกษา
                    </span>{" "}
                    {/* <span className="edit-word">{yearSemesterNow}</span> */}
                    <span className="his-word-year year-number-his">
                      {2563}
                    </span>
                  </div>
                </div>
                <div className="process-name-history">
                  <span className="process-name-his">ชื่อกระบวนการ</span>
                  <span className="process-his">
                    ด้านความปลอดภัยด้านไฟฟ้าและประปาด้านความปลอดภัยด้านไฟฟ้านความปลอดภัยด้านไฟฟ้า
                  </span>
                </div>
                <div className="process-name-history">
                  <span className="process-name-his-point">ชื่อตัวชี้วัด</span>
                  <span className="process-his-point">
                    จำนวนครั้งที่ไฟฟ้าดับทั้งวิทยาเขตกำแพงแสน
                    ทั้งปีการศึกษาของเรา นครปฐมของเรา นครปฐม
                  </span>
                </div>

                <div className="line-history-trans"></div>
                {/* <div className="process-name-history-point">
                  <span className="process-name-his-point">ชื่อตัวชี้วัด</span>
                  <span className="process-his-point">
                    จำนวนครั้งไฟฟ้าดับในทั้งวิทยาเขต ทั้งปี
                  </span>
                </div> */}

                <div className="background-history-trans">
                  <Table className="table table-hover ">
                    <Thead className="thead-danger">
                      <Tr className="head-table-column">
                        <Th scope="col" id="no-history-table">
                          ลำดับ
                        </Th>
                        <Th scope="col">ข้อมูลที่กรอก</Th>
                        <Th scope="col" id="date-history-table">
                          วันที่กรอก
                        </Th>
                        <Th scope="col" id="date-history-table">
                          วันที่แก้ไข
                        </Th>
                        <Th scope="col" id="table-history-edit">
                          <ion-icon
                            name="create-outline"
                            id="edit-icon-history"
                          ></ion-icon>
                          แก้ไข
                        </Th>
                        <Th scope="col" id="table-history-edit">
                          <ion-icon
                            name="trash-outline"
                            id="delete-icon-history"
                          ></ion-icon>
                          ลบ
                        </Th>
                        {/* <Th scope="col">ชื่อผู้ใช้งาน</Th>
                        <Th scope="col">สิทธิ์</Th>
                        <Th scope="col">สถานะ</Th> */}
                        {/* <Th scope="col" className="btn-table-head">
                          เพิ่มเติม
                        </Th> */}
                        {/* <Th scope="col" className="btn-table-head">
                      ลบ
                    </Th> */}
                      </Tr>
                    </Thead>
                    <Tbody>
                      {transactionApi.length &&
                        transactionApi.map((user, index) => (
                          <Tr>
                            <Th scope="row" id="index-no">
                              {index + 1}
                            </Th>
                            {/* <Td>{index}</Td> */}
                            <Td>{user.value}</Td>
                            <Td>{`${user.jobDate.split("-")[2]}-${switchMonth(
                              user.jobDate.split("-")[1]
                            )}-${user.jobDate.split("-")[0] * 1 + 543}`}</Td>
                            <Td>{`${user.jobDate.split("-")[2]}-${switchMonth(
                              user.jobDate.split("-")[1]
                            )}-${user.jobDate.split("-")[0] * 1 + 543}`}</Td>
                            <Td className="btn-table">
                              <button
                                className="btn-edit-page-history"
                                onClick={() => {}}
                              >
                                {/* <ion-icon
                                  name="create-outline"
                                  id="edit-icon-history"
                                ></ion-icon> */}
                                แก้ไข
                              </button>
                            </Td>
                            <Td className="btn-table">
                              <button
                                className="btn-delete-page-history"
                                onClick={() => {}}
                              >
                                ลบ
                              </button>
                            </Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                  <div className="pagination-big">
                    <div className="total-user">{`ทั้งหมด ${dataa.length} คน`}</div>
                    <ReactPaginate
                      previousLabel={"<<"}
                      nextLabel={">>"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={(e) => {
                        const selectedPage = e.selected;
                        const offsett = selectedPage * perPage;
                        setcurrentPage(selectedPage);
                        setoffset(offsett);
                      }}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}
                    />
                  </div>
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
      {showAddTransaction && (
        <AddTransaction
          inputId={inputId}
          inputName={inputName}
          showw={true}
          fn={setShowAgain}
        />
      )}
    </div>
  );
}
