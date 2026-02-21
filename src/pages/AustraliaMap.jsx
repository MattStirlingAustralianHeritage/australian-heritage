import { useState, useEffect, useRef } from "react";

const TOWNS = [
  { id: 1, name: "Ballarat", state: "VIC", lat: -37.5622, lng: 143.8503, type: "regional", description: "Gold rush city with extraordinary Victorian architecture and the birthplace of Australian democracy.", heritage: ["Sovereign Hill", "Eureka Centre", "Ballarat Botanical Gardens", "Her Majesty's Theatre"], todo: ["Sovereign Hill Living Museum", "Wildlife Park", "Art Gallery of Ballarat", "Ballarat Begonia Festival"], events: ["Ballarat Begonia Festival (March)", "Eureka Festival (December)"], food: ["Mitchell Harris Wine Bar", "Oxbow Bar & Kitchen", "Forge Pizzeria"] },
  { id: 2, name: "Bathurst", state: "NSW", lat: -33.4194, lng: 149.5778, type: "regional", description: "Australia's oldest inland city, rich with colonial history and famous for its motor racing circuit.", heritage: ["Bathurst Courthouse", "Ben Chifley's Cottage", "Bathurst Regional Art Gallery"], todo: ["Mount Panorama Circuit", "Abercrombie Caves", "Bathurst Goldfields"], events: ["Bathurst 1000 (October)", "Bathurst Winter Festival"], food: ["Rydges Mount Panorama", "Legall Patisserie"] },
  { id: 3, name: "Beechworth", state: "VIC", lat: -36.3574, lng: 146.6884, type: "small", description: "A perfectly preserved gold rush town in the Victorian Alps, famous for its granite architecture and Ned Kelly connections.", heritage: ["Beechworth Gaol", "Burke Museum", "Historic Precinct"], todo: ["Ned Kelly touring route", "Beechworth Honey", "Lake Sambell"], events: ["Beechworth Harvest Celebration", "Celtic Festival"], food: ["The Ox and Hound", "Beechworth Bakery", "Provenance Restaurant"] },
  { id: 4, name: "Broken Hill", state: "NSW", lat: -31.9505, lng: 141.4670, type: "regional", description: "The Silver City — a remote outback town that became one of the world's great mining centres.", heritage: ["Line of Lode Miners Memorial", "Palace Hotel", "Broken Hill City Art Gallery"], todo: ["Living Desert Sculptures", "Royal Flying Doctor Service", "White Cliffs"], events: ["Broken Hill Races", "Broken Hill Cultural Festival"], food: ["Alfresco Palace Hotel", "Broken Hill Musicians Club"] },
  { id: 5, name: "Castlemaine", state: "VIC", lat: -37.0686, lng: 144.2161, type: "small", description: "A creative arts hub in central Victoria with a proud gold rush heritage.", heritage: ["Castlemaine Art Museum", "Buda Historic Home", "Old Castlemaine Gaol"], todo: ["Castlemaine State Festival", "Pennyweight Flat Cemetery", "Mount Alexander"], events: ["Castlemaine State Festival (April)", "Food & Wine Festival"], food: ["The Good Table", "Bridge Hotel", "Togs Place"] },
  { id: 6, name: "Daylesford", state: "VIC", lat: -37.3462, lng: 144.1428, type: "small", description: "The spa centre of Australia with natural mineral springs and a celebrated food scene.", heritage: ["Wombat Hill Botanical Gardens", "Convent Gallery", "Lake Daylesford"], todo: ["Hepburn Springs Bathhouse", "Lavandula Swiss Italian Farm", "Sunday Market"], events: ["Daylesford Swiss Italian Festa", "ChillOut Festival"], food: ["Lake House", "Mercato", "Koukla"] },
  { id: 7, name: "Hahndorf", state: "SA", lat: -35.0318, lng: 138.8069, type: "small", description: "Australia's oldest surviving German settlement, established in 1839.", heritage: ["Hahndorf Academy", "St Paul's Lutheran Church", "Historic Main Street"], todo: ["Adelaide Hills Wine Region", "Beerenberg Farm", "The Cedars"], events: ["Hahndorf Schutzenfest", "Christmas Lights"], food: ["The Hahndorf Inn", "Haus Restaurant", "Beerenberg Strawberry Farm"] },
  { id: 8, name: "Kalgoorlie", state: "WA", lat: -30.7490, lng: 121.4660, type: "regional", description: "The Golden Mile — heart of the world's richest gold rush, still producing gold from the Super Pit.", heritage: ["Hannans North Historic Mine", "Exchange Hotel", "Golden Mile Museum"], todo: ["Super Pit Lookout", "Goldfields Arts Centre", "Racing"], events: ["Kalgoorlie Race Round", "Diggers & Dealers Mining Forum"], food: ["Top End Hotel", "Balcony Bar & Oyster Co"] },
  { id: 9, name: "Maldon", state: "VIC", lat: -36.9950, lng: 144.0676, type: "small", description: "Australia's first Notable Town — a perfectly intact gold rush settlement.", heritage: ["Historic Main Street", "Tarrangower Mine Reserve", "Maldon Cemetery"], todo: ["Victorian Goldfields Railway", "Easter Fair", "Mount Tarrangower"], events: ["Maldon Easter Fair", "Maldon Folk Festival"], food: ["Ruby's Cafe", "Maldon Hotel"] },
  { id: 10, name: "Port Fairy", state: "VIC", lat: -38.3834, lng: 142.2315, type: "small", description: "One of Victoria's best-preserved 19th century towns on the Shipwreck Coast.", heritage: ["Caledonian Inn", "Griffiths Island Lighthouse", "Historic Precinct"], todo: ["Shipwreck Trail", "Tower Hill Wildlife Reserve", "Mahogany Ship site"], events: ["Port Fairy Folk Festival (March)", "Spring Music Festival"], food: ["Merrijig Kitchen", "Coffin Sally", "Wishart's Hotel"] },
  { id: 11, name: "Ross", state: "TAS", lat: -42.0222, lng: 147.4934, type: "small", description: "A perfectly preserved colonial village centred on its magnificent 1836 sandstone bridge.", heritage: ["Ross Bridge", "Female Factory Historic Site", "St John's Church"], todo: ["Tasmanian Wool Centre", "Coal Valley Vineyard", "Midlands Highway drive"], events: ["Ross Village Fair", "Tasmanian Craft Fair"], food: ["Man-O-Ross Hotel", "Ross Bakery Inn"] },
  { id: 12, name: "Silverton", state: "NSW", lat: -31.8839, lng: 141.2146, type: "small", description: "A ghost town that refuses to die — a legendary outback art colony and film location.", heritage: ["Silverton Hotel", "Silverton Gaol Museum", "Mad Max Museum"], todo: ["Silverton art galleries", "Penrose Park sculptures", "Mundi Mundi Plain lookout"], events: ["Silverton Art Exhibition", "Broken Heel Festival"], food: ["Silverton Hotel", "Penrose Park Cafe"] },
  { id: 13, name: "Tamworth", state: "NSW", lat: -31.0927, lng: 150.9320, type: "regional", description: "The country music capital of Australia.", heritage: ["Hands of Fame Park", "Tamworth Power Station Museum", "Bicentennial Park"], todo: ["Country Music Festival", "Big Golden Guitar", "Powerstation Museum"], events: ["Tamworth Country Music Festival (January)", "Australian Celtic Festival"], food: ["Switch Espresso"] },
  { id: 14, name: "Toowoomba", state: "QLD", lat: -27.5598, lng: 151.9507, type: "regional", description: "The Garden City of Queensland with magnificent parks and heritage buildings.", heritage: ["Cobb & Co Museum", "Empire Theatre", "Toowoomba Regional Art Gallery"], todo: ["Carnival of Flowers", "Drayton Racecourse", "Picnic Point"], events: ["Carnival of Flowers (September)", "Toowoomba Show"], food: ["Fitzy's", "The Spotted Cow", "Gip's Restaurant"] },
  { id: 15, name: "York", state: "WA", lat: -31.8862, lng: 116.7691, type: "small", description: "Western Australia's oldest inland town, a treasure chest of colonial architecture.", heritage: ["York Town Hall", "York Motor Museum", "Residency Museum"], todo: ["Avon Descent (August)", "York Film Festival", "Faversham House"], events: ["York Jazz Festival", "Avon Descent (August)"], food: ["Settlers House", "York Mill Cafe"] },
  { id: 16, name: "Charters Towers", state: "QLD", lat: -20.0833, lng: 146.2667, type: "regional", description: "Once one of Australia's richest gold mining cities, Charters Towers boasts extraordinary Victorian architecture and a fascinating history as a cosmopolitan outback city.", heritage: ["Stock Exchange Arcade", "Ay Ot Lookout", "World Theatre", "Venus Gold Battery"], todo: ["Gold rush walking tour", "Explore the historic arcade", "Visit the Venus Battery"] },
{ id: 17, name: "Gulgong", state: "NSW", lat: -32.3667, lng: 149.5333, type: "small", description: "A perfectly preserved gold rush town that inspired Henry Lawson and once appeared on the Australian ten dollar note.", heritage: ["Henry Lawson Centre", "Gulgong Pioneer Museum", "Historic main street"], todo: ["Walk the heritage streetscape", "Visit the Pioneer Museum", "Henry Lawson country tour"] },
{ id: 18, name: "Sovereign Hill", state: "VIC", lat: -37.5667, lng: 143.8500, type: "small", description: "The living museum township of Ballarat's gold rush era, one of Australia's premier heritage experiences.", heritage: ["Gold diggings", "Red Hill Gully Diggings", "Main Street shopfronts"], todo: ["Pan for gold", "Watch the gold pour", "Sound and Light show"] },
{ id: 19, name: "Hill End", state: "NSW", lat: -33.0333, lng: 149.4167, type: "small", description: "A ghost town that once had 8,000 residents during the gold rush and is now a perfectly frozen piece of 19th century Australia.", heritage: ["Royal Hotel", "Holtermann Nugget site", "Hill End Historic Site"], todo: ["Fossick for gold", "Photography tour", "Explore the cemetery"] },
{ id: 20, name: "Queenscliff", state: "VIC", lat: -38.2667, lng: 144.6667, type: "small", description: "A grand Victorian seaside town with magnificent 19th century hotels, a historic fort and one of Australia's most scenic railway journeys.", heritage: ["Fort Queenscliff", "Queenscliff Hotel", "Bellarine Railway", "Historic lighthouse"], todo: ["Tour Fort Queenscliff", "Ride the steam train", "Walk the historic pier"] },
{ id: 21, name: "Port Fairy", state: "VIC", lat: -38.3834, lng: 142.2315, type: "small", description: "One of Victoria's best preserved 19th century coastal towns with a rich maritime heritage and beautiful bluestone buildings.", heritage: ["Caledonian Inn", "Griffiths Island Lighthouse", "Historic Precinct"], todo: ["Walk the heritage trail", "Visit Griffiths Island", "Explore the wharf precinct"] },
{ id: 22, name: "Strahan", state: "TAS", lat: -42.1500, lng: 145.3167, type: "small", description: "A remote west coast town that served as the gateway to the wild southwest and was at the centre of the Franklin Dam controversy.", heritage: ["Customs House", "Union Steam Ship Company Building", "Regatta Point"], todo: ["Gordon River cruise", "West Coast Wilderness Railway", "Visit the Visitor Centre"] },
{ id: 23, name: "Stanley", state: "TAS", lat: -40.7667, lng: 145.2833, type: "small", description: "A stunning historic town at the base of The Nut, one of Tasmania's most photogenic destinations with rich colonial history.", heritage: ["The Nut", "Joe Lyons Cottage", "Van Diemen's Land Company Store"], todo: ["Climb The Nut", "Visit Joe Lyons' birthplace", "Walk the historic town"] },
{ id: 24, name: "Richmond", state: "TAS", lat: -42.7333, lng: 147.4333, type: "small", description: "Australia's most complete Georgian village, with the oldest Catholic church and oldest bridge still in use in Australia.", heritage: ["Richmond Bridge", "St John's Church", "Richmond Gaol", "Old Post Office"], todo: ["Walk the historic village", "Visit Richmond Gaol", "Cross the convict-built bridge"] },
{ id: 25, name: "Oatlands", state: "TAS", lat: -42.3000, lng: 147.3667, type: "small", description: "Home to the greatest collection of Georgian architecture in the Southern Hemisphere, with over 150 historic sandstone buildings.", heritage: ["Callington Mill", "Courthouse", "St Peter's Church", "Georgian streetscape"], todo: ["Tour Callington Mill", "Walk the heritage trail", "Photography of Georgian buildings"] },
{ id: 26, name: "Cooktown", state: "QLD", lat: -15.4667, lng: 145.2500, type: "small", description: "Where Captain Cook beached the Endeavour in 1770 for repairs, marking the first prolonged contact between Europeans and Aboriginal Australians.", heritage: ["James Cook Museum", "Grassy Hill Lighthouse", "Cooktown Cemetery"], todo: ["Visit the James Cook Museum", "Climb Grassy Hill", "Explore the botanical gardens"] },
{ id: 27, name: "Clunes", state: "VIC", lat: -37.2964, lng: 143.7853, type: "small", description: "The site of Victoria's first gold discovery in 1851, now a beautifully preserved gold rush town famous for its bookshops and heritage streetscape.", heritage: ["Town Hall", "Bank of Australasia", "St Paul's Church", "Historic main street"], todo: ["Clunes Booktown Festival", "Heritage walk", "Visit the museum"] },
{ id: 28, name: "Rutherglen", state: "VIC", lat: -36.0500, lng: 146.4667, type: "small", description: "Victoria's historic wine capital with a heritage streetscape dating to the gold rush era and a winemaking tradition stretching back to the 1860s.", heritage: ["Historic main street", "St Clement's Church", "Wahgunyah heritage precinct"], todo: ["Wine tasting tour", "Heritage walk", "Visit the wine museum"] },
{ id: 29, name: "Yass", state: "NSW", lat: -34.8333, lng: 148.9167, type: "small", description: "A gracious NSW Southern Tablelands town with a rich pastoral history, fine colonial buildings and connections to Hamilton Hume.", heritage: ["Hamilton Hume Museum", "St Clement's Church", "Cooma Cottage"], todo: ["Visit Cooma Cottage", "Heritage walk", "Explore the antique shops"] },
{ id: 30, name: "Goulburn", state: "NSW", lat: -34.7500, lng: 149.7167, type: "regional", description: "Australia's first inland city, a grand colonial town on the Southern Tablelands with magnificent public buildings and a rich pastoral heritage.", heritage: ["Goulburn Courthouse", "St Saviour's Cathedral", "Rocky Hill War Memorial", "The Big Merino"], todo: ["Tour the courthouse", "Rocky Hill lookout", "Visit the historic cemetery"] },
{ id: 31, name: "Armidale", state: "NSW", lat: -30.5167, lng: 151.6667, type: "regional", description: "A sophisticated New England university city with a remarkable collection of Victorian and Federation era architecture and two cathedrals.", heritage: ["St Peter's Cathedral", "New England Regional Art Museum", "Armidale Folk Museum"], todo: ["Cathedral tour", "Visit the art museum", "Autumn leaves drive"] },
{ id: 32, name: "Mudgee", state: "NSW", lat: -32.5833, lng: 149.5833, type: "regional", description: "A beautiful colonial town in the central west, birthplace of Henry Lawson and now one of NSW's premier wine regions.", heritage: ["Colonial streetscape", "Mudgee Museum", "St Mary's Church"], todo: ["Wine trail", "Heritage walk", "Visit Henry Lawson's birthplace at Grenfell nearby"] },
{ id: 33, name: "Braidwood", state: "NSW", lat: -35.4500, lng: 149.8000, type: "small", description: "One of NSW's most intact colonial towns, classified entirely by the National Trust, with a wonderful collection of Georgian and Victorian buildings.", heritage: ["St Andrew's Church", "Braidwood Museum", "Historic main street", "Police Station"], todo: ["Heritage walk", "Antique shopping", "Visit the museum"] },
{ id: 34, name: "Cooma", state: "NSW", lat: -36.2333, lng: 149.1167, type: "regional", description: "Gateway to the Snowy Mountains and headquarters of the great Snowy Mountains Hydro-Electric Scheme, with a rich multicultural post-war history.", heritage: ["Snowy Mountains Scheme Museum", "Lambie Street heritage precinct", "St Paul's Church"], todo: ["Visit the Snowy Hydro Discovery Centre", "Heritage walk", "Drive the Snowy Mountains Highway"] },
{ id: 35, name: "Broken Hill", state: "NSW", lat: -31.9500, lng: 141.4670, type: "regional", description: "The Silver City — a remote outback mining city that bankrolled Australia's development and gave birth to BHP, with a remarkable artistic heritage.", heritage: ["Line of Lode Miners Memorial", "Palace Hotel", "Pro Hart Gallery", "Broken Hill Regional Art Gallery"], todo: ["Line of Lode tour", "Visit the Palace Hotel", "Outback art galleries"] },
{ id: 36, name: "Kimberley", state: "WA", lat: -17.9167, lng: 126.0000, type: "regional", description: "One of Australia's last great wilderness frontiers, with ancient Devonian reef gorges, Bungle Bungle ranges and extraordinary Wandjina rock art.", heritage: ["Purnululu National Park", "Geikie Gorge", "Windjana Gorge", "Boab Prison Tree"], todo: ["Bungle Bungle helicopter tour", "Gibb River Road drive", "Ancient rock art tours"] },
{ id: 37, name: "Halls Creek", state: "WA", lat: -18.2333, lng: 127.6667, type: "small", description: "Site of Western Australia's first gold rush in 1885, with the old townsite ruins and the remarkable natural wonder of China Wall nearby.", heritage: ["Old Halls Creek ruins", "China Wall", "Caroline Pool"], todo: ["Visit old townsite", "China Wall walk", "Explore the Wolfe Creek crater"] },
{ id: 38, name: "Kalgoorlie", state: "WA", lat: -30.7489, lng: 121.4658, type: "regional", description: "The heart of the Western Australian goldfields, with magnificent Federation era buildings, the legendary Golden Mile and the world's largest open cut gold mine.", heritage: ["Exchange Hotel", "York Hotel", "Museum of the Goldfields", "Hannan's North Historic Mine"], todo: ["Super Pit lookout", "Goldfields museum", "Heritage walk on Hannan Street"] },
{ id: 39, name: "Northam", state: "WA", lat: -31.6500, lng: 116.6667, type: "small", description: "The historic heart of the Western Australian wheatbelt, with a fine collection of Federation architecture and the state's oldest inland town.", heritage: ["Morby Cottage", "St John's Church", "Suspension Bridge", "Old Railway Station"], todo: ["Heritage walk", "Visit Morby Cottage", "Avon River walk"] },
{ id: 40, name: "York", state: "WA", lat: -31.8862, lng: 116.7691, type: "small", description: "Western Australia's oldest inland town, a treasure chest of colonial architecture including the extraordinary Town Hall and historic Residency Museum.", heritage: ["York Town Hall", "York Motor Museum", "Residency Museum", "Avon Descent"], todo: ["Heritage walk", "Visit the motor museum", "Explore the antique shops"] },
{ id: 41, name: "Burra", state: "SA", lat: -33.6833, lng: 138.9333, type: "small", description: "A copper mining town frozen in time, where Cornish miners lived in dugouts along the creek and left behind an extraordinary heritage landscape.", heritage: ["Burra Monster Mine", "Paxton Square Cottages", "Redruth Gaol", "Malowen Lowarth"], todo: ["Heritage passport trail", "Visit the monster mine", "Explore the Cornish heritage"] },
{ id: 42, name: "Robe", state: "SA", lat: -37.1667, lng: 139.7500, type: "small", description: "A picturesque historic fishing village that was once South Australia's second busiest port and saw thousands of Chinese gold seekers land to avoid the Victorian poll tax.", heritage: ["Caledonian Inn", "Customs House", "St Peter's Church", "Robe Obelisk"], todo: ["Heritage walk", "Visit the Customs House", "Long Beach walk"] },
{ id: 43, name: "Kapunda", state: "SA", lat: -34.3333, lng: 138.9167, type: "small", description: "Site of Australia's first copper mine, a gracious town with a strong German Lutheran heritage and magnificent historic buildings.", heritage: ["Kapunda Mine site", "St John's Church", "Kapunda Museum", "Map the Miner statue"], todo: ["Heritage walk", "Visit the mine site", "Explore the Lutheran heritage"] },
{ id: 44, name: "Mintaro", state: "SA", lat: -33.9167, lng: 138.7333, type: "small", description: "One of Australia's most perfectly preserved 19th century villages, a National Heritage listed town that looks almost exactly as it did in the 1880s.", heritage: ["Martindale Hall", "Mintaro Maze", "St Michael's Church", "Heritage streetscape"], todo: ["Tour Martindale Hall", "Walk the heritage village", "Visit the Mintaro Slate quarry"] },
{ id: 45, name: "Hahndorf", state: "SA", lat: -35.0281, lng: 138.8117, type: "small", description: "Australia's oldest surviving German settlement in the Adelaide Hills, with a charming main street of 19th century German-style buildings.", heritage: ["The Cedars", "St Paul's Lutheran Church", "Hahndorf Academy", "Historic main street"], todo: ["Walk the main street", "Visit The Cedars", "German food and wine trail"] },
{ id: 46, name: "Longreach", state: "QLD", lat: -23.4333, lng: 144.2500, type: "regional", description: "The heart of outback Queensland, birthplace of Qantas and home to the Australian Stockman's Hall of Fame, one of Australia's great museums.", heritage: ["Australian Stockman's Hall of Fame", "Qantas Founders Museum", "Thomson River precinct"], todo: ["Visit the Stockman's Hall of Fame", "Qantas museum tour", "Sunset cruise on the Thomson"] },
{ id: 47, name: "Winton", state: "QLD", lat: -22.3833, lng: 143.0333, type: "small", description: "Where Banjo Paterson wrote Waltzing Matilda in 1895, and home to remarkable dinosaur fossils including the Australovenator wintonensis.", heritage: ["Waltzing Matilda Centre", "North Gregory Hotel", "Arno's Wall", "Australian Age of Dinosaurs"], todo: ["Visit the Waltzing Matilda Centre", "Dinosaur fossil tours", "Explore Arno's Wall"] },
{ id: 48, name: "Rockhampton", state: "QLD", lat: -23.3792, lng: 150.5100, type: "regional", description: "The beef capital of Australia, straddling the Tropic of Capricorn with a magnificent collection of Victorian and Edwardian architecture along the Fitzroy River.", heritage: ["Quay Street heritage precinct", "Rockhampton Museum of Art", "Customs House", "St Joseph's Cathedral"], todo: ["Quay Street heritage walk", "Visit the art museum", "Dreamtime Cultural Centre"] },
{ id: 49, name: "Maryborough", state: "QLD", lat: -25.5333, lng: 152.7000, type: "regional", description: "A grand Queensland Heritage City with one of Australia's finest collections of 19th century timber architecture and the birthplace of P.L. Travers, creator of Mary Poppins.", heritage: ["City Hall", "Bond Store Museum", "Brennan & Geraghty's Store", "Mary Poppins statue"], todo: ["Heritage walk", "Mary Poppins tour", "Visit Bond Store Museum"] },
{ id: 50, name: "Childers", state: "QLD", lat: -25.2333, lng: 152.2833, type: "small", description: "A charming Queensland heritage town with a beautifully preserved main street of late 19th century buildings set among the rolling hills of the Wide Bay hinterland.", heritage: ["Federal Hotel", "Pharmaceutical Museum", "Old Post Office", "Heritage streetscape"], todo: ["Heritage walk", "Visit the Pharmaceutical Museum", "Explore the hinterland"] },
];

const STATE_COLORS = { VIC: "#8B4513", NSW: "#2F4F4F", QLD: "#8B6914", WA: "#4A4A8A", SA: "#6B4226", TAS: "#2E5D4B", NT: "#7D3C1A" };

export default function AustraliaMap() {
  const [selectedTown, setSelectedTown] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("heritage");
  const [mapInitialized, setMapInitialized] = useState(false);
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);

  const filteredTowns = TOWNS.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.state.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || t.state === filter;
    return matchSearch && matchFilter;
  });

  useEffect(() => {
    if (mapRef.current && !mapInitialized) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(link);
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
      script.onload = () => {
        const L = window.L;
        const map = L.map(mapRef.current, { center: [-27.5, 134], zoom: 4, zoomControl: false, attributionControl: false });
        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png").addTo(map);
        L.control.zoom({ position: "bottomright" }).addTo(map);
        leafletMapRef.current = map;
        TOWNS.forEach(town => {
          const color = STATE_COLORS[town.state] || "#8B4513";
          const marker = L.circleMarker([town.lat, town.lng], { radius: town.type === "regional" ? 9 : 7, fillColor: color, color: "#fff", weight: 2, opacity: 1, fillOpacity: 0.85 }).addTo(map);
          marker.bindTooltip(town.name, { permanent: false, direction: "top", className: "heritage-tooltip" });
          marker.on("click", () => { setSelectedTown(town); setActiveTab("heritage"); });
          markersRef.current.push({ marker, town });
        });
        setMapInitialized(true);
      };
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (!mapInitialized) return;
    markersRef.current.forEach(({ marker, town }) => {
      const visible = filteredTowns.find(t => t.id === town.id);
      marker.setStyle({ opacity: visible ? 1 : 0.15, fillOpacity: visible ? 0.85 : 0.1 });
    });
  }, [filteredTowns, mapInitialized]);

  const flyToTown = (town) => {
    if (leafletMapRef.current) leafletMapRef.current.flyTo([town.lat, town.lng], 10, { duration: 1.2 });
    setSelectedTown(town);
    setActiveTab("heritage");
  };

  const states = ["all", "NSW", "VIC", "QLD", "WA", "SA", "TAS"];

  return (
    <div style={{ fontFamily: "Georgia, serif", height: "100vh", display: "flex", flexDirection: "column", background: "#f5f0e8", color: "#2a1f0f" }}>
      <style>{`.heritage-tooltip { background: #2a1f0f; border: none; color: #f5f0e8; font-family: Georgia, serif; font-size: 12px; padding: 4px 10px; border-radius: 2px; } .heritage-tooltip::before { border-top-color: #2a1f0f !important; } .leaflet-control-zoom { border: none !important; } .leaflet-control-zoom a { background: #2a1f0f !important; color: #f5f0e8 !important; border: none !important; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #c4a882; } .tab-btn { background: none; border: none; cursor: pointer; font-family: Georgia, serif; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; padding: 8px 14px; color: #8a7055; transition: all 0.2s; border-bottom: 2px solid transparent; } .tab-btn.active { color: #2a1f0f; border-bottom-color: #8B4513; } .town-item { padding: 10px 12px; cursor: pointer; border-left: 3px solid transparent; transition: all 0.15s; display: flex; align-items: center; gap: 10px; } .town-item:hover { background: #ede5d5; border-left-color: #c4a882; } .town-item.selected { background: #e8dcc8; border-left-color: #8B4513; } @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } } .panel-animate { animation: slideIn 0.3s ease; } @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .fade-up { animation: fadeUp 0.4s ease; }`}</style>
     <div style={{ background: "#2a1f0f", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
  <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
    <a href="https://www.australianheritage.au" style={{ color: "#f5f0e8", fontSize: 20, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>Australian Heritage</a>
    <span style={{ color: "#c4a882", fontSize: 13, letterSpacing: "0.06em" }}>Discovery Map</span>
  </div>
  <div style={{ color: "#8a7055", fontSize: 12, letterSpacing: "0.08em" }}>{TOWNS.length} REMARKABLE PLACES</div>
</div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{ width: 280, background: "#faf6ef", borderRight: "1px solid #e0d5c0", display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <div style={{ padding: "16px 14px 12px", borderBottom: "1px solid #e0d5c0" }}>
            <div style={{ position: "relative" }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search towns & cities..." style={{ width: "100%", padding: "9px 12px 9px 34px", background: "#f5f0e8", border: "1px solid #d4c8a8", borderRadius: 3, fontFamily: "Georgia, serif", fontSize: 13, color: "#2a1f0f", outline: "none", boxSizing: "border-box" }} />
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#8a7055", fontSize: 14 }}>⌕</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 10 }}>
              {states.map(s => <button key={s} onClick={() => setFilter(s)} style={{ padding: "3px 8px", background: filter === s ? "#2a1f0f" : "#ede5d5", color: filter === s ? "#f5f0e8" : "#6a5540", border: "none", borderRadius: 2, cursor: "pointer", fontSize: 11, letterSpacing: "0.06em", fontFamily: "Georgia, serif", transition: "all 0.15s" }}>{s === "all" ? "ALL" : s}</button>)}
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
            <div style={{ padding: "4px 14px 8px", fontSize: 10, letterSpacing: "0.12em", color: "#8a7055", textTransform: "uppercase" }}>{filteredTowns.length} places</div>
            {filteredTowns.map(town => (
              <div key={town.id} className={`town-item ${selectedTown?.id === town.id ? "selected" : ""}`} onClick={() => flyToTown(town)}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: "#2a1f0f", marginBottom: 2 }}>{town.name}</div>
                  <div style={{ fontSize: 11, color: "#8a7055" }}>{town.state} · {town.type}</div>
                </div>
                <div style={{ display: "inline-block", padding: "2px 8px", borderRadius: 2, fontSize: 11, background: (STATE_COLORS[town.state] || "#8B4513") + "22", color: STATE_COLORS[town.state] || "#8B4513" }}>{town.state}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, position: "relative" }}>
          <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
          {selectedTown && (
            <div className="panel-animate" style={{ position: "absolute", top: 16, right: 16, width: 340, background: "#faf6ef", borderRadius: 4, boxShadow: "0 4px 30px rgba(0,0,0,0.2)", overflow: "hidden", border: "1px solid #e0d5c0", maxHeight: "calc(100vh - 120px)", display: "flex", flexDirection: "column" }}>
              <div style={{ background: "#2a1f0f", padding: "16px 16px 14px", flexShrink: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h2 style={{ margin: 0, color: "#f5f0e8", fontSize: 22, fontWeight: "normal" }}>{selectedTown.name}</h2>
                    <div style={{ color: "#c4a882", fontSize: 12, letterSpacing: "0.1em", marginTop: 4, textTransform: "uppercase" }}>{selectedTown.state} · {selectedTown.type === "regional" ? "Regional City" : "Historic Town"}</div>
                  </div>
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "#c4a882", fontSize: 18 }} onClick={() => setSelectedTown(null)}>✕</button>
                </div>
              </div>
              <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid #e0d5c0", flexShrink: 0 }}>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "#4a3825", fontStyle: "italic" }}>{selectedTown.description}</p>
              </div>
              <div style={{ display: "flex", borderBottom: "1px solid #e0d5c0", flexShrink: 0 }}>
                {[["heritage", "Heritage"], ["todo", "Things To Do"], ["events", "Events"], ["food", "Food & Stay"]].map(([key, label]) => (
                  <button key={key} className={`tab-btn ${activeTab === key ? "active" : ""}`} onClick={() => setActiveTab(key)}>{label}</button>
                ))}
              </div>
              <div className="fade-up" key={activeTab} style={{ padding: "14px 16px", overflowY: "auto", flex: 1 }}>
                {(activeTab === "heritage" ? selectedTown.heritage : activeTab === "todo" ? selectedTown.todo : activeTab === "events" ? selectedTown.events : selectedTown.food).map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#8B4513", marginTop: 2, flexShrink: 0 }}>◆</span>
                    <span style={{ fontSize: 13, color: "#2a1f0f", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: "10px 16px", borderTop: "1px solid #e0d5c0", background: "#f0e8d6", flexShrink: 0 }}>
                <div style={{ fontSize: 10, color: "#8a7055", letterSpacing: "0.1em", textAlign: "center", textTransform: "uppercase" }}>Data sourced from heritage registers & tourism boards</div>
              </div>
            </div>
          )}
          <div style={{ position: "absolute", bottom: 16, left: 16, background: "rgba(250,246,239,0.95)", padding: "10px 14px", borderRadius: 3, border: "1px solid #e0d5c0" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a7055", marginBottom: 8 }}>States & Territories</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px" }}>
              {Object.entries(STATE_COLORS).map(([state, color]) => (
                <div key={state} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, border: "1.5px solid #fff" }} />
                  <span style={{ fontSize: 11, color: "#4a3825" }}>{state}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
