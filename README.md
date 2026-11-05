# 旅人狩獵手冊 v3.0｜魔物圖騰匯入工作台

維持 v2.9 全站功能，新增 `totem-importer.html` 和 `totem-importer.js`。

## 使用
1. 在本機瀏覽器打開 `totem-importer.html`。
2. 選取確認為《魔物獵人：旅人》遊戲內圖騰的原圖或遊戲截圖。
3. 選對魔物，輸入來源與授權狀態，調整裁切與縮放。
4. 匯出 ZIP，先審核，再將 `assets/monster-totems` 下的 WebP 檔與 `manifest.json` 更新至網站。
5. 重新部署後，既有魔物卡片、素材查詢、全站搜尋會依檔名自動顯示圖片。

**重要：** 尚未取得任何可靠的《旅人》原圖，不能稱作已完成圖騰展示。工作台採瀏覽器記憶體，匯出前請勿重整。原站尚未由此版本部署。


## v3.1 圖騰來源稽核
- `totem-audit.html`：36 筆圖騰清單與來源查核結果。
- `TOTEM-AUDIT.csv`：可追蹤的對照清單。
- 圖騰原圖目前仍為 0/36，不應宣稱圖片已導入。

## v3.2 圖騰導入
使用者提供的 40 張 WebP 已加入 `assets/images/monsters/`，36 筆原有魔物卡片、素材、搜尋都能顯示；參考 TOTEM-RELEASE-NOTES.md。
