import React from "react";
import Axios from "axios";
import EditUser from "./EditModal";
import ReactPaginate from "react-paginate";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

export default function TableUser(props) {
  const [userInfo, setUserInfo] = React.useState([]);
  const [showEditModal, setshowEditModal] = React.useState(false);
  const [markup, setmarkup] = React.useState("");
  const [user_id, setId] = React.useState("");
  const [name, setname] = React.useState("");
  const [phone, setphone] = React.useState("");
  const [username, setusername] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [role, setrole] = React.useState("");
  const [agency, setagency] = React.useState("");
  const [agency_descrip, setagency_descrip] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [offset, setoffset] = React.useState(0);
  const [perPage, setperPage] = React.useState(8);
  const [currentPage, setcurrentPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);
  const [slice, setslice] = React.useState([]);
  const [lenghtDataAll, setlenghtDataAll] = React.useState(0);
  const [arrayID, setarrayID] = React.useState([]);

  React.useEffect(() => {
    const receiveData = () => {
      const data = Axios.get(
        "http://localhost:8080/api/v1/user/all/user",
        {}
      ).then((res) => {
        setlenghtDataAll(res.data.length);
        setUserInfo(res.data.slice(offset, offset + perPage));
        // console.log(res.data);
        setPageCount(Math.ceil(res.data.length / perPage));
        // setarrayID([...arrayID, ])
      });
    };
    receiveData();
  }, [offset, currentPage]);

  // React.useEffect(() => {
  //   console.log(slice);
  // }, [slice]);

  // const receiveData = () => {
  //   if (userInfo.length != 0) {
  //     const slice = userInfo.slice(offset, offset + perPage);
  //     setUserInfo(slice);
  //     setPageCount(Math.ceil(userInfo.length / perPage));
  //   }
  // };

  // const handlePageClick = (e) => {
  //   const selectedPage = e.selected;
  //   const offsett = selectedPage * perPage;
  //   setcurrentPage(selectedPage);
  //   setoffset(offsett);
  //   // receiveData();
  // };

  const showEditModal_fn = (name) => {
    setmarkup(<EditUser />);
    setshowEditModal(true);
    // console.log(showEditModal);
    setname(name);
  };

  return (
    <div className="container-fluid p-0 tableuser-page ">
      <div className="row no-gutters tableuser-page-in ">
        <div
          className="col-12 col-sm-12 col-md-1 col-lg-1 col-xl-1 "
          style={{ backgroundColor: "#e4e6e5" }}
        ></div>
        <div
          className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10  "
          style={{
            backgroundColor: "#e4e6e5",
          }}
        >
          {userInfo ? (
            <div className="background-tableuser ">
              <div className="adduser-header ">
                {/* <ion-icon
              name="person-add-sharp"
              className="icon-adduser"
            ></ion-icon> */}
                <h2 className="adduser-head-table">ข้อมูลผู้ใช้งานระบบ</h2>
              </div>
              <Table className="table table-hover ">
                <Thead className="thead-danger">
                  <Tr className="head-table-column">
                    <Th scope="col">ลำดับ</Th>
                    <Th scope="col">ชื่อ-นามสกุล</Th>
                    <Th scope="col">หน่วยงาน</Th>
                    <Th scope="col">เบอร์โทรศัพท์</Th>
                    <Th scope="col">ชื่อผู้ใช้งาน</Th>
                    <Th scope="col">สิทธิ์</Th>
                    <Th scope="col">สถานะ</Th>
                    <Th scope="col" className="btn-table-head">
                      เพิ่มเติม
                    </Th>
                    {/* <Th scope="col" className="btn-table-head">
                      ลบ
                    </Th> */}
                  </Tr>
                </Thead>
                <Tbody>
                  {userInfo.length &&
                    userInfo.map((user, index) => (
                      <Tr>
                        <Th scope="row" id="index-no">
                          {offset + index + 1}
                        </Th>
                        {/* <Td>{index}</Td> */}
                        <Td>{user.name}</Td>
                        <Td>{user.agency.name}</Td>
                        <Td>{user.phone}</Td>
                        <Td>{user.username}</Td>
                        <Td>
                          {user.roles.length != 0 ? (
                            user.roles[0].name == "ADMIN" ? (
                              <div className={`role-in-table intable-admin`}>
                                {user.roles[0].name}
                              </div>
                            ) : user.roles[0].name == "USER" ? (
                              <div className={`role-in-table intable-user`}>
                                {user.roles[0].name}
                              </div>
                            ) : user.roles[0].name == "EXECUTIVE" ? (
                              <div className={`role-in-table intable-exe`}>
                                {user.roles[0].name}
                              </div>
                            ) : (
                              <div className={`role-in-table intable-user`}>
                                {"NULL"}
                              </div>
                            )
                          ) : (
                            <div className={`role-in-table intable-user`}>
                              {"NULL"}
                            </div>
                          )}
                        </Td>

                        <Td>
                          {user.status == 1 ? (
                            <ion-icon
                              name="checkmark-outline"
                              id="icon-in-table-status-1"
                            ></ion-icon>
                          ) : (
                            <ion-icon
                              name="close-outline"
                              id="icon-in-table-status-0"
                            ></ion-icon>
                          )}
                        </Td>
                        <Td className="btn-table">
                          <div
                            className="drop-btn"
                            type="button"
                            id="dropdownMenu2"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            ...
                          </div>
                          <div
                            className="dropdown-menu back-drop"
                            aria-labelledby="dropdownMenu2"
                          >
                            <button
                              className="dropdown-item"
                              id="btn-editt"
                              onClick={() => {
                                setshowEditModal(true);

                                setId(user.id);
                                setname(user.name);
                                setphone(user.phone);
                                setusername(user.username);
                                setpassword(user.password);
                                setrole(
                                  user.roles.length != 0
                                    ? user.roles[0].name
                                    : "nullNull"
                                );
                                setagency(user.agency.id);
                                setagency_descrip(user.agency.name);
                                setStatus(user.status);
                              }}
                            >
                              <ion-icon name="create-outline"></ion-icon> แก้ไข
                            </button>
                            <button
                              className="dropdown-item"
                              id="btn-dell"
                              onClick={() => {
                                // setmarkup(<EditUser />);
                                setshowEditModal(true);
                                // console.log(showEditModal);
                                setId(user.id);
                                setname(user.name);
                                setphone(user.phone);
                                setusername(user.username);
                                setpassword(user.password);
                                setrole(
                                  user.roles.length != 0
                                    ? user.roles[0].name
                                    : "nullNull"
                                );
                                setagency(user.agency.id);
                                setagency_descrip(user.agency.name);
                                setStatus(user.status);
                              }}
                            >
                              <ion-icon name="trash-outline"></ion-icon> ลบ
                            </button>
                          </div>

                          {/* <button
                            onClick={() => {
                              setshowEditModal(true);

                              setId(user.id);
                              setname(user.name);
                              setphone(user.phone);
                              setusername(user.username);
                              setpassword(user.password);
                              setrole(
                                user.roles.length != 0
                                  ? user.roles[0].name
                                  : "nullNull"
                              );
                              setagency(user.agency.id);
                              setStatus(user.status);
                            }}
                          >
                            แก้ไข
                          </button> */}
                          {/* <button
                            onClick={() => {
                              // setmarkup(<EditUser />);
                              setshowEditModal(true);
                              // console.log(showEditModal);
                              setId(user.id);
                              setname(user.name);
                              setphone(user.phone);
                              setusername(user.username);
                              setpassword(user.password);
                              setrole(
                                user.roles.length != 0
                                  ? user.roles[0].name
                                  : "nullNull"
                              );
                              setagency(user.agency.id);
                              setStatus(user.status);
                            }}
                          >
                            ลบ
                          </button> */}
                        </Td>
                        {/* <Td className="btn-table">
                          <button
                            onClick={() => {
                              // setmarkup(<EditUser />);
                              setshowEditModal(true);
                              // console.log(showEditModal);
                              setId(user.id);
                              setname(user.name);
                              setphone(user.phone);
                              setusername(user.username);
                              setpassword(user.password);
                              setrole(
                                user.roles.length != 0
                                  ? user.roles[0].name
                                  : "nullNull"
                              );
                              setagency(user.agency.id);
                              setStatus(user.status);
                            }}
                          >
                            ลบ
                          </button>
                        </Td> */}
                      </Tr>
                    ))}
                </Tbody>
              </Table>
              <div className="pagination-big">
                <div className="total-user">{`ทั้งหมด ${lenghtDataAll} คน`}</div>
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
          ) : (
            // </div>
            <div>Loading....</div>
          )}

          {/* </div> */}
        </div>
        <div
          className="col-12 col-sm-12 col-md-1 col-lg-1 col-xl-1 "
          style={{ backgroundColor: "#e4e6e5" }}
        ></div>
      </div>
      {showEditModal ? (
        <EditUser
          // showModalll={true}
          id={user_id}
          name={name}
          phone={phone}
          username={username}
          password={password}
          role={role}
          agency={{ id: agency, name: agency_descrip }}
          status={status}
        />
      ) : (
        ""
      )}

      {/* <EditUser style={{ visibility: "hidden" }} /> */}
      {console.log("55555")}
    </div>
  );
}
