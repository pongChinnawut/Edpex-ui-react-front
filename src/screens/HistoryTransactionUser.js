import React from "react";
import Cookie from "js-cookie";
import UserScreen from "./UserScreen";
import Axios from "axios";
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

  const arrProcess = [
    "คะแนนเฉลี่ยผลการประเมินความพึงพอใจของผู้รับบริการที่มีต่อการให้บริหารฝึกอบรมแต่ละด้านมีค่าเฉลี่ยเท่าบริการที่มีต่อ",
  ];

  React.useEffect(() => {
    Axios.get(
      `http://localhost:8080/api/v1/getTransaction/ByInputAndUserId?userId=${userData.userInfo.id}&inputId=2&nowDate=2020-09-25`
    ).then((res) => {
      settransactionApi(res.data);
    });
  }, []);

  const userInfo = [
    {
      id: 2,
      name: "สไว ทองแดงก่ำ",
      agency: {
        id: 4,
        name: "คณะศิลปศาสตร์และวิทยาศาสตร์",
      },
      phone: "000000000840830109",
      username: "sawaitransport",
      password: "1234",
      status: 1,
      roles: [],
    },
    {
      id: 3,
      name: "สวัสดี ครับผม",
      agency: {
        id: 2,
        name: "งานห้องสมุด",
      },
      phone: "00545445545",
      username: "สวัสดี",
      password: "1234",
      status: 0,
      roles: [],
    },
    {
      id: 4,
      name: "อาสาร สาวดี",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "0854215232",
      username: "arsarnsecurity",
      password: "12345",
      status: 1,
      roles: [],
    },
    {
      id: 12,
      name: "nickkkkk",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "0852665252",
      username: "pong",
      password: "1234",
      status: 1,
      roles: [],
    },
    {
      id: 13,
      name: "arkiee55",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "02828528",
      username: "sahawat",
      password: "$2a$10$ods/j3o1QXjs0hncKWkSJuq.WVa7/Ee5GeTQVo0l6zWDXdP6ubSkS",
      status: 1,
      roles: [],
    },
    {
      id: 14,
      name: "arkiee",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "02828528",
      username: "watfon",
      password: "$2a$10$ods/j3o1QXjs0hncKWkSJuq.WVa7/Ee5GeTQVo0l6zWDXdP6ubSkS",
      status: 1,
      roles: [],
    },
    {
      id: 15,
      name: "ทราย",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "0852665252",
      username: "sai",
      password: "$2a$10$Jf44/BbS7N8R.Z8S.7FscOhwWLDAZjRVDi4zq03q13O.ETtMGNPmG",
      status: 1,
      roles: [],
    },
    {
      id: 16,
      name: "pokk",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "0852665252",
      username: "pok",
      password: "$2a$10$9RRehGjcQchU4ksT34UQnuySmd7ac6juNJ1F8/NbzBIrq2rmuCp3q",
      status: 0,
      roles: [],
    },
    {
      id: 17,
      name: "pongchinnawut",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "0852665252",
      username: "pong",
      password: "$2a$10$OujFwLOmWmUaAu/.4eEQq.1rmXq/RXpaxqV5xc6zPZ05FKs2FPHFq",
      status: 1,
      roles: [],
    },
    {
      id: 18,
      name: "ppp",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "0852665252",
      username: "pong",
      password: "$2a$10$MK32w5LEMDiXXrjbYZ827.cJVLMKuoqitZdqmPcWh8NTeecIYFGUm",
      status: 1,
      roles: [],
    },
    {
      id: 19,
      name: "tin",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "0852665252",
      username: "tin",
      password: "$2a$10$Eij1rkIUN35EbYrQIRIn4OVBN2AsDtTqyiH8XcAn1cp1RcZ44lBJa",
      status: 1,
      roles: [],
    },
    {
      id: 20,
      name: "pattanapong",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "0852665252",
      username: "mai",
      password: "$2a$10$/s1p5OHDv5QktZr8IuWoLuElh.SlK6Dp4Cnc8ZnkNQwlc/Seg27lu",
      status: 0,
      roles: [],
    },
    {
      id: 21,
      name: "tle",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "0852665252",
      username: "tle",
      password: "$2a$10$S1DpANmIqC3unNj29cg52.ZMBC11j7q63JuaZw/9Ay.bJt66J6iAy",
      status: 0,
      roles: [],
    },
    {
      id: 22,
      name: "keng",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "0852665252",
      username: "keng",
      password: "$2a$10$5EI3DpvDyXLTDd8juQz28u99iM2nmHNr1thMlGgTyKI0CjemW/FDu",
      status: 0,
      roles: [],
    },
    {
      id: 23,
      name: "kong",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "0852665252",
      username: "kong",
      password: "$2a$10$q.MU5INDfmUii9Hl.p1OC.LNFgUYFSWjs9lfxNSX.bQ1maUBSv0nu",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 24,
      name: "game",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "0852665252",
      username: "game",
      password: "$2a$10$obCegqZQjhjBswGfAeLv.ux9sxSqQtDPDHX1.kLqfsUETB3.5KusO",
      status: null,
      roles: [],
    },
    {
      id: 25,
      name: "bent",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "0852665252",
      username: "bent",
      password: "$2a$10$l8NoqRqTXDijSMSYPmISDeyVBC/mp8T7UwzaA3B0PYkTlxYHK/Jeu",
      status: 1,
      roles: [],
    },
    {
      id: 26,
      name: "jasmin",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "0852665252",
      username: "jasmin",
      password: "$2a$10$HnBvmQmqEbhMWzsV3mL6A.9pLl.Ckf4wLHcEjBQYjUsGs0gui/KEO",
      status: 1,
      roles: [
        {
          id: 1,
          name: "ADMIN",
        },
      ],
    },
    {
      id: 27,
      name: "jame",
      agency: {
        id: 2,
        name: "งานห้องสมุด",
      },
      phone: "0852665252",
      username: "jasmin",
      password: "$2a$10$he/nAL8YWrj9Omsp/nmCuu2Bq9AsvP8R3dEiVVrIgX9S.eQTRIcfO",
      status: 1,
      roles: [],
    },
    {
      id: 28,
      name: "pear",
      agency: {
        id: 2,
        name: "งานห้องสมุด",
      },
      phone: "0852665252",
      username: "pear",
      password: "$2a$10$8AljNXAp5N//kihXaa1h1ekinhaBYCbJxuam5MxyWOPkqg3vHrLV6",
      status: 1,
      roles: [
        {
          id: 1,
          name: "ADMIN",
        },
      ],
    },
    {
      id: 29,
      name: "non",
      agency: {
        id: 2,
        name: "งานห้องสมุด",
      },
      phone: "0852665252",
      username: "non",
      password: "$2a$10$7ipwj6deK35pJ38fopgTbejV.ng7zUqAiY6uQPeBKNep6YcxFcrx6",
      status: 1,
      roles: [
        {
          id: 1,
          name: "ADMIN",
        },
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 37,
      name: "ชินน",
      agency: {
        id: 2,
        name: "งานห้องสมุด",
      },
      phone: "52525852",
      username: "chin",
      password: "$2a$10$O0MqTLyj.HH/oIq5ggfTDeX2xF/Da3S9L4zJAYxHFnC6xCXFVSlLi",
      status: null,
      roles: [],
    },
    {
      id: 38,
      name: "ชินนวุฒิ",
      agency: {
        id: 2,
        name: "งานห้องสมุด",
      },
      phone: "52525852",
      username: "chinwut",
      password: "$2a$10$q.NKtTfbMgtoJoC3U5gg6.3e2j2g6o9i/O6Hbx52k18XtoIuz5IQy",
      status: null,
      roles: [],
    },
    {
      id: 44,
      name: "sfsf",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "555",
      username: "xxx",
      password: "$2a$10$fz1XX63OyHn5Y4oj9mHx3OtHmb7QQmrO8NUzPgm6FLA.03vKzAFyG",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 56,
      name: "จัสมินบิลลี่",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "8585",
      username: "jjjppp",
      password: "$2a$10$83b.XNI2QWmk9Q6fiyA/5OrZ86rWBtLpuM.kfDg7ALjr7zDS5nzQu",
      status: null,
      roles: [],
    },
    {
      id: 57,
      name: "จัสมิน",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "852085",
      username: "sdfghjk",
      password: "$2a$10$i/CmjT2Zl/lA.ZdW6haiDeeK3Qf6VvyQFtnaUpJonnahp.aKP3SB.",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 58,
      name: "จัสมิน",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "5285",
      username: "ety",
      password: "$2a$10$COev8vb.UmheQg44UTtkiOmqtKpoahjGmgyoahxx8CaQU7ljfEPli",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 59,
      name: "ness",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "852",
      username: "nesspp",
      password: "$2a$10$y/mNEEIDZORcdKQRoDgmwegfEJ.NT0EtIVjc4bJYsfH9E1MZQ0phK",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 60,
      name: "xxyyzz",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "522",
      username: "xxyyzz",
      password: "$2a$10$k9iBTC07ec4B.oFwn4XOQu2OFXCCAkn0JEcbrEPF9C6yXUvZ3NJ5G",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 61,
      name: "vvv",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "852",
      username: "vvv",
      password: "$2a$10$8JDjEkJqb0ewtwM.QJpAxuZyZ7C7lnwNJ0sPKM495N22HYV5vTIKu",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 62,
      name: "vvv",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "882",
      username: "nnn",
      password: "$2a$10$Ao8/xerfZFYxXCt42xTwguCljxhZNC6PJ7/vz30E.6kgGvHpJKiVe",
      status: 1,
      roles: [
        {
          id: 1,
          name: "ADMIN",
        },
      ],
    },
    {
      id: 63,
      name: "ชินนวุฒฺ แก้วฉิม",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "85285",
      username: "ponggg",
      password: "$2a$10$jOesOIX6/6UQ9Q0BAyqQY./DcjJ925tenCKJFXhxAIMTq/idoE2/2",
      status: 1,
      roles: [
        {
          id: 1,
          name: "ADMIN",
        },
      ],
    },
    {
      id: 64,
      name: "hhh",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "852",
      username: "hhh",
      password: "$2a$10$TMkB2sBXX1Uor4hOsbBTK.ZzFv5ddy4639CyhKSIYpKFSmDJhe1J6",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 65,
      name: "นรินธรณ์ ศรีพรม",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "8524525524",
      username: "nui",
      password: "$2a$10$MFkEb2iDNompaQeueVYxy.X4ksRZ0W.eJWOTv0AZMyhF58pjcN.9m",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 66,
      name: "ศิริลักษณ์ มุขโฉ่ย",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "8528525",
      username: "mook",
      password: "$2a$10$/EKFNi5GpQMqh7J27QIYDufCaIOvJMaB9pUIa6WPWoF.sZlE.wnq.",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 67,
      name: "ปิโยรส คุ้มดี",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "85285255",
      username: "built",
      password: "$2a$10$c.HHqodmtbsYKsdJkLCOHeWIAiNmulauhKpBbV2xlgWQ2wuNhidoi",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 68,
      name: "ss",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "1234",
      username: "ss",
      password: "$2a$10$8abQ4yTpgOylBCFut7Yz5.eqO84WWmg/MybWsCUBBQljwegHx2YvW",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 69,
      name: "aa",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "852",
      username: "aa",
      password: "$2a$10$NeD7vrTZvScsCyfeao8RRu0uOudbDYePnO.iEhNLlsk4wC9t2NDxK",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 70,
      name: "uu",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "12345",
      username: "uu",
      password: "$2a$10$FwNyGNDrPA3sQEIc0Wk44O6Mhdc4q1rrkf15hlREJj6kVGkLUFH2i",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 71,
      name: "kk",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "852444",
      username: "kk",
      password: "$2a$10$yuz4R7z63Hu.Q9RA8VnPFeF77g4esXuLHft1po9sQRAxY8mfVhwIe",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 72,
      name: "dd",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "8525",
      username: "dd",
      password: "$2a$10$GdCjAwcul3EFJcHAQ.GD1OG93xgOoh9jmD8TaaAJhjPhLeFS6KxYG",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 73,
      name: "vv",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "85",
      username: "vv",
      password: "$2a$10$SU4d4NaCZawkJlR5qxiMYeq0VJt1oVACSBFGn6j0D61mEiURvwuaW",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 74,
      name: "mm",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "85255",
      username: "mm",
      password: "$2a$10$EpezIbhrVaC8t1p7zo80B.B6hM.LZI0oWtTEo.jyFMDsdTgPv1G5K",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 75,
      name: "sd",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "8525",
      username: "sd",
      password: "$2a$10$p0Tr4liviWcJYsr1X.7N..FT5lpgcbw3AJHYibMmRdVx.Ej21PGvu",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 76,
      name: "mn",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "852",
      username: "mn",
      password: "$2a$10$4//Q8O0Sj9vuHUXS8P/5eOZkcouWRxgNWUpRvRb7Z7WcXJrIotH7G",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 77,
      name: "bn",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "124552",
      username: "bn",
      password: "$2a$10$FlypH7eZdSJ8/atUP.wbYuy.r54pSFN1wVxnmd82f3PG1wWwFQnzW",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 78,
      name: "bv",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "8552",
      username: "bv",
      password: "$2a$10$ZKaZ1b0xlhNiVLVuK2jnrOfljT7nyznKNpFm6DXCwCjcr4xUHKWna",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 79,
      name: "pang",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "54445",
      username: "pang",
      password: "$2a$10$jQXJq7lL27EicgYzhbeYTurEUj2P7.EqMeb8FJj0FOOGJ82lIVYKC",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 80,
      name: "poo",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "852552",
      username: "poo",
      password: "$2a$10$LqzBj//.vlfojsuuqlqUAuMJ9Ath0YxvvUL5ZJTTdHDe2KBWd9vaq",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 81,
      name: "ชินนวุฒิแก้วฉิม",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "0852665252",
      username: "pk",
      password: "$2a$10$4oGZREBWSlgT/47fydjfqOeg6ykuf2q5dbLCwGPGBIILNMyIF6pAi",
      status: 1,
      roles: [
        {
          id: 1,
          name: "ADMIN",
        },
      ],
    },
    {
      id: 82,
      name: "ชินนวุฒิแก้วฉิม",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "00852665252",
      username: "pkk",
      password: "$2a$10$863NEgY5DT4f/byBlyZO4O2eiyVDTH8j1arlYo8kqdLrFuZ1U0AFC",
      status: 0,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 83,
      name: "zxz",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "555",
      username: "zxz",
      password: "$2a$10$VZhh.0DS/yQ9cF3FAzqX6eamk0e69GkP3bjeidAlO13QcUzF0W186",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 84,
      name: "mmm",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "252",
      username: "mmm",
      password: "$2a$10$2Kpa1aH81L4Y21dQArDE2.tgT5Nqw/JQ194HWgJdv45Bn10.ODlHq",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 85,
      name: "dgd",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "55",
      username: "dgd",
      password: "$2a$10$QN/0qYe9FHRFPXt5SVSruuNiiVj/WvDhADa.wkxY1o7Lxl.6kpQkS",
      status: 1,
      roles: [],
    },
    {
      id: 86,
      name: "cx",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "45",
      username: "cx",
      password: "$2a$10$DqAcgnpfOh3s8mGT9r2wA.oq4IhKYk3mZ8fNSurfLDkEjOs4pVkVe",
      status: 1,
      roles: [],
    },
    {
      id: 87,
      name: "dddf",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "5555",
      username: "dfdf",
      password: "$2a$10$TGuDE2IZ0Oat9NZL4FJxSuOhhGnPqKHshU3Fr7sukeNPa0Vq5h3Ui",
      status: 1,
      roles: [],
    },
    {
      id: 88,
      name: "fdfd",
      agency: {
        id: 1,
        name: "งานบริการอาคารและสถานที่กองบริหาร",
      },
      phone: "232",
      username: "dfdfdfd",
      password: "$2a$10$lHkTwOmNrytpoWR7funTR.6VBbJBCZ2wij5iZVdLLZQSvkKe5qBSK",
      status: 1,
      roles: [],
    },
    {
      id: 105,
      name: "นาย ชินนวัตร แก้วฉิม",
      agency: {
        id: 2,
        name: "งานห้องสมุด",
      },
      phone: "000000444",
      username: "pokkk",
      password: "$2a$10$hYvtmbxan1kkMSjG2I4ux.Xv6.Nfu7zpi1nLU64kLxKDxENwhZCx2",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
    {
      id: 106,
      name: "อานนท์ รุ่งเรือง",
      agency: {
        id: 3,
        name: "งานกีฬาภายนอกและภายใน",
      },
      phone: "00840830109",
      username: "arnon",
      password: "$2a$10$JfE2ovmj1wyC39OCX/0zdesI58EwgCYQPzhMYRTVHEhv4Dv6mcuY2",
      status: 1,
      roles: [
        {
          id: 3,
          name: "EXECUTIVE",
        },
      ],
    },
    {
      id: 108,
      name: "อลงกรณ์ ชุ่มชื่อ",
      agency: {
        id: 2,
        name: "งานห้องสมุด",
      },
      phone: "0852365212",
      username: "got",
      password: "$2a$10$nLNfNlZJkLp2DK/O.T7OuO/LlPisRZGEPU53D75o4KYcAOY.fo/iW",
      status: 1,
      roles: [
        {
          id: 2,
          name: "USER",
        },
      ],
    },
  ];

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
                <div className="background-inputfix">
                  <Table className="table table-hover ">
                    <Thead className="thead-danger">
                      <Tr className="head-table-column">
                        <Th scope="col">ลำดับ</Th>
                        <Th scope="col">ค่าข้อมูล</Th>
                        <Th scope="col">วันที่เกิด</Th>
                        <Th scope="col">วันที่แก้ไข</Th>
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
                            <Td>{user.jobDate}</Td>
                            <Td>{user.updateDate}</Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
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
