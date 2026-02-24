use crate::AppState;
use serde::{Deserialize, Serialize};
use tauri::State;

// --- Data types ---

#[derive(Debug, Serialize, Deserialize)]
pub struct Repo {
    pub id: i64,
    pub fork_name: String,
    pub display_name: String,
    pub upstream_url: Option<String>,
    pub github_url: Option<String>,
    pub document_id: Option<i64>,
    pub section_id: Option<i64>,
    pub subsection_id: Option<i64>,
    pub description: Option<String>,
    pub build_cmd: Option<String>,
    pub usage_cmd: Option<String>,
    pub install_cmd: Option<String>,
    pub docs_url: Option<String>,
    pub note: Option<String>,
    pub source_type: String,
    pub fork_status: String,
    pub is_private: bool,
    pub sort_order: i64,
}

#[derive(Debug, Deserialize)]
pub struct RepoListFilter {
    pub document_id: Option<i64>,
    pub section_id: Option<i64>,
    pub limit: Option<i64>,
    pub offset: Option<i64>,
}

#[derive(Debug, Serialize)]
pub struct RepoListResponse {
    pub repos: Vec<Repo>,
    pub total: i64,
}

#[derive(Debug, Serialize)]
pub struct CategoryNode {
    pub document: Document,
    pub sections: Vec<SectionNode>,
    pub repo_count: i64,
}

#[derive(Debug, Serialize)]
pub struct Document {
    pub id: i64,
    pub doc_number: i64,
    pub filename: String,
    pub title: String,
    pub description: Option<String>,
    pub sort_order: i64,
}

#[derive(Debug, Serialize)]
pub struct SectionNode {
    pub section: Section,
    pub subsections: Vec<SubsectionNode>,
    pub repo_count: i64,
}

#[derive(Debug, Serialize)]
pub struct Section {
    pub id: i64,
    pub document_id: i64,
    pub name: String,
    pub sort_order: i64,
}

#[derive(Debug, Serialize)]
pub struct SubsectionNode {
    pub subsection: Subsection,
    pub repo_count: i64,
}

#[derive(Debug, Serialize)]
pub struct Subsection {
    pub id: i64,
    pub section_id: i64,
    pub name: String,
    pub sort_order: i64,
}

#[derive(Debug, Serialize)]
pub struct AuthStatus {
    pub authenticated: bool,
    pub username: Option<String>,
    pub scopes: Option<Vec<String>>,
}

#[derive(Debug, Serialize)]
pub struct ForkResult {
    pub success: bool,
    pub repo_id: Option<i64>,
    pub error: Option<String>,
    pub fork_url: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct ExportResult {
    pub success: bool,
    pub path: Option<String>,
    pub error: Option<String>,
}

// --- Commands ---

#[tauri::command]
pub fn repo_list(state: State<'_, AppState>, filter: Option<RepoListFilter>) -> Result<RepoListResponse, String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    let mut query = String::from("SELECT * FROM repos WHERE 1=1");
    let mut count_query = String::from("SELECT COUNT(*) FROM repos WHERE 1=1");
    let mut params: Vec<Box<dyn rusqlite::types::ToSql>> = Vec::new();

    if let Some(ref f) = filter {
        if let Some(doc_id) = f.document_id {
            query.push_str(" AND document_id = ?");
            count_query.push_str(" AND document_id = ?");
            params.push(Box::new(doc_id));
        }
        if let Some(sec_id) = f.section_id {
            query.push_str(" AND section_id = ?");
            count_query.push_str(" AND section_id = ?");
            params.push(Box::new(sec_id));
        }
    }

    let param_refs: Vec<&dyn rusqlite::types::ToSql> = params.iter().map(|p| p.as_ref()).collect();

    let total: i64 = db.conn
        .query_row(&count_query, param_refs.as_slice(), |row| row.get(0))
        .map_err(|e| e.to_string())?;

    query.push_str(" ORDER BY sort_order, display_name");

    if let Some(ref f) = filter {
        if let Some(limit) = f.limit {
            query.push_str(&format!(" LIMIT {}", limit));
        }
        if let Some(offset) = f.offset {
            query.push_str(&format!(" OFFSET {}", offset));
        }
    }

    let mut stmt = db.conn.prepare(&query).map_err(|e| e.to_string())?;
    let repos = stmt
        .query_map(param_refs.as_slice(), |row| {
            Ok(Repo {
                id: row.get(0)?,
                fork_name: row.get(1)?,
                display_name: row.get(2)?,
                upstream_url: row.get(3)?,
                github_url: row.get(4)?,
                document_id: row.get(5)?,
                section_id: row.get(6)?,
                subsection_id: row.get(7)?,
                description: row.get(8)?,
                build_cmd: row.get(9)?,
                usage_cmd: row.get(10)?,
                install_cmd: row.get(11)?,
                docs_url: row.get(12)?,
                note: row.get(13)?,
                source_type: row.get::<_, String>(22).unwrap_or_default(),
                fork_status: row.get::<_, String>(25).unwrap_or_default(),
                is_private: row.get::<_, i64>(23).unwrap_or(1) != 0,
                sort_order: row.get::<_, i64>(27).unwrap_or(0),
            })
        })
        .map_err(|e| e.to_string())?
        .filter_map(|r| r.ok())
        .collect();

    Ok(RepoListResponse { repos, total })
}

#[tauri::command]
pub fn repo_get(state: State<'_, AppState>, id: i64) -> Result<Option<Repo>, String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    let result = db.conn.query_row(
        "SELECT * FROM repos WHERE id = ?",
        [id],
        |row| {
            Ok(Repo {
                id: row.get(0)?,
                fork_name: row.get(1)?,
                display_name: row.get(2)?,
                upstream_url: row.get(3)?,
                github_url: row.get(4)?,
                document_id: row.get(5)?,
                section_id: row.get(6)?,
                subsection_id: row.get(7)?,
                description: row.get(8)?,
                build_cmd: row.get(9)?,
                usage_cmd: row.get(10)?,
                install_cmd: row.get(11)?,
                docs_url: row.get(12)?,
                note: row.get(13)?,
                source_type: row.get::<_, String>(22).unwrap_or_default(),
                fork_status: row.get::<_, String>(25).unwrap_or_default(),
                is_private: row.get::<_, i64>(23).unwrap_or(1) != 0,
                sort_order: row.get::<_, i64>(27).unwrap_or(0),
            })
        },
    );

    match result {
        Ok(repo) => Ok(Some(repo)),
        Err(rusqlite::Error::QueryReturnedNoRows) => Ok(None),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub fn repo_search(state: State<'_, AppState>, query: String, limit: Option<i64>) -> Result<Vec<Repo>, String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    let limit = limit.unwrap_or(50);
    let mut stmt = db.conn
        .prepare(
            "SELECT repos.* FROM repos_fts JOIN repos ON repos.id = repos_fts.rowid WHERE repos_fts MATCH ?1 ORDER BY rank LIMIT ?2"
        )
        .map_err(|e| e.to_string())?;

    let repos = stmt
        .query_map(rusqlite::params![query, limit], |row| {
            Ok(Repo {
                id: row.get(0)?,
                fork_name: row.get(1)?,
                display_name: row.get(2)?,
                upstream_url: row.get(3)?,
                github_url: row.get(4)?,
                document_id: row.get(5)?,
                section_id: row.get(6)?,
                subsection_id: row.get(7)?,
                description: row.get(8)?,
                build_cmd: row.get(9)?,
                usage_cmd: row.get(10)?,
                install_cmd: row.get(11)?,
                docs_url: row.get(12)?,
                note: row.get(13)?,
                source_type: row.get::<_, String>(22).unwrap_or_default(),
                fork_status: row.get::<_, String>(25).unwrap_or_default(),
                is_private: row.get::<_, i64>(23).unwrap_or(1) != 0,
                sort_order: row.get::<_, i64>(27).unwrap_or(0),
            })
        })
        .map_err(|e| e.to_string())?
        .filter_map(|r| r.ok())
        .collect();

    Ok(repos)
}

#[tauri::command]
pub fn repo_create(state: State<'_, AppState>, fork_name: String, display_name: String, document_id: Option<i64>, description: Option<String>) -> Result<i64, String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    db.conn
        .execute(
            "INSERT INTO repos (fork_name, display_name, document_id, description, source_type) VALUES (?1, ?2, ?3, ?4, 'user_added')",
            rusqlite::params![fork_name, display_name, document_id, description],
        )
        .map_err(|e| e.to_string())?;
    Ok(db.conn.last_insert_rowid())
}

#[tauri::command]
pub fn repo_update(state: State<'_, AppState>, id: i64, display_name: Option<String>, description: Option<String>) -> Result<usize, String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    let mut sets = Vec::new();
    let mut params: Vec<Box<dyn rusqlite::types::ToSql>> = Vec::new();

    if let Some(name) = display_name {
        sets.push("display_name = ?");
        params.push(Box::new(name));
    }
    if let Some(desc) = description {
        sets.push("description = ?");
        params.push(Box::new(desc));
    }

    if sets.is_empty() {
        return Ok(0);
    }

    params.push(Box::new(id));
    let query = format!("UPDATE repos SET {} WHERE id = ?", sets.join(", "));
    let param_refs: Vec<&dyn rusqlite::types::ToSql> = params.iter().map(|p| p.as_ref()).collect();
    db.conn.execute(&query, param_refs.as_slice()).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn repo_delete(state: State<'_, AppState>, id: i64) -> Result<usize, String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    db.conn.execute("DELETE FROM repos WHERE id = ?", [id]).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn category_tree(state: State<'_, AppState>) -> Result<Vec<CategoryNode>, String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;

    let mut doc_stmt = db.conn
        .prepare("SELECT id, doc_number, filename, title, description, sort_order FROM documents ORDER BY sort_order, doc_number")
        .map_err(|e| e.to_string())?;

    let documents: Vec<Document> = doc_stmt
        .query_map([], |row| {
            Ok(Document {
                id: row.get(0)?,
                doc_number: row.get(1)?,
                filename: row.get(2)?,
                title: row.get(3)?,
                description: row.get(4)?,
                sort_order: row.get(5)?,
            })
        })
        .map_err(|e| e.to_string())?
        .filter_map(|r| r.ok())
        .collect();

    let mut tree = Vec::new();
    for doc in documents {
        let repo_count: i64 = db.conn
            .query_row("SELECT COUNT(*) FROM repos WHERE document_id = ?", [doc.id], |row| row.get(0))
            .unwrap_or(0);

        let mut sec_stmt = db.conn
            .prepare("SELECT id, document_id, name, sort_order FROM sections WHERE document_id = ? ORDER BY sort_order")
            .map_err(|e| e.to_string())?;

        let sections: Vec<Section> = sec_stmt
            .query_map([doc.id], |row| {
                Ok(Section {
                    id: row.get(0)?,
                    document_id: row.get(1)?,
                    name: row.get(2)?,
                    sort_order: row.get(3)?,
                })
            })
            .map_err(|e| e.to_string())?
            .filter_map(|r| r.ok())
            .collect();

        let section_nodes: Vec<SectionNode> = sections
            .into_iter()
            .map(|sec| {
                let sec_repo_count: i64 = db.conn
                    .query_row("SELECT COUNT(*) FROM repos WHERE section_id = ?", [sec.id], |row| row.get(0))
                    .unwrap_or(0);

                SectionNode {
                    section: sec,
                    subsections: Vec::new(), // TODO: populate subsections
                    repo_count: sec_repo_count,
                }
            })
            .collect();

        tree.push(CategoryNode {
            document: doc,
            sections: section_nodes,
            repo_count,
        });
    }

    Ok(tree)
}

#[tauri::command]
pub fn github_auth_start() -> Result<AuthStatus, String> {
    // TODO: Implement OAuth flow with loopback server
    Ok(AuthStatus {
        authenticated: false,
        username: None,
        scopes: None,
    })
}

#[tauri::command]
pub fn github_auth_status() -> AuthStatus {
    AuthStatus {
        authenticated: false,
        username: None,
        scopes: None,
    }
}

#[tauri::command]
pub fn github_auth_logout() -> Result<(), String> {
    Ok(())
}

#[tauri::command]
pub async fn github_fork(_url: String, _document_id: i64) -> Result<ForkResult, String> {
    // TODO: Implement fork workflow
    Ok(ForkResult {
        success: false,
        repo_id: None,
        error: Some("Not yet implemented".to_string()),
        fork_url: None,
    })
}

#[tauri::command]
pub fn export_catalog() -> Result<ExportResult, String> {
    // TODO: Implement catalog export
    Ok(ExportResult {
        success: false,
        path: None,
        error: Some("Not yet implemented".to_string()),
    })
}

#[tauri::command]
pub fn export_markdown() -> Result<ExportResult, String> {
    // TODO: Implement markdown export
    Ok(ExportResult {
        success: false,
        path: None,
        error: Some("Not yet implemented".to_string()),
    })
}
