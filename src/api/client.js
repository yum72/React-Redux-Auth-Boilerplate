/**
 * Tiny fetch wrapper for the auth API.
 *
 * Replaces the axios dependency the boilerplate used to carry. Native fetch
 * covers everything here, and one less dependency in a starter template is one
 * less thing for whoever forks it to keep updated.
 */

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api';

/**
 * An API error carrying the server's own message where there was one.
 */
export class ApiError extends Error {
  constructor(message, { status, code } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

/**
 * @param {string} path - Path under VITE_API_URL, for example '/user/login'.
 * @param {Object} [options]
 * @param {string} [options.method='GET']
 * @param {Object} [options.body] - Serialised as JSON.
 * @param {string} [options.token] - Sent as a Bearer token.
 * @returns {Promise<any>} The parsed JSON response.
 * @throws {ApiError} On a non-2xx response or a failed connection.
 */
export const request = async (path, { method = 'GET', body, token } = {}) => {
  let response;

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      ...(body ? { body: JSON.stringify(body) } : {})
    });
  } catch {
    // fetch only rejects when the request never reached the server.
    throw new ApiError('Network error. Is the API running?');
  }

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(payload.message ?? `Request failed (${response.status})`, {
      status: response.status,
      code: payload.message
    });
  }

  return payload;
};
