import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { getAllPost, deletePost } from "../api/api";

function ViewPost() {
  const [Data, setData] = useState(null);
  const [deletedId, setDeletedId] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Fetch all post data
  const fetchData = async () => {
    try {
      const response = await getAllPost();
      setData(response.data);
    } catch (error) {
      console.log("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete handler
  const deleteHandler = async (id) => {
    
    try {
      await deletePost(id);
      toast.success("Post deleted successfully");
      setDrawerOpen(false);
      fetchData();
    } catch (err) {
      toast.error("Error deleting post");
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
    <div className="mt-4">
      <div className="container">
        <div className="row">
          {Data?.map((post) => (
            <div className="col-md-4" key={post._id}>
              <div
                className="card-post card-round"
                style={{
                  marginBottom: "20px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="separator-solid" style={{ padding: "10px" }}>
                  <div className="d-flex">
                    <div className="avatar">
                      <img
                        src={post?.user?.avatar}
                        alt="Profile"
                        className="avatar-img rounded-circle"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </div>
                    <div
                      className="info-post ml-2 mr-5"
                      style={{ marginLeft: "10px" }}
                    >
                      <p className="username">{post?.user?.username}</p>
                      <p className="date text-muted">
                        {moment(post?.createdAt).fromNow()}
                      </p>
                    </div>
                    <div className="info-post ml-5">
                      <p className="date text-muted">
                        {moment(post?.createdAt).format("MMMM Do")}
                      </p>
                    </div>
                  </div>
                </div>
                <PhotoProvider>
                <PhotoView src={post.thumbnail}>
                  <img
                    className="card-img-top"
                    src={post.thumbnail}
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
                  <div className="d-flex justify-content-between">
                    <h3
                      className="card-title"
                      style={{
                        marginBottom: "15px",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {post.title}
                    </h3>
                    <span className="text-info">
                      <i className="icon-like"></i> {post?.likeCount}
                    </span>
                  </div>
                  {/* <p className="card-text">{post.body}</p> */}
                  <div className="d-flex justify-content-end ">
                    <a
                      href="#"
                      className="btn btn-secondary btn-rounded btn-sm"
                      style={{ whiteSpace: "nowrap" }}
                      onClick={() => handleDeleteClick(post._id)}
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
          <Typography>Are you sure you want to delete this product?</Typography>
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

      <ToastContainer />
    </div>
  );
}

export default ViewPost;
