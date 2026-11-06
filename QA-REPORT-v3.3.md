# v3.3 原生圖騰發布前檢查（2026-11-06）

## 本次實際完成
- 保留 v3.2 全部網站功能與 40 張 WebP 圖騰。
- 驗證圖鑑對照 **36 / 36**：目標路徑存在，檔案格式 WebP，解析度均 144 × 144。
- 實際找到 WebP 圖檔 **40 張**，額外 4 張未映射到 36 筆已收錄魔物：nergigante.webp, radiant-diablos.webp, ruger-aidal.webp, unverified-1432.webp。
- 新增 `totem-review.html` 作為**本機人工視覺核對頁**，並產生 40 張圖片合成檢視表。
- 對照表核對僅保證檔名和圖片可讀，不代表逐張視覺辨識與遊戲官方圖示完全相同。

## 未通過與限制
- Chromium 144 啟動成功，但目前環境拒絕 `http://127.0.0.1` 與 `file://` 頁面，均回應 `ERR_BLOCKED_BY_ADMINISTRATOR`，故**無法宣稱瀏覽器或 Safari 版面、搜尋互動驗收已通過**。
- GitHub / Vercel 尚未部署，未測試正式線上網址。
- **圖片權利尚未確認**。Capcom Video Policy 允許有教育價值的特定實況與影片使用，但明確限制將遊戲素材拆分後作獨立內容散布；政策不是一般圖騰轉載授權，也不一定涵蓋所有第三方權利。
- 照片、遊戲內顯示及檔名的最終一對一人工複核仍需進行。

## 參考
- https://www.capcomusa.com/video-policy/
- https://www.monsterhunterwiki.org/wiki/MHOutlanders/Image_Gallery

## 發布建議
- 將此版維持為本機／私人預覽。未確認公開使用權前，不要把圖騰作為可公開散布的圖示素材部署。
- 後續取得明確許可、逐圖複核後，再做公開發布版。
