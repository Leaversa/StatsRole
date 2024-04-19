import useFetchData from "./hooks/useFetchData";

const MyComponent = () => {
  const { data, loading, error } = useFetchData("http://127.0.0.1:5000/prompt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key1: "value1",
      key2: "value2",
    }),
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default MyComponent;
