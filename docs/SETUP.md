# 🚀 HƯỚNG DẪN CÀI ĐẶT - FOODAI PROTOTYPE

## Yêu cầu hệ thống
- **Node.js** phiên bản 14 trở lên
- **npm** phiên bản 6 trở lên

## Cài đặt Node.js (nếu chưa có)

### Windows:
1. Tải Node.js từ: https://nodejs.org/
2. Chọn phiên bản LTS (Long Term Support)
3. Chạy file cài đặt và làm theo hướng dẫn
4. Mở Command Prompt và kiểm tra:
   ```
   node --version
   npm --version
   ```

### macOS:
```bash
# Sử dụng Homebrew
brew install node
```

### Linux:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# CentOS/Fedora
sudo yum install nodejs npm
```

## Các bước cài đặt dự án

### Bước 1: Mở Terminal/Command Prompt
- **Windows**: Nhấn `Win + R`, gõ `cmd`, Enter
- **macOS**: Mở Terminal từ Applications
- **Linux**: Mở Terminal

### Bước 2: Di chuyển vào thư mục dự án
```bash
cd path/to/foodai-prototype
```

Ví dụ:
```bash
# Windows
cd C:\Users\ttung05\Desktop\WEB_DESIGN\foodai-prototype

# macOS/Linux
cd ~/Desktop/WEB_DESIGN/foodai-prototype
```

### Bước 3: Cài đặt dependencies
```bash
npm install
```

Lệnh này sẽ:
- Đọc file `package.json`
- Tải xuống tất cả thư viện cần thiết
- Lưu vào thư mục `node_modules`

### Bước 4: Chạy dự án
```bash
npm start
```

Trình duyệt sẽ tự động mở tại: http://localhost:8000

## Các lệnh hữu ích

### Chạy server (tự động mở trình duyệt)
```bash
npm start
```

### Chạy server (không tự động mở trình duyệt)
```bash
npm run serve
```

### Dừng server
Nhấn `Ctrl + C` trong Terminal/Command Prompt

## Xử lý lỗi thường gặp

### Lỗi: "npm không được nhận dạng là lệnh"
**Nguyên nhân**: Node.js chưa được cài đặt hoặc chưa được thêm vào PATH

**Giải pháp**:
1. Cài đặt lại Node.js
2. Restart Terminal/Command Prompt
3. Kiểm tra lại: `node --version`

### Lỗi: "Port 8000 đã được sử dụng"
**Giải pháp**:
```bash
# Sử dụng port khác
npx http-server -p 3000
```

### Lỗi: "Cannot find module"
**Giải pháp**:
```bash
# Xóa node_modules và cài lại
rm -rf node_modules
npm install

# Windows Command Prompt
rmdir /s node_modules
npm install
```

### Lỗi: "Permission denied"
**Giải pháp**:
```bash
# macOS/Linux - chạy với sudo
sudo npm install

# Windows - chạy Command Prompt với quyền Administrator
```

## Cấu trúc thư mục sau khi cài đặt

```
foodai-prototype/
├── node_modules/          # Thư viện npm (tự động tạo)
├── assets/
│   └── css/
├── package.json           # Cấu hình dự án
├── package-lock.json      # Lock file (tự động tạo)
├── README.md             # Hướng dẫn tiếng Anh
├── SETUP.md              # File này
└── *.html                # Các trang web
```

## Kiểm tra cài đặt thành công

Sau khi chạy `npm start`, bạn sẽ thấy:
```
Starting up http-server, serving ./
...
Available on:
  http://127.0.0.1:8000
```

Mở trình duyệt và truy cập: http://localhost:8000

## Chạy trên máy khác

### Cách 1: Sao chép toàn bộ dự án
1. Copy toàn bộ thư mục `foodai-prototype`
2. Chạy `npm install` trên máy mới
3. Chạy `npm start`

### Cách 2: Sử dụng Git
```bash
# Trên máy nguồn
git init
git add .
git commit -m "Initial commit"
git remote add origin <repository-url>
git push -u origin main

# Trên máy đích
git clone <repository-url>
cd foodai-prototype
npm install
npm start
```

## Deploy lên Internet

### Vercel (Miễn phí)
```bash
npm install -g vercel
vercel
```

### Netlify (Miễn phí)
```bash
npm install -g netlify-cli
netlify deploy
```

### GitHub Pages (Miễn phí)
1. Push code lên GitHub
2. Vào Settings → Pages
3. Chọn branch và thư mục
4. Save

## Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra lại phiên bản Node.js: `node --version`
2. Xóa `node_modules` và cài lại: `npm install`
3. Đọc log lỗi cẩn thận
4. Google lỗi cụ thể

---

**Chúc bạn thành công! 🎉**
