

import { environment } from '../../environments/environment';


export const BASE_URL = (environment.production) ? 'http://qcd480w04:3000' : 'http://qcd480w04:3001';
export const API_VERSION = 'api';