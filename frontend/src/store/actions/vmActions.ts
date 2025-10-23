export const fetchVMs = async () => {
  const res = await fetch('http://localhost:4000/mock/vm');
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};
