import {
reducerDestinosViajes,
DestinosViajesState,
initializeDestinosViajesState,
InitMyDataAction,
NuevoDestinoAction,
} from './destinos-viajes.state.model';
import { DestinoViajes } from './destino-viaje.models';

describe('reducerDestinosViajes', () => {
    it('should reduce init data', () => {
        // setup
        const prevState: DestinosViajesState = initializeDestinosViajesState();
        const action: InitMyDataAction = new InitMyDataAction(['destino 1', 'destino 2']);
        // action
        const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
        expect(newState.items.length).toEqual(2);
        expect(newState.items[0].nombre).toEqual('destino 1');
    });
    
    it('should reduce new item added', () => {
        const prevState: DestinosViajesState = initializeDestinosViajesState();
        const action: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViajes('barcelona', 'url'));
        const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
        expect(newState.items.length).toEqual(1);
        expect(newState.items[0].nombre).toEqual('barcelona');
    });
});
// ng test
// para ver de forma amigable todos los test que han sido corridos, este usa una ventana de chrome.
// Karma