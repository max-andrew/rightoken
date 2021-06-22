export default function RoundedLinkButton(props) {
	return (
		<div className="select-none">
			<a href={ typeof(props.link) !== "undefined" ? props.link : "/" }>
				<div className={`rounded-md shadow w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md cursor-pointer text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10 ${ props.className }`}>
					<p className={`${ props.textClassName }`}>
						{ typeof(props.text) !== "undefined" ? props.text : "Try it out" }
					</p>
				</div>
			</a>
		</div>
	)
}