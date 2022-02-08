import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../../home/Layout";
import UploadImage from "../common/UploadImage";

export default function AddBook() {
  let token = localStorage.getItem("auth");
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [image, setImage] = useState()

  useEffect(() => {
    fetchCategory();
    fetchSubCategory();
  }, []);

  const fetchCategory = () => {
    axios
      .get(process.env.REACT_APP_API + "admin/category/list", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log("rrrrrr ", res);
        setCategory(res.data.list);
      });
  };

  const fetchSubCategory = () => {
    axios
      .get(process.env.REACT_APP_API + "admin/sub-category/list", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log("rrrrrr ", res);
        setSubCategory(res.data.list);
      });
  };

  const handleImageUpdate = (fileName) => {
    setImage(fileName)
  }

  let history = useHistory();
  const handleAdd = (e) => {
    e.preventDefault();
    console.log(e.target.name.value);
    console.log(e.target.author.value);
    console.log(e.target.publisher.value);
    console.log(e.target.amount.value);
    axios
      .post(
        process.env.REACT_APP_API + "admin/books/add",
        {
          bookName: e.target.name.value,
          authorName: e.target.author.value,
          publisher: e.target.publisher.value,
          amount: e.target.amount.value,
          categoryId: e.target.category.value,
          subCategoryId: e.target.subcategory.value,
          image
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log("aaaa", res);
        history.push("/book");
      })
      .catch((err) => {});
  };

  return (
    <Layout>
      <h1>Add Book</h1>
      <form onSubmit={handleAdd}>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Book Name</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                name="name"
                required
              />
            </div>
          </div>

          <div className="col-6">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Author</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                name="author"
                required
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Publisher</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder=""
                name="publisher"
                required
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Amount</label>
              <input
                type="number"
                className="form-control"
                id="formGroupExampleInput"
                placeholder=""
                name="amount"
                required
              />
            </div>
          </div>

          <div className="col-6">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Category</label>
              <select
                class="form-control"
                aria-label="Default select example"
                name="category"
                required
              >
                {category.map((cat) => {
                  return <option value={cat._id}>{cat.name}</option>;
                })}
              </select>
            </div>
          </div>

          <div className="col-6">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Sub Category</label>
              <select
                class="form-control"
                aria-label="Default select example"
                name="subcategory"
                required
              >
                {subcategory.map((subcat) => {
                  return <option value={subcat._id}>{subcat.name}</option>;
                })}
              </select>
            </div>
          </div>

          <div className="col-6">
          <label htmlFor="formGroupExampleInput">image:</label>
            <UploadImage handleImageUpdate={handleImageUpdate} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </Layout>
  );
}
