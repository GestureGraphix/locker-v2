# API Documentation

## Overview

Locker v2 uses Next.js API routes with REST conventions. All endpoints require authentication unless otherwise specified.

## Authentication

All protected endpoints require a valid session cookie. Unauthenticated requests return `401 Unauthorized`.

### POST /api/auth/register

Create a new account.

**Request:**
```json
{
  "email": "athlete@yale.edu",
  "password": "securepassword",
  "name": "John Doe",
  "role": "ATHLETE"
}
```

**Response (201):**
```json
{
  "id": "cuid123",
  "email": "athlete@yale.edu",
  "name": "John Doe",
  "role": "ATHLETE"
}
```

### POST /api/auth/login

Sign in with credentials.

**Request:**
```json
{
  "email": "athlete@yale.edu",
  "password": "securepassword"
}
```

**Response (200):**
```json
{
  "id": "cuid123",
  "email": "athlete@yale.edu",
  "name": "John Doe",
  "role": "ATHLETE"
}
```

Sets `session` cookie on success.

### POST /api/auth/logout

Sign out and invalidate session.

**Response (200):**
```json
{ "success": true }
```

### GET /api/auth/session

Get current session info.

**Response (200):**
```json
{
  "user": {
    "id": "cuid123",
    "email": "athlete@yale.edu",
    "name": "John Doe",
    "role": "ATHLETE"
  }
}
```

---

## Training

### GET /api/training/sessions

List training sessions for the authenticated user.

**Query Parameters:**
- `status` - Filter by status (PLANNED, IN_PROGRESS, COMPLETED, CANCELLED)
- `from` - Start date (ISO 8601)
- `to` - End date (ISO 8601)
- `cursor` - Pagination cursor
- `limit` - Results per page (default: 20, max: 100)

**Response (200):**
```json
{
  "data": [
    {
      "id": "session123",
      "name": "Leg Day",
      "type": "STRENGTH",
      "intensity": "HIGH",
      "status": "COMPLETED",
      "scheduledAt": "2024-01-15T10:00:00Z",
      "completedAt": "2024-01-15T11:30:00Z",
      "duration": 90
    }
  ],
  "nextCursor": "cursor456"
}
```

### POST /api/training/sessions

Create a new training session.

**Request:**
```json
{
  "name": "Upper Body",
  "type": "STRENGTH",
  "intensity": "MEDIUM",
  "scheduledAt": "2024-01-20T14:00:00Z",
  "notes": "Focus on bench press"
}
```

**Response (201):**
```json
{
  "id": "session789",
  "name": "Upper Body",
  "type": "STRENGTH",
  "intensity": "MEDIUM",
  "status": "PLANNED",
  "scheduledAt": "2024-01-20T14:00:00Z",
  "notes": "Focus on bench press"
}
```

### PUT /api/training/sessions/:id

Update a training session.

**Request:**
```json
{
  "status": "COMPLETED",
  "completedAt": "2024-01-20T15:30:00Z",
  "duration": 90
}
```

### DELETE /api/training/sessions/:id

Delete a training session.

**Response (204):** No content

### GET /api/training/prs

List personal records.

**Query Parameters:**
- `exercise` - Filter by exercise name

**Response (200):**
```json
{
  "data": [
    {
      "id": "pr123",
      "exercise": "Bench Press",
      "weight": 225,
      "reps": 1,
      "recordedAt": "2024-01-10T16:00:00Z"
    }
  ]
}
```

### POST /api/training/prs

Add a personal record.

**Request:**
```json
{
  "exercise": "Squat",
  "weight": 315,
  "reps": 3
}
```

---

## Nutrition

### GET /api/nutrition/meals

List meal logs.

**Query Parameters:**
- `date` - Filter by date (YYYY-MM-DD)
- `type` - Filter by meal type
- `cursor` - Pagination cursor
- `limit` - Results per page

**Response (200):**
```json
{
  "data": [
    {
      "id": "meal123",
      "name": "Grilled Chicken Salad",
      "type": "LUNCH",
      "calories": 450,
      "protein": 35,
      "carbs": 20,
      "fat": 25,
      "source": "yale-dining",
      "loggedAt": "2024-01-15T12:30:00Z"
    }
  ],
  "nextCursor": null
}
```

### POST /api/nutrition/meals

Log a meal.

**Request:**
```json
{
  "name": "Protein Shake",
  "type": "SNACK",
  "calories": 200,
  "protein": 30,
  "carbs": 10,
  "fat": 5,
  "source": "manual"
}
```

### DELETE /api/nutrition/meals/:id

Delete a meal log.

### GET /api/nutrition/hydration

Get hydration logs.

**Query Parameters:**
- `date` - Filter by date (YYYY-MM-DD)

**Response (200):**
```json
{
  "data": [
    {
      "id": "hydration123",
      "amount": 16,
      "loggedAt": "2024-01-15T09:00:00Z"
    }
  ],
  "total": 64
}
```

### POST /api/nutrition/hydration

Log water intake.

**Request:**
```json
{
  "amount": 8
}
```

### GET /api/nutrition/yale-menu

Get Yale dining menu.

**Query Parameters:**
- `date` - Date (YYYY-MM-DD)
- `meal` - Meal type (breakfast, lunch, dinner)
- `location` - Dining hall (optional)

**Response (200):**
```json
{
  "data": [
    {
      "name": "Grilled Salmon",
      "station": "Grill",
      "calories": 350,
      "protein": 40,
      "carbs": 5,
      "fat": 18,
      "allergens": ["fish"]
    }
  ]
}
```

---

## Academics

### GET /api/academics

List academic items.

**Query Parameters:**
- `completed` - Filter by completion status
- `type` - Filter by item type
- `course` - Filter by course

**Response (200):**
```json
{
  "data": [
    {
      "id": "academic123",
      "title": "Midterm Exam",
      "type": "EXAM",
      "course": "ECON 101",
      "dueAt": "2024-01-20T14:00:00Z",
      "completed": false
    }
  ]
}
```

### POST /api/academics

Create academic item.

**Request:**
```json
{
  "title": "Essay Draft",
  "type": "ESSAY",
  "course": "ENGL 120",
  "dueAt": "2024-01-25T23:59:00Z"
}
```

### PUT /api/academics/:id

Update academic item.

### DELETE /api/academics/:id

Delete academic item.

---

## User Profile

### GET /api/user/profile

Get user profile.

**Response (200):**
```json
{
  "id": "user123",
  "email": "athlete@yale.edu",
  "name": "John Doe",
  "role": "ATHLETE",
  "profile": {
    "sport": "Basketball",
    "position": "Point Guard",
    "team": "Varsity",
    "heightInches": 72,
    "weightLbs": 180,
    "calorieGoal": 3000,
    "proteinGoal": 180,
    "hydrationGoal": 128,
    "allergies": ["peanuts"]
  }
}
```

### PUT /api/user/profile

Update user profile.

**Request:**
```json
{
  "name": "John Smith",
  "profile": {
    "sport": "Basketball",
    "position": "Shooting Guard",
    "weightLbs": 185
  }
}
```

---

## Error Responses

All endpoints return consistent error format:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| UNAUTHORIZED | 401 | Missing or invalid session |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| VALIDATION_ERROR | 400 | Invalid request body |
| INTERNAL_ERROR | 500 | Server error |

---

## Rate Limiting

API endpoints are rate limited:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated endpoints

Rate limit headers:
- `X-RateLimit-Limit`: Max requests per window
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Window reset timestamp
