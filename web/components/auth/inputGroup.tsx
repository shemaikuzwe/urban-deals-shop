import { Input } from "../ui/input";

export default function InputGroup({
  type,
  placeholder,
  label,
  aria,
  Inputvalue,
  readonly,
}: {
  type: string;
  placeholder?: string;
  label: string;
  aria?: string;
  Inputvalue?: string | number;
  readonly?: boolean;
}) {
  return (
    <>
      <label htmlFor={label} className={"capitalize mt-5"}>
        {label}
      </label>
      <Input
        readOnly={readonly}
        type={type}
        placeholder={placeholder}
        name={label}
        aria-describedby={aria}
        defaultValue={Inputvalue}
      />
    </>
  );
}
