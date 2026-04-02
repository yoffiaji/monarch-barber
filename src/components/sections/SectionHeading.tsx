interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  center = true,
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-widest uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm text-gray-500 tracking-wide">{subtitle}</p>
      )}
    </div>
  );
}