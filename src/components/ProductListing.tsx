import styled from "styled-components";
import React from "react";

import { Typography } from "@material-ui/core";

interface ProductListingProps {
  imageSrc: string;
  productName: string;
  productAbv: string;
  onClick: () => void;
}

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductImageContainer = styled.div`
  border-radius: 10px;
  border: 2px solid black;
  height: 100px;
  width: 25px;
  padding: 5px;
  margin: 5px;
  padding-left: 38px;
  padding-right: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  max-width: 100px;
  max-height: 100px;
`;

const ProductListing = ({
  imageSrc,
  productName,
  productAbv,
  onClick,
}: ProductListingProps) => (
  <ProductContainer onClick={onClick}>
    <ProductImageContainer>
      <ProductImage src={imageSrc} alt="product" />
    </ProductImageContainer>
    <Typography style={{ maxWidth: 100 }} noWrap>
      {productName}
    </Typography>
    <Typography>{productAbv}</Typography>
  </ProductContainer>
);

export default ProductListing;
