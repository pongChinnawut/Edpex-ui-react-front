import React from "react";
import Axios from "axios";
import EditUser from "./EditModal";

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
  const [status, setStatus] = React.useState("");

  React.useEffect(() => {
    const data = Axios.get("http://localhost:8080/api/v1/user/all/user", {
      // mode: "no-cors",
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      //   "Content-Type": "application/json",
      // },
      // withCredentials: true,
      // credentials: "same-origin",
    }).then((res) => {
      setUserInfo(res.data);
      console.log(res.data);
    });
  }, []);

  const showEditModal_fn = (name) => {
    setmarkup(<EditUser />);
    setshowEditModal(true);
    // console.log(showEditModal);
    setname(name);
  };

  return (
    <div className="container-fluid p-0 tableuser-page ">
      <div className="row no-gutters">
        <div
          className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2 "
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
            <h2 className="adduser-head adduser-head-table">
              ข้อมูลผู้ใช้งานระบบ
            </h2>
          </div>
        </div>

        <div
          className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2 "
          style={{ backgroundColor: "#e4e6e5" }}
        ></div>
      </div>
      <div className="row no-gutters tableuser-page-in ">
        <div
          className="col-12 col-sm-12 col-md-12 col-lg-1 col-xl-1 "
          style={{ backgroundColor: "#e4e6e5" }}
        ></div>
        <div
          className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10  "
          style={{
            backgroundColor: "#e4e6e5",
          }}
        >
          {/* <div className="tableuser-page"> */}
          {/* <h2 className="header-table-description">
            ข้อมูลผู้ใช้งานระบบงานประกันคุณภาพ
          </h2> */}
          {/* <div className="tableuser-header">
            <ion-icon
              name="person-add-sharp"
              className="icon-adduser"
            ></ion-icon>
            <h2 className="tableuser-head">เพิ่มข้อมูลผู้ใช้งาน</h2>
          </div> */}
          {userInfo ? (
            <div className="tabel-responsive table-user">
              <table className="table customers">
                <thead class="thead-dark">
                  <tr className="head-table-column">
                    <th scope="col">ลำดับ</th>
                    <th scope="col">ชื่อผู้ใช้งาน</th>
                    <th scope="col">รหัสผ่าน</th>
                    <th scope="col">ชื่อหน่วยงาน</th>
                    <th scope="col">สิทธิ์</th>
                    <th scope="col">เบอร์โทรศัพท์</th>
                    <th scope="col">สถานะ</th>
                    <th scope="col">EDIT</th>
                    <th scope="col">DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {userInfo.length &&
                    userInfo.map((user, index) => (
                      <tr>
                        <th scope="row">{index}</th>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.agency.name}</td>
                        <td>
                          {user.roles.length != 0
                            ? user.roles[0].name
                            : "nullNull"}
                        </td>
                        <td>{user.phone}</td>
                        <td>{user.status}</td>
                        <td>
                          {/* <button data-toggle="modal" data-target="#signupPage"> */}
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
                            แก้ไข
                          </button>

                          {/* {console.log(user.agency.id)} */}
                        </td>
                        <td>
                          {/* <button data-toggle="modal" data-target="#signupPage"> */}
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

                          {/* {console.log(user.agency.id)} */}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            // </div>
            <div>Loading....</div>
          )}

          {/* </div> */}
        </div>
        <div
          className="col-12 col-sm-12 col-md-12 col-lg-1 col-xl-1 "
          style={{ backgroundColor: "#e4e6e5" }}
        ></div>
      </div>
      {/* <div className="row no-gutters">
        <div
          className="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 "
          style={{ backgroundColor: "yellow" }}
        ></div>
        <div
          className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 "
          style={{ backgroundColor: "#e4e6e5" }}
        >
          <EditUser />
        </div>
        <div
          className="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 "
          style={{ backgroundColor: "yellow" }}
        ></div>
      </div> */}
      {/* {markup} */}
      {/* {showEditModal ? <EditUser show={showEditModal} /> : ""} */}
      {showEditModal ? (
        <EditUser
          // showModalll={true}
          id={user_id}
          name={name}
          phone={phone}
          username={username}
          password={password}
          role={role}
          agency={agency}
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
