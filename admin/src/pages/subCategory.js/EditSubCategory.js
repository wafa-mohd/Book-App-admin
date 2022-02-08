import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../home/Layout";
import UploadImage from "../common/UploadImage";


export default function EditSubCategory() {
  const [subCategory, setSubCategory] = useState();
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState();

  let { id } = useParams();
  useEffect(() => {
    console.log("pppppppppp ", id);
    let token = localStorage.getItem("auth");
    axios
      .get(process.env.REACT_APP_API + "admin/sub-category/id/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("a", res.data.subCategory.name);
        setSubCategory(res.data.subCategory);
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
        process.env.REACT_APP_API + "admin/sub-category/update/" + id,
        {
          name: e.target.subname.value,
          category: e.target.category.value,
          image,
          showInWebsite:e.target.showWebsite.checked
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
  console.log("cccccc ", subCategory);
  return (
    <Layout>
      <form onSubmit={handleEdit}>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Sub-Category Name</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder=""
                name="subname"
                defaultValue={subCategory?.name}
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
                  return <option value={cat._id} selected={cat._id === subCategory.category}>{cat.name}</option>;
                })}
              </select>
            </div>
          </div>
          </div>
          <div className="row">
          <div className="col-8">
            <UploadImage handleImageUpdate={handleImageUpdate} image={subCategory?.image} />
          </div>
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
              name="showWebsite"
              defaultChecked={subCategory?.showInWebsite}
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Show in Website
            </label>
          </div>
            </div> 
          

        
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </Layout>
  );
}
