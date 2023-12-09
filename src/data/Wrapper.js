import React from "react";
import Nav from "../components/NavigationBar";
//import SideBar from '../components/SideBar'

//Wrapping the data of SideBar for the frontend
function Wrapper(props) {
  return (
    <>
      <Nav />
      <div class="wrraper">
        {/* <div class="left-content">
                <SideBar />
                </div> */}
        <div class="right-content">{props.children}</div>
      </div>
    </>
  );
}

export default Wrapper;
