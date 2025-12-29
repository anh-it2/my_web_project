# Edit Page Rule

## structure for edit page
src\app\[locale]\manager\edit-problem

when create edit page, you have to separate this into 2 files:

1. page.tsx
2. components\EditForm.tsx

in the page.tsx, you will fetch data and only have data from backend pass to EditForm.tsx

in the EditForm.tsx, you will use the data to initialize the form and handle the form submission

### EditForm.tsx

use data from page.tsx to initialize the form. Place this into defaultValues and not using useEffect to set defaultValues

this is the before code: 

```tsx
const methods = useForm<EditProblemFormValues>({
    resolver: zodResolver(editProblemFormSchema),
    defaultValues: {
      title: "",
      problemCode: "",
      difficultyLevel: "",
      active: false,
      timeLimit: 0,
      memoryLimit: 0,
      description: "",
      constraints: "",
      testCases: [],
    },
  });

useEffect(() => {
    if (!problemDetail || !testCases || initializedRef.current) return;

    reset({
      title: problemDetail.title,
      problemCode: problemDetail.problemCode,
      difficultyLevel: problemDetail.difficultyLevel,
      active: problemDetail.active,
      timeLimit: problemDetail.timeLimit,
      memoryLimit: problemDetail.memoryLimit,
      description: problemDetail.description,
      constraints: problemDetail.constraints,
      testCases: testCases || [],
    });

    initializedRef.current = true;
  }, [problemDetail, testCases, reset]);
```

this is the after code:

```tsx
const methods = useForm<EditProblemFormValues>({
    resolver: zodResolver(editProblemFormSchema),
    defaultValues: {
      title: problemDetail.title,
      problemCode: problemDetail.problemCode,
      difficultyLevel: problemDetail.difficultyLevel,
      active: problemDetail.active,
      timeLimit: problemDetail.timeLimit,
      memoryLimit: problemDetail.memoryLimit,
      description: problemDetail.description,
      constraints: problemDetail.constraints,
      testCases: testCases || [],
    },
  });
```