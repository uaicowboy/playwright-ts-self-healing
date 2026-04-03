import path from 'path'

export const AUTH_DIR = path.join(process.cwd(), '.auth')
export const STORAGE_STATE = path.join(AUTH_DIR, 'user.json')
