import React from 'react';
import styled from "styled-components";
import {device} from "../mediaqueries/media";

const StyledAvatar = styled.img<any>`
  border-radius: ${props => props.shape === "square" ? "20px" : "50%"};
  user-select: none;
  width: ${props => props.width || "60px"};
  
  @media ${device.tablet} {
    width: ${props => props.width || "150px"};

  }

`

export const Avatar = (props) => {
    return (
        <StyledAvatar {...props}/>
    );
};

