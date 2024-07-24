import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../../features/homeSlice";
import { Link } from "react-router-dom";
import logoTechnoHome from "../../assets/logo technopartner.png";
import logoHome from "../../assets/home1.png";
import logoMenu from "../../assets/menu1.png";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { token_type, access_token } = useSelector((state) => state.auth);
  const { greeting, name, saldo, point, qrcode, banner, error } = useSelector(
    (state) => state.home
  );
  const [isPopupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    if (token_type && access_token) {
      dispatch(
        fetchHomeData({ tokenType: token_type, accessToken: access_token })
      );
    }
  }, [dispatch, token_type, access_token]);

  const handleQRCodeClick = () => {
    setPopupVisible(true);
  };

  return (
    <div id="home_screen">
      <div>
        <img src={logoTechnoHome} alt="Logo" className="logo" />
      </div>
      <div className="content">
        <div>
          <h2>{greeting}</h2>
        </div>
        <div>
          <h2>{name}</h2>
        </div>

        <div className="saldo-container">
          <p>Saldo:</p>
          <p>
            <b>RP {saldo}</b>
          </p>
        </div>

        <div className="point-container">
          <p>Point:</p>
          <p>
            <b>{point}</b>
          </p>
        </div>

        <div className="banner-container">
          {banner.length > 0 && (
            <div className="banner">
              {banner.map((img, index) => (
                <img key={index} src={img} alt={`Banner ${index}`} />
              ))}
            </div>
          )}
        </div>

        <button className="qr-button" onClick={handleQRCodeClick}>
          Show QR Code
        </button>
        {isPopupVisible && (
          <div className="popup">
            <p>Show the QR Code below to the cashier</p>
            <img src={qrcode} alt="QR Code" />
            <button onClick={() => setPopupVisible(false)}>Close</button>
          </div>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
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

export default Home;
