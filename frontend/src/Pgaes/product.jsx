import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcums/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";
import { useProductContext } from "../Context/ProductContext";
import { Spinner, Modal } from "keep-react";

const Product = () => {
  const { allProducts, loading } = useProductContext();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  // checking if the data is available to use :3
  useEffect(() => {
    if (loading) {
      return;
    }
    const foundProduct = allProducts.find((e) => e._id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [loading, allProducts, productId]);

  return (
    product && (
      <div>
        <Breadcrum product={product} />
        <ProductDisplay product={product} />
        <DescriptionBox />
        <RelatedProducts />
        <Modal size="md" show={loading}>
          <Modal.Header>
            <Spinner color="info" size="lg" />
            {"   "}Loading...
          </Modal.Header>
        </Modal>
      </div>
    )
  );
};

export default Product;
