import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NftItem, { NftItemSkeleton } from "../UI/NftItem";

const EXPLORE_API =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

const ExploreItems = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const ITEMS_PER_PAGE = 4;
  const INITIAL_VISIBLE = 8;
  const [visibleItems, setVisibleItems] = useState(INITIAL_VISIBLE);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const url = filter ? `${EXPLORE_API}?filter=${filter}` : EXPLORE_API;
        const response = await axios.get(url);
        setItems(response.data);
      } catch (error) {
        console.error("Failed to load explore items", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, [filter]);

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setVisibleItems(INITIAL_VISIBLE);
          }}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {isLoading
        ? new Array(INITIAL_VISIBLE).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftItemSkeleton />
            </div>
          ))
        : items.slice(0, visibleItems).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftItem item={item} />
            </div>
          ))}
      {!isLoading && visibleItems < items.length && (
        <div className="col-md-12 text-center">
          <Link
            to="#"
            id="loadmore"
            className="btn-main lead"
            onClick={(e) => {
              e.preventDefault();
              setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
            }}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
