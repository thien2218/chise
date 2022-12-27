import { useLayoutEffect, useState, useRef } from "react";
import Masonry from "react-masonry-css";
import Pin from "../common/Pin";

const MasonryLayout = ({ pins }) => {
	const masonryRef = useRef(null);
	const [width, setWidth] = useState(0);

	useLayoutEffect(() => {
		const updateWidth = () => setWidth(masonryRef.current.offsetWidth);
		window.addEventListener("resize", updateWidth);
		updateWidth();
		return () => window.removeEventListener("resize", updateWidth);
	}, []);

	const cols = Math.floor(width / 260);

	return (
		<div ref={masonryRef}>
			<Masonry
				breakpointCols={cols > 0 ? cols : 1}
				className="flex justify-center"
				columnClassName="max-w-[260px] bg-clip-padding"
			>
				{pins.map((pin, id) => (
					<Pin pin={pin} key={id} />
				))}
			</Masonry>
		</div>
	);
};

export default MasonryLayout;
