// Dữ liệu Tour được nâng cấp với Danh sách Bill chi tiết cho từng hạng mục
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
                    { supplier: "Khách sạn Mường Thanh Lux", date: "08/09/2026", code: "HD-26-00102", amount: "25.000.000 VNĐ" },
                    { supplier: "Boutique Resort Hội An", date: "09/09/2026", code: "HD-26-00115", amount: "14.600.000 VNĐ" }
                ]
            },
            1: { 
                title: "VẬN CHUYỂN (35%)", 
                totalAmount: "30.800.000 VNĐ",
                bills: [
                    { supplier: "Vé máy bay Vietjet Air (20 khách)", date: "05/09/2026", code: "VJ-98402", amount: "22.000.000 VNĐ" },
                    { supplier: "Thuê xe 29 chỗ Hải Vân Travel", date: "08/09/2026", code: "HD-26-00088", amount: "8.800.000 VNĐ" }
                ]
            },
            2: { 
                title: "ĂN UỐNG & VÉ (20%)", 
                totalAmount: "17.600.000 VNĐ",
                bills: [
                    // Thêm invoiceId để chuyển sang trang chi tiết khi bấm vào
                    { supplier: "Nhà hàng Biển Đông (Tiệc tối)", date: "08/09/2026", code: "HD-26-00142", amount: "8.200.000 VNĐ", invoiceId: "req-bien-dong" },
                    { supplier: "Sun World Ba Na Hills (Vé cáp)", date: "09/09/2026", code: "HD-26-00889", amount: "9.400.000 VNĐ", invoiceId: "req-bana" }
                ]
            }
        }
    },

};


// Hàm hiển thị danh sách hóa đơn chi tiết khi bấm vào biểu đồ
// Hàm hiển thị danh sách hóa đơn chi tiết khi bấm vào biểu đồ
function showReportDetail(index) {
    const tour = toursData[currentTourId];
    const categoryData = tour.details[index];

    if (!categoryData) return;

    // Cập nhật tiêu đề hạng mục
    document.getElementById('detail-title').innerText = categoryData.title;

    // Render danh sách các hóa đơn
    let billsHtml = `
        <div class="mb-3 p-2 bg-blue-50 dark:bg-gray-800 rounded-lg flex justify-between items-center border border-blue-100 dark:border-gray-700">
            <span class="text-xs text-gray-500 dark:text-gray-400 font-semibold">Tổng chi hạng mục:</span>
            <span class="font-bold text-red-500 dark:text-red-400 text-base">${categoryData.totalAmount}</span>
        </div>
        <p class="text-xs font-bold text-gray-600 dark:text-gray-300 mb-2">
            <i class="fas fa-file-invoice mr-1"></i> Danh sách hóa đơn chứng từ (${categoryData.bills.length}):
        </p>
        <p class="text-[10px] text-emerald-600 dark:text-emerald-400 italic mb-2">
            * Bấm vào từng bill bên dưới để xem chi tiết chứng từ & phê duyệt
        </p>
        <div class="space-y-2.5">
    `;

    categoryData.bills.forEach((bill) => {
        // Gắn sự kiện openInvoiceDetail nếu bill có mã ID chờ duyệt tương ứng
        const clickAction = bill.invoiceId ? `onclick="openInvoiceDetail('${bill.invoiceId}')"` : '';
        const cursorStyle = bill.invoiceId ? 'cursor-pointer hover:border-emerald-500 hover:shadow-md' : '';

        billsHtml += `
            <div ${clickAction} class="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm transition ${cursorStyle}">
                <div class="flex justify-between items-start mb-1">
                    <p class="font-bold text-gray-800 dark:text-gray-100 text-sm flex items-center">
                        ${bill.supplier}
                        ${bill.invoiceId ? '<i class="fas fa-chevron-right text-[10px] ml-1.5 text-emerald-500"></i>' : ''}
                    </p>
                    <span class="font-bold text-red-500 dark:text-red-400 text-sm">${bill.amount}</span>
                </div>
                <div class="flex justify-between text-[11px] text-gray-500 dark:text-gray-400">
                    <span><i class="far fa-calendar-alt mr-1"></i>${bill.date}</span>
                    <span class="font-mono bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">${bill.code}</span>
                </div>
            </div>
        `;
    });

    billsHtml += `</div>`;

    document.getElementById('detail-content').innerHTML = billsHtml;
    
    // Chuyển sang Tab chi tiết báo cáo
    switchTab('report', document.getElementById('nav-report'));
    document.getElementById('report-empty').classList.add('hidden');
    document.getElementById('report-details').classList.remove('hidden');
}
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
    document.getElementById('scan-line').classList.remove('hidden');
    document.getElementById('scan-hint').innerHTML = '<i class="fas fa-spinner fa-spin text-4xl mb-2"></i><br>Đang xử lý...';
    setTimeout(() => {
        document.getElementById('scan-line').classList.add('hidden');
        document.getElementById('scan-result').classList.remove('hidden');
    }, 1500);
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
    
    // Đổ dữ liệu chi tiết vào các trường mới
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