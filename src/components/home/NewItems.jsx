import React, { useEffect, useState } from "react";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import NftItem, { NftItemSkeleton } from "../UI/NftItem";

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
            <div
              className="text-center"
              data-aos="fade-zoom-in"
              data-aos-easing="linear"
              data-aos-duration="300"
              data-aos-offset="0"
            >
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
                  <div key={index}>
                    <NftItemSkeleton />
                  </div>
                ))}
              </OwlCarousel>
            ) : (
              <OwlCarousel
                key="new-items-loaded"
                {...baseCarouselOptions}
                nav={items.length > 4}
                loop={items.length > 4}
                data-aos="fade-zoom-in"
                data-aos-anchor-placement="top-bottom"
                data-aos-easing="linear"
                data-aos-duration="1000"
                data-aos-offset="0"
              >
                {items.map((item) => (
                  <div key={item.id}>
                    <NftItem item={item} />
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
