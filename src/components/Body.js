import RestaurantCards from "./RestaurantCards";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

// Body Component
const Body = () => {
  // useState Hook for cards
  const [listOfRectaurants, setListOfRestaurants] = useState([]);
  const [filteredListOfRestaurants, setFilteredListOfRestaurants] = useState(
    []
  );

  // useState Hook for Search
  const [searchText, setSearchText] = useState("");

  // UseEffect Hoook
  useEffect(() => {
    FetchData();
  }, []);

  // Data fetching using FetchData function
  const FetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.971885&lng=77.6070088&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();

      setListOfRestaurants(
        json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        []
      );
      setFilteredListOfRestaurants(
        json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );

    } catch (error) {
      console.log(error);
    }
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus == false) {
    return (
      <h2>
        It seems you are Offline🔘, Please Chceck your Internet Connection
      </h2>
    );
  }

  return listOfRectaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="status">{onlineStatus ? "Online🟢" : "Offline🔘"}</div>
      <div className="nav-2">
        <div className="filter">
          {/*Filter Button  */}
          <button
            className="filter-btn"
            onClick={() => {
              const filteredList = listOfRectaurants.filter(
                (res) => res.info.avgRating > 4.2
              );
              setFilteredListOfRestaurants(filteredList);
            }}
          >
            Top Restaurants
          </button>
        </div>
        {/* Search Box */}
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                const filteredRestaurant = listOfRectaurants.filter((res) =>
                  res.info.name.toLowerCase().includes(searchText.toLowerCase())
                );
                setFilteredListOfRestaurants(filteredRestaurant);
              }
            }}
          ></input>

          {/* Seach Button */}
          <button
            className="search-btn"
            onClick={() => {
              const filteredRestaurant = listOfRectaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredListOfRestaurants(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div className="res-container">
        {filteredListOfRestaurants.map((restaurant) => (
          <Link
            to={"/restaurants/" + restaurant.info.id}
            key={restaurant.info.id}
          >
            <RestaurantCards resList={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
