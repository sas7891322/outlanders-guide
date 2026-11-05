/* v2.6: cross-database finder. All indexed text is escaped before DOM injection. */
'use strict';
function searchIndex(){
 const groups=[];
 const add=(name,route,items,summary)=>groups.push({name,route,items:items.map(item=>({title:String(item.title||''),detail:String(item.detail||''),keywords:String(item.keywords||'')}))});
 add('冒險者','#catalog',hunterCatalog.characters.map(x=>({title:x.name,detail:`${x.rarity} · ${x.element} · ${x.weapon}`,keywords:[x.name,x.class,x.focus,x.pairings].join(' ')})));
 add('隨從','#catalog',hunterCatalog.buddies.map(x=>({title:x.name,detail:`${x.rarity} · ${x.class}`,keywords:[x.name,x.focus,x.advice].join(' ')})));
 add('隊伍','#catalog',hunterCatalog.teams.map(x=>({title:x.name,detail:`主控：${x.main}`,keywords:[x.name,x.main,...x.members,x.alternatives].join(' ')})));
 add('魔物','#field',fieldData.monsters.map(x=>({title:`${x.name}・${x.variant}`,detail:`有效屬性：${x.element}`,keywords:[x.name,x.variant,x.element,x.parts].join(' ')})));
 add('素材','#materials',materialLookupData.materials.map(x=>({title:x.name,detail:`來源：${x.monster}`,keywords:[x.name,x.monster,...x.methods,x.part].join(' ')})));
 add('防具','#armor-pieces',armorPiecesData.items.map(x=>({title:x.name,detail:`${x.part} · ${x.series}`,keywords:[x.name,x.part,x.series,x.setBonus,...x.skills.map(y=>y.name)].join(' ')})));
 add('技能','#armor',armorGuideData.skills.map(x=>({title:x.name,detail:`${x.group} · 最高 Lv.${x.maxLv??'待查'}`,keywords:[x.name,x.group,x.effect,x.use].join(' ')})));
 add('製作配方','#crafting',craftingData.recipes.map(x=>({title:x.name,detail:`${x.type} · ${x.stage}`,keywords:[x.name,x.type,x.stage,...x.materials.map(m=>m.name)].join(' ')})));
 add('攻略文章','#articles',articles.map(x=>({title:x.title,detail:x.summary,keywords:[x.title,x.summary,...x.sections.flat()].join(' ')})));
 return groups;
}
function searchHubResults(query){const q=query.trim().toLocaleLowerCase('zh-Hant');if(!q)return [];return searchIndex().map(group=>({...group,matches:group.items.filter(x=>[x.title,x.detail,x.keywords].join(' ').toLocaleLowerCase('zh-Hant').includes(q)).slice(0,12)})).filter(g=>g.matches.length)}
function searchHubPage(){state.page='search-hub';layout(`<main class="main search-hub"><div class="subhead"><button class="back" data-route="home">← 返回首頁</button><span class="overline">SEARCH THE FIELD GUIDE / V2.6</span></div><div class="listinghead"><div><h1 class="pagetitle">一站搜尋整本狩獵手冊</h1><p>一次查詢角色、隨從、隊伍、魔物、素材、武器配方、防具與攻略文章。</p></div></div><label class="hub-label" for="hub-input">搜尋名稱、技能或素材</label><input class="searchinput hub-input" id="hub-input" type="search" autocomplete="off" maxlength="80" placeholder="例如：彌多律、毒妖鳥、弱點特效…" value="${escapeHtml(searchHubState.query)}"/><div class="hub-quick"><span>快速查詢</span>${['彌多律','毒妖鳥','太刀','弱點特效'].map(s=>`<button type="button" data-hub-example="${escapeHtml(s)}">${escapeHtml(s)}</button>`).join('')}</div><div id="hub-results" aria-live="polite"></div><p class="hub-disclaimer">搜尋範圍僅限本站已收錄的資料；結果不代表全遊戲資料已完整收錄。各頁仍須查看來源及待核實標示。</p></main>`);
 const input=document.querySelector('#hub-input');input.addEventListener('input',()=>{searchHubState.query=input.value;renderSearchHub()});document.querySelectorAll('[data-hub-example]').forEach(b=>b.onclick=()=>{input.value=b.dataset.hubExample;searchHubState.query=input.value;renderSearchHub();input.focus()});renderSearchHub();input.focus({preventScroll:true});}
const searchHubState={query:''};
function renderSearchHub(){const el=document.querySelector('#hub-results');if(!el)return;const groups=searchHubResults(searchHubState.query);if(!searchHubState.query.trim()){el.innerHTML='<p class="hub-empty">輸入關鍵字即可跨類別搜尋，目前不需要逐一打開每個圖鑑。</p>';return}if(!groups.length){el.innerHTML='<p class="hub-empty">查無符合資料。請縮短關鍵字或確認遊戲內正式譯名。</p>';return}
 el.innerHTML=groups.map(group=>`<section class="hub-group"><div class="hub-group-head"><h2>${escapeHtml(group.name)} <small>${group.matches.length}${group.matches.length===12?'+':''}</small></h2><a href="${group.route}">前往分類 ↗</a></div><div class="hub-list">${group.matches.map(item=>`<a href="${group.route}" class="hub-result"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.detail)}</span><b aria-hidden="true">↗</b></a>`).join('')}</div></section>`).join('');}
if(typeof module!=='undefined'&&module.exports)module.exports={searchHubResults};
