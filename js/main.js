var jsonStringListOfFood = '{ "items" : [ '                                           +
    '{ "label": "Grizzly Bear Toy", "name": "GrizzlyBearToy",     "price": "15" },'   +
    '{ "label": "Panda Bear Toy", "name": "PandaBearToy",   "price": "16" },'         +
    '{ "label": "Polar Bear Toy", "name": "PolarBearToy",       "price": "13" },'     +
    '{ "label": "Sloth Toy", "name": "SlothToy",      "price": "18" },'               +
    '{ "label": "Wolf Toy", "name": "WolfToy",     "price": "17" } '                  +
    '] }';

$(document).ready(function(){
    var jsonObjectListOfFood = JSON.parse(jsonStringListOfFood);

    var jsonObjectList = jsonObjectListOfFood.items;
    for (i = 0; i < jsonObjectList.length; i++) {
        var object = jsonObjectList[i];

        // add card for object
        var itemLabel = object.label;
        var itemName = object.name;
        var itemPrice = object.price;

        var newCard = getCardElement(itemLabel, itemName, itemPrice);
        $('#food-items').append(newCard);
    }

    $("#search-bar").on("keyup", filterCards);

    $("#food-items .card").hover(addHighlight, removeHighlight);

    $('#food-items .card .fa-minus-square').click(removeCartItem);
    $('#food-items .card .fa-plus-square').click(addCartItem);

    $('.checkout #checkout-btn').click(checkoutCart);
});

/* Create card */
function getCardElement(itemLabel, itemName, itemPrice) {
    var newCard =   '<div class="card bg-light">'           +
                    '<div class="card-body text-center">'   +
                    '<h2 class="card-text">'                +
                    itemLabel                               +
                    '</h2>'                                 +
                    '<img src="img/'                   +
                    itemName                                +
                    '.jpg">'                                +
                    '<h5> $'                                +
                    itemPrice                               +
                    '</h5>'                                 +
                    '<div class="cart-buttons">'            +
                    '<i class="fas fa-minus-square fa-2x"> </i>'    +
                    '<span class="qty"> Qty: '              +
                    '<span class="qty-value"> 0 </span>'    +
                    '</span>'                               +
                    '<i class="fas fa-plus-square fa-2x"></i>'      +
                    '</div>'                                +
                    '</div>'                                +
                    '</div>';
    return newCard;
}

/* Filtering */
function filterCards() {
    var searchTerm = $(this).val().toLowerCase();

    $("#food-items .card").each(function() {
        var cardContent = $(this).find('h2.card-text').text().toLowerCase();
        var searchMatch = cardContent.indexOf(searchTerm) > -1;
        $(this).toggle(searchMatch); // show if match, hide if not matched
    });
}

/* Hover */
function addHighlight() {
    $(this).removeClass("bg-light")
    $(this).addClass("text-white bg-info");
}

function removeHighlight() {
    $(this).removeClass("text-white bg-info");
    $(this).addClass("bg-light")
}

/* Cart */
function addCartItem() {
    var quantityHolder = $(this).parent('.cart-buttons').find('.qty-value').first();

    var currentQty = parseInt(quantityHolder.text());
    var newQty = currentQty + 1;
    quantityHolder.html(newQty);
}

function removeCartItem() {
    var quantityHolder = $(this).parent('.cart-buttons').find('.qty-value').first();

    var currentQty = parseInt(quantityHolder.text());
    console.log(currentQty);
    var newQty = Math.max(currentQty - 1, 0)
    quantityHolder.html(newQty);
}

/* Checkout */
function checkoutCart() {
    var receipt = {};
    receipt["totalCost"] = 0;

    var foodItemsContainer = $(this).parents('body').find('#food-items');
    foodItemsContainer.find('.card').each(function() {
        var itemName = $(this).find('h2.card-text').text();

        var itemPriceString = $(this).find('h5').text().replace("$", "");
        var itemPriceInt = parseInt(itemPriceString);
        
        var itemQtyString = $(this).find('.qty-value').text();
        var itemQtyInt = parseInt(itemQtyString);
        
        var itemCost = itemPriceInt * itemQtyInt;

        if (itemCost > 0) {
            receipt[itemName] = itemQtyString;
            receipt["totalCost"] += itemCost;
        }
    });

    console.log(receipt);

    var message = "Confirm and proceed to payment";
    message += "\n Total cost: " + receipt["totalCost"];
    


 

    for (var itemName in receipt) {
        // iterate through attributes of receipt
        if (itemName == "totalCost") {
            continue;
        }

        var itemQtyString = receipt[itemName];
        message += "\n" + itemQtyString + "x  " + itemName;
    }

    var response = confirm(message);

    if (response == true) {
        // direct to payment
        console.log("Proceeding to payment")
        sessionStorage.setItem("totalCost", receipt["totalCost"]);
        window.location.replace("payment.html");

    }

}
