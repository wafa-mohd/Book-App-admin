import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../../home/Layout";
import UploadImage from "../common/UploadImage";

export default function AddSubCategory() {
  let token = localStorage.getItem("auth");
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState();

  useEffect(() => {
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
  }, []);

  const handleImageUpdate = (fileName) => {
    setImage(fileName);
  };

  let history = useHistory();
  const handleAdd = (e) => {
    e.preventDefault();
    console.log("fff", e.target.showInWebsite.checked);
    let token = localStorage.getItem("auth");
    axios
      .post(
        process.env.REACT_APP_API + "admin/sub-category/add",
        {
          name: e.target.name.value,
          category: e.target.category.value,
          showInWebsite: e.target.showInWebsite.checked,
          image,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log("rrrrr ", res);
        history.push("/sub-category");
      })
      .catch((err) => {});
  };

  return (
    <Layout>
      <form onSubmit={handleAdd}>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Sub Category Name</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Example input"
                name="name"
              />
            </div>
          </div>

          <div className="col-6">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Category</label>
              <select
                className="form-control"
                aria-label="Default select example"
                name="category"
              >
                {category.map((cat) => {
                  return <option value={cat._id}>{cat.name}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <UploadImage handleImageUpdate={handleImageUpdate} />
          </div>
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
              name="showInWebsite"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Show in Website
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </Layout>
  );
}
