import { library } from '@fortawesome/fontawesome-svg-core';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
// Add icons to the library
library.add(faSun, faMoon);

// Optional: Configure Font Awesome

// This prevents Font Awesome from adding its CSS since we're doing it manually
config.autoAddCss = false;