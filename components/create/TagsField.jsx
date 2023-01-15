import { useState, useEffect } from "react";
import Tag from "./Tag";

const TagsField = ({ name, maxCount, desc, placeholder, setValues, tags }) => {
	const [count, setCount] = useState(maxCount);
	const [allowInput, setAllowInput] = useState(true);
	const [isFocused, setIsFocused] = useState(false);
	const [tag, setTag] = useState("");

   useEffect(() => {
      setCount(maxCount - tags.length);

      if (tags.length == maxCount) {
         setAllowInput(false);
      } else {
         setAllowInput(true);
      }
   }, [tags]);

	const handleKeyDown = (e) => {
		if ((e.keyCode === 13 || e.keyCode === 9) && tag) {
         // If enter or tab and tag string is not empty
         e.preventDefault();

         setTag("");
			setValues((prev) => ({
				...prev,
				[name]: [...tags, tag],
			}));
		} else if (e.keyCode == 8 && tags.length && !tag) {
         // Else if backspace (delete) and there is at least one item in tags and tag is an empty string
         setValues((prev) => ({
				...prev,
				[name]: tags.slice(0, -1),
			}));
      } else if (e.keyCode <= 222 && e.keyCode >= 48 && !e.metaKey && !allowInput) {
			e.preventDefault();
		}
	};

	const handleChange = (e) => {
      const { value } = e.target;
      setTag(value.trim());
   };

	return (
		<div className="mt-6 w-full">
			<div
				className={`relative flex gap-2 flex-wrap w-full focus:outline-none after:absolute after:w-full after:h-[1px] after:bg-black/30 after:bottom-0 after:left-0 pb-2.5 ${
					isFocused ? "after:h-[2px] after:bg-blueish" : ""
				}`}
			>
            {tags.map((tag, idx) => (
               <Tag tag={tag} key={idx} />
            ))}
            
				<input
					type="text"
               name="tags"
					className="outline-none flex-1 min-w-[120px]"
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					placeholder={!tags.length ? placeholder : allowInput ? "Add more tags" : ""}
					onKeyDown={handleKeyDown}
					onChange={handleChange}
               value={tag}
				/>
			</div>

			<div
				className={`flex justify-between text-xs opacity-0 ${
					isFocused ? "opacity-100" : ""
				} mt-[2px] text-dark-gray`}
			>
				<span className="leading-[18px]">{desc}</span>
				<span className="w-6 text-right leading-[18px]">{count}</span>
			</div>
		</div>
	);
};

export default TagsField;
