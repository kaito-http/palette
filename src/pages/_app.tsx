import { AppProps } from "next/dist/next-server/lib/router/router";

export default function App(props: AppProps) {
  return <props.Component />;
}
