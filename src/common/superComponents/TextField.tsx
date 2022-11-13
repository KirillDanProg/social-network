import React, { FC, forwardRef} from 'react';
import styled from "styled-components";


const StyledTextField = styled.input`
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  margin-bottom: 6px;
  font-size: 20px;
  display: inline-block;
`
export const TextField: FC<any> = forwardRef((props, ref) => {

    return (
        <StyledTextField ref={ref} {...props}/>
    );
});

