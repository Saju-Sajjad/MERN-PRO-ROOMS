import React from 'react'
import useFetch from "../../hooks/useFetch";
import"./featuredproperties.css";
const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
                      <img src={"http://localhost:8800"+item?.photos[0].replace('public', '')} alt="img icon" className="siImg" />

           
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from Price{item.cheapestPrice}</span>
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
// import IMG from"../../Images/mountv214.jpg";

// const FeaturedProperties = () => {
//   const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");

//   return (
//     <div className="fp">
//       <div className="fpItem">
//         <img
//           src={IMG}
//           alt=""
//           className="fpImg"
//         />
//         <span className="fpName">Aparthotel Stare Miasto</span>
//         <span className="fpCity">Madrid</span>
//         <span className="fpPrice">Starting from $120</span>
//         <div className="fpRating">
//           <button>8.9</button>
//           <span>Excellent</span>
//         </div>
//       </div>
//       <div className="fpItem">
//         <img
//           src={IMG}
//           alt=""
//           className="fpImg"
//         />
//         <span className="fpName">Comfort Suites Airport</span>
//         <span className="fpCity">Austin</span>
//         <span className="fpPrice">Starting from $140</span>
//         <div className="fpRating">
//           <button>9.3</button>
//           <span>Exceptional</span>
//         </div>
//       </div>
//       <div className="fpItem">
//         <img
//           src={IMG}
//           alt=""
//           className="fpImg"
//         />
//         <span className="fpName">Four Seasons Hotel</span>
//         <span className="fpCity">Lisbon</span>
//         <span className="fpPrice">Starting from $99</span>
//         <div className="fpRating">
//           <button>8.8</button>
//           <span>Excellent</span>
//         </div>
//       </div>
//       <div className="fpItem">
//         <img
//           src={IMG}
//           alt=""
//           className="fpImg"
//         />
//         <span className="fpName">Hilton Garden Inn</span>
//         <span className="fpCity">Berlin</span>
//         <span className="fpPrice">Starting from $105</span>
//         <div className="fpRating">
//           <button>8.9</button>
//           <span>Excellent</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedProperties;
