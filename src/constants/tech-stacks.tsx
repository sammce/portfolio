import {
  Html5Original,
  ReactOriginal,
  Css3Original,
  TypescriptOriginal,
  COriginal,
  PythonOriginal,
  LuaOriginal,
  NextjsOriginal,
  PostgresqlOriginal,
  TailwindcssOriginal,
  DjangoPlain,
  DjangorestOriginal,
  AmazonwebservicesOriginalWordmark,
  LinuxOriginal,
  DockerOriginal,
  BashOriginal,
  FlaskOriginal,
} from "devicons-react";

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
