import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [followerCount, setFollowerCount] = useState(null);
  const [isFollowing, setIsFollowing] = useState("Follow");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setAuthor(data);
        setFollowerCount(data.followers);
      })
      .catch((error) => {
        console.error("Error fetching author:", error);
        setAuthor(null);
        setFollowerCount(null);
      })
      .finally(() => setIsLoading(false));
  }, [authorId]);

  if (!author && !isLoading) return null;

  const followAuthor = () => {
    if (followerCount && isFollowing === "Follow") {
      setFollowerCount(followerCount + 1);
      setIsFollowing("Unfollow");
    } else if (isFollowing === "Unfollow") {
      setFollowerCount(followerCount - 1);
      setIsFollowing("Follow");
    } else {
      setFollowerCount(1);
      setIsFollowing("Unfollow");
    }
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {!isLoading ? (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">
                              @{author.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {followerCount} followers
                        </div>
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={followAuthor}
                        >
                          {isFollowing}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton height={150} width={150} borderRadius="50%"/>
                        <div className="profile_name">
                          <h4>
                          <Skeleton height={24} width={200}/>
                            <span className="profile_username">
                          <Skeleton height={16} width={100}/>
                            </span>
                            <span id="wallet" className="profile_wallet">
                          <Skeleton height={16} width={250}/>
                            </span>

                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        
                        <Skeleton height={40} width={150}/>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={author?.nftCollection || []}
                    author={author}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
