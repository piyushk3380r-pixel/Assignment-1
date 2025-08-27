'use client';
import { useEffect, useMemo, useState } from 'react';

type Mode = 'paragraphs' | 'table';
type Tab = { id: string; title: string; mode: Mode; raw: string };

/* -------- Stable ID generator (avoids hydration mismatch) -------- */
let counter = 0;
function uid() {
  counter += 1;
  return `tab-${counter}`;
}

/* -------- Helpers to ensure unique, stable IDs on load -------- */
const ID_RE = /^tab-(\d+)$/;

function normalizeTabs(incoming: Tab[]): Tab[] {
  let max = 0;
  for (const t of incoming) {
    const m = t.id.match(ID_RE);
    if (m) {
      const n = parseInt(m[1], 10);
      if (!Number.isNaN(n) && n > max) max = n;
    }
  }
  counter = max;
  const seen = new Set<string>();
  return incoming.map((t) => {
    let id = t.id;
    if (!ID_RE.test(id) || seen.has(id)) {
      id = uid();
    }
    seen.add(id);
    return { ...t, id };
  });
}

/* -------- Constants -------- */
const MAX_TABS = 15;
const STORAGE_KEY = 'tabs_data';

export default function TabsBuilder() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  /* -------- Initialize tabs on first mount -------- */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Tab[] = JSON.parse(stored);
        const normalized = normalizeTabs(parsed);
        setTabs(normalized);
        return;
      }
    } catch {
      /* ignore parse/storage errors */
    }

    // Fallback default tabs (first-time visitors)
    const defaults: Tab[] = [
      { id: 'tab-1', title: 'Setup', mode: 'paragraphs', raw: 'Make sure you have VSCode installed.\nWatch and follow the video.' },
      { id: 'tab-2', title: 'Terminal Commands', mode: 'paragraphs', raw: 'sudo dnf install httpd\nsudo systemctl enable --now httpd.service' },
    ];
    const normalized = normalizeTabs(defaults);
    setTabs(normalized);

    // Persist defaults immediately so they’re available on reload
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    } catch {
      /* ignore storage errors */
    }
  }, []);

  /* -------- Persist tabs to localStorage whenever they change -------- */
  useEffect(() => {
    if (tabs.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tabs));
      } catch {
        /* ignore storage errors */
      }
    }
  }, [tabs]);

  /* -------- Actions -------- */
  function addTab() {
    if (tabs.length >= MAX_TABS) {
      alert('tab limit of 15 is reached. cannot add more.');
      return;
    }
    const newTab: Tab = {
      id: uid(),
      title: `Tab ${tabs.length + 1}`,
      mode: 'paragraphs',
      raw: '',
    };
    setTabs((t) => [...t, newTab]);
    setActiveIdx(tabs.length);
  }

  function removeTab(i: number) {
    if (tabs.length <= 1) return; // keep at least one tab
    const next = tabs.filter((_, idx) => idx !== i);
    setTabs(next);
    setActiveIdx(Math.max(0, i - 1));
  }

  /* -------- CONTENT-ONLY Document (inline CSS, full HTML skeleton) -------- */
  const contentDocHtml = useMemo(() => {
    if (!tabs.length || activeIdx < 0 || activeIdx >= tabs.length) return '';

    const t = tabs[activeIdx];
    const docTitle = (t.title || 'Document').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Build body fragment based on mode — with strictly inline styles, no classes
    let bodyInner = '';

    if (t.mode === 'table') {
      const rows = t.raw
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean)
        .map((l) => l.split('|').map((c) => escapeHtml(c.trim())));

      if (!rows.length) {
        bodyInner = '<p style="margin:0 0 10px 0;">(empty table)</p>';
      } else {
        const tableStyle = 'border-collapse:collapse;';
        const cellStyle = 'border:1px solid #aaa;padding:6px 10px;vertical-align:top;';
        const body = rows
          .map((cols) => `<tr>${cols.map((c) => `<td style="${cellStyle}">${c || '&nbsp;'}</td>`).join('')}</tr>`)
          .join('');
        bodyInner = `<table style="${tableStyle}"><tbody>${body}</tbody></table>`;
      }
    } else {
      // paragraphs mode
      const lines = t.raw.split('\n').map((l) => l.trim()).filter(Boolean);
      if (!lines.length) {
        bodyInner = '<p style="margin:0 0 10px 0;">(empty)</p>';
      } else {
        const pStyle = 'margin:0 0 10px 0;';
        bodyInner = lines.map((l) => `<p style="${pStyle}">${escapeHtml(l)}</p>`).join('');
      }
    }

    // Full, minimal document (no classes, only inline styles)
    return [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head>',
      '<meta charset="utf-8">',
      `<title>${docTitle}</title>`,
      '</head>',
      '<body>',
      bodyInner,
      '</body>',
      '</html>',
    ].join('');
  }, [tabs, activeIdx]);

  /* -------- UI -------- */
  return (
    <section>
      <h1 className="mb-3">Tabs Builder</h1>

      <div className="d-flex align-items-center gap-2 mb-3">
        <button className="btn btn-success" onClick={addTab}>
          + Add Tab
        </button>
        <span className="small text-muted">Edit the active tab’s title and content. Switch mode for table output.</span>
      </div>

      <ul className="nav nav-tabs" role="tablist">
        {tabs.map((t, i) => (
          <li key={t.id} className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeIdx === i ? 'active' : ''}`}
              role="tab"
              aria-selected={activeIdx === i}
              onClick={() => setActiveIdx(i)}
            >
              {t.title || `Tab ${i + 1}`}
            </button>
          </li>
        ))}
      </ul>

      {tabs.map((t, i) =>
        i === activeIdx ? (
          <div key={t.id} className="border border-top-0 p-3" role="tabpanel">
            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor={`title-${t.id}`} className="form-label">
                  Tab title
                </label>
                <input
                  id={`title-${t.id}`}
                  className="form-control"
                  value={t.title}
                  spellCheck={false}
                  onChange={(e) =>
                    setTabs((prev) => prev.map((x, idx) => (idx === i ? { ...x, title: e.target.value } : x)))
                  }
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Content mode</label>
                <select
                  className="form-select"
                  value={t.mode}
                  onChange={(e) =>
                    setTabs((prev) => prev.map((x, idx) => (idx === i ? { ...x, mode: e.target.value as Mode } : x)))
                  }
                >
                  <option value="paragraphs">Paragraphs</option>
                  <option value="table">Table (rows separated by newlines, columns by |)</option>
                </select>
              </div>
              <div className="col-md-3 d-flex align-items-end">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => removeTab(i)}
                  disabled={tabs.length <= 1}
                >
                  − Delete
                </button>
              </div>
              <div className="col-12">
                <label htmlFor={`raw-${t.id}`} className="form-label">
                  Content {t.mode === 'table' && <span className="text-muted">(example: <code>col1|col2</code>)</span>}
                </label>
                <textarea
                  id={`raw-${t.id}`}
                  className="form-control"
                  rows={10}
                  value={t.raw}
                  spellCheck={false}
                  onChange={(e) =>
                    setTabs((prev) => prev.map((x, idx) => (idx === i ? { ...x, raw: e.target.value } : x)))
                  }
                />
              </div>
            </div>
          </div>
        ) : null
      )}

      <hr className="my-4" />
      <h2 className="h5">Output</h2>
      <p className="text-muted">
        Copies a complete HTML document (doctype, html, head/title, body) that contains the current tab’s <strong>Content</strong> as
        inline-styled <code>&lt;p&gt;</code> or <code>&lt;table&gt;</code>.
      </p>
      <button
        className="btn btn-primary mb-2"
        onClick={() => {
          navigator.clipboard.writeText(contentDocHtml);
          alert('HTML copied to clipboard');
        }}
      >
        Output &amp; Copy to Clipboard
      </button>
      <textarea
        className="form-control"
        rows={14}
        readOnly
        value={contentDocHtml}
        aria-label="Generated full HTML document (inline CSS, content only)"
      ></textarea>
    </section>
  );
}

/* -------- Helpers -------- */
function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
