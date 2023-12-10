import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId, hotelName }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [reservationSuccess, setReservationSuccess] = useState(false); 
  const { data, loading, error } = useFetch(`/hotels/rooms/${hotelId}`)
  const navigate = useNavigate(); 
  console.log("hotel data", data);


  if (error) {
    console.error("Error fetching room data:", error);
    console.error("Error hotelId", hotelId);

  }
  const { dates } = useContext(SearchContext);
  const user = localStorage.getItem("user");
  const username = JSON.parse(user);

  const datesInRange = (dateArray) => {
 
    const startDate = dates[0].startDate;
    const endDate = dates[0].endDate;

    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    const datesWithinRange = dateArray.filter((date) => {
      date = new Date(date);
      return date >= startDate && date <= endDate;
    });

    return datesWithinRange;
  };

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date)); 
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const availabileDates = datesInRange(roomNumber.unavailableDates);

    if (availabileDates.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleClick = async () => {
    console.log("Selected Rooms for Reservation:", selectedRooms);
    try {
      const res = await Promise.all(
        selectedRooms.map((roomId) => {
          return axios.put(
            `http://localhost:8800/api/rooms/availability/${roomId}`,
            {
              dates: alldates.map((date) => date.getTime()), 
            }
          );
        })
      );
  
      const apiUrl = "http://localhost:8800/api/bookings";
      await Promise.all(
        selectedRooms.map((roomId) => {
          console.log(("promise id", roomId));
          return axios.post(
            apiUrl,
            {
              hotelName: hotelName,
              roomName: roomId || hotelName + " Room",
              userName: username?.username,
              toDate: dates?.startDate || new Date(), 
              fromDate: dates?.endDate || new Date(), 
            },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        })
      );
  
      const isSuccess = res.every((response) => response.status === 200);
  
      if (isSuccess) {
        setOpen(false);
        alert("Your Booking is Successfully");

        setReservationSuccess(true);
  
        setTimeout(() => {
          setReservationSuccess(false);
          navigate(`/reservation/detail/${hotelId}/${selectedRooms[0]}`);
        }, 1000);
      }
    } catch (err) {
      console.error("Error occurred: ", err);
    }
  };
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    console.log('--->>> Handle Select: ', value);

    console.log("Selected Rooms Before:", selectedRooms);

    setSelectedRooms((prevSelectedRooms) =>
      checked
        ? [...prevSelectedRooms, value]
        : prevSelectedRooms.filter((item) => item !== value)
    );

    console.log("Selected Rooms After:", selectedRooms);
  };


  


  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select Your Rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    defaultChecked={isAvailable(roomNumber)}
                    onChange={handleSelect}
                    disabled={isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}{" "}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
        
  
      </div>
    </div>
  );
};
export default Reserve;
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
// import "./reserve.css";
// import useFetch from "../../hooks/useFetch";
// import { useContext, useState } from "react";
// import { SearchContext } from "../../context/SearchContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Reserve = ({ setOpen, hotelId, hotelName }) => {
//   const [selectedRooms, setSelectedRooms] = useState([]);
//   const [reservationSuccess, setReservationSuccess] = useState(false); 
//   const { data, loading, error } = useFetch(`/hotels/rooms/${hotelId}`)
//   const navigate = useNavigate(); 
//   console.log("hotel data", data);


//   if (error) {
//     console.error("Error fetching room data:", error);
//     console.error("Error hotelId", hotelId);

//   }
//   const { dates } = useContext(SearchContext);
//   const user = localStorage.getItem("user");
//   const username = JSON.parse(user);

//   const datesInRange = (dateArray) => {
 
//     const startDate = dates[0].startDate;
//     const endDate = dates[0].endDate;

//     console.log("Start Date:", startDate);
//     console.log("End Date:", endDate);
//     const datesWithinRange = dateArray.filter((date) => {
//       date = new Date(date);
//       return date >= startDate && date <= endDate;
//     });

//     return datesWithinRange;
//   };

//   const getDatesInRange = (startDate, endDate) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const date = new Date(start.getTime());

//     const dates = [];

//     while (date <= end) {
//       dates.push(new Date(date)); 
//       date.setDate(date.getDate() + 1);
//     }

//     return dates;
//   };

//   const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

//   const isAvailable = (roomNumber) => {
//     const availabileDates = datesInRange(roomNumber.unavailableDates);

//     if (availabileDates.length > 0) {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   const handleClick = async () => {
//     console.log("Selected Rooms for Reservation:", selectedRooms);
//     try {
//       const res = await Promise.all(
//         selectedRooms.map((roomId) => {
//           return axios.put(
//             `http://localhost:8800/api/rooms/availability/${roomId}`,
//             {
//               dates: alldates.map((date) => date.getTime()), 
//             }
//           );
//         })
//       );
  
//       const apiUrl = "http://localhost:8800/api/bookings";
//       await Promise.all(
//         selectedRooms.map((roomId) => {
//           console.log(("promise id", roomId));
//           return axios.post(
//             apiUrl,
//             {
//               hotelName: hotelName,
//               roomName: roomId || hotelName + " Room",
//               userName: username?.username,
//               toDate: dates?.startDate || new Date(), 
//               fromDate: dates?.endDate || new Date(), 
//             },
//             {
//               withCredentials: true,
//               headers: {
//                 "Content-Type": "application/json",
//               },
//             }
//           );
//         })
//       );
  
//       const isSuccess = res.every((response) => response.status === 200);
  
//       if (isSuccess) {
//         setOpen(false);
//         alert("Your Booking is Successfully");

//         setReservationSuccess(true);
  
//         setTimeout(() => {
//           setReservationSuccess(false);
//           navigate(`/reservation/detail/${hotelId}`);
//         }, 1000);
//       }
//     } catch (err) {
//       console.error("Error occurred: ", err);
//     }
//   };
//   const handleSelect = (e) => {
//     const checked = e.target.checked;
//     const value = e.target.value;

//     console.log("Selected Rooms Before:", selectedRooms);

//     setSelectedRooms((prevSelectedRooms) =>
//       checked
//         ? [...prevSelectedRooms, value]
//         : prevSelectedRooms.filter((item) => item !== value)
//     );

//     console.log("Selected Rooms After:", selectedRooms);
//   };



//   return (
//     <div className="reserve">
//       <div className="rContainer">
//         <FontAwesomeIcon
//           icon={faCircleXmark}
//           className="rClose"
//           onClick={() => setOpen(false)}
//         />
//         <span>Select Your Rooms:</span>
//         {data.map((item) => (
//           <div className="rItem" key={item._id}>
//             <div className="rItemInfo">
//               <div className="rTitle">{item.title}</div>
//               <div className="rDesc">{item.desc}</div>
//               <div className="rMax">
//                 Max people: <b>{item.maxPeople}</b>
//               </div>
//               <div className="rPrice">{item.price}</div>
//             </div>
//             <div className="rSelectRooms">
//               {item.roomNumbers.map((roomNumber) => (
//                 <div className="room" key={roomNumber._id}>
//                   <label>{roomNumber.number}</label>
//                   <input
//                     type="checkbox"
//                     value={roomNumber._id}
//                     defaultChecked={isAvailable(roomNumber)}
//                     onChange={handleSelect}
//                     disabled={isAvailable(roomNumber)}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}{" "}
//         <button onClick={handleClick} className="rButton">
//           Reserve Now!
//         </button>
        
  
//       </div>
//     </div>
//   );
// };

// export default Reserve;
