// Xử lý chuyển Tab
function switchTab(tabId, element) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-' + tabId).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    element.classList.add('active');
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

// Xử lý giả lập Duyệt/Từ chối
function approve(id, isApproved) {
    const el = document.getElementById(id);
    if(isApproved) {
        el.innerHTML = '<div class="text-center py-4 text-emerald-600 font-bold"><i class="fas fa-check-circle text-3xl mb-2"></i><br>Đã phê duyệt thanh toán</div>';
    } else {
        el.innerHTML = '<div class="text-center py-4 text-red-500 font-bold"><i class="fas fa-times-circle text-3xl mb-2"></i><br>Đã từ chối khoản chi</div>';
    }
    setTimeout(() => { el.style.display = 'none'; }, 2000);
}

// Vẽ biểu đồ tròn bằng Chart.js
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
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom', labels: { boxWidth: 12 } } }
            }
        });
    }
});