// Chuyển Tab chính từ Bottom Nav
function switchTab(tabId, element) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-' + tabId).classList.add('active');
    
    if(element) {
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        element.classList.add('active');
    }
}

// Từ Danh sách Tour đi vào Chi tiết 1 Tour (Dashboard)
function openTour(tourName) {
    document.getElementById('tour-name-title').innerText = tourName;
    switchTab('home'); 
}

// Từ Dashboard quay lại Danh sách Tour
function backToTourList() {
    switchTab('tour-list', document.getElementById('nav-tour-list'));
}

// Dữ liệu hợp lý hóa: Tổng chi 88tr (100%)
const detailData = {
    0: { // Lưu trú
        title: "Chi tiết dòng tiền: LƯU TRÚ (45%)",
        color: "text-blue-600",
        html: `
            <div class="p-3 border rounded-lg bg-blue-50 mb-2 shadow-sm">
                <div class="flex justify-between items-start">
                    <p class="font-bold text-gray-800">Khách sạn Mường Thanh ĐN</p>
                    <span class="bg-blue-200 text-blue-800 text-[10px] px-2 py-1 rounded font-bold">Đã TT</span>
                </div>
                <p class="text-xs text-gray-500 mt-1"><i class="fas fa-file-invoice mr-1"></i>MST: 0400123456</p>
                <p class="text-sm mt-1 text-gray-700">Hạng mục: 20 phòng x 3 đêm x 660k</p>
                <p class="font-bold text-red-500 mt-2 text-right">39.600.000 VNĐ</p>
            </div>
            <div class="text-right text-xs font-bold text-gray-600 mt-2">Tổng hạng mục: 39.600.000 VNĐ</div>
        `
    },
    1: { // Vận chuyển
        title: "Chi tiết dòng tiền: VẬN CHUYỂN (35%)",
        color: "text-emerald-600",
        html: `
            <div class="p-3 border rounded-lg bg-emerald-50 mb-2 shadow-sm">
                <div class="flex justify-between items-start">
                    <p class="font-bold text-gray-800">Nhà xe Hải Vân</p>
                    <span class="bg-emerald-200 text-emerald-800 text-[10px] px-2 py-1 rounded font-bold">Đã TT</span>
                </div>
                <p class="text-xs text-gray-500 mt-1"><i class="fas fa-file-invoice mr-1"></i>MST: 0101234599</p>
                <p class="text-sm mt-1 text-gray-700">Hạng mục: Thuê xe 45 chỗ x 3 ngày</p>
                <p class="font-bold text-red-500 mt-2 text-right">10.800.000 VNĐ</p>
            </div>
            <div class="p-3 border rounded-lg bg-emerald-50 shadow-sm">
                <div class="flex justify-between items-start">
                    <p class="font-bold text-gray-800">Vietjet Air (Đại lý)</p>
                    <span class="bg-emerald-200 text-emerald-800 text-[10px] px-2 py-1 rounded font-bold">Đã TT</span>
                </div>
                <p class="text-xs text-gray-500 mt-1"><i class="fas fa-file-invoice mr-1"></i>MST: 0102345678</p>
                <p class="text-sm mt-1 text-gray-700">Hạng mục: Vé bay khứ hồi (20 khách)</p>
                <p class="font-bold text-red-500 mt-2 text-right">20.000.000 VNĐ</p>
            </div>
            <div class="text-right text-xs font-bold text-gray-600 mt-2">Tổng hạng mục: 30.800.000 VNĐ</div>
        `
    },
    2: { // Ăn uống
        title: "Chi tiết dòng tiền: ĂN UỐNG & VÉ (20%)",
        color: "text-amber-600",
        html: `
            <div class="p-3 border rounded-lg bg-amber-50 mb-2 shadow-sm">
                <div class="flex justify-between items-start">
                    <p class="font-bold text-gray-800">Nhà hàng Biển Đông</p>
                    <span class="bg-yellow-200 text-yellow-800 text-[10px] px-2 py-1 rounded font-bold">Chờ duyệt</span>
                </div>
                <p class="text-xs text-gray-500 mt-1"><i class="fas fa-file-invoice mr-1"></i>MST: 0400987654</p>
                <p class="text-sm mt-1 text-gray-700">Hạng mục: 20 suất Hải sản x 410k</p>
                <p class="font-bold text-red-500 mt-2 text-right">8.200.000 VNĐ</p>
            </div>
            <div class="p-3 border rounded-lg bg-amber-50 shadow-sm">
                <div class="flex justify-between items-start">
                    <p class="font-bold text-gray-800">Bà Nà Hills (Sun World)</p>
                    <span class="bg-emerald-200 text-emerald-800 text-[10px] px-2 py-1 rounded font-bold">Đã TT</span>
                </div>
                <p class="text-xs text-gray-500 mt-1"><i class="fas fa-file-invoice mr-1"></i>MST: 0401112223</p>
                <p class="text-sm mt-1 text-gray-700">Hạng mục: 20 vé cáp treo khứ hồi x 470k</p>
                <p class="font-bold text-red-500 mt-2 text-right">9.400.000 VNĐ</p>
            </div>
            <div class="text-right text-xs font-bold text-gray-600 mt-2">Tổng hạng mục: 17.600.000 VNĐ</div>
        `
    }
};

// Bấm vào biểu đồ để xem chi tiết đối tác
function showReportDetail(index) {
    // Đổ dữ liệu
    const data = detailData[index];
    const titleEl = document.getElementById('detail-title');
    titleEl.innerText = data.title;
    titleEl.className = "font-bold text-base " + data.color;
    document.getElementById('detail-content').innerHTML = data.html;
    
    // Chuyển UI sang màn hình báo cáo, ẩn state empty
    switchTab('report', document.getElementById('nav-report'));
    document.getElementById('report-empty').classList.add('hidden');
    document.getElementById('report-details').classList.remove('hidden');
}

// Bấm nút Quay lại ở trang Chi tiết Đối tác
function backToTourDashboard() {
    // Quay thẳng về lại màn hình Dashboard của Tour (Tab home)
    switchTab('home');
}

// Xử lý giả lập quét OCR
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

function approve(id, isApproved) {
    const el = document.getElementById(id);
    if(isApproved) {
        el.innerHTML = '<div class="text-center py-4 text-emerald-600 font-bold"><i class="fas fa-check-circle text-3xl mb-2"></i><br>Đã phê duyệt thanh toán</div>';
    } else {
        el.innerHTML = '<div class="text-center py-4 text-red-500 font-bold"><i class="fas fa-times-circle text-3xl mb-2"></i><br>Đã từ chối khoản chi</div>';
    }
    setTimeout(() => { el.style.display = 'none'; }, 2000);
}

// Vẽ biểu đồ tròn & Gắn sự kiện click
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('expenseChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Lưu trú (45%)', 'Vận chuyển (35%)', 'Ăn uống & Vé (20%)'],
                datasets: [{
                    data: [45, 35, 20],
                    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
                    borderWidth: 2,
                    hoverOffset: 10 // Phóng to khi trỏ chuột vào
                }]
            },
            options: {
                responsive: true,
                plugins: { 
                    legend: { position: 'bottom', labels: { boxWidth: 12 } }
                },
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        showReportDetail(index);
                    }
                }
            }
        });
    }
});