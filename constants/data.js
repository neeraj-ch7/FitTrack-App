// ─────────────────────────────────────────────
// FITTRACK — Static Data & Game Constants
// ─────────────────────────────────────────────

export const XP_PER_LEVEL = 5000;
export const MAP_COLS = 17;
export const MAP_ROWS = 26;
export const CELL_SIZE = 22;

export const AVATAR_CONFIGS = {
  blaze:  { name:'Blaze Runner', emoji:'🦁', color:'#F4621F', grad:'#FF8A50', effect:'🔥', desc:'Fire trail effect',    price:0,    owned:true  },
  cyber:  { name:'Cyber Bot',    emoji:'🤖', color:'#0EA5E9', grad:'#38BDF8', effect:'⚡', desc:'Electric spark effect',price:0,    owned:false },
  fox:    { name:'Fire Fox',     emoji:'🦊', color:'#EF4444', grad:'#F87171', effect:'🔥', desc:'Double flame trail',   price:800,  owned:false },
  alien:  { name:'Space Walker', emoji:'👾', color:'#7C3AED', grad:'#A78BFA', effect:'✨', desc:'Nebula orbit effect',  price:1200, owned:false },
  frost:  { name:'Frost Nova',   emoji:'❄️', color:'#06B6D4', grad:'#22D3EE', effect:'❄️', desc:'Crystal freeze aura', price:2000, owned:false },
  legend: { name:'Legendary',    emoji:'👑', color:'#F59E0B', grad:'#FCD34D', effect:'👑', desc:'Rainbow crown aura',  price:5000, owned:false },
};

export const BADGES = [
  { id:'first_steps', emoji:'👟', name:'First Steps',  desc:'Walk 1,000 steps'          },
  { id:'zone_hunter', emoji:'🗺️', name:'Zone Hunter',  desc:'Capture 5 zones'           },
  { id:'streak_7',    emoji:'🔥', name:'On Fire',      desc:'7-day streak'               },
  { id:'coins_500',   emoji:'💰', name:'Coin Hoarder', desc:'Earn 500 coins'             },
  { id:'level_5',     emoji:'⭐', name:'Rising Star',  desc:'Reach level 5'              },
  { id:'battle_win',  emoji:'⚔️', name:'Conqueror',    desc:'Win 3 territory battles'    },
  { id:'marathon',    emoji:'🏃', name:'Marathoner',   desc:'Walk 10km total'            },
  { id:'legend_buy',  emoji:'👑', name:'Legendary',    desc:'Own a legendary avatar'     },
];

export const DEFAULT_CHALLENGES = [
  { id:'steps_8k', label:'Reach 8,000 Steps',    current:6240, target:8000, xp:150, coins:50,  icon:'👟', color:'#F4621F' },
  { id:'zones_3',  label:'Claim 3 Zones Today',  current:1,    target:3,    xp:250, coins:75,  icon:'🗺️', color:'#7C3AED' },
  { id:'streak_7', label:'Maintain 7-day streak', current:14,  target:7,    xp:500, coins:100, icon:'🔥', color:'#F59E0B' },
];

export const LEADERBOARD = [
  { rank:1, name:'Marcus K.', avatar:'cyber', zones:42, steps:18400, pct:28            },
  { rank:2, name:'You',       avatar:'blaze', zones:18, steps:12000, pct:12, isUser:true },
  { rank:3, name:'Priya S.',  avatar:'alien', zones:14, steps:9800,  pct:9             },
  { rank:4, name:'Jake R.',   avatar:'fox',   zones:9,  steps:7200,  pct:6             },
];

export const DEFAULT_USER = {
  name:'Alex Chen', username:'alexfit', level:3, xp:2200, coins:340,
  totalSteps:124000, distance:87.4, streak:14, zones:18,
  ownedAvatars:['blaze','cyber'], selectedAvatar:'blaze',
  badges:['first_steps','zone_hunter','streak_7','coins_500'],
  settings:{ notifications:true, gps:true, privacy:false },
};

export const DEMO_CREDENTIALS = {
  email:'demo@fittrack.app',
  password:'demo123',
};
