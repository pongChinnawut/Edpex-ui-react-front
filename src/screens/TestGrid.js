import React from "react";
import UserScreen from "./UserScreen";

export default function TestGrid() {
  const arrProcess = [
    "กระบวนการไฟฟ้า",
    "กระบวนการประปา",
    // "กระบวนการสาธารณูปโภค",
    // "กระบวนการด้านความปลอดภัยของนิสิตและบุคลากรขององค์กรกระบวนการด้านความปลอดภัย",
    // "กระบวนการด้านความปลอดภัยของนิสิตและบุคลากรขององค์กร",
    // "กระบวนการด้านความปลอดภัยของนิสิตและบุคลากรขององค์กร",
    // "กระบวนการสาธารณูปโภค",
    // "กระบวนการด้านความปลอดภัยของนิสิตและบุคลากรขององค์กรกระบวนการด้านความปลอดภัย",
    // "กระบวนการด้านความปลอดภัยของนิสิตและบุคลากรขององค์กรกระบวนการด้านความปลอดภัย",
  ];
  return (
    <div className="grid-container">
      <header className="header">
        <UserScreen />
      </header>

      <main className="main">
        <div className="content">
          <div>
            <div className="container-fluid p-0">
              <div className="row no-gutters userscreen-fixinput-grid">
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
                      <span className="process-header-numprocess">{`5 กระบวนการ`}</span>
                    </div>
                    <div className="agency-name">
                      <span className="process-header-agency-name">
                        ชื่อหน่วยงาน
                      </span>
                      <span className="process-header-agency">
                        {/* {userData.userInfo.agency.name} */}
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
                        <div
                          className="process-round"
                          onClick={() => {
                            // goInputFix(process.id);
                          }}
                        >
                          <div className="card-number">{`${index + 1}`}</div>
                          <div className="card-description">{`${process.description}`}</div>
                          <div className="icon-goprocess-big">
                            <div className="icon-goprocess-new">
                              <ion-icon
                                id="ionicon-arrow"
                                name="arrow-forward-circle-outline"
                              ></ion-icon>
                              <span className="process-toinputfix">
                                กรอกข้อมูล
                              </span>
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
          </div>
        </div>
      </main>
      <footer className="footer">
        2020 © งานประกันคุณภาพการศึกษา สำนักวิทยาเขตกำแพงแสน Kasetsart
        University
      </footer>
    </div>
  );
}
