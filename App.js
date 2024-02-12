import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/Header";
import AccordionExpandDefault from "./src/Content";
import { Home } from "./src/Home";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { itemList } from "./data/foodItems";
import { gamesList } from "./data/games";
import { Cart } from "./src/Cart";

const FoodPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("food");
  return (
    <div>
      <button
        onClick={() => {
          navigate("/food");
          setActiveTab("food");
        }}
        className={`${
          activeTab == "food" ? "selected-food" : "not-sel"
        } w-1/2 go border`}
      >
        Food Menu
      </button>
      <button
        onClick={() => {
          navigate("/games");
          setActiveTab("games");
        }}
        className={`${
          activeTab == "games" ? "selected-games" : "not-sel"
        } w-1/2 go border`}
      >
        Games Menu
      </button>
      <AccordionExpandDefault list={itemList} title={"Food"} />
    </div>
  );
};

const GamesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("games");
  return (
    <div>
      <button
        onClick={() => {
          navigate("/food");
          setActiveTab("food");
        }}
        className={`${
          activeTab == "food" ? "selected-food" : "not-sel"
        } w-1/2 go border`}
      >
        Food Menu
      </button>
      <button
        onClick={() => {
          navigate("/games");
          setActiveTab("games");
        }}
        className={`${
          activeTab == "games" ? "selected-games" : "not-sel"
        } w-1/2 go border`}
      >
        Games Menu
      </button>
      <AccordionExpandDefault list={gamesList} title={"Games"} />
    </div>
  );
};

const AppLayout = () => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Display alert when the user tries to reload the page
      const message = "Are you sure you want to leave?";
      event.returnValue = message; // Standard for most browsers
      return message; // For some older browsers
    };

    const handlePopState = () => {
      // Display alert when the user presses the back button
      alert("You pressed the back button.");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  return (
    <div className="app">
      <Header />
      <hr />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/food",
        element: <FoodPage />,
      },
      {
        path: "/games",
        element: <GamesPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);
const Root = ReactDOM.createRoot(document.getElementById("root"));
Root.render(<RouterProvider router={appRouter} />);
