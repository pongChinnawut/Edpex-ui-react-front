import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import TableUser from "./TableUser";
import AddUser from "./AddUser";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ContactsIcon from "@material-ui/icons/Contacts";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import EditIcon from "@material-ui/icons/Edit";
import SettingsPowerIcon from "@material-ui/icons/SettingsPower";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MailIcon from "@material-ui/icons/Mail";
import Cookie from "js-cookie";
import styled, { keyframes } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import {
  bounce,
  slideInRight,
  slideInLeft,
  fadeInLeft,
  fadeInRight,
  fadeOutLeft,
  fadeOutRight,
  fadeOutRightBig,
  flipInX,
} from "react-animations";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#e4e6e5",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    backgroundColor: "#e4e6e5",

    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3, 5), //อันแรกบนล่าง อัยสองซ้ายขวา
    backgroundColor: "#e4e6e5",
    height: `100vh`,
    // width: `100%`,
  },
}));

export default function AdminScreen(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [showTB, setShowTB] = React.useState(false);
  const [showAddUser, setShowAddUser] = React.useState(false);
  const userData = Cookie.getJSON("userData");
  const tableuser = Cookie.getJSON("tableuser");
  const adduser = Cookie.getJSON("adduser");

  const page = props.location.search
    ? props.location.search.split("=")[1] * 1
    : 0;
  // const page = props.match.params.page;

  // const productId = props.match.params.id; //แต่ถ้าเอาค่าจากurl ใช้ props.match.params.id
  // const qty = props.location.search //เอาค่าจาก ? แต่ต้องมา split
  //   ? props.location.search.split("=")[1] * 1
  //   : 1;

  React.useEffect(() => {
    // setShowAddUser(false);
    // setShowAddUser(false);
    //ต้อง and role เป็น adminไปด้วย เอาไป include
    console.log(`adduser = ${adduser}`);
    console.log(`tableuser = ${tableuser}`);
    const arr = [];
    userData.userInfo.roles.forEach((cur, index) => {
      arr.push(cur.id);
    });
    if (arr.includes(2)) {
      setTimeout(() => {
        props.history.push("/processuser");
      }, 1000);
    }
    // if (arr.includes(2)) { //ผู้บริหาร
    //   setTimeout(() => {
    //     props.history.push("/processuser");
    //   }, 1000);
    //   }
    if (!userData) {
      // Test ไป user ดูอีกทีว่าจะให้ไปไหน
      props.history.push("/");
    } else if (adduser && page == 1) {
      callAddUser();
      console.log(`adduserPage11 = ${adduser}`);
      // props.history.push("/adminscreen?page=1");
    } else if (tableuser && page == 2) {
      callUserTable();
      // props.history.push("/adminscreen?page=2");
    } else {
      Cookie.remove("tableuser");
      Cookie.remove("adduser");
      props.history.push("/adminscreen");
      // const arr = [];
      // userData.userInfo.roles.forEach((cur, index) => {
      //   arr.push(cur.id);
      // });
      // if (arr.includes(1)) {
      //   setTimeout(() => {
      //     props.history.push("/adminscreen");
      //   }, 1000);
      // } else if (arr.includes(1)) {
      //   setTimeout(() => {
      //     props.history.push("/user");
      //   }, 1000);
      // }
      // console.log("cookie");
      // console.log(userData);
    }
    return () => {};
  }, [adduser, tableuser]);

  const checkLogout = () => {
    Cookie.remove("userData");
    Cookie.remove("adduser");
    Cookie.remove("tableuser");
    props.history.push("/");
  };

  const callUserTable = () => {
    Cookie.remove("adduser");
    Cookie.set("tableuser", true);
    setShowTB(true);
    setShowAddUser(false);
    props.history.push("/adminscreen?page=2");
  };

  const callAddUser = () => {
    Cookie.remove("tableuser");
    Cookie.set("adduser", true);
    setShowAddUser(true);
    setShowTB(false);
    props.history.push("/adminscreen?page=1");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    // <BrowserRouter>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        // zIndex="0"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className="navbar-head" style={{ background: "#006765" }}>
          {/* <div className="left-close-open"> */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon style={{ fontSize: 30 }} />
          </IconButton>
          {/* <img className="img-left" src="kuleft.jpg"></img> */}
          {/* </div> */}

          <Typography>
            <div className="head-admin-welcome">
              <img src="kusmall.png" className="img-ku-small"></img>

              <strong className="welcome-admin"> ยินดีต้อนรับคุณ </strong>
              <font className="welcome-name">
                สุนทรีย์ภรณ์ กลิ่นปุบผาเริงภิรักภัดี
              </font>
              <div className="admin-word-nav-user">
                <div
                  className="head-nav-admin"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span
                    className="goadminword-user"
                    style={{
                      color: "#000",
                    }}
                  >
                    ADMIN
                  </span>
                </div>
              </div>
            </div>
          </Typography>
          <div className="logout-user" onClick={checkLogout}>
            {/* <p className="p-logout">ออกจากระบบ</p> */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: `6px`,
              }}
            >
              <div
                className="backlogout"
                style={{ display: "flex", alignItems: "center" }}
              >
                <span
                  className="goadminword-admin"
                  style={{
                    color: "rgba(222, 237, 238, 0.998)",
                  }}
                >
                  ออกจากระบบ
                </span>
              </div>
            </div>
            <div className="logo-logout-navbar">
              <ExitToAppIcon
                style={{ fontSize: 35, color: "#fff", marginRight: `-20px` }}
              />
            </div>
          </div>
          {/* <IconButton onClick={checkLogout}>
            <ExitToAppIcon style={{ fontSize: 30, color: "#fff" }} />
          </IconButton> */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        {/* <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon style={{ fontSize: 30 }}>
                <h3>ฟังก์ชันการใช้งาน</h3>
              </ChevronLeftIcon>
            )}
          </IconButton>
        </div> */}

        <Divider />
        <List style={{ marginTop: -8 }}>
          <ListItem
            Button
            style={{ background: "#006765c0" }}
            onClick={handleDrawerClose}
          >
            <ListItemIcon>
              <IconButton style={{ padding: 0 }}>
                <ChevronLeftIcon
                  style={{
                    fontSize: 40,
                    color: "#b2dfdb",
                    marginRight: 5,
                  }}
                />
              </IconButton>
              <ListItemText
                primary={
                  <Typography
                    style={{
                      color: "#e0f2f1",
                      fontSize: 17,
                      fontFamily: "kanit",
                      fontWeight: 500,
                      marginTop: 6,
                    }}
                  >
                    ฟังก์ชันการใช้งาน
                  </Typography>
                }
              />
            </ListItemIcon>
          </ListItem>
          {/* <Link to={"/adduser"} style={{ textDecoration: "none" }}> */}
          <ListItem button onClick={callAddUser} style={{ padding: 18 }}>
            <ListItemIcon>
              <PersonAddIcon
                style={{
                  fontSize: 25,
                  color: "#006765",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontFamily: "kanit",
                    fontWeight: 200,
                  }}
                >
                  เพิ่มข้อมูลผู้ใช้งาน
                </Typography>
              }
            />
          </ListItem>
          <Divider />
          {/* </Link> */}
          {/* <Link to={"/tableuser"} style={{ textDecoration: "none" }}> */}
          <ListItem button onClick={callUserTable} style={{ padding: 15 }}>
            <ListItemIcon>
              <AccountBoxIcon
                style={{
                  fontSize: 25,
                  color: "#006765",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontFamily: "kanit",
                    fontWeight: 200,
                  }}
                >
                  ข้อมูลผู้ใช้งานระบบ
                </Typography>
              }
            />
          </ListItem>
          <Divider />
          {/* </Link> */}
          <Link to={"/processuser"} style={{ textDecoration: "none" }}>
            <ListItem button>
              <ListItemIcon>
                <EditIcon
                  style={{
                    fontSize: 25,
                    color: "#006765",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    style={{
                      color: "#000",
                      fontSize: 16,
                      fontFamily: "kanit",
                      fontWeight: 200,
                    }}
                  >
                    เพิ่ม / แก้ไขกระบวนการ
                  </Typography>
                }
              />
            </ListItem>
            <Divider />
          </Link>
          <Link to={"/adduser"} style={{ textDecoration: "none" }}>
            <ListItem button style={{ padding: 15 }}>
              <ListItemIcon>
                <EqualizerIcon
                  style={{
                    fontSize: 25,
                    color: "#006765",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    style={{
                      color: "#000",
                      fontSize: 16,
                      fontFamily: "kanit",
                      fontWeight: 200,
                    }}
                  >
                    รายงานผลลัพธ์
                  </Typography>
                }
              />
            </ListItem>
            <Divider />
          </Link>
          <Link to={"/adduser"} style={{ textDecoration: "none" }}>
            <ListItem button style={{ padding: 15 }}>
              <ListItemIcon>
                <SettingsPowerIcon
                  style={{
                    fontSize: 25,
                    color: "#006765",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    style={{
                      color: "#000",
                      fontSize: 16,
                      fontFamily: "kanit",
                      fontWeight: 200,
                    }}
                  >
                    เปิด / ปิดระบบ
                  </Typography>
                }
              />
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {showTB ? <TableUser /> : <div></div>}
        {showAddUser ? <AddUser /> : <div></div>}
      </main>
    </div>
    // </BrowserRouter>
  );
}
