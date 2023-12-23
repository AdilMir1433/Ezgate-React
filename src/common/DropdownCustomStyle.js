const dropdownCustomStyle = {
  control: (provided, state) => ({
    ...provided,
    borderColor: "#2b3553", // Border color
    background: "transparent", // Transparent background
    color: "white", // Text color
  }),
  menu: (provided) => ({
    ...provided,
    borderColor: "#2b3553", // Border color for the dropdown list
    background: "#2b3553", // Background color for the dropdown list
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused ? "#475566" : "transparent", // Background color on focus
    color: "white", // Text color for options
    borderColor: state.isFocused ? "#e14eca" : "#2b3553", // Border color on focus and hover
    ":hover": {
      background: "#475566", // Background color on hover
      color: "white", // Text color on hover
      borderColor: "#e14eca", // Border color on hover
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white", // Text color for the selected option in the dropdown menu
  }),
  input: (provided) => ({
    ...provided,
    color: "white", // Text color for the search input
  }),
};

export { dropdownCustomStyle };
