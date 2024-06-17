import axios from "axios";

const production = 'https://pixelcrew-server.onrender.com';
const local = "http://localhost:50";

let api_url = '';
let mode = 'pro';


if (mode === 'pro') {
    api_url = production;
} else {
    api_url = local;
}

// Dynamically set the baseURL based on the mode
const api = axios.create({
  baseURL: `${api_url}/api`,
  withCredentials: true,
});

//token verify
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//user
//sign up
export const signup = async (user) => {
  try {
    const response = await api.post(`/user/post`, user);
    return response;
  } catch (error) {
    throw error;
  }
};

//login
export const signin = async (data) => {
  return await api.post("/user/login", data);
};

export const getAllUser = async () => {
  return await api.get(`/user`);
};
export const getUsers = async (id) => {
  id = id || "";
  return await api.get(`user/${id}`);
};

export const editUser = async (id, data) => {
  return await api.patch(`/user/${id}`, data);
};
export const updateAvatar = async (userId, formData) => {
  return await api.patch(`/user/avatar/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const getuserCount = async () => {
  return await api.get(`/user/counts`);
};
//user

//contact us
export const Contact = async (data) => {
  return await api.post("/contactus/post", data);
};
export const getAllContact = async(data)=>{
  return await api.post("/contactus",data)
}
//contact us

//notification
export const getAllNotifiacton = async () => {
  return await api.get(`/notified`);
};
export const getUserNotifiacton = async () => {
  return await api.get(`/notified/user`);
};
export const getAllNotiCount = async () => {
  return await api.get(`/notified/count`);
};
//notification

//post
export const createPost = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return axios.post("posts/insert", formData, config);
};
export const getAllPost = async () => {
  return await api.get(`/posts`);
};
export const getPostCount = async () => {
  return await api.get(`/posts/counts`);
};
export const getCountDate = async () => {
  return await api.get(`/posts/date`);
};
export const getLikeCount = async () => {
  return await api.get(`/posts/likes`);
};
export const getPost = async (id) => {
  id = id || "";
  return await api.get(`posts/${id}`);
};
export const deletePost = async (id) => {
  return await api.delete(`posts/${id}`);
};
export const likePost = async (postId) => {
  return await api.post(`/posts/${postId}/like`);
};

export const commentPost = async (id, commentData) => {
  return await api.post(`/posts/${id}/comment`, commentData);
};

//post

//product
export const CreateProduct = async (data) => {
  return await api.post("/product/post", data);
};
export const getAllProduct = async () => {
  return await api.get(`/product`);
};
export const getProduct = async (id) => {
  id = id || "";
  return await api.get(`product/${id}`);
};
export const editProduct = async (id, data) => {
  return await api.put(`/product/${id}`, data);
};

export const deleteProduct = async (id) => {
  return await api.delete(`/product/${id}`);
};
//product

//booking
export const ProductBooking = async (data) => {
  return await api.post("/booking/post", data);
};
export const Createorder = async (data) => {
  return await api.post("/booking/create-order", data);
};
export const VerifyPayment = async (data) => {
  return await api.post("/booking/verify", data);
};
export const getAllBooking = async () => {
  return await api.get(`/booking`);
};
export const getBooking = async (id) => {
  id = id || "";
  return await api.get(`/booking/${id}`);
};
export const getbookingCount = async () => {
  return await api.get(`/booking/counts`);
};
export const getbookbyuser = async () => {
  return await api.get(`/booking/user`);
};
export const Editbooking = async (id, data) => {
  return await api.put(`/booking/${id}`, data);
};
export const EditStatus = async (id, data) => {
  return await api.put(`/booking/${id}/status`, data);
};

export default api;
