import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Nav from './Nav';
import Meta from './Meta';
import { useContext } from "react";

const Page  = (props) => {
 
        return (
          <div>
            <Meta />
            <Nav  />
            <div>{props.children}</div>
          </div>
        );
}

export default Page;


