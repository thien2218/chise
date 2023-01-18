import Link from "next/link";
import ProfileImg from "../common/ProfileImg";
import { useValidation, useAuth } from "../../hooks";
import Checkbox from "../headlessui/Checkbox";
import VarcharField from "./VarcharField";
import TagsField from "./TagsField";

const ContentBuilder = ({
	children,
	tags,
	setValues,
	invalidUrlMsg,
	setInvalidUrlMsg,
}) => {
	const { checkUrl } = useValidation();
	const { authUser } = useAuth();

	const fields = [
		{
			name: "title",
			desc: "The first 40 characters that shows up in the pin feeds",
			maxCount: 100,
			placeholder: "Add your title",
		},
		{
			name: "description",
			desc: "People will see the first 100 characters of description when they click on your pin",
			maxCount: 750,
			placeholder: "Tell everyone about your pin",
		},
		{
			name: "tags",
			desc: "Tags will help everyone relate to your pins with ease",
			maxCount: 7,
			placeholder: "Add at least one tag for your pin",
		},
	];

	const handleCheck = (e) => {
		const { name, checked } = e.target;

		setValues((prev) => ({
			...prev,
			[name]: checked,
		}));
	};

	const handleChangeLink = (e) => {
		const { value } = e.target;

		if (checkUrl(value)) {
			setInvalidUrlMsg(
				'A valid URL must:\n- Start with "https://" or "http://"\n- Have a valid domain'
			);
		} else {
			setInvalidUrlMsg("");
			setValues((prev) => ({
				...prev,
				link: value,
			}));
		}
	};

	return (
		<div className="flex flex-col mlg:pl-10 min-w-0">
			<VarcharField isTitle setValues={setValues} {...fields[0]} />

			<div className="mt-3 flex items-center pr-3 gap-1">
				<Link href={`${authUser.username}/created`}>
					<a className="mx-1 rounded-full overflow-hidden h-11 w-11 relative">
						<ProfileImg
							profileUrl={authUser.profileUrl}
							username={authUser.username}
							size={11}
						/>
					</a>
				</Link>

				<Link href={`${authUser.username}/created`}>
					<a className="font-semibold text-sm">{authUser.name}</a>
				</Link>
			</div>

			<VarcharField setValues={setValues} {...fields[1]} />

			<div className="flex items-center gap-2 mt-2">
				<span>Disable comment section</span>
				<Checkbox
					name="cmtDisabled"
					handleCheck={handleCheck}
					srOnly="Disable comment"
				/>
			</div>

			<div className="flex-1 flex flex-col justify-end items-end gap-4">
				<TagsField setValues={setValues} tags={tags} {...fields[2]} />

				<div className="w-full">
					<input
						type="url"
						name="destination"
						placeholder="Add a destination link"
						className="w-full outline-none border-b-[1.5px] border-dimmed-700 pb-2 focus:border-blueish"
						onChange={handleChangeLink}
						style={{
							borderBottom: `${
								invalidUrlMsg && "1.5px solid var(--clr-primary)"
							}`,
						}}
					/>

					<span className="text-xs text-primary mt-[2px] h-14 block whitespace-pre-wrap leading-[18px]">
						{invalidUrlMsg}
					</span>
				</div>

				{children}
			</div>
		</div>
	);
};

export default ContentBuilder;
