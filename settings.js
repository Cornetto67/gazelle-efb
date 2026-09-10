// Ajout à la fin de app.js
// =========================================================================
// MODULE REGLAGES (Gestion de la base de données locale)
// =========================================================================

function loadUserDatabase() {
    try {
        const storedFleet = localStorage.getItem('efb_fleet');
        if (storedFleet) {
            const parsed = JSON.parse(storedFleet);
            Object.assign(fleetDatabase, parsed);
        }
        
        const storedScenarios = localStorage.getItem('efb_scenarios');
        if (storedScenarios) {
            const parsed = JSON.parse(storedScenarios);
            Object.assign(scenariosDatabase, parsed);
        }
    } catch(e) { console.error("Erreur de lecture de la base locale", e); }
}

function saveUserDatabase() {
    localStorage.setItem('efb_fleet', JSON.stringify(fleetDatabase));
    localStorage.setItem('efb_scenarios', JSON.stringify(scenariosDatabase));
    // Mettre à jour les sélecteurs
    updateAircraftSelector();
}

function renderSettingsFleet() {
    const container = document.getElementById('settings-content');
    let html = `<div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-black text-slate-800">Gestion de la Flotte</h3>
        <button onclick="editAircraft('')" class="bg-blue-600 text-white px-4 py-2 rounded font-bold shadow hover:bg-blue-700">Ajouter un Aéronef</button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">`;
    
    for (const [immat, data] of Object.entries(fleetDatabase)) {
        html += `
        <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h4 class="text-lg font-black text-slate-800">${immat}</h4>
                    <div class="text-xs font-bold text-slate-500">N° ${data.number || '-'}</div>
                </div>
                <span class="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold border border-slate-200">${data.config || 'LISSE'}</span>
            </div>
            <div class="space-y-1 text-sm text-slate-600 mb-4">
                <div class="flex justify-between"><span>Masse à vide:</span> <span class="font-bold text-slate-800">${data.emptyWeight} kg</span></div>
                <div class="flex justify-between"><span>Mom. Longi:</span> <span class="font-bold text-slate-800">${data.emptyMomLong}</span></div>
                <div class="flex justify-between"><span>Mom. Lat:</span> <span class="font-bold text-slate-800">${data.emptyMomLat}</span></div>
            </div>
            <div class="flex gap-2">
                <button onclick="editAircraft('${immat}')" class="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold py-1.5 rounded transition">Modifier</button>
                <button onclick="deleteAircraft('${immat}')" class="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-bold py-1.5 px-3 rounded transition">Supprimer</button>
            </div>
        </div>`;
    }
    
    html += `</div>`;
    container.innerHTML = html;
}

window.editAircraft = function(existingImmat) {
    const isNew = !existingImmat;
    const data = existingImmat ? fleetDatabase[existingImmat] : { config: "LISSE", emptyWeight: 1250, centrage: 4.0, number: "" };
    
    // Garder la compatibilité si anciennes données avec momLong
    let centrageVal = data.centrage !== undefined ? data.centrage : (data.emptyMomLong ? data.emptyMomLong / data.emptyWeight : 0);
    // Arrondir pour affichage
    if (centrageVal > 0) centrageVal = centrageVal.toFixed(2);

    const container = document.getElementById('settings-content');
    container.innerHTML = `
        <h3 class="text-2xl font-black text-slate-800 mb-6">${isNew ? "Ajouter un aéronef" : "Modifier " + existingImmat}</h3>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 max-w-xl">
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Indicatif</label>
                    <input type="text" id="frm-immat" value="${existingImmat || ''}" ${!isNew ? 'readonly class="w-full border-2 border-slate-100 bg-slate-50 rounded p-2 text-slate-500 font-bold"' : 'class="w-full border-2 border-slate-200 rounded p-2 text-slate-800 font-bold focus:border-blue-500" placeholder="ex: F-MXXX"'} >
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Numéro</label>
                    <input type="text" id="frm-num" value="${data.number || ''}" class="w-full border-2 border-slate-200 rounded p-2 text-slate-800 font-bold focus:border-blue-500" placeholder="ex: 5678">
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Masse à vide (kg)</label>
                    <input type="number" id="frm-weight" value="${data.emptyWeight}" class="w-full border-2 border-slate-200 rounded p-2 text-slate-800 font-bold focus:border-blue-500">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Centrage</label>
                    <input type="number" step="0.01" id="frm-centrage" value="${centrageVal}" class="w-full border-2 border-slate-200 rounded p-2 text-slate-800 font-bold focus:border-blue-500">
                </div>
            </div>

            <div class="mb-6">
                <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Configuration (Nécessaire au calcul)</label>
                <select id="frm-config" class="w-full border-2 border-slate-200 rounded p-2 text-slate-800 font-bold focus:border-blue-500">
                    <option value="LISSE" ${data.config === 'LISSE' ? 'selected' : ''}>LISSE (Sans armement)</option>
                    <option value="ARME" ${data.config === 'ARME' ? 'selected' : ''}>ARMÉ (4 HOT, Viviane...)</option>
                </select>
            </div>

            <div class="flex gap-3">
                <button onclick="saveAircraft('${existingImmat}')" class="flex-1 bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition">Enregistrer</button>
                <button onclick="renderSettingsFleet()" class="bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded hover:bg-slate-300 transition">Annuler</button>
            </div>
        </div>
    `;
}

window.saveAircraft = function(oldImmat) {
    const immat = document.getElementById('frm-immat').value.trim();
    if (!immat) return alert("L'indicatif est obligatoire");
    
    fleetDatabase[immat] = {
        number: document.getElementById('frm-num').value.trim(),
        config: document.getElementById('frm-config').value,
        emptyWeight: parseFloat(document.getElementById('frm-weight').value) || 0,
        centrage: parseFloat(document.getElementById('frm-centrage').value) || 0
    };
    
    saveUserDatabase();
    renderSettingsFleet();
}

window.deleteAircraft = function(immat) {
    if (confirm(`Supprimer définitivement l'aéronef ${immat} ?`)) {
        delete fleetDatabase[immat];
        saveUserDatabase();
        renderSettingsFleet();
    }
}

function renderSettingsExport() {
    const container = document.getElementById('settings-content');
    container.innerHTML = `
        <h3 class="text-2xl font-black text-slate-800 mb-6">Import / Export de la Base</h3>
        <div class="max-w-2xl bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
            <h4 class="text-lg font-bold text-slate-800 mb-2">Exporter vos modifications</h4>
            <p class="text-sm text-slate-600 mb-4">Téléchargez un fichier contenant vos aéronefs et profils de vol personnalisés pour les envoyer à un collègue.</p>
            <button onclick="exportDatabase()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded shadow transition">Télécharger la base (.json)</button>
        </div>
        
        <div class="max-w-2xl bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h4 class="text-lg font-bold text-slate-800 mb-2">Importer une base</h4>
            <p class="text-sm text-slate-600 mb-4">Chargez un fichier de base de données envoyé par un collègue. <strong>Attention :</strong> Cela remplacera vos réglages locaux actuels.</p>
            <input type="file" id="importFile" accept=".json" class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4"/>
            <button onclick="importDatabase()" class="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded shadow transition">Importer et écraser</button>
        </div>
    `;
}

window.exportDatabase = function() {
    const data = {
        fleet: JSON.parse(localStorage.getItem('efb_fleet') || '{}'),
        scenarios: JSON.parse(localStorage.getItem('efb_scenarios') || '{}')
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "gazelle_efb_database.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

window.importDatabase = function() {
    const file = document.getElementById('importFile').files[0];
    if (!file) return alert("Veuillez sélectionner un fichier JSON.");
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.fleet) localStorage.setItem('efb_fleet', JSON.stringify(data.fleet));
            if (data.scenarios) localStorage.setItem('efb_scenarios', JSON.stringify(data.scenarios));
            alert("Base importée avec succès ! L'application va se recharger.");
            window.location.reload();
        } catch(err) {
            alert("Erreur lors de la lecture du fichier : Format invalide.");
        }
    };
    reader.readAsText(file);
}

window.renderSettingsScenarios = function() {
    const container = document.getElementById('settings-content');
    let html = `
        <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-black text-slate-800">Profils de Vol</h3>
            <button onclick="editScenario('')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow transition">+ Nouveau Profil</button>
        </div>
        <div class="grid gap-4">
    `;

    for (const [id, sc] of Object.entries(scenariosDatabase)) {
        html += `
            <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center hover:border-blue-300 transition">
                <div>
                    <h4 class="font-bold text-slate-800 text-lg">${sc.label}</h4>
                    <div class="text-xs text-slate-500 mt-1 font-mono">Abaques inclus : ${sc.charts.join(', ')}</div>
                </div>
                <div class="flex gap-2">
                    <button onclick="editScenario('${id}')" class="bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded font-semibold transition">Modifier</button>
                    <button onclick="deleteScenario('${id}')" class="bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 px-3 py-1.5 rounded font-semibold transition">Supprimer</button>
                </div>
            </div>
        `;
    }
    
    html += `</div>`;
    container.innerHTML = html;
}

window.editScenario = function(existingId) {
    const isNew = !existingId;
    const data = existingId ? scenariosDatabase[existingId] : { label: "Nouveau Profil", charts: [] };
    
    // Extraire tous les types d'abaques génériques disponibles (ex: HES, DES, TAC)
    const availablePrefixes = [...new Set(Object.keys(chartsDatabase).map(k => k.split('_')[0]))];
    
    // Générer les cases à cocher
    let checkboxesHtml = availablePrefixes.map(prefix => {
        // Trouver un titre d'exemple (ex: "Abaque 8.6 - PLAFOND H.E.S.")
        const sampleChart = chartsDatabase[`${prefix}_LISSE`] || chartsDatabase[`${prefix}_ARME`];
        const title = sampleChart ? sampleChart.title : prefix;
        const chartId = `${prefix}_SUFFIX`; // SUFFIX sera remplacé dynamiquement par ARME ou LISSE
        const checked = data.charts.includes(chartId) ? 'checked' : '';
        
        return `
            <label class="flex items-center gap-3 p-3 border border-slate-200 rounded cursor-pointer hover:bg-slate-50">
                <input type="checkbox" class="frm-scenario-chart w-5 h-5 text-blue-600" value="${chartId}" ${checked}>
                <span class="font-bold text-slate-700">${title} <span class="font-normal text-slate-400 text-xs ml-1">(${chartId})</span></span>
            </label>
        `;
    }).join('');

    const container = document.getElementById('settings-content');
    container.innerHTML = `
        <h3 class="text-2xl font-black text-slate-800 mb-6">${isNew ? "Créer un profil" : "Modifier " + existingId}</h3>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 max-w-xl">
            <div class="mb-6">
                <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Identifiant système (sans espace)</label>
                <input type="text" id="frm-scen-id" value="${existingId || ''}" ${!isNew ? 'readonly class="w-full border-2 border-slate-100 bg-slate-50 rounded p-2 text-slate-500 font-bold"' : 'class="w-full border-2 border-slate-200 rounded p-2 text-slate-800 font-bold focus:border-blue-500" placeholder="ex: ENTRAINEMENT"'} >
            </div>
            <div class="mb-6">
                <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Nom d'affichage</label>
                <input type="text" id="frm-scen-label" value="${data.label}" class="w-full border-2 border-slate-200 rounded p-2 text-slate-800 font-bold focus:border-blue-500" placeholder="ex: Vol d'entraînement">
            </div>
            
            <div class="mb-6">
                <label class="block text-xs font-bold text-slate-500 uppercase mb-3">Abaques à afficher dans ce profil</label>
                <div class="flex flex-col gap-2">
                    ${checkboxesHtml}
                </div>
            </div>

            <div class="flex gap-3">
                <button onclick="saveScenario('${existingId}')" class="flex-1 bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition">Enregistrer</button>
                <button onclick="renderSettingsScenarios()" class="bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded hover:bg-slate-300 transition">Annuler</button>
            </div>
        </div>
    `;
}

window.saveScenario = function(oldId) {
    const rawId = document.getElementById('frm-scen-id').value.trim();
    // Nettoyer l'ID pour qu'il soit propre (MAJUSCULES, pas d'espaces ni d'accents)
    const id = rawId.toUpperCase().replace(/[^A-Z0-9_]/g, '');
    
    if (!id) return alert("L'identifiant est obligatoire");
    
    const label = document.getElementById('frm-scen-label').value.trim();
    if (!label) return alert("Le nom d'affichage est obligatoire");
    
    const checkboxes = document.querySelectorAll('.frm-scenario-chart:checked');
    const charts = Array.from(checkboxes).map(cb => cb.value);
    
    if (charts.length === 0) return alert("Vous devez sélectionner au moins un abaque.");

    scenariosDatabase[id] = {
        label: label,
        charts: charts
    };
    
    saveUserDatabase();
    
    // Mettre à jour l'interface principale
    if (typeof renderScenarioTabs === 'function') {
        // Si on supprime le scénario actif
        if (!scenariosDatabase[globalState.scenario]) {
             globalState.scenario = Object.keys(scenariosDatabase)[0];
        }
        renderScenarioTabs();
        if (typeof syncUI === 'function') syncUI();
    }
    
    renderSettingsScenarios();
}

window.deleteScenario = function(id) {
    if (confirm(`Supprimer définitivement le profil ${id} ?`)) {
        delete scenariosDatabase[id];
        saveUserDatabase();
        
        if (typeof renderScenarioTabs === 'function') {
            if (globalState.scenario === id) {
                 globalState.scenario = Object.keys(scenariosDatabase)[0];
            }
            renderScenarioTabs();
            if (typeof syncUI === 'function') syncUI();
        }
        
        renderSettingsScenarios();
    }
}
