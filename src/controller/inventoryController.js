import {getAllSuppliers} from "../api/Supplier.js";
import {showToast} from "../util/toast.js";
import validator from "validator/es";
import {saveInventory} from "../api/inventory.js";

const inventoryItemPic = $('#inventory_itemPic');
const itemImage = $('#item_image');

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
    if (validator.isEmpty(formData.get('itemPicture').name)) {
        errors.push('Please select a item picture');
        $('#inventory_itemPic_error').text('Please select a item picture');
    }

    if (errors.length > 0) {
        return;
    }

    saveInventory(formData,
        function () {
            // loadAllEmployees();
            // new_employee_form.close();
            $('#inventory_back_btn').click();
            showToast('success', 'Inventory saved successfully!');
        },
        function (error) {
            console.error('Error saving inventory:', error);
            showToast('error', 'Error saving inventory!');
        }
    );
});
function loadSuppliers(){
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

loadSuppliers();

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
});

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