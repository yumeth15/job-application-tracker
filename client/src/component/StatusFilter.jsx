function StatusFilter({ value, onChange }) {
  return (
    <select
      className="status-filter"
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
    >
      <option value="All">All Statuses</option>
      <option value="Applied">Applied</option>
      <option value="Interview">Interview</option>
      <option value="Rejected">Rejected</option>
      <option value="Offer">Offer</option>
    </select>
  );
}

export default StatusFilter;