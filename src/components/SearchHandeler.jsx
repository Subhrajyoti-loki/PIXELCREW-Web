import React, { useState, useEffect } from "react";

const SearchableContainer = ({ searchQuery, children }) => {
  const [content, setContent] = useState(children);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const regex = new RegExp(`(${searchQuery})`, "gi");
      const newContent = React.Children.map(children, (child) => {
        if (typeof child === "string") {
          return child.split(regex).map((part, index) => (
            <span
              key={index}
              style={part.toLowerCase() === searchQuery.toLowerCase() ? { backgroundColor: "yellow" } : {}}
            >
              {part}
            </span>
          ));
        } else if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            children: React.Children.map(child.props.children, (grandchild) => {
              if (typeof grandchild === "string") {
                return grandchild.split(regex).map((part, index) => (
                  <span
                    key={index}
                    style={part.toLowerCase() === searchQuery.toLowerCase() ? { backgroundColor: "yellow" } : {}}
                  >
                    {part}
                  </span>
                ));
              }
              return grandchild;
            }),
          });
        }
        return child;
      });
      setContent(newContent);
    } else {
      setContent(children);
    }
  }, [searchQuery, children]);

  return <div>{content}</div>;
};

export default SearchableContainer;
