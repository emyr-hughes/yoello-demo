import styled from "styled-components";
import React, { ChangeEvent, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import {
  Tab,
  Tabs,
  Typography,
  Modal,
  Backdrop,
  Fade,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { ProductListing, ProductImage, ProductImageContainer } from ".";
import { BEER_TAB_NAMES } from "../constants";
import { RootState } from "../state/store";
import { Product } from "../types";
import { addToBasket } from "../state/basketSlice";
import SortButtons from "./SortButtons";

const Slide = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: space-between;
`;

const TabsContainer = styled.div``;

const ModalContent = styled.div`
  background: #2a2a2a;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  display: flex;
  flex-direction: row;
`;

const DescriptionBlock = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
`;

const ImageAndButtonBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 5px;
`;

const useStyles = makeStyles({
  title: {
    color: "white",
  },
  text: {
    color: "white",
    fontSize: 14,
    marginBottom: 4,
  },
  button: {
    color: "black",
    fontWeight: "bold",
    background: "white",
    marginRight: 5,
  },
});

const BeerTabs = () => {
  const styles = useStyles();
  const [index, setIndex] = useState<number>(0);
  const [modalContent, setModalContent] = useState<Product>();
  const products = useSelector((state: RootState) => state.fetch.products);
  const dispatch = useDispatch();

  const changeIndex = (value: any) => {
    setIndex(value);
  };

  const tabChange = (event: ChangeEvent<{}>, value: any) => {
    setIndex(value);
  };

  const onAddToCart = () => {
    if (!modalContent) return;
    dispatch(addToBasket(modalContent));
    setModalContent(undefined);
  };

  if (!products.length) return <Typography>No products found.</Typography>;

  return (
    <TabsContainer>
      <Tabs
        value={index}
        onChange={tabChange}
        style={{ background: "#2a2a2a" }}
        variant="fullWidth"
        TabIndicatorProps={{
          style: { display: "none" },
        }}
      >
        {BEER_TAB_NAMES.map((name) => (
          <Tab
            label={name}
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
            }}
          />
        ))}
      </Tabs>
      <SwipeableViews animateHeight index={index} onChangeIndex={changeIndex}>
        <Slide>
          <SortButtons />

          <ProductList>
            {products.map((product) => (
              <ProductListing
                imageSrc={product.image_url}
                productAbv={product.abv.toString()}
                productName={product.name}
                onClick={() => setModalContent(product)}
              />
            ))}
          </ProductList>
        </Slide>
        <Slide>
          <SortButtons />

          <ProductList>
            {products
              .filter((element) => element.id % 2)
              .map((product) => (
                <ProductListing
                  imageSrc={product.image_url}
                  productAbv={product.abv.toString()}
                  productName={product.name}
                  onClick={() => setModalContent(product)}
                />
              ))}
          </ProductList>
        </Slide>
        <Slide>
          <SortButtons />

          <ProductList>
            {products
              .filter((element) => element.id % 3)
              .map((product) => (
                <ProductListing
                  imageSrc={product.image_url}
                  productAbv={product.abv.toString()}
                  productName={product.name}
                  onClick={() => setModalContent(product)}
                />
              ))}
          </ProductList>
        </Slide>
      </SwipeableViews>
      <div>
        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={Boolean(modalContent)}
          onClose={() => setModalContent(undefined)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={Boolean(modalContent)}>
            <ModalContent>
              <DescriptionBlock>
                <Typography className={styles.title} variant="h5">
                  {modalContent?.name}
                </Typography>
                <Typography className={styles.text}>
                  {modalContent?.tagline}
                </Typography>
                <Typography className={styles.text}>
                  {modalContent?.abv}
                </Typography>
                <Typography className={styles.text}>
                  {modalContent?.description}
                </Typography>
                <Typography className={styles.text}>
                  {modalContent?.food_pairing.join(", ")}
                </Typography>
              </DescriptionBlock>
              <ImageAndButtonBlock>
                <ProductImageContainer>
                  <ProductImage src={modalContent?.image_url} />
                </ProductImageContainer>
                <Button
                  className={styles.button}
                  variant="contained"
                  onClick={onAddToCart}
                >
                  ADD TO CART
                </Button>
              </ImageAndButtonBlock>
            </ModalContent>
          </Fade>
        </Modal>
      </div>
    </TabsContainer>
  );
};

export default BeerTabs;
