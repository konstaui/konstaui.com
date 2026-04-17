import fs from 'fs';
import path from 'path';
import { getDirname } from './get-dirname.js';

const __dirname = getDirname(import.meta.url);

const N4_API = 'https://sponsors.nolimits4web.com/api/sponsors/konstaui';
const n4Path = path.resolve(__dirname, '../src/shared/n4-sponsors.json');
const baseListPath = path.resolve(__dirname, '../src/shared/sponsors-list.json');
const publicListPath = path.resolve(__dirname, '../public/sponsors-list.json');

const PLAN_MAP = {
  'Gold Sponsor': 'Silver Sponsor',
};

const mapPlan = (sponsor) => ({
  ...sponsor,
  plan: PLAN_MAP[sponsor.plan] ?? sponsor.plan,
});

async function fetchN4Sponsors() {
  try {
    const res = await fetch(N4_API);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('Response is not an array');
    return data.map(mapPlan);
  } catch (err) {
    console.warn(`[build-sponsors] Could not fetch n4 sponsors: ${err.message}`);
    return null;
  }
}

const fetched = await fetchN4Sponsors();
if (fetched !== null) {
  fs.writeFileSync(n4Path, JSON.stringify(fetched, null, 2));
} else if (!fs.existsSync(n4Path)) {
  fs.writeFileSync(n4Path, '[]');
}

const n4Sponsors = JSON.parse(fs.readFileSync(n4Path, 'utf-8'));
const baseSponsors = JSON.parse(fs.readFileSync(baseListPath, 'utf-8'));

const merged = [...n4Sponsors, ...baseSponsors];

fs.writeFileSync(publicListPath, JSON.stringify(merged, null, 2));
