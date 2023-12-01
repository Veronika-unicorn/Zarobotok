'use strict';

function locationHashChanged() {
  if (location.hash) {
    var hash = location.hash.replace(/details/, '');
    history.replaceState({}, '', hash);
  }
}

window.onhashchange = locationHashChanged;

// Header scroll
const header = document.querySelector('#header');

document.addEventListener('DOMContentLoaded', () => {
  const listenersCallback = () => {
    const scroll = window.scrollY;

    if (scroll) {
      header.classList.add('sticky-navbar');
    } else {
      header.classList.remove('sticky-navbar');
    }
  };
  window.addEventListener('scroll', listenersCallback);
});

// Page scroll
document.querySelectorAll('a[href^=\'#\']:not(.no-scroll)').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    let href = this.getAttribute('href').substring(1);
    const scrollTarget = document.getElementById(href);
    const topOffset = document.querySelector('.header').offsetHeight;
    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

// RANGE
const dayRange = document.querySelector('#dayRange');
const dayValue = document.querySelector('#dayValue');
const hourRange = document.querySelector('#hourRange');
const hourValue = document.querySelector('#hourValue');
const sumRange = document.querySelector('#sumRange');
const sumValue = document.querySelector('#sumValue');
const finalSum = document.querySelector('.calculation__range__sum-value');

const calcTotal = () => {
  const dayRangeCount = dayRange.value;
  const hourRangeCount = hourRange.value;
  const sumRangeCount = sumRange.value;

  dayValue.innerHTML = dayRangeCount;
  hourValue.innerHTML = hourRangeCount;
  sumValue.innerHTML = sumRangeCount + '$';

  return dayRangeCount * hourRangeCount * sumRangeCount * 0.65 + 35;
};
finalSum.innerHTML = calcTotal();

dayRange.oninput = () => {
  finalSum.innerHTML = calcTotal();
};

hourRange.oninput = () => {
  finalSum.innerHTML = calcTotal();
};

sumRange.oninput = () => {
  finalSum.innerHTML = calcTotal();
};

const changeDayRange = () => {
  let x = dayRange.value;
  let color = 'linear-gradient(90deg, rgb(20,55,245)' + x * 10 / 3 + '%, rgba(0, 0, 0, 0.1)' + x * 10 / 3 + '%)';
  dayRange.style.background = color;
};
changeDayRange();

const changeHourRange = () => {
  let x = hourRange.value;
  let color = 'linear-gradient(90deg, rgb(20,55,245)' + (x - 1) * 100 / (8 - 1) + '%, rgba(0, 0, 0, 0.1)' + (x - 1) * 100 / (8 - 1) + '%)';
  hourRange.style.background = color;
};
changeHourRange();

const changeSumRange = () => {
  let x = sumRange.value;
  let color = 'linear-gradient(90deg, rgb(20,55,245)' + x / 3 + '%, rgba(0, 0, 0, 0.1)' + x / 3 + '%)';
  sumRange.style.background = color;
};
changeSumRange();

dayRange.addEventListener('mousemove', changeDayRange);
dayRange.addEventListener('touchmove', changeDayRange);
dayRange.addEventListener('touchend', changeDayRange);

hourRange.addEventListener('mousemove', changeHourRange);
hourRange.addEventListener('touchmove', changeHourRange);
hourRange.addEventListener('touchend', changeHourRange);

sumRange.addEventListener('mousemove', changeSumRange);
sumRange.addEventListener('touchmove', changeSumRange);
sumRange.addEventListener('touchend', changeSumRange);

// SLider
// eslint-disable-next-line no-undef
tns({
  'container': '.stories__slider',
  'controls': false,
  'nav': false,
  'mouseDrag': true,
  'preventScrollOnTouch': 'auto',
  'center': true,
  'autoplay': false,
  'gutter': 16,
  'items': 1,
  'responsive': {
    '768': {
      'items': 3,
      'center': false,
    },
    '992': {
      'items': 4,
      'center': false,
    }
  },
});

// FAQ
const acordionClass = 'faq__accordion-question';
const answerClass = 'faq__accordion-answer';
const activeAcordionClass = 'faq__accordion-question--open';
const activeAnswerClass = 'faq__accordion-answer--show';

const faqItems = document.querySelectorAll(`.${acordionClass}`);

const changeShowAcordion = (element, open) => {
  const answer = element.getElementsByClassName(answerClass)[0];

  if (!open) {
    element.classList.remove(activeAcordionClass);
    answer.classList.remove(activeAnswerClass);
  } else {
    element.classList.add(activeAcordionClass);
    answer.classList.add(activeAnswerClass);
  }
};

for (let i = 0; i < faqItems.length; i++) {
  const current = faqItems[i];

  current.addEventListener('click', () => {
    if (current.classList.contains(activeAcordionClass)) {
      changeShowAcordion(current, false);
    } else {
      changeShowAcordion(current, true);
    }
  });
}
