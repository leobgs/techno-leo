import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenuData } from "../../features/menuSlice";
import { Link } from "react-router-dom";
import "./Menu.css";
import logoHome from "../../assets/home1.png";
import logoMenu from "../../assets/menu1.png";

const Menu = () => {
  const dispatch = useDispatch();
  const { token_type, access_token } = useSelector((state) => state.auth);
  const { categories, error } = useSelector((state) => state.menu);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (token_type && access_token) {
      dispatch(
        fetchMenuData({ tokenType: token_type, accessToken: access_token })
      );
    }
  }, [dispatch, token_type, access_token]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div id="menu_screen">
      <div className="content">
        <h2>Menu</h2>
        <div className="category-list">
          {categories.map((category, index) => (
            <button
              key={index}
              className="category-button"
              onClick={() => handleCategoryClick(category)}
            >
              {category.category_name}
            </button>
          ))}
        </div>

        <div className="menu-items">
          {selectedCategory ? (
            <div className="category">
              <h3 className="name-category">
                {selectedCategory.category_name}
              </h3>
              <div className="menu-list">
                {selectedCategory.menu.map((item, idx) => (
                  <div key={idx} className="menu-item">
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="menu-image"
                    />
                    <div className="menu-details">
                      <h5 className="menu-name">{item.name}</h5>
                      <p className="menu-description">{item.description}</p>
                    </div>
                    <div>
                      <p className="menu-price">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="all-menus">
              {categories.map((category, index) => (
                <div key={index} className="category">
                  <h3 className="name-category">{category.category_name}</h3>
                  <div className="menu-list">
                    {category.menu.map((item, idx) => (
                      <div key={idx} className="menu-item">
                        <img
                          src={item.photo}
                          alt={item.name}
                          className="menu-image"
                        />
                        <div className="menu-details">
                          <h5 className="menu-name">{item.name}</h5>
                          <p className="menu-description">{item.description}</p>
                        </div>
                        <div>
                          <p className="menu-price">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="button-container">
        <Link to="/">
          <img src={logoHome} alt="Home" className="nav-icon" />
        </Link>
        <Link to="/menu">
          <img src={logoMenu} alt="Menu" className="nav-icon" />
        </Link>
      </div>
    </div>
  );
};

export default Menu;
