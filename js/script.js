document
  .getElementById("decisionTreeForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const preference = document.getElementById("preference").value;
    const type = document.getElementById("type").value;
    const budget = document.getElementById("budget").value;

    // Generate recommendation based on user input
    const recommendation = getRecommendation(preference, type, budget);

    // Update text and images
    const recommendationText = document.getElementById("recommendationText");
    recommendationText.textContent = recommendation.text;

    const imagesDiv = document.getElementById("images");
    imagesDiv.innerHTML = ""; // Clear previous images

    recommendation.images.forEach((image) => {
      const img = document.createElement("img");
      img.src = image;
      img.alt = "Recommendation Image";
      imagesDiv.appendChild(img);
    });
});  
// Mapping recommendations to user choices
const recommendations = {
    "Beach-Adventure-Low": {
      text: "Visit Goa, India, for budget-friendly water sports and a vibrant beach culture.",
      images: [
        "https://cfimages.mercuryholidays.co.uk/3vgdkcmqrnp2/14t4QBlzCYSIwGKGxy3Op1/a4c7ca1cba1310ba05e512c7d1ca3c43/Goa_Beach_Stay.jpg?w=1920&fm=jpg&fl=progressive",
        "https://www.tripsavvy.com/thmb/jVuYPKjTAokiT7A0ir27GkyY7cg=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-903398436-5c612e4a46e0fb00017dd31f.jpg",
        "https://i.ytimg.com/vi/zxQle3ijtjI/maxresdefault.jpg",
        "https://dynamic.tourtravelworld.com/package-images/photo-big/dir_24/696414/312346.jpg"
      ]
    },
    "Beach-Adventure-Medium": {
      text: "We recommend a trip to Bali, Indonesia! Enjoy sandy beaches, water sports, and cultural exploration.",
      images: [
        "https://insiderjourneys.com.au/wp-content/uploads/2020/01/Indonesia-Bali-pura-ulun-danu-bratan-temple-shutterstock_638432449-1920.jpg",
        "https://d22ir9aoo7cbf6.cloudfront.net/wp-content/uploads/sites/4/2019/05/KelingKing-Beach-Nusa-Penida-Bali-Indonesia.jpg",
        "https://www.balistarisland.com/wp-content/uploads/2016/07/baliwatersportactivities.jpg",
        "https://www.ncl.com/sites/default/files/1000x667-Bali-Indonesia-Cruise-Norwegian-couple.jpg"
      ]
    },
    "Beach-Adventure-High": {
      text: "Explore the Maldives for luxurious beach villas, thrilling diving experiences, and top-tier resorts.",
      images: [
        "https://images.pexels.com/photos/861292/pexels-photo-861292.jpeg",
        "https://source.unsplash.com/300x300/?luxury-beach",
        "https://source.unsplash.com/300x300/?diving",
        "https://source.unsplash.com/300x300/?resorts"
      ]
    },
    "Beach-Relaxation-Low": {
      text: "Relax in Gokarna, India, where serene beaches meet budget-friendly accommodations.",
      images: [
        "https://source.unsplash.com/300x300/?gokarna",
        "https://source.unsplash.com/300x300/?serene-beach",
        "https://source.unsplash.com/300x300/?relaxation",
        "https://source.unsplash.com/300x300/?gokarna-travel"
      ]
    },
    "Beach-Relaxation-Medium": {
      text: "Experience the beauty of Phuket, Thailand, with affordable luxury and tranquil beaches.",
      images: [
        "https://source.unsplash.com/300x300/?phuket",
        "https://source.unsplash.com/300x300/?thailand-beach",
        "https://source.unsplash.com/300x300/?affordable-luxury",
        "https://source.unsplash.com/300x300/?phuket-relaxation"
      ]
    },
    "Beach-Relaxation-High": {
      text: "Indulge in a premium getaway to Bora Bora, French Polynesia, with overwater bungalows and serene waters.",
      images: [
        "https://source.unsplash.com/300x300/?bora-bora",
        "https://source.unsplash.com/300x300/?overwater-bungalow",
        "https://source.unsplash.com/300x300/?luxury-beach",
        "https://source.unsplash.com/300x300/?bora-bora-travel"
      ]
    },
    "Mountains-Adventure-Low": {
      text: "Go trekking in the Appalachian Mountains, USA, for an adventurous yet affordable experience.",
      images: [
        "https://source.unsplash.com/300x300/?appalachian-mountains",
        "https://source.unsplash.com/300x300/?trekking",
        "https://source.unsplash.com/300x300/?adventure",
        "https://source.unsplash.com/300x300/?appalachian-travel"
      ]
    },
    "Mountains-Adventure-Medium": {
      text: "Explore the Rockies in Canada, where adventure meets breathtaking views and a medium budget suffices.",
      images: [
        "https://source.unsplash.com/300x300/?rocky-mountains",
        "https://source.unsplash.com/300x300/?canada-adventure",
        "https://source.unsplash.com/300x300/?mountain-views",
        "https://source.unsplash.com/300x300/?rockies-travel"
      ]
    },
    "Mountains-Adventure-High": {
      text: "Visit the Swiss Alps for world-class skiing, luxury lodges, and stunning mountain scenery.",
      images: [
        "https://source.unsplash.com/300x300/?swiss-alps",
        "https://source.unsplash.com/300x300/?skiing",
        "https://source.unsplash.com/300x300/?luxury-lodge",
        "https://source.unsplash.com/300x300/?swiss-alps-travel"
      ]
    },
    "Mountains-Relaxation-Low": {
      text: "Enjoy a peaceful retreat in the Blue Ridge Mountains, USA, with scenic drives and budget cabins.",
      images: [
        "https://source.unsplash.com/300x300/?blue-ridge-mountains",
        "https://source.unsplash.com/300x300/?cabins",
        "https://source.unsplash.com/300x300/?scenic-drive",
        "https://source.unsplash.com/300x300/?relaxation-retreat"
      ]
    },
    "Mountains-Relaxation-Medium": {
      text: "Discover the tranquility of the Scottish Highlands, perfect for medium-budget travelers.",
      images: [
        "https://source.unsplash.com/300x300/?scottish-highlands",
        "https://source.unsplash.com/300x300/?scenic-landscape",
        "https://source.unsplash.com/300x300/?medium-budget",
        "https://source.unsplash.com/300x300/?scotland-travel"
      ]
    },
    "Mountains-Relaxation-High": {
      text: "Stay at a luxury spa resort in the French Alps for ultimate relaxation and high-end comfort.",
      images: [
        "https://source.unsplash.com/300x300/?french-alps",
        "https://source.unsplash.com/300x300/?spa-resort",
        "https://source.unsplash.com/300x300/?luxury-travel",
        "https://source.unsplash.com/300x300/?alps-relaxation"
      ]
    }
  };
// Function to get the recommendation dynamically
function getRecommendation(preference, type, budget) {
  const key = `${preference}-${type}-${budget}`;
  return recommendations[key] || {
        text: "Explore options that match your preferences! The world is full of amazing destinations.",
        images: [
          "https://source.unsplash.com/300x300/?travel",
          "https://source.unsplash.com/300x300/?adventure",
          "https://source.unsplash.com/300x300/?relaxation",
          "https://source.unsplash.com/300x300/?explore"
        ]
      };
    }
