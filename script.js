$(function () {
    loadProduct();

});
function loadProduct() {
    $.ajax({
        url: "https://usman-fake-api.herokuapp.com/api/products",
        method: 'GET',
        success: function (response) {
            console.log(response);
            var product = $("#product");
            product.empty();
            for (var i = 0; i < response.length; i++) {
                var pro = response[i];

                product.append(`<div class = "product"><h3>${pro.name}</h3><p>${pro.description}</p></div>`)
                //product.append("<div><h3>" + pro.name + "</h3></div>")
            }
        }
    })
}