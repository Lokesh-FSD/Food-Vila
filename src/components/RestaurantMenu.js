import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useParams } from "react-router-dom";

// Component to Display Restaurant Menu
const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[0]?.card?.card?.info;

  const itemCards =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card
      .itemCards || [];
  console.log(itemCards);

  return (
    <div className="menu">
      <h2>{name}</h2>
      <p>
        {cuisines.join(", ")}
        -- {costForTwoMessage}
      </p>
      <h3>Menu</h3>
      <ul>
        {itemCards.map((item) => (
          <ul key={item.card.info.id}>
            <li>
              {item.card.info.name}:- &#x20B9; {item.card.info.price / 100}
            </li>
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
