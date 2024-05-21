import {getAllInventories} from "../api/Inventory.js";
import {showToast} from "../util/toast.js";


function loadAllProducts(){
    getAllInventories(
        function (inventories){
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
                                <button class="btn btn-primary">Details</button>
                            </div>
                        </div>
                    </div>`
                )
            })
        },
        function (err){
            console.log('Error fetching products : '+ err);
            showToast('error', 'Error fetching products');
        }
    )
}

loadAllProducts();