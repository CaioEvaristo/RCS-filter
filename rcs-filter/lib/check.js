
export const checkNumbers = async () => {
    const response = await fetch(`${process.env.RCS_FILTER}/check/single`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        console.log(response, 'if')
      } else {
        console.log(response, 'else')
      }
}