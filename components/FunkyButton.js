export default function FunkyButton(props) {
	const FunkyButtonButton = <button className={`uppercase tracking-wide font-bold text-sm md:text-md border-2 ${props.grayOut ? "text-zinc-400" : "text-zinc-600"} ${props.grayOut ? "border-zinc-400" : "border-zinc-600"} rounded px-4 py-2 bg-gradient-to-r ${props.grayOut ? "from-zinc-100 to-zinc-200" : "from-green-100 to-blue-200"} mix-blend-normal active:mix-blend-multiply shadow-xl active:shadow-md ${props.className}`} onClick={props.onClick}>{props.text}</button>

	if (!!props.link) {
		return (
			<form action={props.link}>
				{ FunkyButtonButton }
			</form>
		)
	}
	else {
		return (FunkyButtonButton)
	}
}