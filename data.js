// =========================================================================
// BASE DE DONNÉES DES PERFORMANCES GAZELLE (SA 342 M1)
// =========================================================================
// MODE D'EMPLOI POUR AJOUTER/MODIFIER UNE COURBE :
// 1. Utilisez "digitizer.html" pour obtenir le JSON de votre courbe.
// 2. Collez-le dans les crochets "curves: [...]" du bloc correspondant.
// 
// POUR AJOUTER UNE TOUTE NOUVELLE CATÉGORIE (Ex: Masse max au décollage) :
// Copiez-collez un bloc entier (ex: de "HES_ARME": { ... } ) et changez :
// - type: "Identifiant court (ex: MMD)"
// - typeLabel: "Nom qui apparaîtra dans le 1er menu déroulant"
// - configLabel: "Nom qui apparaîtra dans le 2ème menu déroulant"
// - xAxisLabel et yAxisLabel : Les titres des axes (si besoin de les changer)

const chartsDatabase = {
    
    // ================== PLAFONDS H.E.S. ==================
    "HES_ARME": {
        title: "Abaque 8.6 - PLAFOND H.E.S.",
        type: "HES",
        typeLabel: "Plafond Vol Stationnaire H.E.S.",
        configLabel: "Armé (4 HOT, Viviane)",
        conditions: ["D.D.J.", "4 HOT", "Viseur VIVIANE"],
        planche: "Planche 9",
        xAxisLabel: "MASSE (kg)",
        yAxisLabel: "ALTITUDE PRESSION (m)",
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
        curves: []
    },

    // ================== PLAFONDS D.E.S. ==================
    "DES_ARME": {
        title: "Abaque 8.6 - PLAFOND D.E.S.",
        type: "DES",
        typeLabel: "Plafond Vol Stationnaire D.E.S.",
        configLabel: "Armé (4 HOT, Viviane)",
        conditions: ["D.D.J.", "4 HOT", "Viseur VIVIANE"],
        planche: "Planche 10",
        xAxisLabel: "MASSE (kg)",
        yAxisLabel: "ALTITUDE PRESSION (m)",
        curves: []
    },
    "DES_LISSE": {
        title: "Abaque 8.6 - PLAFOND D.E.S.",
        type: "DES",
        typeLabel: "Plafond Vol Stationnaire D.E.S.",
        configLabel: "Appareil Lisse",
        conditions: ["APPAREIL LISSE", "SANS TUBE POLYVALENT", "AVEC DDJ"],
        planche: "Planche 10A",
        xAxisLabel: "MASSE (kg)",
        yAxisLabel: "ALTITUDE PRESSION (m)",
        curves: []
    },

    // ================== VOL TACTIQUE ==================
    "TAC_ARME": {
        title: "Abaque 8.6 - VOL TACTIQUE",
        type: "TAC",
        typeLabel: "Plafond Vol Tactique",
        configLabel: "Armé (4 HOT, Viviane)",
        conditions: ["D.D.J.", "4 HOT", "Viseur VIVIANE"],
        planche: "Planche 11",
        xAxisLabel: "MASSE (kg)",
        yAxisLabel: "ALTITUDE PRESSION (m)",
        curves: []
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
        curves: []
    }
};
