import React from "react";
import { Link } from "react-router-dom";
import Countdown from "./Countdown";
import Skeleton from "./Skeleton";

const fadeIn = () => ({
  "data-aos": "fade-zoom-in",
  "data-aos-easing": "linear",
  "data-aos-duration": "1000",
  "data-aos-offset": "0",
  "data-aos-anchor-placement": "top-bottom",
});

const NftItem = ({ item }) => (
  <div className="nft__item">
    <div {...fadeIn()}>
      <div className="author_list_pp">
        <Link
          to={`/author/${item.authorId}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={`Creator: ${item.authorName || item.author || item.title}`}
        >
          <img className="lazy" src={item.authorImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      {item.expiryDate && item.expiryDate > Date.now() && (
        <div className="de_countdown">
          <Countdown expiryDate={item.expiryDate} />
        </div>
      )}

      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <button type="button">Buy Now</button>
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
            alt={item.title}
          />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${item.nftId}`}>
          <h4>{item.title}</h4>
        </Link>
        <div className="nft__item_price">{item.price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{item.likes}</span>
        </div>
      </div>
    </div>
  </div>
);

export const NftItemSkeleton = () => (
  <div className="nft__item">
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
);

export default NftItem;
