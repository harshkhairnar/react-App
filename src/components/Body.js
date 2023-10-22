import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./shimmer";
// import { Image, Shimmer } from 'react-shimmer'

const Body = () => {
  const [listOfResData, setListOfResData] = useState([]);
  const [searchtext, setsearchtext] = useState("");
  const [filtereddata  , setFiltereddata]=useState([])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.6434502&lng=73.8502304&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setListOfResData(
      json.data.cards[2].card.card.gridElements.infoWithStyle.restaurants
    );
    setFiltereddata( json.data.cards[2].card.card.gridElements.infoWithStyle.restaurants)
  };
  if (listOfResData?.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchtext}
            onChange={(e) => {
              setsearchtext(e.target.value);
            }}
          />
          <button
            onClick={() => {
              const filterdata = listOfResData?.filter((res) =>
                res.info.name
                  ?.toLowerCase()
                  .includes(searchtext.toLowerCase())
              );
              setFiltereddata(filterdata);
            }}
          >
            search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfResData.filter(
              (res) => res.info.avgRating > 4
            );
            setListOfResData(filteredList);
          }}
        >
          Top Rated Cards
        </button>
      </div>
      <div className="res-container">
        {filtereddata?.map((restaurant) => (
          <RestaurantCard key={restaurant?.info?.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
