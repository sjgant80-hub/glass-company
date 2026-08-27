// heartbeat.test.mjs — the pulse law, falsifiable. Same state → same sentence, forever.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pulse } from './heartbeat.mjs';

const NOW = 1_800_000_000_000;
const doors = (specs) => specs.map(([seq, status, kind, stream], i) => ({ seq, status, action: { kind, stream }, at: '2026-08-27T00:00:00Z', prep: { secret: 'NEVER-PUBLISH-' + i } }));
const X = (seqs) => seqs.map((seq) => ({ seq }));

test('PULSE — conducting in the κ-band, with exact seam numbers and the fixed sentence', () => {
  const q = doors([[0, 'approved', 'publish-external', 'a'], [1, 'approved', 'commit', 'b'], [2, 'approved', 'publish-external', 'c'], [3, 'queued', 'payment-rail', 'money'], [4, 'rejected', 'x', '']]);
  const r = pulse(q, X([0, 1]), { caps: ['a', 'b'], budget: 7, spent: 3 }, NOW);
  assert.equal(r.ok, true);
  assert.equal(r.pulse.health, 'conducting', '2/3 = 0.667 sits in the band');
  assert.match(r.pulse.sentence, /oversight is conducting/);
  assert.equal(r.pulse.seam.risen, 0.667);
  assert.equal(r.pulse.doorsWaiting, 1);
  assert.deepEqual(r.pulse.doors[0], { seq: 3, kind: 'payment-rail', stream: 'money', at: '2026-08-27T00:00:00Z' });
  assert.deepEqual(r.pulse.wall, { budget: 7, spent: 3, caps: 2 });
});

test('PULSE — starving below the floor, flooding above the ceiling, quiet when truly idle', () => {
  const q3 = doors([[0, 'approved', 'a', ''], [1, 'approved', 'b', ''], [2, 'approved', 'c', '']]);
  assert.equal(pulse(q3, X([0]), null, NOW).pulse.health, 'starving');
  assert.match(pulse(q3, X([0]), null, NOW).pulse.sentence, /hands are not moving/);
  assert.equal(pulse(q3, X([0, 1, 2]), null, NOW).pulse.health, 'flooding');
  assert.match(pulse(q3, X([0, 1, 2]), null, NOW).pulse.sentence, /deliberation is thinning/);
  const idle = pulse(doors([[0, 'rejected', 'a', '']]), [], null, NOW);
  assert.equal(idle.pulse.health, 'quiet');
  assert.match(idle.pulse.sentence, /a state, not a fault/);
});

test('PRIVACY BY CONSTRUCTION — no prep content ever crosses into the pulse', () => {
  const q = doors([[0, 'queued', 'commit', 'client']]);
  const r = pulse(q, [], null, NOW);
  assert.ok(!JSON.stringify(r).includes('NEVER-PUBLISH'), 'the pulse is publishable because it CANNOT carry door contents');
  assert.deepEqual(Object.keys(r.pulse.doors[0]).sort(), ['at', 'kind', 'seq', 'stream']);
});

test('PULSE REFUSES — junk in, named refusal out; a malformed wall reads null not invented', () => {
  assert.match(pulse(null, [], null, NOW).why, /seam refused/);
  assert.match(pulse([], [], null, NaN).why, /a pulse has a time/);
  const q = doors([[0, 'queued', 'a', '']]);
  assert.equal(pulse(q, [], { budget: '9', caps: [] }, NOW).pulse.wall, null, 'a string budget is no wall');
  assert.equal(pulse(q, [], { budget: 9, caps: 'a' }, NOW).pulse.wall, null);
  assert.equal(pulse(q, [], { budget: 9, caps: ['a'] }, NOW).pulse.wall.spent, 0, 'absent spent reads 0');
  const junk = pulse([null, 'x', ...q], [], null, NOW);
  assert.equal(junk.ok, true, 'junk rows filtered, the pulse still beats');
});

test('THE BAND IS EXACT — 0.618 and 0.687 are conducting; 0.688 floods', () => {
  const qN = (n) => Array.from({ length: n }, (_, i) => ({ seq: i, status: 'approved', action: { kind: 'k' }, at: null }));
  const xN = (n) => Array.from({ length: n }, (_, i) => ({ seq: i }));
  assert.equal(pulse(qN(1000), xN(618), null, NOW).pulse.health, 'conducting', 'the floor is inclusive');
  assert.equal(pulse(qN(1000), xN(687), null, NOW).pulse.health, 'conducting', 'the ceiling is inclusive');
  assert.equal(pulse(qN(1000), xN(688), null, NOW).pulse.health, 'flooding');
  assert.equal(pulse(qN(1000), xN(617), null, NOW).pulse.health, 'starving');
});

test('SHAPES — an array wearing wall fields is no wall; an array wearing action fields is unknown', () => {
  const q = [{ seq: 0, status: 'queued', action: { kind: 'commit' }, at: null }];
  const arrGrant = []; arrGrant.budget = 5; arrGrant.caps = ['a'];
  assert.equal(pulse(q, [], arrGrant, NOW).pulse.wall, null, 'arrays are not grants');
  const arrAction = []; arrAction.kind = 'sneak'; arrAction.stream = 's';
  const r = pulse([{ seq: 1, status: 'queued', action: arrAction, at: null }], [], null, NOW);
  assert.equal(r.pulse.doors[0].kind, 'unknown', 'an array action reads unknown, its fields never trusted');
});
