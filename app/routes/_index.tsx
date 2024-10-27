import type { MetaFunction } from "@remix-run/node";
import Container from "~/components/Container";

export const meta: MetaFunction = () => {
  return [
    { title: "OptimaPic - Home" },
    { name: "description", content: "OptimaPic - Compress, convert, resize and flip your image" },
  ];
};

export default function Index() {
  return (
    <Container className={'items-center justify-center'}>
      <span>Compress, convert, resize and flip your image</span>
    </Container>
  );
}

