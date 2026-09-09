// Dữ liệu Động cho tất cả các Tour khớp tuyệt đối với kế toán
const toursData = {
    'dn-ha': {
        name: 'Đà Nẵng - Hội An 3N2Đ',
        budget: 100000000,
        spent: 88000000,
        chartLabels: ['Lưu trú (45%)', 'Vận chuyển (35%)', 'Ăn uống & Vé (20%)'],
        chartData: [45, 35, 20],
        details: {
            0: { // 45% của 88tr = 39.600.000
                title: "Chi tiết dòng tiền: LƯU TRÚ (45%)", color: "text-blue-600",
                html: `
                    <div class="p-3 border rounded-lg bg-blue-50 mb-2 shadow-sm">
                        <div class="flex justify-between items-start"><p class="font-bold text-gray-800">Khách sạn Mường Thanh ĐN</p><span class="bg-blue-200 text-blue-800 text-[10px] px-2 py-1 rounded font-bold">Đã TT</span></div>
                        <p class="text-xs text-gray-500 mt-1"><i class="fas fa-file-invoice mr-1"></i>MST: 0400123456</p>
                        <p class="text-sm mt-1 text-gray-700">Hạng mục: 20 phòng x 3 đêm x 660k</p>
                        <p class="font-bold text-red-500 mt-2 text-right">39.600.000 VNĐ</p>
                    </div><div class="text-right text-xs font-bold text-gray-600 mt-2">Tổng: 39.600.000 VNĐ</div>`
            },
            1: { // 35% của 88tr = 30.800.000
                title: "Chi tiết dòng tiền: VẬN CHUYỂN (35%)", color: "text-emerald-600",
                html: `
                    <div class="p-3 border rounded-lg bg-emerald-50 mb-2 shadow-sm">
                        <div class="flex justify-between items-start"><p class="font-bold text-gray-800">Nhà xe Hải Vân</p><span class="bg-emerald-200 text-emerald-800 text-[10px] px-2 py-1 rounded font-bold">Đã TT</span></div>
                        <p class="text-sm mt-1 text-gray-700">Thuê xe 45 chỗ x 3 ngày</p>
                        <p class="font-bold text-red-500 mt-2 text-right">10.800.000 VNĐ</p>
                    </div>
                    <div class="p-3 border rounded-lg bg-emerald-50 shadow-sm">
                        <div class="flex justify-between items-start"><p class="font-bold text-gray-800">Vietjet Air (Đại lý)</p><span class="bg-emerald-200 text-emerald-800 text-[10px] px-2 py-1 rounded font-bold">Đã TT</span></div>
                        <p class="text-sm mt-1 text-gray-700">Vé bay khứ hồi (20 khách)</p>
                        <p class="font-bold text-red-500 mt-2 text-right">20.000.000 VNĐ</p>
                    </div><div class="text-right text-xs font-bold text-gray-600 mt-2">Tổng: 30.800.000 VNĐ</div>`
            },
            2: { // 20% của 88tr = 17.600.000
                title: "Chi tiết dòng tiền: ĂN UỐNG & VÉ (20%)", color: "text-amber-600",
                html: `
                    <div class="p-3 border rounded-lg bg-amber-50 mb-2 shadow-sm">
                        <div class="flex justify-between items-start"><p class="font-bold text-gray-800">Nhà hàng Biển Đông</p><span class="bg-yellow-200 text-yellow-800 text-[10px] px-2 py-1 rounded font-bold">Chờ duyệt</span></div>
                        <p class="text-sm mt-1 text-gray-700">20 suất Hải sản x 410k</p>
                        <p class="font-bold text-red-500 mt-2 text-right">8.200.000 VNĐ</p>
                    </div>
                    <div class="p-3 border rounded-lg bg-amber-50 shadow-sm">
                        <div class="flex justify-between items-start"><p class="font-bold text-gray-800">Bà Nà Hills</p><span class="bg-yellow-200 text-yellow-800 text-[10px] px-2 py-1 rounded font-bold">Chờ duyệt</span></div>
                        <p class="text-sm mt-1 text-gray-700">20 vé cáp treo khứ hồi x 470k</p>
                        <p class="font-bold text-red-500 mt-2 text-right">9.400.000 VNĐ</p>
                    </div><div class="text-right text-xs font-bold text-gray-600 mt-2">Tổng: 17.600.000 VNĐ</div>`
            }
        }
    },
    'bana': {
        name: 'Bà Nà Hills 1 Ngày', budget: 25000000, spent: 2500000,
        chartLabels: ['Đặt cọc vé (100%)'], chartData: [100],
        details: {
            0: { title: "Chi tiết dòng tiền: ĐẶT CỌC VÉ (100%)", color: "text-blue-600", html: `<div class="p-3 border rounded-lg bg-blue-50 shadow-sm"><div class="flex justify-between items-start"><p class="font-bold text-gray-800">Sun World Ba Na Hills</p><span class="bg-blue-200 text-blue-800 text-[10px] px-2 py-1 rounded font-bold">Đã TT</span></div><p class="font-bold text-red-500 mt-2 text-right">2.500.000 VNĐ</p></div>` }
        }
    },
    'phuquoc': {
        name: 'Phú Quốc 4N3Đ', budget: 200000000, spent: 150000000,
        chartLabels: ['Lưu trú (50%)', 'Vé máy bay (30%)', 'Ăn uống (20%)'], chartData: [50, 30, 20],
        details: {
            0: { title: "Chi tiết dòng tiền: LƯU TRÚ (50%)", color: "text-blue-600", html: `<div class="p-3 border rounded-lg bg-blue-50 shadow-sm"><div class="flex justify-between"><p class="font-bold text-gray-800">Vinpearl Resort</p><span class="bg-blue-200 text-blue-800 text-[10px] px-2 py-1 rounded font-bold">Đã TT</span></div><p class="font-bold text-red-500 mt-2 text-right">75.000.000 VNĐ</p></div>` },
            1: { title: "Chi tiết dòng tiền: VÉ MÁY BAY (30%)", color: "text-emerald-600", html: `<div class="p-3 border rounded-lg bg-emerald-50 shadow-sm"><div class="flex justify-between"><p class="font-bold text-gray-800">Vietnam Airlines</p><span class="bg-emerald-200 text-emerald-800 text-[10px] px-2 py-1 rounded font-bold">Đã TT</span></div><p class="font-bold text-red-500 mt-2 text-right">45.000.000 VNĐ</p></div>` },
            2: { title: "Chi tiết dòng tiền: ĂN UỐNG (20%)", color: "text-amber-600", html: `<div class="p-3 border rounded-lg bg-amber-50 shadow-sm"><div class="flex justify-between"><p class="font-bold text-gray-800">Nhà hàng Hàm Ninh</p><span class="bg-yellow-200 text-yellow-800 text-[10px] px-2 py-1 rounded font-bold">Chờ duyệt</span></div><p class="font-bold text-red-500 mt-2 text-right">30.000.000 VNĐ</p></div>` }
        }
    },
    'hue': {
        name: 'Huế - Lăng Cô 2N1Đ', budget: 40000000, spent: 40000000,
        chartLabels: ['Lưu trú (40%)', 'Di chuyển (40%)', 'Khác (20%)'], chartData: [40, 40, 20],
        details: {
            0: { title: "LƯU TRÚ (40%)", color: "text-blue-600", html: `<div class="p-3 border rounded-lg bg-blue-50"><p class="font-bold text-gray-800">Resort Lăng Cô</p><p class="font-bold text-red-500 mt-2 text-right">16.000.000 VNĐ</p></div>` },
            1: { title: "DI CHUYỂN (40%)", color: "text-emerald-600", html: `<div class="p-3 border rounded-lg bg-emerald-50"><p class="font-bold text-gray-800">Nhà xe Huế Tour</p><p class="font-bold text-red-500 mt-2 text-right">16.000.000 VNĐ</p></div>` },
            2: { title: "KHÁC (20%)", color: "text-amber-600", html: `<div class="p-3 border rounded-lg bg-amber-50"><p class="font-bold text-gray-800">Vé tham quan Đại Nội & HDV</p><p class="font-bold text-red-500 mt-2 text-right">8.000.000 VNĐ</p></div>` }
        }
    }
};

let currentTourId = '';
let expenseChartInstance = null;

// Hàm chuyển tab chung
function switchTab(tabId, element) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-' + tabId).classList.add('active');
    
    if(element) {
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        element.classList.add('active');
    }
}

// Mở một Tour cụ thể và tính toán số liệu
function openTour(tourId) {
    currentTourId = tourId;
    const tour = toursData[tourId];
    
    // Đổ dữ liệu vào UI
    document.getElementById('tour-name-title').innerText = tour.name;
    document.getElementById('tour-budget').innerText = tour.budget.toLocaleString('vi-VN');
    document.getElementById('tour-spent').innerText = tour.spent.toLocaleString('vi-VN');
    document.getElementById('tour-remaining').innerText = (tour.budget - tour.spent).toLocaleString('vi-VN');
    
    // Cảnh báo nếu chi tiêu quá 80%
    const warningEl = document.getElementById('tour-warning');
    let percent = (tour.spent / tour.budget) * 100;
    if(percent >= 80) {
        warningEl.classList.remove('hidden');
        warningEl.innerHTML = `<i class="fas fa-exclamation-triangle mr-1"></i> CẢNH BÁO: Đã chi ${percent.toFixed(0)}% ngân sách!`;
    } else {
        warningEl.classList.add('hidden');
    }
    
    // Render Biểu đồ
    updateChart(tour.chartLabels, tour.chartData);
    
    // Chuyển sang màn hình Dashboard Tour
    switchTab('home');
}

// Hàm vẽ biểu đồ tròn
function updateChart(labels, data) {
    const canvas = document.getElementById('expenseChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Xóa biểu đồ cũ nếu có
    if(expenseChartInstance) { expenseChartInstance.destroy(); }
    
    expenseChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{ data: data, backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'], borderWidth: 2, hoverOffset: 10 }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom', labels: { boxWidth: 12 } } },
            onClick: (event, elements) => {
                if (elements.length > 0) { showReportDetail(elements[0].index); }
            }
        }
    });
}

// Bấm vào biểu đồ xem chi tiết dòng tiền
function showReportDetail(index) {
    if(!currentTourId) return;
    const tour = toursData[currentTourId];
    if(!tour.details || !tour.details[index]) return;

    const data = tour.details[index];
    const titleEl = document.getElementById('detail-title');
    titleEl.innerText = data.title;
    titleEl.className = "font-bold text-base " + data.color;
    document.getElementById('detail-content').innerHTML = data.html;
    
    switchTab('report', document.getElementById('nav-report'));
    document.getElementById('report-empty').classList.add('hidden');
    document.getElementById('report-details').classList.remove('hidden');
}

function backToTourList() { 
    switchTab('tour-list', document.getElementById('nav-tour-list')); 
}

function backToTourDashboard() { 
    switchTab('home'); 
}

// --- LOGIC MỚI CHO SCAN BILL ---

// Mở màn hình scan từ trong chi tiết Tour
function openScanBill() {
    switchTab('scan'); 
    
    // Reset lại giao diện quét
    document.getElementById('scan-result').classList.add('hidden');
    document.getElementById('scan-line').classList.add('hidden');
    document.getElementById('scan-hint').innerHTML = '<i class="fas fa-receipt text-4xl mb-2"></i><br>Đưa hóa đơn vào khung hình';
    
    // Bỏ trạng thái active của các nút ở dưới để báo hiệu người dùng đang trong luồng tác vụ quét bill
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
}

// Trở lại trang Dashboard Tour sau khi scan xong hoặc khi ấn nút quay lại
function backToTourFromScan() {
    switchTab('home'); 
}

// Xử lý hiệu ứng quét
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

// Xử lý Duyệt chi
function approve(id, isApproved) {
    const el = document.getElementById(id);
    if(isApproved) {
        el.innerHTML = '<div class="text-center py-4 text-emerald-600 font-bold"><i class="fas fa-check-circle text-3xl mb-2"></i><br>Đã phê duyệt thanh toán</div>';
    } else {
        el.innerHTML = '<div class="text-center py-4 text-red-500 font-bold"><i class="fas fa-times-circle text-3xl mb-2"></i><br>Đã từ chối khoản chi</div>';
    }
    setTimeout(() => { el.style.display = 'none'; }, 2000);
}

// Bật/tắt Night Mode
function toggleNightMode() {
    const container = document.querySelector('.app-container');
    container.classList.toggle('dark-theme');
    
    // Đổi icon giữa mặt trăng (tối) và mặt trời (sáng)
    const icon = document.getElementById('theme-icon');
    if (container.classList.contains('dark-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}