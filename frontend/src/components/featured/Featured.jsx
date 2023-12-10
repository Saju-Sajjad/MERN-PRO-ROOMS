import "./featured.css";
import img from "../../Images/himlya askd.jpg";
import img1 from "../../Images/shiger.jpg";
import img2 from "../../Images/regoo.jpg";
import useFetch from "../../hooks/useFetch.js";
const Featured = () => {
  // const { data, loading, error } = useFetch("/hotels/countByCity?cities=Skardu,Khapulu,Astanaa");
  const { data, loading,
     error } = useFetch("/hotels/countByCity?cities=Skardu,Khapulu,Astanaa");

  console.log(data)

return (
  <div className="featured">
    {loading ? (
      "Loading please wait"
    ) : (
      <>
        <div className="featuredItem">
        <img
        src={img1}
        alt="Image"
        className="featuredImg"/>
          <div className="featuredTitles">
            <h1>Skardu</h1>
            <h2>{data[0]} Hotels</h2>
          </div>
        </div>

        <div className="featuredItem">
        <img
        src={img}
        alt="Image"
        className="featuredImg"/>
          <div className="featuredTitles">
            <h1>Khapulu</h1>
            <h2>{data[1]} Hotels</h2>
          </div>
        </div>
        <div className="featuredItem">
        <img
        src={img2}
        alt="Image"
        className="featuredImg"/>
          <div className="featuredTitles">
            <h1>Shiger</h1>
            <h2>{data[2]} Hotels</h2>
          </div>
        </div>
      </>
    )}
  </div>
);
};

export default Featured;
