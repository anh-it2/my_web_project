import RHFTextArea from "@/components/form/RHFTextArea";
import CancelButton from "@/components/shared/Button/FormHeader/CancelButton";
import DangerButton from "@/components/shared/Button/FormHeader/DangerButton";
import { Card } from "antd";
import { useFieldArray } from "react-hook-form";

export default function StatementStep() {
  const { fields, append, remove } = useFieldArray({ name: "samples" });

  return (
    <div className="space-y-4">
      <RHFTextArea
        name="statement"
        rows={8}
        placeholder="Markdown + LaTeX supported"
      />

      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Sample IO</h3>
        <CancelButton
          title="Add Sample"
          onClick={() => append({ input: "", output: "" })}
        />
      </div>

      {fields.map((f, i) => (
        <Card key={f.id} size="small" className="space-y-2">
          <RHFTextArea
            name={`samples.${i}.input`}
            rows={3}
            placeholder="Enter your sample input"
            label="Sample Input"
          />

          <RHFTextArea
            name={`samples.${i}.output`}
            rows={3}
            placeholder="Enter your sample output"
            label="Sample Output"
          />
          <DangerButton title="Remove" onClick={() => remove(i)} />
        </Card>
      ))}
    </div>
  );
}
