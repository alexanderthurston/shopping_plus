export const Item = ({ item }) => {
  return <div key={item.id}>{item.name}</div>;
};
