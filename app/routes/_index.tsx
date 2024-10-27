import type { MetaFunction } from "@remix-run/node";
import Container from "~/components/Container";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <Container className={'items-center justify-center'}>
      <span>Compress, convert, resize and flip your image</span>
    </Container>
  );
}

