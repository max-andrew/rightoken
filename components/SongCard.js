import Link from 'next/link'

export default function SongCard(props) {
	return (
		<Link href={ "/song/" + (typeof(props.link) !== "undefined" ? props.link : "name") }>
			<div className="cursor-pointer overflow-hidden select-none shadow hover:shadow-lg active:shadow transition ease-in duration-200 ease-in-out rounded-2xl rounded-br-sm w-64 h-128">
				
				<img className="object-cover object-top h-48 w-full" src={ (typeof(props.img) !== "undefined" ? props.img : "/musician.jpg") } />
	
				<div className="flex justify-center py-5 px-3 text-center bg-white">
					<div className="flex flex-col font-semibold uppercase overflow-hidden whitespace-nowrap">
						<p className="text-2xl overflow-hidden overflow-ellipsis">
							{ typeof(props.song) !== "undefined" ? props.song : "Song Name" }
						</p>
						<p className="mt-1 text-sm font-mono overflow-hidden overflow-ellipsis">
							{ typeof(props.artist) !== "undefined" ? props.artist : "Artist" }
						</p>
					</div>
				</div>
				<div className="border-b-2 border-gray-100 mx-8" />
				<div className="py-4 bg-white">
					<p className="font-medium uppercase text-xs font-gray-200 font-mono text-center">
						Rightoken
					</p>
				</div>
			</div>
		</Link>
	)
}