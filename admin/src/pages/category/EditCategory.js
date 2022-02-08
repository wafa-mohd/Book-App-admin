import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../home/Layout";

export default function EditCategory() {

    const [category, setCategory] = useState()

    let {id} = useParams()
    useEffect(() => {
        console.log('pppppppppp ',id);
        let token = localStorage.getItem("auth")
        axios.get(process.env.REACT_APP_API +"admin/category/id/"+ id, {
            headers: {
                Authorization: 'Bearer '+token
            } 
        }).then(res =>{
            console.log("a",res.data.category.name);
            setCategory(res.data.category)
        })
    }, [])

    let history = useHistory()
    const handleEdit = e => {
        e.preventDefault()
        console.log(e.target.name.value);
        let token = localStorage.getItem("auth")
        axios.put(process.env.REACT_APP_API +"admin/category/update/"+id,{ 
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
    console.log('cccccc ',category);
  return (
    <Layout>
      <form onSubmit={handleEdit}>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Category Name</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder=""
                name="name"
                defaultValue={category?.name}
              />
            </div>
          </div>


        </div>
        <button type="submit" className="btn btn-primary">Save</button> 
        
      </form>
    </Layout>
  );
}
