const productList = document.getElementById('products-list');

// Fazendo a solicitação HTTP para a API
fetch('https://fakestoreapi.com/products')

  .then(response => response.json())
  .then(data => {
    data.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <h5>${product.title}</h5>
        <img src="${product.image}" alt="${product.title}" />
        <p>R$ ${product.price}</p>
      `;
      productList.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Ocorreu um erro:', error);
  });

  $(document).ready(function() {
    $.get("https://fakestoreapi.com/products", function(products) {
        var productContainer = $(".product-container");
        var carouselImages = $(".carousel-images ul");

        $.each(products, function(index, product) {

            var productElement = $("<div>").addClass("product");
            var titleElement = $("<h3>").text(product.title);
            var priceElement = $("<p>").text("Price: $" + product.price);


            productElement.append(titleElement, priceElement);
            productContainer.append(productElement);


            var imageElement = $("<img>").attr("src", product.image).attr("alt", product.title);
            var carouselImageItem = $("<li>").append(imageElement);


            carouselImages.append(carouselImageItem);
        });


        var carouselIndex = 0;
        var carouselItemsCount = carouselImages.children().length;

        $(".carousel-prev").click(function() {
            carouselIndex = (carouselIndex - 1 + carouselItemsCount) % carouselItemsCount;
            updateCarouselPosition();
        });

        $(".carousel-next").click(function() {
            carouselIndex = (carouselIndex + 1) % carouselItemsCount;
            updateCarouselPosition();
        });

        function updateCarouselPosition() {
            var leftPosition = -carouselIndex * 100 / 3 + "%";
            carouselImages.css("left", leftPosition);
        }
    });
});


$(document).ready(function() {
  var searchInput = $(".search-input");
  var resultsList = $(".results-list");

  searchInput.on("input", function() {
      var searchTerm = $(this).val().toLowerCase();
      resultsList.empty();

      if (searchTerm.length > 0) {
          $.get("https://fakestoreapi.com/products", function(products) {
              var filteredProducts = products.filter(function(product) {
                  return product.title.toLowerCase().includes(searchTerm);
              });

              if (filteredProducts.length > 0) {
                  filteredProducts.forEach(function(product) {
                      var listItem = $("<li>");
                      var productCard = $("<div>").addClass("product-card");
                      var productImage = $("<img>").attr("src", product.image).attr("alt", product.title);
                      var productName = $("<h3>").text(product.title);
                      var productPrice = $("<p>").text("Preço: $" + product.price);

                      productCard.append(productImage);
                      productCard.append(productName);
                      productCard.append(productPrice);
                      listItem.append(productCard);
                      resultsList.append(listItem);
                  });
              } else {
                  var noResults = $("<li>").text("Nenhum resultado encontrado");
                  resultsList.append(noResults);
              }
          });
      }
  });
});