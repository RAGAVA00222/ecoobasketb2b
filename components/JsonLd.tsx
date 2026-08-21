import { Thing, WithContext } from "schema-dts";

export function JsonLd<T extends Thing>({ data }: { data: WithContext<T> }) {
  // Escaping "<" prevents a value containing "</script>" from breaking out of
  // the tag. All current inputs are static constants, but this keeps the
  // component safe if it is ever handed dynamic content.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}