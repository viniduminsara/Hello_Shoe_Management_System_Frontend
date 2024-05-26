import {refresh} from "../api/Auth.js";
import {showToast} from "../util/toast.js";
import {loadAllCustomers} from "./customerController.js";
import {loadAllEmployees} from "./employeeController.js";
import {loadAllInventories, loadInventorySuppliers} from "./inventoryController.js";
import {loadAllProducts} from "./productsController.js";
import {loadSaleCustomers} from "./saleController.js";
import {loadAllSuppliers} from "./supplierController.js";
import {jwtDecode} from "jwt-decode";
import {getAdminPanelData} from "../api/AdminPanel.js";
import {loadDashboardData} from "./dashboardController.js";

$(document).ready(async function () {
    const dashboard_section = $('#dashboard');
    const products_section = $('#products');
    const customer_section = $('#customer');
    const order_section = $('#order');
    const employee_section = $('#employee');
    const inventory_section = $('#inventory');
    const supplier_section = $('#supplier');
    const login_section = $('#login');
    const signup_section = $('#signup');

    const sections = [
        dashboard_section, products_section, customer_section, order_section, employee_section, inventory_section,
        supplier_section, login_section, signup_section
    ];
    const links = $('.menu a');

    function removeAllSections() {
        for (const section of sections) {
            section.css('display', 'none');
        }
    }

    function highlightLink(link) {
        links.removeClass('active-link');
        $(link).addClass('active-link');
    }

    removeAllSections();

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken || refreshToken) {
        if (isTokenExpired(accessToken)) {
            console.log('Access Token is expired');
            if (isTokenExpired(refreshToken)) {
                console.log('Refresh Token is expired');

                dashboard_section.css('display', 'none');
                $('.drawer').addClass('hidden');
                login_section.css('display', 'block');
            } else {
                console.log('Get new access token')

                refresh(
                    refreshToken,
                    function (res) {
                        const tokens = res.token.split(' : ');
                        localStorage.setItem('accessToken', tokens[0]);
                        localStorage.setItem('refreshToken', tokens[1]);
                        const decoded = jwtDecode(tokens[0]);
                        localStorage.setItem('role', JSON.stringify(decoded.role[0].authority));
                        localStorage.setItem('name', JSON.stringify(decoded.sub));

                        dashboard_section.css('display', 'block');
                        loadPanelData();
                        loadAllCustomers();
                        loadAllEmployees();
                        loadAllInventories();
                        loadInventorySuppliers();
                        loadAllProducts();
                        loadSaleCustomers();
                        loadAllSuppliers();
                    },
                    function (err) {
                        showToast('error', 'Please check your connection');
                    }
                )
            }
        } else {
            console.log('Token is valid');
            dashboard_section.css('display', 'block');
            loadPanelData();
            loadAllCustomers();
            loadAllEmployees();
            loadAllInventories();
            loadInventorySuppliers();
            loadAllProducts();
            loadSaleCustomers();
            loadAllSuppliers();
        }
    }else{
        dashboard_section.css('display', 'none');
        $('.drawer').addClass('hidden');
        login_section.css('display', 'block');
    }

    // dashboard_section.css('display', 'none');
    // $('.drawer').addClass('hidden');
    // login_section.css('display', 'block');

    $('#dashboard_nav').on('click', () => {
        removeAllSections();
        $('#dashboard').css('display', 'block');
        highlightLink('#dashboard_nav');
    });

    $('#products_nav').on('click', () => {
        removeAllSections();
        $('#products').css('display', 'block');
        highlightLink('#products_nav');
    });

    $('#customer_nav').on('click', () => {
        removeAllSections();
        $('#customer').css('display', 'block');
        highlightLink('#customer_nav');
    });

    $('#order_nav').on('click', () => {
        removeAllSections();
        $('#order').css('display', 'block');
        highlightLink('#order_nav');
    });

    $('#employee_nav').on('click', () => {
        removeAllSections();
        $('#employee').css('display', 'block');
        highlightLink('#employee_nav');
    });

    $('#inventory_nav').on('click', () => {
        removeAllSections();
        $('#inventory').css('display', 'block');
        highlightLink('#inventory_nav');
    });

    $('#supplier_nav').on('click', () => {
        removeAllSections();
        $('#supplier').css('display', 'block');
        highlightLink('#supplier_nav');
    });
});

function isTokenExpired(token) {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime;
}

export function loadPanelData(){
    getAdminPanelData(
        function (data) {
            loadDashboardData(data);
        },
        function (err) {
            console.log('Error fetching panel data : '+ err);
            showToast('error', 'Error fetching panel data');
        }
    )
}




