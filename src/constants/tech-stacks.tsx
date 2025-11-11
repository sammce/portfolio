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
import PytestOriginal from "devicons-react/icons/PytestOriginal";
import GitlabOriginal from "devicons-react/icons/GitlabOriginal";
import PandasOriginal from "devicons-react/icons/PandasOriginal";
import HtmxOriginal from "devicons-react/icons/HtmxOriginal";
import NginxOriginal from "devicons-react/icons/NginxOriginal";
import TerraformOriginal from "devicons-react/icons/TerraformOriginal";

export const technologies = {
  HTML: Html5Original,
  CSS: Css3Original,
  TypeScript: TypescriptOriginal,
  Bash: BashOriginal,
  "C-Lang": COriginal,
  Python: PythonOriginal,
  Lua: LuaOriginal,
  React: ReactOriginal,
  NextJS: NextjsOriginal,
  TailwindCSS: TailwindcssOriginal,
  Django: DjangoPlain,
  "Django-Rest": DjangorestOriginal,
  PostgreSQL: PostgresqlOriginal,
  AWS: AmazonwebservicesOriginalWordmark,
  Linux: LinuxOriginal,
  Docker: DockerOriginal,
  Flask: FlaskOriginal,
  Pytest: PytestOriginal,
  "Gitlab-CI": GitlabOriginal,
  Pandas: PandasOriginal,
  HTMX: HtmxOriginal,
  Nginx: NginxOriginal,
  Terraform: TerraformOriginal,
};

export type Technology = keyof typeof technologies;
