import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AdminNavbar from "../components/layout/AdminNavbar";
import LogoBar from "../components/layout/LogoBar";
import AdminSidebar from "../components/layout/AdminSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { GetAllImage, deleteImage } from "../api/api";
import moment from "moment";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";

const AddImage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const [img, setImg] = useState(null);
  const [imageList, setImageList] = useState(null);
  const [preview, setPreview] = useState(null);
  const [deletedId, setDeletedId] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await GetAllImage();
      setImageList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //handleImage
  const handleImage = (event) => {
    const file = event.target.files[0];
    setImg(file);
    setPreview(URL.createObjectURL(file));
  };

  //onsubmit function
  const onsubmit = async (data) => {
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("img", img);

    const token = localStorage.getItem("token");
    try {
      const response = axios.post("http://localhost:50/api/gallery", formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Image Upload successfully");
      fetchData();
      reset();
      setImg(null);
      setPreview(null);
      
    } catch (error) {
      toast.error("Error when uploading image");
    }
  };

 

  // Delete handler
  const deleteHandler = async (id) => {
    try {
      await deleteImage(id);
      toast.success("Image deleted successfully");
      setDrawerOpen(false);
      fetchData();
    } catch (err) {
      toast.error("Error deleting image");
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
    <div className="wrapper">
      <div className="main-header">
        <LogoBar />
        <AdminNavbar />
      </div>
      <AdminSidebar />

      <div className="main-panel">
        <div className="content">
          <div className="page-inner">
            <div className="mt-4">
              <form onSubmit={handleSubmit(onsubmit)}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group d-flex align-items-center">
                      <label
                        className="mr-2"
                        htmlFor="title"
                        style={{ width: "30%" }}
                      >
                        Title *:
                      </label>
                      <input
                        type="text"
                        {...register("title", {
                          required: "Title is required",
                        })}
                        id="title"
                        className="form-control"
                      />
                      {errors.title && (
                        <span className="text-danger ml-2">
                          {errors.title.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group d-flex align-items-center">
                      <label
                        className="mr-2"
                        htmlFor="img"
                        style={{ width: "30%" }}
                      >
                        Image *:
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        {...register("img", { required: "File is required" })}
                        onChange={handleImage}
                      />
                      {errors.img && (
                        <span className="text-danger ml-2">
                          {errors.img.message}
                        </span>
                      )}
                    </div>
                  </div>
                  {preview && (
                    <div className="col-md-4">
                      <div
                        className="image-preview"
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        <img
                          src={preview}
                          alt="Preview"
                          style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: "250px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="row mt-4">
                  <div className="col-md-4 d-flex align-items-center">
                    <button className="btn btn-primary" type="submit">
                      Upload
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="mt-4">
              <div className="row">
                {imageList?.map((item) => (
                  <div className="col-md-4">
                    <div
                      className="card-post card-round"
                      style={{
                        marginBottom: "20px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div
                        className="separator-solid"
                        style={{ padding: "10px" }}
                      >
                        <div className="d-flex justify-content-between">
                          <div
                            className="info-post ml-2 mr-5"
                            style={{ marginLeft: "10px" }}
                          >
                            <p className="username">{item.title}</p>
                          </div>
                          <div className="info-post">
                            <p className="date text-muted">
                              {moment(item?.createdAt).fromNow()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <PhotoProvider>
                        <PhotoView src={item.img}>
                          <img
                            className="card-img-top"
                            src={item.img}
                            alt="Card"
                            style={{
                              maxHeight: "200px",
                              objectFit: "cover",
                              borderTopLeftRadius: "8px",
                              borderTopRightRadius: "8px",
                              cursor: "pointer",
                            }}
                          />
                        </PhotoView>
                      </PhotoProvider>
                      <div className="card-body" style={{ padding: "15px" }}>
                        <div className="d-flex justify-content-end ">
                          <button
                            type="button"
                            className="btn btn-icon btn-light btn-xs mx-1 py-0 px-1"
                            onClick={() => handleDeleteClick(item._id)}
                          >
                            <i className="fas fa-trash-alt text-danger" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
              <Typography>
                Are you sure you want to delete this product?
              </Typography>
              <Box display="flex" justifyContent="flex-end" marginTop={3}>
                <button
                  type="button"
                  className="btn btn-secondary"
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
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddImage;
