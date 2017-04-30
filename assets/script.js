/* globals window */
(function () {
    "use strict";
    var data;
    window.X = function (response) {
        data = response;
        init();
    };
    var configText = function (text) {
        if (text.length > 80) {
            text = text.slice(0, 80) + '...';
        }
        return text;
    };

    var blocks = function (product, field) {
        var elementMainBlock = document.getElementById(field);
        var elementBlock = document.createElement('div');
        elementBlock.className = 'block';

        var elementLink = document.createElement('a');
        elementLink.href = product.detailUrl;
        elementLink.target = '_blank';

        var img = document.createElement('img');
        img.src = product.imageName;
        elementLink.appendChild(img);

        var text = document.createElement('h5');
        text.innerHTML = configText(product.name);
        elementLink.appendChild(text);

        if (product.oldPrice) {
            var oldPrice = document.createElement('h6');
            oldPrice.className = 'old_price';
            oldPrice.innerHTML = 'De: ' + product.oldPrice;
            elementLink.appendChild(oldPrice);
        }

        var price = document.createElement('h6');
        price.innerHTML = 'Por: <strong>' + product.price + '</strong>';
        elementLink.appendChild(price);

        var installments = document.createElement('h6');
        installments.innerHTML = product.productInfo.paymentConditions + ' sem juros';
        elementLink.appendChild(installments);

        elementBlock.appendChild(elementLink);
        elementMainBlock.appendChild(elementBlock);
    };


    var scroll = function (direction) {
        var el = document.getElementById('right-panel');
        var pos = el.scrollLeft;
        var fim = el.scrollLeft + 150;

        var id = setInterval(animate, 5);
        function animate() {
            if (pos === fim) {
                clearInterval(id);
            } else {
                pos++;
                if (direction === 'right') {
                    el.scrollLeft += 5;
                } else {
                    el.scrollLeft -= 5;
                }
            }
        }
    };

    var init = function () {
        var reference = data.data.reference.item;
        blocks(reference, 'visited-product', 0);

        var recommendation = data.data.recommendation;

        var tamanho = data.data.widget.size;
        tamanho = tamanho * 190;
        var elementScroll = document.getElementById('scrollable-products');
        elementScroll.style.width = tamanho + 'px';

        recommendation.forEach(function (value) {
            blocks(value, 'scrollable-products');
        });
        var right = document.getElementById('right');
        right.addEventListener('click', function () {
            scroll('right');
        }, false);
        var left = document.getElementById('left');
        left.addEventListener('click', function () {
            scroll('left');
        }, false);
    };
})();
