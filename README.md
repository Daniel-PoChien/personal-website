# Daniel的個人網站

這是一個使用HTML、CSS和JavaScript構建的個人網站和作品集，並使用Node.js作為後端服務器。

## 功能

- 響應式設計，適應所有屏幕尺寸
- 暗黑模式支持
- 多語言支持（中文和英文）
- 作品集展示
- 博客部分
- 聯繫表單與郵件集成
- reCAPTCHA表單驗證

## 技術棧

- 前端：HTML5, CSS3, JavaScript, TailwindCSS
- 後端：Node.js, Express
- 其他：nodemailer, reCAPTCHA

## 安裝

1. 克隆此存儲庫
```
git clone https://github.com/your-username/personal-website.git
cd personal-website
```

2. 安裝依賴項
```
npm install
```

3. 配置環境變量
複製`.env.example`文件到`.env`並填寫您的詳細信息：
```
cp .env.example .env
```
然後編輯`.env`文件並添加您的詳細信息。

## 運行應用

### 開發模式

```
npm run dev
```

### 生產模式

```
npm start
```

應用將在 http://localhost:3003 運行（除非在.env文件中指定了其他端口）。

## 部署

此應用可以部署到任何支持Node.js的主機，如Heroku，Vercel或AWS。

## 聯繫

如有任何問題或建議，請聯繫[danielcheng1022@gmail.com](mailto:danielcheng1022@gmail.com)。
