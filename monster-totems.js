/* v4.0 public edition: licensed game icons deliberately excluded. */
'use strict';
const monsterTotemPaths = {};
function monsterTotem(name, size='normal') {
  const variant=String(name).startsWith('融光種')?'radiant':'standard';
  const small=size==='small'?' monster-totem-small':'';
  return `<span class="monster-totem monster-totem-unavailable${small} ${variant}" role="img" aria-label="${escapeHtml(name)}：遊戲圖騰尚未公開授權"><span class="totem-missing" aria-hidden="true">圖示待授權</span></span>`;
}
