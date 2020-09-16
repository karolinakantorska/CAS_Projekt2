import UpdateGuide from "../components/CreateGuide";
import React from "react";


const Guides = (props) => (
  <div>
    <p>Add new MTB Guide</p>
    <UpdateGuide id={props.query.id} />
  </div>
);

export default Guides;

