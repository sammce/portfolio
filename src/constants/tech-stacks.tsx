// This monstrosity is the way it is because devicons-react
// does not tree-shake properly. Without it, bundle size
// for these icons was ~3MB
import Html5Original from "devicons-react/icons/Html5Original";
import ReactOriginal from "devicons-react/icons/ReactOriginal";
import Css3Original from "devicons-react/icons/Css3Original";
import TypescriptOriginal from "devicons-react/icons/TypescriptOriginal";
import COriginal from "devicons-react/icons/COriginal";
import PythonOriginal from "devicons-react/icons/PythonOriginal";
import LuaOriginal from "devicons-react/icons/LuaOriginal";
import NextjsOriginal from "devicons-react/icons/NextjsOriginal";
import PostgresqlOriginal from "devicons-react/icons/PostgresqlOriginal";
import TailwindcssOriginal from "devicons-react/icons/TailwindcssOriginal";
import DjangoPlain from "devicons-react/icons/DjangoPlain";
import DjangorestOriginal from "devicons-react/icons/DjangorestOriginal";
import AmazonwebservicesOriginalWordmark from "devicons-react/icons/AmazonwebservicesOriginalWordmark";
import LinuxOriginal from "devicons-react/icons/LinuxOriginal";
import DockerOriginal from "devicons-react/icons/DockerOriginal";
import BashOriginal from "devicons-react/icons/BashOriginal";
import FlaskOriginal from "devicons-react/icons/FlaskOriginal";

export const technologies = {
  HTML: {
    icon: Html5Original,
  },
  CSS: {
    icon: Css3Original,
  },
  TypeScript: {
    icon: TypescriptOriginal,
  },
  Bash: {
    icon: BashOriginal,
  },
  "C-Lang": {
    icon: COriginal,
  },
  Python: {
    icon: PythonOriginal,
  },
  Lua: {
    icon: LuaOriginal,
  },
  React: {
    icon: ReactOriginal,
  },
  NextJS: {
    icon: NextjsOriginal,
  },
  TailwindCSS: {
    icon: TailwindcssOriginal,
  },
  Django: {
    icon: DjangoPlain,
  },
  "Django REST": {
    icon: DjangorestOriginal,
  },
  PostgreSQL: {
    icon: PostgresqlOriginal,
  },
  AWS: {
    icon: AmazonwebservicesOriginalWordmark,
  },
  Linux: {
    icon: LinuxOriginal,
  },
  Docker: {
    icon: DockerOriginal,
  },
  Flask: {
    icon: FlaskOriginal,
  },
};

export type Technology = keyof typeof technologies;
