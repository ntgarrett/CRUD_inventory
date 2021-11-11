import filterStyles from "../styles/GlobalFilter.module.css";

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span className={filterStyles.container}>
      Search:{" "} 
      <input 
        className={filterStyles.text}
        value={filter || ""}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
    </span>
  )
}
