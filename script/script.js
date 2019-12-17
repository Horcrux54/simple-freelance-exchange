document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const customer = document.getElementById('customer'),
        freelancer = document.getElementById('freelancer'),
        blockCustomer = document.querySelector('#block-customer'),
        blockFreelancer = document.querySelector('#block-freelancer'),
        blockChoice = document.querySelector('#block-choice'),
        btnExit = document.querySelector('#btn-exit'),
        formCustomer = document.querySelector('#form-customer');
    const orders = [];

    customer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
        blockCustomer.style.display = 'block';
        btnExit.style.display = 'block';
    });
    freelancer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
        blockFreelancer.style.display = 'block';
        btnExit.style.display = 'block';
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
        for (const elem of formCustomer) {
            if ((elem.tagName === 'INPUT' && elem.type !== 'radio') || (elem.type === 'radio' && elem.checked) || (elem.tagName === 'TEXTAREA')) {
                obj[elem.name] = elem.value;
                if (elem.type !== 'radio') {
                    elem.value = '';
                }
            }
        }
        orders.push(obj);
    })
});
