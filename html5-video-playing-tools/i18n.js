'use strict';

// Translations selected for the current browser locale.
const curLang = navigator.language.slice(0, 2);
// Thanks to Dario Costa for the English and Italian translations
const i18n = {
  'en': {
    'console': '%cScript[%s] Feedback: %s\n%s',
    'cacheStoringConfirm': 'Do you want all segments of the video to be cached? The detection method used is as follows: when the page is refreshed, the watched video clips will be cached so that no additional network traffic is generated. If you want all segments of the videos to be cached, select OK; or select Cancel to buffer a portion of the video based on the default buffer size (which is the default browser behavior). When buffering, press M key again to cancel buffering.',
    'cantOpenPIP': 'Unable to access picture-in-picture mode! Error: \n',
    'cantExitPIP': 'Unable to exit picture-in-picture mode! Error: \n',
    'rememberRateMenuOption': 'Remember video playback speed',
    'speedRate': 'Speed rate ',
    'helpMenuOption': 'Hotkeys list:',
    'helpBody': `Double-click: activate full screen.
Middle mouse button: fast forward 5 seconds

P key:  Take a screenshot
I key:  Enter/Exit picture-in-picture mode
M key:  Enable/disable caching of video
Chrome browsers add startup parameters to set the media cache to 840MB:  --media-cache-size=880008000

Arrow keys ← and →:  Fast forward or rewind by 5 seconds
Shift + Arrow keys ← and →:  Fast forward or rewind 20 seconds
Arrow keys ↑ and ↓:  Raise or lower the volume

ESC:  Exit full screen (or exit video enlarged to window size)
Spacebar:  Stop/Play
Enter:  Enable/disable full screen video
Shift + Enter: Set/unset video enlarged to window size

N key:  Play the next video (if any)
C key(YouTube:V key):  Speed up video playback by 0.1
X key: Slow down video playback by 0.1
Z key, Set video playback speed: 1.0 ←→ X
D key: Previous frame
F key: Next frame (except on YouTube)
E key: Next frame (YouTube only)`
  },
  'it': {
    'console': '%cScript[%s] Feedback: %s\n%s',
    'cacheStoringConfirm': 'Vuoi che tutti i segmenti del video siano memorizzati nella cache? Il metodo di rilevamento utilizzato è il seguente: all\'aggiornamento della pagina, i video clip guardati saranno memorizzati nella cache in modo da non generare ulteriore traffico di rete. Se vuoi che tutti i segmenti dei video siano memorizzati nella cache, seleziona OK; seleziona invece Annulla per bufferizzare una parte del video in base alla dimensione predefinita del buffer (come da comportamento predefinito del browser).Durante il buffering, premere nuovamente il tasto M per annullare il buffering.',
    'cantOpenPIP': 'Impossibile accedere alla modalità picture-in-picture! Errore: \n',
    'cantExitPIP': 'Impossibile uscire dalla modalità picture-in-picture! Errore: \n',
    'rememberRateMenuOption': 'Memorizza la velocità di riproduzione dei video',
    'speedRate': 'Velocità di riproduzione ',
    'helpMenuOption': 'Elenco dei tasti di scelta rapida',
    'helpBody': `Doppio clic: attiva lo schermo intero
Pulsante centrale del mouse: avanzamento rapido di 5 secondi

Tasto P: Esegui uno screenshot
Tasto I:  Attiva modalità picture-in-picture
Tasto M:  Attiva/disattiva memorizzazione del video nella cache
I browser Chrome aggiungono parametri di avvio per impostare la cache multimediale a 840MB:  --media-cache-size=880008000

Tasti freccia ← e →:  Avanza o riavvolgi di 5 secondi
Shift + Tasti freccia ← e →: Avanza o riavvolgi di 20 secondi
Tasti freccia ↑ e ↓:  Alza o abbassa il volume
ESC:  Esci da schermo intero
Barra spaziatrice: Ferma/Riproduci
Invio:  Attiva/disattiva ingrandimento del video a schermo intero
Shift + Invio: Attiva/disattiva ingrandimento del video a dimensione della finestra

Tasto N:  Riproduzione del video successivo (se presente)
Tasto C(YouTube: Tasto V): Velocizza riproduzione video di 0,1
Tasto X: Rallenta riproduzione video di 0,1
Tasto Z, Impostare la velocità di riproduzione video: 1,0 ←→ X
Tasto D: Vai al frame precedente
Tasto F: Vai al frame successivo (escluso YouTube)
Tasto E: Vai al frame successivo (solo su YouTube)`
  }
};
const MSG = new Map(Object.entries(i18n)).get(curLang) || i18n.en;
