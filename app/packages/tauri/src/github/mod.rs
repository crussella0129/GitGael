// GitHub API client for Tauri backend
// Will mirror the Electron implementation using reqwest + keyring

pub struct GitHubClient {
    token: Option<String>,
    username: Option<String>,
}

impl GitHubClient {
    pub fn new() -> Self {
        GitHubClient {
            token: None,
            username: None,
        }
    }

    pub fn is_authenticated(&self) -> bool {
        self.token.is_some()
    }

    pub fn get_username(&self) -> Option<&str> {
        self.username.as_deref()
    }
}
