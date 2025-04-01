const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
const axios = require('axios');
const fs = require('fs');
// 添加dotenv支持
require('dotenv').config();

// 初始化Express應用
const app = express();
const PORT = process.env.PORT || 3003;

// 中間件
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://personal-website-2utv6xvfj-danielcheng1022-gmailcoms-projects.vercel.app'] 
    : 'http://localhost:3003'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 處理 favicon 請求
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // 返回無內容狀態碼
});

// 靜態文件服務
app.use(express.static(path.join(__dirname)));

// 處理根路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 處理其他HTML頁面
app.get('/:page.html', (req, res) => {
  const page = req.params.page;
  res.sendFile(path.join(__dirname, `${page}.html`));
});

// 處理表單提交
app.post('/contact.php', async (req, res) => {
  console.log('接收到表單提交請求:', req.body);
  try {
    // 獲取表單數據
    const { name, email, message, 'g-recaptcha-response': recaptchaResponse } = req.body;
    
    // 驗證reCAPTCHA
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY || '6LeI_QUrAAAAAErIE1NG-YZHhBrKL9wjzv9RCoa4';
    console.log('驗證reCAPTCHA...');
    
    const recaptchaVerification = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaResponse}`
    );
    
    if (!recaptchaVerification.data.success) {
      return res.json({
        success: false,
        errors: ['reCAPTCHA驗證失敗，請重試']
      });
    }
    
    // 驗證表單數據
    if (!name || !email || !message) {
      return res.json({
        success: false,
        errors: ['請填寫所有必填字段']
      });
    }
    
    // 設置郵件傳輸
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'danielcheng1022@gmail.com',
        pass: process.env.EMAIL_PASS || '48582798'
      }
    });
    
    // 郵件選項
    const mailOptions = {
      from: process.env.EMAIL_USER || 'danielcheng1022@gmail.com',
      to: process.env.RECIPIENT_EMAIL || 'danielcheng1022@gmail.com',
      subject: `來自個人網站的新消息 - ${name}`,
      text: `
        姓名: ${name}
        郵箱: ${email}
        消息內容: ${message}
      `
    };
    
    // 發送郵件
    console.log('嘗試發送郵件...');
    await transporter.sendMail(mailOptions);
    console.log('郵件發送成功!');
    
    // 返回成功響應
    res.json({
      success: true,
      message: '您的消息已成功發送！我們會盡快回覆您。'
    });
  } catch (error) {
    console.error('發送郵件時出錯:', error);
    
    res.json({
      success: false,
      errors: ['發送消息時出錯，請稍後再試']
    });
  }
});

// 語言切換支持 - 確保所有頁面都能保持相同的語言設置
app.get('/:page', (req, res) => {
  const page = req.params.page;
  const lang = req.query.lang || 'zh';
  
  // 檢查是否請求英文版本
  if (page === 'index.html' && lang === 'en') {
    return res.sendFile(path.join(__dirname, 'index_en.html'));
  }
  
  // 否則發送請求的頁面
  res.sendFile(path.join(__dirname, page));
});

// 導出 app 以供 Vercel 使用
module.exports = app;

// 僅在直接運行時啟動服務器
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`服務器運行在 http://localhost:${PORT}`);
    console.log(`環境: ${process.env.NODE_ENV || 'development'}`);
    console.log('可用頁面:');
    console.log(`- 主頁: http://localhost:${PORT}/`);
    console.log(`- 作品集: http://localhost:${PORT}/portfolio.html`);
    console.log(`- 博客: http://localhost:${PORT}/blog.html`);
  });
}