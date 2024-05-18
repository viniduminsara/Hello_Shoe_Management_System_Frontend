$(document).ready(function() {
    const dashboard_section = $('#dashboard');
    const products_section = $('#products');
    const customer_section = $('#customer');
    const order_section = $('#order');
    const employee_section = $('#employee');
    const inventory_section = $('#inventory');

    const sections = [
        dashboard_section, products_section, customer_section, order_section, employee_section, inventory_section
    ];
    const links = $('.menu a');

    function removeAllSections() {
        for (const section of sections) {
            section.css('display', 'none');
        }
    }

    function highlightLink(link){
        links.removeClass('active-link');
        $(link).addClass('active-link');
    }
    
    removeAllSections();
    dashboard_section.css('display', 'block');

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
});




