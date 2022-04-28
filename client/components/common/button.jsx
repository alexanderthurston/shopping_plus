export const Button = ({ children, classAdditions, del, ...other }) => {
  return (
    <button
      className={
        (del ? 'bg-red-700' : 'bg-gray-600') +
        ' m-2 pt-2 pb-2 pr-4 pl-4 rounded-lg font-bold text-white' +
        classAdditions
      }
      {...other}
    >
      {children}
    </button>
  );
};
