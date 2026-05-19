const firebaseConfig = {
  apiKey: 'AIzaSyCBeFZHDdt2av9I4d0EN_fFSugZ7f9prKQ',
  authDomain: 'bestiario-9a59a.firebaseapp.com',
  databaseURL: 'https://bestiario-9a59a-default-rtdb.firebaseio.com',
  projectId: 'bestiario-9a59a',
  storageBucket: 'bestiario-9a59a.firebasestorage.app',
  messagingSenderId: '877990974200',
  appId: '1:877990974200:web:f94f40c25ea9c7fb52210d',
  measurementId: 'G-V3TK3ZS1VQ',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.database();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const charactersRef = database.ref('characters');
const userDecksRef = database.ref('userDecks');
const onlineUsersRef = database.ref('onlineUsers');
const battleChallengesRef = database.ref('battleChallenges');
const battleSessionsRef = database.ref('battleSessions');

const buttons = document.querySelectorAll('.menu-btn');
const panels = document.querySelectorAll('.panel');
const personajesPanel = document.querySelector('#personajes');
const addCharacterButton = document.querySelector('.add-character-btn');
const randomCharacterButton = document.querySelector('.random-character-btn');
const loginGoogleButton = document.querySelector('#login-google-btn');
const logoutButton = document.querySelector('#logout-btn');
const authPanel = document.querySelector('#auth-panel');
const authUserPanel = document.querySelector('#auth-user-panel');
const gameLayout = document.querySelector('#game-layout');
const userName = document.querySelector('#user-name');
const userUid = document.querySelector('#user-uid');
const userPhoto = document.querySelector('#user-photo');
const battleUsersList = document.querySelector('#battle-users-list');
const battleChallengeModal = document.querySelector('#battle-challenge-modal');
const challengeMessage = document.querySelector('#challenge-message');
const acceptChallengeButton = document.querySelector('#accept-challenge-btn');
const rejectChallengeButton = document.querySelector('#reject-challenge-btn');
const battleArenaModal = document.querySelector('#battle-arena-modal');
const battleArenaCloseButton = document.querySelector('#battle-arena-close-btn');
const battleTurnLabel = document.querySelector('#battle-turn-label');
const battleHand = document.querySelector('#battle-hand');
const battleOpponentSlots = document.querySelector('#battle-opponent-slots');
const battlePlayerSlots = document.querySelector('#battle-player-slots');
const battleCardActionModal = document.querySelector('#battle-card-action-modal');
const battleActionPlaceButton = document.querySelector('#battle-action-place');
const battleActionFaceDownButton = document.querySelector('#battle-action-facedown');
const battleActionCancelButton = document.querySelector('#battle-action-cancel');
const battleSurrenderVictoryModal = document.querySelector('#battle-surrender-victory-modal');
const battleSurrenderVictoryText = document.querySelector('#battle-surrender-victory-text');
const battleSurrenderVictoryCloseButton = document.querySelector('#battle-surrender-victory-close-btn');

const characterTypes = [
  { type: 'Brujas', clans: ['Luna Carmesí', 'Hijas del Caldero', 'Las Espinas Negras', 'Coven Eclipse'] },
  { type: 'Vampiros', clans: ['Sangre Antigua', 'Noctis', 'Dracul Vesper', 'Hijos del Último Colmillo'] },
  { type: 'Fantasmas', clans: ['Ecos Vacíos', 'Los Errantes', 'Susurro Gris', 'Cadena Eterna'] },
  { type: 'Demonios', clans: ['Fuego Abisal', 'Devoralmas', 'Cuernos Rojos', 'Trono Infernal'] },
  { type: 'Ángeles', clans: ['Corona Celeste', 'Alas del Alba', 'Virtud Suprema', 'Los Vigilantes'] },
  { type: 'Licántropos', clans: ['Colmillo Lunar', 'Manada Gris', 'Sangre Salvaje', 'Hijos del Bosque Negro'] },
  { type: 'Nigromantes', clans: ['Mano Sepulcral', 'Reyes del Osario', 'Culto del Fin', 'Los Resucitados'] },
  { type: 'Dragones', clans: ['Escama Dorada', 'Furia Volcánica', 'Alas Eternas', 'Trono Dracónido'] },
  { type: 'Sirenas', clans: ['Marea Azul', 'Canto Mortal', 'Hijas del Coral Negro', 'Las Ahogadoras'] },
  { type: 'Cazadores', clans: ['Orden Plateada', 'Los Exiliados', 'Cruz de Hierro', 'Ojo del Cuervo'] },
  { type: 'Hadas', clans: ['Polvo Lunar', 'Jardín Viviente', 'Corte Esmeralda', 'Alas de Cristal'] },
  { type: 'Titanes', clans: ['Rompemontes', 'Hijos del Trueno', 'Colosos del Norte', 'Sangre de Piedra'] },
  { type: 'Espíritus', clans: ['Llama Serena', 'Los Transparentes', 'Viento Antiguo', 'Ceniza Blanca'] },
  { type: 'Elfos Oscuros', clans: ['Sombras de Ébano', 'Corte Nocturna', 'Dagas Violetas', 'Veneno Silente'] },
  { type: 'Paladines', clans: ['Sol Inmortal', 'Martillo Sagrado', 'Juramento Real', 'Guardia del Alba'] },
  { type: 'Asesinos', clans: ['Diente Negro', 'La Última Sombra', 'Silencio Carmesí', 'Manos Invisibles'] },
  { type: 'Magos', clans: ['Torre Arcana', 'Ojo Astral', 'Biblioteca Prohibida', 'Hijos del Vacío'] },
  { type: 'Elementales', clans: ['Clan Ígneo', 'Hijos del Tifón', 'Corazón Glacial', 'Raíz Primordial'] },
  { type: 'Gárgolas', clans: ['Piedra Viva', 'Vigías Eternos', 'Alas de Mármol', 'Guardianes de Catedral'] },
  { type: 'Reapers', clans: ['La Guadaña', 'Fin Absoluto', 'Custodios del Umbral', 'Hueso Negro'] },
  { type: 'Orcos', clans: ['Mandíbula Roja', 'Hacha Salvaje', 'Cráneo Partido', 'Guerreros del Pantano'] },
  { type: 'Goblins', clans: ['Dedos Largos', 'Ratas Verdes', 'Dinamita Negra', 'Los Chatarreros'] },
  { type: 'Alquimistas', clans: ['Oro Filosofal', 'Frascos Prohibidos', 'Vapor Esmeralda', 'Elixir Supremo'] },
  { type: 'Caballeros Malditos', clans: ['Armadura Vacía', 'Cruz Sangrienta', 'Los Caídos', 'Hierro Profano'] },
  { type: 'Bestias Mutantes', clans: ['Carne Tóxica', 'Colmillos Rotos', 'Laboratorio X', 'Hijos del Error'] },
  { type: 'Monjes', clans: ['Puño Celestial', 'Camino Silente', 'Lotus Negro', 'Respiración Divina'] },
  { type: 'Piratas', clans: ['Marea Roja', 'Kraken Negro', 'La Calavera Azul', 'Tempestad Salvaje'] },
  { type: 'Androides', clans: ['Código Omega', 'Titanio Vivo', 'Unidad Eclipse', 'Protocolos Negros'] },
  { type: 'Cyborgs', clans: ['Carne Mecánica', 'Acero Neural', 'División Hex', 'Núcleo Fantasma'] },
  { type: 'Mutantes', clans: ['ADN Caos', 'Hijos Gamma', 'Sangre Rota', 'Evolución X'] },
  { type: 'Samuráis', clans: ['Flor Carmesí', 'Acero Blanco', 'Dragón del Este', 'Luna Cortante'] },
  { type: 'Ninjas', clans: ['Niebla Negra', 'Serpiente Silente', 'Clan Kage', 'Ojos Rojos'] },
  { type: 'Dioses Antiguos', clans: ['Panteón Perdido', 'Los Primordiales', 'Trono Estelar', 'Ojo Cósmico'] },
  { type: 'Marionetistas', clans: ['Hilos Malditos', 'Teatro Sangriento', 'Sonrisa de Madera', 'Dedos Eternos'] },
  { type: 'Payasos Oscuros', clans: ['Circo Infernal', 'Carcajada Muerta', 'Máscara Rota', 'Fiesta Macabra'] },
  { type: 'Espantapájaros', clans: ['Campo Muerto', 'Paja Maldita', 'Ojos de Cuervo', 'Harvest Doom'] },
  { type: 'Científicos Locos', clans: ['Laboratorio Omega', 'Cerebros Rotos', 'Proyecto Caos', 'Neo Frankenstein'] },
  { type: 'Ángeles Caídos', clans: ['Alas Negras', 'Exilio Divino', 'Pecado Celestial', 'Trono Quebrado'] },
  { type: 'Parásitos', clans: ['Hambre Eterna', 'Carne Ajena', 'Enjambre Negro', 'Los Infectados'] },
  { type: 'Brujos del Tiempo', clans: ['Arena Infinita', 'Reloj Carmesí', 'Hijos del Segundo Final', 'Eclipse Temporal'] },
  { type: 'Gladiadores', clans: ['Arena Roja', 'Coloso Imperial', 'Bestias del Coliseo', 'Cadena de Oro'] },
  { type: 'Djinns', clans: ['Lámpara Negra', 'Deseo Maldito', 'Arena Azul', 'Fuego del Desierto'] },
  { type: 'Robots Bélicos', clans: ['Unidad Ragnarok', 'Hierro Brutal', 'Omega Titan', 'Guerra Nuclear'] },
  { type: 'Revenants', clans: ['Los Regresados', 'Tumba Vacía', 'Sangre del Más Allá', 'Venganza Eterna'] },
  { type: 'Druidas', clans: ['Bosque Viviente', 'Colmillo Verde', 'Raíz Antigua', 'Hijos del Roble'] },
  { type: 'Inquisidores', clans: ['Cruz Blanca', 'Fuego Purificador', 'Veredicto Final', 'Los Penitentes'] },
  { type: 'Arlequines', clans: ['Sonrisa Escarlata', 'Cartas del Caos', 'Danza Torcida', 'Teatro Lunar'] },
  { type: 'Serafines', clans: ['Séptima Luz', 'Corona Dorada', 'Alas Eternas', 'Juicio Celestial'] },
  { type: 'Quimeras', clans: ['Carne Fusionada', 'Bestia Alfa', 'Proyecto Génesis', 'Mil Fauces'] },
  { type: 'Hijos del Vacío', clans: ['Eclipse Negro', 'La Nada Viva', 'Estrellas Muertas', 'Fin del Cosmos'] },
];

const typeColorPalette = [
  '#8e44ad', '#8b0000', '#b7c7d9', '#d35400', '#f1c40f',
  '#7f8c8d', '#4b0082', '#c0392b', '#00a8cc', '#c0c0c0',
  '#2ecc71', '#a0522d', '#dfe6e9', '#2c3e50', '#f39c12',
  '#111111', '#3498db', '#16a085', '#6c7a89', '#34495e',
  '#27ae60', '#7fbf3f', '#f5b041', '#5d6d7e', '#9b59b6',
  '#d6a2e8', '#1f618d', '#95a5a6', '#00bcd4', '#e056fd',
  '#e74c3c', '#2d3436', '#6c5ce7', '#8e5a2a', '#e84393',
  '#c2b280', '#48c9b0', '#2f3640', '#6ab04c', '#f6b93b',
  '#e67e22', '#00cec9', '#7f8fa6', '#7b241c', '#145a32',
  '#ecf0f1', '#ff7675', '#ffd700', '#e17055', '#000814',
];

const characterTypeColors = Object.fromEntries(
  characterTypes.map((entry, index) => [entry.type, typeColorPalette[index]]),
);

const storageKey = 'cronicas-personajes';
const migrationKey = 'cronicas-personajes-firebase-migrated';
const localCharacters = JSON.parse(localStorage.getItem(storageKey) || '[]');
let characters = [];
let filePreview = '';
let activeProfileId = null;
let hasReceivedFirebaseData = false;
let currentUserId = null;
let selectedDeckIds = [];
let deckOrder = [];
let savedDeck = { characterIds: [], mainIds: [] };
let onlineUsers = {};
let activeChallenge = null;
let activeBattleSession = null;
let battleSessions = [];
let pendingChallenges = [];
let battleArenaDismissed = false;
let selectedHandCardId = null;
let pendingPlacementMode = null;
let pendingAttack = null;
const shownSurrenderVictoryBySessionId = new Set();
const previousBattleStatusBySessionId = {};

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.target;

    buttons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    panels.forEach((panel) => {
      panel.classList.toggle('active', panel.id === targetId);
    });
  });
});

function getCharacterRef(characterId) {
  return database.ref(`characters/${characterId}`);
}

function getTimestamp() {
  return new Date().toISOString();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCharacterTypeEntry() {
  return characterTypes[getRandomInt(0, characterTypes.length - 1)];
}

function setSyncStatus(message, type = 'loading') {
  const status = document.querySelector('.firebase-status');
  if (!status) {
    return;
  }

  status.textContent = message;
  status.dataset.status = type;
}

function normalizeCharacter(character, fallbackId) {
  const now = getTimestamp();

  return {
    id: character.id || fallbackId || crypto.randomUUID(),
    name: character.name || '',
    type: character.type || '',
    clan: character.clan || '',
    magic: character.magic || '',
    strength: character.strength || '',
    intelligence: character.intelligence || '',
    speed: character.speed || '',
    story: character.story || '',
    image: character.image || '',
    createdAt: character.createdAt || now,
    updatedAt: character.updatedAt || now,
  };
}

async function saveCharacter(character) {
  const timestamp = getTimestamp();
  const characterToSave = normalizeCharacter({
    ...character,
    createdAt: character.createdAt || timestamp,
    updatedAt: timestamp,
  });

  await getCharacterRef(characterToSave.id).set(characterToSave);
}

async function migrateLocalCharacters() {
  if (localStorage.getItem(migrationKey) === 'true' || !localCharacters.length || characters.length) {
    return;
  }

  await Promise.all(localCharacters.map((character) => saveCharacter(normalizeCharacter(character))));
  localStorage.setItem(migrationKey, 'true');
}

function createOption(value, text) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  return option;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return entities[character];
  });
}

function hexToRgb(hexColor) {
  const normalizedHex = hexColor.replace('#', '');
  const colorNumber = Number.parseInt(normalizedHex, 16);

  return {
    red: (colorNumber >> 16) & 255,
    green: (colorNumber >> 8) & 255,
    blue: colorNumber & 255,
  };
}

function mixColor(hexColor, targetColor, weight) {
  const base = hexToRgb(hexColor);
  const target = hexToRgb(targetColor);
  const mixed = ['red', 'green', 'blue'].map((channel) => {
    const value = Math.round(base[channel] * (1 - weight) + target[channel] * weight);
    return value.toString(16).padStart(2, '0');
  });

  return `#${mixed.join('')}`;
}

function getTypeColorStyles(type) {
  const typeColor = characterTypeColors[type] || '#b4862e';
  const typeColorDark = mixColor(typeColor, '#000000', 0.45);
  const typeColorLight = mixColor(typeColor, '#ffffff', 0.35);

  return [
    `--type-color: ${typeColor}`,
    `--type-color-dark: ${typeColorDark}`,
    `--type-color-light: ${typeColorLight}`,
  ].join('; ');
}

function updateTypeColorPreview() {
  const typeSelect = document.querySelector('#character-type');
  const colorPreview = document.querySelector('.type-color-preview');
  const selectedColor = characterTypeColors[typeSelect.value];

  if (!selectedColor) {
    colorPreview.style.cssText = '';
    colorPreview.textContent = 'Selecciona un tipo para ver su color asignado.';
    return;
  }

  colorPreview.style.cssText = getTypeColorStyles(typeSelect.value);
  colorPreview.innerHTML = `Color asignado: <strong>${typeSelect.value}</strong>`;
}

function renderCharacterCard(character) {
  const safeName = escapeHtml(character.name);
  const safeImage = escapeHtml(character.image);
  const imageMarkup = character.image
    ? `<img class="character-card-image" src="${safeImage}" alt="Imagen de ${safeName}">`
    : '<div class="character-card-image placeholder-image">Sin imagen</div>';

  return `
    <button class="character-card" type="button" data-character-id="${escapeHtml(character.id)}" style="${getTypeColorStyles(character.type)}" aria-label="Abrir perfil de ${safeName}">
      <span class="character-card-layout">
        <span class="character-card-left">
          <span class="character-card-header">${safeName}</span>
          <span class="meta"><strong>Tipo:</strong> <span class="character-type-pill">${escapeHtml(character.type)}</span></span>
          <span class="stats-list" aria-label="Atributos de ${safeName}">
            <span><strong>F</strong>: ${escapeHtml(character.strength)}</span>
            <span><strong>I</strong>: ${escapeHtml(character.intelligence)}</span>
            <span><strong>V</strong>: ${escapeHtml(character.speed)}</span>
            <span><strong>M</strong>: ${escapeHtml(character.magic)}</span>
          </span>
          <span class="character-card-cta">Ver perfil y editar</span>
        </span>
        <span class="character-card-right">${imageMarkup}</span>
      </span>
    </button>
  `;
}

function renderGallery() {
  const gallery = document.querySelector('.character-gallery');
  gallery.innerHTML = characters.length
    ? characters.map(renderCharacterCard).join('')
    : '<p class="empty-gallery">Todavía no hay personajes guardados.</p>';
}

function renderDeckBuilder() {
  const container = document.querySelector('#deck-builder');
  if (!container) return;

  if (!currentUserId) {
    container.innerHTML = '<p>Inicia sesión para gestionar tu mazo.</p>';
    return;
  }

  const hasSavedDeck = savedDeck.characterIds.length === 20;
  const hasBlockingBattle = currentUserId
    && (battleSessions.some((session) => (session.players || []).includes(currentUserId) && session.status === 'active')
      || pendingChallenges.some((challenge) => (
        challenge?.status === 'pending'
        && (challenge?.fromUid === currentUserId || challenge?.toUid === currentUserId)
      )));
  const canEditDeck = !hasBlockingBattle;
  const availableCharacters = hasSavedDeck
    ? characters.filter((character) => savedDeck.characterIds.includes(character.id))
    : characters;
  const selectedSet = new Set(selectedDeckIds);
  const orderMap = new Map(deckOrder.map((id, index) => [id, index + 1]));
  const mainSet = new Set(savedDeck.mainIds);

  container.innerHTML = `
    <p class="deck-description">
      ${hasSavedDeck
        ? 'Tu mazo principal está guardado. Elige 3 personajes principales.'
        : 'Selecciona 20 personajes para tu mazo principal.'}
    </p>
    <div class="deck-count">${hasSavedDeck ? `Mazo guardado: ${savedDeck.characterIds.length}/20` : `Seleccionados: ${selectedDeckIds.length}/20`}</div>
    <button id="edit-deck-btn" class="save-character-btn" type="button" ${canEditDeck ? '' : 'disabled'}>
      Editar Mazo
    </button>
    ${canEditDeck ? '' : '<p class="deck-lock-note">No puedes editar el mazo mientras haya batallas pendientes o en curso.</p>'}
    ${(!hasSavedDeck && selectedDeckIds.length === 20) ? '<button id="save-deck-btn" class="save-character-btn" type="button">Guardar Mazo</button>' : ''}
    <section class="deck-grid">
      ${availableCharacters.map((character) => {
    const isSelected = selectedSet.has(character.id);
    const order = orderMap.get(character.id);
    const isMain = mainSet.has(character.id);
    return `
          <button class="character-card deck-card ${isSelected ? 'is-picked' : ''} ${isMain ? 'is-main' : ''}" type="button" data-deck-character-id="${escapeHtml(character.id)}" style="${getTypeColorStyles(character.type)}">
            ${order ? `<span class="pick-order">${order}</span>` : ''}
            ${isMain ? '<span class="main-badge">Principal</span>' : ''}
            <span class="character-card-header">${escapeHtml(character.name)}</span>
            <span class="character-card-footer">
              <span class="meta"><strong>Tipo:</strong> <span class="character-type-pill">${escapeHtml(character.type)}</span></span>
              <span class="meta"><strong>Clan:</strong> ${escapeHtml(character.clan)}</span>
            </span>
          </button>
        `;
  }).join('')}
    </section>
  `;

  const saveDeckBtn = document.querySelector('#save-deck-btn');
  if (saveDeckBtn) {
    saveDeckBtn.addEventListener('click', saveDeck);
  }

  const editDeckBtn = document.querySelector('#edit-deck-btn');
  if (editDeckBtn) {
    editDeckBtn.addEventListener('click', () => {
      if (!canEditDeck) return;
      savedDeck = { characterIds: [], mainIds: [] };
      selectedDeckIds = [];
      deckOrder = [];
      renderDeckBuilder();
    });
  }
}

function renderOnlineUsers() {
  if (!battleUsersList) return;

  if (!currentUserId) {
    battleUsersList.innerHTML = '<p>Inicia sesión para ver usuarios conectados.</p>';
    return;
  }

  const users = Object.values(onlineUsers).filter((entry) => entry.uid !== currentUserId);
  if (!users.length) {
    battleUsersList.innerHTML = '<p>No hay otros usuarios conectados en este momento.</p>';
    return;
  }

  battleUsersList.innerHTML = users
    .map((user) => {
      const hasOpenBattle = Boolean(getOpenBattleWithUser(user.uid));
      return `
      <article class="battle-user-card">
        <p class="battle-user-name">${escapeHtml(user.name || 'Usuario sin nombre')}</p>
        <div class="battle-user-actions">
          <button class="save-character-btn challenge-user-btn" type="button" data-challenge-user-id="${escapeHtml(user.uid)}" data-challenge-user-name="${escapeHtml(user.name || 'Usuario')}">
            ${hasOpenBattle ? 'Reabrir batalla' : 'Retar a batalla'}
          </button>
          ${hasOpenBattle ? `<button class="cancel-character-btn surrender-battle-btn" type="button" data-surrender-user-id="${escapeHtml(user.uid)}">Rendirse</button>` : ''}
        </div>
      </article>
    `;
    })
    .join('');
}

async function surrenderBattleAgainst(targetUserId) {
  const session = getOpenBattleWithUser(targetUserId);
  if (!session || !currentUserId) return;
  const opponentUid = (session.players || []).find((uid) => uid !== currentUserId);
  if (!opponentUid) return;

  await battleSessionsRef.child(session.id).update({
    status: 'finished',
    winnerUid: opponentUid,
    loserUid: currentUserId,
    endedAt: getTimestamp(),
    updatedAt: getTimestamp(),
  });

  battleArenaDismissed = false;
  setSyncStatus('Te rendiste. La batalla fue otorgada al contrincante.', 'success');
}

function getOpenBattleWithUser(targetUserId) {
  if (!activeBattleSession || !currentUserId || !targetUserId) return null;
  const players = getBattlePlayers(activeBattleSession);
  const includesMe = players.includes(currentUserId);
  const includesTarget = players.includes(targetUserId);
  return includesMe && includesTarget && activeBattleSession.status === 'active' ? activeBattleSession : null;
}

async function sendBattleChallenge(targetUserId, targetUserName) {
  if (!currentUserId || !targetUserId || targetUserId === currentUserId) return;
  await battleChallengesRef.child(targetUserId).set({
    fromUid: currentUserId,
    fromName: userName.textContent || 'Usuario sin nombre',
    toUid: targetUserId,
    toName: targetUserName || 'Usuario',
    status: 'pending',
    createdAt: getTimestamp(),
  });
  setSyncStatus(`Desafío enviado a ${targetUserName || 'usuario'}.`, 'success');
}

function showChallengeModal(challengeData) {
  activeChallenge = challengeData;
  challengeMessage.textContent = `${challengeData.fromName || 'Un usuario'} te ha retado.`;
  battleChallengeModal.classList.remove('hidden');
}

function hideChallengeModal() {
  activeChallenge = null;
  battleChallengeModal.classList.add('hidden');
}

function showSurrenderVictoryModal() {
  if (battleSurrenderVictoryText) {
    battleSurrenderVictoryText.textContent = 'FELICIDADES HAS VENCIDO! TU CONTRINCANTE SE HA RENDIDO';
  }
  battleSurrenderVictoryModal?.classList.remove('hidden');
}

function hideSurrenderVictoryModal() {
  battleSurrenderVictoryModal?.classList.add('hidden');
}

async function respondToChallenge(status) {
  if (!currentUserId || !activeChallenge) return;
  let battleId = '';
  if (status === 'accepted') {
    battleId = await createBattleSessionForChallenge(activeChallenge);
  }
  await battleChallengesRef.child(currentUserId).update({
    status,
    battleId,
    respondedAt: getTimestamp(),
  });
  hideChallengeModal();
  setSyncStatus(
    status === 'accepted'
      ? `Aceptaste el reto de ${activeChallenge.fromName || 'otro usuario'}.`
      : `Rechazaste el reto de ${activeChallenge.fromName || 'otro usuario'}.`,
    'success',
  );
}

async function loadDeckForUser(userId) {
  const snapshot = await userDecksRef.child(userId).once('value');
  const data = snapshot.val();
  if (!data) {
    savedDeck = { characterIds: [], mainIds: [] };
    selectedDeckIds = [];
    deckOrder = [];
    renderDeckBuilder();
    return;
  }

  savedDeck = {
    characterIds: Array.isArray(data.characterIds) ? data.characterIds : [],
    mainIds: Array.isArray(data.mainIds) ? data.mainIds : [],
  };
  selectedDeckIds = [...savedDeck.characterIds];
  deckOrder = [...savedDeck.characterIds];
  renderDeckBuilder();
}

async function saveDeck() {
  savedDeck = { characterIds: [...selectedDeckIds], mainIds: [] };
  await userDecksRef.child(currentUserId).set(savedDeck);
  setSyncStatus('Mazo guardado correctamente.', 'success');
  renderDeckBuilder();
}

async function toggleMainCharacter(characterId) {
  if (!savedDeck.characterIds.includes(characterId)) return;
  const alreadyMain = savedDeck.mainIds.includes(characterId);
  if (!alreadyMain && savedDeck.mainIds.length >= 3) return;

  savedDeck.mainIds = alreadyMain
    ? savedDeck.mainIds.filter((id) => id !== characterId)
    : [...savedDeck.mainIds, characterId];
  await userDecksRef.child(currentUserId).set(savedDeck);
  renderDeckBuilder();
}

function shuffleList(values) {
  const list = [...values];
  for (let index = list.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [list[index], list[randomIndex]] = [list[randomIndex], list[index]];
  }
  return list;
}

function getBattlePlayers(session) {
  return session.players || [];
}

function getPlayerState(session, uid) {
  return (session.playerStates || {})[uid] || { hand: [], deck: [] };
}

function getStatValue(character, attribute) {
  return Number.parseInt(character?.[attribute] ?? '0', 10) || 0;
}

function getEffectiveStatValue(session, cardId, attribute) {
  const card = characters.find((entry) => entry.id === cardId);
  const baseValue = getStatValue(card, attribute);
  const battleModifiers = session?.battleModifiers || {};
  const cardModifiers = battleModifiers[cardId] || {};
  const modifierValue = Number.parseInt(cardModifiers[attribute] ?? '0', 10) || 0;
  return Math.max(0, baseValue + modifierValue);
}

async function resolveAttack(session, attackerSlotId, targetSlotId, attackerAttribute, defenderAttribute = attackerAttribute) {
  const attackerSlot = (session.fieldSlots || []).find((slot) => slot.id === attackerSlotId);
  const targetSlot = (session.fieldSlots || []).find((slot) => slot.id === targetSlotId);
  if (!attackerSlot || !targetSlot || !attackerSlot.cardId || !targetSlot.cardId) return;

  const attackerCard = characters.find((entry) => entry.id === attackerSlot.cardId);
  const targetCard = characters.find((entry) => entry.id === targetSlot.cardId);
  if (!attackerCard || !targetCard) return;

  const attackerValue = getEffectiveStatValue(session, attackerSlot.cardId, attackerAttribute);
  const targetValue = getEffectiveStatValue(session, targetSlot.cardId, defenderAttribute);
  const updatedSlots = [...session.fieldSlots];
  const updatedPlayerStates = { ...(session.playerStates || {}) };
  const updatedModifiers = { ...(session.battleModifiers || {}) };
  const players = getBattlePlayers(session);
  const nextTurnUid = players.find((uid) => uid !== session.currentTurnUid) || session.currentTurnUid;
  let loserCardId = '';
  let statPenaltyMessage = '';

  if (attackerValue < targetValue) {
    loserCardId = attackerSlot.cardId;
    const penalty = Math.floor(targetValue / 2);
    const attackerModifiers = { ...(updatedModifiers[attackerSlot.cardId] || {}) };
    const previousPenalty = Number.parseInt(attackerModifiers[attackerAttribute] ?? '0', 10) || 0;
    attackerModifiers[attackerAttribute] = previousPenalty - penalty;
    updatedModifiers[attackerSlot.cardId] = attackerModifiers;
    const resultingValue = getStatValue(attackerCard, attackerAttribute) + attackerModifiers[attackerAttribute];
    statPenaltyMessage = ` ${attackerCard.name} pierde ${penalty} puntos en ${attackerAttribute} y queda en ${Math.max(0, resultingValue)} durante la batalla.`;
    const loserIndex = updatedSlots.findIndex((slot) => slot.id === attackerSlotId);
    updatedSlots[loserIndex] = { ...updatedSlots[loserIndex], cardId: '', faceDown: false };
  } else if (targetValue < attackerValue) {
    loserCardId = targetSlot.cardId;
    const loserIndex = updatedSlots.findIndex((slot) => slot.id === targetSlotId);
    updatedSlots[loserIndex] = { ...updatedSlots[loserIndex], cardId: '', faceDown: false };
  }

  if (!loserCardId) {
    await battleSessionsRef.child(session.id).update({
      currentTurnUid: nextTurnUid,
      pendingDefense: null,
      updatedAt: getTimestamp(),
    });
    window.alert(`Empate: ataque (${attackerAttribute}) y defensa (${defenderAttribute}). Ninguna carta desaparece y el turno pasa al rival.`);
    return;
  }

  Object.keys(updatedPlayerStates).forEach((uid) => {
    const state = updatedPlayerStates[uid] || { hand: [], deck: [] };
    updatedPlayerStates[uid] = {
      ...state,
      hand: (state.hand || []).filter((id) => id !== loserCardId),
      deck: (state.deck || []).filter((id) => id !== loserCardId),
    };
  });

  await battleSessionsRef.child(session.id).update({
    fieldSlots: updatedSlots,
    playerStates: updatedPlayerStates,
    battleModifiers: updatedModifiers,
    currentTurnUid: nextTurnUid,
    pendingDefense: null,
    updatedAt: getTimestamp(),
  });

  window.alert(`Ataque (${attackerAttribute}) vs defensa (${defenderAttribute}): ${attackerCard.name} (${attackerValue}) vs ${targetCard.name} (${targetValue}). La carta derrotada desapareció del mazo y de la mano.${statPenaltyMessage} El turno pasa al rival.`);
}

function renderBattleArena() {
  if (!activeBattleSession || !currentUserId) return;
  const session = activeBattleSession;
  const currentTurnUid = session.currentTurnUid;
  const myTurn = currentTurnUid === currentUserId;
  const players = getBattlePlayers(session);
  const opponentUid = players.find((uid) => uid !== currentUserId);
  const myState = getPlayerState(session, currentUserId);

  battleTurnLabel.textContent = myTurn ? 'Es tu turno.' : 'Turno del contrincante.';
  battleHand.innerHTML = myState.hand.map((cardId) => {
    const card = characters.find((entry) => entry.id === cardId);
    const selectedClass = selectedHandCardId === cardId ? 'is-picked' : '';
    return `<button class="character-card deck-card battle-hand-card ${selectedClass}" type="button" data-battle-hand-id="${escapeHtml(cardId)}">
      <span class="character-card-header">${escapeHtml(card?.name || 'Carta')}</span>
      <span class="character-card-footer"><span class="meta">${escapeHtml(card?.type || '')}</span></span>
    </button>`;
  }).join('') || '<p>No tienes cartas en mano.</p>';

  const renderSlots = (ownerUid, slotsContainer, isPlayer) => {
    const slots = session.fieldSlots || [];
    slotsContainer.innerHTML = slots.filter((slot) => slot.ownerUid === ownerUid).map((slot) => {
      const card = slot.cardId ? characters.find((entry) => entry.id === slot.cardId) : null;
      const hiddenForOpponent = slot.faceDown && !isPlayer;
      const canPlace = isPlayer && !slot.cardId && Boolean(selectedHandCardId) && Boolean(pendingPlacementMode);
      const canInspect = Boolean(slot.cardId);
      const content = slot.cardId
        ? renderBattleCharacterCard(card, { hidden: hiddenForOpponent })
        : '<span class="battle-slot-empty">Vacío</span>';;
      return `<button class="battle-slot ${slot.cardId ? 'occupied' : ''} ${slot.faceDown ? 'facedown' : ''}" data-battle-slot-id="${slot.id}" ${(!canPlace && !canInspect) ? 'disabled' : ''}>${content}</button>`;
    }).join('');
  };

  renderSlots(opponentUid, battleOpponentSlots, false);
  renderSlots(currentUserId, battlePlayerSlots, true);
  battleArenaModal.classList.remove('hidden');
}

function renderBattleCharacterCard(card, { hidden = false } = {}) {
  if (hidden) {
    return '<span class="battle-facedown-plate" aria-label="Carta boca abajo">◆</span>';
  }
  if (!card) {
    return '<span class="battle-slot-empty">Carta</span>';
  }
  return `
    <span class="battle-mini-card" style="${getTypeColorStyles(card.type)}">
      <span class="battle-mini-name">${escapeHtml(card.name)}</span>
      ${card.image ? `<img class="battle-mini-image" src="${escapeHtml(card.image)}" alt="${escapeHtml(card.name)}">` : '<span class="battle-mini-image placeholder-image">Sin imagen</span>'}
      <span class="battle-mini-meta">${escapeHtml(card.type)} · ${escapeHtml(card.clan)}</span>
      <span class="battle-mini-stats">M ${escapeHtml(getEffectiveStatValue(activeBattleSession, card.id, 'magic'))} | F ${escapeHtml(getEffectiveStatValue(activeBattleSession, card.id, 'strength'))} | I ${escapeHtml(getEffectiveStatValue(activeBattleSession, card.id, 'intelligence'))} | V ${escapeHtml(getEffectiveStatValue(activeBattleSession, card.id, 'speed'))}</span>
    </span>
  `;
}

function showCardActionModal(cardId) {
  selectedHandCardId = cardId;
  pendingPlacementMode = null;
  battleCardActionModal.classList.remove('hidden');
}

function hideCardActionModal() {
  battleCardActionModal.classList.add('hidden');
}

async function createBattleSessionForChallenge(challengeData) {
  const accepterDeck = [...savedDeck.characterIds];
  if (accepterDeck.length !== 20) throw new Error('Debes tener mazo de 20 cartas para aceptar.');
  const challengerDeckSnapshot = await userDecksRef.child(challengeData.fromUid).once('value');
  const challengerDeck = (challengerDeckSnapshot.val()?.characterIds) || [];
  if (challengerDeck.length !== 20) throw new Error('El contrincante no tiene mazo válido.');

  const id = battleSessionsRef.push().key;
  const challengerShuffled = shuffleList(challengerDeck);
  const accepterShuffled = shuffleList(accepterDeck);
  const players = [challengeData.fromUid, challengeData.toUid];
  const fieldSlots = [
    ...Array.from({ length: 5 }, (_, i) => ({ id: `opponent-${i + 1}`, ownerUid: challengeData.fromUid, cardId: '', faceDown: false })),
    ...Array.from({ length: 5 }, (_, i) => ({ id: `player-${i + 1}`, ownerUid: challengeData.toUid, cardId: '', faceDown: false })),
  ];

  await battleSessionsRef.child(id).set({
    id,
    status: 'active',
    players,
    currentTurnUid: challengeData.fromUid,
    fieldSlots,
    playerStates: {
      [challengeData.fromUid]: { hand: challengerShuffled.slice(0, 3), deck: challengerShuffled.slice(3) },
      [challengeData.toUid]: { hand: accepterShuffled.slice(0, 3), deck: accepterShuffled.slice(3) },
    },
    createdAt: getTimestamp(),
  });
  return id;
}

function closeProfile() {
  activeProfileId = null;
  document.querySelector('.character-profile').classList.add('hidden');
  document.querySelector('.character-gallery').classList.remove('hidden');
  addCharacterButton.classList.remove('hidden');
}

function updateProfileClanOptions(selectedClan = '') {
  const typeSelect = document.querySelector('#profile-character-type');
  const clanSelect = document.querySelector('#profile-character-clan');
  const selectedType = characterTypes.find((entry) => entry.type === typeSelect.value);

  clanSelect.innerHTML = '';
  if (!selectedType) {
    clanSelect.append(createOption('', 'Selecciona primero un tipo'));
    clanSelect.disabled = true;
    return;
  }

  clanSelect.disabled = false;
  clanSelect.append(createOption('', 'Selecciona un clan'));
  selectedType.clans.forEach((clan) => clanSelect.append(createOption(clan, clan)));
  clanSelect.value = selectedClan;
}

function updateProfileImagePreview(imageSource) {
  const preview = document.querySelector('#profile-image-preview');
  const currentImageInput = document.querySelector('#profile-image-current');

  currentImageInput.value = imageSource;
  preview.src = imageSource;
  preview.classList.toggle('hidden', !imageSource);
}

function renderProfile(character) {
  const profile = document.querySelector('.character-profile');
  const imagePreview = character.image
    ? `<img id="profile-image-preview" class="preview-image" src="${escapeHtml(character.image)}" alt="Imagen actual de ${escapeHtml(character.name)}">`
    : '<img id="profile-image-preview" class="preview-image hidden" alt="Imagen actual del personaje">';

  activeProfileId = character.id;
  profile.innerHTML = `
    <button class="back-to-gallery-btn" type="button">← Volver a personajes</button>
    <form class="profile-form" style="${getTypeColorStyles(character.type)}">
      <div class="profile-heading">
        <div>
          <p class="profile-kicker">Perfil del personaje</p>
          <h2>${escapeHtml(character.name)}</h2>
        </div>
        <span class="character-type-pill">${escapeHtml(character.type)}</span>
      </div>
      <div class="profile-grid">
        <div class="profile-fields">
          <label>
            Nombre del personaje
            <input name="name" type="text" required value="${escapeHtml(character.name)}">
          </label>
          <label>
            Tipo
            <select id="profile-character-type" name="type" required></select>
          </label>
          <label>
            Clan
            <select id="profile-character-clan" name="clan" required></select>
          </label>
          <div class="stats-grid">
            <label>
              Puntos de magia
              <input name="magic" type="number" min="1" max="100" required value="${escapeHtml(character.magic)}">
            </label>
            <label>
              Puntos de fuerza
              <input name="strength" type="number" min="1" max="100" required value="${escapeHtml(character.strength)}">
            </label>
            <label>
              Puntos de inteligencia
              <input name="intelligence" type="number" min="1" max="100" required value="${escapeHtml(character.intelligence)}">
            </label>
            <label>
              Puntos de velocidad
              <input name="speed" type="number" min="1" max="100" required value="${escapeHtml(character.speed)}">
            </label>
          </div>
          <label>
            Historia del personaje
            <textarea name="story" rows="8" required>${escapeHtml(character.story)}</textarea>
          </label>
        </div>
        <aside class="profile-image-panel" aria-label="Imagen del personaje">
          ${imagePreview}
          <input id="profile-image-current" type="hidden" value="${escapeHtml(character.image)}">
          <label>
            URL de imagen de perfil
            <input id="profile-character-image-url" name="imageUrl" type="url" value="${character.image && !character.image.startsWith('data:') ? escapeHtml(character.image) : ''}" placeholder="https://ejemplo.com/imagen.jpg">
          </label>
          <label>
            Reemplazar con imagen del dispositivo
            <input id="profile-character-image-file" name="imageFile" type="file" accept="image/*">
          </label>
        </aside>
      </div>
      <div class="form-actions">
        <button class="cancel-character-btn" type="button">Cancelar</button>
        <button class="save-character-btn" type="submit">Guardar cambios</button>
      </div>
    </form>
  `;

  document.querySelector('.character-gallery').classList.add('hidden');
  document.querySelector('.character-creator').classList.add('hidden');
  addCharacterButton.classList.add('hidden');
  profile.classList.remove('hidden');

  const profileTypeSelect = document.querySelector('#profile-character-type');
  characterTypes.forEach((entry) => profileTypeSelect.append(createOption(entry.type, entry.type)));
  profileTypeSelect.value = character.type;
  updateProfileClanOptions(character.clan);
  profileTypeSelect.addEventListener('change', () => updateProfileClanOptions());

  document.querySelector('.back-to-gallery-btn').addEventListener('click', closeProfile);
  document.querySelector('.profile-form .cancel-character-btn').addEventListener('click', closeProfile);
  document.querySelector('#profile-character-image-url').addEventListener('input', (event) => {
    updateProfileImagePreview(event.target.value.trim());
  });
  document.querySelector('#profile-character-image-file').addEventListener('change', (event) => {
    const [file] = event.target.files;
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => updateProfileImagePreview(reader.result));
    reader.readAsDataURL(file);
  });
  document.querySelector('.profile-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const profileImage = document.querySelector('#profile-image-current').value.trim();
    const characterToUpdate = characters.find((entry) => entry.id === activeProfileId);
    if (!characterToUpdate) {
      return;
    }

    try {
      await saveCharacter({
        ...characterToUpdate,
        name: formData.get('name').trim(),
        type: formData.get('type'),
        clan: formData.get('clan'),
        magic: formData.get('magic'),
        strength: formData.get('strength'),
        intelligence: formData.get('intelligence'),
        speed: formData.get('speed'),
        story: formData.get('story').trim(),
        image: profileImage || formData.get('imageUrl').trim(),
      });
      closeProfile();
    } catch (error) {
      console.error('No se pudo guardar el personaje en Firebase:', error);
      setSyncStatus('No se pudieron guardar los cambios. Revisa la conexión o las reglas de Firebase.', 'error');
    }
  });
}

function openProfile(characterId) {
  const character = characters.find((entry) => entry.id === characterId);
  if (character) {
    renderProfile(character);
  }
}

function updateClanOptions() {
  const typeSelect = document.querySelector('#character-type');
  const clanSelect = document.querySelector('#character-clan');
  const selectedType = characterTypes.find((entry) => entry.type === typeSelect.value);

  updateTypeColorPreview();
  clanSelect.innerHTML = '';
  if (!selectedType) {
    clanSelect.append(createOption('', 'Selecciona primero un tipo'));
    clanSelect.disabled = true;
    return;
  }

  clanSelect.disabled = false;
  clanSelect.append(createOption('', 'Selecciona un clan'));
  selectedType.clans.forEach((clan) => clanSelect.append(createOption(clan, clan)));
}

function updatePreview() {
  const urlInput = document.querySelector('#character-image-url');
  const urlPreview = document.querySelector('#url-preview');
  const filePreviewImage = document.querySelector('#file-preview');

  urlPreview.src = urlInput.value.trim();
  urlPreview.classList.toggle('hidden', !urlInput.value.trim());

  filePreviewImage.src = filePreview;
  filePreviewImage.classList.toggle('hidden', !filePreview);
}

function resetForm() {
  const form = document.querySelector('.character-form');
  form.reset();
  filePreview = '';
  updateClanOptions();
  updatePreview();
}

function closeForm() {
  document.querySelector('.character-creator').classList.add('hidden');
  addCharacterButton.classList.remove('hidden');
  resetForm();
}

function openForm() {
  document.querySelector('.character-creator').classList.remove('hidden');
  addCharacterButton.classList.add('hidden');
  document.querySelector('#character-name').focus();
}

function buildRandomCharacter(nameNumber) {
  const selectedType = getRandomCharacterTypeEntry();
  const selectedClan = selectedType.clans[getRandomInt(0, selectedType.clans.length - 1)];

  return {
    id: crypto.randomUUID(),
    name: String(nameNumber),
    type: selectedType.type,
    clan: selectedClan,
    magic: String(getRandomInt(1, 100)),
    strength: String(getRandomInt(1, 100)),
    intelligence: String(getRandomInt(1, 100)),
    speed: String(getRandomInt(1, 100)),
    story: 'Generado automáticamente',
    image: '',
  };
}

async function createRandomCharacters() {
  const quantityInput = document.querySelector('#random-character-quantity');
  const quantity = Number.parseInt(quantityInput.value, 10);

  if (Number.isNaN(quantity) || quantity < 1 || quantity > 20) {
    setSyncStatus('Selecciona una cantidad válida entre 1 y 20 para crear personajes automáticos.', 'error');
    return;
  }

  const randomCharacters = Array.from({ length: quantity }, (_, index) => buildRandomCharacter(index + 1));

  try {
    await Promise.all(randomCharacters.map((character) => saveCharacter(character)));
    setSyncStatus(`Se crearon ${quantity} personaje(s) aleatoriamente y se guardaron en Firebase.`, 'success');
  } catch (error) {
    console.error('No se pudieron crear personajes aleatorios en Firebase:', error);
    setSyncStatus('No se pudieron crear los personajes aleatorios. Revisa la conexión o las reglas de Firebase.', 'error');
  }
}

function createCharacterForm() {
  personajesPanel.insertAdjacentHTML(
    'beforeend',
    `
      <p class="firebase-status" data-status="loading">Conectando con Firebase...</p>
      <div class="character-creator hidden" aria-label="Formulario para crear personaje">
        <form class="character-form">
          <button class="close-character-form" type="button" aria-label="Cerrar formulario">×</button>
          <h2>Crear personaje</h2>
          <label>
            Nombre del personaje
            <input id="character-name" name="name" type="text" required placeholder="Ej. Lyra Nocturna">
          </label>
          <label>
            Tipo
            <select id="character-type" name="type" required>
              <option value="">Selecciona un tipo</option>
            </select>
          </label>
          <div class="type-color-preview" aria-live="polite">Selecciona un tipo para ver su color asignado.</div>
          <label>
            Clan
            <select id="character-clan" name="clan" required disabled>
              <option value="">Selecciona primero un tipo</option>
            </select>
          </label>
          <div class="stats-grid">
            <label>
              Puntos de magia
              <input name="magic" type="number" min="1" max="100" required placeholder="1-100">
            </label>
            <label>
              Puntos de fuerza
              <input name="strength" type="number" min="1" max="100" required placeholder="1-100">
            </label>
            <label>
              Puntos de inteligencia
              <input name="intelligence" type="number" min="1" max="100" required placeholder="1-100">
            </label>
            <label>
              Puntos de velocidad
              <input name="speed" type="number" min="1" max="100" required placeholder="1-100">
            </label>
          </div>
          <label>
            Historia del personaje
            <textarea name="story" rows="5" required placeholder="Cuenta el origen, hazañas y secretos del personaje"></textarea>
          </label>
          <label>
            URL de imagen de perfil
            <input id="character-image-url" name="imageUrl" type="url" placeholder="https://ejemplo.com/imagen.jpg">
          </label>
          <label>
            O selecciona una imagen desde tu dispositivo
            <input id="character-image-file" name="imageFile" type="file" accept="image/*">
          </label>
          <div class="form-actions">
            <button class="cancel-character-btn" type="button">Cancelar</button>
            <button class="save-character-btn" type="submit">Guardar</button>
          </div>
        </form>
        <aside class="preview-pane" aria-label="Vista previa de imágenes">
          <h3>Vista previa</h3>
          <div class="preview-grid">
            <div class="preview-box">
              <span>Desde URL</span>
              <img id="url-preview" class="preview-image hidden" alt="Vista previa de imagen por URL">
            </div>
            <div class="preview-box">
              <span>Desde archivo</span>
              <img id="file-preview" class="preview-image hidden" alt="Vista previa de imagen seleccionada">
            </div>
          </div>
          <p class="preview-note">Si cargas una imagen desde archivo, se usará esa imagen al guardar; si no, se usará la URL.</p>
        </aside>
      </div>
      <section class="character-gallery" aria-label="Galería de personajes"></section>
      <section class="character-profile hidden" aria-label="Perfil del personaje"></section>
    `,
  );

  const typeSelect = document.querySelector('#character-type');
  characterTypes.forEach((entry) => typeSelect.append(createOption(entry.type, entry.type)));
  typeSelect.addEventListener('change', updateClanOptions);

  document.querySelector('#character-image-url').addEventListener('input', updatePreview);
  document.querySelector('#character-image-file').addEventListener('change', (event) => {
    const [file] = event.target.files;
    if (!file) {
      filePreview = '';
      updatePreview();
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      filePreview = reader.result;
      updatePreview();
    });
    reader.readAsDataURL(file);
  });

  document.querySelector('.cancel-character-btn').addEventListener('click', closeForm);
  document.querySelector('.close-character-form').addEventListener('click', closeForm);
  document.querySelector('.character-gallery').addEventListener('click', (event) => {
    const card = event.target.closest('.character-card');
    if (card) {
      openProfile(card.dataset.characterId);
    }
  });

  document.querySelector('.character-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const character = {
      id: crypto.randomUUID(),
      name: formData.get('name').trim(),
      type: formData.get('type'),
      clan: formData.get('clan'),
      magic: formData.get('magic'),
      strength: formData.get('strength'),
      intelligence: formData.get('intelligence'),
      speed: formData.get('speed'),
      story: formData.get('story').trim(),
      image: filePreview || formData.get('imageUrl').trim(),
    };

    try {
      await saveCharacter(character);
      closeForm();
    } catch (error) {
      console.error('No se pudo guardar el personaje en Firebase:', error);
      setSyncStatus('No se pudo guardar el personaje. Revisa la conexión o las reglas de Firebase.', 'error');
    }
  });
}


async function signInWithGoogle() {
  try {
    await auth.signInWithPopup(googleProvider);
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error);
    if (error?.code === 'auth/unauthorized-domain') {
      setSyncStatus(
        'Este dominio no está autorizado en Firebase Auth. Agrega el dominio actual en Firebase Console > Authentication > Settings > Authorized domains.',
        'error'
      );
      return;
    }
    setSyncStatus('No se pudo iniciar sesión con Google. Inténtalo de nuevo.', 'error');
  }
}

async function logout() {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
}

function toggleAuthenticatedUi(user) {
  const isLogged = Boolean(user);
  authPanel.classList.toggle('hidden', isLogged);
  authUserPanel.classList.toggle('hidden', !isLogged);
  gameLayout.classList.toggle('hidden', !isLogged);

  if (!isLogged) {
    const previousUserId = currentUserId;
    currentUserId = null;
    savedDeck = { characterIds: [], mainIds: [] };
    selectedDeckIds = [];
    deckOrder = [];
    userName.textContent = '';
    userUid.textContent = '';
    userPhoto.removeAttribute('src');
    if (previousUserId) {
      onlineUsersRef.child(previousUserId).remove().catch(() => {});
    }
    onlineUsers = {};
    renderOnlineUsers();
    return;
  }

  currentUserId = user.uid;

  userName.textContent = user.displayName || 'Usuario sin nombre';
  userUid.textContent = `UID: ${user.uid}`;
  if (user.photoURL) {
    userPhoto.src = user.photoURL;
  } else {
    userPhoto.removeAttribute('src');
  }

  const presenceRef = onlineUsersRef.child(user.uid);
  const connectedRef = database.ref('.info/connected');
  connectedRef.on('value', (snapshot) => {
    if (snapshot.val() !== true) return;
    presenceRef.onDisconnect().remove();
    presenceRef.set({
      uid: user.uid,
      name: user.displayName || 'Usuario sin nombre',
      photoURL: user.photoURL || '',
      lastSeen: getTimestamp(),
    });
  });
}

loginGoogleButton.addEventListener('click', signInWithGoogle);
logoutButton.addEventListener('click', logout);
auth.onAuthStateChanged((user) => {
  toggleAuthenticatedUi(user);
  if (user) {
    loadDeckForUser(user.uid).catch((error) => {
      console.error('No se pudo cargar el mazo del usuario:', error);
    });
  } else {
    renderDeckBuilder();
  }
});

addCharacterButton.textContent = 'Crear personaje';
addCharacterButton.addEventListener('click', openForm);
randomCharacterButton.addEventListener('click', createRandomCharacters);
createCharacterForm();
renderGallery();
renderDeckBuilder();
renderOnlineUsers();
setSyncStatus('Conectando con Firebase...', 'loading');

onlineUsersRef.on('value', (snapshot) => {
  onlineUsers = snapshot.val() || {};
  renderOnlineUsers();
});

battleChallengesRef.on('value', (snapshot) => {
  if (!currentUserId) return;
  pendingChallenges = Object.values(snapshot.val() || {});
  const challengeData = snapshot.child(currentUserId).val();
  if (challengeData && challengeData.status === 'pending') {
    showChallengeModal(challengeData);
    return;
  }

  if (!challengeData && activeChallenge) {
    hideChallengeModal();
  }
  renderDeckBuilder();
});

charactersRef.on(
  'value',
  async (snapshot) => {
    const data = snapshot.val() || {};
    characters = Object.entries(data)
      .map(([id, character]) => normalizeCharacter(character, id))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    hasReceivedFirebaseData = true;
    renderGallery();
    renderDeckBuilder();
    setSyncStatus('Personajes sincronizados con Firebase y visibles en otros dispositivos.', 'success');

    try {
      await migrateLocalCharacters();
    } catch (error) {
      console.error('No se pudieron migrar personajes locales a Firebase:', error);
      setSyncStatus('Firebase está conectado, pero no se pudieron migrar personajes locales anteriores.', 'error');
    }
  },
  (error) => {
    console.error('No se pudo leer Firebase:', error);
    setSyncStatus('No se pudo conectar con Firebase. Revisa la conexión o las reglas de la base de datos.', 'error');

    if (!hasReceivedFirebaseData && localCharacters.length) {
      characters = localCharacters.map((character) => normalizeCharacter(character));
      renderGallery();
      renderDeckBuilder();
    }
  },
);

const battleAttackModal = document.querySelector('#battle-attack-modal');
const battleAttackText = document.querySelector('#battle-attack-text');
const battleAttackOptions = document.querySelector('#battle-attack-options');
const battleAttackCancelButton = document.querySelector('#battle-attack-cancel');
const battleAttributes = ['magic', 'strength', 'intelligence', 'speed'];
let pendingAttributePick = null;

function openAttributePicker(mode, card, onPick) {
  pendingAttributePick = { mode, onPick };
  battleAttackText.textContent = mode === 'defense' ? `Elige atributo para defender con ${card.name}.` : `Elige atributo para atacar con ${card.name}.`;
  battleAttackOptions.innerHTML = battleAttributes.map((attribute) => (
    `<button class="save-character-btn battle-attribute-btn" data-battle-attribute="${attribute}" type="button">${attribute.toUpperCase()} (${escapeHtml(card[attribute])})</button>`
  )).join('');
  battleAttackModal.classList.remove('hidden');
}

function hideAttributePicker() {
  battleAttackModal.classList.add('hidden');
  pendingAttributePick = null;
}

document.addEventListener('click', (event) => {
  const deckCard = event.target.closest('[data-deck-character-id]');
  if (deckCard && currentUserId) {
    const characterId = deckCard.dataset.deckCharacterId;
    const hasSavedDeck = savedDeck.characterIds.length === 20;
    if (hasSavedDeck) {
      toggleMainCharacter(characterId).catch((error) => console.error('No se pudo actualizar personaje principal:', error));
      return;
    }

    const isSelected = selectedDeckIds.includes(characterId);
    if (isSelected) {
      selectedDeckIds = selectedDeckIds.filter((id) => id !== characterId);
      deckOrder = deckOrder.filter((id) => id !== characterId);
    } else if (selectedDeckIds.length < 20) {
      selectedDeckIds.push(characterId);
      deckOrder.push(characterId);
    }
    renderDeckBuilder();
    return;
  }

  const attributeButton = event.target.closest('[data-battle-attribute]');
  if (attributeButton && pendingAttributePick) {
    pendingAttributePick.onPick(attributeButton.dataset.battleAttribute);
    hideAttributePicker();
    return;
  }

  const handCard = event.target.closest('[data-battle-hand-id]');
  if (handCard) {
    showCardActionModal(handCard.dataset.battleHandId);
    return;
  }

  const targetSlot = event.target.closest('[data-battle-slot-id]');
  if (!targetSlot || !activeBattleSession || !currentUserId) return;
  if (activeBattleSession.currentTurnUid !== currentUserId) return;

  const slotId = targetSlot.dataset.battleSlotId;
  const session = activeBattleSession;
  const clickedSlot = (session.fieldSlots || []).find((slot) => slot.id === slotId);
  if (!clickedSlot) return;

  if (!clickedSlot.cardId) {
    if (!selectedHandCardId || !pendingPlacementMode) return;
    const myState = getPlayerState(session, currentUserId);
    if (!myState.hand.includes(selectedHandCardId)) return;
    const faceDown = pendingPlacementMode === 'facedown';
    const fieldSlots = (session.fieldSlots || []).map((slot) => (slot.id === slotId ? { ...slot, cardId: selectedHandCardId, faceDown } : slot));
    const updatedHand = myState.hand.filter((id) => id !== selectedHandCardId);
    const updatedDeck = [...myState.deck];
    if (updatedDeck.length) updatedHand.push(updatedDeck.shift());
    const opponentUid = session.players.find((uid) => uid !== currentUserId);
    battleSessionsRef.child(session.id).update({
      fieldSlots,
      currentTurnUid: opponentUid,
      [`playerStates/${currentUserId}/hand`]: updatedHand,
      [`playerStates/${currentUserId}/deck`]: updatedDeck,
      updatedAt: getTimestamp(),
    });
    selectedHandCardId = null;
    pendingPlacementMode = null;
    return;
  }

  if (clickedSlot.ownerUid === currentUserId) {
    const attackerCard = characters.find((entry) => entry.id === clickedSlot.cardId);
    if (!attackerCard) return;
    openAttributePicker('attack', attackerCard, (selectedAttribute) => {
      pendingAttack = { attackerSlotId: clickedSlot.id, attribute: selectedAttribute };
      window.alert('Atributo elegido. Ahora selecciona una carta del campo rival para atacarla.');
    });
    return;
  }

  if (!pendingAttack) return;
  const targetCard = characters.find((entry) => entry.id === clickedSlot.cardId);
  if (!targetCard) return;

  if (!clickedSlot.faceDown) {
    resolveAttack(session, pendingAttack.attackerSlotId, clickedSlot.id, pendingAttack.attribute, pendingAttack.attribute).catch((error) => console.error('No se pudo resolver el ataque:', error));
    pendingAttack = null;
    return;
  }

  battleSessionsRef.child(session.id).update({
    pendingDefense: {
      attackerSlotId: pendingAttack.attackerSlotId,
      targetSlotId: clickedSlot.id,
      attackerAttribute: pendingAttack.attribute,
      attackerUid: currentUserId,
      defenderUid: clickedSlot.ownerUid,
    },
    updatedAt: getTimestamp(),
  });
  pendingAttack = null;
  window.alert('Carta boca abajo elegida. El defensor debe escoger su atributo para resolver el combate.');
});

battleAttackCancelButton?.addEventListener('click', hideAttributePicker);
acceptChallengeButton.addEventListener('click', () => {
  respondToChallenge('accepted').catch((error) => {
    console.error('No se pudo aceptar el desafío:', error);
  });
});

rejectChallengeButton.addEventListener('click', () => {
  respondToChallenge('rejected').catch((error) => {
    console.error('No se pudo rechazar el desafío:', error);
  });
});

battleArenaCloseButton.addEventListener('click', () => {
  battleArenaDismissed = true;
  battleArenaModal.classList.add('hidden');
});

battleSurrenderVictoryCloseButton?.addEventListener('click', hideSurrenderVictoryModal);

battleSessionsRef.on('value', (snapshot) => {
  if (!currentUserId) return;
  const sessions = snapshot.val() || {};
  battleSessions = Object.values(sessions);
  const current = Object.values(sessions).find((session) => (session.players || []).includes(currentUserId) && session.status === 'active');
  if (!current) {
    activeBattleSession = null;
    battleArenaDismissed = false;
    battleArenaModal.classList.add('hidden');
    renderOnlineUsers();
    renderDeckBuilder();
    return;
  }
  const previousBattleId = activeBattleSession?.id;
  activeBattleSession = current;
  if (previousBattleId !== current.id) {
    battleArenaDismissed = false;
  }
  if (!battleArenaDismissed) {
    renderBattleArena();
  }
  const pendingDefenseData = current.pendingDefense;
  if (pendingDefenseData?.defenderUid === currentUserId) {
    const defenderSlot = (current.fieldSlots || []).find((slot) => slot.id === pendingDefenseData.targetSlotId);
    const defenderCard = defenderSlot?.cardId ? characters.find((entry) => entry.id === defenderSlot.cardId) : null;
    if (defenderCard) {
      openAttributePicker('defense', defenderCard, (defenseAttribute) => {
        resolveAttack(
          current,
          pendingDefenseData.attackerSlotId,
          pendingDefenseData.targetSlotId,
          pendingDefenseData.attackerAttribute,
          defenseAttribute,
        ).catch((error) => console.error('No se pudo resolver defensa:', error));
      });
    }
  }
  renderOnlineUsers();
  renderDeckBuilder();
});


battleActionPlaceButton?.addEventListener('click', () => { pendingPlacementMode = 'faceup'; hideCardActionModal(); renderBattleArena(); });
battleActionFaceDownButton?.addEventListener('click', () => { pendingPlacementMode = 'facedown'; hideCardActionModal(); renderBattleArena(); });
battleActionCancelButton?.addEventListener('click', () => { selectedHandCardId = null; pendingPlacementMode = null; hideCardActionModal(); renderBattleArena(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { battleArenaDismissed = true; battleArenaModal.classList.add('hidden'); hideCardActionModal(); } });
