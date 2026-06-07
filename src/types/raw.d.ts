// Allow importing files with Vite's `?raw` suffix as strings
declare module '*?raw' {
  const content: string;
  export default content;
}

export {};
