import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap'
import { Link, useParams } from "react-router-dom";
import Layout from "../../home/Layout";

export default function Book() {
  let token = localStorage.getItem("auth");
  const [book, setBook] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [stock, setStock] = useState(0)
  const [stockUpdateBook, setStockUpdateBook] = useState()
  
  let { id } = useParams();
 
  useEffect(() => {
   fetchBook()
  }, []);

const fetchBook=()=>{
  axios
      .get(process.env.REACT_APP_API + "admin/books/list", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log("rrrrrr ", res);
        setBook(res.data.book);
      });
  }


  const handleClose = () => {
    setShowModal(false)
  }

  const handleStockUpdate = (e) => {
    e.preventDefault()
    console.log(e.target.stock.value);
    axios.post(process.env.REACT_APP_API + "admin/books/update-stock/"+ stockUpdateBook,
      {
        stock: e.target.stock.value
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => {
      console.log("stock update ", res);
      fetchBook()
      setShowModal(false)
      setStock(0)
      setStockUpdateBook()
    })
    .catch((err) => {});
};
    
  const handleStockBtn = (id, stock) => {
    setShowModal(true)
    setStock(stock)
    setStockUpdateBook(id)
  }

  const handleDelete = (id) => {
    console.log("iiiiiiii ", id);
    let token = localStorage.getItem("auth");
    axios
      .delete(process.env.REACT_APP_API + "admin/books/remove/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        console.log("removed");
        fetchBook();
      });
  };

  return (
    <Layout>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h4 className="m-0 font-weight-bold text-primary float-left">
            Books
          </h4>
          <Link to="/book/add">
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
                <th scope="col">Book Name</th>
                <th scope="col">Author Name</th>
                <th scope="col">Publisher</th>
                <th scope="col">Amount</th>
                <th scope="col">Stock</th>
                <th scope="col">Category</th>
                <th scope="col">Sub-Category</th>
                <th scope="col">image</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {book.map((item, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.bookName}</td>
                    <td>{item.authorName}</td>
                    <td>{item.publisher}</td>
                    <td>{item.amount}</td>
                    <td>{item.stock}</td>
                    <td>{item.category?.name}</td>
                    <td>{item.subCategory?.name}</td>
                    <td><img src={process.env.REACT_APP_IMAGE_PATH + item.image} height="50px"></img></td>
                    <td>
                      {" "}
                      <Link to={"/book/edit/" + item._id}>
                        <button className="btn btn-warning mr-1">Edit</button>
                      </Link>
                      <button type="button" className="btn btn-outline-dark mr-1"  onClick={() => handleDelete(item._id)}>
                        {" "}
                        <i className="far fa-trash-alt" />

                      </button>
                      <button type="button" className="btn btn-outline-dark mr-1" onClick={() => handleStockBtn(item._id, item.stock)}>
                        Update Stock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <form onSubmit={handleStockUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Stock</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Stock Amount"
                name="stock"
                defaultValue={stock}
              />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button type="submit" className="btn btn-primary" >
            Save Changes
          </button>
        </Modal.Footer>
        
        </form>
      </Modal>
    </Layout>
  );
}
