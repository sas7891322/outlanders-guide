# v2.7 首頁背景來源與使用說明

- 攝影：Sora Sagano（Unsplash）
- 原圖：https://unsplash.com/photos/a-view-of-a-mountain-range-with-clouds-in-the-sky-bmkfex9OI6c
- 授權：https://unsplash.com/license （Unsplash 免費授權，允許網站商業使用；建議標示攝影者）
- 使用位置：網站首頁主視覺 `.hero`，手機與桌機不同裁切設定。
- 專案性質：圖片是一般自然山林照片，**不是**《魔物獵人：旅人》遊戲截圖或官方素材，不可描述為遊戲內場景。
- 目前採遠端 Unsplash 圖片 URL，並以原有 `assets/landscape.svg` 作為背景備援。請注意網路或 Unsplash 服務中斷仍可能讓遠端照片無法顯示。
- 如需完整離線／自託管版本，請從上述原始照片頁面手動下載並確認使用權後，另行優化為 webp 放入 assets，再將 CSS URL 修改為本地路徑。
