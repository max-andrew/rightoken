export default function FunkyButton(props) {
	return (
		<form action={props.link}>
			<button className={`uppercase font-medium md:text-lg border-2 rounded px-4 py-2 bg-gradient-to-r from-green-100 to-blue-200 border-gray-700 mix-blend-multiply active:mix-blend-multiply hover:mix-blend-normal shadow-md active:shadow-md hover:shadow-xl ${props.className}`}>{props.text}</button>
		</form>
	)
}