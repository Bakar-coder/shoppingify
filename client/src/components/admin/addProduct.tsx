import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { errorMap } from "../../utils/errorMap";
import InputField from "../includes/InputField";
import { useAddProductMutation } from "../../generated/graphql";
import TextInputField from "../includes/TextField";

interface signinTypes {}

const Add: FC<signinTypes> = ({}) => {
  const [error, setError] = useState(`` as any);
  const [product, setProduct] = useState({
    title: "",
    stock: "",
    category: "",
    price: "",
    description: "",
    discount: "",
    discountExpiration: "",
    tags: "",
    featured: false,
    published: true,
  });

  const [file, setFile] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const {
    title,
    stock,
    category,
    price,
    description,
    discount,
    discountExpiration,
    tags,
    featured,
    published,
  } = product;

  const [{ fetching }, addProduct] = useAddProductMutation();
  const router = useRouter();
  const handleInputChange = (e: any) => {
    error && setError(``);
    (e.target.name === "price" ||
      e.target.name === "stock" ||
      e.target.name === "discount") &&
    e.target.value <= 0
      ? setProduct({ ...product, [e.target.name]: "" })
      : setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: any) => setFile(e.target.files);
  const handleSubmission = async (e: any) => {
    e.preventDefault();
    const { data } = await addProduct({
      ...product,
      stock: parseInt(stock),
      price: parseFloat(price),
      tags: tags ? tags : "",
      discount: discount && parseFloat(discount) > 0 ? discount : undefined,
      discountExpiration:
        discount && parseFloat(discount) > 0 ? discountExpiration : undefined,
      images: file,
    });
    if (data?.addProduct.errors)
      return setError(errorMap(data?.addProduct.errors));
    return router.push(`/shop/admin/dashboard`);
  };

  return (
    <div className="container-fluid">
      <form className="form" onSubmit={handleSubmission}>
        <div className="form__header">
          <h3>Add Product</h3>
          <p>Create a new product.</p>
        </div>
        <div className="row">
          <div className="col-md-6 col-12">
            <InputField
              error={error && error.title ? error.title : null}
              placeholder="Title"
              value={title}
              onChange={handleInputChange}
              name="title"
              required
            />
          </div>
          <div className="col-md-6 col-12">
            <InputField
              error={error && error.category ? error.category : null}
              placeholder="Category"
              value={category}
              onChange={handleInputChange}
              name="category"
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-12">
            <InputField
              error={error && error.stock ? error.stock : null}
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={handleInputChange}
              name="stock"
              min={0}
              required
            />
          </div>

          <div className="col-md-6 col-12">
            <InputField
              error={error && error.price ? error.price : null}
              placeholder="Price"
              type="number"
              value={price}
              onChange={handleInputChange}
              name="price"
              min={0}
              required
            />
          </div>
        </div>

        <InputField
          error={error && error.file ? error.file : null}
          placeholder="Image"
          type="file"
          name="file"
          onChange={handleFileChange}
          required
        />

        <InputField
          error={error && error.discount ? error.discount : null}
          placeholder="Discount"
          type="number"
          value={discount}
          onChange={handleInputChange}
          name="discount"
        />

        {discount && parseFloat(discount) > 0 && (
          <InputField
            error={
              error && error.discountExpiration
                ? error.discountExpiration
                : null
            }
            placeholder="Discount Expiration Date"
            type="date"
            value={discountExpiration}
            onChange={handleInputChange}
            name="discountExpiration"
          />
        )}

        <InputField
          error={error && error.tags ? error.tags : null}
          placeholder="Tags"
          value={tags}
          onChange={handleInputChange}
          name="tags"
        />

        <TextInputField
          error={error && error.description ? error.description : null}
          placeholder="Description"
          value={description}
          onChange={handleInputChange}
          name="description"
          required
        />

        <div className="row" style={{ marginBottom: "1rem" }}>
          <div className="col-6 mb-30">
            <input
              id="b_c_account"
              type="checkbox"
              name="published"
              value={`${featured}`}
              defaultChecked={featured}
              onClick={() => setProduct({ ...product, featured: !featured })}
            />
            <label className="righ_0" htmlFor="b_c_account">
              Featured
            </label>
          </div>

          <div className="col-6">
            <input
              id="featured"
              type="checkbox"
              name="published"
              value={`${published}`}
              defaultChecked={published}
              onClick={() => setProduct({ ...product, published: !published })}
            />
            <label className="righ_0" htmlFor="featured">
              Published
            </label>
          </div>
        </div>

        <button type="submit" className="button">
          Save
        </button>
      </form>
    </div>
  );
};

export default Add;
