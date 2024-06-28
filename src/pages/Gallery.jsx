import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import { GetAllImage } from "../api/api";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

function Gallery() {
  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  const [itemData,setItemData] = useState(null);

  const Fetchdata = async ()=>{
    try {
      const response = await GetAllImage();
      setItemData(response.data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    Fetchdata();
  },[])

  


  return (
    <div className="wrapper">
      <Navbar />

      <div className=" content container-fluid ">
        <div className="row justify-content-center mt-4 ">
          <div className="col-md-10">
          <ImageList variant="masonry" cols={3} gap={10}>
              {itemData?.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
