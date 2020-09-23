import React, { useState } from "react";
// 15.40

const User = (props) => {
return <React.Fragment >User: {props.email} {props.children} </React.Fragment>
};



export default User;
