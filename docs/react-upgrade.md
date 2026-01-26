# Next.js 16 and React 19 Upgrade Guide

This document records the steps taken to modernize the portfolio repository to Next.js 16 and React 19, including dependency reconciliation and configuration adjustments.1. 

## 1. Automated Migration CLI
The upgrade was initiated using the official Next.js automated lifecycle tool to update core packages and apply basic code transformations. 
```
npx @next/codemod@canary upgrade latest
```

## 2. ESLint 9 & Flat Config Migration
Next.js 16 mandates ESLint 9 or higher, as eslint-config-next no longer supports the legacy ESLint 8 engine. 

<strong>Upgrade Commands</strong>
```bash
# Update ESLint packages
npm install --save-dev eslint@latest eslint-config-next@latest

# Convert legacy.eslintrc to new Flat Config (eslint.config.mjs)
npx @next/codemod@canary next-lint-to-eslint-cli
```

<i>Note: ESLint 9 introduced a "Flat Config" system that replaces the old .eslintrc JSON/JS format.</i>

## 3. Dependency Reconciliation (React 19 Overrides)

To prevent "Dependency Hell" where legacy libraries (like react-slick) attempt to install React 18 as a transitive dependency, explicit overrides were added to the package.json.Required OverridesAdd the following to your package.json to force the entire dependency tree to use React 19 logic:

```JSON
"overrides": {
  "react": "19.2.3",
  "react-dom": "19.2.3",
  "@types/react": "19.2.9",
  "@types/react-dom": "19.2.3",
  "react-is": "^19.0.0"
}
```
<i>react-is</i> is included because many UI libraries use it internally to identify React elements, and version 19 is required for compatibility. 

## 4. JSX Transform ConfigurationThe 
TypeScript configuration (tsconfig.json) was updated to use the Automatic JSX Transform.
- <strong>Change:</strong> `"jsx": "preserve" > "jsx": "react-jsx"`
- <strong>Rationale:</strong> React 19 features, such as passing ref as a prop and modern memoization, require the react-jsx runtime.
- <strong>Developer Impact:</strong> You no longer need to import React from 'react' at the top of every file just to use JSX tags.

## 5. Clean Reinstallation
To resolve peer dependency warnings and clear corrupted build artifacts, a "nuclear" clean was performed.
```Bash
# Remove build artifacts and modules
rm -rf.next node_modules package-lock.json

# Reinstall with legacy flag to bypass remaining peer metadata conflicts
npm install --legacy-peer-deps
```

## 6. Library Specific Fixes
<strong>React Slick Slider</strong>
react-slick may throw type errors in React 19 (e.g., "Slider cannot be used as a JSX component") because it expects legacy refs or due to depedency with react version.

<i>Updates:</i>
```
"react-slick": "^0.31.0"
```

<strong>Vercel blob</strong>
This had vulnerabilities which was resolved by upgrading the package version.

<i>Updates:</i>
```
"@vercel/blob": "^2.0.1",
```

## 7. Verification
Run the following command to ensure only one version of React is present in the environment: 
```Bash
npm ls react
```
The output should show react@19.2.3 across all branches of the dependency tree.