/* v2.1 weapon roadmap; fixed official-game verification disclaimer */
const weaponRoadState={type:'全部',rank:18,search:''};
function weaponRoadPage(){
 state.page='weapon-road';
 const d=weaponRoadmapData;
 layout(`<main class="main weaponroad"><div class="subhead"><button class="back" data-route="crafting">← 裝備製作</button><span class="overline">WEAPON ROUTES / V2.1</span></div><div class="listinghead"><h1 class="pagetitle">八大武器培養路線</h1><p>依武器種類查看前期起手與中後期目標，並對照冒險等級可提升的裝備稀有度。推薦武器為第三方攻略方案，非所有角色、魔物的最佳解。</p></div><div class="wr-warning"><strong>版本與資料提醒</strong><p>${escapeHtml(d.status)}。配方、武器技能及材料數量仍應以台灣正式版工坊為準。本頁不會把封測資料當成正式版。</p><a target="_blank" rel="noopener noreferrer" href="${escapeHtml(d.source)}">資料來源：GameWith，2026-10-30 ↗</a></div><div class="wr-controls"><label>冒險等級 <input id="wr-rank" type="number" inputmode="numeric" min="1" max="70" value="${weaponRoadState.rank}" /></label><label>搜尋武器名稱 <input id="wr-search" class="searchinput" placeholder="搜尋太刀、飛龍刀、赤翎…" value="${escapeHtml(weaponRoadState.search)}" /></label></div><section class="wr-panel"><div class="wr-title">裝備強化解鎖進度</div><div id="wr-gates"></div></section><section class="wr-panel"><div class="wr-title">武器種類與推薦路線</div><div id="wr-tabs" class="wr-tabs"></div><div id="wr-list" class="wr-list"></div></section><div class="wr-bottom">建議流程：解鎖工坊 → 第一次狩獵後檢查新裝備 → 優先強化主力武器 → 卡生存才補強防具 → 需要材料時使用<a href="#crafting">裝備製作</a>、<a href="#armor">防具技能</a>及<a href="#materials">素材反查</a>。</div></main>`);
 const rank=document.querySelector('#wr-rank'),search=document.querySelector('#wr-search');
 rank.addEventListener('change',()=>{const v=Number(rank.value);weaponRoadState.rank=Number.isFinite(v)?Math.min(70,Math.max(1,Math.trunc(v))):1;rank.value=weaponRoadState.rank;renderWeaponRoad()});
 search.addEventListener('input',()=>{weaponRoadState.search=search.value;renderWeaponRoad()});
 renderWeaponRoad();
}
function renderWeaponRoad(){
 const d=weaponRoadmapData,r=weaponRoadState.rank;
 const unlocked=d.gates.filter(x=>x.rank<=r);const current=unlocked.length?unlocked.at(-1):null;
 const next=d.gates.find(x=>x.rank>r);
 document.querySelector('#wr-gates').innerHTML=`<div class="wr-stat"><div><small>目前已達的強化稀有度門檻</small><strong>${current?'稀有度 '+current.rarity:'尚未達 Lv.16 門檻'}</strong></div><div><small>下一個門檻</small><strong>${next?'冒險 Lv.'+next.rank+' → 稀有度 '+next.rarity:'已達表列最高門檻'}</strong></div></div><div class="wr-gatelist">${d.gates.map(g=>`<span class="${g.rank<=r?'reached':''}" title="冒險 Lv.${g.rank} 解鎖稀有度 ${g.rarity}">Lv.${g.rank} · R${g.rarity}</span>`).join('')}</div><p class="wr-explain">此表是等級解鎖門檻，並不代表你已擁有相應的武器或素材。請以遊戲內實際強化頁確認。</p>`;
 const types=['全部',...d.weapons.map(x=>x.type)];document.querySelector('#wr-tabs').innerHTML=types.map(t=>`<button type="button" data-wrtype="${t}" class="${weaponRoadState.type===t?'active':''}">${t}</button>`).join('');document.querySelectorAll('[data-wrtype]').forEach(b=>b.addEventListener('click',()=>{weaponRoadState.type=b.dataset.wrtype;renderWeaponRoad()}));
 const q=weaponRoadState.search.trim().toLowerCase(),items=d.weapons.filter(w=>(weaponRoadState.type==='全部'||w.type===weaponRoadState.type)&&(!q||[w.type,w.early,w.goal,w.note].join(' ').toLowerCase().includes(q)));
 document.querySelector('#wr-list').innerHTML=items.length?items.map(w=>`<article class="wr-card"><div class="wr-category">${escapeHtml(w.type)}</div><div class="wr-row"><div><small>前期推薦</small><h3>${escapeHtml(w.early)}</h3></div><div class="wr-arrow">→</div><div><small>進階參考目標</small><h3>${escapeHtml(w.goal)}</h3></div></div><p>${escapeHtml(w.note)}。實際選擇仍需比較魔物屬性與當前可取得素材。</p><button class="wr-link" type="button" data-route="crafting">查看已收錄配方 →</button></article>`).join(''):'<div class="empty">查無符合條件的武器，請修改篩選或搜尋。</div>';
 document.querySelectorAll('.wr-link').forEach(b=>b.onclick=()=>go('crafting'));
}
