(function () {
  "use strict";
 
  var ready = function () {
    var TOGGLER_MENUBTN = document.querySelector('.toggler-menu');
    var MENU = document.querySelector('#menu');
    var STICKY = document.querySelector('.sticky');
    var MODAL = document.querySelector('#modal');
    var MODAL_CONTENT = MODAL.querySelector('.modal__content');
    var MODAL_BTN_CLOSE = document.querySelector('.modal__close-button');
    var CONTENT_MODAL = 'Модальное окно закрывается по клику на \'кнопку крестик\' или нажатием клавиши \'ESC\'';
    var COLOR = 'orange';
    var CALCULATE = document.querySelector('#calculate');
    var NUM_INPUT = CALCULATE.querySelector('.calculate__num');
    var CALCULATE_TOTAL = CALCULATE.querySelector('.calculate__total');
    var CALCULATE_BTN = document.querySelector('.calculate__btn');
    var MODIFIER = document.querySelectorAll('[name="modifier"]');

    var clickTogglerMenuHandler = function (evt) {
      MENU.classList.toggle('menu-lists_js-open');
    };

    var changeWidthWindowAndInitStickyHandler = function () {
      console.log('scroll');
      var coords = STICKY.getBoundingClientRect();
      var positionWindow = window.pageYOffset;
      if (STICKY.offsetHeight * 2 <= positionWindow) {
        setSticky(STICKY);
      } else {
        offSticky(STICKY);
      }
    };

    var setSticky = function (elem) {
      if (!elem) {
        return;
      }
      var parentElement = elem.parentElement;
      
      var changeWidthWindowHandler = function () {
        var coords = parentElement.getBoundingClientRect();
        var elemWidth = parentElement.offsetWidth;

        elem.style.left = coords.left + "px";
        elem.style.width = elemWidth + "px";
      };

      var initStyle = changeWidthWindowHandler;

      initStyle();
      parentElement.style.paddingTop = elem.offsetHeight + "px";
      elem.classList.add('sticky__js-on');
      window.addEventListener('resize', changeWidthWindowHandler);
    };

    var offSticky = function (elem) {
      elem.removeAttribute('style');
      elem.parentElement.removeAttribute('style');
      elem.classList.remove('sticky__js-on');
    };

    var closedModal = function () {
      MODAL.classList.remove('modal_js-open');
      document.body.removeAttribute('style');
      MODAL_CONTENT.removeAttribute('style');
    };

    var clickCloseModalHandler = function (evt) {
      closedModal();
      MODAL_BTN_CLOSE.removeEventListener('click', clickCloseModalHandler);
    };
    
    var keyupEscHandler = function (evt) {
      if (evt.keyCode === 27) {
        closedModal();
        document.removeEventListener('keyup', keyupEscHandler);
      }
    };

    var openModal = function (content, color) {
      document.body.style.overflow = 'hidden';
      MODAL.classList.add('modal_js-open');
      MODAL_CONTENT.style.backgroundColor = color;
      MODAL_CONTENT.querySelector('p').textContent = content;
      MODAL_BTN_CLOSE.addEventListener('click', clickCloseModalHandler);
      document.addEventListener('keyup', keyupEscHandler);
    };
    
    var clickMenuHandler = function (evt) {
      var target = evt.target;
      while (target != MENU) {
        if (target.tagName === 'A') {
          openModal(CONTENT_MODAL, COLOR);
          return;
        }
        target = target.parentElement;
      }
    };

    var calculateHandler = function () {
      var price = 10000;
      var rub = 'руб.';
      var num = NUM_INPUT.value;
      var modifierNum;

      if (num < 10 || num > 200) {
        CALCULATE_TOTAL.textContent = 'Введите правильную площадь!'
        return;
      }
      
      for (var i = 0; i < MODIFIER.length; i++) {
        if (MODIFIER[i].checked === true && MODIFIER[i].value) 
          modifierNum = MODIFIER[i].value;
      }
      if (num >= 51 && num <= 100) {
        price = 15000;
      } else if (num >= 101 && num <= 200) {
        price = 20000;
      }
      
      var total = num * price;
      if (modifierNum != 0) {
        total = num * price * (modifierNum / 100);
      }
      CALCULATE_TOTAL.textContent = total + rub;
    };

    TOGGLER_MENUBTN.addEventListener("click", clickTogglerMenuHandler);
    window.addEventListener('scroll', changeWidthWindowAndInitStickyHandler);
    MENU.addEventListener("click", clickMenuHandler);
    CALCULATE_BTN.addEventListener("click", calculateHandler);
  };

  document.addEventListener("DOMContentLoaded", ready);

})();
