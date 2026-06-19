import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// QUESTION BANK  (difficulty 1–4, each needs 4 wrong_choices)
// ─────────────────────────────────────────────────────────────────────────────
const QUESTION_POOL = [
  // ── DIFFICULTY 1 ─────────────────────────────────────────────────────────
  { q:"Jesus fed 5,000 people with 5 loaves of bread and ___ fish.", a:"Two", wrong:["Five","Seven","Three"], hint:"A small number — less than 5", difficulty:1 },
  { q:"God created the world in ___ days.", a:"Six", wrong:["Five","Seven","Ten"], hint:"One less than seven", difficulty:1 },
  { q:"The first book of the Bible is ___.", a:"Genesis", wrong:["Exodus","Psalms","Matthew"], hint:"It means 'beginning'", difficulty:1 },
  { q:"Noah built an ___ to survive the great flood.", a:"Ark", wrong:["Boat","Raft","Ship"], hint:"3 letters — a large wooden vessel", difficulty:1 },
  { q:"David defeated the giant ___ with a sling and stone.", a:"Goliath", wrong:["Samson","Absalom","Saul"], hint:"A Philistine warrior", difficulty:1 },
  { q:"Moses parted the ___ Sea to lead Israel out of Egypt.", a:"Red", wrong:["Dead","Mediterranean","Galilee"], hint:"Named after a color", difficulty:1 },
  { q:"Jesus turned water into ___ at the wedding in Cana.", a:"Wine", wrong:["Oil","Milk","Honey"], hint:"Served at celebrations", difficulty:1 },
  { q:"The last book of the Bible is ___.", a:"Revelation", wrong:["Jude","Hebrews","Acts"], hint:"Contains visions of the end times", difficulty:1 },
  { q:"Jesus was born in ___.", a:"Bethlehem", wrong:["Jerusalem","Nazareth","Capernaum"], hint:"A small town in Judea, celebrated at Christmas", difficulty:1 },
  { q:"The first man God created was ___.", a:"Adam", wrong:["Noah","Abraham","Moses"], hint:"4 letters — the first human", difficulty:1 },
  { q:"The first woman in the Bible was ___.", a:"Eve", wrong:["Sarah","Ruth","Mary"], hint:"3 letters — named by Adam", difficulty:1 },
  { q:"Jesus walked on ___.", a:"Water", wrong:["Fire","Air","Sand"], hint:"Covers most of the earth", difficulty:1 },
  { q:"Jesus had ___ disciples.", a:"Twelve", wrong:["Seven","Ten","Fifteen"], hint:"A dozen", difficulty:1 },
  { q:"Jonah was inside the fish for ___ days and nights.", a:"Three", wrong:["Seven","Forty","Two"], hint:"Same number of days before Jesus rose", difficulty:1 },
  { q:"Jesus rose from the dead on the ___ day.", a:"Third", wrong:["Second","Fourth","Seventh"], hint:"After two nights in the tomb", difficulty:1 },
  { q:"The mother of Jesus was ___.", a:"Mary", wrong:["Martha","Elizabeth","Miriam"], hint:"4 letters", difficulty:1 },
  { q:"Jesus was baptized in the ___ River.", a:"Jordan", wrong:["Nile","Euphrates","Tigris"], hint:"Famous river in the Middle East", difficulty:1 },
  { q:"God spoke to Moses through a burning ___.", a:"Bush", wrong:["Tree","Pillar","Rock"], hint:"Found in nature, not a tree", difficulty:1 },
  { q:"God told Abraham to sacrifice his son ___.", a:"Isaac", wrong:["Ishmael","Jacob","Joseph"], hint:"5 letters — the son of promise", difficulty:1 },
  { q:"The Promised Land flowed with milk and ___.", a:"Honey", wrong:["Wine","Oil","Water"], hint:"Made by bees", difficulty:1 },
  { q:"Joseph was given a coat of many ___ by his father Jacob.", a:"Colors", wrong:["Patches","Jewels","Stripes"], hint:"A multicolored garment", difficulty:1 },
  { q:"The garden where Adam and Eve lived was called ___.", a:"Eden", wrong:["Gethsemane","Paradise","Canaan"], hint:"4 letters, starts with E", difficulty:1 },
  { q:"Jesus performed his first miracle at a ___ in Cana.", a:"Wedding", wrong:["Funeral","Festival","Synagogue"], hint:"A marriage celebration", difficulty:1 },
  { q:"The ___ Commandments were given to Moses on Mount Sinai.", a:"Ten", wrong:["Five","Seven","Twelve"], hint:"A round number — enough to fill two stone tablets", difficulty:1 },
  { q:"The earthly father of Jesus was ___.", a:"Joseph", wrong:["Zechariah","Simeon","Joachim"], hint:"A carpenter from Nazareth", difficulty:1 },
  { q:"Peter denied knowing Jesus ___ times before the rooster crowed.", a:"Three", wrong:["Two","Four","Once"], hint:"The same number as days Jesus was in the tomb", difficulty:1 },
  { q:"The disciple who betrayed Jesus was ___.", a:"Judas", wrong:["Thomas","Bartholomew","Simon"], hint:"For 30 pieces of silver", difficulty:1 },
  { q:"Jesus calmed a storm on the Sea of ___.", a:"Galilee", wrong:["Tiberias","Jordan","Gennesaret"], hint:"Northern body of water in Israel", difficulty:1 },
  { q:"The Holy Spirit descended on Jesus at his baptism like a ___.", a:"Dove", wrong:["Flame","Cloud","Eagle"], hint:"A bird of peace", difficulty:1 },
  { q:"Jesus rode into Jerusalem on a ___.", a:"Donkey", wrong:["Horse","Camel","Mule"], hint:"A humble animal — symbol of peace", difficulty:1 },

  // ── DIFFICULTY 2 ─────────────────────────────────────────────────────────
  { q:"Jonah was swallowed by a large ___ after fleeing from God.", a:"Fish", wrong:["Whale","Shark","Crocodile"], hint:"The Bible says 'great fish' — not specifically a whale", difficulty:2 },
  { q:"Paul wrote his letters while in ___.", a:"Prison", wrong:["Exile","The desert","A ship"], hint:"A place of confinement", difficulty:2 },
  { q:"___ is known as the Weeping Prophet.", a:"Jeremiah", wrong:["Isaiah","Ezekiel","Hosea"], hint:"His book comes right after Isaiah", difficulty:2 },
  { q:"Elijah was taken up to heaven in a chariot of ___.", a:"Fire", wrong:["Wind","Light","Cloud"], hint:"Very hot — pulled by fiery horses", difficulty:2 },
  { q:"Jesus raised ___ from the dead after he had been in the tomb 4 days.", a:"Lazarus", wrong:["Jairus","Stephen","Nicodemus"], hint:"Brother of Mary and Martha", difficulty:2 },
  { q:"The book of ___ contains 150 songs and poems.", a:"Psalms", wrong:["Proverbs","Song of Solomon","Lamentations"], hint:"Often attributed to David", difficulty:2 },
  { q:"Joseph's brothers sold him to traders heading to ___.", a:"Egypt", wrong:["Babylon","Assyria","Canaan"], hint:"Land of the pharaohs", difficulty:2 },
  { q:"The apostle Paul was formerly known as ___.", a:"Saul", wrong:["Silas","Stephen","Sosthenes"], hint:"Also the name of Israel's first king", difficulty:2 },
  { q:"Ruth was loyal to her mother-in-law ___.", a:"Naomi", wrong:["Orpah","Hannah","Deborah"], hint:"5 letters — they returned to Bethlehem together", difficulty:2 },
  { q:"The disciple called 'the Twin' was ___.", a:"Thomas", wrong:["Philip","Andrew","Nathanael"], hint:"He doubted the resurrection", difficulty:2 },
  { q:"Samson's wife who tricked him was ___.", a:"Delilah", wrong:["Jezebel","Bathsheba","Tamar"], hint:"She cut his hair to rob his strength", difficulty:2 },
  { q:"Abraham was originally called ___ before God renamed him.", a:"Abram", wrong:["Terah","Nahor","Lot"], hint:"5 letters — his original Mesopotamian name", difficulty:2 },
  { q:"The wall of ___ fell after the Israelites marched around it.", a:"Jericho", wrong:["Jerusalem","Ai","Hazor"], hint:"The first city conquered in Canaan", difficulty:2 },
  { q:"Jacob's name was changed to ___ after wrestling with God.", a:"Israel", wrong:["Judah","Levi","Joseph"], hint:"The name of a nation", difficulty:2 },
  { q:"John the Baptist ate locusts and wild ___.", a:"Honey", wrong:["Figs","Olives","Grain"], hint:"Made by bees", difficulty:2 },
  { q:"The book of ___ is the shortest in the Old Testament by verse count.", a:"Obadiah", wrong:["Philemon","Nahum","Haggai"], hint:"Only 21 verses — a minor prophet", difficulty:2 },
  { q:"Paul's letter to the ___ is the longest of his epistles.", a:"Romans", wrong:["Corinthians","Galatians","Ephesians"], hint:"Written to Christians in Rome", difficulty:2 },
  { q:"Mary ___ was the first person to see Jesus after his resurrection.", a:"Magdalene", wrong:["of Bethany","the mother of James","Salome"], hint:"She came to the tomb early in the morning", difficulty:2 },
  { q:"The Old Testament has ___ books.", a:"39", wrong:["27","46","33"], hint:"Less than 40", difficulty:2 },
  { q:"The New Testament has ___ books.", a:"27", wrong:["39","29","24"], hint:"More than 25, less than 30", difficulty:2 },
  { q:"The burning bush appeared to Moses on Mount ___.", a:"Horeb", wrong:["Carmel","Nebo","Zion"], hint:"Also called Mount Sinai", difficulty:2 },
  { q:"Elisha asked for a double portion of Elijah's ___.", a:"Spirit", wrong:["Strength","Faith","Wisdom"], hint:"A divine gift — the Holy Spirit upon him", difficulty:2 },
  { q:"Jacob wrestled with ___ and received a new name.", a:"God", wrong:["An angel","A man","The devil"], hint:"The being he wrestled blessed him — divine encounter", difficulty:2 },
  { q:"The tribe of ___ was the priestly tribe of Israel.", a:"Levi", wrong:["Judah","Benjamin","Reuben"], hint:"Moses and Aaron were from this tribe", difficulty:2 },
  { q:"Paul's missionary journeys are described in the book of ___.", a:"Acts", wrong:["Romans","Galatians","Hebrews"], hint:"Comes right after the Gospel of John", difficulty:2 },
  { q:"The ___ is known as the book of wisdom literature.", a:"Proverbs", wrong:["Ecclesiastes","Job","Psalms"], hint:"Contains sayings of Solomon", difficulty:2 },
  { q:"Moses received the Ten Commandments on tablets of ___.", a:"Stone", wrong:["Wood","Clay","Gold"], hint:"Hard mineral — God carved them", difficulty:2 },
  { q:"The wisest king of Israel was ___.", a:"Solomon", wrong:["David","Hezekiah","Josiah"], hint:"Son of David and Bathsheba — asked God for wisdom", difficulty:2 },
  { q:"Jesus fed the 5,000 near the Sea of ___.", a:"Galilee", wrong:["Jordan","Tiberias","Chinnereth"], hint:"The northern sea in Israel", difficulty:2 },
  { q:"The angel told Mary she would conceive by the ___ Spirit.", a:"Holy", wrong:["Divine","Heavenly","Sacred"], hint:"The third person of the Trinity", difficulty:2 },

  // ── DIFFICULTY 3 ─────────────────────────────────────────────────────────
  { q:"The high priest who questioned Jesus before his crucifixion was ___.", a:"Caiaphas", wrong:["Annas","Ananias","Gamaliel"], hint:"He tore his robes and declared Jesus a blasphemer", difficulty:3 },
  { q:"The Israelites wandered in the wilderness for ___ years.", a:"Forty", wrong:["Twenty","Thirty","Fifty"], hint:"Same number of days Jesus fasted", difficulty:3 },
  { q:"The Roman governor who sentenced Jesus to death was ___.", a:"Pilate", wrong:["Herod","Felix","Festus"], hint:"He washed his hands to disavow responsibility", difficulty:3 },
  { q:"In Revelation, the number of the beast is ___.", a:"666", wrong:["777","144","616"], hint:"Triple sixes", difficulty:3 },
  { q:"The apostle who replaced Judas Iscariot was ___.", a:"Matthias", wrong:["Barnabas","Joseph Barsabbas","Timothy"], hint:"Chosen by casting lots in Acts 1", difficulty:3 },
  { q:"Methuselah is recorded as living ___ years, the longest in the Bible.", a:"969", wrong:["930","777","950"], hint:"Nearly 1,000 years old", difficulty:3 },
  { q:"The prophet Elijah defeated ___ prophets of Baal on Mount Carmel.", a:"450", wrong:["400","850","500"], hint:"Plus 400 prophets of Asherah were also there", difficulty:3 },
  { q:"The book of ___ contains the famous 'valley of dry bones' vision.", a:"Ezekiel", wrong:["Daniel","Isaiah","Zechariah"], hint:"An exilic prophet who saw visions of God's glory", difficulty:3 },
  { q:"The ___ is the only book of the Bible that never mentions God.", a:"Esther", wrong:["Ruth","Song of Solomon","Ecclesiastes"], hint:"A Jewish queen of Persia who saved her people", difficulty:3 },
  { q:"Paul was shipwrecked on the island of ___.", a:"Malta", wrong:["Cyprus","Crete","Rhodes"], hint:"A Mediterranean island nation today", difficulty:3 },
  { q:"The ___ Sea Scrolls confirmed the accuracy of the Old Testament.", a:"Dead", wrong:["Red","Galilee","Mediterranean"], hint:"Found near a very salty sea in Israel", difficulty:3 },
  { q:"Stephen was the first Christian ___.", a:"Martyr", wrong:["Deacon","Missionary","Bishop"], hint:"He was stoned to death for his faith", difficulty:3 },
  { q:"The Pool of ___ is where Jesus healed a blind man.", a:"Siloam", wrong:["Bethesda","Gibeon","Hezekiah"], hint:"He was told to go wash there — John 9", difficulty:3 },
  { q:"King David was from the tribe of ___.", a:"Judah", wrong:["Benjamin","Ephraim","Levi"], hint:"Also the name of his ancestor, son of Jacob", difficulty:3 },
  { q:"The prophet who said 'Here I am, send me' was ___.", a:"Isaiah", wrong:["Jeremiah","Ezekiel","Amos"], hint:"He saw the LORD high and lifted up — chapter 6", difficulty:3 },
  { q:"Naaman was healed of ___ by washing in the Jordan seven times.", a:"Leprosy", wrong:["Blindness","Paralysis","Deafness"], hint:"A skin disease — he was a Syrian army commander", difficulty:3 },
  { q:"The book of ___ records the rebuilding of Jerusalem's walls.", a:"Nehemiah", wrong:["Ezra","Haggai","Zechariah"], hint:"A cupbearer to the Persian king who led the project", difficulty:3 },
  { q:"Jesus said 'I am the ___, the truth, and the life.'", a:"Way", wrong:["Light","Door","Shepherd"], hint:"John 14:6 — three things in one verse", difficulty:3 },
  { q:"Saul of Tarsus was blinded on the road to ___ for three days.", a:"Damascus", wrong:["Jerusalem","Antioch","Caesarea"], hint:"Capital of modern Syria", difficulty:3 },
  { q:"The Mount of ___ is where Jesus was arrested.", a:"Olives", wrong:["Zion","Moriah","Carmel"], hint:"A tree that produces oil", difficulty:3 },
  { q:"The prophet ___ was known for a donkey that spoke.", a:"Balaam", wrong:["Elijah","Amos","Micah"], hint:"He was summoned to curse Israel but blessed them instead", difficulty:3 },
  { q:"The number of books in the Bible is ___.", a:"66", wrong:["72","73","39"], hint:"39 + 27", difficulty:3 },
  { q:"Moses' sister who led the women in song after crossing the sea was ___.", a:"Miriam", wrong:["Deborah","Hannah","Zipporah"], hint:"6 letters — also a prophetess", difficulty:3 },
  { q:"Paul wrote ___ letters included in the New Testament.", a:"Thirteen", wrong:["Seven","Ten","Fourteen"], hint:"More than 12 — from Romans to Philemon", difficulty:3 },
  { q:"Jesus said the greatest commandment was to love ___ with all your heart.", a:"God", wrong:["Your neighbor","Your family","Yourself"], hint:"The first and greatest — the second is like it", difficulty:3 },
  { q:"The city of ___ was associated with Jonah's preaching mission.", a:"Nineveh", wrong:["Babylon","Tyre","Sidon"], hint:"Ancient Assyrian capital — they repented in sackcloth", difficulty:3 },
  { q:"The shortest verse in the Bible is '___ wept.'", a:"Jesus", wrong:["David","Job","Paul"], hint:"John 11:35 — at the tomb of Lazarus", difficulty:3 },
  { q:"King ___ was known for his extraordinary wisdom.", a:"Solomon", wrong:["David","Hezekiah","Asa"], hint:"He asked God for wisdom rather than riches", difficulty:3 },
  { q:"The prophet ___ married a prostitute as a sign of Israel's unfaithfulness.", a:"Hosea", wrong:["Amos","Micah","Joel"], hint:"His marriage illustrated God's love for wayward Israel", difficulty:3 },
  { q:"The Sermon on the Mount begins with the ___.", a:"Beatitudes", wrong:["Lord's Prayer","Golden Rule","Great Commission"], hint:"'Blessed are the poor in spirit…' — Matthew 5", difficulty:3 },

  // ── DIFFICULTY 4 ─────────────────────────────────────────────────────────
  { q:"The first judge of Israel mentioned in the book of Judges is ___.", a:"Othniel", wrong:["Ehud","Gideon","Deborah"], hint:"Caleb's nephew — delivered Israel from Mesopotamia", difficulty:4 },
  { q:"The Valley of ___ is where David fought Goliath.", a:"Elah", wrong:["Jezreel","Hinnom","Kidron"], hint:"4 letters — between Socoh and Azekah", difficulty:4 },
  { q:"King Saul consulted a medium at ___ before his final battle.", a:"Endor", wrong:["Gibeah","Ramah","Mizpah"], hint:"The 'witch of Endor' summoned Samuel's spirit", difficulty:4 },
  { q:"The name Ichabod means 'the glory has ___ from Israel.'", a:"Departed", wrong:["Fallen","Hidden","Faded"], hint:"Said when the Ark of the Covenant was captured", difficulty:4 },
  { q:"The angel who appeared to Mary was ___.", a:"Gabriel", wrong:["Michael","Raphael","Uriel"], hint:"He also appeared to Daniel and to Zechariah", difficulty:4 },
  { q:"Ananias and Sapphira died after lying about ___ in Acts.", a:"Money", wrong:["A miracle","Their heritage","Their baptism"], hint:"They kept back part of the proceeds from a land sale", difficulty:4 },
  { q:"The prophet ___ saw the wheel within a wheel vision.", a:"Ezekiel", wrong:["Daniel","Zechariah","Isaiah"], hint:"Also had the dry bones vision — in Babylon", difficulty:4 },
  { q:"The woman who hid the spies in Jericho was ___.", a:"Rahab", wrong:["Deborah","Tamar","Abigail"], hint:"She hung a scarlet cord from her window", difficulty:4 },
  { q:"The blind beggar healed by Jesus near Jericho was ___.", a:"Bartimaeus", wrong:["Zacchaeus","Lazarus","Malchus"], hint:"Son of Timaeus — cried out 'Son of David, have mercy!'", difficulty:4 },
  { q:"The king who ordered the massacre of infants in Bethlehem was ___.", a:"Herod", wrong:["Archelaus","Antipas","Philip"], hint:"The Great — ruled Judea under Rome at Jesus's birth", difficulty:4 },
  { q:"Nehemiah served as ___ to the Persian king Artaxerxes.", a:"Cupbearer", wrong:["Scribe","Treasurer","Advisor"], hint:"He served the king's drinks — a position of high trust", difficulty:4 },
  { q:"The city of ___ was the birthplace of the apostle Paul.", a:"Tarsus", wrong:["Antioch","Ephesus","Corinth"], hint:"In modern-day Turkey — 'no ordinary city'", difficulty:4 },
  { q:"The priestly garment worn by the high priest was called an ___.", a:"Ephod", wrong:["Mitre","Surplice","Chashmal"], hint:"5 letters — had 12 gemstones representing the 12 tribes", difficulty:4 },
  { q:"The last king of Judah before the Babylonian exile was ___.", a:"Zedekiah", wrong:["Jehoiakim","Jehoiachin","Manasseh"], hint:"His eyes were put out after watching his sons killed", difficulty:4 },
  { q:"The apostle James was the son of ___.", a:"Zebedee", wrong:["Alphaeus","Joseph","Clopas"], hint:"A fisherman — brother of John", difficulty:4 },
  { q:"The seventh day in Creation, on which God rested, is called ___.", a:"Sabbath", wrong:["Shalom","Selah","Shabbat"], hint:"Day of rest — later a commandment", difficulty:4 },
  { q:"The husband of Ruth was ___.", a:"Boaz", wrong:["Mahlon","Chilion","Elimelech"], hint:"A wealthy kinsman-redeemer from Bethlehem", difficulty:4 },
  { q:"The prophet who confronted King David about Bathsheba was ___.", a:"Nathan", wrong:["Gad","Zadok","Ahijah"], hint:"He told the parable of the stolen lamb", difficulty:4 },
  { q:"The book that records Israel's return from exile under Cyrus is ___.", a:"Ezra", wrong:["Nehemiah","Haggai","Daniel"], hint:"A scribe and priest who led reforms", difficulty:4 },
  { q:"Paul wrote to ___ about overseeing the church in Crete.", a:"Titus", wrong:["Timothy","Philemon","Silas"], hint:"5 letters — a Gentile co-worker of Paul", difficulty:4 },
  { q:"The ___ is where Jesus prayed the night before his crucifixion.", a:"Garden of Gethsemane", wrong:["Upper Room","Mount of Olives","Court of the Gentiles"], hint:"An olive garden where he sweated drops of blood", difficulty:4 },
  { q:"The disciple who asked Jesus to show them the Father was ___.", a:"Philip", wrong:["Thomas","Andrew","Nathanael"], hint:"John 14 — Jesus replied 'Have I been with you so long?'", difficulty:4 },
  { q:"The father of John the Baptist was a priest named ___.", a:"Zechariah", wrong:["Simeon","Anna","Eli"], hint:"He was struck mute until the baby's name was written", difficulty:4 },
  { q:"Paul's letter to ___ is the shortest in the NT by word count.", a:"Philemon", wrong:["Titus","2 John","3 John"], hint:"About a runaway slave named Onesimus", difficulty:4 },
  { q:"The woman who poured expensive perfume on Jesus's feet was ___.", a:"Mary of Bethany", wrong:["Mary Magdalene","Joanna","Susanna"], hint:"Sister of Martha and Lazarus — John 12", difficulty:4 },
  { q:"The golden calf was built by Israel while Moses was on Mount ___.", a:"Sinai", wrong:["Horeb","Nebo","Carmel"], hint:"Where the Ten Commandments were being received", difficulty:4 },
  { q:"The cave of ___ is where David hid from Saul.", a:"Adullam", wrong:["Machpelah","Makkedah","En Gedi"], hint:"400 men joined him there — 1 Samuel 22", difficulty:4 },
  { q:"The ___ is the Hebrew word for the first five books of the Bible.", a:"Torah", wrong:["Talmud","Mishnah","Tanakh"], hint:"5 books of Moses — Law", difficulty:4 },
  { q:"Jesus said 'Before Abraham was, ___ am.'", a:"I", wrong:["He","The LORD","God"], hint:"John 8:58 — a divine claim that enraged the Pharisees", difficulty:4 },
  { q:"The book of ___ contains the prophecy of the suffering servant.", a:"Isaiah", wrong:["Zechariah","Jeremiah","Micah"], hint:"Chapter 53 — 'He was pierced for our transgressions'", difficulty:4 },
];

// ─────────────────────────────────────────────────────────────────────────────
// SCORING  — max 1,000 pts (200+200+200+200+200, multipliers on Q4/Q5)
// ─────────────────────────────────────────────────────────────────────────────
const BASE_POINTS = [100, 150, 200, 150, 100]; // sums to 700 base; multipliers bring max to 1000
const MULTIPLIERS  = [1,   1,   1,   1.5, 2  ];
// Q1=100, Q2=150, Q3=200, Q4=225, Q5=200 → total 875... let's do cleaner math:
// Actually: 200,200,200,200,200 = 1000 flat, multiplier only affects bonus display
// Simplest: base 200 each, hints cut 50% max, multiplier on hard Qs shown cosmetically
// New scoring: Q1–Q5 each worth 200pts base. Hint = -50pts. Multiplier on Q4(1.5x→300),Q5(2x→400)
// That gives max: 200+200+200+300+400 = 1300... too high.
// FINAL: Q1=100, Q2=150, Q3=200, Q4=250, Q5=300. Max=1000. No hints (MC doesn't need them).

const POINTS      = [100, 150, 200, 250, 300]; // sums to exactly 1000
const MULT_LABELS  = [null, null, null, "1.5×", "2×"]; // cosmetic only

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function getDaySeed() {
  const n = new Date();
  return n.getFullYear() * 10000 + (n.getMonth() + 1) * 100 + n.getDate();
}
function seededRandom(seed) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
}
function getDailyQuestions() {
  const seed = getDaySeed();
  const rng  = seededRandom(seed);
  const shuffle = arr => [...arr].sort(() => rng() - 0.5);
  const byDiff  = [1,2,3,4].map(d => shuffle(QUESTION_POOL.filter(q => q.difficulty === d)));
  return [byDiff[0][0], byDiff[1][0], byDiff[2][0], byDiff[3][0], byDiff[3][1]];
}
function buildChoices(q, rng) {
  const all = [q.a, ...q.wrong];
  return all.sort(() => rng() - 0.5);
}
function getDateStr() {
  return new Date().toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" });
}

// Streak
const STREAK_KEY = "bblitz_streak";
const PLAYED_KEY = "bblitz_played";
const EMAIL_KEY  = "bblitz_email";
function loadStreak() {
  try { return JSON.parse(localStorage.getItem(STREAK_KEY)) || { current:0, best:0, lastDay:null }; }
  catch { return { current:0, best:0, lastDay:null }; }
}
function saveStreak(s) { try { localStorage.setItem(STREAK_KEY, JSON.stringify(s)); } catch {} }
function todayKey() { return String(getDaySeed()); }
function updateStreak() {
  const s = loadStreak(), key = getDaySeed();
  if (s.lastDay === key) return s;
  const prev = key - 1;
  const cur  = s.lastDay === prev ? s.current + 1 : 1;
  const upd  = { current:cur, best:Math.max(cur, s.best), lastDay:key };
  saveStreak(upd); return upd;
}
function markPlayedToday() { try { localStorage.setItem(PLAYED_KEY, todayKey()); } catch {} }
function loadEmail() { try { return localStorage.getItem(EMAIL_KEY) || ""; } catch { return ""; } }
function saveEmail(e) { try { localStorage.setItem(EMAIL_KEY, e); } catch {} }

// Share
function buildShareText(results, total, dateStr) {
  const icons = results.map(r => {
    if (!r.answered) return "⬜";
    return r.correct ? "🟩" : "🟥";
  });
  return `⚡ Bible Blitz #${getDaySeed() % 10000} — ${dateStr}\n${icons.join("")}\nScore: ${total}/1,000\n\nPlay today: https://bibleblitz.vercel.app`;
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
function ScoreBar({ score, max=1000 }) {
  const pct = Math.min((score / max) * 100, 100);
  return (
    <div style={{ background:"#e5e7eb", borderRadius:8, height:8, overflow:"hidden", margin:"6px 0" }}>
      <div style={{ height:"100%", width:`${pct}%`,
        background:"linear-gradient(90deg,#16a34a,#4ade80)", borderRadius:8, transition:"width 0.7s ease" }} />
    </div>
  );
}

function QuestionDots({ results, current }) {
  return (
    <div style={{ display:"flex", gap:8, justifyContent:"center", margin:"12px 0" }}>
      {results.map((r, i) => {
        const active = i === current;
        const bg = !r.answered ? (active ? "#111827" : "#d1d5db") : r.correct ? "#16a34a" : "#dc2626";
        return (
          <div key={i} style={{ width:active?30:22, height:active?30:22, borderRadius:"50%",
            background:bg, display:"flex", alignItems:"center", justifyContent:"center",
            color:"#fff", fontSize:11, fontWeight:700, transition:"all 0.3s",
            boxShadow:active?"0 0 0 3px rgba(17,24,39,0.18)":"none" }}>
            {i+1}
          </div>
        );
      })}
    </div>
  );
}

function StreakBadge({ streak }) {
  if (!streak || streak.current < 1) return null;
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:5,
      background:"#fff7ed", border:"1px solid #fed7aa", borderRadius:20,
      padding:"4px 12px", fontSize:13, color:"#c2410c", fontWeight:700 }}>
      🔥 {streak.current}-day streak
    </div>
  );
}

const LETTERS = ["A","B","C","D"];
const DIFF_LABEL = ["","Intro","Medium","Hard","Expert","Expert"];
const DIFF_COLOR = ["","#16a34a","#d97706","#dc2626","#7c3aed","#7c3aed"];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
export default function BibleBlitz() {
  const questions = getDailyQuestions();
  const dateStr   = getDateStr();

  // pre-build choices per question (stable across renders)
  const rng = seededRandom(getDaySeed() + 999);
  const allChoices = questions.map(q => buildChoices(q, rng));

  const [current,   setCurrent]   = useState(0);
  const [results,   setResults]   = useState(questions.map(() => ({ answered:false, correct:false, points:0, chosen:null })));
  const [selected,  setSelected]  = useState(null);   // chosen answer string
  const [feedback,  setFeedback]  = useState(null);   // "correct"|"wrong"
  const [gameOver,  setGameOver]  = useState(false);
  const [streak,    setStreak]    = useState(loadStreak());
  const [copied,    setCopied]    = useState(false);
  const [email,     setEmail]     = useState(loadEmail());
  const [emailSent, setEmailSent] = useState(false);
  const [flavor,    setFlavor]    = useState("");
  const [hintShown, setHintShown] = useState(false);

  const totalScore = results.reduce((s,r) => s + r.points, 0);
  const q       = questions[current];
  const choices = allChoices[current];

  // Flavor tagline via Claude
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method:"POST", headers:{"Content-Type":"application/json"},
          body: JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:60,
            messages:[{ role:"user", content:`One short punchy tagline (under 10 words) for Bible Blitz, a daily Bible trivia game. Energetic and faith-filled. No quotes, no punctuation at end.` }] })
        });
        const data = await res.json();
        const txt = data?.content?.[0]?.text?.trim();
        if (txt) setFlavor(txt);
      } catch {}
    })();
  }, []);

  function choose(option) {
    if (feedback) return; // already answered
    const correct = option === q.a;
    const pts     = correct ? POINTS[current] : 0;
    setSelected(option);
    setFeedback(correct ? "correct" : "wrong");
    const newResults = results.map((r,i) => i === current
      ? { answered:true, correct, points:pts, chosen:option } : r);
    setResults(newResults);

    setTimeout(() => {
      setSelected(null); setFeedback(null); setHintShown(false);
      if (current + 1 >= questions.length) {
        const ns = updateStreak(); markPlayedToday(); setStreak(ns); setGameOver(true);
      } else {
        setCurrent(c => c+1);
      }
    }, 1600);
  }

  function copyShare() {
    navigator.clipboard.writeText(buildShareText(results, totalScore, dateStr))
      .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); });
  }
  function handleEmail() {
    if (!email.includes("@")) return;
    saveEmail(email); setEmailSent(true);
  }

  // choice button color
  function choiceBg(option) {
    if (!feedback) return selected === option ? "#f0f9ff" : "#fff";
    if (option === q.a) return "#f0fdf4";
    if (option === selected && !feedback === "correct") return "#fef2f2";
    return "#fff";
  }
  function choiceBorder(option) {
    if (!feedback) return selected === option ? "#3b82f6" : "#e5e7eb";
    if (option === q.a) return "#16a34a";
    if (option === selected) return "#dc2626";
    return "#e5e7eb";
  }
  function choiceTextColor(option) {
    if (!feedback) return "#111827";
    if (option === q.a) return "#15803d";
    if (option === selected) return "#dc2626";
    return "#6b7280";
  }

  const card = {
    background:"#fff", borderRadius:16, padding:"24px 20px",
    boxShadow:"0 1px 3px rgba(0,0,0,0.07),0 4px 16px rgba(0,0,0,0.06)",
    maxWidth:520, width:"100%", margin:"0 auto",
  };

  return (
    <div style={{ minHeight:"100vh", background:"#f9fafb",
      fontFamily:"'Inter',system-ui,sans-serif", padding:"16px 14px 60px", boxSizing:"border-box" }}>

      {/* Header */}
      <div style={{ textAlign:"center", marginBottom:16 }}>
        <div style={{ fontSize:11, color:"#9ca3af", letterSpacing:2, textTransform:"uppercase", marginBottom:2 }}>
          {dateStr}
        </div>
        <h1 style={{ fontSize:28, fontWeight:800, color:"#111827", margin:0, letterSpacing:-0.5 }}>
          ⚡ Bible Blitz
        </h1>
        {flavor && <div style={{ fontSize:12, color:"#6b7280", marginTop:4, fontStyle:"italic" }}>{flavor}</div>}
        {!gameOver && streak.current > 0 && (
          <div style={{ marginTop:8 }}><StreakBadge streak={streak} /></div>
        )}
      </div>

      {/* Score bar */}
      <div style={{ maxWidth:520, margin:"0 auto 12px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#6b7280", marginBottom:2 }}>
          <span>Score</span>
          <span style={{ fontWeight:700, color:"#111827" }}>{totalScore} / 1,000</span>
        </div>
        <ScoreBar score={totalScore} max={1000} />
      </div>

      <QuestionDots results={results} current={gameOver ? -1 : current} />

      {/* ── GAME OVER ─────────────────────────────────────────────────────── */}
      {gameOver ? (
        <div style={card}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:52, marginBottom:4 }}>
              {totalScore >= 850 ? "🏆" : totalScore >= 600 ? "⭐" : "📖"}
            </div>
            <h2 style={{ fontSize:20, fontWeight:800, color:"#111827", margin:"0 0 2px" }}>
              {totalScore >= 850 ? "Bible Scholar!" : totalScore >= 600 ? "Well Done!" : "Keep Studying!"}
            </h2>
            <div style={{ fontSize:32, fontWeight:800, color:"#16a34a", margin:"6px 0 4px" }}>
              {totalScore} / 1,000
            </div>
            <ScoreBar score={totalScore} max={1000} />

            {/* Streak */}
            <div style={{ margin:"14px 0 0", display:"flex", justifyContent:"center", gap:20 }}>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:24, fontWeight:800, color:"#c2410c" }}>🔥 {streak.current}</div>
                <div style={{ fontSize:11, color:"#6b7280" }}>Day Streak</div>
              </div>
              <div style={{ width:1, background:"#e5e7eb" }} />
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:24, fontWeight:800, color:"#7c3aed" }}>🏅 {streak.best}</div>
                <div style={{ fontSize:11, color:"#6b7280" }}>Best Streak</div>
              </div>
            </div>

            {/* Breakdown */}
            <div style={{ marginTop:16, textAlign:"left", borderTop:"1px solid #f3f4f6", paddingTop:12 }}>
              {questions.map((q, i) => {
                const r = results[i];
                return (
                  <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10,
                    padding:"8px 0", borderBottom:i<4?"1px solid #f3f4f6":"none" }}>
                    <div style={{ width:24, height:24, borderRadius:"50%", flexShrink:0,
                      background:r.correct?"#16a34a":"#dc2626", color:"#fff",
                      display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700 }}>
                      {r.correct?"✓":"✗"}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:12, color:"#374151", fontWeight:600 }}>Q{i+1} — {q.a}</div>
                      {!r.correct && r.chosen && (
                        <div style={{ fontSize:11, color:"#9ca3af" }}>You chose: {r.chosen}</div>
                      )}
                    </div>
                    <div style={{ fontSize:13, fontWeight:700, color:r.correct?"#16a34a":"#9ca3af", flexShrink:0 }}>
                      +{r.points}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Email */}
            {!emailSent ? (
              <div style={{ marginTop:16, background:"#f0fdf4", borderRadius:12, padding:"14px" }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#15803d", marginBottom:3 }}>
                  📬 Get tomorrow's Blitz delivered
                </div>
                <div style={{ fontSize:12, color:"#6b7280", marginBottom:10 }}>
                  Join players growing in God's Word daily.
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <input value={email} onChange={e=>setEmail(e.target.value)}
                    onKeyDown={e=>e.key==="Enter"&&handleEmail()}
                    placeholder="your@email.com"
                    style={{ flex:1, padding:"9px 12px", fontSize:14, border:"1px solid #d1fae5",
                      borderRadius:8, outline:"none", fontFamily:"inherit" }} />
                  <button onClick={handleEmail}
                    style={{ padding:"9px 14px", background:"#16a34a", color:"#fff",
                      border:"none", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer" }}>
                    Notify Me
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ marginTop:16, background:"#f0fdf4", borderRadius:12, padding:"12px",
                color:"#15803d", fontWeight:700, fontSize:14 }}>
                ✓ You're on the list — see you tomorrow!
              </div>
            )}

            {/* Share */}
            <button onClick={copyShare}
              style={{ marginTop:12, width:"100%", padding:"14px",
                background:copied?"#16a34a":"#111827", color:"#fff", border:"none",
                borderRadius:12, fontSize:15, fontWeight:700, cursor:"pointer", transition:"background 0.3s" }}>
              {copied ? "✓ Copied!" : "Share My Score 📤"}
            </button>

            <div style={{ marginTop:10, background:"#f9fafb", borderRadius:8, padding:"10px 12px",
              fontSize:11, color:"#6b7280", textAlign:"left", fontFamily:"monospace", lineHeight:1.7 }}>
              {buildShareText(results, totalScore, dateStr)}
            </div>

            <div style={{ fontSize:11, color:"#9ca3af", marginTop:10 }}>
              New questions every day at midnight
            </div>
          </div>
        </div>
      ) : (
        /* ── ACTIVE QUESTION ─────────────────────────────────────────────── */
        <div style={card}>
          {/* Header row */}
          <div style={{ display:"flex", alignItems:"center", marginBottom:14 }}>
            <span style={{ fontSize:11, fontWeight:700, color:DIFF_COLOR[q.difficulty],
              background:DIFF_COLOR[q.difficulty]+"18", borderRadius:6,
              padding:"3px 8px", letterSpacing:0.5, textTransform:"uppercase" }}>
              {DIFF_LABEL[q.difficulty]}
            </span>
            {MULT_LABELS[current] && (
              <span style={{ background:current===4?"#7c3aed":"#d97706", color:"#fff",
                borderRadius:6, padding:"2px 8px", fontSize:11, fontWeight:700, marginLeft:6 }}>
                {MULT_LABELS[current]} BONUS
              </span>
            )}
            <span style={{ marginLeft:"auto", fontSize:12, color:"#9ca3af" }}>
              Q{current+1} of 5 · <strong style={{ color:"#111827" }}>+{POINTS[current]} pts</strong>
            </span>
          </div>

          {/* Question */}
          <div style={{ fontSize:18, fontWeight:600, color:"#111827", lineHeight:1.55,
            marginBottom:20, minHeight:52 }}>
            {q.q}
          </div>

          {/* Choices */}
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {choices.map((option, idx) => {
              const isCorrect  = feedback && option === q.a;
              const isWrong    = feedback && option === selected && option !== q.a;
              return (
                <button key={option} onClick={() => choose(option)} disabled={!!feedback}
                  style={{
                    display:"flex", alignItems:"center", gap:12,
                    padding:"13px 14px", textAlign:"left", width:"100%",
                    background: isCorrect ? "#f0fdf4" : isWrong ? "#fef2f2" : selected===option&&!feedback ? "#f0f9ff" : "#fff",
                    border: `2px solid ${isCorrect ? "#16a34a" : isWrong ? "#dc2626" : selected===option&&!feedback ? "#3b82f6" : "#e5e7eb"}`,
                    borderRadius:12, cursor:feedback?"default":"pointer",
                    fontFamily:"inherit", transition:"all 0.15s",
                  }}>
                  <span style={{
                    width:28, height:28, borderRadius:8, flexShrink:0,
                    background: isCorrect ? "#16a34a" : isWrong ? "#dc2626" : "#f3f4f6",
                    color: isCorrect||isWrong ? "#fff" : "#6b7280",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:12, fontWeight:800,
                  }}>
                    {isCorrect ? "✓" : isWrong ? "✗" : LETTERS[idx]}
                  </span>
                  <span style={{ fontSize:15, fontWeight:500,
                    color: isCorrect ? "#15803d" : isWrong ? "#dc2626" : "#111827" }}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Feedback banner */}
          {feedback && (
            <div style={{ marginTop:14, padding:"10px 14px", borderRadius:10, textAlign:"center",
              background: feedback==="correct" ? "#f0fdf4" : "#fef2f2",
              color: feedback==="correct" ? "#15803d" : "#dc2626",
              fontWeight:700, fontSize:15 }}>
              {feedback==="correct"
                ? `✓ Correct! +${POINTS[current]} pts`
                : `✗ The answer was: ${q.a}`}
            </div>
          )}

          {/* Hint toggle */}
          {!feedback && (
            <div style={{ marginTop:14 }}>
              {!hintShown ? (
                <button onClick={() => setHintShown(true)}
                  style={{ background:"none", border:"1px solid #e5e7eb", borderRadius:8,
                    padding:"7px 12px", fontSize:12, color:"#6b7280", cursor:"pointer",
                    fontFamily:"inherit" }}>
                  💡 Show hint
                </button>
              ) : (
                <div style={{ background:"#fefce8", border:"1px solid #fde68a", borderRadius:8,
                  padding:"8px 12px", fontSize:13, color:"#92400e" }}>
                  💡 {q.hint}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div style={{ textAlign:"center", marginTop:28, fontSize:11, color:"#d1d5db" }}>
        Bible Blitz · New questions every day
      </div>
    </div>
  );
}
