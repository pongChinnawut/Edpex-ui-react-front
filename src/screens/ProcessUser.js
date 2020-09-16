import React from "react";
import Cookie from "js-cookie";
import UserScreen from "./UserScreen";
// import Backgroundd from "../screens/kuu.png";

export default function ProcessUser(props) {
  const userData = Cookie.getJSON("userData");

  React.useEffect(() => {
    if (!userData) {
      props.history.push("/");
    }
  }, []);

  const arrProcess = [
    "กระบวนการไฟฟ้า",
    // "กระบวนการประปา",
    "กระบวนการสาธารณูปโภค",
    "กระบวนการด้านความปลอดภัยของนิสิตและบุคลากรขององค์กรกระบวนการด้านความปลอดภัย",
    "กระบวนการด้านความปลอดภัยของนิสิตและบุคลากรขององค์กร",
    "กระบวนการด้านความปลอดภัยของนิสิตและบุคลากรขององค์กร",
  ];

  const goInputFix = () => {
    props.history.push("/inputfix");
  };

  return (
    <div>
      <UserScreen />
      <main>
        <div className="container-fluid p-0  ">
          <div className="row no-gutters userscreen-fixinput">
            <div
              className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2 no-border"
              style={{ backgroundColor: "#e4e6e5" }}
            ></div>
            <div
              className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 no-border"
              style={{ backgroundColor: "#e4e6e5" }}
            >
              <div className="process-header-big">
                <div className="processnum">
                  <span className="process-header">
                    <span className="slash">|</span> กระบวนการที่รับผิดชอบ
                  </span>
                  <span className="process-header-numprocess">5 กระบวนการ</span>
                </div>
                <div className="agency-name">
                  <span className="process-header-agency-name">
                    ชื่อหน่วยงาน
                  </span>
                  <span className="process-header-agency">
                    กองบริหารการศึกษาวิชาการและนิสิตวิทยาเขต
                  </span>
                  {/* <span className="slash-process">/</span> */}
                  {/* <span className="process-header-numprocess">5 กระบวนการ</span> */}
                  {/* <div>{`${arrProcess.length} กระบวนการ`}</div> */}
                </div>
              </div>

              <div className="background-inputfix ">
                {arrProcess &&
                  arrProcess.map((process, index) => (
                    <div className="process-round" onClick={goInputFix}>
                      <div className="card-number">{`${index + 1}`}</div>
                      <div className="card-description">{`${process}`}</div>
                      <div className="icon-goprocess-big">
                        <div className="icon-goprocess-new">
                          <ion-icon
                            id="ionicon-arrow"
                            name="arrow-forward-circle-outline"
                          ></ion-icon>
                          <span className="process-toinputfix">กรอกข้อมูล</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div
              className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2 no-border"
              style={{ backgroundColor: "#e4e6e5" }}
            ></div>
          </div>
        </div>
      </main>
      <footer className="footer-last-bottom">
        2020 © งานประกันคุณภาพการศึกษา สำนักวิทยาเขตกำแพงแสน Kasetsart
        University
      </footer>
      {/* ****************modal *************/}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
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
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ปุ่มเรียกmodal boot
{
  /* <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                Launch demo modal
              </button> */
}
