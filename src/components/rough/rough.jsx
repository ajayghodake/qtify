import React, { useState } from "react";
import AreaCard from "../Card/Card.jsx";
import BasicTabs from "../BasicTabs/BasicTabs";
import "react-multi-carousel/lib/styles.css";
import CustomCarousel from "../Carousel/carousel.jsx";
import "./Section.css";
import noDataImage from "./nodata.png";
import { CircularProgress } from "@mui/material";

export default function Section({ type, title, data = [], handleIndexChange, toggle = true }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  console.log("Data Length:", data?.length || 0);

  return (
    <div className="container">
      <div className="header">
        <h3>{title}</h3>
        {toggle && (
          <button className="toggle-button" onClick={toggleExpanded}>
            {isExpanded ? "Collapse" : "Show all"}
          </button>
        )}
      </div>

      {type === "album" ? (
        data.length === 0 ? (
          <div className="noData">
            <img className="noDataImg" src={noDataImage} alt="no data found" />
            No Data Available
          </div>
        ) : isExpanded ? (
          <div className="wrapper grid-layout">
            {data.map((album, index) => (
              <AreaCard data={album} type={type} key={album.id || index} />
            ))}
          </div>
        ) : (
          <CustomCarousel
            data={data}
            renderCardItem={(album, index) => (
              <AreaCard data={album} type={type} key={album.id || index} />
            )}
          />
        )
      ) : (
        <>
          <BasicTabs handleChangeIndex={handleIndexChange} />
          <CustomCarousel
            data={data}
            renderCardItem={(song) => (
              <AreaCard data={song} type={type} />
            )}
          />
        </>
      )}
    </div>
  );
}
