# API Rule

## Get jwtToken from cookies

```ts
const jwtToken = request.cookies.get("jwtToken");
```

## Calling api alway using try catch to catch error for fixing bug

### Example for delete api
```ts
try {
    const res = await axios.delete(`${link}/${id}`, {
        headers: {
            Authorization: `Bearer ${jwtToken?.value}`,
        },
    });

    return NextResponse.json(res.data, { status: 200 });
} catch (error) {
    return NextResponse.json(
        { message: `Have an error: ${error}` },
        { status: 500 }
    );
}
```

