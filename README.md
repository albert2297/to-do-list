
# 📋 To-Do List App - Happy Mood & Draggable

This project is a To-Do List application built with **React**, **TypeScript**, and **Vite**. It features a cheerful user interface and drag-and-drop functionality, all configured for a fast and optimized development environment.

## 🚀 Technologies

- **React + TypeScript + Vite**: Minimal setup with Hot Module Replacement (HMR) and basic ESLint rules.
- **Modular CSS**: Isolated component styles for easy maintenance and modification.
- **pnpm**: Fast and efficient package manager.
- **Docker**: Dockerfile configured for consistent build and deployment across environments.

## 📦 Installation and Usage

### Requirements

- **Node.js** and **pnpm** installed.
- **Docker** (optional for deployment).

### Steps to Clone and Start the Project

1. **Clone the repository:**

   ```bash
   git clone <repository URL>
   cd project-name
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Start in development mode:**

   ```bash
   pnpm dev
   ```

4. **Build for production:**

   ```bash
   pnpm build
   ```

5. **Run with Docker:**

   ```bash
   docker build -t todo-list-app .
   docker run -p 3000:80 --name todo-list-app todo-list-app
   ```

## 🔍 ESLint Configuration

If you are developing a production application, we recommend expanding the ESLint configuration to enable type-aware lint rules:

1. Configure the top-level `parserOptions` property as follows:

   ```javascript
   export default tseslint.config({
     languageOptions: {
       parserOptions: {
         project: ['./tsconfig.node.json', './tsconfig.app.json'],
         tsconfigRootDir: import.meta.dirname,
       },
     },
   })
   ```

2. Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`.

3. Optionally add `...tseslint.configs.stylisticTypeChecked`.

### Configuring `eslint-plugin-react`

To enhance React-specific ESLint rules, install the `eslint-plugin-react` plugin:

```bash
pnpm add eslint-plugin-react -D
```

Update the `eslint.config.js` file:

```javascript
import react from 'eslint-plugin-react'

export default tseslint.config({
  settings: { react: { version: '18.3' } },
  plugins: {
    react,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## 🌟 Features

- **Cheerful Interface**: Designed with a positive aesthetic to improve the user experience.
- **Drag and Drop**: Implemented with `@dnd-kit`, allowing intuitive task reordering.
- **Performance**: Optimized with SWC and pnpm for a smooth experience.

## 🤝 Contributions

Contributions are welcome! If you have suggestions or improvements, feel free to open a Pull Request.

## 🎨 Design

The design for this project is available on Figma: [View on Figma](https://www.figma.com/design/5nR30iRqIJycJPiSCns2jb/To-do-List?node-id=0-1&t=D2FnCPxuyarAZwEE-1)

## 🌐 Test the Project

You can try out the application here: [Test the To-Do List App](https://to-do-list-with-mood.netlify.app/)
