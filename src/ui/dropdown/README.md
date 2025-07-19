# Dropdown Component

A reusable dropdown menu component built with Headless UI and Heroicons for React.

## Features
- Customizable label for the dropdown button
- Accepts an array of options (label and URL)
- Uses Headless UI for accessibility and transitions

## Props

| Name    | Type                       | Description                        |
| ------- | -------------------------- | ---------------------------------- |
| label   | `string`                   | The label for the dropdown button. |
| options | `{ label: string, url: string }[]` | Array of dropdown options. Each option has a label and a URL to redirect to. |

## Usage

```
import Dropdown from './Dropdowm'

const options = [
  { label: 'Account settings', url: '/account' },
  { label: 'Support', url: '/support' },
  { label: 'License', url: '/license' },
]

<Dropdown label="Options" options={options} />
```

## Example

```
<Dropdown
  label="Menu"
  options={[
    { label: 'Profile', url: '/profile' },
    { label: 'Settings', url: '/settings' },
    { label: 'Logout', url: '/logout' },
  ]}
/>
```

## Dependencies
- [@headlessui/react](https://headlessui.dev/react/menu)
- [@heroicons/react](https://github.com/tailwindlabs/heroicons)

--- 