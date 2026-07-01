/**
 * Reusable card component for displaying content
 */
interface CardProps {
  children: React.ReactNode;
  className?: string;
  shadow?: "sm" | "md" | "lg";
}

const shadowMap = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

export function Card({
  children,
  className = "",
  shadow = "sm",
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-8 ${shadowMap[shadow]} transition hover:shadow-md ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Reusable section heading
 */
interface SectionHeadingProps {
  tag?: "h1" | "h2" | "h3";
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  tag: Tag = "h2",
  eyebrow,
  title,
  description,
  centered = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : ""}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">
          {eyebrow}
        </p>
      )}
      <Tag
        className={`${eyebrow ? "mt-4" : ""} text-4xl font-bold text-green-700 sm:text-5xl ${className}`}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={`${eyebrow || title ? "mt-6" : ""} text-lg text-gray-600`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/**
 * Reusable stat grid item
 */
interface StatItemProps {
  value: string;
  label: string;
}

export function StatItem({ value, label }: StatItemProps) {
  return (
    <article className="py-2 text-center">
      <dl>
        <dt className="sr-only">{label}</dt>
        <dd className="text-4xl font-bold sm:text-5xl">{value}</dd>
        <dt className="mt-2 text-base sm:text-lg">{label}</dt>
      </dl>
    </article>
  );
}

/**
 * Reusable article card
 */
interface ArticleCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function ArticleCard({
  children,
  className = "",
  hoverable = true,
}: ArticleCardProps) {
  return (
    <article
      className={`rounded-xl bg-white p-6 shadow-md ${
        hoverable ? "transition hover:shadow-lg" : ""
      } ${className}`}
    >
      {children}
    </article>
  );
}
