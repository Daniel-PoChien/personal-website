// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 技能图表
window.addEventListener('load', function() {
    const ctx = document.getElementById('skillChart').getContext('2d');
    const skillChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Python', 'C語言'],
            datasets: [{
                label: '技能水平 (%)',
                data: [90, 85, 80, 75, 70, 65],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
});

// 语言切换功能
const zhButton = document.getElementById('lang-zh');
const enButton = document.getElementById('lang-en');

if (document.documentElement.lang === 'zh-TW') {
    enButton.addEventListener('click', function() {
        window.location.href = 'index_en.html';
    });
} else {
    zhButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
}

// 聯繫表單處理
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const formMessage = document.getElementById('form-message');
    const submitButton = this.querySelector('button[type="submit"]');
    
    // 禁用表單提交按鈕
    submitButton.disabled = true;
    submitButton.innerHTML = document.documentElement.lang === 'zh-TW' ? '發送中...' : 'Sending...';
    
    fetch('contact.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        formMessage.classList.remove('hidden');
        
        if (data.success) {
            // 成功信息
            formMessage.className = 'mt-4 text-center text-green-600 bg-green-100 p-3 rounded';
            formMessage.textContent = data.message;
            
            // 重置表單
            document.getElementById('contactForm').reset();
        } else {
            // 錯誤信息
            formMessage.className = 'mt-4 text-center text-red-600 bg-red-100 p-3 rounded';
            formMessage.textContent = data.errors.join(', ');
        }
        
        // 恢復提交按鈕
        submitButton.disabled = false;
        submitButton.innerHTML = document.documentElement.lang === 'zh-TW' ? '發送消息' : 'Send Message';
    })
    .catch(error => {
        formMessage.classList.remove('hidden');
        formMessage.className = 'mt-4 text-center text-red-600 bg-red-100 p-3 rounded';
        formMessage.textContent = document.documentElement.lang === 'zh-TW' ? 
            '發送請求時出錯，請稍後再試。' : 
            'An error occurred while sending your message. Please try again later.';
        
        // 恢復提交按鈕
        submitButton.disabled = false;
        submitButton.innerHTML = document.documentElement.lang === 'zh-TW' ? '發送消息' : 'Send Message';
    });
});