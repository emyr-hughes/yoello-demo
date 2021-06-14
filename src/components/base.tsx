import styled from "styled-components";

export const ProductImageContainer = styled.div`
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
  background: white;
`;

export const ProductImage = styled.img`
  max-width: 100px;
  max-height: 100px;
`;

export const SmallProductImageContainer = styled.div`
  border-radius: 10px;
  border: 2px solid black;
  height: 60px;
  width: 15px;
  padding: 5px;
  margin: 5px;
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
`;

export const SmallProductImage = styled.img`
  max-width: 60px;
  max-height: 60px;
  z-index: 2;
`;
