import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateProduct } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProduct() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  //onsubmit function
  const onSubmit = async (data) => {
    setIsLoading(true);

    const { name, details, price, session } = data;
    const payload = { name, details, price, session };
    
    try {
      const response = await toast.promise(CreateProduct(payload), {
        pending: "Creating product...",
        success: "Product created",
        error: "Error occurred during creating product",
      });

      if (response.status === 200 || response.status === 201) {
        if (response.data) {
          toast.success("Product Launch successful");
          reset();
          // navigate("/feed");
        } else {
          toast.error("Something went wrong while logging in");
        }
      } else {
        const errorMessage =
          response.data?.error || "Error occurred during creating product";
        toast.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      toast.error(errorMessage);
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
                <label htmlFor="name" className="mr-5 pt-2 fw-bold">
                  Title * :
                </label>
              </div>
              <div style={{ width: "40%" }}>
                <input
                  type="text"
                  {...register("name", { required: "Title is required" })}
                  id="name"
                  className="form-control"
                />
                {errors.name && <span>{errors.name.message}</span>}
              </div>
            </div>
            <div className="form-group d-flex">
              <div style={{ width: "30%" }}>
                <label htmlFor="details" className="mr-5 pt-2 fw-bold">
                  Description * :
                </label>
              </div>
              <div style={{ width: "40%" }}>
                <textarea
                  {...register("details", {
                    required: "Description is required",
                  })}
                  id="details"
                  className="form-control"
                />
                {errors.details && <span>{errors.details.message}</span>}
              </div>
            </div>

            <div className="form-group d-flex">
              <div style={{ width: "30%" }}>
                <label htmlFor="price" className="mr-5 pt-2 fw-bold">
                  Price * :
                </label>
              </div>
              <div style={{ width: "40%" }}>
                <input
                  type="number"
                  step="any"
                  {...register("price", {
                    required: "price is required",
                  })}
                  id="price"
                  className="form-control"
                />
                {errors.price && <span>{errors.price.message}</span>}
              </div>
            </div>
            <div className="form-group d-flex">
              <div style={{ width: "30%" }}>
                <label htmlFor="session" className="mr-5 pt-2 fw-bold">
                  session * :
                </label>
              </div>
              <div style={{ width: "40%" }}>
                <input
                  type="text"
                  step="any"
                  {...register("session", {
                    required: "session is required",
                  })}
                  id="session"
                  className="form-control"
                />
                {errors.session && <span>{errors.session.message}</span>}
              </div>
            </div>

            <div className="mt-4 d-flex justify-content-end">
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
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

export default AddProduct;
