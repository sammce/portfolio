// This monstrosity is the way it is because devicons-react
// does not tree-shake properly. Without it, bundle size
// for these icons was ~3MB
import ReactOriginal from "devicons-react/icons/ReactOriginal";
import TypescriptOriginal from "devicons-react/icons/TypescriptOriginal";
import COriginal from "devicons-react/icons/COriginal";
import PythonOriginal from "devicons-react/icons/PythonOriginal";
import LuaOriginal from "devicons-react/icons/LuaOriginal";
import NextjsOriginal from "devicons-react/icons/NextjsOriginal";
import PostgresqlOriginal from "devicons-react/icons/PostgresqlOriginal";
import TailwindcssOriginal from "devicons-react/icons/TailwindcssOriginal";
import DjangoPlain from "devicons-react/icons/DjangoPlain";
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
import JavascriptOriginal from "devicons-react/icons/JavascriptOriginal";
import PytorchOriginal from "devicons-react/icons/PytorchOriginal";
import SassOriginal from "devicons-react/icons/SassOriginal";
import HTML5Original from "devicons-react/icons/Html5Original";
import CSS3Original from "devicons-react/icons/Css3Original";
import GoogleOriginal from "devicons-react/icons/GoogleOriginal";

export const technologies = {
  TypeScript: TypescriptOriginal,
  Python: PythonOriginal,
  React: ReactOriginal,
  NextJS: NextjsOriginal,
  Django: DjangoPlain,
  JavaScript: JavascriptOriginal,
  Docker: DockerOriginal,
  Nginx: NginxOriginal,
  Linux: LinuxOriginal,
  TailwindCSS: TailwindcssOriginal,
  HTML: HTML5Original,
  CSS: CSS3Original,
  SCSS: SassOriginal,
  Lua: LuaOriginal,
  "C-Lang": COriginal,
  Bash: BashOriginal,
  PostgreSQL: PostgresqlOriginal,
  AWS: AmazonwebservicesOriginalWordmark,
  Flask: FlaskOriginal,
  Pytest: PytestOriginal,
  "Gitlab-CI": GitlabOriginal,
  Pandas: PandasOriginal,
  HTMX: HtmxOriginal,
  Terraform: TerraformOriginal,
  PyTorch: PytorchOriginal,
  ["Google OAUTH"]: GoogleOriginal,
};

export type Technology = keyof typeof technologies;
