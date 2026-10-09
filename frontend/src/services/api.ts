import type {
  InvestigationDetail,
  InvestigationSummary,
  DashboardStats,
  EvidenceGraphData,
  IntegrationStatus,
} from '../types';

const API_BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '') + '/api/v1';

export function getAuthToken(): string | null {
  return localStorage.getItem('trusttrace_token') || sessionStorage.getItem('trusttrace_token');
}

export function setAuthToken(token: string, rememberMe: boolean = true) {
  if (rememberMe) {
    localStorage.setItem('trusttrace_token', token);
    sessionStorage.removeItem('trusttrace_token');
  } else {
    sessionStorage.setItem('trusttrace_token', token);
    localStorage.removeItem('trusttrace_token');
  }
}

export function clearAuthToken() {
  localStorage.removeItem('trusttrace_token');
  sessionStorage.removeItem('trusttrace_token');
  localStorage.removeItem('trusttrace_user');
  sessionStorage.removeItem('trusttrace_user');
}

export function getStoredUser(): any | null {
  const userStr = localStorage.getItem('trusttrace_user') || sessionStorage.getItem('trusttrace_user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function setStoredUser(user: any, rememberMe: boolean = true) {
  if (rememberMe) {
    localStorage.setItem('trusttrace_user', JSON.stringify(user));
  } else {
    sessionStorage.setItem('trusttrace_user', JSON.stringify(user));
  }
}

function getAuthHeader(): Record<string, string> {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function loginUser(credentials: { email: string; password: string; rememberMe?: boolean }): Promise<{ access_token: string; user: any }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: credentials.email, password: credentials.password })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Authentication failed' }));
    throw new Error(err.detail || 'Invalid email or password');
  }
  const data = await res.json();
  const remember = credentials.rememberMe ?? true;
  setAuthToken(data.access_token, remember);
  if (data.user) {
    setStoredUser(data.user, remember);
  }
  return data;
}

export async function registerUser(payload: { email: string; password: string; full_name?: string; rememberMe?: boolean }): Promise<{ access_token: string; user: any }> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: payload.email, password: payload.password, full_name: payload.full_name })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Registration failed' }));
    throw new Error(err.detail || 'Failed to create account');
  }
  const data = await res.json();
  const remember = payload.rememberMe ?? true;
  setAuthToken(data.access_token, remember);
  if (data.user) {
    setStoredUser(data.user, remember);
  }
  return data;
}

export async function loginDemoUser(): Promise<string> {
  let token = getAuthToken();
  if (token) return token;

  // Auto-login or register local demo analyst if no token exists
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'analyst@trusttrace.ai', password: 'Password123!' })
    });
    if (res.ok) {
      const data = await res.json();
      setAuthToken(data.access_token, true);
      if (data.user) setStoredUser(data.user, true);
      return data.access_token;
    }
  } catch (e) {
    // try register
  }

  // Register demo analyst
  const regRes = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'analyst@trusttrace.ai',
      password: 'Password123!',
      full_name: 'Lead Forensics Analyst'
    })
  });
  if (regRes.ok) {
    const data = await regRes.json();
    setAuthToken(data.access_token, true);
    if (data.user) setStoredUser(data.user, true);
    return data.access_token;
  }
  return '';
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  await loginDemoUser();
  const res = await fetch(`${API_BASE}/dashboard/stats`, {
    headers: { ...getAuthHeader() }
  });
  if (!res.ok) throw new Error('Failed to fetch dashboard stats');
  return res.json();
}

export async function fetchInvestigations(status?: string): Promise<InvestigationSummary[]> {
  await loginDemoUser();
  const url = status ? `${API_BASE}/investigations?status=${status}` : `${API_BASE}/investigations`;
  const res = await fetch(url, { headers: { ...getAuthHeader() } });
  if (!res.ok) throw new Error('Failed to fetch investigations');
  return res.json();
}

export async function fetchInvestigationDetail(id: string): Promise<InvestigationDetail> {
  await loginDemoUser();
  const res = await fetch(`${API_BASE}/investigations/${id}`, {
    headers: { ...getAuthHeader() }
  });
  if (!res.ok) throw new Error('Failed to fetch investigation detail');
  return res.json();
}

export async function fetchEvidenceGraph(id: string): Promise<EvidenceGraphData> {
  await loginDemoUser();
  const res = await fetch(`${API_BASE}/investigations/${id}/graph`, {
    headers: { ...getAuthHeader() }
  });
  if (!res.ok) throw new Error('Failed to fetch evidence graph');
  return res.json();
}

export async function createInvestigation(payload: {
  title?: string;
  context_type: string;
  raw_text?: string;
  raw_url?: string;
  claimed_organization?: string;
  payment_handle?: string;
  notes?: string;
  enable_pii_redaction: boolean;
  is_demo_scenario: boolean;
}): Promise<InvestigationDetail> {
  await loginDemoUser();
  const res = await fetch(`${API_BASE}/investigations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Failed to create investigation');
  }
  return res.json();
}

export async function deleteInvestigation(id: string): Promise<void> {
  await loginDemoUser();
  const res = await fetch(`${API_BASE}/investigations/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeader() }
  });
  if (!res.ok) throw new Error('Failed to delete investigation');
}

export async function exportInvestigationReport(id: string, format: 'json' | 'markdown'): Promise<string> {
  await loginDemoUser();
  const res = await fetch(`${API_BASE}/investigations/${id}/export?format=${format}`, {
    headers: { ...getAuthHeader() }
  });
  if (!res.ok) throw new Error('Failed to export report');
  return res.text();
}

export async function fetchIntegrationStatus(): Promise<IntegrationStatus> {
  const res = await fetch(`${API_BASE}/settings/integrations`);
  if (!res.ok) throw new Error('Failed to fetch integration status');
  return res.json();
}
