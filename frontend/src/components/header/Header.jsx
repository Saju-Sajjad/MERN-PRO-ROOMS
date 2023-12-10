import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

// 	<link rel="stylesheet" type="text/css" href="engine1/style.css" />
// <script type="text/javascript" src="engine1/jquery.js"></script>
const Header = ({ type }) => {
  const [disableButton, setDisableButton] = useState(true);
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  const handleSetDestination = (e)=>{
    const locations = ['skardu', 'shiger', 'khapulu'];
  
    const destination = e.target.value.toLowerCase();

    if(locations.includes(destination)){
      setDisableButton(false)
      setDestination(destination)
    }else{
      setDisableButton(true)
    }

    console.log(destination)
    
  }

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div id="wowslider-container1">
          {/* <div class="ws_images"><ul>
		<li><img src="data1/images/1.jpg" alt="1" title="1" id="wows1_0"/></li>
		<li><a href="http://wowslider.net"><img src="data1/images/2.jpg" alt="image carousel" title="2" id="wows1_1"/></a></li>
		<li><img src="data1/images/4.jpg" alt="4" title="4" id="wows1_2"/></li>
	</ul></div>
	<div class="ws_bullets"><div>
		<a href="#" title="1"><span><img src="data1/tooltips/1.jpg" alt="1"/>1</span></a>
		<a href="#" title="2"><span><img src="data1/tooltips/2.jpg" alt="2"/>2</span></a>
		<a href="#" title="4"><span><img src="data1/tooltips/4.jpg" alt="4"/>3</span></a>
	</div></div><div class="ws_script" style="position:absolute;left:-99%"><a href="http://wowslider.net">image slider</a> by WOWSlider.com v9.0</div>
<div class="ws_shadow"></div> */}
        </div>
        <script type="text/javascript" src="engine1/wowslider.js"></script>
        <script type="text/javascript" src="engine1/script.js"></script>
        {/* <div className="headerList">
            <div className="headerListItem active">
              <FontAwesomeIcon icon={faBed} />
              <span>Stays</span>
            </div>
            
          </div> */}
        {type !== "list" && (
          <>
            <h1 className="headerTittle">ENJOY YOUR DREAM</h1>
            <p className="headerDesc">
              Get rewarded for your travels book hotel at lowest price
            </p>
            {/* {!user && <button className="headerBtn">Sign in / Register</button>} */}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={handleSetDestination}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn"  onClick={handleSearch} disabled={disableButton}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
// import {
//   faBed,
//   faCalendarDays,
//   faPerson,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "./header.css";
// import { DateRange } from "react-date-range";
// import { useContext, useState } from "react";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import { format } from "date-fns";
// import { useNavigate } from "react-router-dom";
// import { SearchContext } from "../../context/SearchContext";
// import { AuthContext } from "../../context/AuthContext";

// // 	<link rel="stylesheet" type="text/css" href="engine1/style.css" />
// // <script type="text/javascript" src="engine1/jquery.js"></script>
// const Header = ({ type }) => {
//   const [destination, setDestination] = useState("");
//   const [openDate, setOpenDate] = useState(false);
//   const [dates, setDates] = useState([
//     {
//       startDate: new Date(),
//       endDate: new Date(),
//       key: "selection",
//     },
//   ]);
//   const [openOptions, setOpenOptions] = useState(false);
//   const [options, setOptions] = useState({
//     adult: 1,
//     children: 0,
//     room: 1,
//   });

//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const handleOption = (name, operation) => {
//     setOptions((prev) => {
//       return {
//         ...prev,
//         [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
//       };
//     });
//   };

//   const { dispatch } = useContext(SearchContext);

//   const handleSearch = () => {
//     dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
//     navigate("/hotels", { state: { destination, dates, options } });
//   };

//   return (
//     <div className="header">
//       <div
//         className={
//           type === "list" ? "headerContainer listMode" : "headerContainer"
//         }
//       >
//         <div id="wowslider-container1"></div>
//         <script type="text/javascript" src="engine1/wowslider.js"></script>
//         <script type="text/javascript" src="engine1/script.js"></script>

//         {type !== "list" && (
//           <>
//             <h1 className="headerTittle">ENJOY YOUR DREAM</h1>
//             <p className="headerDesc">
//               Get rewarded for your travels book hotel at lowest price
//             </p>
//             {/* {!user && <button className="headerBtn">Sign in / Register</button>} */}
//             <div className="headerSearch">
//               <div className="headerSearchItem">
//                 <FontAwesomeIcon icon={faBed} className="headerIcon" />
//                 <input
//                   type="text"
//                   placeholder="Where are you going?"
//                   className="headerSearchInput"
//                   onChange={(e) => setDestination(e.target.value)}
//                 />
//               </div>
//               <div className="headerSearchItem">
//                 <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
//                 <span
//                   onClick={() => setOpenDate(!openDate)}
//                   className="headerSearchText"
//                 >{`${format(
//                   new Date(dates[0].startDate),
//                   "MM/dd/yyyy"
//                 )} to ${format(
//                   new Date(dates[0].endDate),
//                   "MM/dd/yyyy"
//                 )}`}</span>
//                 {openDate && (
//                   <DateRange
//                     editableDateInputs={true}
//                     onChange={(item) => setDates([item.selection])}
//                     moveRangeOnFirstSelection={false}
//                     ranges={dates}
//                     className="date"
//                     minDate={new Date()}
//                   />
//                 )}
//               </div>
//               <div className="headerSearchItem">
//                 <FontAwesomeIcon icon={faPerson} className="headerIcon" />
//                 <span
//                   onClick={() => setOpenOptions(!openOptions)}
//                   className="headerSearchText"
//                 >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
//                 {openOptions && (
//                   <div className="options">
//                     <div className="optionItem">
//                       <span className="optionText">Adult</span>
//                       <div className="optionCounter">
//                         <button
//                           disabled={options.adult <= 1}
//                           className="optionCounterButton"
//                           onClick={() => handleOption("adult", "d")}
//                         >
//                           -
//                         </button>
//                         <span className="optionCounterNumber">
//                           {options.adult}
//                         </span>
//                         <button
//                           className="optionCounterButton"
//                           onClick={() => handleOption("adult", "i")}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                     <div className="optionItem">
//                       <span className="optionText">Children</span>
//                       <div className="optionCounter">
//                         <button
//                           disabled={options.children <= 0}
//                           className="optionCounterButton"
//                           onClick={() => handleOption("children", "d")}
//                         >
//                           -
//                         </button>
//                         <span className="optionCounterNumber">
//                           {options.children}
//                         </span>
//                         <button
//                           className="optionCounterButton"
//                           onClick={() => handleOption("children", "i")}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                     <div className="optionItem">
//                       <span className="optionText">Room</span>
//                       <div className="optionCounter">
//                         <button
//                           disabled={options.room <= 1}
//                           className="optionCounterButton"
//                           onClick={() => handleOption("room", "d")}
//                         >
//                           -
//                         </button>
//                         <span className="optionCounterNumber">
//                           {options.room}
//                         </span>
//                         <button
//                           className="optionCounterButton"
//                           onClick={() => handleOption("room", "i")}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <div className="headerSearchItem">
//                 <button className="headerBtn" onClick={handleSearch}>
//                   Search
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;
