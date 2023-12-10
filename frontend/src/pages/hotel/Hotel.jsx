import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import React, { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import CommentSection from "./CommentSetion";
import { Button } from "@mui/material";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reservationDetails, setReservationDetails] = useState({});
  const { dates, options } = useContext(SearchContext);
  const [commentIsShown, setCommentIsShown] = useState(false);
  console.log(data);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  // const days = dayDifference(dates[0].endDate, dates[0].startDate);
  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };
  const handleReservation = (details) => {
    // You can perform any actions with the reservation details here
    setReservationDetails(details);
    // For now, let's just log the details
    console.log("Reservation Details:", details);
  };
  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  // const getAllComments = (comments)=>{

  // }
  return (
    <div>
      <Navbar />
      {/* <Header type="list" /> */}
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
          <Button
  className="buttonStyle"
  onClick={() => {
    setCommentIsShown(!commentIsShown);
  }}
>
  <span style={{  
    border:" 3px solid green",marginleft:"20px",backgroundcolor: "green",color:"grey",fontSize:"bold", borderRadius:"5px"}}>📝 Comment</span>
</Button>
{commentIsShown && (
  <CommentSection
    className="commentSectionStyle"
    hotelId={data._id}
  />
)}
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Registered Hotel – {data.distance} Hotel Manager Skardu
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over Price{data.cheapestPrice} at this property and
              get a free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photos, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    src={"http://localhost:8800" + photos.replace("public", "")}
                    alt="img icon"
                    className="siImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Gilgit Baltistan, this property
                  has an excellent location score of 9.8!
                </span>
                <h2>
                  <b>Price{days * data.cheapestPrice * options.room}</b> ({days}{" "}
                  nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && (
        <Reserve setOpen={setOpenModal} hotelId={id} hotelName={data?.name} />
      )}
    </div>
  );
};

export default Hotel;
