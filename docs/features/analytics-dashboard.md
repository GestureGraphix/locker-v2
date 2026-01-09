# Feature: Analytics Dashboard

## Overview

The Analytics Dashboard provides athletes and coaches with visual insights into performance metrics, trends, and progress over time. This is a new feature for v2.

## User Stories

### As an Athlete
- I want to see my training volume over the past month so I can track my consistency
- I want to view my nutrition trends to ensure I'm hitting my goals
- I want to see my PR progression for key lifts
- I want to compare my current week to previous weeks

### As a Coach
- I want to see aggregate metrics across all my athletes
- I want to identify athletes who may be overtraining or undertraining
- I want to track team-wide compliance with nutrition goals
- I want to export reports for team meetings

## Design

### Dashboard Sections

#### 1. Summary Cards
Quick-glance metrics for the selected time period:
- Total training sessions
- Average session duration
- Total calories consumed (vs goal)
- Average hydration (vs goal)
- Number of PRs set

#### 2. Training Volume Chart
Line/area chart showing:
- Sessions per week
- Total training minutes per week
- Breakdown by session type

#### 3. Nutrition Trends
Stacked bar chart showing daily:
- Calories (actual vs goal)
- Protein intake
- Hydration levels

#### 4. PR Progression
Line chart showing weight/reps progression for selected exercises over time.

#### 5. Wellness Trends
Line chart showing:
- Mental state ratings over time
- Physical state ratings over time
- Correlation analysis

#### 6. Activity Calendar
Heatmap showing activity levels per day (similar to GitHub contribution graph).

### Time Range Selector
- Last 7 days
- Last 30 days
- Last 90 days
- Custom range

### Export Options
- Export as PDF report
- Export raw data as CSV

## Technical Implementation

### Data Aggregation
Create server-side aggregation queries to minimize data transfer:

```ts
// server/services/analytics.ts
export async function getTrainingMetrics(userId: string, dateRange: DateRange) {
  const sessions = await db.trainingSession.groupBy({
    by: ['type'],
    where: {
      userId,
      completedAt: {
        gte: dateRange.start,
        lte: dateRange.end,
      },
    },
    _count: true,
    _sum: {
      duration: true,
    },
  })

  return sessions
}
```

### Chart Components
Use Recharts for all visualizations:

```tsx
// components/charts/training-volume-chart.tsx
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export function TrainingVolumeChart({ data }: { data: WeeklyVolume[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="sessions" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
```

### API Endpoints

```
GET /api/analytics/training?from=2024-01-01&to=2024-01-31
GET /api/analytics/nutrition?from=2024-01-01&to=2024-01-31
GET /api/analytics/prs?exercise=bench-press&from=2024-01-01&to=2024-01-31
GET /api/analytics/wellness?from=2024-01-01&to=2024-01-31
GET /api/analytics/export?format=pdf&from=2024-01-01&to=2024-01-31
```

## UI Components Needed

- [ ] `DateRangePicker` - Select custom date ranges
- [ ] `TrainingVolumeChart` - Area chart for training volume
- [ ] `NutritionTrendsChart` - Stacked bar for nutrition
- [ ] `PRProgressionChart` - Line chart for PR tracking
- [ ] `WellnessChart` - Dual-axis line chart
- [ ] `ActivityCalendar` - Heatmap component
- [ ] `MetricCard` - Summary stat cards
- [ ] `ExportButton` - PDF/CSV export

## Dependencies

- `recharts` - Chart library
- `date-fns` - Date manipulation
- `@react-pdf/renderer` - PDF generation (for export)
- `papaparse` - CSV generation

## Testing

### Unit Tests
- Data aggregation functions
- Date range calculations
- Chart data transformations

### E2E Tests
- Navigate to analytics page
- Change date range and verify chart updates
- Export PDF and verify download

## Future Enhancements

- Compare with team averages
- Goal-based projections
- AI-powered insights ("You train more effectively on Tuesdays")
- Shareable reports
