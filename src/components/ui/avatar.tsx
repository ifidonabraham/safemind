type AvatarProps = {
  alias: string;
  label?: string;
};

export function Avatar({ alias, label }: AvatarProps) {
  const initials = alias.trim().slice(0, 2).toUpperCase();

  return (
    <span
      className="inline-flex size-11 items-center justify-center rounded-full bg-primary-soft text-sm font-medium text-ink"
      aria-label={label ?? alias}
      title={label ?? alias}
    >
      <span aria-hidden="true">{initials || "?"}</span>
    </span>
  );
}
