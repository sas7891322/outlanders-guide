# v3.4 圖騰資料一致性修正｜2026-11-06

## 已完成
- 修復 v3.3 `TOTEM-AUDIT.csv` 和 `assets/monster-totems/manifest.json` 仍顯示缺圖、舊圖片路徑的問題。
- 36/36 個既有魔物 ID 映射至 `assets/images/monsters/<id>.webp`，檔案實際存在。
- 檢查 40 張 WebP：皆為 144×144，格式有效。
- 補齊 36 張的 SHA-256 便於後續檢查誤換圖。
- 其餘 4 張另列入 `EXTRA-TOTEMS.csv`，未擅自套進現有圖鑑。
- 更新 `totem-audit.html`，顯示真正檔案狀態，不再顯示 0 張。

## 尚未完成
- 名稱、圖像與正式版魔物的逐張視覺複核。
- 圖騰來源的公開再利用授權。上傳 ZIP 的擁有權不等於遊戲版權授權。
- Safari/Chromium 網頁完整交互操作、實際 GitHub/Vercel 部署。

**版本定位：私人／本機驗收，不建議公開部署包含圖騰的網站。**
