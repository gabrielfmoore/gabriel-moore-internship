import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";

const formatCountdown = (expiryDate, now = Date.now()) => {
  const diff = expiryDate - now;
  if (diff <= 0) {
    return "Expired";
  }
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return `${hours}h ${minutes}m ${seconds}s`;
};

const Countdown = ({ expiryDate }) => {
  const [display, setDisplay] = useState(() =>
    expiryDate ? formatCountdown(expiryDate) : "",
  );

  useEffect(() => {
    if (!expiryDate) {
      return undefined;
    }

    const tick = () => setDisplay(formatCountdown(expiryDate));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [expiryDate]);

  return <>{display}</>;
};

const baseCarouselOptions = {
  className: "owl-theme",
  id: "d-items-carousel",
  margin: 10,
  dots: false,
  smartSpeed: 300,
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 2,
    },
    768: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  },
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
        );
        setItems(response.data);
      } catch (error) {
        console.error("Failed to load new items", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            {isLoading ? (
              <OwlCarousel
                key="new-items-skeleton"
                {...baseCarouselOptions}
                nav
                loop
              >
                {new Array(4).fill(0).map((_, index) => (
                  <div key={index} className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton className="skeleton-author" />
                    </div>
                    <div className="nft__item_wrap">
                      <Skeleton className="skeleton-preview" />
                    </div>
                    <div className="nft__item_info">
                      <Skeleton className="skeleton-title" />
                      <div className="skeleton-meta">
                        <Skeleton className="skeleton-price" />
                        <Skeleton className="skeleton-like" />
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            ) : (
              <OwlCarousel
                key="new-items-loaded"
                {...baseCarouselOptions}
                nav={items.length > 4}
                loop={items.length > 4}
              >
                {items.map((item) => (
                  <div key={item.id} className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${item.author}`}
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate && item.expiryDate > Date.now() &&
                    <div className="de_countdown">
                      <Countdown expiryDate={item.expiryDate} />
                    </div>}

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="mailto:">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">
                        {item.price} {item.currency}
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
