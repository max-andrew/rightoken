export default function RoundedButton(props) {
	return (
		<div className={`rounded-md shadow h-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md cursor-pointer select-none text-white md:py-4 md:text-lg md:px-10 ${ [props.customBG ? "" : "bg-purple-600 hover:bg-purple-700",  props.className, props.outerDivClassName].join(' ') }`} onClick={ typeof(props.onClick) !== "undefined" ? props.onClick : "Try it out" }>
			<p className={`${ props.textClassName }`}>{ typeof(props.text) !== "undefined" ? props.text : "Try it out" }</p>
		</div>
	)
}