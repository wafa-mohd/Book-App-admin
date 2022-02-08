import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../home/Layout";

export default function Category() {
  let token = localStorage.getItem("auth");

  const [category, setCategory] = useState([]);

  useEffect(() => {
    
    fetchCategory()
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

  const handleDelete = (id) => {
    console.log("iiiiiiii ", id);
    let token = localStorage.getItem("auth");
    axios
      .delete(process.env.REACT_APP_API + "admin/category/remove/" + id, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        console.log("removed");
        fetchCategory();
      });
  };
  return (
    <Layout>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h4 className="m-0 font-weight-bold text-primary float-left">
            Category List
          </h4>
          <Link to="/category/add">
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
                <th scope="col">Category Name</th>
              </tr>
            </thead>
            <tbody>
              {category.map((item, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>
                      <Link to={"/category/edit/" + item._id}>
                        <button className="btn btn-warning">Edit</button>
                      </Link>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-dark"
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
