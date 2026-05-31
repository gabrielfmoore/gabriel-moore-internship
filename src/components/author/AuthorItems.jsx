import React from "react";
import NftItem, { NftItemSkeleton } from "../UI/NftItem";

const AuthorItems = ({ items = [], author, isLoading }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {!isLoading
            ? items.map((item) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={item.id}
                >
                  <NftItem
                    item={{
                      ...item,
                      authorImage: author.authorImage,
                      authorId: author.authorId,
                      authorName: author.authorName,
                    }}
                  />
                </div>
              ))
            : new Array(4).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <NftItemSkeleton />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
