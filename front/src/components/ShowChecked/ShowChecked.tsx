export default function ShowChecked({
  text,
  checker
}: {
  text: string;
  checker: boolean;
}) {
  return (
    <>
      {text}
      {checker ? (
        <div>
          <input type="checkbox" checked disabled />
        </div>
      ) : (
        <div>
          <input type="checkbox" disabled />
        </div>
      )}
    </>
  );
}
