// This monstrosity is the way it is because devicons-react
// does not tree-shake properly. Without it, bundle size
// for these icons was ~3MB
import React from "devicons-react/icons/ReactOriginal";
import Typescript from "devicons-react/icons/TypescriptOriginal";
import C from "devicons-react/icons/COriginal";
import Python from "devicons-react/icons/PythonOriginal";
import Lua from "devicons-react/icons/LuaOriginal";
import Nextjs from "devicons-react/icons/NextjsOriginal";
import Postgresql from "devicons-react/icons/PostgresqlOriginal";
import Tailwindcss from "devicons-react/icons/TailwindcssOriginal";
import DjangoPlain from "devicons-react/icons/DjangoPlain";
import AmazonwebservicesWordmark from "devicons-react/icons/AmazonwebservicesOriginalWordmark";
import Linux from "devicons-react/icons/LinuxOriginal";
import Docker from "devicons-react/icons/DockerOriginal";
import Bash from "devicons-react/icons/BashOriginal";
import Flask from "devicons-react/icons/FlaskOriginal";
import Pytest from "devicons-react/icons/PytestOriginal";
import Gitlab from "devicons-react/icons/GitlabOriginal";
import Pandas from "devicons-react/icons/PandasOriginal";
import Htmx from "devicons-react/icons/HtmxOriginal";
import Nginx from "devicons-react/icons/NginxOriginal";
import Terraform from "devicons-react/icons/TerraformOriginal";
import Javascript from "devicons-react/icons/JavascriptOriginal";
import Pytorch from "devicons-react/icons/PytorchOriginal";
import Sass from "devicons-react/icons/SassOriginal";
import HTML5 from "devicons-react/icons/Html5Original";
import CSS3 from "devicons-react/icons/Css3Original";
import Google from "devicons-react/icons/GoogleOriginal";
import Cypress from "devicons-react/icons/CypressioOriginal";
import Jest from "devicons-react/icons/JestPlain";
import Github from "devicons-react/icons/GithubOriginal";
import Mui from "devicons-react/icons/MaterialuiOriginal";

export const technologies = {
  TypeScript: Typescript,
  Python: Python,
  React: React,
  NextJS: Nextjs,
  Django: DjangoPlain,
  JavaScript: Javascript,
  Docker: Docker,
  Nginx: Nginx,
  Linux: Linux,
  PostgreSQL: Postgresql,
  TailwindCSS: Tailwindcss,
  ["Material UI"]: Mui,
  HTML: HTML5,
  CSS: CSS3,
  SCSS: Sass,
  Pandas: Pandas,
  Lua: Lua,
  Cypress: Cypress,
  Jest: Jest,
  "C Lang": C,
  Bash: Bash,
  AWS: AmazonwebservicesWordmark,
  Flask: Flask,
  Pytest: Pytest,
  "Gitlab CI": Gitlab,
  "Github CI": Github,
  HTMX: Htmx,
  Terraform: Terraform,
  PyTorch: Pytorch,
  ["Google OAuth"]: Google,
};

export type Technology = keyof typeof technologies;
