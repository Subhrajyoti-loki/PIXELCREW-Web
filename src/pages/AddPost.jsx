import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
function AddPost() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages(files);
  };

  const handleThumbnailChange = (event) => {
    setThumbnail(event.target.files[0]);
  };

  const removeImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("body", data.body);
    formData.append("latitude", data.latitude);
    formData.append("longitude", data.longitude);
    formData.append("thumbnail", thumbnail);

    selectedImages.forEach((image, index) => {
      formData.append("images", image);
    });
    const token = localStorage.getItem("token");
    try {
      const response = axios.post("https://pixelcrew-server.onrender.com/api/posts/insert",formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Post created successfully");
      reset();
      setSelectedImages([]);
      setThumbnail(null);
    } catch (error) {
      toast.error("Failed to create post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-2 m-4 border">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group d-flex">
              <div style={{ width: "30%" }}>
                <label htmlFor="title" className="mr-5 pt-2 fw-bold">
                  Title * :
                </label>
              </div>
              <div style={{ width: "40%" }}>
                <input
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  id="title"
                  className="form-control"
                />
                {errors.title && <span>{errors.title.message}</span>}
              </div>
            </div>
            <div className="form-group d-flex">
              <div style={{ width: "30%" }}>
                <label htmlFor="body" className="mr-5 pt-2 fw-bold">
                  Description * :
                </label>
              </div>
              <div style={{ width: "40%" }}>
                <textarea
                  {...register("body", { required: "Description is required" })}
                  id="body"
                  className="form-control"
                />
                {errors.body && <span>{errors.body.message}</span>}
              </div>
            </div>
            <div className="form-group d-flex">
              <div style={{ width: "30%" }}>
                <label htmlFor="latitude" className="mr-5 pt-2 fw-bold">
                  Latitude * :
                </label>
              </div>
              <div style={{ width: "40%" }}>
                <input
                  type="number"
                  step="any"
                  {...register("latitude", {
                    required: "Latitude is required",
                  })}
                  id="latitude"
                  className="form-control"
                />
                {errors.latitude && <span>{errors.latitude.message}</span>}
              </div>
            </div>
            <div className="form-group d-flex">
              <div style={{ width: "30%" }}>
                <label htmlFor="longitude" className="mr-5 pt-2 fw-bold">
                  Longitude * :
                </label>
              </div>
              <div style={{ width: "40%" }}>
                <input
                  type="number"
                  step="any"
                  {...register("longitude", {
                    required: "Longitude is required",
                  })}
                  id="longitude"
                  className="form-control"
                />
                {errors.longitude && <span>{errors.longitude.message}</span>}
              </div>
            </div>
            <div className="form-group d-flex">
              <div style={{ width: "30%" }}>
                <label htmlFor="thumbnail" className="mr-5 pt-2 fw-bold">
                  Thumbnail * :
                </label>
              </div>
              <div style={{ width: "40%" }}>
                <input
                  type="file"
                  onChange={handleThumbnailChange}
                  className="form-control w-100"
                  id="thumbnail"
                />
              </div>
            </div>
            <div className="form-group d-flex">
              <div style={{ width: "30%" }}>
                <label htmlFor="images" className="mr-5 pt-2 fw-bold">
                  Images :
                </label>
              </div>
              <div style={{ width: "40%" }}>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  id="images"
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group d-flex">
              <div style={{ width: "30%" }}></div>
              <div style={{ width: "40%" }}>
                {selectedImages.length > 0 && (
                  <ul>
                    {selectedImages.map((image, index) => (
                      <li key={index}>
                        {image.name}
                        <button
                          type="button"
                          title="Delete"
                          onClick={() => removeImage(index)}
                          className="btn btn-link btn-danger btn-lg p-2"
                          data-original-title="Delete"
                        >
                          <i className="fas fa-trash-alt text-danger" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="mt-4 d-flex justify-content-end">
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-secondary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddPost;
