// Dữ liệu Tour được cập nhật đầy đủ thông tin mô tả, trạng thái cho TẤT CẢ các hạng mục
const toursData = {
    'dn-ha': {
        name: 'Đà Nẵng - Hội An 3N2Đ',
        budget: 100000000,
        spent: 88000000,
        chartLabels: ['Lưu trú (45%)', 'Vận chuyển (35%)', 'Ăn uống & Vé (20%)'],
        chartData: [45, 35, 20],
        details: {
            0: { 
                title: "LƯU TRÚ (45%)", 
                totalAmount: "39.600.000 VNĐ",
                bills: [
                    { 
                        supplier: "Khách sạn Mường Thanh Lux", 
                        description: "Thanh toán tiền phòng 2 đêm x 10 phòng", 
                        amount: "25.000.000 VNĐ", 
                        status: "Đã duyệt"
                    },
                    { 
                        supplier: "Boutique Resort Hội An", 
                        description: "Phụ thu nhận phòng sớm & dịch vụ Spa", 
                        amount: "14.600.000 VNĐ", 
                        status: "Đã duyệt"
                    }
                ]
            },
            1: { 
                title: "VẬN CHUYỂN (35%)", 
                totalAmount: "30.800.000 VNĐ",
                bills: [
                    { 
                        supplier: "Vietjet Air", 
                        description: "Vé máy bay khứ hồi SGN-DAD x 20 khách", 
                        amount: "22.000.000 VNĐ", 
                        status: "Đã duyệt"
                    },
                    { 
                        supplier: "Nhà xe Hải Vân Travel", 
                        description: "Thuê xe 29 chỗ phục vụ đoàn 3N2Đ", 
                        amount: "8.800.000 VNĐ", 
                        status: "Đã duyệt"
                    }
                ]
            },
            2: { 
                title: "ĂN UỐNG & VÉ (20%)", 
                totalAmount: "17.600.000 VNĐ",
                bills: [
                    { 
                        supplier: "Nhà hàng Biển Đông", 
                        description: "20 suất Hải sản x 410k", 
                        amount: "8.200.000 VNĐ", 
                        status: "Chờ duyệt",
                        invoiceId: "req-bien-dong" 
                    },
                    { 
                        supplier: "Bà Nà Hills", 
                        description: "20 vé cáp treo khứ hồi x 470k", 
                        amount: "9.400.000 VNĐ", 
                        status: "Chờ duyệt",
                        invoiceId: "req-bana" 
                    }
                ]
            }
        }
    },
    'bana': {
        name: 'Bà Nà Hills 1 Ngày', 
        budget: 25000000, 
        spent: 2500000,
        chartLabels: ['Đặt cọc vé (100%)'], 
        chartData: [100],
        details: { 
            0: { 
                title: "ĐẶT CỌC VÉ (100%)", 
                totalAmount: "2.500.000 VNĐ",
                bills: [
                    { 
                        supplier: "Sun World Ba Na Hills", 
                        description: "Đặt cọc giữ chỗ vé cáp treo đoàn 10 người", 
                        amount: "2.500.000 VNĐ", 
                        status: "Đã duyệt" 
                    }
                ]
            } 
        }
    }
};

let currentTourId = '';
let expenseChartInstance = null;

// Hàm chuyển tab
function switchTab(tabId, element) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-' + tabId).classList.add('active');
    
    if(element) {
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        element.classList.add('active');
    }
}

// Logic Dashboard Tour
function openTour(tourId) {
    currentTourId = tourId;
    const tour = toursData[tourId];
    
    document.getElementById('tour-name-title').innerText = tour.name;
    document.getElementById('tour-budget').innerText = tour.budget.toLocaleString('vi-VN');
    document.getElementById('tour-spent').innerText = tour.spent.toLocaleString('vi-VN');
    document.getElementById('tour-remaining').innerText = (tour.budget - tour.spent).toLocaleString('vi-VN');
    
    switchTab('home');

    setTimeout(() => {
        updateChart(tour.chartLabels, tour.chartData);
    }, 50);
}

function updateChart(labels, data) {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    if (expenseChartInstance) expenseChartInstance.destroy();
    
    const isDark = document.querySelector('.app-container').classList.contains('dark-theme');
    const pieColors = ['#3b82f6', '#10b981', '#f59e0b'];

    expenseChartInstance = new Chart(ctx, {
        type: 'pie',
        data: { 
            labels: labels, 
            datasets: [{ 
                data: data, 
                backgroundColor: pieColors,
                hoverBackgroundColor: pieColors,
                borderColor: isDark ? '#1f2937' : '#ffffff',
                borderWidth: 3,
                hoverBorderColor: isDark ? '#1f2937' : '#ffffff',
                hoverBorderWidth: 3,
                hoverOffset: 8
            }] 
        },
        options: { 
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 900,
                easing: 'easeOutBack'
            },
            plugins: { 
                legend: { 
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        color: isDark ? '#f9fafb' : '#374151',
                        font: { weight: '500', size: 12 }
                    }
                },
                tooltip: {
                    animation: { duration: 150 }
                }
            }, 
            onClick: (e, elements) => { 
                if (elements.length > 0) showReportDetail(elements[0].index); 
            } 
        }
    });
}

// Hàm hiển thị danh sách hóa đơn chi tiết đồng bộ chuẩn giao diện thẻ đơn giản
function showReportDetail(index) {
    const tour = toursData[currentTourId];
    const categoryData = tour.details[index];

    if (!categoryData) return;

    // Cập nhật tiêu đề màu cam
    document.getElementById('detail-title').innerHTML = `
        <span class="text-amber-600 dark:text-amber-500">Chi tiết dòng tiền: ${categoryData.title}</span>
    `;

    // Render danh sách các hóa đơn
    let billsHtml = `<div class="space-y-3 mb-4">`;

    categoryData.bills.forEach((bill) => {
        const clickAction = bill.invoiceId ? `onclick="openInvoiceDetail('${bill.invoiceId}')"` : '';
        const cursorStyle = bill.invoiceId ? 'cursor-pointer hover:border-amber-400 hover:shadow-md' : '';
        
        let statusBg = 'bg-[#fef08a] text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100';
        if (bill.status === 'Đã duyệt') {
            statusBg = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100';
        }
        
        const statusHtml = bill.status ? `<span class="${statusBg} text-xs px-2 py-1 rounded font-bold">${bill.status}</span>` : '';
        const descHtml = bill.description ? `<p class="text-[13px] text-gray-600 dark:text-gray-300 mb-3">${bill.description}</p>` : '';

        billsHtml += `
            <div ${clickAction} class="p-4 bg-[#fffbeb] dark:bg-gray-800 border border-[#fef08a] dark:border-gray-700 rounded-xl shadow-sm transition ${cursorStyle}">
                <div class="flex justify-between items-start mb-1">
                    <p class="font-bold text-gray-800 dark:text-gray-100 text-[15px]">${bill.supplier}</p>
                    ${statusHtml}
                </div>
                ${descHtml}
                <div class="text-right mt-1">
                    <span class="font-bold text-red-500 text-base">${bill.amount}</span>
                </div>
            </div>
        `;
    });

    billsHtml += `</div>
    <div class="text-right font-bold text-gray-700 dark:text-gray-200 text-sm mb-4">
        Tổng: ${categoryData.totalAmount}
    </div>`;

    document.getElementById('detail-content').innerHTML = billsHtml;
    
    // Chuyển sang Tab chi tiết báo cáo
    switchTab('report', document.getElementById('nav-report'));
    document.getElementById('report-empty').classList.add('hidden');
    document.getElementById('report-details').classList.remove('hidden');
}

function toggleNightMode() {
    const container = document.querySelector('.app-container');
    container.classList.toggle('dark-theme');
    
    const isDark = container.classList.contains('dark-theme');
    const icon = document.getElementById('theme-icon');
    
    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }

    if (expenseChartInstance) {
        const dataset = expenseChartInstance.data.datasets[0];
        const targetBorderColor = isDark ? '#1f2937' : '#ffffff';
        
        expenseChartInstance.options.plugins.legend.labels.color = isDark ? '#f9fafb' : '#374151';
        dataset.borderColor = targetBorderColor;
        dataset.hoverBorderColor = targetBorderColor;
        
        expenseChartInstance.update('none'); 
    }
}

function backToTourList() { switchTab('tour-list', document.getElementById('nav-tour-list')); }
function backToTourDashboard() { switchTab('home'); }

// Logic Quét Bill
function openScanBill() {
    switchTab('scan'); 
    document.getElementById('scan-result').classList.add('hidden');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
}

function backToTourFromScan() { switchTab('home'); }

function simulateScan() {
    const line = document.getElementById('scan-line');
    const result = document.getElementById('scan-result');
    const hint = document.getElementById('scan-hint');
    
    line.classList.remove('hidden');
    result.classList.add('hidden');
    hint.innerHTML = '<i class="fas fa-spinner fa-spin text-4xl mb-2"></i><br>Đang bóc tách dữ liệu OCR...';
    
    setTimeout(() => {
        line.classList.add('hidden');
        hint.innerHTML = '<i class="fas fa-check-circle text-4xl mb-2 text-emerald-500"></i><br>Quét thành công!';
        result.classList.remove('hidden');
    }, 2000);
}

// Logic Duyệt chi cơ bản
function approve(id, isApproved) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = isApproved 
        ? '<div class="text-center py-4 text-emerald-600 font-bold"><i class="fas fa-check-circle text-3xl mb-2"></i><br>Đã phê duyệt</div>'
        : '<div class="text-center py-4 text-red-500 font-bold"><i class="fas fa-times-circle text-3xl mb-2"></i><br>Đã từ chối</div>';
    setTimeout(() => { el.style.display = 'none'; }, 1500);
}

// --- LOGIC TRANG CHI TIẾT HÓA ĐƠN ---
const pendingInvoicesData = {
    'req-bien-dong': { 
        supplier: 'Nhà hàng Biển Đông', 
        taxId: '0401234567', 
        invoiceNo: 'HD-26-00142',
        invoiceDate: '08/09/2026',
        category: ' Ăn uống ',
        entry: 'Nợ 154 / Có 331', 
        itemDescription: '20 suất x 410.000đ', 
        paymentMethod: 'Ủy nhiệm chi (UNC)',
        total: '8.200.000 VNĐ' 
    },
    'req-bana': { 
        supplier: 'Sun World Ba Na Hills', 
        taxId: '0409876543', 
        invoiceNo: 'HD-26-00889',
        invoiceDate: '09/09/2026',
        category: ' Vé tham quan ',
        entry: 'Nợ 154 / Có 331', 
        itemDescription: '20 vé cáp treo khứ hồi',
        paymentMethod: 'Ủy nhiệm chi (UNC)', 
        total: '9.400.000 VNĐ' 
    }
};

let currentPageInvoiceId = null;

function openInvoiceDetail(invoiceId) {
    const data = pendingInvoicesData[invoiceId];
    if (!data) return;

    currentPageInvoiceId = invoiceId;
    
    document.getElementById('page-supplier').innerText = data.supplier;
    document.getElementById('page-tax').innerText = data.taxId;
    document.getElementById('page-invoiceNo').innerText = data.invoiceNo;
    document.getElementById('page-invoiceDate').innerText = data.invoiceDate;
    document.getElementById('page-category').innerText = data.category;
    document.getElementById('page-entry').innerText = data.entry;
    document.getElementById('page-desc').innerText = data.itemDescription;
    document.getElementById('page-payment').innerText = data.paymentMethod;
    document.getElementById('page-total').innerText = data.total;

    document.getElementById('page-btn-approve').onclick = () => approveFromPage(invoiceId, true);
    document.getElementById('page-btn-reject').onclick = () => approveFromPage(invoiceId, false);

    switchTab('invoice-detail');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
}

function backToApproveList() {
    switchTab('approve', document.getElementById('nav-approve'));
}

function approveFromPage(invoiceId, isApproved) {
    approve(invoiceId, isApproved);
    setTimeout(() => { backToApproveList(); }, 150);
}