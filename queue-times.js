/**
 * queue-times.js
 * Fetches live wait times from queue-times.com API
 * Park ID: 275 (Tokyo DisneySea)
 * API: https://queue-times.com/parks/275/queue_times.json
 */

const QTIMES_API   = 'https://queue-times.com/parks/275/queue_times.json';
const REFRESH_MS   = 5 * 60 * 1000; // 5 minutes
const PROXY        = 'https://corsproxy.io/?';

// Ride ID map — queue-times.com IDs
const RIDE_IDS = {
  'frozen':     13559,
  'peter_pan':  13561,
  'rapunzel':   13560,
  'tinker_bell':13562,
  'soaring':     8024,
  'toy_story':   8023,
  'tower':       8047,
  'indiana':     8027,
  'journey':     8028,
  'leagues':     8029,
  'raging':      8046,
  'aquatopia':   8038,
  'sindbad':     8039,
  'nemo':        8051,
};

// 2025 annual average wait times (source: queue-times.com/parks/275/stats/2025)
const AVG_2025 = {
  13559:116, 13561:60,  13560:68,  13562:45,
  8024:131,  8023:95,   8047:87,   8027:75,
  8028:101,  8029:28,   8046:68,   8038:22,
  8039:7,    8051:30,
};

function getWaitColor(mins, isOpen) {
  if (!isOpen || mins === 0) return 'closed';
  if (mins <= 30)  return 'green';
  if (mins <= 70)  return 'amber';
  return 'red';
}

async function fetchWaitTimes() {
  // Try direct API first
  try {
    const resp = await fetch(QTIMES_API, { cache: 'no-store' });
    if (!resp.ok) throw new Error('direct failed');
    return await resp.json();
  } catch (_) {
    // Fallback to CORS proxy
    try {
      const resp = await fetch(PROXY + encodeURIComponent(QTIMES_API));
      if (!resp.ok) throw new Error('proxy failed');
      const wrapper = await resp.json();
      // corsproxy.io wraps in { contents: "..." }
      if (wrapper.contents) return JSON.parse(wrapper.contents);
      return wrapper;
    } catch (__) {
      return null;
    }
  }
}

function buildRideMap(data) {
  const map = {};
  if (!data) return map;
  const allRides = [];
  if (data.lands) data.lands.forEach(l => l.rides?.forEach(r => allRides.push(r)));
  if (data.rides) data.rides.forEach(r => allRides.push(r));
  allRides.forEach(r => { map[r.id] = r; });
  return map;
}

/**
 * updateLiveSection — fills #live-grid with current wait times
 */
function updateLiveSection(rideMap) {
  const grid = document.getElementById('live-grid');
  if (!grid) return;

  const ORDER = [
    { key:'frozen',     label:'Frozen Journey' },
    { key:'soaring',    label:'Soaring' },
    { key:'peter_pan',  label:'Peter Pan' },
    { key:'journey',    label:'Journey: Earth' },
    { key:'tower',      label:'Tower of Terror' },
    { key:'rapunzel',   label:"Rapunzel Lantern" },
    { key:'toy_story',  label:'Toy Story Mania!' },
    { key:'raging',     label:'Raging Spirits' },
    { key:'tinker_bell',label:'Tinker Bell' },
    { key:'nemo',       label:'Nemo SeaRider' },
    { key:'leagues',    label:'20K Leagues' },
    { key:'aquatopia',  label:'Aquatopia 🏁' },
    { key:'sindbad',    label:'Sindbad Voyage' },
    { key:'indiana',    label:'Indiana Jones' },
  ];

  let html = '';
  ORDER.forEach(({ key, label }) => {
    const id   = RIDE_IDS[key];
    const ride = rideMap[id];
    const wait = ride ? ride.wait_time : null;
    const open = ride ? ride.is_open  : false;
    const cls  = getWaitColor(wait, open);

    let waitTxt = '—';
    if (!open || wait === null)  waitTxt = 'Closed';
    else if (wait === 0)         waitTxt = '< 5m';
    else                         waitTxt = wait + 'm';

    html += `<div class="live-item">
      <div class="live-ride-name">${label}</div>
      <div class="live-ride-wait lr-${cls}">${waitTxt}</div>
    </div>`;
  });
  grid.innerHTML = html;

  const ts = document.getElementById('live-ts');
  if (ts) {
    const now = new Date();
    ts.textContent = `Updated ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
  }
}

/**
 * updateRideCardBadges — updates the individual ride card live badges
 */
function updateRideCardBadges(rideMap) {
  document.querySelectorAll('[data-ride-id]').forEach(el => {
    const id    = parseInt(el.getAttribute('data-ride-id'));
    const ride  = rideMap[id];
    if (!ride) return;
    const wait  = ride.wait_time;
    const open  = ride.is_open;
    const cls   = getWaitColor(wait, open);

    let txt;
    if (!open || wait === null) txt = 'ปิด';
    else if (wait === 0)        txt = '< 5 นาที';
    else                        txt = `${wait} นาที`;

    el.className = `live-wait lw-${cls}`;
    el.innerHTML = `<span class="live-dot"></span> Live: ${txt}`;
  });
}

async function refreshAll() {
  const data = await fetchWaitTimes();
  const rideMap = buildRideMap(data);

  if (Object.keys(rideMap).length > 0) {
    updateLiveSection(rideMap);
    updateRideCardBadges(rideMap);
    document.querySelectorAll('.live-error').forEach(el => el.remove());
  } else {
    const grid = document.getElementById('live-grid');
    if (grid) grid.innerHTML = '<div class="live-error">⚠️ ไม่สามารถโหลดข้อมูล live ได้ — เช็คอีกครั้งใน 5 นาที</div>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  refreshAll();
  setInterval(refreshAll, REFRESH_MS);
});

// Export for use in other scripts
if (typeof module !== 'undefined') module.exports = { RIDE_IDS, AVG_2025, getWaitColor };
