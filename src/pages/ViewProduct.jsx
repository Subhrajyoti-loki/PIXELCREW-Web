import React, { useState, useEffect } from "react";
import {
  getAllProduct,
  getProduct,
  deleteProduct,
  editProduct,
} from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ViewProduct() {
  const [data, setData] = useState([]);
  const [editedId, setEditedId] = useState("");
  const [deletedId, setDeletedId] = useState("");
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [session, setSession] = useState("");

  useEffect(() => {
    GetAllData();
  }, []);

  // Get all data
  async function GetAllData() {
    try {
      const response = await getAllProduct();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Edit handler
  const handleEdit = async (id) => {
    setEditedId(id);
    try {
      const response = await getProduct(id);
      const product = Array.isArray(response.data)
        ? response.data[0]
        : response.data;

      setName(product.name);
      setDetails(product.details);
      setPrice(product.price);
      setSession(product.session);
      setEditDrawerOpen(true);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "details") {
      setDetails(value);
    } else if (name === "price") {
      setPrice(value);
    } else if (name === "session") {
      setSession(value);
    }
  };

  // OnSubmit handler for editing product
  const handleSubmit = async (event) => {
    event.preventDefault();
    const obj = {
      name,
      details,
      price,
      session,
    };
    try {
      const res = await editProduct(editedId, obj);
      if (res.status === 200 || res.status === 201) {
        toast.success("Product updated successfully");
        setEditDrawerOpen(false);
        GetAllData();
      } else {
        toast.error("Error occurred while updating product");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Delete handler
  const deleteHandler = async (id) => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
      setDrawerOpen(false);
      GetAllData();
    } catch (err) {
      toast.error("Error deleting product");
      console.log(err);
    }
  };

  const handleDeleteClick = (id) => {
    setDeletedId(id);
    setDrawerOpen(true);
  };

  const handleCancel = () => {
    setDrawerOpen(false);
    setDeletedId("");
  };

  const handleConfirm = () => {
    if (deletedId) {
      deleteHandler(deletedId);
    }
  };

  return (
    <div className="m-4">
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table id="basic-datatables" className="table table-hover">
              <thead className="thead-light">
                <tr className="text-center">
                  <th>Name</th>
                  <th>Price</th>
                  <th>Session</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td>{item.name}</td>
                      <td>&#8377;{item.price}</td>
                      <td>{item.session}</td>
                      <td title={item.details}>
                        {item.details.length > 30
                          ? `${item.details.substring(0, 30)}...`
                          : item.details}
                      </td>
                      <td className="text-center">
                        <div className="form-button-action m-0 p-0">
                          <button
                            type="button"
                            className="btn btn-icon btn-light btn-xs mx-1 p-0"
                            data-toggle="modal"
                            data-target="#editModal"
                            onClick={() => handleEdit(item._id)}
                          >
                            <i className="fas fa-user-edit text-info" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-icon btn-light btn-xs mx-1 py-0 px-1"
                            onClick={() => handleDeleteClick(item._id)}
                          >
                            <i className="fas fa-trash-alt text-danger" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Drawer
        anchor="right"
        open={editDrawerOpen}
        onClose={() => setEditDrawerOpen(false)}
      >
        <Box p={3} width={{ xs: "100%", sm: 400, md: "40vw" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
          >
            <Typography variant="h6">Edit Product</Typography>
            <IconButton
              color="primary"
              onClick={() => setEditDrawerOpen(false)}
            >
              <CloseIcon style={{ color: "red" }} />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="details">Details</label>
              <textarea
                type="text"
                id="details"
                name="details"
                className="form-control"
                value={details}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                className="form-control"
                value={price}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="session">Session</label>
              <input
                type="text"
                id="session"
                name="session"
                className="form-control"
                value={session}
                onChange={handleChange}
              />
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setEditDrawerOpen(false)}
                style={{ marginLeft: "10px" }}
              >
                Close
              </button>
            </div>
          </form>
        </Box>
      </Drawer>

      <Drawer anchor="right" open={drawerOpen} onClose={handleCancel}>
        <Box p={3} width={{ xs: "100%", sm: 400, md: "40vw" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
          >
            <Typography variant="h6">Confirm Deletion</Typography>
            <IconButton color="primary" onClick={handleCancel}>
              <CloseIcon style={{ color: "red" }} />
            </IconButton>
          </Box>
          <Typography>Are you sure you want to delete this product?</Typography>
          <Box display="flex" justifyContent="flex-end" marginTop={3}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleConfirm}
              style={{ marginRight: "10px" }}
            >
              Confirm
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </Box>
        </Box>
      </Drawer>

      <ToastContainer />
    </div>
  );
}

export default ViewProduct;
