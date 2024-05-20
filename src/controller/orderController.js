import {getAllCustomers} from "../api/Customer.js";
import {showToast} from "../util/toast.js";
import {getInventoryById} from "../api/Inventory.js";
import Swal from "sweetalert2";

let currentInventory;

function loadCustomers(){
    getAllCustomers(
        function (customers){
            customers.forEach(customer => {
                $('#order_customer').append(
                    `<option value="${customer.customerId}">${customer.name}</option>`
                )
            })
        },
        function (err){
            console.error('Error loading customers:', err);
            showToast('error','Error loading customers!');
        }
    )
}

loadCustomers();

$('#order_item_search_btn').on('click', function (){
    let searchTerm = $('#order_item_search').val();

    if (!searchTerm){
        new_cart_item_form.close();

        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
        })
        return;
    }

    getInventoryById(searchTerm,
        function (inventory){
            currentInventory = inventory;
            $('#add_cart_table tbody').append(
                `<tr>
                    <th>${inventory.itemDesc}</th>
                    <td>${inventory.verityType}</td>
                    <td>${inventory.gender}</td>
                    <td>${inventory.sellingPrice}</td>
                </tr>`
            )
        },
        function (err){
            console.error('Error loading inventory:', err);
            showToast('error','Error loading inventory!');
        }
    )
});

$('#cart_add_btn').on('click', function (){
    let size = parseInt($('#order_item_size').val());
    let qty = parseInt($('#order_item_qty').val()) || 1;

    if (!currentInventory){
        new_cart_item_form.close();

        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
        })
        return;
    }
    if (!size){
        new_cart_item_form.close();

        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
        })
        return;
    }

    let itemFound = false;
    $('#cart_table tr').each(function () {
        let itemCode = $(this).find('th').first().text();
        let sizeCell = $(this).find('td').eq(1);
        if (itemCode === currentInventory.itemCode) {
            if (parseInt(sizeCell.text()) === size) {
                let qtyCell = $(this).find('td').eq(2); // Assuming the quantity is the third <td>
                let currentQty = parseInt(qtyCell.text());
                qtyCell.text(currentQty + qty);
                itemFound = true;
                return false; // Break the loop
            }
        }
    });


    if (!itemFound) {
        $('#cart_table').append(
            `<tr>
            <th>${currentInventory.itemCode}</th>
             <td>
                <div class="flex items-center gap-3">
                      <div class="avatar">
                           <div class="mask mask-squircle w-12 h-12">
                                 <img src="data:image/jpeg;base64,${currentInventory.itemPic}"
                                       alt="Item image"/>
                           </div>
                      </div>
                      <div>
                            <div class="font-bold">${currentInventory.itemDesc}</div>
                            <div class="text-sm opacity-50">${currentInventory.supplierName}</div>
                      </div>
                      </div>
             </td>
                      <td>${size}</td>
                      <td>${qty}</td>
                      <td>${currentInventory.sellingPrice}</td>
                      <th>
                      <button class="btn btn-square btn-sm text-primary remove-row">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                </svg>
                      </button>
                </th>
        </tr>`
        )
    }
    updateTotal();
    clearCartForm();
});

$('#checkout_btn').on('click', function (){

})

function updateTotal() {
    let total = 0;
    $(document).find('#cart_table tbody tr').each(function () {

        let qty = parseInt($(this).find('td').eq(2).text()); // Assuming the quantity is the third <td>
        let price = parseFloat($(this).find('td').eq(3).text()); // Assuming the price is the fourth <td>
        total += qty * price;
        console.log(total)
    });
    $('#total-amount').text(`Rs. ${total.toFixed(2)}`);
}

$('#new_cart_item_form_close').on('click', function (){
    clearCartForm();
});

$('#cart_table').on('click', '.remove-row', function() {
    $(this).closest('tr').remove();
    updateTotal();
});

function clearCartForm(){
    currentInventory = null;
    $('#add_cart_table tbody').empty();
    $('#order_item_search').val('');
    $('#order_item_size').val('')
    $('#order_item_qty').val('')
    new_cart_item_form.close();
}

