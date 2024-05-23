import {getAllCustomers} from "../api/Customer.js";
import {showToast} from "../util/toast.js";
import {getInventoryById} from "../api/Inventory.js";
import SaleModel from "../model/SaleModel.js";
import {saveSale} from "../api/Sale.js";

let currentInventory;

export function loadSaleCustomers(){
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

$('#order_item_search_btn').on('click', function (){
    let searchTerm = $('#order_item_search').val();

    if (!searchTerm){
        showToast('info','Please enter item code!');
        return;
    }

    getInventoryById(searchTerm,
        function (inventory){
            currentInventory = inventory;
            $('#add_cart_table tbody').empty();
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
        showToast('info','Please enter item code!');
        return;
    }
    if (!size){
        showToast('info','Please select a size!');
        return;
    }

    const item = currentInventory.itemSizeDTOS.find(itemSize => itemSize.size === size);
    if (item.qty < qty){
        showToast('info','Not enough quantity!');
        return;
    }

    let itemFound = false;
    $('#cart_table tbody tr').each(function () {
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

$('#checkout_btn_form').on('click', function (){
    const customerId = $('#order_customer').val();
    if (!customerId){
        showToast('info','Please select customer!');
        return;
    }

    if ($('#cart_table tbody tr').length < 1){
        showToast('info','Please add cart items!');
        return;
    }

    $('#total').text($('#total-amount').text())
    checkout_form.showModal();
});

$('#payment_method').on('input', function (){
    const paymentMethod = $('#payment_method').val();

    if (paymentMethod === 'CASH'){
        $('#cash_method').removeClass('hidden');
        $('#card_method').addClass('hidden');
    }else if (paymentMethod === 'CARD'){
        $('#card_method').removeClass('hidden');
        $('#cash_method').addClass('hidden');
    }
});

$('#checkout_form_close').on('click', function (){
    $('#payment_method').val('')
    $('#cash_method').addClass('hidden');
    $('#card_method').addClass('hidden');
});

$('#checkout_btn').on('click', function (){
    const customerId = $('#order_customer').val();
    const totalPrice = getTotal();
    const purchaseDate = getCurrentTimestamp();
    const paymentMethod = $('#payment_method').val();
    const addedPoints = (totalPrice / 800) | 0;
    const userId = 'U001';
    const orderItems = [];

    if (!paymentMethod){
        $('#payment_method_error').text('Please select payment method');
        return;
    }

    $('#cart_table tbody tr').each(function () {
        let itemCode = $(this).find('th').first().text();
        let size = parseInt($(this).find('td').eq(1).text());
        let unitPrice = parseInt($(this).find('td').eq(3).text());
        let qty = parseInt($(this).find('td').eq(2).text());

        orderItems.push({
            itemCode: itemCode,
            size: size,
            unitPrice: unitPrice,
            itemQty: qty
        })
    })

    const sale = new SaleModel(customerId,totalPrice,purchaseDate,paymentMethod,addedPoints,userId,orderItems);

    saveSale(sale,
        function () {
            showToast('success','Sale saved successfully!');
            $('#cart_table tbody').empty();
            $('#order_customer').val('');
            updateTotal();
            checkout_form.close();
        },
        function (error) {
            console.error('Error saving sale:', error);
            showToast('error','Error saving sale!');
        }
    )
})



function updateTotal() {
    let total = 0;
    $(document).find('#cart_table tbody tr').each(function () {

        let qty = parseInt($(this).find('td').eq(2).text()); // Assuming the quantity is the third <td>
        let price = parseFloat($(this).find('td').eq(3).text()); // Assuming the price is the fourth <td>
        total += qty * price;
    });
    $('#total-amount').text(`Rs. ${total.toFixed(2)}`);
}

function getCurrentTimestamp() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

function getTotal() {
    let finalTotal = 0;
    $(document).find('#cart_table tbody tr').each(function () {

        let qty = parseInt($(this).find('td').eq(2).text()); // Assuming the quantity is the third <td>
        let price = parseFloat($(this).find('td').eq(3).text()); // Assuming the price is the fourth <td>
        finalTotal += qty * price;
    });
    return finalTotal;
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
}

