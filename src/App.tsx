import styled from "styled-components";
import React from "react";
import "./index.css";

import { useDispatch } from "react-redux";
import { MainTabs, Basket } from "./components";
import { fetchProducts } from "./state/fetchSlice";

const Container = styled.div`
  display: flex;
  background: red;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  max-width: 450px;
  margin: auto;
`;

const TitleText = styled.header`
  color: black;
  font-family: sans-serif;
  font-weight: bold;
  margin-top: 10px;
  align-self: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const App = () => {
  const dispatch = useDispatch();

  dispatch(fetchProducts());

  return (
    <Container>
      <TitleText>Demo App</TitleText>
      <MainTabs />
      <Basket />
    </Container>
  );
};
export default App;
