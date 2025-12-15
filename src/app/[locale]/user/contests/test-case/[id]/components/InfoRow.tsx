export default function InfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="font-medium text-gray-600">{label}</div>
      <div>{children}</div>
    </div>
  );
}
