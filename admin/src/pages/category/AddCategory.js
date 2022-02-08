import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import Layout from "../../home/Layout";

export default function AddCategory() {

    let history = useHistory()
    const handleAdd = e => {
        e.preventDefault()
        console.log(e.target.name.value);
        let token = localStorage.getItem("auth")
        axios.post(process.env.REACT_APP_API +"admin/category/add",{ 
            name:e.target.name.value,
        }, {
            headers: {
                Authorization: 'Bearer '+token
            }
        }).then(res => {
          console.log('rrrrr ',res);
          history.push("/category")
        }).catch(err => {

        })
    }
  return (
    <Layout>
      <form onSubmit={handleAdd}>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Category Name</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Example input"
                name="name"
              />
            </div>
          </div>


        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </Layout>
  );
}
