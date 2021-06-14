import { ReactNode } from "react";
import styled from "styled-components";

const Placeholder = styled.div`
  background: #2a2a2a;
`;

interface TabPanelProps {
  children: ReactNode;
  index: number;
  value: number;
}
const TabPanel = ({ children, index, value }: TabPanelProps) => (
  <div>{value === index && <Placeholder>{children}</Placeholder>}</div>
);

export default TabPanel;
