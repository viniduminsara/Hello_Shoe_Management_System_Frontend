import {getAllInventories, getInventoryById, getSortedInventories} from "../api/Inventory.js";
import {showToast} from "../util/toast.js";


export function loadAllProducts(){
    getAllInventories(
        function (inventories){
            populateProducts(inventories);
        },
        function (err){
            console.log('Error fetching products : '+ err);
            showToast('error', 'Error fetching products');
        }
    )
}

function populateProducts(inventories){
    $('#products-container').empty();
    inventories.forEach(inventory => {
        let badgeType;
        if (inventory.status === 'Available'){
            badgeType = 'badge-success';
        }else if (inventory.status === 'Low'){
            badgeType = 'badge-warning';
        }else {
            badgeType = 'badge-error';
        }

        $('#products-container').append(
            `<div class="card w-80 bg-base-100 shadow-xl">
                        <figure><img src="data:image/jpeg;base64,${inventory.itemPic}"
                                     alt="Shoes"/></figure>
                        <div class="card-body">
                            <h2 class="card-title text-xl font-bold">
                                ${inventory.itemDesc}
                                <span class="badge ${badgeType} badge-sm gap-2">
                                    ${inventory.status}
                                </span>
                            </h2>
                            <p class="text-xs">${inventory.supplierName}</p>
                            <div class="flex justify-between mt-4">
                                <div>
                                    <h1 class="text-2xl font-bold">Rs. ${inventory.sellingPrice}</h1>
                                    <h3 class="text-xs text-success">+ ${(inventory.profitMargin).toFixed(2)}%</h3>
                                </div>
                                <button class="btn btn-primary details-btn" data-inventory-id="${inventory.itemCode}">Details</button>
                            </div>
                        </div>
                    </div>`
        )
    })
}

$('#sortBy').on('input', function (){
    const sortBy = $('#sortBy').val();

    if (sortBy){
        getSortedInventories(
            sortBy,
            function (inventories){
                populateProducts(inventories);
            },
            function (err){
                console.log('Error fetching products : '+ err);
                showToast('error', 'Error fetching products');
            }
        )
    }
});

$(document).on('click', '.details-btn', function (){
    $('#products-container').addClass('hidden');
    $('#products_header').addClass('hidden');
    $('#products_view').removeClass('hidden');

    let inventoryId = $(this).attr('data-inventory-id');

    getInventoryById(
        inventoryId,
        function (inventory) {
            $('#product_img').attr('src', `data:image/jpeg;base64,${inventory.itemPic}`);
            $('#product_name').text(inventory.itemDesc);
            $('#product_supplier').text(inventory.supplierName);
            $('#product_price').text(`Rs. ${inventory.sellingPrice}`);
            $('#product_profit').text(`+ ${inventory.profitMargin.toFixed(2)}%`);
            $('#product_status').text(inventory.status);
            $('#product_occasion').text(inventory.occasionType);
            $('#product_verity').text(inventory.verityType);
            $('#product_gender').text(inventory.gender);
            let itemSizeDTOS = inventory.itemSizeDTOS;

            itemSizeDTOS.forEach((item, index) => {
                let sizeElement = $(`#product_size_${item.size}`);
                sizeElement.text(item.qty);
            });
        },
        function (err) {
            if (err.status === 403) {
                showToast('error', 'Inventory not found');
            }
        }
    )
});

$('#products_back_btn').on('click', function (){
    $('#products-container').removeClass('hidden');
    $('#products_header').removeClass('hidden');
    $('#products_view').addClass('hidden');
});