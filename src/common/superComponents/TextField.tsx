import React, { FC, forwardRef} from 'react';
import styled from "styled-components";


const StyledTextField = styled.input<any>`
  width: ${props => props.width};
  padding: ${props => props.padding || "8px 20px"};
  border: ${props => props.border || "none"};
  border-radius: ${props => props.borderRadius || "5px"};
  margin-bottom: ${props => props.margin || "0"};
  font-size: 20px;
  display: inline-block;
  &:focus {
    outline-width: ${props => props.focus};
  }
`
export const TextField: FC<any> = forwardRef((props, ref) => {

    return (
        <StyledTextField ref={ref} {...props}/>
    );
});

