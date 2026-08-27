// gen-pulse.mjs — the live pulse, GENERATED from the operator's real records (one-kernel-rule).
// Refuses to emit if the queue is unreadable — a heartbeat page showing an invented pulse would be
// the exact theatre this company exists to kill.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { pulse } from './heartbeat.mjs';

const DNA = 'C:/Users/sjgan/Downloads/si-didy-loop/local-dna';
if (!existsSync(DNA + '/operator-queue.json')) { console.error('REFUSED: no operator queue — no pulse without a real body'); process.exit(1); }
const queue = JSON.parse(readFileSync(DNA + '/operator-queue.json', 'utf8'));
const execs = existsSync(DNA + '/executions.json') ? JSON.parse(readFileSync(DNA + '/executions.json', 'utf8')).executions || [] : [];
const r = pulse(Array.isArray(queue) ? queue : queue.items || [], execs, null, Date.now());
if (!r.ok) { console.error('REFUSED: ' + r.why); process.exit(1); }
writeFileSync('pulse.json', JSON.stringify(r.pulse, null, 1));

const CONSTITUTION = [
  ['the deciding law', 'fallbrain', 'brain.mjs', 'node --test brain.test.mjs'],
  ['the derivation law', 'fallbrain', 'state.mjs', 'node --test state.test.mjs'],
  ['the drafting law', 'fallbrain', 'draft.mjs', 'node --test draft.test.mjs'],
  ['the door-queue law', 'fallbrain', 'inbox.mjs', 'node --test inbox.test.mjs'],
  ['the write-back law', 'fallbrain', 'writeback.mjs', 'node --test writeback.test.mjs'],
  ['the seam law', 'si-didy-loop', 'scripts/seam.mjs', 'node --test scripts/seam.test.mjs'],
  ['the twelve-powers law', 'si-didy-loop', 'scripts/twelve.mjs', 'node --test scripts/twelve.test.mjs'],
  ['the pulse law (this page)', 'glass-company', 'heartbeat.mjs', 'node --test heartbeat.test.mjs'],
];
const p = r.pulse;
const HCOLOR = { conducting: '#4fce7f', starving: '#e0a040', flooding: '#e5675a', quiet: '#7d8aa8' };
const angle = Math.min(1, p.seam.risen) * 180;
const rad = (a) => [(110 + 92 * Math.cos(Math.PI * (1 - a / 180))).toFixed(1), (108 - 92 * Math.sin(Math.PI * (1 - a / 180))).toFixed(1)];
const [nx, ny] = rad(angle);
const bandA = rad(0.618 * 180), bandB = rad(0.687 * 180);

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>THE GLASS COMPANY · a business you can audit while it runs</title>
<style>
:root{--bg:#080b12;--card:#101624;--line:#1f2940;--ink:#e2e9f7;--soft:#8391ad;--gold:#c9a24a;--h:${HCOLOR[p.health]}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.6 -apple-system,"Segoe UI",sans-serif;padding:0 16px 50px}
.wrap{max-width:940px;margin:0 auto}
h1{font-size:1.9rem;margin:34px 0 2px}h1 span{color:var(--gold)}
.sub{color:var(--soft);margin:0 0 18px}
.wire{border:1px solid var(--line);border-left:3px solid var(--gold);border-radius:8px;padding:10px 14px;color:var(--soft);font-size:.88rem;margin-bottom:18px}
.hero{display:grid;grid-template-columns:240px 1fr;gap:18px;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:18px;align-items:center}
@media(max-width:700px){.hero{grid-template-columns:1fr}}
.health{font-size:2rem;font-weight:800;color:var(--h);text-transform:uppercase;letter-spacing:.04em}
.sentence{color:var(--ink);font-size:1.02rem;margin-top:6px}
.nums{color:var(--soft);font-size:.85rem;margin-top:10px}
table{width:100%;border-collapse:collapse;margin-top:8px;font-size:.88rem}
th,td{text-align:left;padding:6px 8px;border-bottom:1px solid var(--line)}th{color:var(--soft);font-weight:600}
h2{font-size:1.1rem;margin:28px 0 6px;color:var(--gold)}
code{background:#0a0f1a;border:1px solid var(--line);padding:1px 6px;border-radius:5px;font-size:.82em}
.law td:first-child{color:var(--ink);font-weight:600}
footer{color:var(--soft);font-size:.78rem;border-top:1px solid var(--line);margin-top:30px;padding-top:12px}
a{color:var(--gold)}
</style></head><body><div class="wrap">
<h1>THE GLASS COMPANY <span>◊</span></h1>
<p class="sub"><b>A business you can audit while it runs.</b> The governance below is not a policy document — it is code, mutation-tested, and this pulse is derived from the operator's real records every night.</p>
<div class="wire"><b>The honest wire:</b> door <i>contents</i> never reach this page by construction (the pulse law refuses to carry them — that refusal is itself mutation-tested). The capability×budget wall is enforced in-process by the scope registry; its live export joins the pulse at the next re-sit and until then it is shown as <i>not exported</i>, never invented. Generated ${new Date(p.at).toISOString()} — never hand-typed.</div>
<div class="hero">
  <svg viewBox="0 0 220 120" width="220"><path d="M18 108 A92 92 0 0 1 202 108" fill="none" stroke="#1f2940" stroke-width="10"/>
  <path d="M${bandA[0]} ${bandA[1]} A92 92 0 0 1 ${bandB[0]} ${bandB[1]}" fill="none" stroke="#c9a24a" stroke-width="10" opacity="0.85"/>
  <line x1="110" y1="108" x2="${nx}" y2="${ny}" stroke="var(--h)" stroke-width="4" stroke-linecap="round"/>
  <text x="110" y="86" text-anchor="middle" fill="var(--h)" font-size="20" font-weight="700">${p.seam.risen}</text>
  <text x="110" y="102" text-anchor="middle" fill="#8391ad" font-size="9">RISEN · κ-band 0.618–0.687</text></svg>
  <div><div class="health">${p.health}</div><div class="sentence">${p.sentence}</div>
  <div class="nums">${p.seam.prepared} doors prepared · ${p.seam.approved} approved · ${p.seam.rejected} refused with reasons · ${p.seam.executed} executed · decided ${p.seam.decided}</div></div>
</div>
<h2>Doors awaiting the human key (${p.doorsWaiting})</h2>
<table><tr><th>seq</th><th>kind</th><th>stream</th><th>prepared at</th></tr>
${p.doors.map((d) => `<tr><td>${d.seq}</td><td>${d.kind}</td><td>${d.stream || '—'}</td><td>${d.at ? d.at.slice(0, 10) : '—'}</td></tr>`).join('')}
</table>
<h2>The constitution — re-prove it yourself</h2>
<p class="sub" style="margin-top:2px">Every law below is public code with a mutation gate. Clone it, run it, try to break it: mutants are injected into the law and the tests must kill them.</p>
<table class="law"><tr><th>law</th><th>repo</th><th>file</th><th>re-prove</th></tr>
${CONSTITUTION.map(([law, repo, file, cmd]) => `<tr><td>${law}</td><td><a href="https://github.com/sjgant80-hub/${repo}">${repo}</a></td><td><code>${file}</code></td><td><code>${cmd}</code></td></tr>`).join('')}
</table>
<footer>The pulse law: <a href="https://github.com/sjgant80-hub/glass-company">heartbeat.mjs</a>, witness-gated, privacy by construction. The seam law rides vendored from si-didy-loop (gated upstream). Signed verdicts for the constitution live on <a href="https://sjgant80-hub.github.io/proven-web/">THE PROVEN WEB</a>. Konomi Architecture — created by Thomas Frumkin · <a href="https://konomi-systems.com">konomi-systems.com</a> · built by AI-Native Solutions.</footer>
</div></body></html>`;
writeFileSync('index.html', html);
console.log('pulse generated: ' + p.health + ' · risen ' + p.seam.risen + ' · ' + p.doorsWaiting + ' doors waiting');
