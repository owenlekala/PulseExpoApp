# API Documentation

This document describes the API endpoints used in the PulseExpoApp.

## Base URL

The base URL is configured via environment variables:
- Development: Set in `.env.development`
- Production: Set in `.env.production`

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### POST `/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "displayName": "User Name"
    }
  }
}
```

#### POST `/auth/signup`
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "displayName": "User Name"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "displayName": "User Name"
    }
  }
}
```

#### POST `/auth/refresh`
Refresh authentication token.

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "new_jwt_token_here"
  }
}
```

#### POST `/auth/logout`
Logout current user.

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### User

#### GET `/user/profile`
Get current user profile.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "displayName": "User Name",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### PUT `/user/profile`
Update user profile.

**Request Body:**
```json
{
  "displayName": "New Name"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "displayName": "New Name"
  }
}
```

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "success": false,
  "code": "ERROR_CODE",
  "message": "Error message",
  "status": 400
}
```

### Common Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

API requests are rate-limited. Check response headers for rate limit information:
- `X-RateLimit-Limit`: Maximum requests per window
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Time when rate limit resets

## Pagination

Endpoints that return lists support pagination:

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)
- `sortBy`: Field to sort by
- `sortOrder`: `asc` or `desc`

**Response:**
```json
{
  "success": true,
  "data": [...],
  "total": 100,
  "page": 1,
  "limit": 20,
  "hasMore": true
}
```

