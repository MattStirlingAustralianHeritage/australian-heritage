import { useState, useEffect, useRef, useCallback } from "react";

<<<<<<< HEAD
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
=======
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
{ id: 51, name: "Cradle Mountain", state: "TAS", lat: -41.6386, lng: 145.9311, type: "nature", description: "One of Australia's most iconic wilderness landscapes, with the mirror-still Dove Lake reflecting the jagged dolerite peaks of Cradle Mountain.", heritage: ["Dove Lake Circuit", "Waldheim Chalet", "Enchanted Walk"], todo: ["Dove Lake Circuit walk", "Sunrise at the summit", "Platypus spotting at dusk"] },
{ id: 52, name: "Bay of Fires", state: "TAS", lat: -41.0000, lng: 148.2667, type: "nature", description: "A stunning stretch of coastline with brilliant white silica beaches, vivid orange lichen-covered granite boulders and crystal clear turquoise water.", heritage: ["Eddystone Point Lighthouse", "Aboriginal middens", "Bay of Fires Conservation Area"], todo: ["Beach walk", "Snorkelling", "Bay of Fires Lodge Walk"] },
{ id: 53, name: "Wineglass Bay", state: "TAS", lat: -42.1500, lng: 148.3000, type: "nature", description: "Consistently rated one of the world's most beautiful beaches, a perfect crescent of white sand in the Freycinet National Park.", heritage: ["Freycinet National Park", "Hazards Mountains", "Freycinet Peninsula"], todo: ["Wineglass Bay lookout walk", "Sea kayaking", "Hazards Beach circuit"] },
{ id: 54, name: "Purnululu", state: "WA", lat: -17.5000, lng: 128.4000, type: "nature", description: "The Bungle Bungle Range — extraordinary beehive-shaped sandstone towers striped in orange and black, one of the world's great geological wonders.", heritage: ["Bungle Bungle Range", "Cathedral Gorge", "Echidna Chasm", "Piccaninny Creek"], todo: ["Cathedral Gorge walk", "Echidna Chasm", "Helicopter flight over the domes"] },
{ id: 55, name: "Cape Le Grand", state: "WA", lat: -33.9667, lng: 122.1500, type: "nature", description: "Pristine white quartzite beaches and dramatic granite peaks east of Esperance, with some of the whitest sand and clearest water in Australia.", heritage: ["Lucky Bay", "Hellfire Bay", "Frenchman Peak", "Cape Le Grand National Park"], todo: ["Lucky Bay beach", "Frenchman Peak climb", "Whale watching"] },
{ id: 56, name: "Karijini", state: "WA", lat: -22.4333, lng: 118.3000, type: "nature", description: "Ancient gorges carved through the Hamersley Range reveal 2.5 billion year old rock in one of Australia's most spectacular national parks.", heritage: ["Hancock Gorge", "Weano Gorge", "Fortescue Falls", "Fern Pool"], todo: ["Gorge swimming", "Hancock Gorge walk", "Fortescue Falls"] },
{ id: 57, name: "Cape Range", state: "WA", lat: -22.0000, lng: 113.9667, type: "nature", description: "A limestone ridge dropping into the turquoise waters of Ningaloo Reef, where you can swim with whale sharks in the morning and spot wallabies at dusk.", heritage: ["Ningaloo Reef", "Yardie Creek", "Mandu Mandu Gorge", "Turquoise Bay"], todo: ["Swim with whale sharks", "Turquoise Bay snorkel", "Yardie Creek boat tour"] },
{ id: 58, name: "The Pinnacles", state: "WA", lat: -30.6000, lng: 115.1500, type: "nature", description: "Thousands of ancient limestone pillars rising from the golden desert sand of Nambung National Park, creating an eerie alien landscape.", heritage: ["Nambung National Park", "Pinnacles Desert", "Kangaroo Point lookout"], todo: ["Sunset drive through the Pinnacles", "Sandboarding at Lancelin", "Wildflower season visit"] },
{ id: 59, name: "Horizontal Falls", state: "WA", lat: -16.3833, lng: 124.3833, type: "nature", description: "One of the world's great natural wonders — massive tidal surges forcing through narrow coastal gorges in the remote Kimberley, described by David Attenborough as a 'freak of nature'.", heritage: ["Talbot Bay", "McLarty Range", "Buccaneer Archipelago"], todo: ["Speedboat through the falls", "Seaplane tour", "Fishing the tidal waters"] },
{ id: 60, name: "Uluru", state: "NT", lat: -25.3444, lng: 131.0369, type: "nature", description: "Australia's most sacred and iconic natural landmark — a vast sandstone monolith rising from the red desert, its colours shifting dramatically at sunrise and sunset.", heritage: ["Uluru-Kata Tjuta National Park", "Kata Tjuta", "Walpa Gorge", "Mutitjulu Waterhole"], todo: ["Base walk at sunrise", "Kata Tjuta Valley of the Winds", "Cultural centre visit"] },
{ id: 61, name: "Kata Tjuta", state: "NT", lat: -25.2997, lng: 130.7316, type: "nature", description: "The 36 domed rock formations of Kata Tjuta (The Olgas) are arguably even more dramatic than Uluru, rising steeply from the desert plain.", heritage: ["Valley of the Winds", "Walpa Gorge", "Kata Tjuta National Park"], todo: ["Valley of the Winds walk", "Walpa Gorge at sunset", "Dawn viewing area"] },
{ id: 62, name: "Litchfield National Park", state: "NT", lat: -13.1000, lng: 130.6667, type: "nature", description: "A stunning Top End wilderness with towering waterfalls, crystal swimming holes, magnetic termite mounds and lush monsoon rainforest.", heritage: ["Wangi Falls", "Florence Falls", "Magnetic termite mounds", "Lost City"], todo: ["Wangi Falls swim", "Florence Falls plunge pool", "Magnetic termite mound walk"] },
{ id: 63, name: "Katherine Gorge", state: "NT", lat: -14.2994, lng: 132.4631, type: "nature", description: "Nitmiluk National Park's magnificent series of 13 sandstone gorges carved by the Katherine River, a place of deep spiritual significance to the Jawoyn people.", heritage: ["Nitmiluk National Park", "Katherine Hot Springs", "Jawoyn cultural sites"], todo: ["Gorge cruise", "Kayaking", "Edith Falls walk"] },
{ id: 64, name: "Daintree Rainforest", state: "QLD", lat: -16.1667, lng: 145.4167, type: "nature", description: "The world's oldest tropical rainforest, older than the Amazon, where the forest meets the reef in one of the planet's most biodiverse landscapes.", heritage: ["Cape Tribulation", "Mossman Gorge", "Daintree National Park", "Thornton Beach"], todo: ["Mossman Gorge walk", "Cape Tribulation beach", "Nighttime wildlife tour"] },
{ id: 65, name: "Great Barrier Reef", state: "QLD", lat: -18.2861, lng: 147.7000, type: "nature", description: "The world's largest coral reef system, stretching 2,300km along the Queensland coast and visible from space — one of the seven natural wonders of the world.", heritage: ["Coral Sea Marine Park", "Whitsunday Islands", "Lady Elliot Island", "Ribbon Reefs"], todo: ["Snorkelling", "Live-aboard diving", "Scenic flight over Heart Reef"] },
{ id: 66, name: "Whitsunday Islands", state: "QLD", lat: -20.0833, lng: 148.9667, type: "nature", description: "74 islands of outstanding beauty in the heart of the Great Barrier Reef Marine Park, with Whitehaven Beach regarded as one of the world's finest.", heritage: ["Whitehaven Beach", "Hill Inlet", "Hook Island", "Hardy Reef"], todo: ["Whitehaven Beach visit", "Hill Inlet lookout", "Sailing the Whitsundays"] },
{ id: 67, name: "Carnarvon Gorge", state: "QLD", lat: -25.0833, lng: 148.2333, type: "nature", description: "A spectacular sandstone gorge in outback Queensland with ancient Aboriginal rock art, hidden side gorges and crystal clear creek walks.", heritage: ["Carnarvon Gorge National Park", "Art Gallery rock art site", "Cathedral Cave", "Moss Garden"], todo: ["Main gorge walk", "Art Gallery Aboriginal site", "Cathedral Cave"] },
{ id: 68, name: "Cape Byron", state: "NSW", lat: -28.6333, lng: 153.6333, type: "nature", description: "Australia's most easterly point, with dramatic coastal headlands, one of the country's finest lighthouses and extraordinary whale migration viewing.", heritage: ["Cape Byron Lighthouse", "The Pass beach", "Wategos Beach"], todo: ["Lighthouse walk", "Whale watching", "Sunrise at the most easterly point"] },
{ id: 69, name: "Lord Howe Island", state: "NSW", lat: -31.5500, lng: 159.0833, type: "nature", description: "A UNESCO World Heritage listed island of extraordinary beauty, with dramatic twin peaks, a coral lagoon and some of the world's rarest flora and fauna.", heritage: ["Ball's Pyramid", "Lagoon Marine Park", "Mount Gower", "Neds Beach"], todo: ["Mount Gower hike", "Lagoon snorkelling", "Feeding the fish at Neds Beach"] },
{ id: 70, name: "Blue Mountains", state: "NSW", lat: -33.7167, lng: 150.3167, type: "nature", description: "A vast wilderness of towering sandstone escarpments, eucalyptus forests and dramatic valleys just 90 minutes from Sydney, a UNESCO World Heritage Area.", heritage: ["Three Sisters", "Scenic World", "Jenolan Caves", "Wentworth Falls"], todo: ["Three Sisters walk", "Jenolan Caves tour", "Grand Canyon walk"] },
{ id: 71, name: "Jervis Bay", state: "NSW", lat: -35.1333, lng: 150.7333, type: "nature", description: "Home to Hyams Beach, once in the Guinness Book of Records for the world's whitest sand, with crystal waters, dolphins and extraordinary marine life.", heritage: ["Booderee National Park", "Hyams Beach", "Murrays Beach", "Wreck Bay Aboriginal community"], todo: ["Hyams Beach visit", "Dolphin watching cruise", "Booderee National Park walk"] },
{ id: 72, name: "Kosciuszko", state: "NSW", lat: -36.4667, lng: 148.2667, type: "nature", description: "Australia's highest peak and the surrounding Snowy Mountains offer alpine meadows, ancient glacial lakes and the headwaters of the Murray-Darling river system.", heritage: ["Mount Kosciuszko", "Blue Lake", "Yarrangobilly Caves", "Charlotte Pass"], todo: ["Summit walk", "Blue Lake walk", "Yarrangobilly Caves tour"] },
{ id: 73, name: "Wilsons Promontory", state: "VIC", lat: -39.0833, lng: 146.3667, type: "nature", description: "The southernmost point of mainland Australia — a magnificent granite wilderness of pristine beaches, ancient forest and abundant wildlife.", heritage: ["Squeaky Beach", "Tidal River", "Mount Oberon", "Lighthouse Point"], todo: ["Squeaky Beach walk", "Mount Oberon summit", "Lighthouse overnight hike"] },
{ id: 74, name: "Great Ocean Road", state: "VIC", lat: -38.6667, lng: 143.1000, type: "nature", description: "The world's largest war memorial, a spectacular coastal road past the Twelve Apostles, Loch Ard Gorge and the temperate rainforests of the Otway Ranges.", heritage: ["Twelve Apostles", "Loch Ard Gorge", "Cape Otway Lighthouse", "Bells Beach"], todo: ["Twelve Apostles at sunrise", "Loch Ard Gorge walk", "Cape Otway Lighthouse tour"] },
{ id: 75, name: "Grampians", state: "VIC", lat: -37.2500, lng: 142.5333, type: "nature", description: "A dramatic sandstone mountain range in western Victoria with extraordinary Aboriginal rock art, breathtaking lookouts and spectacular wildflower displays.", heritage: ["Brambuk Cultural Centre", "Mackenzie Falls", "Reed Lookout", "Boroka Lookout"], todo: ["Boroka Lookout sunrise", "Mackenzie Falls walk", "Brambuk rock art tour"] },
{ id: 76, name: "Flinders Ranges", state: "SA", lat: -31.5000, lng: 138.6667, type: "nature", description: "Ancient mountain ranges rising from the outback with Wilpena Pound at their heart — a vast natural amphitheatre of quartzite peaks.", heritage: ["Wilpena Pound", "Brachina Gorge", "Arkaroola", "ABC Range"], todo: ["Wilpena Pound walk", "Brachina Gorge geological trail", "Stargazing at Arkaroola"] },
{ id: 77, name: "Kangaroo Island", state: "SA", lat: -35.8000, lng: 137.2000, type: "nature", description: "Australia's third largest island, a wildlife sanctuary of extraordinary richness with sea lions, koalas, remarkable rock formations and pristine wilderness.", heritage: ["Remarkable Rocks", "Admirals Arch", "Seal Bay", "Flinders Chase National Park"], todo: ["Seal Bay guided walk", "Remarkable Rocks at sunset", "Admirals Arch walk"] },
{ id: 78, name: "Naracoorte Caves", state: "SA", lat: -37.0167, lng: 140.7833, type: "nature", description: "A UNESCO World Heritage site containing one of the world's most important fossil deposits, with spectacular cave formations and live bat colonies.", heritage: ["Victoria Fossil Cave", "Alexandra Cave", "Stick Tomato Cave", "Bat Cave"], todo: ["Victoria Fossil Cave tour", "Bat flight at dusk", "Adventure caving"] },
{ id: 79, name: "Coorong", state: "SA", lat: -35.8333, lng: 139.3333, type: "nature", description: "A unique coastal lagoon system stretching 130km, immortalised in Storm Boy, with vast waterbird colonies and the ancient culture of the Ngarrindjeri people.", heritage: ["Coorong National Park", "Ngarrindjeri cultural sites", "Salt lagoons", "Ocean beach"], todo: ["Houseboat journey", "Bird watching", "4WD beach drive"] },
{ id: 80, name: "Mornington Peninsula", state: "VIC", lat: -38.3833, lng: 145.0000, type: "nature", description: "A beautiful coastal peninsula south of Melbourne with dramatic ocean beaches, sheltered bay beaches, hot springs and rolling wine country hinterland.", heritage: ["Point Nepean National Park", "Cape Schanck Lighthouse", "Mornington Peninsula National Park"], todo: ["Point Nepean walk", "Cape Schanck boardwalk", "Hot springs visit"] },
{ id: 81, name: "Fitzgerald River", state: "WA", lat: -33.8667, lng: 119.7333, type: "nature", description: "A UNESCO Biosphere Reserve containing one of the world's greatest concentrations of plant species, with dramatic coastal cliffs and pristine wilderness.", heritage: ["Point Ann", "Fitzgerald River National Park", "Quaalup Homestead", "Whalebone Beach"], todo: ["Whale watching at Point Ann", "Wildflower walks", "Coastal cliffs drive"] },
{ id: 82, name: "Stirling Range", state: "WA", lat: -34.3833, lng: 118.0667, type: "nature", description: "Dramatic peaks rising abruptly from the flat coastal plain of Western Australia's south, with extraordinary wildflower diversity and stunning summit walks.", heritage: ["Bluff Knoll", "Toolbrunup Peak", "Stirling Range National Park"], todo: ["Bluff Knoll summit climb", "Wildflower season visit", "Toolbrunup Peak walk"] },
{ id: 83, name: "Shark Bay", state: "WA", lat: -25.9833, lng: 113.9667, type: "nature", description: "A UNESCO World Heritage Site where stromatolites — the oldest life forms on Earth — still grow in hypersaline waters alongside dugongs and dolphins.", heritage: ["Hamelin Pool stromatolites", "Shell Beach", "Monkey Mia", "Francois Peron National Park"], todo: ["Monkey Mia dolphin feeding", "Shell Beach walk", "Stromatolites at Hamelin Pool"] },
{ id: 84, name: "Nambung", state: "WA", lat: -30.6000, lng: 115.1500, type: "nature", description: "Ancient limestone pillars rising from the golden desert sand, with spectacular wildflower displays in spring and pristine coastal beaches nearby.", heritage: ["Pinnacles Desert", "Kangaroo Point", "Nambung National Park"], todo: ["Pinnacles at sunset", "Spring wildflower drive", "Cervantes lobster lunch"] },
{ id: 85, name: "Gondwana Rainforests", state: "NSW", lat: -28.4167, lng: 153.2167, type: "nature", description: "A UNESCO World Heritage Area of ancient Gondwana rainforests in the Border Ranges, containing the greatest diversity of flora and fauna in Australia.", heritage: ["Lamington National Park", "Border Ranges National Park", "Nightcap National Park"], todo: ["Tree top walk at O'Reillys", "Protestor Falls walk", "Rainforest birdwatching"] },
{ id: 86, name: "Glass House Mountains", state: "QLD", lat: -26.8833, lng: 152.9500, type: "nature", description: "Dramatic volcanic plugs rising abruptly from the Sunshine Coast hinterland, sacred to the Jinibara people and beloved by Captain Cook who named them.", heritage: ["Mount Beerwah", "Mount Tibrogargan", "Glass House Mountains National Park"], todo: ["Mount Ngungun summit", "Tibrogargan base walk", "Scenic drive and lookouts"] },
{ id: 87, name: "Springbrook Plateau", state: "QLD", lat: -28.2333, lng: 153.2667, type: "nature", description: "A cool green plateau above the Gold Coast hinterland with ancient Antarctic beech forests, spectacular waterfalls and the magical glowworm caves.", heritage: ["Natural Bridge", "Purling Brook Falls", "Antarctic beech forests", "Best of All Lookout"], todo: ["Natural Bridge glowworm cave", "Purling Brook Falls walk", "Best of All Lookout"] },
{ id: 88, name: "Undara Lava Tubes", state: "QLD", lat: -18.2000, lng: 144.6000, type: "nature", description: "The world's longest system of lava tubes formed by a volcanic eruption 190,000 years ago, now a refuge for extraordinary wildlife in outback Queensland.", heritage: ["Undara Volcanic National Park", "Lava tube caves", "Savannah woodland"], todo: ["Lava tube guided tour", "Sunset wildlife walk", "Bats emerging at dusk"] },
{ id: 89, name: "Cape Hillsborough", state: "QLD", lat: -20.9000, lng: 149.0333, type: "nature", description: "A magical coastal park near Mackay where kangaroos and wallabies come to the beach at dawn to warm themselves in the morning sun.", heritage: ["Cape Hillsborough National Park", "Wedge Island", "Rock art sites", "Andrews Point"], todo: ["Dawn kangaroos on the beach", "Reef walking at low tide", "Rock art trail"] },
{ id: 90, name: "Innes National Park", state: "SA", lat: -35.2333, lng: 136.8833, type: "nature", description: "The wild tip of Yorke Peninsula with dramatic coastal scenery, historic shipwrecks, abundant marine life and the ruins of the old gypsum mining town of Inneston.", heritage: ["Inneston historic village", "Ethel Wreck", "Pondalowie Bay", "Stenhouse Bay"], todo: ["Inneston heritage walk", "Wreck snorkelling", "Pondalowie Bay surf"] },
{ id: 91, name: "Mount Field", state: "TAS", lat: -42.6833, lng: 146.6000, type: "nature", description: "Tasmania's oldest national park with Russell Falls, snow-capped peaks, ancient swamp gum forests and stunning alpine landscapes.", heritage: ["Russell Falls", "Lake Dobson", "Tall Trees walk", "Tarn Shelf"], todo: ["Russell Falls walk", "Tarn Shelf circuit", "Ski Lake Dobson in winter"] },
{ id: 92, name: "Walls of Jerusalem", state: "TAS", lat: -41.8667, lng: 146.2500, type: "nature", description: "A remote alpine wilderness of dramatic dolerite peaks, ancient pencil pine forests and pristine tarns accessible only on foot — one of Australia's great wilderness walks.", heritage: ["Wild Dog Creek", "Damascus Gate", "Pool of Bethesda", "Solomon's Throne"], todo: ["Multi-day wilderness walk", "Pencil pine forests", "Summit views"] },
{ id: 93, name: "Cape Hauy", state: "TAS", lat: -43.1333, lng: 147.9667, type: "nature", description: "Dramatic sea stacks rising from the Southern Ocean on the Tasman Peninsula, with clifftop walking tracks offering some of the most spectacular coastal scenery in Australia.", heritage: ["Tasman National Park", "Cape Pillar", "Tasman Arch", "Devils Kitchen"], todo: ["Cape Hauy walk", "Three Capes Track", "Sea kayaking the sea caves"] },
{ id: 94, name: "Mungo National Park", state: "NSW", lat: -33.7167, lng: 143.0500, type: "nature", description: "An ancient dry lake bed where the oldest human remains in Australia were found, with extraordinary lunette formations called the Walls of China rising from the flat plain.", heritage: ["Walls of China", "Lake Mungo", "Mungo Woolshed", "Aboriginal cultural sites"], todo: ["Walls of China walk", "Sunset tour", "Aboriginal heritage tour"] },
{ id: 95, name: "Warrumbungle", state: "NSW", lat: -31.2833, lng: 149.0000, type: "nature", description: "Ancient volcanic peaks rising dramatically from the western plains, Australia's only Dark Sky Park with the finest stargazing on the continent.", heritage: ["Siding Spring Observatory", "Breadknife", "Grand High Tops", "Warrumbungle National Park"], todo: ["Grand High Tops walk", "Siding Spring Observatory tour", "Stargazing"] },
{ id: 96, name: "Bald Rock", state: "NSW", lat: -28.9833, lng: 152.0333, type: "nature", description: "Australia's largest exposed granite rock, a vast dome rising from the New England Tablelands with extraordinary views across the Granite Belt.", heritage: ["Bald Rock National Park", "Boonoo Boonoo Falls", "Girraween National Park"], todo: ["Summit climb", "Boonoo Boonoo Falls walk", "Granite Belt wildflowers"] },
{ id: 97, name: "Coffin Bay", state: "SA", lat: -34.6167, lng: 135.4833, type: "nature", description: "A pristine national park at the tip of the Eyre Peninsula with remote beaches, extraordinary oysters and some of the most unspoiled coastal scenery in southern Australia.", heritage: ["Coffin Bay National Park", "Yangie Bay", "Avoid Bay", "Point Avoid"], todo: ["4WD beach drive", "Oyster tasting", "Yangie Bay walk"] },
{ id: 98, name: "Nullarbor Cliffs", state: "SA", lat: -31.6333, lng: 129.0000, type: "nature", description: "The Great Australian Bight's towering limestone cliffs plunging into the Southern Ocean — some of the world's most dramatic coastal scenery and a key southern right whale nursery.", heritage: ["Head of Bight", "Bunda Cliffs", "Nullarbor National Park"], todo: ["Whale watching at Head of Bight", "Bunda Cliffs walk", "Nullarbor Plain drive"] },
{ id: 99, name: "Nitmiluk Gorge", state: "NT", lat: -14.2994, lng: 132.4631, type: "nature", description: "Thirteen breathtaking sandstone gorges carved by the Katherine River over millions of years, sacred to the Jawoyn traditional owners.", heritage: ["Katherine Gorge", "Smitt Rock", "Jawoyn rock art", "Edith Falls"], todo: ["Gorge cruise", "Kayak the gorges", "Jatbula Trail multi-day walk"] },
{ id: 100, name: "Ikara-Flinders Ranges", state: "SA", lat: -31.5000, lng: 138.6667, type: "nature", description: "The ancient heart of South Australia — Wilpena Pound's natural amphitheatre, Aboriginal rock art, fossils from the dawn of complex life and the magnificent Elder Range.", heritage: ["Wilpena Pound", "Sacred Canyon", "Brachina Gorge", "Bunyeroo Valley"], todo: ["Sacred Canyon walk", "Bunyeroo Valley drive at sunset", "Ediacaran fossil trail"] },];
>>>>>>> 32538a14e96e950fc2482043cfbb413e4c0f2314

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
<<<<<<< HEAD
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

=======
    <div style={{ fontFamily: "Georgia, serif", height: "100vh", display: "flex", flexDirection: "column", background: "#f5f0e8", color: "#2a1f0f" }}>
      <style>{`.heritage-tooltip { background: #2a1f0f; border: none; color: #f5f0e8; font-family: Georgia, serif; font-size: 12px; padding: 4px 10px; border-radius: 2px; } .heritage-tooltip::before { border-top-color: #2a1f0f !important; } .leaflet-control-zoom { border: none !important; } .leaflet-control-zoom a { background: #2a1f0f !important; color: #f5f0e8 !important; border: none !important; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #c4a882; } .tab-btn { background: none; border: none; cursor: pointer; font-family: Georgia, serif; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; padding: 8px 14px; color: #8a7055; transition: all 0.2s; border-bottom: 2px solid transparent; } .tab-btn.active { color: #2a1f0f; border-bottom-color: #8B4513; } .town-item { padding: 10px 12px; cursor: pointer; border-left: 3px solid transparent; transition: all 0.15s; display: flex; align-items: center; gap: 10px; } .town-item:hover { background: #ede5d5; border-left-color: #c4a882; } .town-item.selected { background: #e8dcc8; border-left-color: #8B4513; } @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } } .panel-animate { animation: slideIn 0.3s ease; } @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .fade-up { animation: fadeUp 0.4s ease; }`}</style>
     <div style={{ background: "#2a1f0f", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
  <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
    <a href="https://www.australianheritage.au" style={{ color: "#f5f0e8", fontSize: 20, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>Australian Heritage</a>
    <span style={{ color: "#c4a882", fontSize: 13, letterSpacing: "0.06em" }}>Discovery Map</span>
  </div>
  <div style={{ color: "#8a7055", fontSize: 12, letterSpacing: "0.08em" }}>{TOWNS.length} REMARKABLE PLACES</div>
</div>
>>>>>>> 32538a14e96e950fc2482043cfbb413e4c0f2314
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
