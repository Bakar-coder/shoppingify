import React, { FC } from "react";
import { ProductType, usePaginatedProductsQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import Card from "./shop/card";
import Carousel from "./sliders/caraousel";

interface indexTypes {}

const Home: FC<indexTypes> = ({}) => {
  const [{ data }] = usePaginatedProductsQuery({
    variables: { limit: 3 },
    pause: isServer(),
  });
  const products = data?.paginatedProducts.products;
  return (
    <>
      <div className="slider">
        <Carousel />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="row shop_wrapper">
              {products &&
                products.map((product) => (
                  <div
                    key={product.id}
                    className="col-lg-3 col-md-4 col-12 col-sm-6"
                  >
                    <div className="single_product">
                      <Card product={product as ProductType} />
                    </div>
                  </div>
                ))}
            </div>

            <div className="loadmore">
              <button className="button">Load More</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
