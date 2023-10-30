// Define the API endpoint for retrieving movie reviews
const APILINK = 'http://localhost:8000/api/v1/reviews/';

// Parse the URL to get the movie ID and title from the query parameters
const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

// Get references to HTML elements by their IDs
const main = document.getElementById("section"); // The main section for displaying movie reviews
const title = document.getElementById("title"); // The title element displaying the movie title

// Set the movie title in the HTML
title.innerText = movieTitle;

// Create a new review input form
const div_new = document.createElement('div');
div_new.innerHTML = `
  <div class="row">
    <div class="column">
      <div class="card-rating">
        <h2 style="display: flex; justify-content: space-between; align-items: center;">
          Add New Review
          <a href="#" onclick="saveReview('new_review', 'new_user')"><img src="./image/send.png" alt="" style="width: 40px;"></a>
        </h2>
        <p><strong>Review: </strong>
          <input type="text" id="new_review" value="">
        </p>
        <p><strong>User: </strong>
          <input type="text" id="new_user" value="">
        </p>
      </div>
    </div>
  </div>
`;
main.appendChild(div_new);

// Call the returnReviews function to display existing reviews
returnReviews(APILINK);

// Define the returnReviews function to fetch and display reviews
function returnReviews(url) {
  fetch(url + "movie/" + movieId)
    .then(res => res.json())
    .then(function(data) {
      console.log(data);
      data.forEach(review => {
        const div_card = document.createElement('div');
        div_card.innerHTML = `
          <div class="row">
            <div class="column">
              <div class="card-rating" id="${review._id}">
                <p><strong>Review: </strong>${review.review}</p>
                <p><strong>User: </strong>${review.user}</p>
                <p style="display: flex; justify-content: right;">
                  <a href="#" onclick="editReview('${review._id}','${review.review}', '${review.user}')">
                    <img src="./image/edit.png" alt="" style="width: 40px; margin-top: 5px;">
                  </a>
                  <a href="#" onclick="deleteReview('${review._id}')">
                    <img src="./image/delet.png" alt="" style="width: 40px;">
                  </a>
                </p>
              </div>
            </div>
          </div>
        `;
        main.appendChild(div_card);
      });
    });
}

// Define the editReview function to allow editing of a review
function editReview(id, review, user) {
  const element = document.getElementById(id);
  const reviewInputId = "review" + id;
  const userInputId = "user" + id;

  element.innerHTML = `
    <p><strong>Review: </strong>
      <input type="text" id="${reviewInputId}" value="${review}">
    </p>
    <p><strong>User: </strong>
      <input type="text" id="${userInputId}" value="${user}">
    </p>
    <p style="display: flex; justify-content: right;">
      <a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}')">
        <img src="./image/send.png" alt="" style="width: 40px;">
      </a>
    </p>
  `;
}

// Define the saveReview function to save or update a review
function saveReview(reviewInputId, userInputId, id = "") {
  const review = document.getElementById(reviewInputId).value;
  const user = document.getElementById(userInputId).value;

  if (id) {
    // If an ID is provided, update the review
    fetch(APILINK + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "user": user, "review": review })
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        location.reload(); // Reload the page after updating the review
      });
  } else {
    // If no ID is provided, create a new review
    fetch(APILINK + "new", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "user": user, "review": review, "movieId": movieId })
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        location.reload(); // Reload the page after adding a new review
      });
  }
}

// Define the deleteReview function to delete a review
function deleteReview(id) {
  fetch(APILINK + id, {
    method: 'DELETE'
  }).then(res => res.json())
    .then(res => {
      console.log(res);
      location.reload(); // Reload the page after deleting the review
    });
}
