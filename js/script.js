'use strict'

window.addEventListener('DOMContentLoaded', () => {

    // let tabs = document.querySelectorAll('.tabheader__item'),
    //     tabsContent = document.querySelectorAll('.tabcontent'),
    //     tabsParent = document.querySelector('.tabheader__item');

    // // Скрытие табов
    // function hideTabContent() {
    //         tabsContent.forEach(item => {
    //             item.style.display = 'none';
    //             item.classList.add('hide');
    //             item.classList.remove('show', 'fade');
    //         }); 

    //         tabs.forEach(item => {
    //             item.classList.remove('tabheader__item_active');
    //         });
    // }

    // // Показывает табы
    // function showTabContent(i = 0) {
    //     tabsContent[i].style.display = 'block';
    //     tabs[i].classList.add('tabheader__item_active');

    // }

    // hideTabContent();
    // showTabContent();

    // // Делегирование событий, назначение клика

    // tabsParent.addEventListener('click', (event) => {
    //     const target = event.target;

    //     if (target && target.classList.contains('tabheader__item')) {
    //         tabs.forEach(( item, i ) => {
    //             if (target == item) {
    //                 hideTabContent();
    //                 showTabContent(i); 
    //             }
    //         });
    //     }
    // });



    // Табы, вариант через стрелочную функцию!!!

    const tabItems = document.querySelectorAll('.tabheader__item')
    const contentItems = document.querySelectorAll('.tabcontent')

    const findClearActiveClass = (elements, className = 'tabheader__item_active') => {
        Array.from(elements).find(item => item.classList.remove(`${ className }`))
    }

    const setActiveClass = (element, index, className = 'tabheader__item_active') => {
        element[index].classList.add(`${ className }`)

    }

    const checkoutTabs = (item, index) => {
        item.addEventListener('click', () => {
            if (item.classList.contains('tabheader__item_active')) return

            const currentItem = index

            findClearActiveClass(tabItems)
            findClearActiveClass(contentItems)

            setActiveClass(tabItems, currentItem)
            setActiveClass(contentItems, currentItem)
        })
    }
    tabItems.forEach(checkoutTabs)

    // Таймер

    const deadline = '2021-12-15';

    function getTimerRemaiding(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };

        //   function getZero(num) {
        //       if (num >= 0 && num < 10) {
        //           return `0${num}`;
        //       } else {
        //         return num;
        //       }
        //   }


    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimerRemaiding(endtime);

            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }

    }

    setClock('.timer', deadline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        // document.body.style.overflow = 'hidden';
        // clearInterval(modalTimerId);
    }

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // const modalTimerId = setTimeout(openModal, 3000);
    // Закомментировал, чтобы не отвлекало

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);



    // Используем классы для создание карточек меню

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 100;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            this.classes.forEach(className => element.classList.add(className));
            element.innerHTML = `
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        16,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container"
    ).render();




    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submite', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });

            const json = JSON.stringify(object)

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });

    }

});