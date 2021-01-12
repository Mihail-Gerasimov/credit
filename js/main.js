window.addEventListener('DOMContentLoaded', () => {

    const cards = document.querySelectorAll('.calc__calc-card'),
        payment = document.querySelector('.calc__calc-sum'),
        select = document.querySelector('.calc__select'),
        calcInput = document.querySelector('.calc__calc-input');

    function prettify(num) {
        var n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }

    function getPayment(sum, period, rate) {
        // *
        // * sum - сумма кредита
        // * period - срок в годах
        // * rate - годовая ставка в процентах
        // * 
        let i,
            koef;

        // ставка в месяц
        i = (rate / 12) / 100;

        // коэффициент аннуитета
        koef = (i * (Math.pow(1 + i, period * 12))) / (Math.pow(1 + i, period * 12) - 1);

        // итог
        payment.textContent = (sum * koef).toFixed();
    };

    function getPaymentDesktop() {
        cards.forEach(card => {
            if (card.classList.contains('calc__calc-card--active')) {
                let sum = +calcInput.value.replace(/\D/g, ''),
                    period = +card.dataset.period;

                getPayment(sum, period, 4);
            }
        });
    }

    function getPaymentMobile() {
        let sum = +document.querySelector('.calc__calc-input').value.replace(/\D/g, ''),
            period = +select.value;

        getPayment(sum, period, 4);
    }

    function clearActiveClass() {
        cards.forEach(card => {
            card.classList.remove('calc__calc-card--active');
        });
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            clearActiveClass();
            card.classList.add('calc__calc-card--active'); +
            calcInput.value.replace(/\D/g, '') >= 100000 && +calcInput.value.replace(/\D/g, '') <= 20000000 ? getPaymentDesktop() : payment.textContent = '0';
        });
    });

    select.addEventListener('input', () => {
        +calcInput.value.replace(/\D/g, '') >= 100000 && +calcInput.value.replace(/\D/g, '') <= 20000000 ? getPaymentMobile() : payment.textContent = '0';
    });

    calcInput.addEventListener('input', () => {
        if (calcInput.value[0] == 0) {
            calcInput.value = calcInput.value.replace(/./g, '');
        }
        calcInput.value = calcInput.value.replace(/\D/g, '');

        calcInput.value = prettify(calcInput.value);
        getPaymentDesktop();

        if (+calcInput.value.replace(/\D/g, '') > 20000000) {
            calcInput.value = prettify(20000000);
        }

        if (+calcInput.value.replace(/\D/g, '') >= 100000 && +calcInput.value.replace(/\D/g, '') <= 20000000) {
            if (select.value != '') {
                getPaymentMobile()
            }
            getPaymentDesktop();
        } else {
            payment.textContent = '0';
        }

    });


    // Слайдер в секции "Немного о нашей компании" с прогрессбаром.

    function setProgress(index, slider, progressBar) {
        const calc = ((index + 1) / (slider.slick('getSlick').slideCount)) * 100;

        progressBar
            .css('background-size', `${calc}% 100%`)
            .attr('aria-valuenow', calc);

        // $progressBarLabel.text(`${calc.toFixed(2)}% completed`);
    }

    const $slider = $('.variable-width'),
          $progressBar = $('.info__progress');
    // const $progressBarLabel = $('.slider__label');

    $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        setProgress(nextSlide, $slider, $progressBar);
    });

    $slider.slick({
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
        arrow: false
    });

    setProgress(0, $slider, $progressBar);

    document.querySelector('.info__slider .slick-next').style.display = 'none';

    // Accordion
    const questions = document.querySelectorAll('.questions__question-header');

    questions.forEach(question => {
        question.addEventListener('click', () => {
            question.nextSibling.nextSibling.classList.toggle('questions__question-content--active');
            question.classList.toggle('questions__question-header--active');
        });
    });

});

// Слайдер в секции "Оформим кредит" с прогрессбаром

if ($(window).width() < 426) {
    function setProgress(index, slider, progressBar) {
        const calc = ((index + 1) / (slider.slick('getSlick').slideCount)) * 100;

        progressBar
            .css('background-size', `${calc}% 100%`)
            .attr('aria-valuenow', calc);

        // $progressBarLabel.text(`${calc.toFixed(2)}% completed`);
    }
    
    const sliderСredit = $('.single-item'),
          progressCredit = $('.arrange__progress');

    sliderСredit.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        setProgress(nextSlide, sliderСredit, progressCredit);
    });

    sliderСredit.slick({
        infinite: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        centerMode: true,
        centerPadding: '30px'
    });

    setProgress(0, sliderСredit, progressCredit);
}