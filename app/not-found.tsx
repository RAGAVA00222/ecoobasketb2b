import { Container, Eyebrow, Button } from "@/components/primitives";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <section className="bg-base">
      <Container className="flex min-h-[60vh] flex-col justify-center py-20">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-4 text-[clamp(30px,5vw,52px)]">This page took a wrong turn on the route.</h1>
        <p className="mt-5 max-w-[560px] text-muted">
          The page you&apos;re looking for isn&apos;t here. Head back to the start, or reach us directly — we actually reply.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" variant="primary">Back to home</Button>
          <Button href="/contact" variant="outline">Contact us</Button>
          <Button href={site.orderUrl} external variant="green">Order Now →</Button>
        </div>
      </Container>
    </section>
  );
}
