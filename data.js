// =========================================================================
// BASE DE DONNÃ‰ES DES PERFORMANCES GAZELLE (SA 342 M1)
// =========================================================================
// MODE D'EMPLOI POUR AJOUTER/MODIFIER UNE COURBE :
// 1. Utilisez "digitizer.html" pour obtenir le JSON de votre courbe.
// 2. Collez-le dans les crochets "limitEnvelope: []" ou "curves: []" du bloc correspondant.
// 
// POUR AJOUTER UNE TOUTE NOUVELLE CATÃ‰GORIE (Ex: Masse max au dÃ©collage) :
// Copiez-collez un bloc entier (ex: de "HES_ARME": { ... } ) et changez :
// - type: "Identifiant court (ex: MMD)"
// - typeLabel: "Nom qui apparaÃ®tra dans le 1er menu dÃ©roulant"
// - configLabel: "Nom qui apparaÃ®tra dans le 2Ã¨me menu dÃ©roulant"
// - xAxisLabel et yAxisLabel : Les titres des axes (si besoin de les changer)

// =========================================================================
// BASE DE DONNÃ‰ES DE LA FLOTTE
// =========================================================================
const fleetDatabase = {
    "F-MGAP": { number: "1234", config: "ARME", emptyWeight: 1250, emptyMomLong: 4500, emptyMomLat: 10 },
    "F-MXXX": { number: "5678", config: "LISSE", emptyWeight: 1265, emptyMomLong: 4520, emptyMomLat: 12 }
};

// =========================================================================
// SCÃ‰NARIOS DE VOL
// =========================================================================
// Utilisez "SUFFIX" dans la liste des abaques pour qu'il soit remplacÃ© par
// la configuration de la machine (_ARME ou _LISSE)
const scenariosDatabase = {
    "VOLTAC": {
        label: "Vol Tactique",
        charts: ["TAC_SUFFIX"] // Sera remplacÃ© par TAC_ARME ou TAC_LISSE
    },
    "MONTAGNE": {
        label: "Vol Montagne",
        charts: ["HES_SUFFIX", "DES_SUFFIX"] // Sera remplacÃ© par HES_ARME, DES_ARME...
    }
};

const chartsDatabase = {
    
    // ================== PLAFONDS H.E.S. ==================
    "HES_ARME": {
        title: "Abaque 8.6 - PLAFOND H.E.S.",
        type: "HES",
        typeLabel: "Plafond Vol Stationnaire H.E.S.",
        configLabel: "ArmÃ© (4 HOT, Viviane)",
        conditions: ["D.D.J.", "4 HOT", "Viseur VIVIANE"],
        planche: "Planche 9",
        xAxisLabel: "MASSE (kg)",
        yAxisLabel: "ALTITUDE PRESSION (m)",
        limitEnvelope: [],
        curves: [
          {"temp": 50, "points": [{"x": 2202, "y": 101}, {"x": 2186, "y": 178}, {"x": 2165, "y": 279}, {"x": 2130, "y": 419}, {"x": 2099, "y": 546}, {"x": 2070, "y": 671}, {"x": 2031, "y": 836}, {"x": 1984, "y": 1001}, {"x": 1945, "y": 1154}, {"x": 1905, "y": 1332}, {"x": 1862, "y": 1522}, {"x": 1819, "y": 1713}, {"x": 1771, "y": 1916}, {"x": 1714, "y": 2158}, {"x": 1662, "y": 2400}, {"x": 1604, "y": 2705}, {"x": 1542, "y": 3010}, {"x": 1487, "y": 3289}, {"x": 1402, "y": 3722}]},
          {"temp": 40, "points": [{"x": 2198, "y": 493}, {"x": 2172, "y": 620}, {"x": 2139, "y": 760}, {"x": 2099, "y": 950}, {"x": 2044, "y": 1166}, {"x": 1992, "y": 1383}, {"x": 1947, "y": 1573}, {"x": 1877, "y": 1853}, {"x": 1817, "y": 2133}, {"x": 1767, "y": 2361}, {"x": 1699, "y": 2654}, {"x": 1650, "y": 2908}, {"x": 1584, "y": 3226}, {"x": 1532, "y": 3493}, {"x": 1478, "y": 3772}, {"x": 1435, "y": 3989}, {"x": 1398, "y": 4192}]},
          {"temp": 30, "points": [{"x": 2196, "y": 709}, {"x": 2161, "y": 950}, {"x": 2099, "y": 1217}, {"x": 2000, "y": 1624}, {"x": 1901, "y": 2018}, {"x": 1798, "y": 2476}, {"x": 1707, "y": 2895}, {"x": 1627, "y": 3251}, {"x": 1555, "y": 3620}, {"x": 1489, "y": 3976}, {"x": 1400, "y": 4434}]},
          {"temp": 20, "points": [{"x": 2196, "y": 1027}, {"x": 2163, "y": 1192}, {"x": 2112, "y": 1408}, {"x": 2056, "y": 1662}, {"x": 1969, "y": 1993}, {"x": 1891, "y": 2336}, {"x": 1844, "y": 2539}, {"x": 1782, "y": 2806}, {"x": 1734, "y": 3022}, {"x": 1689, "y": 3251}, {"x": 1631, "y": 3506}, {"x": 1528, "y": 4014}, {"x": 1447, "y": 4459}, {"x": 1402, "y": 4686}]},
          {"temp": 10, "points": [{"x": 2198, "y": 1279}, {"x": 2172, "y": 1457}, {"x": 2099, "y": 1762}, {"x": 1998, "y": 2156}, {"x": 1899, "y": 2576}, {"x": 1808, "y": 2957}, {"x": 1734, "y": 3300}, {"x": 1641, "y": 3707}, {"x": 1586, "y": 3987}, {"x": 1509, "y": 4393}, {"x": 1402, "y": 4940}]},
          {"temp": 0, "points": [{"x": 2196, "y": 1559}, {"x": 2118, "y": 1978}, {"x": 2000, "y": 2436}, {"x": 1868, "y": 2995}, {"x": 1740, "y": 3554}, {"x": 1637, "y": 3999}, {"x": 1546, "y": 4482}, {"x": 1450, "y": 4953}, {"x": 1401, "y": 5203}]},
          {"temp": -10, "points": [{"x": 2196, "y": 1974}, {"x": 2142, "y": 2178}, {"x": 2072, "y": 2457}, {"x": 1942, "y": 2966}, {"x": 1816, "y": 3500}, {"x": 1700, "y": 4008}, {"x": 1546, "y": 4771}, {"x": 1399, "y": 5496}]},
          {"temp": -20, "points": [{"x": 2196, "y": 2152}, {"x": 2148, "y": 2470}, {"x": 2061, "y": 2826}, {"x": 1967, "y": 3169}, {"x": 1863, "y": 3576}, {"x": 1773, "y": 3996}, {"x": 1669, "y": 4466}, {"x": 1558, "y": 4987}, {"x": 1467, "y": 5445}, {"x": 1400, "y": 5771}]},
          {"temp": -30, "points": [{"x": 2198, "y": 2512}, {"x": 2149, "y": 2779}, {"x": 2099, "y": 2970}, {"x": 1982, "y": 3427}, {"x": 1885, "y": 3809}, {"x": 1839, "y": 4012}, {"x": 1712, "y": 4571}, {"x": 1643, "y": 4902}, {"x": 1412, "y": 6025}]},
          {"temp": -40, "points": [{"x": 2198, "y": 2885}, {"x": 2186, "y": 2974}, {"x": 2099, "y": 3292}, {"x": 1994, "y": 3686}, {"x": 1920, "y": 3979}, {"x": 1825, "y": 4386}, {"x": 1711, "y": 4907}, {"x": 1583, "y": 5504}, {"x": 1474, "y": 6013}]}
        ]
    },
    "HES_LISSE": {
        title: "Abaque 8.6 - PLAFOND H.E.S.",
        type: "HES",
        typeLabel: "Plafond Vol Stationnaire H.E.S.",
        configLabel: "Appareil Lisse",
        conditions: ["APPAREIL LISSE", "SANS TUBE POLYVALENT", "AVEC DDJ"],
        planche: "Planche 9A",
        xAxisLabel: "MASSE (kg)",
        yAxisLabel: "ALTITUDE PRESSION (m)",
        limitEnvelope: [],
        curves: [
          {"temp": 50, "points": [{"x": 2199, "y": 457}, {"x": 2084, "y": 870}, {"x": 1955, "y": 1376}, {"x": 1804, "y": 2016}, {"x": 1681, "y": 2549}, {"x": 1567, "y": 3082}, {"x": 1457, "y": 3615}, {"x": 1401, "y": 3908}]},
          {"temp": 40, "points": [{"x": 2199, "y": 803}, {"x": 2103, "y": 1203}, {"x": 1964, "y": 1749}, {"x": 1852, "y": 2229}, {"x": 1748, "y": 2682}, {"x": 1646, "y": 3162}, {"x": 1532, "y": 3722}, {"x": 1444, "y": 4188}, {"x": 1401, "y": 4401}]},
          {"temp": 30, "points": [{"x": 2201, "y": 1110}, {"x": 2101, "y": 1470}, {"x": 1989, "y": 1909}, {"x": 1897, "y": 2282}, {"x": 1814, "y": 2656}, {"x": 1733, "y": 3029}, {"x": 1646, "y": 3402}, {"x": 1546, "y": 3882}, {"x": 1461, "y": 4348}, {"x": 1401, "y": 4654}]},
          {"temp": 20, "points": [{"x": 2201, "y": 1350}, {"x": 2103, "y": 1736}, {"x": 1997, "y": 2149}, {"x": 1843, "y": 2775}, {"x": 1723, "y": 3322}, {"x": 1615, "y": 3828}, {"x": 1525, "y": 4268}, {"x": 1403, "y": 4894}]},
          {"temp": 10, "points": [{"x": 2201, "y": 1656}, {"x": 2103, "y": 2029}, {"x": 1999, "y": 2416}, {"x": 1899, "y": 2802}, {"x": 1800, "y": 3255}, {"x": 1710, "y": 3655}, {"x": 1617, "y": 4068}, {"x": 1527, "y": 4521}, {"x": 1463, "y": 4854}, {"x": 1402, "y": 5170}]},
          {"temp": 0, "points": [{"x": 2200, "y": 1905}, {"x": 2102, "y": 2305}, {"x": 2001, "y": 2691}, {"x": 1922, "y": 3011}, {"x": 1853, "y": 3304}, {"x": 1793, "y": 3584}, {"x": 1726, "y": 3837}, {"x": 1672, "y": 4104}, {"x": 1595, "y": 4450}, {"x": 1533, "y": 4770}, {"x": 1464, "y": 5116}, {"x": 1400, "y": 5423}]},
          {"temp": -10, "points": [{"x": 2200, "y": 2225}, {"x": 2100, "y": 2598}, {"x": 2001, "y": 2998}, {"x": 1905, "y": 3371}, {"x": 1795, "y": 3864}, {"x": 1695, "y": 4250}, {"x": 1589, "y": 4783}, {"x": 1506, "y": 5210}, {"x": 1404, "y": 5701}]},
          {"temp": -20, "points": [{"x": 2202, "y": 2530}, {"x": 2103, "y": 2903}, {"x": 2015, "y": 3236}, {"x": 1936, "y": 3543}, {"x": 1855, "y": 3876}, {"x": 1785, "y": 4182}, {"x": 1710, "y": 4515}, {"x": 1631, "y": 4888}, {"x": 1552, "y": 5261}, {"x": 1475, "y": 5635}, {"x": 1404, "y": 5981}]},
          {"temp": -30, "points": [{"x": 2203, "y": 2829}, {"x": 2105, "y": 3215}, {"x": 2041, "y": 3455}, {"x": 1974, "y": 3721}, {"x": 1901, "y": 4015}, {"x": 1816, "y": 4388}, {"x": 1708, "y": 4827}, {"x": 1627, "y": 5200}, {"x": 1542, "y": 5587}, {"x": 1461, "y": 6000}]},
          {"temp": -40, "points": [{"x": 2203, "y": 3175}, {"x": 2103, "y": 3548}, {"x": 1993, "y": 3948}, {"x": 1899, "y": 4321}, {"x": 1800, "y": 4721}, {"x": 1714, "y": 5134}, {"x": 1627, "y": 5507}, {"x": 1554, "y": 5853}, {"x": 1525, "y": 6000}]}
        ]
    },

    // ================== PLAFONDS D.E.S. ==================
    "DES_LISSE": {
        title: "Abaque 8.6 - PLAFOND D.E.S.",
        type: "DES",
        typeLabel: "Vol Stationnaire D.E.S.",
        configLabel: "Lisse",
        planche: "10A",
        conditions: ["Appareil Lisse", "Sans tube polyvalent", "Avec DDJ"],
        limitEnvelope: [{"x":2102,"y":1928},{"x":2100,"y":4159},{"x":1981,"y":4602},{"x":1850,"y":5100},{"x":1654,"y":5987},{"x":1402,"y":6013},{"x":1406,"y":5691},{"x":1517,"y":5019},{"x":1711,"y":3917},{"x":1875,"y":3017},{"x":2006,"y":2385},{"x":2102,"y":1928}],
        curves: [{"temp":50,"points":[{"x":2202,"y":1068},{"x":2134,"y":1337},{"x":2034,"y":1686},{"x":1921,"y":2130},{"x":1802,"y":2627},{"x":1702,"y":3070},{"x":1588,"y":3608},{"x":1471,"y":4159},{"x":1404,"y":4522}]},{"temp":40,"points":[{"x":2202,"y":1485},{"x":2123,"y":1767},{"x":1992,"y":2291},{"x":1886,"y":2721},{"x":1777,"y":3191},{"x":1679,"y":3635},{"x":1598,"y":3998},{"x":1517,"y":4414},{"x":1404,"y":5006}]},{"temp":30,"points":[{"x":2202,"y":1753},{"x":2104,"y":2089},{"x":2009,"y":2466},{"x":1892,"y":2936},{"x":1773,"y":3447},{"x":1665,"y":3930},{"x":1544,"y":4535},{"x":1459,"y":4952},{"x":1404,"y":5247}]},{"temp":20,"points":[{"x":2200,"y":2009},{"x":2100,"y":2385},{"x":2025,"y":2681},{"x":1934,"y":3030},{"x":1854,"y":3366},{"x":1775,"y":3702},{"x":1692,"y":4078},{"x":1590,"y":4549},{"x":1496,"y":4992},{"x":1402,"y":5476}]},{"temp":10,"points":[{"x":2200,"y":2278},{"x":2100,"y":2654},{"x":1967,"y":3178},{"x":1844,"y":3675},{"x":1752,"y":4078},{"x":1636,"y":4616},{"x":1523,"y":5153},{"x":1436,"y":5583},{"x":1404,"y":5745}]},{"temp":0,"points":[{"x":2204,"y":2560},{"x":2100,"y":2936},{"x":2009,"y":3272},{"x":1917,"y":3648},{"x":1836,"y":3998},{"x":1742,"y":4401},{"x":1659,"y":4777},{"x":1567,"y":5207},{"x":1479,"y":5637},{"x":1406,"y":6013}]},{"temp":-10,"points":[{"x":2202,"y":2855},{"x":2100,"y":3232},{"x":2025,"y":3500},{"x":1940,"y":3836},{"x":1867,"y":4132},{"x":1802,"y":4401},{"x":1750,"y":4656},{"x":1694,"y":4898},{"x":1623,"y":5221},{"x":1556,"y":5530},{"x":1509,"y":5798},{"x":1467,"y":5973}]},{"temp":-20,"points":[{"x":2202,"y":3164},{"x":2096,"y":3541},{"x":2017,"y":3850},{"x":1950,"y":4092},{"x":1894,"y":4334},{"x":1817,"y":4656},{"x":1759,"y":4898},{"x":1702,"y":5153},{"x":1650,"y":5368},{"x":1598,"y":5624},{"x":1527,"y":5960}]},{"temp":-30,"points":[{"x":2200,"y":3487},{"x":2102,"y":3836},{"x":2017,"y":4159},{"x":1929,"y":4468},{"x":1850,"y":4817},{"x":1761,"y":5207},{"x":1667,"y":5624},{"x":1581,"y":5973}]},{"temp":-40,"points":[{"x":2200,"y":3796},{"x":2100,"y":4159},{"x":2017,"y":4468},{"x":1938,"y":4764},{"x":1854,"y":5113},{"x":1775,"y":5449},{"x":1702,"y":5785},{"x":1652,"y":5987}]}]
    },
    "DES_ARME": {
        title: "Abaque 8.6 - PLAFOND D.E.S.",
        type: "DES",
        typeLabel: "Plafond Vol Stationnaire D.E.S.",
        configLabel: "ArmÃ© (4 HOT, Viviane)",
        conditions: ["D.D.J.", "4 HOT", "Viseur VIVIANE"],
        planche: "Planche 10",
        xAxisLabel: "MASSE (kg)",
        yAxisLabel: "ALTITUDE PRESSION (m)",
        limitEnvelope: [{"x": 2102, "y": -1013}, {"x": 2106, "y": 3808}, {"x": 2057, "y": 3974}, {"x": 1622, "y": 3987}, {"x": 1775, "y": 3128}, {"x": 1988, "y": 2064}, {"x": 2102, "y": 1487}],
        curves: [
          {"temp": 50, "points": [{"x": 2199, "y": 735}, {"x": 2097, "y": 1107}, {"x": 1982, "y": 1581}, {"x": 1871, "y": 2030}, {"x": 1777, "y": 2427}, {"x": 1675, "y": 2889}, {"x": 1571, "y": 3376}, {"x": 1466, "y": 3901}, {"x": 1403, "y": 4222}]},
          {"temp": 40, "points": [{"x": 2199, "y": 1107}, {"x": 2099, "y": 1491}, {"x": 1988, "y": 1940}, {"x": 1874, "y": 2414}, {"x": 1765, "y": 2889}, {"x": 1673, "y": 3299}, {"x": 1601, "y": 3671}, {"x": 1513, "y": 4107}, {"x": 1403, "y": 4671}]},
          {"temp": 30, "points": [{"x": 2201, "y": 1376}, {"x": 2101, "y": 1748}, {"x": 2009, "y": 2107}, {"x": 1908, "y": 2517}, {"x": 1824, "y": 2889}, {"x": 1736, "y": 3273}, {"x": 1646, "y": 3683}, {"x": 1562, "y": 4094}, {"x": 1475, "y": 4530}, {"x": 1401, "y": 4927}]},
          {"temp": 20, "points": [{"x": 2199, "y": 1645}, {"x": 2099, "y": 2030}, {"x": 1996, "y": 2440}, {"x": 1904, "y": 2812}, {"x": 1818, "y": 3171}, {"x": 1636, "y": 4004}, {"x": 1531, "y": 4500}, {"x": 1447, "y": 4923}, {"x": 1404, "y": 5154}]},
          {"temp": 10, "points": [{"x": 2200, "y": 1923}, {"x": 2098, "y": 2308}, {"x": 1999, "y": 2693}, {"x": 1911, "y": 3039}, {"x": 1821, "y": 3436}, {"x": 1729, "y": 3834}, {"x": 1637, "y": 4269}, {"x": 1543, "y": 4705}, {"x": 1472, "y": 5064}, {"x": 1404, "y": 5423}]},
          {"temp": 0, "points": [{"x": 2200, "y": 2218}, {"x": 2102, "y": 2590}, {"x": 2002, "y": 2962}, {"x": 1920, "y": 3308}, {"x": 1828, "y": 3693}, {"x": 1748, "y": 4026}, {"x": 1678, "y": 4359}, {"x": 1596, "y": 4744}, {"x": 1523, "y": 5090}, {"x": 1403, "y": 5701}]},
          {"temp": -10, "points": [{"x": 2201, "y": 2509}, {"x": 2102, "y": 2881}, {"x": 2018, "y": 3201}, {"x": 1929, "y": 3547}, {"x": 1855, "y": 3842}, {"x": 1785, "y": 4150}, {"x": 1695, "y": 4547}, {"x": 1611, "y": 4932}, {"x": 1517, "y": 5393}, {"x": 1401, "y": 5983}]},
          {"temp": -20, "points": [{"x": 2201, "y": 2829}, {"x": 2104, "y": 3175}, {"x": 2010, "y": 3522}, {"x": 1943, "y": 3791}, {"x": 1865, "y": 4111}, {"x": 1789, "y": 4445}, {"x": 1693, "y": 4855}, {"x": 1618, "y": 5214}, {"x": 1540, "y": 5560}, {"x": 1456, "y": 5996}]},
          {"temp": -30, "points": [{"x": 2201, "y": 3137}, {"x": 2145, "y": 3329}, {"x": 2082, "y": 3560}, {"x": 2018, "y": 3816}, {"x": 1926, "y": 4188}, {"x": 1843, "y": 4509}, {"x": 1761, "y": 4842}, {"x": 1654, "y": 5329}, {"x": 1564, "y": 5752}, {"x": 1513, "y": 5983}]},
          {"temp": -40, "points": [{"x": 2201, "y": 3445}, {"x": 2143, "y": 3675}, {"x": 2086, "y": 3881}, {"x": 2008, "y": 4163}, {"x": 1924, "y": 4509}, {"x": 1836, "y": 4855}, {"x": 1751, "y": 5214}, {"x": 1673, "y": 5547}, {"x": 1579, "y": 5983}]}
        ]
    },
    

    // ================== VOL TACTIQUE ==================
    "TAC_ARME": {
        title: "Abaque 8.6 - VOL TACTIQUE",
        type: "TAC",
        typeLabel: "Plafond Vol Tactique",
        configLabel: "ArmÃ© (4 HOT, Viviane)",
        conditions: ["D.D.J.", "4 HOT", "Viseur VIVIANE"],
        planche: "Planche 11",
        xAxisLabel: "MASSE (kg)",
        yAxisLabel: "ALTITUDE PRESSION (m)",
        limitEnvelope: [{"x":1400,"y":3990},{"x":1400,"y":3677},{"x":1535,"y":2906},{"x":1687,"y":2018},{"x":1867,"y":921},{"x":1996,"y":203},{"x":2006,"y":-19},{"x":2020,"y":-398},{"x":2026,"y":-489},{"x":2106,"y":-476},{"x":2102,"y":438},{"x":2082,"y":986},{"x":2062,"y":1535},{"x":2038,"y":2070},{"x":2010,"y":2554},{"x":1978,"y":3011},{"x":1875,"y":3429},{"x":1775,"y":3847},{"x":1735,"y":4016},{"x":1553,"y":4003},{"x":1400,"y":4003}],
        curves: [{"temp":50,"points":[{"x":2050,"y":-987},{"x":1997,"y":149},{"x":1785,"y":1011},{"x":1655,"y":1599},{"x":1400,"y":2879}]},{"temp":40,"points":[{"x":2062,"y":-1000},{"x":1989,"y":515},{"x":1865,"y":1090},{"x":1767,"y":1534},{"x":1647,"y":2108},{"x":1504,"y":2853},{"x":1400,"y":3375}]},{"temp":30,"points":[{"x":2070,"y":-974},{"x":1989,"y":841},{"x":1887,"y":1285},{"x":1779,"y":1743},{"x":1657,"y":2330},{"x":1536,"y":2905},{"x":1400,"y":3636}]},{"temp":20,"points":[{"x":2082,"y":-987},{"x":2066,"y":-491},{"x":1981,"y":1142},{"x":1805,"y":1899},{"x":1675,"y":2500},{"x":1524,"y":3244},{"x":1400,"y":3897}]},{"temp":10,"points":[{"x":2090,"y":-999},{"x":2078,"y":-489},{"x":2054,"y":85},{"x":2022,"y":778},{"x":1982,"y":1417},{"x":1855,"y":1966},{"x":1761,"y":2397},{"x":1683,"y":2736},{"x":1601,"y":3154},{"x":1524,"y":3507},{"x":1450,"y":3899},{"x":1400,"y":4160}]},{"temp":0,"points":[{"x":2100,"y":-959},{"x":2086,"y":-489},{"x":2064,"y":177},{"x":2030,"y":882},{"x":1984,"y":1692},{"x":1875,"y":2175},{"x":1783,"y":2580},{"x":1687,"y":3024},{"x":1601,"y":3416},{"x":1537,"y":3742},{"x":1476,"y":4042},{"x":1400,"y":4434}]},{"temp":-10,"points":[{"x":2108,"y":-999},{"x":2094,"y":-489},{"x":2074,"y":216},{"x":2054,"y":725},{"x":2030,"y":1209},{"x":2002,"y":1692},{"x":1982,"y":2005},{"x":1909,"y":2332},{"x":1835,"y":2632},{"x":1767,"y":2972},{"x":1687,"y":3298},{"x":1615,"y":3664},{"x":1530,"y":4095},{"x":1462,"y":4408},{"x":1402,"y":4722}]},{"temp":-20,"points":[{"x":2110,"y":-999},{"x":2102,"y":-502},{"x":2090,"y":-6},{"x":2074,"y":556},{"x":2054,"y":1013},{"x":2032,"y":1483},{"x":2012,"y":1861},{"x":1980,"y":2332},{"x":1897,"y":2697},{"x":1831,"y":2998},{"x":1769,"y":3259},{"x":1717,"y":3468},{"x":1659,"y":3742},{"x":1607,"y":4016},{"x":1555,"y":4225},{"x":1500,"y":4513},{"x":1450,"y":4787},{"x":1400,"y":5035}]},{"temp":-30,"points":[{"x":2112,"y":-999},{"x":2102,"y":-463},{"x":2098,"y":125},{"x":2086,"y":608},{"x":2066,"y":1143},{"x":2038,"y":1718},{"x":2010,"y":2240},{"x":1980,"y":2632},{"x":1913,"y":2932},{"x":1847,"y":3220},{"x":1767,"y":3572},{"x":1705,"y":3820},{"x":1633,"y":4160},{"x":1561,"y":4526},{"x":1464,"y":4970},{"x":1400,"y":5322}]},{"temp":-40,"points":[{"x":2108,"y":-986},{"x":2110,"y":-476},{"x":2106,"y":7},{"x":2102,"y":438},{"x":2084,"y":960},{"x":2066,"y":1417},{"x":2048,"y":1848},{"x":2024,"y":2306},{"x":1998,"y":2763},{"x":1978,"y":2998},{"x":1875,"y":3429},{"x":1735,"y":4016},{"x":1637,"y":4486},{"x":1571,"y":4787},{"x":1496,"y":5139},{"x":1444,"y":5440},{"x":1400,"y":5636}]}]
    },
    "TAC_LISSE": {
        title: "Abaque 8.6 - VOL TACTIQUE",
        type: "TAC",
        typeLabel: "Plafond Vol Tactique",
        configLabel: "Appareil Lisse",
        conditions: ["APPAREIL LISSE", "SANS TUBE POLYVALENT", "AVEC DDJ", "MARGE + 17 %"],
        planche: "Planche 11A",
        xAxisLabel: "MASSE (kg)",
        yAxisLabel: "ALTITUDE PRESSION (m)",
        limitEnvelope: [{"x":2066,"y":-500},{"x":2031,"y":173},{"x":1916,"y":847},{"x":1825,"y":1388},{"x":1724,"y":1969},{"x":1623,"y":2549},{"x":1532,"y":3104},{"x":1454,"y":3605},{"x":1400,"y":3909},{"x":1406,"y":5770},{"x":1586,"y":4833},{"x":1716,"y":4226},{"x":1868,"y":3539},{"x":2031,"y":2906},{"x":2103,"y":1559},{"x":2101,"y":-500},{"x":2064,"y":-500}],
        curves: [{"temp":50,"points":[{"x":2091,"y":-990},{"x":2068,"y":-501},{"x":2035,"y":159},{"x":1905,"y":673},{"x":1802,"y":1109},{"x":1721,"y":1479},{"x":1660,"y":1756},{"x":1606,"y":1993},{"x":1550,"y":2284},{"x":1497,"y":2548},{"x":1453,"y":2785},{"x":1404,"y":3049}]},{"temp":40,"points":[{"x":2103,"y":-990},{"x":2080,"y":-488},{"x":2045,"y":198},{"x":2027,"y":515},{"x":1957,"y":832},{"x":1876,"y":1188},{"x":1806,"y":1492},{"x":1740,"y":1795},{"x":1680,"y":2099},{"x":1627,"y":2337},{"x":1569,"y":2627},{"x":1511,"y":2917},{"x":1468,"y":3155},{"x":1404,"y":3498}]},{"temp":30,"points":[{"x":2117,"y":-990},{"x":2093,"y":-488},{"x":2070,"y":-26},{"x":2047,"y":436},{"x":2027,"y":819},{"x":1938,"y":1175},{"x":1870,"y":1479},{"x":1814,"y":1729},{"x":1748,"y":2007},{"x":1672,"y":2376},{"x":1606,"y":2706},{"x":1559,"y":2931},{"x":1497,"y":3261},{"x":1449,"y":3498},{"x":1408,"y":3747}]},{"temp":20,"points":[{"x":2130,"y":-992},{"x":2107,"y":-490},{"x":2064,"y":355},{"x":2029,"y":1067},{"x":1944,"y":1437},{"x":1870,"y":1793},{"x":1775,"y":2176},{"x":1713,"y":2467},{"x":1649,"y":2757},{"x":1602,"y":2981},{"x":1561,"y":3206},{"x":1523,"y":3391},{"x":1486,"y":3589},{"x":1453,"y":3773},{"x":1406,"y":4011}]},{"temp":10,"points":[{"x":2144,"y":-992},{"x":2121,"y":-490},{"x":2109,"y":-173},{"x":2095,"y":77},{"x":2074,"y":500},{"x":2057,"y":856},{"x":2027,"y":1384},{"x":1979,"y":1582},{"x":1919,"y":1833},{"x":1860,"y":2071},{"x":1806,"y":2295},{"x":1744,"y":2559},{"x":1688,"y":2849},{"x":1641,"y":3061},{"x":1579,"y":3377},{"x":1519,"y":3655},{"x":1466,"y":3932},{"x":1414,"y":4222}]},{"temp":0,"points":[{"x":2159,"y":-1009},{"x":2147,"y":-718},{"x":2135,"y":-415},{"x":2120,"y":-138},{"x":2102,"y":258},{"x":2085,"y":562},{"x":2054,"y":1130},{"x":2027,"y":1658},{"x":1947,"y":1988},{"x":1883,"y":2265},{"x":1809,"y":2555},{"x":1747,"y":2859},{"x":1687,"y":3123},{"x":1617,"y":3439},{"x":1566,"y":3730},{"x":1516,"y":3954},{"x":1452,"y":4271},{"x":1407,"y":4548}]},{"temp":-10,"points":[{"x":2172,"y":-996},{"x":2161,"y":-718},{"x":2151,"y":-481},{"x":2135,"y":-177},{"x":2118,"y":232},{"x":2098,"y":588},{"x":2077,"y":998},{"x":2058,"y":1341},{"x":2038,"y":1737},{"x":2019,"y":1988},{"x":1970,"y":2212},{"x":1914,"y":2423},{"x":1858,"y":2674},{"x":1788,"y":2964},{"x":1739,"y":3175},{"x":1679,"y":3439},{"x":1623,"y":3743},{"x":1555,"y":4060},{"x":1502,"y":4324},{"x":1460,"y":4561},{"x":1405,"y":4839}]},{"temp":-20,"points":[{"x":2192,"y":-1009},{"x":2178,"y":-705},{"x":2161,"y":-375},{"x":2147,"y":-45},{"x":2131,"y":338},{"x":2112,"y":694},{"x":2085,"y":1209},{"x":2065,"y":1552},{"x":2046,"y":1908},{"x":2027,"y":2252},{"x":1964,"y":2502},{"x":1906,"y":2753},{"x":1846,"y":3004},{"x":1792,"y":3241},{"x":1741,"y":3453},{"x":1683,"y":3730},{"x":1632,"y":3994},{"x":1572,"y":4258},{"x":1524,"y":4535},{"x":1481,"y":4746},{"x":1441,"y":4966},{"x":1408,"y":5111}]},{"temp":-30,"points":[{"x":2204,"y":-974},{"x":2192,"y":-683},{"x":2177,"y":-380},{"x":2163,"y":-10},{"x":2144,"y":399},{"x":2128,"y":782},{"x":2101,"y":1297},{"x":2078,"y":1772},{"x":2047,"y":2234},{"x":2027,"y":2617},{"x":1942,"y":2907},{"x":1876,"y":3184},{"x":1810,"y":3475},{"x":1742,"y":3805},{"x":1678,"y":4069},{"x":1610,"y":4412},{"x":1528,"y":4795},{"x":1466,"y":5125},{"x":1406,"y":5428}]},{"temp":-40,"points":[{"x":2200,"y":-525},{"x":2190,"y":-248},{"x":2171,"y":96},{"x":2161,"y":478},{"x":2138,"y":822},{"x":2122,"y":1204},{"x":2101,"y":1640},{"x":2074,"y":2076},{"x":2045,"y":2604},{"x":2025,"y":2894},{"x":1957,"y":3184},{"x":1878,"y":3514},{"x":1827,"y":3739},{"x":1753,"y":4069},{"x":1701,"y":4306},{"x":1641,"y":4583},{"x":1584,"y":4847},{"x":1534,"y":5111},{"x":1483,"y":5334},{"x":1437,"y":5585},{"x":1404,"y":5757}]}]
    }
};

// =========================================================================
// PANNEAU 7 ALPHA (CWP) & AUTRES PANNES
// =========================================================================
const panneau7Alpha = [
    // Ligne 0
    { id: 'EMPTY1', label: '', color: 'none' },
    { id: 'PITOT', label: 'PITOT', color: 'amber', title: 'Réchauffage PITOT',
      htmlContent: `<h2 class='text-2xl font-bold text-amber-600 mb-4'>PANNE CHAUFFAGE PITOT</h2>
                    <p class='mb-2 font-bold'>Incident signalé :</p><p class='mb-4'>Panne de chauffage de l'antenne PITOT.</p>
                    <p class='mb-2 font-bold'>Action Pilote :</p>
                    <ul class='list-disc pl-5 space-y-1'>
                        <li>Vérifier la position de l'interrupteur.</li>
                        <li>Décider la poursuite du vol ou son interruption en fonction des conditions.</li>
                    </ul>` },
    { id: 'EMPTY2', label: '', color: 'none' },
    // Ligne 1
    { id: 'H_MOT', label: 'H.MOT', color: 'amber', title: 'Pression Huile Moteur',
      htmlContent: `<h2 class='text-2xl font-bold text-amber-600 mb-4'>H.MOT - PRESSION HUILE GTM</h2>
                    <p class='mb-2 font-bold'>Incident signalé :</p><p class='mb-4'>Baisse de pression d'huile du G.T.M. (en vol).</p>
                    <p class='mb-2 font-bold text-red-600'>Action Pilote :</p>
                    <ul class='list-disc pl-5 space-y-1'>
                        <li class='font-bold text-red-600'>Se poser dès que possible.</li>
                        <li>En vol, maintenir la puissance la plus faible possible.</li>
                    </ul>` },
    { id: 'H_BTP', label: 'H.BTP', color: 'amber', title: 'Pression Huile BTP',
      htmlContent: `<h2 class='text-2xl font-bold text-amber-600 mb-4'>H.BTP - PRESSION HUILE BTP</h2>
                    <p class='mb-2 font-bold'>Incident signalé :</p><p class='mb-4'>Baisse de pression d'huile dans la B.T.P.</p>
                    <p class='mb-2 font-bold text-red-600'>Action Pilote :</p>
                    <ul class='list-disc pl-5 space-y-1'>
                        <li class='font-bold text-red-600'>Se poser dès que possible.</li>
                    </ul>` },
    { id: 'H_RAL', label: 'H.RAL', color: 'amber', title: 'Pression Huile Moteur au Ralenti',
      htmlContent: `<h2 class='text-2xl font-bold text-amber-600 mb-4'>H.RAL - PRESSION HUILE RALENTI</h2>
                    <p class='mb-2 font-bold'>Incident signalé :</p><p class='mb-4'>Pression d'huile G.T.M. inférieure à la pression normale de ralenti.</p>
                    <p class='mb-2 font-bold'>Action Pilote :</p>
                    <ul class='list-disc pl-5 space-y-1'>
                        <li>En fonctionnement ralenti : <b>couper le G.T.M.</b></li>
                        <li>En vol : se reporter à l'allumage du pavé "H.MOT" (si allumé).</li>
                    </ul>` },
    // Ligne 2
    { id: 'GENE', label: 'GENE', color: 'amber', title: 'Panne Génératrice',
      htmlContent: `<h2 class='text-2xl font-bold text-amber-600 mb-4'>GENE - PANNE GÉNÉRATRICE</h2>
                    <p class='mb-2 font-bold'>Incident signalé :</p><p class='mb-4'>Panne d'alimentation du réseau en courant continu.</p>
                    <p class='mb-2 font-bold'>Action Pilote :</p>
                    <ul class='list-disc pl-5 space-y-1'>
                        <li>Vérifier la position de l'interrupteur. Vérifier le voltmètre.</li>
                        <li>Tenter un réarmement.</li>
                        <li>Si infructueux : réduire la consommation, continuer le vol en surveillant la tension, et isoler la génératrice.</li>
                    </ul>` },
    { id: 'ALTER', label: 'ALTER', color: 'amber', title: 'Panne Alternateur',
      htmlContent: `<h2 class='text-2xl font-bold text-amber-600 mb-4'>ALTER - PANNE ALTERNATEUR</h2>
                    <p class='mb-2 font-bold'>Incident signalé :</p><p class='mb-4'>Panne d'alimentation de l'ensemble du réseau en courant alternatif.</p>
                    <p class='mb-2 font-bold'>Action Pilote :</p>
                    <ul class='list-disc pl-5 space-y-1'>
                        <li>Vérifier la position de l'interrupteur.</li>
                        <li>Tenter un réarmement.</li>
                        <li>Continuer le vol ou se poser en fonction des circonstances. Isoler l'alternateur.</li>
                    </ul>` },
    { id: 'BAT', label: 'BAT.', color: 'amber', title: 'Batterie Isolée',
      htmlContent: `<h2 class='text-2xl font-bold text-amber-600 mb-4'>BAT - BATTERIE DISJONCTÉE</h2>
                    <p class='mb-2 font-bold'>Incident signalé :</p><p class='mb-4'>La batterie est isolée du réseau continu, sa charge n'est plus assurée.</p>
                    <p class='mb-2 font-bold'>Action Pilote :</p>
                    <ul class='list-disc pl-5 space-y-1'>
                        <li>Vérifier la position de l'interrupteur.</li>
                        <li>Surveiller la tension. Poursuivre le vol en fonction des circonstances.</li>
                    </ul>` },
    // Ligne 3
    { id: 'PA', label: 'PA', color: 'amber', title: 'Panne PA',
      htmlContent: `<h2 class='text-2xl font-bold text-amber-600 mb-4'>PA - PILOTE AUTOMATIQUE</h2>
                    <p class='mb-2 font-bold'>Incident signalé :</p><p class='mb-4'>Panne d'alimentation du PA ou des détecteurs.</p>
                    <p class='mb-2 font-bold'>Action Pilote :</p>
                    <ul class='list-disc pl-5 space-y-1'>
                        <li>Continuer le vol.</li>
                        <li>En VMC : poursuivre en VMC.</li>
                        <li>En IMC : tenter de retrouver VMC et les conserver.</li>
                    </ul>` },
    { id: 'NAV', label: 'NAV.', color: 'amber', title: 'Panne Réseau Alternatif',
      htmlContent: `<h2 class='text-2xl font-bold text-amber-600 mb-4'>NAV - TENSION 26V/400Hz</h2>
                    <p class='mb-2 font-bold'>Incident signalé :</p><p class='mb-4'>Panne d'alimentation du réseau alternatif 26 V/400 Hz.</p>
                    <p class='mb-2 font-bold'>Action Pilote :</p>
                    <ul class='list-disc pl-5 space-y-1'>
                        <li>Continuer le vol ou se poser en fonction des circonstances.</li>
                    </ul>` },
    { id: 'COMB', label: 'COMB.', color: 'amber', title: 'Niveau Carburant',
      htmlContent: `<h2 class='text-2xl font-bold text-amber-600 mb-4'>COMB - NIVEAU CARBURANT</h2>
                    <p class='mb-2 font-bold'>Incident signalé :</p><p class='mb-4'>Quantité de carburant utilisable inférieure à 50 litres en vol stabilisé.</p>
                    <p class='mb-2 font-bold'>Action Pilote :</p>
                    <ul class='list-disc pl-5 space-y-1'>
                        <li class='font-bold text-amber-600'>Se poser ou continuer le vol, en fonction des circonstances, il reste environ 15 mn de vol.</li>
                    </ul>` },
    // Ligne 4
    { id: 'BP_HY', label: 'BP.HY', color: 'amber', title: 'Baisse Pression Hydraulique',
      htmlContent: `<h2 class='text-2xl font-bold text-amber-600 mb-4'>BP.HY - PRESSION HYDRAULIQUE</h2>
                    <div class='bg-red-100 border-l-4 border-red-600 p-4 mb-4 text-red-900'>
                        <p class='font-bold mb-1'>ATTENTION :</p>
                        <ol class='list-decimal pl-4'>
                            <li>A LA MISE EN STATIONNAIRE UN EFFORT IMPORTANT DOIT ETRE APPLIQUE AU PALONNIER.</li>
                            <li>UN EFFORT PLUS IMPORTANT EST NECESSAIRE POUR MANOEUVRER LES COMMANDES.</li>
                            <li>A L'ATTERRISSAGE BLOQUER LA FRICTION DU PAS GENERAL AVANT DE REDUIRE LE G.T.M.</li>
                        </ol>
                    </div>
                    <p class='mb-2 font-bold'>Action Pilote :</p>
                    <ul class='list-disc pl-5 space-y-1'>
                        <li>Rejoindre la vitesse de refuge (150 km/h).</li>
                        <li>Vérifier interrupteur "SERVO" sur "M".</li>
                        <li>Si panne confirmée : Couper interrupteurs "PA", "SERVO" et "TRIM".</li>
                        <li>La vitesse maximale est de 180 km/h. L'inclinaison maxi est de 30°.</li>
                        <li>Lors de l'atterrissage, terminer par une approche très plate, face au vent.</li>
                    </ul>` },
    { id: 'LIM', label: 'LIM', color: 'amber', title: 'Limaille Moteur',
      htmlContent: `<h2 class='text-2xl font-bold text-amber-600 mb-4'>LIM - LIMAILLE GTM</h2>
                    <p class='mb-2 font-bold'>Incident signalé :</p><p class='mb-4'>Détection de particules métalliques sur le bouchon magnétique du G.T.M.</p>
                    <p class='mb-2 font-bold text-red-600'>Action Pilote :</p>
                    <ul class='list-disc pl-5 space-y-1'>
                        <li class='font-bold text-red-600'>Atterrir dès que possible.</li>
                        <li>Après atterrissage, retirer le bouchon, vérifier la présence de particules. (Appliquer la procédure de levée de doute du MAT).</li>
                    </ul>` },
    { id: 'FILT', label: 'FILT.', color: 'amber', title: 'Filtre Colmaté',
      htmlContent: `<h2 class='text-2xl font-bold text-amber-600 mb-4'>FILT - FILTRE COLMATÉ</h2>
                    <p class='mb-2 font-bold'>Incident signalé :</p><p class='mb-4'>Filtre carburant colmaté.</p>
                    <p class='mb-2 font-bold'>Action Pilote :</p>
                    <ul class='list-disc pl-5 space-y-1'>
                        <li>Poursuivre le vol en surveillant les paramètres.</li>
                    </ul>` }
];

const autresPannes = [
    { id: 'AUTOROTATION', title: 'Autorotation (Perte complète de puissance)', 
      htmlContent: `<h2 class='text-2xl font-bold text-slate-800 mb-4 border-b pb-2'>AUTOROTATION</h2>
                    <h3 class='text-xl font-bold text-slate-700 mb-2'>Procédure (G.T.M coupé ou panne) :</h3>
                    <ol class='list-decimal pl-5 space-y-2'>
                        <li><b>Réduire le pas général</b> immédiatement.</li>
                        <li>Contrôler la vitesse (Vi = 100 à 110 km/h conseillée).</li>
                        <li>Rechercher un terrain favorable pour l'atterrissage.</li>
                        <li>Effectuer l'arrondi (flare) pour casser la vitesse, et se poser à plat.</li>
                    </ol>` },
    { id: 'PANNE_GTM_VOL', title: 'Arrêt du GTM en vol (Panne totale)', 
      htmlContent: `<h2 class='text-2xl font-bold text-slate-800 mb-4 border-b pb-2'>ARRÊT DU G.T.M EN VOL</h2>
                    <p class='mb-4 text-slate-600'><b>Symptômes :</b> Fuselage tourne (légèrement) à droite. "ALARM" puis "H.MOT" et "H.RAL" s'allument. La vitesse rotor diminue.</p>
                    <h3 class='text-xl font-bold text-red-600 mb-2'>Action immédiate :</h3>
                    <ul class='list-disc pl-5 space-y-2 mb-4'>
                        <li class='font-bold text-red-600'>Appliquer la procédure d'autorotation.</li>
                    </ul>
                    <h3 class='text-xl font-bold text-slate-700 mb-2'>Si l'altitude le permet (> 700m sol) :</h3>
                    <ul class='list-disc pl-5 space-y-2 mb-4'>
                        <li>Tenter une remise en route (Vi ~120 km/h, sélecteur sur M).</li>
                    </ul>
                    <h3 class='text-xl font-bold text-slate-700 mb-2'>Si l'altitude est trop faible :</h3>
                    <ul class='list-disc pl-5 space-y-2'>
                        <li>Robinet coupe-feu <b>FERMÉ</b>.</li>
                        <li>Couper la pompe de gavage, Sélecteur sur A, Réduire la manette de débit.</li>
                    </ul>` },
    { id: 'FONCT_ANORMAL_REGUL', title: 'Fonctionnement anormal du régulateur', 
      htmlContent: `<h2 class='text-2xl font-bold text-slate-800 mb-4 border-b pb-2'>RÉGULATEUR ANORMAL</h2>
                    <p class='mb-4'>Se manifeste par des <b>battements</b> (variations de la vitesse de rotation).</p>
                    <ol class='list-decimal pl-5 space-y-2'>
                        <li><b>Variations peu importantes :</b> perdre de l'altitude. Si le phénomène subsiste, mettre le régulateur hors circuit (diminuer de 500 tr/mn).</li>
                        <li><b>Variations importantes et rapides :</b> mettre le régulateur hors circuit immédiatement.</li>
                    </ol>
                    <p class='mt-4'><b>Vol avec régulateur hors circuit :</b> Croisière à 42.500 tr/mn environ et pas de l'ordre de 7,2°. Effectuer une approche glissée ou une autorotation selon l'équipage.</p>` },
    { id: 'FEU_GTM', title: 'Feu au GTM (Démarrage / En vol)', 
      htmlContent: `<h2 class='text-2xl font-bold text-red-600 mb-4 border-b pb-2'>FEU AU G.T.M</h2>
                    <h3 class='text-xl font-bold text-slate-700 mb-2'>Feu au démarrage :</h3>
                    <ol class='list-decimal pl-5 space-y-1 mb-4'>
                        <li>Fermer le robinet "coupe-feu" et appliquer le frein rotor.</li>
                        <li>Sélecteur de démarrage sur "A".</li>
                        <li>Réduire la manette de débit. Couper la pompe de gavage.</li>
                        <li>Procéder à une ventilation. Combattre le feu.</li>
                    </ol>
                    <h3 class='text-xl font-bold text-slate-700 mb-2'>Feu en vol :</h3>
                    <ol class='list-decimal pl-5 space-y-1'>
                        <li>Fermer le robinet coupe-feu et <b>réduire le pas général</b>.</li>
                        <li>Réduire la manette de débit. Couper la pompe de gavage.</li>
                        <li>Ne pas tenter de rallumage. Se poser en autorotation.</li>
                        <li>Mettre le sélecteur sur "A" dans les 20s.</li>
                    </ol>` },
    { id: 'FUMEE_CABINE', title: 'Fumée dans la cabine', 
      htmlContent: `<h2 class='text-2xl font-bold text-slate-800 mb-4 border-b pb-2'>FUMÉE EN CABINE</h2>
                    <p class='mb-2 text-red-600 font-bold'>Si l'origine n'est pas identifiée : ATTERRIR DES QUE POSSIBLE.</p>
                    <ol class='list-decimal pl-5 space-y-2'>
                        <li>Couper batterie, génératrice, alternateur.</li>
                        <li>Ventiler la cabine en ouvrant les fenêtres coulissantes.</li>
                        <li>Couper tous les interrupteurs électriques et le chauffage.</li>
                        <li>Remettre un par un les interrupteurs jusqu'à identification de la source.</li>
                        <li>Laisser l'équipement en cause sur arrêt.</li>
                    </ol>` },
    { id: 'ROTOR_ANTI_COUPLE', title: 'Panne du rotor anti-couple', 
      htmlContent: `<h2 class='text-2xl font-bold text-slate-800 mb-4 border-b pb-2'>PANNE ROTOR ANTI-COUPLE (RAC)</h2>
                    <p class='mb-4'>Mouvement de lacet vers la <b>gauche</b>.</p>
                    <h3 class='text-lg font-bold text-slate-700 mb-2'>Stationnaire / Basse vitesse / Faible altitude :</h3>
                    <ul class='list-disc pl-5 space-y-1 mb-4'>
                        <li>Passer immédiatement en autorotation (baisser pas collectif).</li>
                        <li>Contrer la rotation à droite (manche ou filet de puissance).</li>
                        <li>En approche finale, couper G.T.M et poser sur place (flare).</li>
                    </ul>
                    <h3 class='text-lg font-bold text-slate-700 mb-2'>En montée / En croisière :</h3>
                    <ul class='list-disc pl-5 space-y-1'>
                        <li>Réduire le pas pour annuler le dérapage.</li>
                        <li>Augmenter la vitesse, contrôler le cap par le roulis.</li>
                        <li>Rechercher un terrain pour autorotation avec flare accentué. GTM coupé en finale.</li>
                    </ul>` },
    { id: 'INCIDENT_CMDE_VOL', title: 'Incidents commandes de vol / Servo-commandes', 
      htmlContent: `<h2 class='text-2xl font-bold text-slate-800 mb-4 border-b pb-2'>INCIDENT COMMANDES DE VOL</h2>
                    <p class='mb-4'><b>Symptôme :</b> Durcissement des commandes de vol (sans allumage BP.HY).</p>
                    <p class='mb-2 font-bold'>Action Pilote :</p>
                    <ul class='list-disc pl-5 space-y-1'>
                        <li>Panne servo-commande confirmée : couper interrupteur "SERVO" (sur M).</li>
                        <li>Poursuivre le vol en pilotant aux efforts.</li>
                        <li>La vitesse maximale est réduite, atterrissage type approche plate.</li>
                    </ul>` },
    { id: 'ANOMALIE_CAP', title: 'Anomalies de cap / Gyro', 
      htmlContent: `<h2 class='text-2xl font-bold text-slate-800 mb-4 border-b pb-2'>ANOMALIE DE CAP</h2>
                    <p class='mb-2 font-bold'>Action Pilote :</p>
                    <ul class='list-disc pl-5 space-y-1'>
                        <li>Si le cap du directionnel est erroné, naviguer au compas de secours.</li>
                        <li>Vérifier le fonctionnement de l'alternateur (alimentation gyro).</li>
                    </ul>` },
    { id: 'PANNE_COUPLEMETRE', title: 'Panne de couplemètre', 
      htmlContent: `<h2 class='text-2xl font-bold text-slate-800 mb-4 border-b pb-2'>PANNE COUPLEMÈTRE</h2>
                    <p class='mb-2 font-bold'>Action Pilote :</p>
                    <ul class='list-disc pl-5 space-y-1'>
                        <li>En croisière, ne pas dépasser la première butée élastique du pas général.</li>
                    </ul>` }
];




