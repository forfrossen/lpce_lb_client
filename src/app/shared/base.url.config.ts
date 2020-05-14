

import { environment } from '../../environments/environment';


export const BASE_URL = (environment.production) ? 'http://lpce480webapps' : 'http://lpce480webapps:3001';
export const API_VERSION = 'api';