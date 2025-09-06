const resetMutation = (e, mutation) => {
  if(e) {
    const fieldName = e.target.name;
    if (mutation.isError) {
      if (mutation.error.response.data.errors?.[fieldName].message) {
        mutation.reset();
      }
    }
  } else {
    mutation.reset();
  }
};

export default resetMutation;