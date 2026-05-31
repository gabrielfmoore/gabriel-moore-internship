import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { icon: "fa-image", label: "Art" },
  { icon: "fa-music", label: "Music" },
  { icon: "fa-search", label: "Domain Names" },
  { icon: "fa-globe", label: "Virtual Worlds" },
  { icon: "fa-vcard", label: "Trading Cards" },
  { icon: "fa-th", label: "Collectibles" },
];

const BrowseByCategory = () => {
  return (
    <section id="section-category" className="no-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Browse by category</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {categories.map((category, index) => (
            <div
              key={category.label}
              className="col-md-2 col-sm-4 col-6 mb-sm-30 fade-left-20"
              data-aos="fade-left"
              data-aos-once="true"
              data-aos-easing="ease-out"
              data-aos-delay={index * 50}
              data-aos-duration="600"
            >
              <Link to="/explore" className="icon-box style-2 rounded">
                <i className={`fa ${category.icon}`}></i>
                <span>{category.label}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
