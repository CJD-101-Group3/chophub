<!--這不知道要不要留著 
# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support). -->

# ChopHub 冷兵器社群平台

## 📜 專案簡介

一個以 3D 模型展示冷兵器為主題的社群網站，支援發文、留言、模型瀏覽與收藏功能，並提供後台管理系統。

## 📁 專案結構

chophub/
├── frontend/ # Vue + Vite 前端：前台 + 後台介面
│        └── README.md # 本說明文件
└── backend/ # Express 後端 API + 資料庫連線


## 🔐 管理者帳號（開發測試用）

帳號：``
密碼：``

## 📝 操作守則

 - 在自己的桌面建立一個chophub資料夾，以後都在chophub資料夾裡面動作

 - 每次更動專案前，務必先更新進度git pull origin main

### 初次設定指令集

1 從 GitHub 抓下專案
git clone https://github.com/CJD101-G3/chophub.git

2 進入專案資料夾
cd chophub

3 狀態檢查
git status

若出現以下消息:
On branch main
Your branch is up to date with 'origin/main'.
代表你正確地進入專案了

4 在本地開發分支
git checkout -b main

5 暫存所有修改過的檔案
git add .

6 提交並加上描述
git commit -m "請輸入改動"

7 把你的功能分支推上 GitHub（別人才能看見）
git push origin main

若是在#7出現錯誤訊息,可能是你的git沒有載回來最新的資料,請先執行以下指令
git pull origin main --rebase
完成後確認資料,再次推送使用
git push origin main


## 📡 API 文件（或連結）

(待補)


## 📡 後端 API 規格

<!-- 可參考 /backend/routes/ 檔案，或未來可整合 Swagger 文件。

主要路由範例：

| Method | 路徑 | 說明 |
|--------|------|------|
| POST | /admin/login | 管理員登入 |
| GET | /admin/posts | 取得所有貼文 |
| POST | /admin/posts | 新增貼文 | -->


## 📚 技術棧與套件

(待補)


## 🧰 使用技術

- Vue 3 + Vite + Vue Router
- Express.js + Node.js
- SQLite / PostgreSQL
- Tailwind CSS / Element Plus


## 🙋‍♂️ 開發團隊

Chophub 由 CJD101-G3 團隊合作開發，以下是各成員的職責分工：

- **楊軒**
  - 角色: 組長/專案負責人/前端開發
  - 職責: 更新Notion，繪製wireframe
- **沈筠雅**
  - 角色: 前端開發
  - 職責: 繪製wireframe
- **許譽瀚**
  - 角色: 後端負責人/技術指導
  - 職責: 設計和實現後端 API（如商品數據存儲），部署伺服器；教授團隊成員前後端技術（如 Tailwind, vue），指導 Git 版本控制，解答技術問題
- **陳志杰**
  - 角色: 後端開發
  - 職責: 設計和實現後端 API（如商品數據存儲），部署伺服器。
  **李映璇**
  - 角色: 後端開發
  - 職責: 設計和實現後端 API（如商品數據存儲），部署伺服器。
  **田宇辰**
  - 角色: 後端開發
  - 職責: 設計和實現後端 API（如商品數據存儲），部署伺服器。
  **陳映良**
  - 角色: 前後端整合
  - 職責: 更新 README 和分工說明。

- GitHub Repo：https://github.com/CJD101-G3/chophub
- Notion ：https://www.notion.so/223f573f795680a09ffbd0b8ce10cbe9?source=copy_link


## 🖼️ 介面預覽



