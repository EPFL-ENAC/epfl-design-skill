// EPFL brand → Vuetify 3 theme.
// Vuetify themes require literal color values, so this is a brand-source mapping
// (the linter exempts theme recipe files). Each value mirrors a token in
// tokens/colors_and_type.css — keep them in sync if a brand color ever changes.

export const epflColors = {
  primary: '#FF0000',      // --epfl-red / --primary
  secondary: '#007480',    // --epfl-canard / --tertiary
  accent: '#00A79F',       // --epfl-leman
  error: '#FF0000',        // --danger (red doubles as danger)
  info: '#4A90E2',         // --epfl-blue / --info
  success: '#7ED321',      // --epfl-green / --success
  warning: '#F5A623',      // --epfl-orange / --warning
  background: '#FFFFFF',    // --bg
  surface: '#FFFFFF',       // --bg
  'on-primary': '#FFFFFF',  // --on-primary
  'on-surface': '#212121',  // --fg
}

export const epflTheme = {
  dark: false,
  colors: epflColors,
}

// Drop straight into createVuetify({ theme: epflVuetifyTheme })
export const epflVuetifyTheme = {
  defaultTheme: 'epfl',
  themes: { epfl: epflTheme },
}

export default epflVuetifyTheme
