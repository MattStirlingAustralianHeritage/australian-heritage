import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const HERITAGE_TRAILS = [
  {
    id: "goldfields",
    name: "The Goldfields Trail",
    subtitle: "1851–1890 · Victoria & New South Wales",
    description: "Follow the routes that transformed a colony into a nation. The gold rush of 1851 brought 500,000 people to Victoria in a decade, built magnificent cities overnight, and forged the rebellious democratic spirit that still defines Australia.",
    color: "#C8943A",
    towns: [1, 5, 9, 27, 3, 28, 17, 19],
    icon: "◈",
  },
  {
    id: "convict",
    name: "The Convict Trail",
    subtitle: "1788–1868 · Tasmania & NSW",
    description: "Britain transported 162,000 convicts to Australia over 80 years. Their forced labour built the roads, bridges and buildings of a new nation. This trail traces their stories from arrival to freedom.",
    color: "#4A6741",
    towns: [11, 24, 25, 22, 23],
    icon: "⬡",
  },
  {
    id: "outback",
    name: "The Outback Frontier",
    subtitle: "19th Century · NSW, SA & WA",
    description: "Australia's vast interior beckoned and destroyed in equal measure. This trail connects the great mining cities, ghost towns and remote outposts that were built on dreams of silver, copper and gold.",
    color: "#8B4040",
    towns: [4, 12, 41, 8, 37],
    icon: "◇",
  },
  {
    id: "colonial-ports",
    name: "Colonial Ports",
    subtitle: "1788–1901 · Coastal Australia",
    description: "The great port towns were Australia's gateways to the world — places where ships arrived with settlers, soldiers and cargo, and departed with wool, gold and stories of a strange new land.",
    color: "#2E5D7A",
    towns: [42, 26, 46, 49, 7],
    icon: "⬟",
  },
];

const TOWNS = [
  { id: 1, name: "Ballarat", state: "VIC", lat: -37.5622, lng: 143.8503, type: "regional", category: "gold", description: "Gold rush city with extraordinary Victorian architecture and the birthplace of Australian democracy at the Eureka Stockade.", heritage: ["Sovereign Hill Living Museum", "Eureka Centre & Museum", "Ballarat Botanical Gardens", "Her Majesty's Theatre", "Gold Museum"], todo: ["Pan for gold at Sovereign Hill", "Watch the Sound & Light show", "Art Gallery of Ballarat", "Ballarat Begonia Festival"], events: ["Ballarat Begonia Festival (March)", "Eureka Festival (December)", "Ballarat Heritage Weekend (May)"], food: ["Mitchell Harris Wine Bar", "Oxbow Bar & Kitchen", "Forge Pizzeria", "The Provincial Hotel"], indigenous: "The Wadawurrung and Dja Dja Wurrung peoples have lived in this region for tens of thousands of years. The goldfields landscape was profoundly altered by the rush, displacing communities who had thrived here since time immemorial.", articles: [] },
  { id: 2, name: "Bathurst", state: "NSW", lat: -33.4194, lng: 149.5778, type: "regional", category: "colonial", description: "Australia's oldest inland city, rich with colonial history and famous for its motor racing circuit on Mount Panorama.", heritage: ["Bathurst Courthouse", "Ben Chifley's Cottage", "Bathurst Regional Art Gallery", "Mount Panorama Circuit"], todo: ["Drive Mount Panorama", "Abercrombie Caves", "Bathurst Goldfields Museum"], events: ["Bathurst 1000 (October)", "Bathurst Winter Festival (July)"], food: ["Rydges Mount Panorama Restaurant", "Legall Patisserie", "Agrestic Grocer"], indigenous: "The Wiradyuri people are the traditional custodians of the central tablelands region, with a rich cultural heritage stretching across the rivers and plains surrounding Bathurst.", articles: [] },
  { id: 3, name: "Beechworth", state: "VIC", lat: -36.3574, lng: 146.6884, type: "small", category: "gold", description: "A perfectly preserved gold rush town in the Victorian high country, famous for its honey-coloured granite buildings and Ned Kelly connections.", heritage: ["Beechworth Gaol", "Burke Museum", "Historic Precinct", "Beechworth Courthouse (Ned Kelly's trial)"], todo: ["Ned Kelly touring route", "Beechworth Honey tasting", "Lake Sambell circuit"], events: ["Beechworth Harvest Celebration (March)", "Celtic Festival (August)"], food: ["The Ox and Hound Bistro", "Beechworth Bakery", "Provenance Restaurant"], indigenous: "The Dhudhuroa and Waywurru peoples are the traditional custodians of the upper Ovens Valley. Their seasonal movements through the high country left behind stone arrangements and grinding grooves still visible today.", articles: [] },
  { id: 4, name: "Broken Hill", state: "NSW", lat: -31.9505, lng: 141.4670, type: "regional", category: "mining", description: "The Silver City — a remote outback town that became one of the world's great mining centres and gave birth to BHP and the union movement.", heritage: ["Line of Lode Miners Memorial", "Palace Hotel", "Pro Hart Gallery", "Sulphide Street Station Railway Museum"], todo: ["Line of Lode underground tour", "Living Desert sculptures at sunset", "Royal Flying Doctor Service museum"], events: ["Broken Hill Races (September)", "Broken Hill Cultural Festival"], food: ["Alfresco Palace Hotel", "Broken Hill Musicians Club", "Kaffeine Coffee"], indigenous: "The Wilyakali people are the traditional custodians of Broken Hill and the surrounding country. The Line of Lode rises above a landscape of deep spiritual significance that long predates the mines.", articles: [] },
  { id: 5, name: "Castlemaine", state: "VIC", lat: -37.0686, lng: 144.2161, type: "small", category: "gold", description: "A creative arts hub in central Victoria with a proud gold rush heritage and one of Australia's finest regional art museums.", heritage: ["Castlemaine Art Museum", "Buda Historic Home & Garden", "Old Castlemaine Gaol", "Theatre Royal"], todo: ["Castlemaine State Festival", "Pennyweight Flat cemetery walk", "Mount Alexander hike"], events: ["Castlemaine State Festival (April, biennial)", "Food & Wine Festival (October)"], food: ["The Good Table", "Bridge Hotel", "Togs Place"], indigenous: "The Dja Dja Wurrung people are the traditional custodians of Castlemaine country. Their name for this region — Kalgower — reflects a deep relationship with the land that the gold rush dramatically disrupted.", articles: [] },
  { id: 7, name: "Hahndorf", state: "SA", lat: -35.0318, lng: 138.8069, type: "small", category: "colonial", description: "Australia's oldest surviving German settlement, established in 1839 by Lutheran refugees fleeing religious persecution in Prussia.", heritage: ["Hahndorf Academy", "St Paul's Lutheran Church", "The Cedars (Hans Heysen's studio)", "Historic Main Street"], todo: ["Hans Heysen art trail", "Adelaide Hills wine region", "Beerenberg Strawberry Farm"], events: ["Hahndorf Schutzenfest (January)", "Christmas Lights Festival"], food: ["The Hahndorf Inn", "Haus Restaurant", "Beerenberg Farmshop"], indigenous: "The Peramangk people are the traditional custodians of the Adelaide Hills. They inhabited the ranges for thousands of years before European settlement dramatically altered the landscape.", articles: [] },
  { id: 8, name: "Kalgoorlie", state: "WA", lat: -30.7490, lng: 121.4660, type: "regional", category: "gold", description: "The Golden Mile — heart of the world's richest goldfield, still yielding gold from the Super Pit, Australia's largest open-cut gold mine.", heritage: ["Hannans North Historic Mine", "Exchange Hotel", "Museum of the Goldfields", "York Hotel"], todo: ["Super Pit lookout at blast time", "Goldfields Arts Centre", "Historical mining museum"], events: ["Kalgoorlie Race Round (September)", "Diggers & Dealers Mining Forum"], food: ["Top End Hotel", "Balcony Bar & Oyster Co", "Saltimbocca"], indigenous: "The Wangkatha and Wongutha peoples are the traditional custodians of the Kalgoorlie goldfields region, country they have inhabited for over 40,000 years.", articles: [] },
  { id: 9, name: "Maldon", state: "VIC", lat: -36.9950, lng: 144.0676, type: "small", category: "gold", description: "Australia's first Notable Town — a goldfields settlement so perfectly intact the National Trust declared it unchanged since the 1860s.", heritage: ["Historic Main Street", "Tarrangower Mine Reserve", "Maldon Cemetery", "Post Office"], todo: ["Victorian Goldfields Railway steam train", "Easter Fair", "Mount Tarrangower summit walk"], events: ["Maldon Easter Fair", "Maldon Folk Festival (November)"], food: ["Ruby's Cafe", "Maldon Hotel", "Kangaroo Hotel"], indigenous: "The Dja Dja Wurrung people are the traditional custodians of Maldon country. The devastating impact of the gold rush on their community is part of the town's untold history.", articles: [] },
  { id: 11, name: "Ross", state: "TAS", lat: -42.0222, lng: 147.4934, type: "small", category: "convict", description: "A perfectly preserved colonial village centred on its magnificent 1836 convict-built sandstone bridge — one of Australia's oldest still in use.", heritage: ["Ross Bridge (1836)", "Female Factory Historic Site", "St John's Church", "Ross Gaol ruins"], todo: ["Tasmanian Wool Centre", "Coal Valley Vineyard tour", "Midlands Highway heritage drive"], events: ["Ross Village Fair (Easter)", "Tasmanian Craft Fair (November)"], food: ["Man-O-Ross Hotel", "Ross Bakery Inn", "Colonial Cottages of Ross"], indigenous: "The Oyster Bay nation and the Big River nation were the traditional custodians of this midlands country. The colonial era brought catastrophic violence and displacement to Tasmania's Aboriginal peoples.", articles: [] },
  { id: 12, name: "Silverton", state: "NSW", lat: -31.8839, lng: 141.2146, type: "small", category: "mining", description: "A ghost town that refuses to die — a legendary outback art colony that has doubled as Mars, the post-apocalypse, and the Wild West in countless films.", heritage: ["Silverton Hotel", "Silverton Gaol Museum", "Mad Max Museum", "Day Dream Mine"], todo: ["Art gallery trail", "Penrose Park sculptures", "Mundi Mundi Plain lookout at sunset"], events: ["Silverton Art Exhibition (August)", "Broken Heel Festival"], food: ["Silverton Hotel", "Penrose Park Cafe"], indigenous: "The Wilyakali people's country extends across this outback landscape. Petroglyphs and artefacts found throughout the region attest to a continuous human presence of extraordinary depth.", articles: [] },
  { id: 17, name: "Gulgong", state: "NSW", lat: -32.3667, lng: 149.5333, type: "small", category: "gold", description: "A perfectly preserved gold rush town that inspired Henry Lawson and once appeared on the Australian ten dollar note.", heritage: ["Henry Lawson Centre", "Gulgong Pioneer Museum", "Historic main street", "Prince of Wales Opera House"], todo: ["Heritage streetscape walk", "Pioneer Museum tour", "Henry Lawson country drive"], events: ["Henry Lawson Festival (June)", "Gulgong Folk Festival"], food: ["Gulgong Club", "Prince of Wales Hotel"], indigenous: "The Wiradjuri people are the traditional custodians of Gulgong country. Their stories and songlines connect this landscape in ways that long predate its gold rush fame.", articles: [] },
  { id: 19, name: "Hill End", state: "NSW", lat: -33.0333, lng: 149.4167, type: "small", category: "gold", description: "A ghost town that once held 8,000 souls during the gold rush — now a perfectly frozen piece of 19th century Australia.", heritage: ["Royal Hotel", "Holtermann Nugget site", "Hill End Historic Site", "St Paul's Church ruins"], todo: ["Gold fossicking", "Photography heritage tour", "Historic cemetery walk"], events: ["Hill End Art Weekend (October)"], food: ["Royal Hotel Hill End"], indigenous: "The Wiradjuri people have lived in this country for thousands of years. The creek systems around Hill End were central to their seasonal movements and cultural life.", articles: [] },
  { id: 22, name: "Strahan", state: "TAS", lat: -42.1500, lng: 145.3167, type: "small", category: "convict", description: "A remote west coast town that served as gateway to the wild southwest and was at the centre of Australia's defining environmental battle — the Franklin Dam controversy.", heritage: ["Customs House", "Union Steam Ship Building", "Regatta Point", "Macquarie Harbour historic site"], todo: ["Gordon River wilderness cruise", "West Coast Wilderness Railway", "Rainforest & Heritage Centre"], events: ["West Coast Blues & Roots Festival"], food: ["Franklin Manor", "Hamers Hotel", "Risby Cove"], indigenous: "The Tarkiner people and other western Tasmanian Aboriginal groups lived in this remote country for millennia, developing one of the world's most extraordinary cultures of adaptation to a wilderness environment.", articles: [] },
  { id: 23, name: "Stanley", state: "TAS", lat: -40.7667, lng: 145.2833, type: "small", category: "convict", description: "A stunning historic town at the base of The Nut — a dramatic volcanic plug — with connections to one of Australia's most consequential colonial entrepreneurs.", heritage: ["The Nut (Munatrik)", "Joe Lyons Cottage", "Van Diemen's Land Company Store", "Christ Church"], todo: ["Chairlift up The Nut", "Joe Lyons birthplace tour", "Historic waterfront walk"], events: ["Stanley Arts Festival", "Christmas in Stanley"], food: ["The Touchstone", "Stanley Hotel", "Hursey Seafoods"], indigenous: "The Tommeginne people are the traditional custodians of Stanley and the northwest Cape. The Van Diemen's Land Company's operations in the 1820s had devastating consequences for Aboriginal communities in this region.", articles: [] },
  { id: 24, name: "Richmond", state: "TAS", lat: -42.7333, lng: 147.4333, type: "small", category: "convict", description: "Australia's most complete Georgian village — the oldest Catholic church and oldest bridge still in use in the country, all within walking distance.", heritage: ["Richmond Bridge (1823)", "Richmond Gaol (1825)", "St John's Church (1836)", "Old Post Office"], todo: ["Gaol historic tour", "Bridge walk", "Georgian village stroll"], events: ["Richmond Harvest Festival", "Coalmines Historic Site tours"], food: ["Pooley Wines", "The Millhouse", "Coal River Farm"], indigenous: "The Muwinina people are the traditional custodians of the Coal River Valley. The colonial presence at Richmond was established on country they had inhabited for at least 35,000 years.", articles: [] },
  { id: 25, name: "Oatlands", state: "TAS", lat: -42.3000, lng: 147.3667, type: "small", category: "convict", description: "Home to the greatest concentration of Georgian sandstone architecture in the Southern Hemisphere — over 150 historic buildings in a single small town.", heritage: ["Callington Mill (1837)", "Courthouse", "St Peter's Church", "Georgian streetscape"], todo: ["Callington Mill tour", "Heritage walking trail", "Midlands Highway photography drive"], events: ["Oatlands Heritage Week"], food: ["Callington Mill Restaurant", "Lake Dulverton walks"], indigenous: "The Big River nation and the Oyster Bay nation's territories met in this midlands country. The systematic destruction of Tasmania's Aboriginal peoples during the Black War occurred largely across this landscape.", articles: [] },
  { id: 26, name: "Cooktown", state: "QLD", lat: -15.4667, lng: 145.2500, type: "small", category: "colonial", description: "Where Captain Cook beached the Endeavour in 1770 for repairs — the first prolonged contact between Europeans and Aboriginal Australians.", heritage: ["James Cook Museum", "Grassy Hill Lighthouse", "Cooktown Cemetery", "Nature's Powerhouse"], todo: ["James Cook Museum", "Grassy Hill summit walk", "Botanic Gardens"], events: ["Cooktown Discovery Festival (June)", "Cape York Indigenous Culture Festival"], food: ["Cooktown Bowls Club", "River of Gold Motel Restaurant"], indigenous: "The Guugu Yimithirr people are the traditional custodians of Cooktown. They provided crucial assistance to Cook's stranded crew in 1770, and their language gave us the word 'kangaroo'. Their country has been continuously inhabited for at least 50,000 years.", articles: [] },
  { id: 27, name: "Clunes", state: "VIC", lat: -37.2964, lng: 143.7853, type: "small", category: "gold", description: "The site of Victoria's first gold discovery in 1851 — a perfectly preserved gold rush town now famous for its bookshops and heritage streetscape.", heritage: ["Town Hall", "Bank of Australasia", "St Paul's Church", "Historic main street"], todo: ["Clunes Booktown Festival", "Heritage walking trail", "Museum visit"], events: ["Clunes Booktown Festival (May)", "Gold discovery anniversary events"], food: ["Clunes Hotel", "Booktown Cafe"], indigenous: "The Dja Dja Wurrung people are the traditional custodians of Clunes country. The discovery of gold here in 1851 triggered the rush that devastated their communities across central Victoria.", articles: [] },
  { id: 28, name: "Rutherglen", state: "VIC", lat: -36.0500, lng: 146.4667, type: "small", category: "gold", description: "Victoria's historic wine capital with a heritage streetscape dating to the gold rush era and a winemaking tradition stretching back to the 1860s.", heritage: ["Historic main street", "St Clement's Church", "Wahgunyah heritage precinct", "Morris Wines (est. 1859)"], todo: ["Wine tasting trail", "Heritage walking trail", "Rutherglen Muscat tasting"], events: ["Rutherglen Winery Walkabout (June)", "Harvest Celebration (March)"], food: ["Parker Pies", "Thousand Pound", "All Saints Estate"], indigenous: "The Waywurru and Dhudhuroa peoples are the traditional custodians of the Upper Murray country around Rutherglen. The region's deep red soils that produce its famous muscats are part of a landscape with immense cultural significance.", articles: [] },
  { id: 41, name: "Burra", state: "SA", lat: -33.6833, lng: 138.9333, type: "small", category: "mining", description: "A copper mining town frozen in time, where Cornish miners lived in dugouts along the creek and left behind an extraordinary heritage landscape.", heritage: ["Burra Monster Mine", "Paxton Square Cottages", "Redruth Gaol", "Dugout dwellings at Morphetts Enginehouse"], todo: ["Heritage passport trail (11 sites)", "Monster Mine tour", "Cornish heritage discovery"], events: ["Burra Easter Classic Outback Bike Ride", "Burra Show"], food: ["Paxton Square Cottages", "Market Shed"], indigenous: "The Ngadjuri people are the traditional custodians of Burra country. The arrival of the copper industry in the 1840s dramatically transformed a landscape they had inhabited for tens of thousands of years.", articles: [] },
  { id: 42, name: "Robe", state: "SA", lat: -37.1667, lng: 139.7500, type: "small", category: "colonial", description: "A picturesque historic fishing village that was once South Australia's second busiest port — and saw thousands of Chinese gold seekers land here to avoid Victoria's racist poll tax.", heritage: ["Caledonian Inn (1858)", "Customs House", "St Peter's Church", "Robe Obelisk"], todo: ["Heritage walking trail", "Chinese landing memorial", "Long Beach coastal walk"], events: ["Robe Beach Running Festival (January)", "Robe Easter Classic"], food: ["Caledonian Inn", "Robe Hotel", "Sails Restaurant"], indigenous: "The Buandig (Boandik) people are the traditional custodians of the Robe coastline. Their middens and fish traps along this shore represent thousands of years of sophisticated resource management.", articles: [] },
  { id: 46, name: "Longreach", state: "QLD", lat: -23.4333, lng: 144.2500, type: "regional", category: "outback", description: "The heart of outback Queensland — birthplace of Qantas, home to the Australian Stockman's Hall of Fame, and centre of the great Channel Country cattle runs.", heritage: ["Australian Stockman's Hall of Fame", "Qantas Founders Museum", "Thomson River Precinct", "Longreach Powerhouse Museum"], todo: ["Stockman's Hall of Fame (full day)", "Qantas museum tour", "Sunset cruise on the Thomson River"], events: ["Longreach Outback Festival (August)"], food: ["Harry's Steakhouse", "Longreach Motor Inn Restaurant"], indigenous: "The Iningai and Muttaburra peoples are the traditional custodians of the Channel Country. The great pastoral stations were built on their land, and their stockmen were the backbone of the industry celebrated at the Stockman's Hall of Fame.", articles: [] },
  { id: 47, name: "Winton", state: "QLD", lat: -22.3833, lng: 143.0333, type: "small", category: "outback", description: "Where Banjo Paterson wrote Waltzing Matilda in 1895, and where remarkable dinosaur fossils are rewriting our understanding of prehistoric Australia.", heritage: ["Waltzing Matilda Centre", "North Gregory Hotel (Matilda premiere 1895)", "Arno's Wall", "Australian Age of Dinosaurs"], todo: ["Waltzing Matilda Centre", "Dinosaur fossil dig experience", "Explore Arno's Wall"], events: ["Outback Festival (biennial)", "Australia's Big Red Bash (July)"], food: ["North Gregory Hotel", "Tattersalls Hotel"], indigenous: "The Muttaburra people are the traditional custodians of Winton country. The fossils of Australovenator wintonensis and Diamantinasaurus matildae were found in country where Indigenous Australians have lived for at least 40,000 years.", articles: [] },
  { id: 49, name: "Maryborough", state: "QLD", lat: -25.5333, lng: 152.7000, type: "regional", category: "colonial", description: "A grand Queensland Heritage City with Australia's finest collection of 19th century timber architecture and the birthplace of P.L. Travers, creator of Mary Poppins.", heritage: ["City Hall", "Bond Store Museum", "Brennan & Geraghty's Store", "Mary Poppins statue & museum"], todo: ["Heritage walk", "Mary Poppins Festival tour", "Bond Store Museum"], events: ["Mary Poppins Festival (July)", "Maryborough Markets"], food: ["Zara's Restaurant", "Muddy Waters Cafe", "Worker's Hotel"], indigenous: "The Butchulla people are the traditional custodians of Maryborough and the Fraser Coast. K'gari (Fraser Island) — the world's largest sand island — lies off their coast and remains a place of profound cultural significance.", articles: [] },
];

const STATE_COLORS = {
  VIC: "#8B4513", NSW: "#2F4F4F", QLD: "#7A6010",
  WA: "#3D4A7A", SA: "#6B3A2A", TAS: "#2E5D4B", NT: "#7D3C1A"
};

const CATEGORY_META = {
  gold: { label: "Gold Rush", color: "#C8943A", icon: "◈" },
  convict: { label: "Convict Era", color: "#4A6741", icon: "⬡" },
  mining: { label: "Mining Heritage", color: "#7A3A3A", icon: "◇" },
  colonial: { label: "Colonial", color: "#2E5D7A", icon: "⬟" },
  outback: { label: "Outback", color: "#8B5E3C", icon: "△" },
  nature: { label: "Natural Wonder", color: "#2E6B4A", icon: "◉" },
};

// ─── HOMEPAGE PREVIEW COMPONENT (exported separately) ────────────────────────

export function HeritageMapPreview({ onExplore }) {
  const [hoveredTrail, setHoveredTrail] = useState(null);

  return (
    <section style={{
      background: "#1a1410",
      padding: "80px 0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Texture overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c4a882' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", position: "relative" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c4a882", marginBottom: 12 }}>
              Explore Australia
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 42, fontWeight: 400, color: "#f5f0e8",
              margin: 0, lineHeight: 1.1,
            }}>
              Heritage Trails
            </h2>
            <p style={{ color: "#8a7055", fontSize: 15, marginTop: 12, lineHeight: 1.6, maxWidth: 480 }}>
              Follow the routes that shaped a nation. Curated journeys through Australia's most significant historical landscapes.
            </p>
          </div>
          <button
            onClick={onExplore}
            style={{
              background: "none", border: "1px solid #c4a882",
              color: "#c4a882", padding: "12px 28px",
              fontFamily: "Georgia, serif", fontSize: 13,
              letterSpacing: "0.1em", textTransform: "uppercase",
              cursor: "pointer", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.target.style.background = "#c4a882"; e.target.style.color = "#1a1410"; }}
            onMouseLeave={e => { e.target.style.background = "none"; e.target.style.color = "#c4a882"; }}
          >
            Open Discovery Map →
          </button>
        </div>

        {/* Trail cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1 }}>
          {HERITAGE_TRAILS.map((trail, i) => (
            <div
              key={trail.id}
              onMouseEnter={() => setHoveredTrail(trail.id)}
              onMouseLeave={() => setHoveredTrail(null)}
              onClick={onExplore}
              style={{
                background: hoveredTrail === trail.id ? "#2a1f14" : "#1e1812",
                padding: "28px 24px",
                cursor: "pointer",
                transition: "all 0.3s",
                borderTop: `2px solid ${hoveredTrail === trail.id ? trail.color : "transparent"}`,
                transform: hoveredTrail === trail.id ? "translateY(-2px)" : "none",
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 12, color: trail.color }}>{trail.icon}</div>
              <div style={{ fontSize: 16, color: "#f5f0e8", fontFamily: "Georgia, serif", marginBottom: 6 }}>{trail.name}</div>
              <div style={{ fontSize: 11, color: "#8a7055", letterSpacing: "0.08em", marginBottom: 12 }}>{trail.subtitle}</div>
              <div style={{ fontSize: 13, color: "#6a5a45", lineHeight: 1.6 }}>
                {trail.description.slice(0, 100)}…
              </div>
              <div style={{ marginTop: 16, fontSize: 11, color: trail.color, letterSpacing: "0.1em" }}>
                {trail.towns.length} DESTINATIONS
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div style={{
          marginTop: 1, background: "#1e1812",
          display: "flex", alignItems: "center", justifyContent: "space-around",
          padding: "20px 40px",
        }}>
          {[
            { n: TOWNS.length + "+", label: "Heritage Places" },
            { n: HERITAGE_TRAILS.length, label: "Curated Trails" },
            { n: "8", label: "States & Territories" },
            { n: "40,000+", label: "Years of History" },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, color: "#c4a882", fontFamily: "Georgia, serif" }}>{stat.n}</div>
              <div style={{ fontSize: 11, color: "#6a5a45", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MAIN MAP PAGE ────────────────────────────────────────────────────────────

export default function AustraliaMap() {
  const [selectedTown, setSelectedTown] = useState(null);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTrail, setActiveTrail] = useState(null);
  const [activeTab, setActiveTab] = useState("heritage");
  const [showIndigenous, setShowIndigenous] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [sidePanel, setSidePanel] = useState("list"); // "list" | "trails"
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);
  const trailLinesRef = useRef([]);

  const filteredTowns = TOWNS.filter(t => {
    const q = search.toLowerCase();
    const matchSearch = !q || t.name.toLowerCase().includes(q) || t.state.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
    const matchFilter = activeFilter === "all" || t.state === activeFilter || t.category === activeFilter;
    const matchTrail = !activeTrail || HERITAGE_TRAILS.find(tr => tr.id === activeTrail)?.towns.includes(t.id);
    return matchSearch && matchFilter && matchTrail;
  });

  // Init Leaflet
  useEffect(() => {
    if (mapRef.current && !mapReady) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
      script.onload = () => {
        const L = window.L;
        const map = L.map(mapRef.current, {
          center: [-27.5, 134], zoom: 4,
          zoomControl: false, attributionControl: false,
        });

        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
          maxZoom: 18,
        }).addTo(map);

        L.control.attribution({ prefix: false }).addAttribution('© <a href="https://carto.com/">CARTO</a>').addTo(map);
        L.control.zoom({ position: "bottomright" }).addTo(map);

        TOWNS.forEach(town => {
          const cat = CATEGORY_META[town.category] || CATEGORY_META.gold;
          const isRegional = town.type === "regional";

          const svgIcon = L.divIcon({
            className: "",
            html: `<div class="map-pin" data-id="${town.id}" style="
              width: ${isRegional ? 16 : 12}px;
              height: ${isRegional ? 16 : 12}px;
              background: ${cat.color};
              border: 2px solid rgba(255,255,255,0.8);
              border-radius: 50%;
              cursor: pointer;
              transition: all 0.2s;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            "></div>`,
            iconSize: [isRegional ? 16 : 12, isRegional ? 16 : 12],
            iconAnchor: [isRegional ? 8 : 6, isRegional ? 8 : 6],
          });

          const marker = L.marker([town.lat, town.lng], { icon: svgIcon })
            .addTo(map)
            .bindTooltip(`<div style="font-family:Georgia,serif;font-size:12px;padding:4px 8px">${town.name}<span style="color:#8a7055;margin-left:6px">${town.state}</span></div>`, {
              className: "heritage-tip", direction: "top", offset: [0, -6],
            });

          marker.on("click", () => {
            setSelectedTown(town);
            setActiveTab("heritage");
            setShowIndigenous(false);
            map.flyTo([town.lat, town.lng], 10, { duration: 1.0 });
          });

          markersRef.current.push({ marker, town });
        });

        leafletMapRef.current = map;
        setMapReady(true);
      };
      document.head.appendChild(script);
    }
  }, []);

  // Filter markers
  useEffect(() => {
    if (!mapReady) return;
    const visibleIds = new Set(filteredTowns.map(t => t.id));
    markersRef.current.forEach(({ marker, town }) => {
      const el = marker.getElement();
      if (el) {
        const pin = el.querySelector(".map-pin");
        if (pin) {
          pin.style.opacity = visibleIds.has(town.id) ? "1" : "0.15";
          pin.style.transform = visibleIds.has(town.id) ? "scale(1)" : "scale(0.7)";
        }
      }
    });
  }, [filteredTowns, mapReady]);

  // Draw trail lines
  useEffect(() => {
    if (!mapReady || !leafletMapRef.current) return;
    const L = window.L;

    // Clear existing lines
    trailLinesRef.current.forEach(line => leafletMapRef.current.removeLayer(line));
    trailLinesRef.current = [];

    if (activeTrail) {
      const trail = HERITAGE_TRAILS.find(t => t.id === activeTrail);
      if (trail) {
        const points = trail.towns
          .map(id => TOWNS.find(t => t.id === id))
          .filter(Boolean)
          .map(t => [t.lat, t.lng]);

        if (points.length > 1) {
          const line = L.polyline(points, {
            color: trail.color,
            weight: 2,
            opacity: 0.6,
            dashArray: "6, 8",
          }).addTo(leafletMapRef.current);
          trailLinesRef.current.push(line);

          const bounds = L.latLngBounds(points);
          leafletMapRef.current.fitBounds(bounds, { padding: [60, 60] });
        }
      }
    }
  }, [activeTrail, mapReady]);

  const flyToTown = useCallback((town) => {
    if (leafletMapRef.current) {
      leafletMapRef.current.flyTo([town.lat, town.lng], 10, { duration: 1.0 });
    }
    setSelectedTown(town);
    setActiveTab("heritage");
    setShowIndigenous(false);
  }, []);

  const states = ["all", "NSW", "VIC", "QLD", "WA", "SA", "TAS", "NT"];

  const currentTrail = activeTrail ? HERITAGE_TRAILS.find(t => t.id === activeTrail) : null;

  return (
    <div style={{
      fontFamily: "'Playfair Display', Georgia, serif",
      height: "100vh", display: "flex", flexDirection: "column",
      background: "#1a1410", color: "#f5f0e8",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

        .heritage-tip .leaflet-tooltip-content { background: #1a1410; border: 1px solid #3d2e1e; color: #f5f0e8; border-radius: 2px; }
        .heritage-tip { background: #1a1410 !important; border: 1px solid #3d2e1e !important; border-radius: 2px !important; color: #f5f0e8 !important; box-shadow: 0 2px 12px rgba(0,0,0,0.4) !important; }
        .heritage-tip::before { border-top-color: #3d2e1e !important; }
        .leaflet-control-zoom { border: none !important; }
        .leaflet-control-zoom a { background: #1a1410 !important; color: #c4a882 !important; border: 1px solid #3d2e1e !important; font-family: Georgia, serif !important; }
        .leaflet-control-zoom a:hover { background: #2a1f14 !important; }
        .leaflet-control-attribution { background: rgba(26,20,16,0.8) !important; color: #6a5a45 !important; font-size: 10px !important; }
        .leaflet-control-attribution a { color: #8a7055 !important; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #3d2e1e; border-radius: 2px; }
        .town-row { padding: 10px 16px; cursor: pointer; border-left: 3px solid transparent; transition: all 0.15s; display: flex; align-items: center; gap: 10px; }
        .town-row:hover { background: rgba(196,168,130,0.08); border-left-color: rgba(196,168,130,0.3); }
        .town-row.active { background: rgba(196,168,130,0.12); border-left-color: #c4a882; }
        .tab-pill { background: none; border: none; cursor: pointer; font-family: 'EB Garamond', Georgia, serif; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; padding: 8px 12px; color: #6a5a45; transition: all 0.2s; border-bottom: 1px solid transparent; }
        .tab-pill.on { color: #f5f0e8; border-bottom-color: #c4a882; }
        .trail-card { padding: 14px 16px; cursor: pointer; border-left: 3px solid transparent; transition: all 0.2s; margin-bottom: 1px; }
        .trail-card:hover { background: rgba(196,168,130,0.06); }
        .trail-card.active { background: rgba(196,168,130,0.1); }
        .panel-in { animation: panelSlide 0.3s ease forwards; }
        @keyframes panelSlide { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        .fade-in { animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .nav-btn { background: none; border: none; cursor: pointer; font-family: 'EB Garamond', Georgia, serif; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #8a7055; padding: 4px 10px; transition: all 0.2s; border-bottom: 1px solid transparent; }
        .nav-btn.on { color: #f5f0e8; border-bottom-color: #c4a882; }
        .filter-chip { padding: 3px 9px; border: 1px solid #3d2e1e; background: none; color: #6a5a45; border-radius: 2px; cursor: pointer; font-size: 11px; letter-spacing: 0.06em; font-family: Georgia, serif; transition: all 0.15s; }
        .filter-chip.on { background: #c4a882; color: #1a1410; border-color: #c4a882; }
      `}</style>

      {/* ── TOP NAV ── */}
      <header style={{
        background: "#0f0c09",
        borderBottom: "1px solid #2a1f14",
        padding: "0 24px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", flexShrink: 0,
        height: 52,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a href="/" style={{ color: "#f5f0e8", fontSize: 17, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'Playfair Display', Georgia, serif" }}>
            Australian Heritage
          </a>
          <span style={{ color: "#3d2e1e" }}>|</span>
          <span style={{ color: "#8a7055", fontSize: 12, letterSpacing: "0.1em" }}>Discovery Map</span>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <button className={`nav-btn ${sidePanel === "list" ? "on" : ""}`} onClick={() => setSidePanel("list")}>Places</button>
          <button className={`nav-btn ${sidePanel === "trails" ? "on" : ""}`} onClick={() => setSidePanel("trails")}>Heritage Trails</button>
          <div style={{ width: 1, height: 16, background: "#2a1f14", margin: "0 8px" }} />
          <span style={{ fontSize: 11, color: "#4a3825", letterSpacing: "0.08em" }}>{TOWNS.length} PLACES MAPPED</span>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* ── SIDE PANEL ── */}
        <div style={{
          width: 300, background: "#120e0a",
          borderRight: "1px solid #2a1f14",
          display: "flex", flexDirection: "column", flexShrink: 0,
          overflowY: "hidden",
        }}>

          {sidePanel === "list" ? (
            <>
              {/* Search & filters */}
              <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid #1e1610", flexShrink: 0 }}>
                <div style={{ position: "relative", marginBottom: 10 }}>
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search places..."
                    style={{
                      width: "100%", padding: "8px 10px 8px 32px",
                      background: "#1a1410", border: "1px solid #2a1f14",
                      borderRadius: 2, fontFamily: "Georgia, serif",
                      fontSize: 13, color: "#f5f0e8", outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                  <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#4a3825", fontSize: 13 }}>⌕</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {states.map(s => (
                    <button key={s} className={`filter-chip ${activeFilter === s ? "on" : ""}`} onClick={() => setActiveFilter(s)}>
                      {s === "all" ? "All" : s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active trail indicator */}
              {activeTrail && currentTrail && (
                <div style={{
                  padding: "10px 16px", background: "#1e1610",
                  borderBottom: "1px solid #2a1f14",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  flexShrink: 0,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: currentTrail.color, fontSize: 14 }}>{currentTrail.icon}</span>
                    <span style={{ fontSize: 12, color: "#c4a882" }}>{currentTrail.name}</span>
                  </div>
                  <button onClick={() => setActiveTrail(null)} style={{ background: "none", border: "none", color: "#6a5a45", cursor: "pointer", fontSize: 14 }}>✕</button>
                </div>
              )}

              {/* Places count */}
              <div style={{ padding: "8px 16px 4px", fontSize: 10, letterSpacing: "0.12em", color: "#4a3825", textTransform: "uppercase", flexShrink: 0 }}>
                {filteredTowns.length} places
              </div>

              {/* List */}
              <div style={{ flex: 1, overflowY: "auto" }}>
                {filteredTowns.map(town => {
                  const cat = CATEGORY_META[town.category] || CATEGORY_META.gold;
                  return (
                    <div key={town.id} className={`town-row ${selectedTown?.id === town.id ? "active" : ""}`} onClick={() => flyToTown(town)}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: cat.color, flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, color: "#f5f0e8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{town.name}</div>
                        <div style={{ fontSize: 11, color: "#6a5a45", marginTop: 1 }}>{town.state} · {cat.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            /* ── TRAILS PANEL ── */
            <div style={{ flex: 1, overflowY: "auto", padding: "12px 0" }}>
              <div style={{ padding: "4px 16px 12px", fontSize: 10, letterSpacing: "0.15em", color: "#4a3825", textTransform: "uppercase" }}>
                Curated Heritage Journeys
              </div>
              {HERITAGE_TRAILS.map(trail => (
                <div
                  key={trail.id}
                  className={`trail-card ${activeTrail === trail.id ? "active" : ""}`}
                  onClick={() => {
                    setActiveTrail(activeTrail === trail.id ? null : trail.id);
                    setSidePanel("list");
                  }}
                  style={{ borderLeft: `3px solid ${activeTrail === trail.id ? trail.color : "transparent"}` }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 18, color: trail.color }}>{trail.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, color: "#f5f0e8" }}>{trail.name}</div>
                      <div style={{ fontSize: 10, color: "#6a5a45", letterSpacing: "0.08em", marginTop: 2 }}>{trail.subtitle}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 12, color: "#6a5a45", lineHeight: 1.6, margin: "0 0 8px 0" }}>
                    {trail.description.slice(0, 120)}…
                  </p>
                  <div style={{ fontSize: 11, color: trail.color, letterSpacing: "0.08em" }}>
                    {trail.towns.length} destinations {activeTrail === trail.id ? "· Active ✓" : "· Explore →"}
                  </div>
                </div>
              ))}

              <div style={{ padding: "20px 16px", borderTop: "1px solid #1e1610", marginTop: 8 }}>
                <div style={{ fontSize: 11, color: "#4a3825", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Coming Soon</div>
                {["The Pastoral Frontier", "Federation Cities", "Colonial Ports"].map(name => (
                  <div key={name} style={{ fontSize: 13, color: "#3d2e1e", padding: "6px 0", borderBottom: "1px solid #1e1610" }}>{name}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── MAP ── */}
        <div style={{ flex: 1, position: "relative" }}>
          <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

          {/* Category legend */}
          <div style={{
            position: "absolute", bottom: 32, left: 16,
            background: "rgba(15,12,9,0.92)", backdropFilter: "blur(8px)",
            padding: "12px 16px", border: "1px solid #2a1f14",
            borderRadius: 2,
          }}>
            <div style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#4a3825", marginBottom: 8 }}>Heritage Type</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px 16px" }}>
              {Object.entries(CATEGORY_META).slice(0, 5).map(([key, meta]) => (
                <div
                  key={key}
                  style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}
                  onClick={() => setActiveFilter(activeFilter === key ? "all" : key)}
                >
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: meta.color,
                    border: activeFilter === key ? `2px solid #f5f0e8` : "1.5px solid rgba(255,255,255,0.3)",
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 11, color: activeFilter === key ? "#f5f0e8" : "#6a5a45" }}>{meta.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trail indicator on map */}
          {activeTrail && currentTrail && (
            <div style={{
              position: "absolute", top: 16, left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(15,12,9,0.92)", backdropFilter: "blur(8px)",
              padding: "8px 20px", border: `1px solid ${currentTrail.color}`,
              borderRadius: 2, display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ color: currentTrail.color }}>{currentTrail.icon}</span>
              <span style={{ fontSize: 13, color: "#f5f0e8", fontFamily: "Georgia, serif" }}>{currentTrail.name}</span>
              <span style={{ color: "#6a5a45", fontSize: 12 }}>· {currentTrail.towns.length} stops</span>
              <button onClick={() => setActiveTrail(null)} style={{ background: "none", border: "none", color: "#6a5a45", cursor: "pointer", marginLeft: 4, fontSize: 14 }}>✕</button>
            </div>
          )}
        </div>

        {/* ── DETAIL PANEL ── */}
        {selectedTown && (
          <div className="panel-in" style={{
            width: 360, background: "#0f0c09",
            borderLeft: "1px solid #2a1f14",
            display: "flex", flexDirection: "column",
            overflowY: "hidden", flexShrink: 0,
          }}>
            {/* Town header */}
            <div style={{
              background: "#1a1410",
              borderBottom: "1px solid #2a1f14",
              padding: "20px 20px 16px",
              flexShrink: 0,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: CATEGORY_META[selectedTown.category]?.color || "#c4a882",
                      flexShrink: 0,
                    }} />
                    <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6a5a45" }}>
                      {CATEGORY_META[selectedTown.category]?.label} · {selectedTown.state}
                    </span>
                  </div>
                  <h2 style={{
                    margin: 0, fontSize: 28, fontWeight: 400,
                    color: "#f5f0e8", fontFamily: "'Playfair Display', Georgia, serif",
                    lineHeight: 1.1,
                  }}>{selectedTown.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedTown(null)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#4a3825", fontSize: 18, lineHeight: 1, padding: 4, flexShrink: 0 }}
                >✕</button>
              </div>
              <p style={{ margin: "12px 0 0", fontSize: 13, lineHeight: 1.7, color: "#8a7055", fontFamily: "'EB Garamond', Georgia, serif", fontStyle: "italic" }}>
                {selectedTown.description}
              </p>
            </div>

            {/* Indigenous toggle */}
            <div style={{
              padding: "10px 20px",
              background: showIndigenous ? "#0d1a10" : "transparent",
              borderBottom: "1px solid #1e1610",
              flexShrink: 0,
            }}>
              <button
                onClick={() => setShowIndigenous(!showIndigenous)}
                style={{
                  background: "none", border: `1px solid ${showIndigenous ? "#4A6741" : "#2a1f14"}`,
                  color: showIndigenous ? "#7aab72" : "#4a3825",
                  padding: "6px 14px", borderRadius: 2,
                  fontFamily: "Georgia, serif", fontSize: 11,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  cursor: "pointer", transition: "all 0.2s",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                <span>⬡</span>
                {showIndigenous ? "Country & First Peoples ✓" : "First Peoples' Country"}
              </button>
              {showIndigenous && (
                <div className="fade-in" style={{ marginTop: 10, padding: "10px 12px", background: "#0a140c", border: "1px solid #1e3020", borderRadius: 2 }}>
                  <p style={{ margin: 0, fontSize: 12, lineHeight: 1.8, color: "#7aab72", fontFamily: "'EB Garamond', Georgia, serif" }}>
                    {selectedTown.indigenous}
                  </p>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #1e1610", flexShrink: 0, overflowX: "auto" }}>
              {[["heritage", "Heritage"], ["todo", "Explore"], ["events", "Events"], ["food", "Food & Stay"]].map(([key, label]) => (
                <button key={key} className={`tab-pill ${activeTab === key ? "on" : ""}`} onClick={() => setActiveTab(key)}>
                  {label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="fade-in" key={activeTab} style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
              {(selectedTown[activeTab] || []).map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                  <span style={{ color: CATEGORY_META[selectedTown.category]?.color || "#c4a882", marginTop: 3, fontSize: 10, flexShrink: 0 }}>◆</span>
                  <span style={{ fontSize: 13, color: "#c4b89a", lineHeight: 1.6, fontFamily: "'EB Garamond', Georgia, serif" }}>{item}</span>
                </div>
              ))}
              {(!selectedTown[activeTab] || selectedTown[activeTab].length === 0) && (
                <div style={{ color: "#3d2e1e", fontSize: 13, fontStyle: "italic" }}>No information available for this category.</div>
              )}
            </div>

            {/* Trail membership */}
            {HERITAGE_TRAILS.filter(t => t.towns.includes(selectedTown.id)).length > 0 && (
              <div style={{ padding: "12px 20px", borderTop: "1px solid #1e1610", flexShrink: 0 }}>
                <div style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#4a3825", marginBottom: 8 }}>Part of Trail</div>
                {HERITAGE_TRAILS.filter(t => t.towns.includes(selectedTown.id)).map(trail => (
                  <div
                    key={trail.id}
                    onClick={() => { setActiveTrail(trail.id); setSidePanel("trails"); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      cursor: "pointer", padding: "4px 0",
                      color: trail.color, fontSize: 12,
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    <span>{trail.icon}</span>
                    <span style={{ fontFamily: "Georgia, serif" }}>{trail.name}</span>
                    <span style={{ marginLeft: "auto", fontSize: 11, color: "#4a3825" }}>View trail →</span>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            <div style={{ padding: "10px 20px", borderTop: "1px solid #1e1610", flexShrink: 0 }}>
              <div style={{ fontSize: 9, letterSpacing: "0.1em", color: "#3d2e1e", textAlign: "center", textTransform: "uppercase" }}>
                Australian Heritage · Discovery Map
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
