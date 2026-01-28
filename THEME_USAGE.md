# Coffee Shop Theme Usage Guide

## Theme Constants

All Coffee Shop colors are centralized in `app/constants/theme.ts`

### Available Colors

```typescript
import { COFFEE_PALETTE } from "./constants/theme";

COFFEE_PALETTE.primary        // #6F4E37 (Coffee Brown)
COFFEE_PALETTE.secondary      // #C7A17A (Latte)
COFFEE_PALETTE.background     // #F5F5DC (Cream/Beige)
COFFEE_PALETTE.cardBg         // #FFFFFF (White)
COFFEE_PALETTE.success        // #2E7D32 (Dark Green)
COFFEE_PALETTE.error          // #C62828 (Dark Red)
COFFEE_PALETTE.warning        // #F57C00 (Orange)
COFFEE_PALETTE.textPrimary    // #3E2723 (Dark Brown)
COFFEE_PALETTE.textSecondary  // #795548 (Medium Brown)
COFFEE_PALETTE.border         // #D7CCC8 (Light Brown)
COFFEE_PALETTE.warningBg      // #FFF8E1 (Warning Background)
```

## Usage Examples

### Basic Text Color

```tsx
import { COFFEE_PALETTE } from "../constants/theme";

<p style={{ color: COFFEE_PALETTE.textSecondary }}>
  This is secondary text
</p>
```

### Card with Border

```tsx
<div 
  className="p-6 rounded-lg border" 
  style={{ 
    backgroundColor: COFFEE_PALETTE.cardBg, 
    borderColor: COFFEE_PALETTE.border 
  }}
>
  Card content
</div>
```

### Status Indicators

```tsx
<div 
  className="w-2 h-2 rounded-full" 
  style={{ 
    backgroundColor: isOnline ? COFFEE_PALETTE.success : COFFEE_PALETTE.error 
  }}
/>
```

### Buttons

```tsx
// Primary Button
<button
  className="px-6 py-2 rounded-md font-medium text-white"
  style={{ backgroundColor: COFFEE_PALETTE.primary }}
>
  Save
</button>

// Secondary Button
<button
  className="px-6 py-2 rounded-md font-medium border"
  style={{ 
    borderColor: COFFEE_PALETTE.primary,
    color: COFFEE_PALETTE.primary,
    backgroundColor: 'transparent'
  }}
>
  Cancel
</button>
```

### Warning/Alert Box

```tsx
<div 
  className="p-4 rounded-lg border" 
  style={{ 
    backgroundColor: COFFEE_PALETTE.warningBg, 
    borderColor: COFFEE_PALETTE.warning 
  }}
>
  <div style={{ backgroundColor: COFFEE_PALETTE.warning }}>⚠️</div>
  <p style={{ color: COFFEE_PALETTE.textPrimary }}>Warning message</p>
</div>
```

## Benefits

✅ **Consistency** - All colors in one place
✅ **Maintainability** - Easy to update theme across entire app
✅ **Type Safety** - TypeScript ensures correct usage
✅ **No Magic Strings** - No hardcoded hex values scattered in code
✅ **Readability** - `COFFEE_PALETTE.primary` is clearer than `#6F4E37`

## Updated Files

- ✅ `app/constants/theme.ts` - Theme constants
- ✅ `app/components/SideBar.tsx` - Navigation using constants
- ✅ `app/dashboard/page.tsx` - Dashboard using constants
- ✅ `app/setup/page.tsx` - Setup page using constants
- ✅ `app/layout.tsx` - Root layout with background color
- ✅ `app/globals.css` - CSS variables for theme colors
