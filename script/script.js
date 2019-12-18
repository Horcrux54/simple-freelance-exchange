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
        closeModal = document.querySelector('.close');
    const orders = [];

    const displayOrders = () => {
        tableOrders.textContent = "";
        orders.forEach((order, i) => {
            tableOrders.innerHTML += `
                <tr class="order" data-number-order="${i}">
                    <td>${i + 1}</td>
                    <td>${order.title}</td>
                    <td class="${order.currency}"></td>
                    <td>${order.deadline}</td>
                </tr>`;
        });
    };
    const openModal = (numberOrder) => {
        const order = orders[numberOrder];
        const modal = order.active ? modalOrderActive : modalOrder;
        const titleBlock = document.querySelector('.modal-title'),
            firstNameBlock = document.querySelector('.firstName'),
            emailBlock = document.querySelector('.email'),
            descriptionBlock = document.querySelector('.description'),
            deadlineBlock = document.querySelector('.deadline'),
            currencyBlock = document.querySelector('.modal-currency .currency'),
            countBlock = document.querySelector('.count'),
            phoneBlock = document.querySelector('.modal-footer .phone');
        titleBlock.textContent = order.title;
        firstNameBlock.textContent = order.firstName;
        emailBlock.textContent = order.email;
        descriptionBlock.textContent = order.description;
        deadlineBlock.textContent = order.deadline;
        countBlock.textContent = order.amount;
        currencyBlock.classList.add(order.currency);
        phoneBlock.href = "tel:" + order.phone;

        modal.style.display = 'block';
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
        console.log(obj);
    })
});
