export const getErrorMessages = (errors: any): string[] => {
  return Object.values(errors)
    .map((err: any) => {
      if (err?.message) return err.message;

      // support field lồng (useFieldArray, object)
      if (typeof err === "object") {
        return Object.values(err)
          .map((e: any) => e?.message)
          .filter(Boolean);
      }

      return null;
    })
    .flat()
    .filter(Boolean);
};
