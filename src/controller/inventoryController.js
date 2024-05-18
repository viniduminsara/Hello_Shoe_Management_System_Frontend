$('#add_inventory_btn').on('click', function (){
    $('#inventory-header').addClass('hidden');
    $('#inventory_table').addClass('hidden');
    $('#inventory_form').removeClass('hidden');
});

$(document).on('click', '#inventory_back_btn', function (){
    $('#inventory-header').removeClass('hidden');
    $('#inventory_table').removeClass('hidden');
    $('#inventory_form').addClass('hidden');
});