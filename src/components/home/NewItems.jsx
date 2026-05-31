import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import NftItem, { NftItemSkeleton, revealLoadedPreviewImages } from "../UI/NftItem";

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
  const loadedCarouselRef = useRef(null);

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

  useEffect(() => {
    if (isLoading || !loadedCarouselRef.current) return;

    const root = loadedCarouselRef.current;
    const handleImageLoad = (event) => {
      if (event.target.matches(".nft__item_preview")) {
        event.target.classList.remove("is-image-loading");
      }
    };

    root.addEventListener("load", handleImageLoad, true);
    revealLoadedPreviewImages(root);

    return () => root.removeEventListener("load", handleImageLoad, true);
  }, [isLoading, items]);

  const handleCarouselUpdate = (event) => {
    revealLoadedPreviewImages(event?.target ?? loadedCarouselRef.current);
  };

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
                  <div key={index}>
                    <NftItemSkeleton />
                  </div>
                ))}
              </OwlCarousel>
            ) : (
              <div ref={loadedCarouselRef}>
                <OwlCarousel
                  key="new-items-loaded"
                  {...baseCarouselOptions}
                  nav={items.length > 4}
                  loop={items.length > 4}
                  onInitialized={handleCarouselUpdate}
                  onTranslated={handleCarouselUpdate}
                >
                  {items.map((item) => (
                    <div key={item.id}>
                      <NftItem item={item} />
                    </div>
                  ))}
                </OwlCarousel>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
