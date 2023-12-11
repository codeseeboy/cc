// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}
// carousel slider js
$('.team_carousel').owlCarousel({
    loop: true,
    margin: 15,
    dots: true,
    autoplay: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1,
            margin: 0
        },
        576: {
            items: 2,
        },
        992: {
            items: 3
        }
    }
})

  document.addEventListener("DOMContentLoaded", function() {
    var searchForm = document.getElementById("searchForm");
    var searchButton = document.getElementById("searchButton");
    var searchInput = document.getElementById("searchInput");

    searchButton.addEventListener("click", function() {
      searchForm.classList.toggle("active");
      searchInput.style.display = searchForm.classList.contains("active") ? "block" : "none";
    });
  });


  document.addEventListener("DOMContentLoaded", function() {
    var searchForm = document.getElementById("searchForm");
    var searchButton = document.getElementById("searchButton");
    var searchInput = document.getElementById("searchInput");
    var searchResultsSection = document.getElementById("searchResults");

    // Define a function to perform the search
    function performSearch(query) {
      // You can customize this part based on your content
      // For now, let's assume you have an array of objects representing pages
      var pages = [
        { title: "Book Appointment Form", url: "/book-appointment" },
        // Add more pages as needed
      ];

      // Filter pages based on the query
      var searchResults = pages.filter(function(page) {
        return page.title.toLowerCase().includes(query.toLowerCase());
      });

      // Display the search results
      displaySearchResults(searchResults);
    }

    // Define a function to display search results
    function displaySearchResults(results) {
      // Clear previous search results
      searchResultsSection.innerHTML = "";

      if (results.length === 0) {
        // If no results found
        searchResultsSection.innerHTML = "<p>No results found.</p>";
      } else {
        // If results found, create links for each result
        results.forEach(function(result) {
          var resultLink = document.createElement("a");
          resultLink.href = result.url;
          resultLink.textContent = result.title;

          var resultItem = document.createElement("div");
          resultItem.appendChild(resultLink);
          searchResultsSection.appendChild(resultItem);
        });
      }

      // Show the search results section
      searchResultsSection.style.display = "block";
    }

    searchButton.addEventListener("click", function() {
      var query = searchInput.value.trim();

      if (query !== "") {
        // Perform the search when the query is not empty
        performSearch(query);
      } else {
        // If the query is empty, hide the search results section
        searchResultsSection.style.display = "none";
      }
    });
  });
     function gogBack() {
            // Use the history object to navigate back
            window.history.back();

     }