/* v2.4 pure build evaluator: call without DOM for regression tests. */
function calculateArmorBuild(items, slots, rules){
  const parts=['頭部','胸部','腕部','腰部','腿部'], used=parts.map(part=>items.find(x=>x.id===slots[part]&&x.part===part)).filter(Boolean);
  const raw={},series={};
  used.forEach(item=>{const set=item.setBonus||'';if(set)series[set]=(series[set]||0)+1;(item.skills||[]).forEach(sk=>{if(!sk.name)return;raw[sk.name]=(raw[sk.name]||0)+Math.max(0,Number(sk.level)||0)})});
  const active=[],pending=[];
  Object.entries(series).forEach(([name,count])=>{
    const rule=rules.setRules[name];
    if(!rule){pending.push({name,count,reason:'目前尚未確認啟動件數與效果'});return}
    if(count<rule.pieces){pending.push({name,count,need:rule.pieces-count,reason:'尚未達啟動件數'});return}
    active.push({name,count,need:rule.pieces,skill:rule.skill,level:rule.level,source:rule.source});
    if(rule.skill)raw[rule.skill]=(raw[rule.skill]||0)+(rule.level||0);
  });
  const skills=Object.entries(raw).map(([name,total])=>{
    const cap=rules.skillCaps[name]?.maxLv;
    return {name,total,cap:Number.isFinite(cap)?cap:null,effective:Number.isFinite(cap)?Math.min(total,cap):null,overflow:Number.isFinite(cap)?Math.max(0,total-cap):null,capStatus:Number.isFinite(cap)?'第三方資料':'尚未核實'}
  }).sort((a,b)=>b.total-a.total||a.name.localeCompare(b.name));
  return {equipped:used.length,skills,active,pending,series};
}
if(typeof module!=='undefined'&&module.exports)module.exports={calculateArmorBuild};
