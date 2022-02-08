import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../home/Layout";

export default function SubCategory() {
  let token = localStorage.getItem("auth");
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    fetchSubCategory()
  }, []);

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

  const handleDelete = (id) => {
    console.log("iiiiiiii ", id);
    let token = localStorage.getItem("auth");
    axios
      .delete(process.env.REACT_APP_API + "admin/sub-category/remove/" + id, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        console.log("removed");
        fetchSubCategory();
      });
  };
  return (
    <Layout>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h4 className="m-0 font-weight-bold text-primary float-left">
            Sub-Category List
          </h4>
          <Link to="/sub-category/add">
            <button type="button" className="btn btn-primary float-right">
              Add
            </button>
          </Link>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Name</th>
                <th scope="col">Category </th>
                <th scope="col">image</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {subCategory.map((item, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.category.name}</td>
                    {console.log('process.env.REACT_IMAGE_PATH ',process.env.REACT_APP_IMAGE_PATH)}
                    <td><img src={process.env.REACT_APP_IMAGE_PATH + item.image} height="50px" /></td>
                    <td>
                      <Link to={"/sub-category/edit/" + item._id}>
                        <button className="btn btn-warning">Edit</button>
                      </Link>
                      <button
                        type="button"
                        class="btn btn-outline-dark ml-1"
                        onClick={() => handleDelete(item._id)}
                      >
                        {" "}
                        <i className="far fa-trash-alt" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
