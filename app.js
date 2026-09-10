// app.js - Logique globale de l'EFB

// =========================================================================
// ÉTAT GLOBAL (Partagé entre les vues)
// =========================================================================
const globalState = {
    aircraft: "F-MGAP",
    mass: 1900,
    temp: 20,
    qnh: 1013,
    elevation: 0,
    scenario: "VOLTAC",
    mode: "ALT", // "ALT" ou "MASS"
    targetAlt: 2000
};

// =========================================================================
// CALCULS MÉTIERS
// =========================================================================

// Convertir QNH en Altitude Pression
function calculatePressureAltitude(elevation, qnh) {
    // Formule approchée (ISA) : Zp = Z + 28 * (1013.25 - QNH)
    return elevation + 28 * (1013.25 - qnh);
}

// Mettre à jour la masse en fonction de la machine sélectionnée
function updateAircraftMass() {
    if (fleetDatabase[globalState.aircraft]) {
        // Masse à vide
        globalState.mass = fleetDatabase[globalState.aircraft].emptyWeight + 400; // +400kg forfaitaire pour le moment
    }
}

// Fonctions d'interpolation
function getAltitudeForCurve(curvePts, mass) {
    const pts = [...curvePts].sort((a,b) => a.x - b.x);
    if (pts.length === 0) return 0;
    if (mass <= pts[0].x) {
        if (pts.length >= 2) {
            const slope = (pts[1].y - pts[0].y) / (pts[1].x - pts[0].x);
            return pts[0].y + slope * (mass - pts[0].x);
        }
        return pts[0].y;
    }
    if (mass >= pts[pts.length - 1].x) {
        if (pts.length >= 2) {
            const p1 = pts[pts.length - 2];
            const p2 = pts[pts.length - 1];
            const slope = (p2.y - p1.y) / (p2.x - p1.x);
            return p2.y + slope * (mass - p2.x);
        }
        return pts[pts.length - 1].y;
    }
    for (let i = 0; i < pts.length - 1; i++) {
        if (mass >= pts[i].x && mass <= pts[i+1].x) {
            const diffX = pts[i+1].x - pts[i].x;
            if (diffX === 0) return pts[i].y;
            return pts[i].y + ((mass - pts[i].x) / diffX) * (pts[i+1].y - pts[i].y);
        }
    }
    return 0;
}

function getMassForCurve(curvePts, altitude) {
    const pts = [...curvePts].sort((a,b) => a.x - b.x);
    if (pts.length === 0) return 1400;
    if (altitude >= pts[0].y) {
        if (pts.length >= 2) {
            const slope = (pts[1].x - pts[0].x) / (pts[1].y - pts[0].y);
            return pts[0].x + slope * (altitude - pts[0].y);
        }
        return pts[0].x; 
    }
    if (altitude <= pts[pts.length - 1].y) {
        if (pts.length >= 2) {
            const p1 = pts[pts.length - 2];
            const p2 = pts[pts.length - 1];
            const slope = (p2.x - p1.x) / (p2.y - p1.y);
            return p2.x + slope * (altitude - p2.y);
        }
        return pts[pts.length - 1].x; 
    }
    for (let i = 0; i < pts.length - 1; i++) {
        const y1 = pts[i].y;
        const y2 = pts[i+1].y;
        if ((altitude <= y1 && altitude >= y2) || (altitude >= y1 && altitude <= y2)) {
            const diffY = y2 - y1;
            if (diffY === 0) return pts[i].x;
            return pts[i].x + ((altitude - y1) / diffY) * (pts[i+1].x - pts[i].x);
        }
    }
    return pts[pts.length - 1].x;
}

function getCalculatedValue(chartId, mode) {
    const activeData = chartsDatabase[chartId].curves;
    if(!activeData || activeData.length === 0) return null;

    const sortedCurves = [...activeData].sort((a,b) => a.temp - b.temp);
    
    let val1, val2, temp1, temp2;
    let temp = globalState.temp;
    let inputValue = mode === 'ALT' ? globalState.mass : globalState.targetAlt;

    if (temp <= sortedCurves[0].temp) {
        return mode === 'ALT' 
            ? getAltitudeForCurve(sortedCurves[0].points, inputValue)
            : getMassForCurve(sortedCurves[0].points, inputValue);
    }
    if (temp >= sortedCurves[sortedCurves.length - 1].temp) {
        return mode === 'ALT'
            ? getAltitudeForCurve(sortedCurves[sortedCurves.length - 1].points, inputValue)
            : getMassForCurve(sortedCurves[sortedCurves.length - 1].points, inputValue);
    }

    for (let i = 0; i < sortedCurves.length - 1; i++) {
        if (temp >= sortedCurves[i].temp && temp <= sortedCurves[i+1].temp) {
            temp1 = sortedCurves[i].temp;
            temp2 = sortedCurves[i+1].temp;
            
            if (mode === 'ALT') {
                val1 = getAltitudeForCurve(sortedCurves[i].points, inputValue);
                val2 = getAltitudeForCurve(sortedCurves[i+1].points, inputValue);
            } else {
                val1 = getMassForCurve(sortedCurves[i].points, inputValue);
                val2 = getMassForCurve(sortedCurves[i+1].points, inputValue);
            }
            
            const diffT = temp2 - temp1;
            if (diffT === 0) return val1;
            return val1 + ((temp - temp1) / diffT) * (val2 - val1);
        }
    }
    return null;
}

function isPointInEnvelope(x, y, envelope) {
    // Si la masse dépasse la limite physique de l'abaque (généralement 2100-2200kg sur Gazelle), on force Hors Domaine
    if (x > 2200) return false;
    
    // S'il n'y a pas d'enveloppe définie (ex: HES LISSE pas encore numérisé), on accepte si x <= 2200
    if (!envelope || envelope.length < 3) return true;
    
    let inside = false;
    for (let i = 0, j = envelope.length - 1; i < envelope.length; j = i++) {
        let xi = envelope[i].x, yi = envelope[i].y;
        let xj = envelope[j].x, yj = envelope[j].y;
        let intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

// =========================================================================
// GESTION UI & GRAPHIQUES
// =========================================================================

function syncUI() {
    document.getElementById('tempValue').textContent = globalState.temp;
    document.getElementById('tempInput').value = globalState.temp;
    
    document.getElementById('qnhInput').value = globalState.qnh;
    document.getElementById('elevationInput').value = globalState.elevation;
    
    document.getElementById('massValue').textContent = Math.round(globalState.mass);
    document.getElementById('massInput').value = Math.round(globalState.mass);

    document.getElementById('altValue').textContent = Math.round(globalState.targetAlt);
    document.getElementById('altInput').value = Math.round(globalState.targetAlt);

    if (fleetDatabase[globalState.aircraft]) {
        document.getElementById('displayBaseMass').textContent = fleetDatabase[globalState.aircraft].emptyWeight + " kg";
    }

    let pAlt = calculatePressureAltitude(globalState.elevation, globalState.qnh);
    globalState.pressureAlt = pAlt;
    document.getElementById('displayPressureAlt').textContent = Math.round(pAlt) + " ft";
    
    const btnModeAlt = document.getElementById('btnModeAlt');
    const btnModeMass = document.getElementById('btnModeMass');
    const blockInputMass = document.getElementById('blockInputMass');
    const blockInputAlt = document.getElementById('blockInputAlt');

    if (globalState.mode === 'ALT') {
        btnModeAlt.className = "flex-1 py-2 text-sm font-bold bg-white text-blue-700 rounded shadow-sm border border-slate-200 transition-all";
        btnModeMass.className = "flex-1 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 rounded transition-all";
        blockInputMass.classList.remove('hidden');
        blockInputAlt.classList.add('hidden');
    } else {
        btnModeMass.className = "flex-1 py-2 text-sm font-bold bg-white text-blue-700 rounded shadow-sm border border-slate-200 transition-all";
        btnModeAlt.className = "flex-1 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 rounded transition-all";
        blockInputAlt.classList.remove('hidden');
        blockInputMass.classList.add('hidden');
    }

    renderScenarioTabs();
    drawCharts();
}

function renderScenarioTabs() {
    const tabsContainer = document.getElementById('scenarioTabs');
    tabsContainer.innerHTML = '';
    
    for (const [scenarioId, scenarioDef] of Object.entries(scenariosDatabase)) {
        const btn = document.createElement('button');
        btn.className = `px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap transition ${globalState.scenario === scenarioId ? 'bg-blue-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`;
        btn.textContent = scenarioDef.label;
        btn.onclick = () => {
            globalState.scenario = scenarioId;
            syncUI();
        };
        tabsContainer.appendChild(btn);
    }
}

function drawCharts() {
    if (typeof Plotly === 'undefined') return;

    const layoutContainer = document.getElementById('chartsLayout');
    const scenario = scenariosDatabase[globalState.scenario];
    if (!scenario) return;

    const aircraftConfig = fleetDatabase[globalState.aircraft]?.config || "LISSE";
    const currentSignature = globalState.scenario + "_" + aircraftConfig + "_" + globalState.mode;

    // Si la structure (scénario, config, mode) a changé, on reconstruit le DOM
    if (layoutContainer.dataset.signature !== currentSignature) {
        layoutContainer.innerHTML = '';
        layoutContainer.dataset.signature = currentSignature;

        scenario.charts.forEach(rawChartId => {
            const chartId = rawChartId.replace('SUFFIX', aircraftConfig);
            const chartDef = chartsDatabase[chartId];
            if (!chartDef) return;

            const divWrapper = document.createElement('div');
            divWrapper.className = "bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4";
            
            const header = document.createElement('div');
            header.className = "flex justify-between items-start";
            let resultTitle = globalState.mode === 'ALT' ? "Plafond Calculé" : "Masse Maximale";
            header.innerHTML = `
                <div>
                    <h3 class="font-bold text-slate-800">${chartDef.title}</h3>
                    <div class="text-xs text-slate-500 italic mt-1">Planche ${chartDef.planche || '-'}</div>
                </div>
                <div class="text-right">
                    <div class="text-xs font-bold text-slate-500 uppercase">${resultTitle}</div>
                    <div class="text-2xl font-black text-slate-800" id="res-${chartId}">--</div>
                    <div class="text-xs font-bold text-red-600 hidden" id="warn-${chartId}">HORS DOMAINE</div>
                </div>
            `;
            divWrapper.appendChild(header);

            if (chartDef.conditions) {
                const conds = document.createElement('div');
                conds.className = "text-xs bg-slate-50 p-2 rounded border border-slate-100";
                conds.innerHTML = `<span class="font-bold text-slate-700">Conditions : </span><span class="text-slate-600">${chartDef.conditions.join(', ')}</span>`;
                divWrapper.appendChild(conds);
            }

            const plotDiv = document.createElement('div');
            plotDiv.id = `plot-${chartId}`;
            plotDiv.style.height = "350px";
            plotDiv.className = "w-full";
            divWrapper.appendChild(plotDiv);
            layoutContainer.appendChild(divWrapper);
        });
    }

    // Mise à jour des valeurs et tracés Plotly
    scenario.charts.forEach(rawChartId => {
        const chartId = rawChartId.replace('SUFFIX', aircraftConfig);
        const chartDef = chartsDatabase[chartId];
        if (!chartDef) return;

        const plotDiv = document.getElementById(`plot-${chartId}`);
        const resEl = document.getElementById(`res-${chartId}`);
        const warnEl = document.getElementById(`warn-${chartId}`);
        if (!plotDiv || !resEl || !warnEl) return;

        const activeData = chartDef.curves || [];

        let finalMass = 1400;
        let finalAlt = 0;
        let calcValue = getCalculatedValue(chartId, globalState.mode);

        if (globalState.mode === 'ALT') {
            finalMass = globalState.mass;
            finalAlt = calcValue || 0;
        } else {
            finalAlt = globalState.targetAlt;
            finalMass = calcValue || 1400;
        }
        
        if (calcValue === null) {
            resEl.innerHTML = '<span class="text-amber-500">N/A</span>';
            Plotly.react(plotDiv, [], {
                title: 'Abaque non numérisé',
                xaxis: { range: [1400, 2250], visible: false },
                yaxis: { range: [-1000, 6000], visible: false },
                plot_bgcolor: '#f8fafc', paper_bgcolor: 'transparent'
            }, { displayModeBar: false });
            return;
        }

        let inEnvelope = isPointInEnvelope(finalMass, finalAlt, chartDef.limitEnvelope);
        if (!inEnvelope) {
            resEl.className = "text-2xl font-black text-red-600";
            resEl.textContent = globalState.mode === 'ALT' ? Math.round(finalAlt) + " m" : Math.round(finalMass) + " kg";
            warnEl.classList.remove('hidden');
        } else {
            resEl.className = "text-2xl font-black text-slate-800";
            resEl.textContent = globalState.mode === 'ALT' ? Math.round(finalAlt) + " m" : Math.round(finalMass) + " kg";
            warnEl.classList.add('hidden');
        }

        const plotlyCurves = activeData.map(curve => {
            const sortedPts = [...curve.points].sort((a,b) => a.x - b.x);
            return { t: curve.temp, x: sortedPts.map(p=>p.x), y: sortedPts.map(p=>p.y) };
        });

        const traces = plotlyCurves.map(curve => {
            const textArr = curve.x.map((_, i) => i === curve.x.length - 1 ? `${curve.t}°` : '');
            return {
                x: curve.x, y: curve.y, text: textArr, mode: 'lines+text', textposition: 'middle right',
                textfont: { color: '#94a3b8', size: 11, family: 'sans-serif' },
                line: { color: '#cbd5e1', width: 2 }, name: `${curve.t}°C`, hoverinfo: 'name', showlegend: false
            };
        });

        let limitTrace = {
            x: [1400, 2200], y: [4000, 4000], mode: 'lines',
            line: { color: '#0f172a', width: 3 }, name: 'Limite', hoverinfo: 'none', showlegend: false
        };

        if (chartDef.limitEnvelope && chartDef.limitEnvelope.length > 0) {
            limitTrace = {
                x: chartDef.limitEnvelope.map(p => p.x),
                y: chartDef.limitEnvelope.map(p => p.y),
                mode: 'lines',
                line: { color: '#0f172a', width: 4 },
                name: 'Domaine Approuvé',
                hoverinfo: 'none',
                showlegend: false
            };
            limitTrace.x.push(limitTrace.x[0]);
            limitTrace.y.push(limitTrace.y[0]);
        }
        traces.push(limitTrace);

        let plotMass = Math.max(1400, Math.min(finalMass, 2245));
        let plotAlt = Math.max(-1000, Math.min(finalAlt, 6000));

        traces.push({
            x: [plotMass, plotMass, 1400], y: [-1000, plotAlt, plotAlt],
            mode: 'lines', line: { color: '#ef4444', width: 2, dash: 'dashdot' }, hoverinfo: 'none', showlegend: false
        });
        
        traces.push({
            x: [plotMass], y: [plotAlt], mode: 'markers',
            marker: { color: '#ef4444', size: 10, line: {color: 'white', width: 2} },
            name: 'Lecture', hovertemplate: `Masse: ${Math.round(finalMass)} kg<br>Altitude: ${Math.round(finalAlt)} m<extra></extra>`,
            showlegend: false
        });

        const layout = {
            xaxis: { title: chartDef.xAxisLabel || 'MASSE (kg)', range: [1400, 2250], dtick: 100, gridcolor: '#f1f5f9', zeroline: false },
            yaxis: { title: chartDef.yAxisLabel || 'ALTITUDE PRESSION (m)', range: [-1000, 6000], dtick: 1000, gridcolor: '#e2e8f0', zeroline: true },
            margin: { l: 70, r: 40, t: 80, b: 60 }, plot_bgcolor: '#ffffff', paper_bgcolor: 'transparent',
            hovermode: 'closest', dragmode: false
        };

        Plotly.react(plotDiv, traces, layout, { responsive: true, displayModeBar: false });
    });
}

window.triggerChartsRedraw = drawCharts;

// =========================================================================
// ROUTEUR SPA (Navigation entre les vues)
// =========================================================================

function showView(viewId) {
    document.querySelectorAll('.app-view').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('flex');
    });

    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.remove('hidden');
        if (viewId === 'view-perf') {
            targetView.classList.add('flex');
            drawCharts();
        } else if (viewId === 'view-settings') {
            targetView.classList.add('flex');
            document.getElementById('tab-fleet').click();
        } else if (viewId === 'view-pannes') {
            targetView.classList.add('flex');
        } else if (viewId === 'view-home') {
            targetView.classList.add('flex');
        }
    }

    const btnBack = document.getElementById('btn-back-home');
    if (viewId === 'view-home') {
        btnBack.classList.add('hidden');
    } else {
        btnBack.classList.remove('hidden');
    }
}

window.updateAircraftSelector = function() {
    const selectAircraft = document.getElementById('selectAircraft');
    const currentVal = selectAircraft.value;
    selectAircraft.innerHTML = '';
    for (const [immat, data] of Object.entries(fleetDatabase)) {
        const opt = document.createElement('option');
        opt.value = immat;
        opt.textContent = `${immat} (${data.number || '-'}) - ${data.config || 'LISSE'}`;
        selectAircraft.appendChild(opt);
    }
    if (fleetDatabase[currentVal]) {
        selectAircraft.value = currentVal;
    } else {
        const first = Object.keys(fleetDatabase)[0];
        if (first) {
            selectAircraft.value = first;
            globalState.aircraft = first;
        }
    }
    updateAircraftMass();
    syncUI();
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Charger la BD locale (fonction définie dans settings.js)
    if (typeof loadUserDatabase === 'function') loadUserDatabase();

    // 2. Remplir le sélecteur
    updateAircraftSelector();

    // 3. Écouteurs de navigation
    document.getElementById('btn-nav-perf').addEventListener('click', () => showView('view-perf'));
    document.getElementById('btn-nav-pannes').addEventListener('click', () => showView('view-pannes'));
    document.getElementById('btn-nav-settings').addEventListener('click', () => showView('view-settings'));
    document.getElementById('btn-back-home').addEventListener('click', () => showView('view-home'));

    // 4. Écouteurs Réglages (Tabs)
    if (document.getElementById('tab-fleet')) {
        document.getElementById('tab-fleet').addEventListener('click', (e) => {
            document.querySelectorAll('#view-settings nav button').forEach(b => { b.classList.remove('bg-blue-50','text-blue-700','font-bold'); b.classList.add('text-slate-600','font-medium'); });
            e.target.classList.add('bg-blue-50','text-blue-700','font-bold');
            if (typeof renderSettingsFleet === 'function') renderSettingsFleet();
        });
        document.getElementById('tab-scenarios').addEventListener('click', (e) => {
            document.querySelectorAll('#view-settings nav button').forEach(b => { b.classList.remove('bg-blue-50','text-blue-700','font-bold'); b.classList.add('text-slate-600','font-medium'); });
            e.target.classList.add('bg-blue-50','text-blue-700','font-bold');
            if (typeof renderSettingsScenarios === 'function') renderSettingsScenarios();
        });
        document.getElementById('tab-export').addEventListener('click', (e) => {
            document.querySelectorAll('#view-settings nav button').forEach(b => { b.classList.remove('bg-blue-50','text-blue-700','font-bold'); b.classList.add('text-slate-600','font-medium'); });
            e.target.classList.add('bg-blue-50','text-blue-700','font-bold');
            if (typeof renderSettingsExport === 'function') renderSettingsExport();
        });
    }

    // 5. Écouteurs Inputs
    document.getElementById('selectAircraft').addEventListener('change', (e) => { globalState.aircraft = e.target.value; updateAircraftMass(); syncUI(); });
    document.getElementById('tempInput').addEventListener('input', (e) => { globalState.temp = parseFloat(e.target.value); syncUI(); });
    document.getElementById('qnhInput').addEventListener('input', (e) => { globalState.qnh = parseFloat(e.target.value); syncUI(); });
    document.getElementById('elevationInput').addEventListener('input', (e) => { globalState.elevation = parseFloat(e.target.value); syncUI(); });
    document.getElementById('massInput').addEventListener('input', (e) => { globalState.mass = parseFloat(e.target.value); syncUI(); });
    document.getElementById('altInput').addEventListener('input', (e) => { globalState.targetAlt = parseFloat(e.target.value); syncUI(); });

    document.getElementById('btnModeAlt').addEventListener('click', () => { globalState.mode = 'ALT'; syncUI(); });
    document.getElementById('btnModeMass').addEventListener('click', () => { globalState.mode = 'MASS'; syncUI(); });

    // Init state
    showView('view-home');
});


// =========================================================================
// MODULE PANNES
// =========================================================================
function initPannes() {
    const searchInput = document.getElementById('search-pannes');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', renderAutresPannes);
    render7Alpha();
    renderAutresPannes();
}

function render7Alpha() {
    const container = document.getElementById('panneau-7-alpha');
    if (!container) return;
    container.innerHTML = '';

    panneau7Alpha.forEach(voyant => {
        if (!voyant || voyant.color === 'none') {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'h-12';
            container.appendChild(emptyDiv);
            return;
        }

        const btn = document.createElement('button');
        
        let colorClasses = 'bg-[#2a2015] border-[#4a3520] text-amber-500 hover:bg-amber-500 hover:text-black hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.8)]';

        btn.className = 'h-12 rounded-sm font-bold text-[14px] uppercase leading-none border-2 transition-all duration-200 flex items-center justify-center text-center p-1 7-alpha-btn ' + colorClasses;
        btn.innerHTML = voyant.label;
        btn.onclick = () => loadPdf(voyant.pdf, btn, true);
        
        container.appendChild(btn);
    });
}

function renderAutresPannes() {
    const searchStr = document.getElementById('search-pannes').value.toLowerCase();
    const listContainer = document.getElementById('list-pannes');
    if (!listContainer) return;
    listContainer.innerHTML = '';

    autresPannes.forEach(p => {
        if (p.title.toLowerCase().includes(searchStr)) {
            const btn = document.createElement('button');
            btn.className = 'w-full text-left bg-white border border-slate-200 hover:border-red-400 hover:shadow-sm p-3 rounded-lg transition group list-panne-btn';
            btn.innerHTML = "<div class='font-bold text-slate-700 group-hover:text-red-600 transition'>" + p.title + "</div>";
            btn.onclick = () => loadPdf(p.pdf, btn, false);
            listContainer.appendChild(btn);
        }
    });
}

function loadPdf(pdfUrl, btnElement, is7Alpha) {
    document.querySelectorAll('.7-alpha-btn').forEach(b => {
        b.classList.remove('bg-amber-500', 'text-black', 'border-amber-400', 'shadow-[0_0_15px_rgba(245,158,11,0.8)]', 'z-10');
        b.classList.add('bg-[#2a2015]', 'border-[#4a3520]', 'text-amber-500');
    });
    document.querySelectorAll('.list-panne-btn').forEach(b => {
        b.classList.remove('border-red-500', 'ring-2', 'ring-red-100');
        b.classList.add('border-slate-200');
    });

    if (btnElement) {
        if (is7Alpha) {
            btnElement.classList.remove('bg-[#2a2015]', 'border-[#4a3520]', 'text-amber-500');
            btnElement.classList.add('bg-amber-500', 'text-black', 'border-amber-400', 'shadow-[0_0_15px_rgba(245,158,11,0.8)]', 'z-10');
        } else {
            btnElement.classList.remove('border-slate-200');
            btnElement.classList.add('border-red-500', 'ring-2', 'ring-red-100');
        }
    }

    const iframe = document.getElementById('pdf-frame');
    const placeholder = document.getElementById('pdf-placeholder');
    
    placeholder.classList.add('hidden');
    iframe.classList.remove('hidden');
    
    iframe.src = encodeURI(pdfUrl);
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', () => {
    if(typeof initPannes === 'function') initPannes();
});






