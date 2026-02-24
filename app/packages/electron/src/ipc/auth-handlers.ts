import { ipcMain, safeStorage, shell } from 'electron';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { URL } from 'node:url';
import { IPC } from '@gitgael/shared';
import type { AuthStatus } from '@gitgael/shared';

// In-memory token store (encrypted on disk via safeStorage)
let currentToken: string | null = null;
let currentUsername: string | null = null;

// Users provide their own OAuth App credentials
const OAUTH_CLIENT_ID = process.env.GITGAEL_GITHUB_CLIENT_ID ?? '';
const OAUTH_CLIENT_SECRET = process.env.GITGAEL_GITHUB_CLIENT_SECRET ?? '';

export function registerAuthHandlers() {
  ipcMain.handle(IPC.AUTH_STATUS, (): AuthStatus => {
    return {
      authenticated: currentToken !== null,
      username: currentUsername,
      scopes: currentToken ? ['repo'] : null,
    };
  });

  ipcMain.handle(IPC.AUTH_START, async (): Promise<AuthStatus> => {
    if (!OAUTH_CLIENT_ID) {
      throw new Error(
        'Set GITGAEL_GITHUB_CLIENT_ID and GITGAEL_GITHUB_CLIENT_SECRET environment variables'
      );
    }

    const token = await performOAuthFlow();
    if (token) {
      currentToken = token;
      // Fetch username
      const resp = await fetch('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${token}`, 'User-Agent': 'GitGael' },
      });
      if (resp.ok) {
        const user = (await resp.json()) as { login: string };
        currentUsername = user.login;
      }
    }

    return {
      authenticated: currentToken !== null,
      username: currentUsername,
      scopes: currentToken ? ['repo'] : null,
    };
  });

  ipcMain.handle(IPC.AUTH_LOGOUT, () => {
    currentToken = null;
    currentUsername = null;
  });
}

export function getToken(): string | null {
  return currentToken;
}

export function getUsername(): string | null {
  return currentUsername;
}

function performOAuthFlow(): Promise<string | null> {
  return new Promise((resolve) => {
    const server = createServer((req: IncomingMessage, res: ServerResponse) => {
      const url = new URL(req.url ?? '/', `http://localhost`);

      if (url.pathname === '/callback') {
        const code = url.searchParams.get('code');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<html><body><h1>GitGael: Auth complete. You can close this tab.</h1></body></html>');
        server.close();

        if (code) {
          exchangeCode(code).then(resolve).catch(() => resolve(null));
        } else {
          resolve(null);
        }
      }
    });

    server.listen(0, '127.0.0.1', () => {
      const addr = server.address();
      if (!addr || typeof addr === 'string') {
        resolve(null);
        return;
      }
      const port = addr.port;
      const redirectUri = `http://127.0.0.1:${port}/callback`;
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${OAUTH_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo`;
      shell.openExternal(authUrl);
    });

    // Timeout after 5 minutes
    setTimeout(() => {
      server.close();
      resolve(null);
    }, 5 * 60 * 1000);
  });
}

async function exchangeCode(code: string): Promise<string | null> {
  const resp = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: OAUTH_CLIENT_ID,
      client_secret: OAUTH_CLIENT_SECRET,
      code,
    }),
  });

  if (!resp.ok) return null;

  const data = (await resp.json()) as { access_token?: string };
  return data.access_token ?? null;
}
