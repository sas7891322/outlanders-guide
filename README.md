# 旅人狩獵手冊 v1.0（可操作原型）

《魔物獵人：旅人》非官方繁體中文攻略網站前端原型。

## 已完成
- 手機優先的首頁與 8 大攻略分類
- 攻略列表、分類篩選與即時搜尋
- 10 篇示範性基礎指南，每篇提供資料驗證狀態
- 冒險等級、生態等級與目標的進度建議
- 每日／每週待辦清單與瀏覽器本地保存
- 以 Asia/Taipei 日期／週次區分待辦完成紀錄
- 無需註冊、無外部 API、無 build step

## 重要限制
這是可部署的 **v1.0 UI／功能原型**，**不是已完成全網核查的正式攻略資料庫**。卡池保底、活動期限、完整角色技能、所有魔物掉落等尚未建立或核實。攻略文章以保守的編輯建議呈現，絕不應當作遊戲官方數值。

## 本機預覽
在此目錄執行：

```sh
python -m http.server 8000
```

接著開啟 http://localhost:8000

## 部署到 Vercel
1. 將整個資料夾內容上傳新建的 GitHub repository（根目錄要有 `index.html`）。
2. 於 Vercel 匯入此 repository。
3. Framework Preset 選 `Other`，Build Command 留空，Output Directory 留空或使用 `.`。
4. Deploy。網站不需 npm install。

## 檔案
- `index.html`：網站入口與 meta
- `styles.css`：網站樣式
- `app.js`：所有前端畫面、內容資料與互動
- `assets/`：原創的 SVG 風景與站台圖示
- `vercel.json`：基本安全 headers

## 後續建議
正式內容應改由獨立的 JSON 或 Markdown 儲存，增加官方來源 URL、實際查核日期、遊戲版本、地區、編輯狀態、差異紀錄。逐步做全角色、武器裝備、隨從、魔物和素材資料庫，最後才加入互動配裝與健檢。

## 免責
非官方粉絲作品，與 Capcom 或遊戲營運商無關；其商標歸各權利人所有。
