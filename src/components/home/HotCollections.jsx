import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const carouselOptions = {
    className: "owl-theme",
    id: "d-coll-carousel",
    margin: 10,
    nav: collections.length > 4,
    dots: false,
    loop: collections.length > 4,
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

  const skeletonCarouselOptions = {
    ...carouselOptions,
    nav: true,
    loop: true,
  };

  useEffect(() => {
    const fetchCollections = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );
        setCollections(response.data);
      } catch (error) {
        console.error("Failed to load hot collections", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
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
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            {isLoading ? (
              <OwlCarousel
                key="hot-collections-skeleton"
                {...skeletonCarouselOptions}
              >
                {new Array(4).fill(0).map((_, index) => (
                  <div key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton className="skeleton-image" />
                      </div>
                      <div className="nft_coll_pp">
                        <Skeleton className="skeleton-author" />
                      </div>
                      <div className="nft_coll_info">
                        <h4>
                          <Skeleton className="skeleton-title" />
                        </h4>
                        <span className="skeleton-code-wrap">
                          <Skeleton className="skeleton-code" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            ) : (
              <OwlCarousel
                key="hot-collections-loaded"
                {...carouselOptions}
                data-aos="fade-zoom-in"
                data-aos-anchor-placement="top-bottom"
                data-aos-easing="linear"
                data-aos-duration="1000"
                data-aos-offset="0"
              >
                {collections.map((collection) => (
                  <div key={collection.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${collection.nftId}`}>
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt={collection.title}
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${collection.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={collection.authorImage}
                            alt={collection.title}
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>{collection.code}</span>
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

export default HotCollections;
