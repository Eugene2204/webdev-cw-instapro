import { getToken, renderApp, posts, setPosts } from "../index.js";
import { setLike, removeLike, getUserPosts } from "../api.js";

export const likeEventListener = () => {
    const likeButtons = document.querySelectorAll(".like-button");

    likeButtons.forEach(likeButton => {
      likeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const postId = likeButton.dataset.postId;
        const index = likeButton.dataset.index;
        const postHeader = document.querySelector('.post-header');
        const userId = postHeader.dataset.userId;
        likeButton.classList.add("shake-bottom");

        if (posts[index].isLiked) {
          removeLike({ token: getToken(), postId })
            .then(() => {
              posts[index].isLiked = false;
            })
            .then(() => {
              getUserPosts({ token: getToken(), userId })
                .then((response) => {
                  setPosts(response);
                  likeButton.classList.remove("shake-bottom");
                  renderApp();
                })
            })
        } else {
          setLike({ token: getToken(), postId })
            .then(() => {
              posts[index].isLiked = true;
            })
            .then(() => {
              getUserPosts({ token: getToken(), userId })
                .then((response) => {
                  setPosts(response);
                  likeButton.classList.remove("shake-bottom");
                  renderApp();
                })
            })
        }
      });
    });
  };