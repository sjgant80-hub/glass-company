// glass-company · heartbeat.mjs — THE PULSE LAW.
//
// A company claims "human oversight of autonomous systems"; this law makes the claim a NUMBER
// with a heartbeat. From the operator's real records it derives: the seam (does approval conduct
// to execution — the κ-band), the doors (what awaits the human key, by kind, never by content),
// and the grant (capability × budget, the wall's remaining charge). The verdict sentences are
// fixed by law, not worded by a model — an auditor reads the same sentence for the same state.
//
// PRIVACY BY CONSTRUCTION: door CONTENTS (prep bodies) never enter the pulse — only kind, stream,
// status, timestamp. The pulse is publishable because it cannot leak what the doors hold.

import { seamFlux } from './seam.mjs';

const obj = (v) => (v && typeof v === 'object' && !Array.isArray(v)) ? v : null;

export function pulse(queueItems, executions, grant, nowMs) {
  if (!Number.isFinite(nowMs)) return { ok: false, why: 'nowMs must be finite — a pulse has a time' };
  const seam = seamFlux(queueItems, executions);
  if (!seam.ok) return { ok: false, why: 'seam refused: ' + seam.why };
  const items = (Array.isArray(queueItems) ? queueItems : []).filter(obj);
  // doors: aggregates + kind/stream/status ONLY — content never crosses into the pulse
  const waiting = items.filter((i) => i.status === 'queued').map((i) => ({
    seq: i.seq,
    kind: obj(i.action) ? String(i.action.kind || 'unknown') : 'unknown',
    stream: obj(i.action) ? String(i.action.stream || '') : '',
    at: typeof i.at === 'string' ? i.at : null,
  }));
  const g = obj(grant);
  const wall = g && Number.isInteger(g.budget) && Array.isArray(g.caps)
    ? { budget: g.budget, spent: Number.isInteger(g.spent) ? g.spent : 0, caps: g.caps.length }
    : null;
  const health =
    seam.approved === 0 && seam.queued === 0 ? 'quiet' :
    seam.risen >= 0.618 && seam.risen <= 0.687 ? 'conducting' :
    seam.risen < 0.618 ? 'starving' : 'flooding';
  const sentence = {
    quiet: 'no doors prepared and none approved — the machine is idle, which is a state, not a fault',
    conducting: 'the seam is in the κ-band: approvals become executions at a deliberate rate — oversight is conducting',
    starving: 'approvals are not becoming executions — the human key turns but the hands are not moving; the lit surface is starving',
    flooding: 'everything approved rises at once — deliberation is thinning; the wall should slow the hand',
  }[health];
  return {
    ok: true,
    pulse: {
      v: 1, at: nowMs, health, sentence,
      seam: { prepared: seam.prepared, approved: seam.approved, rejected: seam.rejected, queued: seam.queued, executed: seam.executed, decided: seam.decided, risen: seam.risen },
      doorsWaiting: waiting.length,
      doors: waiting,
      wall,
    },
  };
}
