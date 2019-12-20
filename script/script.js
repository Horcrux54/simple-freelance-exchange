document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const customer = document.getElementById('customer'),
        freelancer = document.getElementById('freelancer'),
        blockCustomer = document.querySelector('#block-customer'),
        blockFreelancer = document.querySelector('#block-freelancer'),
        blockChoice = document.querySelector('#block-choice'),
        btnExit = document.querySelector('#btn-exit'),
        formCustomer = document.querySelector('#form-customer'),
        tableOrders = document.getElementById('orders'),
        modalOrder = document.getElementById('order_read'),
        modalOrderActive = document.getElementById('order_active'),
        closeModal = document.querySelector('#order_read .close'),
        closeModalActive = document.querySelector('#order_active .modal-content .close');

    const orders = JSON.parse(localStorage.getItem('freeOrders')) || [];
    const toStorage = () => {
            localStorage.setItem('freeOrders', JSON.stringify(orders))
        }
    ;

    const declOfNum = (number, titles) => number + ' ' + titles[(number % 100 > 4 && number % 100 < 20) ?
        2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];

    const calcDeadline = (data) => {
        const deadline = new Date(data);
        const toDay  = Date.now();

        const remaining = (deadline - toDay) / 1000 / 60 / 60;

        if (remaining / 24 > 2 ) {
            return declOfNum(Math.floor(remaining / 24), ['день', 'дня', 'дней']);
        }

        return declOfNum(Math.floor(remaining), ['час', 'часа', 'часов']);
    }

    const displayOrders = () => {
        tableOrders.textContent = "";
        orders.forEach((order, i) => {
            tableOrders.innerHTML += `
                <tr class="order ${order.active ? 'taken' : ''}" data-number-order="${i}">
                    <td>${i + 1}</td>
                    <td>${order.title}</td>
                    <td class="${order.currency}"></td>
                    <td>${calcDeadline(order.deadline)}</td>
                </tr>`;
        });
    };

    const handlerModal = (event) => {
        const target = event.target,
            modal = target.closest('.order-modal'),
            order = orders[modal.id];

        const baseAction = () => {
            displayOrders();
            toStorage();
            modal.style.display = 'none';
        };

        if (target.closest('.close') || target === modal) {
            modal.style.display = 'none';
        }
        if (target.classList.contains('get-order')) {
            order.active = true;
            baseAction();
        }

        if (target.id === 'capitulation') {
            order.active = false;
            baseAction();
        }

        if (target.id === 'ready') {
            orders.splice(orders.indexOf(order), 1);
            baseAction();
        }
    };

    const openModal = (numberOrder) => {

        const order = orders[numberOrder];
        const {title, firstName, email, description, deadline, amount, currency, phone, active} = order;

        const modal = active ? modalOrderActive : modalOrder;

        const titleBlock = modal.querySelector('.modal-title'),
            firstNameBlock = modal.querySelector('.firstName'),
            emailBlock = modal.querySelector('.email'),
            descriptionBlock = modal.querySelector('.description'),
            deadlineBlock = modal.querySelector('.deadline'),
            currencyBlock = modal.querySelector('.currency_img'),
            countBlock = modal.querySelector('.count'),
            phoneBlock = modal.querySelector('.phone');

        modal.id = numberOrder;
        titleBlock.textContent = title;
        firstNameBlock.textContent = firstName;
        emailBlock.href = 'mailto:' + email;
        emailBlock.textContent = email;
        descriptionBlock.textContent = description;
        deadlineBlock.textContent = calcDeadline(deadline);
        countBlock.textContent = amount;
        currencyBlock.classList.add(currency);
        phoneBlock && (phoneBlock.href = 'tel:' + phone);

        modal.style.display = 'flex';

        modal.addEventListener('click', handlerModal);

    };
    tableOrders.addEventListener('click', event => {
        const target = event.target;
        const targetOrder = target.closest('.order');
        if (targetOrder) {
            openModal(targetOrder.dataset.numberOrder);
        }
    });

    customer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
        const toDay = new Date().toISOString().substring(0, 10);
        document.getElementById('deadline').min = toDay;
        blockCustomer.style.display = 'block';
        btnExit.style.display = 'block';
    });

    freelancer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
        displayOrders();
        blockFreelancer.style.display = 'block';
        btnExit.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modalOrder.style.display = 'none';
    });

    closeModalActive.addEventListener('click', () => {
        modalOrderActive.style.display = 'none';
    });

    btnExit.addEventListener('click', () => {
        btnExit.style.display = 'none';
        blockFreelancer.style.display = 'none';
        blockCustomer.style.display = 'none';
        blockChoice.style.display = 'block'
    });

    formCustomer.addEventListener('submit', (event) => {
        event.preventDefault();
        const obj = {};
        const elements = [...formCustomer.elements].filter((elem) => (elem.tagName === 'INPUT' && elem.type !== 'radio') ||
            (elem.type === 'radio' && elem.checked) ||
            elem.tagName === 'TEXTAREA');

        elements.forEach((elem) => {
            obj[elem.name] = elem.value;
        });
        formCustomer.reset();
        orders.push(obj);
        toStorage();
    })
});
