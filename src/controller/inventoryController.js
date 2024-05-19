import {getAllSuppliers} from "../api/Supplier.js";
import {showToast} from "../util/toast.js";

const inventoryItemPic = $('#inventory_itemPic');
const itemImage = $('#item_image');

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