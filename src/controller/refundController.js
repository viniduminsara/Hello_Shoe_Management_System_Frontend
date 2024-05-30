import {showToast} from "../util/toast.js";
import {getOrderById, saveRefund} from "../api/Sale.js";

$('#refund_orderId_btn').on('click', function (){
    const orderId = $('#refund_orderId').val();

    if (!orderId){
        showToast('info', 'Please enter the orderId');
        return;
    }

    getOrderById(
        orderId,
        function (orderItems){
            $('#refund_table tbody').empty();
            orderItems.forEach((orderItem) => {
                $('#refund_table tbody').append(
                    `<tr>
                            <th>
                                <label>
                                    <input type="radio" name="orderItem" class="radio" 
                                        data-sale-details-id="${orderItem.saleDetailsId}"/>
                                </label>
                            </th>
                            <td>${orderItem.itemCode}</td>
                            <td>
                                <div class="flex items-center gap-3">
                                    <div class="avatar">
                                        <div class="mask mask-squircle w-12 h-12">
                                            <img src="data:image/jpeg;base64,${orderItem.itemPic}" alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="font-bold">${orderItem.itemDesc}</div>
                                    </div>
                                </div>
                            </td>
                            <td>${orderItem.size}</td>
                            <td>${orderItem.qty}</td>
                            <td>Rs. ${orderItem.unitPrice}</td>
                        </tr>`
                )
            })
        },
        function (err){
            if (err.status === 404){
                showToast('info', 'Not found the order');
            }
        }
    )
});

$('#refund_btn').on('click', function () {
    let return_qty = $('#return_qty').val() || 1;

    const checkedRadio = $('#refund_table tbody input.radio:checked');
    const checkedRow = checkedRadio.closest('tr');
    if (checkedRadio.length > 0) {
        let saleDetailsId = checkedRadio.data('sale-details-id');
        let qty = parseInt(checkedRow.find('td').eq(3).text());
        let unitPrice = parseFloat(checkedRow.find('td').eq(4).text().replace('Rs. ', ''));

        if (qty < return_qty){
            showToast('info', 'Please enter suitable return qty');
            return;
        }

        let amount = unitPrice * qty;

        const refund = {
            saleDetailsId: saleDetailsId,
            qty: qty,
            amount: amount
        }

        saveRefund(
            refund,
            function () {
                showToast('success', 'Refund saved successfully');
                $('#refund_table tbody').empty();
                $('#refund_orderId').val('');
                $('#return_qty').val('')
            },
            function (err) {
                showToast('error', 'Error saving refund!');
            }
        )
    } else {
        showToast('info', 'Please select an order item');
    }
});