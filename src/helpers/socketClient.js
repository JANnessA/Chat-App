import io from 'socket.io-client';
import {SOCKET_URL} from '../configs';
const socket = io(`${SOCKET_URL}/realtime?token=${AuthenticationUtils.getAccessToken()}`);
export default socket;