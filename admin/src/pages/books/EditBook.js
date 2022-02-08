import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../home/Layout";
import UploadImage from "../common/UploadImage";


export default function EditBook() {
  const [book, setBook] = useState();
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [image, setImage] = useState();


  let { id } = useParams();
  useEffect(() => {
    console.log("book id:", id);
    let token = localStorage.getItem("auth");
    axios
      .get(process.env.REACT_APP_API + "admin/books/ById/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("book details", res.data.book);
        setBook(res.data.book);
      });

    axios
      .get(process.env.REACT_APP_API + "admin/category/list", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("category list ", res);
        setCategory(res.data.list);
      })
      .catch((err) => {});

    axios
      .get(process.env.REACT_APP_API + "admin/sub-category/list", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("sub-category list ", res);
        setSubCategory(res.data.list);
      })
      .catch((err) => {});
  }, []);

  const handleImageUpdate = (fileName) => {
    setImage(fileName);
  };


  let history = useHistory();
  const handleEdit = (e) => {
    e.preventDefault();
    console.log(e.target.name.value);
    let token = localStorage.getItem("auth");
    axios
      .put(
        process.env.REACT_APP_API + "admin/books/update/" + id,
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
        console.log("rrrrr ", res);
        history.push("/book");
      })
      .catch((err) => {});
  };
    console.log("cccccc ", category);
    console.log("cccccc ", subCategory);
  return (
    <Layout>
      <form onSubmit={handleEdit}>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Book Name</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Book Name"
                name="name"
                defaultValue={book?.bookName}
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
                placeholder="Example input"
                name="author"
                defaultValue={book?.authorName}
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
                placeholder="Example input"
                name="publisher"
                defaultValue={book?.publisher}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Amount</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Example input"
                name="amount"
                defaultValue={book?.amount}
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
              >
                {category.map((cat) => {
                  return (
                    <option
                      value={cat._id}
                      selected={cat._id === book.category}
                    >
                      {cat.name}
                    </option>
                  );
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
                {subCategory.map((subCat) => {
                  return (
                    <option
                      value={subCat._id}
                      selected={subCat._id === book.subCategory}
                    >
                      {subCat.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col-6">
            <UploadImage handleImageUpdate={handleImageUpdate} image={book?.image} />
          </div>


        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </Layout>
  );
}
