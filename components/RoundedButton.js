export default function RoundedButton(props) {
	return (
		<div className={`rounded-md ${ props.className }`}>
			<a href={ typeof(props.link) !== "undefined" ? props.link : "/" } className="shadow w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10">
				{ typeof(props.text) !== "undefined" ? props.text : "Try it out" }
			</a>
		</div>
	)
}