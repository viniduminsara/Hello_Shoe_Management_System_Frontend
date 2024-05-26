export function loadDashboardData(data) {
    $('#total_sales').text(data.totalSales);
    $('#total_profit').text(data.totalProfit);
    $('#most_sold_item').text(data.mostSaleItem)
    $('#most_sold_item_pic').attr('src', `data:image/jpeg;base64,${data.mostSaleItemPic}`)

    const series = [];
    const labels = [];
    for (const verityTypeQty of data.verityTypeQuantities){
        series.push(verityTypeQty.quantity);
        labels.push(verityTypeQty.verityType);
    }

    const options = {
        series: series,
        labels: labels,
        stroke: {
            show: false,
        },
        chart: {
            type: 'donut',
            width: 400,
            height: 400,
        },
        responsive: [
            {
                breakpoint: 1024,
                options: {
                    chart: {
                        width: '80%',
                        height: 350
                    },
                    legend: {
                        position: 'right'
                    }
                }
            },
            {
                breakpoint: 768,
                options: {
                    chart: {
                        width: '90%',
                        height: 300
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            },
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: '100%',
                        height: 250
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        ]
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

}

let currentTheme = document.documentElement.getAttribute('data-theme');

$('#theme_changer').click(function () {
    let newTheme = currentTheme === 'sunset' ? 'winter' : 'sunset';
    document.documentElement.setAttribute('data-theme', newTheme);
    currentTheme = newTheme;

    const moonIcon = $('#moon');
    const sunIcon = $('#sun');
    if (currentTheme === 'sunset') {
        moonIcon.hide();
        sunIcon.show();
    } else {
        moonIcon.show();
        sunIcon.hide();
    }
});
