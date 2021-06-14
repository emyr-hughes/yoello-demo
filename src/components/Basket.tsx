import React, { useState } from "react";

import styled from "styled-components";

import {
  Button,
  ButtonGroup,
  Drawer,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Add, Delete, Remove } from "@material-ui/icons";
import { SmallProductImage, SmallProductImageContainer } from "./base";
import { RootState } from "../state/store";
import {
  addToBasket,
  removeAllFromBasket,
  removeFromBasket,
} from "../state/basketSlice";

const BasketLip = styled.div`
  background: #2a2a2a;
  height: 50px;
  max-width: 450px;
  width: 100%;
  position: fixed;
  bottom: 0px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BasketHeader = styled.div`
  background: #2a2a2a;
  height: 50px;
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BasketItems = styled.div`
  display: flex;
  background: #2a2a2a;
  width: 100%;
  max-width: 450px;
  flex-direction: column;
  max-height: 600px;
`;

const BasketContent = styled.div`
  display: flex;
  background: #2a2a2a;
  width: 100%;
  max-width: 450px;
  flex-direction: column;
  max-height: 600px;
  align-items: center;
`;

const ItemContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ItemPrice = styled.text`
  background: #f5bd1f;
  border-radius: 5px;
  position: absolute;
  font-weight: bold;
  padding: 3px;
  margin-left: 70px;
  margin-bottom: 60px;
`;

const useStyles = makeStyles({
  paper: {
    background: "#2a2a2a",
    maxWidth: 450,
    alignSelf: "center",
  },
  basketTitleText: {
    color: "white",
    fontWeight: 600,
    fontSize: 14,
  },
  text: {
    color: "white",
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "bold",
    marginTop: 20,
  },
  additional: {
    color: "white",
    fontSize: 12,
    marginBottom: 4,
  },
  removeIcon: {
    border: "1px solid white",
    color: "white",
    borderRadius: 5,
    fontSize: 30,
  },
  addIcon: {
    border: "1px solid white",
    color: "white",
    borderRadius: 5,
    fontSize: 30,
  },
  deleteIcon: {
    color: "#B86566",
    borderRadius: 5,
    fontSize: 40,
  },
  quantityText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonGroup: {
    background: "#f5bd1f",
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
  },
  subText: {
    fontSize: 16,
    color: "white",
    marginTop: 20,
    textAlign: "right",
    fontWeight: "bold",
  },
});

const Basket = () => {
  const styles = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [tips, setTips] = useState<number>(0);
  const basket = useSelector((state: RootState) => state.basket.contents);
  const dispatch = useDispatch();
  const toggleDrawer =
    (value: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(value);
    };

  const total = basket.reduce(
    (accumulator, element) => accumulator + element.abv * element.quantity,
    0
  );

  return (
    <div>
      {!open && (
        <BasketLip onClick={toggleDrawer(true)}>
          <Typography className={styles.basketTitleText}>
            Shopping Cart
          </Typography>
        </BasketLip>
      )}
      <Drawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        classes={{ paper: styles.paper }}
        style={{ width: 400 }}
      >
        <BasketHeader>
          <Typography className={styles.basketTitleText}>
            Shopping Cart
          </Typography>
        </BasketHeader>
        <BasketContent>
          <BasketItems>
            {basket.map((item) => (
              <ItemContainer>
                <SmallProductImageContainer>
                  <SmallProductImage src={item.image_url} />
                  <ItemPrice>£{item.abv.toFixed(2)}</ItemPrice>
                </SmallProductImageContainer>
                <div style={{ width: 140 }}>
                  <Typography className={styles.text}>{item.name}</Typography>
                  <Typography className={styles.additional}>
                    {item.tagline}
                  </Typography>
                </div>
                <IconButton onClick={() => dispatch(removeFromBasket(item))}>
                  <Remove className={styles.removeIcon} />
                </IconButton>
                <Typography className={styles.quantityText}>
                  {item.quantity}
                </Typography>
                <IconButton onClick={() => dispatch(addToBasket(item))}>
                  <Add className={styles.addIcon} />
                </IconButton>
                <IconButton onClick={() => dispatch(removeAllFromBasket(item))}>
                  <Delete className={styles.deleteIcon} />
                </IconButton>
              </ItemContainer>
            ))}
          </BasketItems>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button className={styles.buttonGroup} onClick={() => setTips(0)}>
              ZERO
            </Button>
            <Button
              className={styles.buttonGroup}
              onClick={() => setTips(Math.ceil(total) - total)}
            >
              ROUND UP
            </Button>
            <Button
              className={styles.buttonGroup}
              onClick={() => setTips(total * 0.1)}
            >
              10%
            </Button>
            <Button
              className={styles.buttonGroup}
              onClick={() => setTips(1337)}
            >
              CUSTOM
            </Button>
          </ButtonGroup>
          <Typography className={styles.subText}>
            Subtotal: £{total.toFixed(2)}
          </Typography>
          <Typography className={styles.subText}>
            Tips: £{tips.toFixed(2)}
          </Typography>
          <Typography className={styles.subText}>
            Total: £{(total + tips).toFixed(2)}
          </Typography>
        </BasketContent>
      </Drawer>
    </div>
  );
};

export default Basket;
