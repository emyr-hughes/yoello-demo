import { Button, ButtonGroup } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import {
  abvAscending,
  abvDescending,
  nameAscending,
  nameDescending,
  resetSort,
} from "../state/fetchSlice";

const SortButtons = () => {
  const dispatch = useDispatch();
  return (
    <ButtonGroup style={{ marginTop: 10 }} size="small">
      <Button onClick={() => dispatch(abvAscending())}>ABV ↑</Button>
      <Button onClick={() => dispatch(abvDescending())}>ABV ↓</Button>
      <Button onClick={() => dispatch(nameAscending())}>NAME ↑</Button>
      <Button onClick={() => dispatch(nameDescending())}>NAME ↓</Button>
      <Button onClick={() => dispatch(resetSort())}>RESET</Button>
    </ButtonGroup>
  );
};

export default SortButtons;
