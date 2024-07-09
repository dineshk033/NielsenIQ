import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import styled from "@emotion/styled";

const StyledBackdrop = styled(Backdrop)`
  && {
    z-index: ${(props: any) => props.theme.zIndex.drawer + 1};
    color: #fff;
  }
`;

const BackdropSpinner: React.FC<{ open: boolean }> = ({ open }) => {
  return (
    <StyledBackdrop open={open}>
      <CircularProgress color="inherit" />
    </StyledBackdrop>
  );
};

export default BackdropSpinner;
