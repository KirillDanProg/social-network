import styled from "styled-components/dist/styled-components.esm";
import {device} from "../../common/mediaqueries/media";
import styles from "./Header.module.css";

export const StyledLogo = styled.span`
  display: none;
  @media ${device.tablet} {
    display: block;
  }
`

export const Logo = () => {
    return (
        <StyledLogo className={styles.logo}>VN</StyledLogo>
    )
}