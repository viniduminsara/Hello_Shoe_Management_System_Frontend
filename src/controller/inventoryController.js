import {getAllSuppliers} from "../api/Supplier.js";
import {showToast} from "../util/toast.js";
import validator from "validator/es";
import {
    deleteInventory,
    getAllInventories,
    getInventoryById,
    saveInventory,
    updateInventory
} from "../api/Inventory.js";

const inventoryItemPic = $('#inventory_itemPic');
const itemImage = $('#item_image');
const inventoryBtn = $('#inventory_btn');

let currentInventoryId;

export function loadAllInventories(){
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.accessRole === 'ADMIN'){
        $('#add_inventory_btn').removeClass('hidden');
    }else {
        $('#add_inventory_btn').addClass('hidden');
    }

    getAllInventories(
        function (inventories){
            $('#inventory_table tbody').empty();
            inventories.map((inventory) => {
                let badgeType;
                if (inventory.status === 'Available'){
                    badgeType = 'badge-success';
                }else if (inventory.status === 'Low'){
                    badgeType = 'badge-warning';
                }else {
                    badgeType = 'badge-error';
                }

                $('#inventory_table tbody').append(
                    `<tr>
                            <th>${inventory.itemCode}</th>
                            <td>
                                <div class="flex items-center gap-3">
                                    <div class="avatar">
                                        <div class="mask mask-squircle w-12 h-12">
                                            <img src="data:image/jpeg;base64,${inventory.itemPic}"
                                                 alt="Item image"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="font-bold">
                                            ${inventory.itemDesc}
                                            <span class="badge badge-sm ${badgeType} mx-2">${inventory.status}</span>
                                        </div>
                                        <div class="text-sm opacity-50">${inventory.supplierName}</div>
                                    </div>
                                </div>
                            </td>
                            <td>${inventory.verityType}</td>
                            <td>${inventory.occasionType}</td>
                            <td>Rs. ${inventory.sellingPrice}</td>
                            ${(user.accessRole === 'ADMIN') ? `
                            <th>
                                <button class="btn btn-square btn-sm text-primary mr-2 edit-inventory-btn" 
                                    data-inventory-id="${inventory.itemCode}">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                    </svg>
                                </button>
                                <button class="btn btn-square btn-sm text-primary delete-inventory-btn"
                                    data-inventory-id="${inventory.itemCode}">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                    </svg>
                                </button>
                            </th>` : '' }
                        </tr>`
                );
            })
        },
        function (err){
            console.error('Error loading inventories:', err);
            showToast('error', 'Error loading inventories!');
        }
    )
}

$('#inventory_form').submit(function (e){
    e.preventDefault();

    removeSupplierValidationErrors();
    const formData = new FormData(this);

    let itemSizes = getItemSizesQty();
    itemSizes.forEach((itemSize, index) => {
        formData.append(`itemSizeDTOS[${index}].size`, itemSize.size);
        formData.append(`itemSizeDTOS[${index}].qty`, itemSize.qty);
    })

    // Validation checks
    let errors = [];

    if (!validator.isLength(formData.get('itemDesc'), {min: 2, max: 50})) {
        errors.push('Description must be between 2 and 50 characters');
        $('#inventory_desc_error').text('Description must be between 2 and 50 characters');
    }
    if (!validator.isNumeric(formData.get('sellingPrice'), {min: 0})) {
        errors.push('Please enter valid selling price');
        $('#inventory_selling_price_error').text('Please enter valid selling price');
    }
    if (!validator.isNumeric(formData.get('buyingPrice'), {min: 0})) {
        errors.push('Please enter valid buying price');
        $('#inventory_buying_price_error').text('Please enter valid buying price');
    }
    if (!formData.get('gender')){
        errors.push('Please select gender');
        $('#inventory_gender_error').text('Please select gender');
    }
    if (!formData.get('occasionType')){
        errors.push('Please select occasion type');
        $('#inventory_occasion_error').text('Please select occasion type');
    }
    if (!formData.get('verityType')){
        errors.push('Please select verity type');
        $('#inventory_verity_error').text('Please select verity type');
    }
    if (!formData.get('verityType')){
        errors.push('Please select verity type');
        $('#inventory_verity_error').text('Please select verity type');
    }
    if (!formData.get('supplierId')){
        errors.push('Please select supplier');
        $('#inventory_supplier_error').text('Please select supplier');
    }
    if (inventoryBtn.text() === 'Save Item') {
        if (validator.isEmpty(formData.get('itemPicture').name)) {
            errors.push('Please select a item picture');
            $('#inventory_itemPic_error').text('Please select a item picture');
        }
    }

    if (errors.length > 0) {
        return;
    }
    if (inventoryBtn.text() === 'Save Item') {
        saveInventory(formData,
            function () {
                showToast('success', 'Inventory saved successfully!');
                loadAllInventories();
                $('#inventory_back_btn').click();
                clearInventoryInputs();
            },
            function (error) {
                console.error('Error saving inventory:', error);
                showToast('error', 'Error saving inventory!');
            }
        );
    }else if (inventoryBtn.text() === 'Edit Item'){
        updateInventory(currentInventoryId, formData,
            function (){
                showToast('success', 'Inventory updated successfully!');
                loadAllInventories();
                $('#inventory_back_btn').click();
                clearInventoryInputs();
            },
            function (err){
                console.error('Error updating inventory:', err);
                showToast('error', 'Error updating inventory!');
            }
        )
    }
});
export function loadInventorySuppliers(){
    getAllSuppliers(
        function (suppliers){
            suppliers.map((supplier) => {
                $('#inventory_supplier').append(
                    `<option value="${supplier.supplierId}">${supplier.supplierName}</option>`
                )
            })
        },
        function (err){
            console.error('Error loading suppliers:', err);
            showToast('error','Error loading suppliers!');
        }
    )
}

$(document).on('click', '.edit-inventory-btn', function () {
    const inventoryId = $(this).attr('data-inventory-id');
    $('#inventory-header').addClass('hidden');
    $('#inventory_table').addClass('hidden');
    inventoryItemPic.addClass('hidden');
    inventoryBtn.text('Edit Item');
    $('#inventory_form_view').removeClass('hidden');

    getInventoryById(inventoryId,
        function (inventory){
            currentInventoryId = inventory.itemCode;

            $('#inventory_desc').val(inventory.itemDesc);
            $('#inventory_selling_price').val(inventory.sellingPrice);
            $('#inventory_buying_price').val(inventory.buyingPrice);
            $('#inventory_gender').val(inventory.gender);
            $('#inventory_occasion').val(inventory.occasionType);
            $('#inventory_verity').val(inventory.verityType);
            $('#inventory_supplier').val(inventory.supplierId);
            itemImage.attr('src', `data:image/jpeg;base64,${inventory.itemPic}`);

            inventory.itemSizeDTOS.forEach(item => {
                $(`#qty-${item.size}`).val(item.qty);
            });
        },
        function (err){
            console.error('Error fetching inventory:', error);
            showToast('error', 'Error fetching inventory!');
        }
    )
});

$(document).on('click', '.delete-inventory-btn', function () {
    const inventoryId = $(this).attr('data-inventory-id');

    deleteInventory(inventoryId,
        function (){
            loadAllInventories();
            showToast('success','Inventory deleted successfully!');
        },
        function (err){
            console.error('Error updating inventory:', err);
            showToast('error','Error deleting inventory!');
        }
    )
});

inventoryItemPic.on('change', (e) => {
    const file = e.target.files[0];

    if (file.type && !file.type.startsWith('image/')) {
        console.log('File is not an image.', file.type, file);
        return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        itemImage.attr('src', event.target.result)
    });
    reader.readAsDataURL(file);
});

function getItemSizesQty(){
    const itemSizes = [];
    const sizeElements = ['#qty-5', '#qty-6', '#qty-7', '#qty-8', '#qty-9', '#qty-10', '#qty-11'];
    const sizes = [5, 6, 7, 8, 9, 10, 11];

    for (let i = 0; i < sizeElements.length; i++) {
        itemSizes.push({ size: sizes[i], qty: parseInt($(sizeElements[i]).val()) || 0 });
    }

    return itemSizes;
}

$('#add_inventory_btn').on('click', function (){
    $('#inventory-header').addClass('hidden');
    $('#inventory_table').addClass('hidden');
    $('#inventory_form_view').removeClass('hidden');
});

$(document).on('click', '#inventory_back_btn', function (){
    $('#inventory-header').removeClass('hidden');
    $('#inventory_table').removeClass('hidden');
    $('#inventory_form_view').addClass('hidden');
    clearInventoryInputs();
});

function clearInventoryInputs(){
    $('#inventory_desc').val('');
    $('#inventory_selling_price').val('');
    $('#inventory_buying_price').val('');
    $('#inventory_gender').val('');
    $('#inventory_occasion').val('');
    $('#inventory_verity').val('');
    $('#inventory_supplier').val('');
    inventoryItemPic.removeClass('hidden');
    inventoryBtn.text('Save Item');
    itemImage.attr('src', 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg');

    for (let i = 5; i < 12; i++){
        $(`#qty-${i}`).val(0);
    }
}

function removeSupplierValidationErrors(){
    const errorLabels = [
        $('#inventory_desc_error'),
        $('#inventory_selling_price_error'),
        $('#inventory_buying_price_error'),
        $('#inventory_gender_error'),
        $('#inventory_occasion_error'),
        $('#inventory_verity_error'),
        $('#inventory_supplier_error'),
        $('#inventory_size_error'),
    ];
    errorLabels.forEach(errorLabel => errorLabel.text(''));
}