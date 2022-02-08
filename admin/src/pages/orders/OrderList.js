import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../home/Layout";

export default function OrderList() {
  let token = localStorage.getItem('auth')
  const [order, setorder] = useState([]);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = () => {
    axios.get(process.env.REACT_APP_API + "admin/orders/list", {
      headers: {
        Authorization: token,
      },
    }).then(res=>{
      console.log("order",res);
      setorder(res.data.orders)
    }).catch(err=>{})
  }

  const handleStatusUpdate =(e, id)=>{
    e.preventDefault()
    console.log('ID ',id, e.target.status.value);
    axios.post(process.env.REACT_APP_API + "admin/orders/update-status/" + id, {
      status: e.target.status.value
    },{
      headers: {
        Authorization: token,
      },
    }).then( res => {
      fetchOrder()
    })

  }

  return (
    <Layout>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h4 className="m-0 font-weight-bold text-primary float-left">
            Orders
          </h4>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Book Name</th>
                <th scope="col">User</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {order.map((item,index)=>{
                return(
                  <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.book?.bookName}</td>
                  <td>
                    <p>Name: {item.name}</p>
                    <p>Mobile: {item.mobileNumber}</p>
                    <p>Address: {item.deliveryAddress}</p>
                  </td>
                  <td>{item.bookAmount}</td>
                  <td>{item.status}</td>
                  <td>
                    <form onSubmit={(e) => handleStatusUpdate(e,item._id)} className="d-flex" >
                    <select class="form-control" aria-label="Default select example" name="status" defaultValue={item.status}>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="out for delivery">Out for delivery</option>
                      <option value="delivered">Delivered</option>
                    </select>
                    <button type="submit" class="btn btn-primary btn-sm"><i class="fas fa-check"></i></button>
                    </form>
                  </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
