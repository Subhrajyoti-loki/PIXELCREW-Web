import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/layout/Navbar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllPost,
  getUsers,
  getAllProduct,
  getPost,
  ProductBooking,
  likePost,
  commentPost,
} from "../api/api";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
function Feed() {
  const userId = localStorage.getItem("userid");
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState(null);
  const [Data, setData] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [preview, setPreview] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
  const [commentPostId, setCommentPostId] = useState(null);
  const [PostData, setPostData] = useState(null);
  const [viewdrawerOpen, setViewDrawerOpen] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const response = await getUsers(userId);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setUserData(response.data[0]);
        if (!response.data[0].avatar) {
          window.$("#avatarModal").modal("show");
        }
      } else {
        console.error("Unexpected response data format:", response.data);
      }
    } catch (error) {
      console.log("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // Fetch all post data
  const fetchData = async () => {
    try {
      const response = await getAllPost();
      setData(response.data);
    } catch (error) {
      console.log("Error fetching user data:", error.message);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle avatar update
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("avatar", avatar);

    if (!avatar) {
      return toast.error("Please select an image");
    }

    const promise = axios.patch(
      `https://pixelcrew-server.onrender.com/api/user/avatar/${userId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    try {
      const response = await toast.promise(promise, {
        pending: "Updating avatar...",
        success: "Avatar updated successfully",
        error: "Failed to update avatar",
      });
      setPreview(null);
      fetchUserData();
    } catch (error) {
      toast.error("Error updating avatar");
    }

    window.$("#avatarModal").modal("hide");
  };

  const handleSkip = () => {
    window.$("#avatarModal").modal("hide");
  };

  // Fetch product list
  const fetchProducts = async () => {
    try {
      const response = await getAllProduct();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProduct = (id) => {
    setEditId(id);
    setDrawerOpen(true);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();

    try {
      const promise = ProductBooking({
        productId: editId,
        date: date,
      });

      const response = await toast.promise(promise, {
        pending: "Booking in progress...",
        success: "Booking successful",
        error: "Failed to create booking",
      });

      if (response.status === 201) {
        setDrawerOpen(false);
        setDate("");
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to create booking");
    }
  };

  //like handeler
  const handleLike = async (postId) => {
    try {
      const response = await likePost(postId);
      if (response.status === 200) {
        setData((prevData) =>
          prevData.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  likes: post.likes.includes(userId)
                    ? post.likes.filter((id) => id !== userId)
                    : [...post.likes, userId],
                }
              : post
          )
        );

        // Show toast notification
        if (response.data === "Post liked") {
          toast.info("Post liked!");
        } else {
          toast.info("Post unliked!");
        }

        fetchData();
      } else {
        toast.error("Failed to like/unlike the post");
      }
    } catch (error) {
      toast.error("Error liking/unliking the post");
    }
  };

  // Comment handlers
  const handleComment = (postId) => {
    setCommentPostId(postId);
    setCommentDrawerOpen(true);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await commentPost(commentPostId, { comment });
      if (response.status === 200) {
        toast.success("Comment added successfully");
        setCommentDrawerOpen(false);
        setComment("");
        fetchData();
      } else {
        toast.error("Failed to add comment");
      }
    } catch (error) {
      toast.error("Error adding comment");
    }
  };

  //handel view post
  const handleView = async (id) => {
    try {
      const response = await getPost(id);
      setPostData(response.data);
      setViewDrawerOpen(true);
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  // Render
  return (
    <div className="wrapper">
      <Navbar />
      <div className="container-fluid" style={{ padding: "5px  5px" }}>
        <div className="content">
          <div className="page-inner">
            <div className="row">
              <div className="col-md-4">
                <div className="my-3">
                  <h4 className="card-title">What's New Today?</h4>
                </div>
                <div style={{ maxHeight: "80vh", overflowY: "scroll" }}>
                  {loadingPosts ? (
                    <Box
                      sx={{
                        marginBottom: "20px",
                        padding: "10px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Stack spacing={1}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Skeleton variant="circular" width={50} height={50} />
                          <Box sx={{ marginLeft: "10px", flexGrow: 1 }}>
                            <Skeleton variant="text" width="80%" />
                            <Skeleton variant="text" width="60%" />
                          </Box>
                        </Box>
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={200}
                        />
                        <Skeleton variant="text" width="80%" />
                        <Skeleton variant="text" width="60%" />
                      </Stack>
                    </Box>
                  ) : (
                    Data &&
                    Data.map((post) => (
                      <div
                        className="card-post card-round"
                        style={{
                          marginBottom: "20px",
                          border: "1px solid #e0e0e0",
                          borderRadius: "8px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                        key={post._id}
                      >
                        <div
                          className="separator-solid"
                          style={{ padding: "10px" }}
                        >
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
                              <p className="username">
                                {post?.user?.username}{" "}
                              </p>
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
                        <img
                          className="card-img-top"
                          src={post?.thumbnail}
                          alt="Card"
                          style={{
                            maxHeight: "200px",
                            objectFit: "cover",
                            borderTopLeftRadius: "8px",
                            borderTopRightRadius: "8px",
                          }}
                        />
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
                          <p className="card-text">{post.body}</p>
                          <div className="d-flex justify-content-between">
                            <div className="row w-100" style={{ margin: "0" }}>
                              <div className="col-4 d-flex justify-content-center p-0">
                                <button
                                  className="btn btn-link btn-danger btn-lg"
                                  onClick={() => handleLike(post._id)}
                                >
                                  <i
                                    className={`fa${
                                      post.likes.includes(userId) ? "s" : "r"
                                    } fa-heart ${
                                      post.likes.includes(userId)
                                        ? "text-danger"
                                        : "text-dark"
                                    } fa-2x`}
                                  />
                                </button>
                              </div>
                              <div className="col-4 d-flex justify-content-center p-0">
                                <button
                                  className="btn btn-link btn-info btn-lg"
                                  onClick={() => handleComment(post._id)}
                                >
                                  <i className="far fa-comment-alt text-dark fa-2x" />
                                </button>
                              </div>
                              <div className="col-4 d-flex justify-content-center pt-2 pb-3">
                                <a
                                  href="#"
                                  className="btn btn-primary btn-rounded btn-sm"
                                  style={{ whiteSpace: "nowrap" }}
                                  onClick={() => handleView(post._id)}
                                >
                                  View More
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="col-md-8">
                <div className="my-3">
                  <h4 className="card-title">Book Your Appointment Now!</h4>
                </div>
                <div style={{ maxHeight: "80vh", overflowY: "scroll" }}>
                  {loadingProducts ? (
                    <Box
                      sx={{
                        marginBottom: "20px",
                        padding: "10px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Stack spacing={1}>
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="text" width="40%" />
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={60}
                        />
                      </Stack>
                    </Box>
                  ) : (
                    products?.map((product) => (
                      <div
                        className="card card-pricing card-pricing-focus card-secondary"
                        style={{ marginBottom: "20px" }}
                        key={product._id}
                      >
                        <div className="card-header">
                          <h4 className="card-title">{product.name}</h4>
                          <div className="card-price">
                            <span className="price">
                              &#8377;{product.price}
                            </span>
                            <span className="text">/{product.session}</span>
                          </div>
                        </div>
                        <div className="card-body">
                          <ul className="specification-list">
                            <li>
                              <span className="status-specification">
                                {product.details}
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="card-footer">
                          <button
                            className="btn btn-light btn-block"
                            onClick={() => handleProduct(product?._id)}
                          >
                            <b>Book Now</b>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -----avatar Update Modal----- */}
      <div
        className="modal fade mt-2"
        id="avatarModal"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Your Avatar</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 d-flex allign-item-center">
                  <input type="file" onChange={handleAvatarChange} />
                </div>
                {preview && (
                  <div className="col-md-6">
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
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleSkip}
              >
                Skip for now
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* -----product Booking Modal----- */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box p={3} width={{ xs: "100%", sm: 400, md: "40vw" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
          >
            <Typography variant="h6">Booking Details</Typography>
            <IconButton color="primary" onClick={toggleDrawer(false)}>
              <CloseIcon style={{ color: "red" }} />
            </IconButton>
          </Box>
          <div className="modal-body">
            <form onSubmit={handleBookingSubmit}>
              <div className="form-group">
                <label htmlFor="product">Product</label>
                <input
                  type="text"
                  className="form-control"
                  id="product"
                  value={
                    products.find((product) => product._id === editId)?.name ||
                    ""
                  }
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="details">Details</label>
                <textarea
                  className="form-control"
                  id="details"
                  rows="3"
                  value={
                    products.find((product) => product._id === editId)
                      ?.details || ""
                  }
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="session">Session</label>
                <input
                  type="text"
                  className="form-control"
                  id="session"
                  value={
                    products.find((product) => product._id === editId)
                      ?.session || ""
                  }
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={
                    products.find((product) => product._id === editId)?.price ||
                    ""
                  }
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  value={date}
                  onChange={handleDateChange}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  Book Now
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={toggleDrawer(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Drawer>

      {/* -----post Comment Modal----- */}
      <Drawer
        anchor="right"
        open={commentDrawerOpen}
        onClose={() => setCommentDrawerOpen(false)}
      >
        <Box p={3} width={{ xs: "100%", sm: 400, md: "40vw" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
          >
            <Typography variant="h6">Add Comment</Typography>
            <IconButton
              color="primary"
              onClick={() => setCommentDrawerOpen(false)}
            >
              <CloseIcon style={{ color: "red" }} />
            </IconButton>
          </Box>
          <form onSubmit={handleCommentSubmit}>
            <div className="form-group">
              <label htmlFor="comment">Comment</label>
              <textarea
                type="text"
                className="form-control"
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-success">
                Send
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setCommentDrawerOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Box>
      </Drawer>
      {/* -----post View Modal----- */}
      <Drawer
        anchor="right"
        open={viewdrawerOpen}
        onClose={() => setViewDrawerOpen(false)}
      >
        {PostData && (
          <Box p={3} width={{ xs: "100%", sm: 400, md: "40vw" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={2}
            >
              <Typography variant="h6">Post Details</Typography>
              <IconButton
                color="primary"
                onClick={() => setViewDrawerOpen(false)}
              >
                <CloseIcon style={{ color: "red" }} />
              </IconButton>
            </Box>
            <div className="modal-body">
              <div>
                <img
                  src={PostData.createdBy.avatar}
                  alt="Profile"
                  className="avatar-img rounded-circle"
                  style={{ width: "50px", height: "50px" }}
                />
                <p className="username">{PostData.createdBy.username}</p>
                <p className="date text-muted">
                  {moment(PostData.createdAt).fromNow()}
                </p>
              </div>
              <PhotoProvider>
                <PhotoView src={PostData.thumbnail}>
                  <img
                    className="card-img-top"
                    src={PostData.thumbnail}
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
                <h3
                  className="card-title"
                  style={{
                    marginBottom: "15px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {PostData.title}
                </h3>
                <p className="card-text">{PostData.body}</p>
                <hr />
                <div className="d-flex justify-content-start">
                  <span className="text-info mr-2">
                    <i className="fas fa-heart text-info fa-2x"></i>
                  </span>
                  {PostData.likes.map((like) => (
                    <div key={like._id} className="like-item">
                      {like.avatar ? (
                        <img
                          src={like.avatar}
                          alt="Profile"
                          className="avatar-img rounded-circle"
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "5px",
                          }}
                        />
                      ) : (
                        <i
                          className="fas fa-user-circle fa-2x"
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "5px",
                          }}
                        ></i>
                      )}
                    </div>
                  ))}
                </div>
                <hr />
                <div className="post-details">
                  <h4>Images</h4>
                  <PhotoProvider>
                    <div className="image-gallery">
                      {PostData.images &&
                        PostData.images.map((image, index) => (
                          <PhotoView key={index} src={image}>
                            <img
                              src={image}
                              alt={`Thumbnail ${index + 1}`}
                              style={{
                                width: "100px",
                                height: "100px",
                                margin: "5px",
                                cursor: "pointer",
                              }}
                            />
                          </PhotoView>
                        ))}
                    </div>
                  </PhotoProvider>
                </div>
                <hr />
                <div className="post-details">
                  <h4>Comments</h4>
                  {PostData.comments.map((comment) => (
                    <div key={comment._id} className="timeline-panel">
                      <div className="timeline-heading d-flex justify-content-between">
                        <h4 className="timeline-title">
                          {comment.user.username}
                        </h4>
                        <p className="timeline-date">
                          {moment(comment.date).fromNow()}
                        </p>
                      </div>
                      <div className="timeline-body">
                        <p>{comment.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Box>
        )}
      </Drawer>

      <ToastContainer />
    </div>
  );
}

export default Feed;
