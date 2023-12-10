import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item, photos }) => {

  return (
    <div className="searchItem">
      {photos && photos.length > 0 ? (
        <img src={"http://localhost:8800" + photos[0].replace('public', '')} alt="img icon" className="siImg" />
      ) : (
        <p>No photos available</p> // Add a message if there are no photos
      )}
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance} Hotel Manager</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Certified Hotel  </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">Price{item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
          {/* <Link to={`/hotels`}>
            <button className="siDetailsButton">View Details</button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default SearchItem;

