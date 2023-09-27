import { CDN_URL } from "../utils/constants";
// import "../index.css";

// sub body  Restaunt Card Component
const RestaurantCards = ({ resList }) => {
  const { name, costForTwo, avgRating } = resList.info;

  if (!resList || !resList.info) {
    return null;
  }
  return (
    <div className="res-card">
      <img
        className="res-logo"
        src={CDN_URL + resList.info.cloudinaryImageId}
        alt="res-img"
      />
      <h3>{name}</h3>
      <h3>{costForTwo}</h3>
      <h3>{avgRating}⭐</h3>
    </div>
  );
};

export default RestaurantCards;
