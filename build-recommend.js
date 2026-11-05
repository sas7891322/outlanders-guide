/* v2.5 sampled build recommender. Deterministic, heuristic and not DPS. */
function recommendArmorBuilds(items,parts,rules,targets,limit=5){
 const selected=[...new Set((targets||[]).filter(Boolean))].slice(0,4);
 if(!selected.length)return [];
 const options=parts.map(part=>items.filter(x=>x.part===part));
 if(options.some(o=>!o.length))return [];
 let candidates=[];
 const enumerate=(depth,chosen)=>{
  if(depth===options.length){
   const slots=Object.fromEntries(chosen.map((x,i)=>[parts[i],x.id]));
   const evaluation=calculateArmorBuild(items,slots,rules);
   const skillIndex=Object.fromEntries(evaluation.skills.map(x=>[x.name,x]));
   let points=0;
   selected.forEach((skill,i)=>{
    const x=skillIndex[skill];if(x){const level=x.effective===null?Math.min(3,x.total):x.effective;points+=level*(selected.length-i)*10;}
   });
   // prefer known activated set bonuses, but never invent missing rules
   points+=evaluation.active.length*3;
   const unknown=evaluation.pending.filter(p=>!rules.setRules[p.name]).length;
   points-=unknown; // uncertain set trigger is a caveat, not a claimed buff
   const useful=selected.some(skill=>skillIndex[skill]);
   if(useful)candidates.push({slots,score:points,evaluation,items:chosen.map(x=>x.name),matched:selected.filter(s=>skillIndex[s]),uncertainSets:unknown});
   return;
  }
  options[depth].forEach(item=>enumerate(depth+1,[...chosen,item]));
 };
 enumerate(0,[]);
 candidates.sort((a,b)=>b.score-a.score||a.items.join('|').localeCompare(b.items.join('|'),'zh-Hant'));
 // diversify results, not simply trivial permutations of same strongest item
 const shown=[]; const signatures=new Set();
 for(const c of candidates){const sig=c.matched.map(s=>`${s}:${c.evaluation.skills.find(x=>x.name===s)?.effective??c.evaluation.skills.find(x=>x.name===s)?.total}`).join('|')+'|'+c.evaluation.active.map(x=>x.name).join('|');
 if(signatures.has(sig))continue;signatures.add(sig);shown.push(c);if(shown.length>=limit)break;}
 return shown;
}
if(typeof module!=='undefined'&&module.exports)module.exports={recommendArmorBuilds};
