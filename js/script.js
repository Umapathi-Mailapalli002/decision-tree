const recommendationContainer = document.getElementById("recommendationContainer");
recommendationContainer.style.display = "none";
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
    recommendationContainer.style.display = "block";

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
        "https://d36tnp772eyphs.cloudfront.net/blogs/1/2011/05/maldives-1200x853.jpg",
        "http://cdn1.images.touristlink.com/repository/2014/10/A/Y/A/D/A/M/A/L/D/I/V/E/S/H/O/T/E/L/ayada-maldives-hotel-resort-ayada-maldives-resort-the-perfect-place-for-holiday.jpg",
        "https://1.bp.blogspot.com/-eaFTA7t50HQ/VQFqgsDEDAI/AAAAAAAAAqw/0P95K0FlCLQ/s1600/Maldives-diving-locations.jpg",
        "https://pix10.agoda.net/hotelImages/49058/-1/464a47ead512372db61032db14b38e11.jpg"
      ]
    },
    "Beach-Relaxation-Low": {
      text: "Relax in Gokarna, India, where serene beaches meet budget-friendly accommodations.",
      images: [
        "https://blog.yatradham.org/wp-content/uploads/2021/11/gokarna-temple.jpg",
        "https://www.tripsavvy.com/thmb/HlgEk3EUeXsRwZbagC4Z1ilwUsg=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-148705447-5a514b9dbeba330037019ac2.jpg",
        "https://i.ytimg.com/vi/hqV7YX37rhk/hqdefault.jpg",
        "https://i.ytimg.com/vi/6jXEEHBixeo/maxresdefault.jpg"
      ]
    },
    "Beach-Relaxation-Medium": {
      text: "Experience the beauty of Phuket, Thailand, with affordable luxury and tranquil beaches.",
      images: [
        "https://a.cdn-hotels.com/gdcs/production109/d1280/8a00a6e3-e4e9-46ba-9a82-36154eaf29ea.jpg",
        "https://touringhighlights.com/wp-content/uploads/2020/09/Phang-Nga-Bay-Phuket-Thailand.jpg",
        "https://cdn.luxuo.com/2017/05/rsz_anbr-img01_re.jpg",
        "https://cdn.phuket.net/bucket/directory/media/2022/03/202203240430_6FcF_002.jpeg"
      ]
    },
    "Beach-Relaxation-High": {
      text: "Indulge in a premium getaway to Bora Bora, French Polynesia, with overwater bungalows and serene waters.",
      images: [
        "https://cache.marriott.com/marriottassets/marriott/BOBMD/bobmd-bungalow-2940-hor-clsc.jpg?interpolation=progressive-bilinear&",
        "https://sandinmysuitcase.com/wp-content/uploads/2020/10/FS-Bora-Bora-Bungalows.jpg",
        "https://global-uploads.webflow.com/5fda95cd487da57637f0cbfe/60a6b189113ace143db49fb5_intercontinental-bora-bora-thalasso-spa-aerial-view-overwater-villas-780.jpg",
        "https://etahititravel.com/wp-content/uploads/2017/01/sejour-grand-luxe-a-bora-bora-la-perle-du-pacifique-four-season-paddle-e-tahiti-travel.jpg"
      ]
    },
    "Mountains-Adventure-Low": {
      text: "Go trekking in the Appalachian Mountains, USA, for an adventurous yet affordable experience.",
      images: [
        "https://www.muchbetteradventures.com/magazine/content/images/2021/06/Blue-Ridge-Mountains-at-sunset-in-north-Georgia--USA..jpg",
        "https://img.traveltriangle.com/blog/wp-content/uploads/2019/01/cover-for-appalachian.jpg",
        "https://i.pinimg.com/originals/93/84/01/938401735cd7084f71b6d0cbc564dded.jpg",
        "https://lp-cms-production.imgix.net/2021-01/shutterstockRF_1195345237.jpg?auto=format&q=40&w=870&dpr=5"
      ]
    },
    "Mountains-Adventure-Medium": {
      text: "Explore the Rockies in Canada, where adventure meets breathtaking views and a medium budget suffices.",
      images: [
        "https://images.squarespace-cdn.com/content/v1/5a87961cbe42d637c54cab93/1616705038512-6CECZZNROGXXF9R33EXF/canadian-rockies-travel-guide.jpg",
        "https://i.ytimg.com/vi/WR60bYipVU8/maxresdefault.jpg",
        "https://images.takeshape.io/decc50a7-e43f-4c99-b5e9-cc327d2e1b93/dev/370be511-4e05-4717-a291-8bc5c0be1bac/Canadian-Rockies-Rocky-Mountains-Road-Trip-Fall-Travel-Guide-Marriott-AwayLands-077.jpg",
        "https://www.backroads.com/sites/default/files/blog/2015/11/LarchValley-Valley-of-the-Ten-Peaks.jpg"
      ]
    },
    "Mountains-Adventure-High": {
      text: "Visit the Swiss Alps for world-class skiing, luxury lodges, and stunning mountain scenery.",
      images: [
        "https://i1.wp.com/www.snowsbest.com/wp-content/uploads/2016/07/resort1.jpg?fit=1200%2C800&ssl=1",
        "https://a.cdn-hotels.com/gdcs/production170/d136/d97c8af5-b49a-4aaf-bcd3-eb8416cef161.jpg",
        "https://www.luxurychalets.ch/wp-content/uploads/2017/02/Chalet-Aurora-Verbier-Living-Room.jpg",
        "https://arzotravels.com/wp-content/uploads/2017/11/Skiers-on-the-way-to-ski-slope-in-Swiss-Alps-Ski-resort-zermatt-Matterhorn-Switzerland.jpg"
      ]
    },
    "Mountains-Relaxation-Low": {
      text: "Enjoy a peaceful retreat in the Blue Ridge Mountains, USA, with scenic drives and budget cabins.",
      images: [
        "https://actiontourguide.com/wp-content/uploads/2022/05/Blue-Ridge-Parkway-Park-View.jpg",
        "https://i.pinimg.com/originals/89/be/21/89be2121e6cdba28f65b98137d283ed2.jpg",
        "https://www.gannett-cdn.com/presto/2018/11/10/USAT/71546490-52c3-4a2d-93b9-3d145b40cd8c-GettyImages-821062594.jpg?crop=2120,1193,x1,y221&width=2120&height=1193&format=pjpg&auto=webp",
        "https://blueridge.imgix.net/images/a222dd68-e2b8-4d88-8e0c-2025eafc4449.jpg?auto=compress%2Cformat&fit=max&h=1080&q=80&w=1920&s=db60485730be0144b9ffbd516cf724db"
      ]
    },
    "Mountains-Relaxation-Medium": {
      text: "Discover the tranquility of the Scottish Highlands, perfect for medium-budget travelers.",
      images: [
        "https://a.cdn-hotels.com/gdcs/production164/d749/673928ec-4714-47a6-87a9-745f787391b5.jpg",
        "https://cdn1.matadornetwork.com/blogs/1/2014/04/Vibrant-sunrise-at-Quiraing-on-the-Isle-of-Skye-Scotland-1200x854.jpg",
        "https://cache-graphicslib.viator.com/graphicslib/page-images/742x525/798191_LochNess,GlencoeAndTheHighlandsSmall_GroupDayTripfromEdinburgh_Glencoe_UnitedKingdom_21.jpg",
        "https://www.thescottishsun.co.uk/wp-content/uploads/sites/2/2017/12/nintchdbpict000341146736.jpg"
      ]
    },
    "Mountains-Relaxation-High": {
      text: "Stay at a luxury spa resort in the French Alps for ultimate relaxation and high-end comfort.",
      images: [
        "https://www.tripsavvy.com/thmb/ju-ojldMpQSeuKCCBqP1sgA0gA0=/2119x1415/filters:no_upscale():max_bytes(150000):strip_icc()/MontBlancGettyIWestend61-59329c745f9b589eb44e83cf.jpg",
        "https://www.golfholidays.com/images/1200-17636/the-hotel-ermitage-evian-resorts-lovely-spa-indoor-pool-situated-in-staggering-french-alps.jpg",
        "https://i.pinimg.com/originals/3c/89/9f/3c899f8ba6b4e5d4bdf6f96d95b904c1.jpg",
        "https://www.ultimatefrance.com/wp-content/uploads/2013/10/skiing-morzine.jpg"
      ]
    }
  };
// Function to get the recommendation dynamically
function getRecommendation(preference, type, budget) {
  const key = `${preference}-${type}-${budget}`;
  return recommendations[key] || {
        text: "Explore options that match your preferences! The world is full of amazing destinations.",
        images: [
          "https://www.travelalerts.ca/wp-content/uploads/2021/02/photo-1526772662000-3f88f10405ff.jpg",
          "https://cdn.discoverdominica.com/1200x630/staging/20180807182019-hdr-hiking-intermediate-adventure.jpeg",
          "https://www.vie-zen.com/wp-content/uploads/2014/12/11-Relaxation-Techniques.jpg",
          "https://www.tripsavvy.com/thmb/U_dXVtSg7cxhvYFflLDO_Rtd3es=/3865x2576/filters:fill(auto,1)/world-in-hands-478667956-5a55118ec7822d0037964a6e.jpg"
        ]
      };
    }
