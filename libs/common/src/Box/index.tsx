import styled from "@emotion/styled";

import React from "react";

type Props = {
  children?: React.ReactNode;
};
const DivBox = styled.div`
  background-color: cyan;
`;

export function Box({children}: Props) {
  return <DivBox>{children}</DivBox>;
}

export default Box;