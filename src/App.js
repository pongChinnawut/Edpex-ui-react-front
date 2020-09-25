import React from "react";
import { Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AdminScreen from "./screens/AdminScreen";
import TableUser from "./screens/TableUser";
import AddUser from "./screens/AddUser";
import TestDrawer from "./screens/TestDrawer";
import TestForm from "./screens/TestFormBoot";
import UserScreen from "./screens/UserScreen";
import ProcessUser from "./screens/ProcessUser";
import TestMapOutput from "./screens/TestMapOutput7";
import ProcessUserEdit from "./screens/ProcessUserButton";
import TestNon from "./screens/TestNon";
import TestFormik from "./screens/TestFormik";
import TestGrid from "./screens/TestGrid";
import AddTransaction from "./screens/AddTransaction";
import HistoryTransactionUser from "./screens/HistoryTransactionUser";
// import TestModalMDB from "./screens/TestModalMDB";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <Route exact={true} path="/" component={HomeScreen}></Route>
        <Route path="/adminscreen" component={AdminScreen}></Route>
        <Route path="/tableuser" component={TableUser}></Route>
        <Route path="/adduser" component={AddUser}></Route> */}
        <Route exact={true} path="/" component={HomeScreen}></Route>
        <Route path="/homelogin" component={HomeScreen}></Route>
        <Route path="/adminscreen" component={AdminScreen}></Route>
        {/* <Route   path="/adminscreen?" component={AdminScreen}></Route> */}
        <Route path="/tableuser" component={TableUser}></Route>
        <Route path="/userscreen" component={UserScreen}></Route>
        <Route exact={true} path="/processuser" component={ProcessUser}></Route>
        <Route path="/processuserinput" component={ProcessUserEdit}></Route>
        <Route path="/addtransaction" component={AddTransaction}></Route>
        <Route
          path="/historytransactionuser"
          component={HistoryTransactionUser}
        ></Route>
        {/* <Route path="/inputfix/:id" component={ProcessUserEdit}></Route> */}
        <Route path="/mapoutput7" component={TestMapOutput}></Route>
        <Route path="/testnon" component={TestNon}></Route>
        <Route path="/testgrid" component={TestGrid}></Route>
        <Route path="/formik" component={TestFormik}></Route>

        {/* <Route path="/adduser" component={AddUser}></Route> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
