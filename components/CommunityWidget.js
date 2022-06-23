export default function CommunityWidget(props) {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="flex flex-col justify-center items-center space-x-0 space-y-4 mt-10 sm:space-x-2 sm:space-y-0 sm:flex-row sm:space-x-8">
				<div>
					<a 
						className="flex flex-col p-2 h-36 w-72 rounded-md shadow hover:shadow-lg active:shadow transition ease-in duration-200 ease-in-out overflow-hidden sm:h-48 sm:w-48 sm:p-4"
						href="https://discord.gg/AZcKByZZ7j"
						rel="_blank"
					>
						<p className="h-6 pt-2 pl-2 font-medium text-lg sm:pt-1 sm:pl-0 sm:text-xl">Talk directly</p>
						<img
							className="flex mt-6 ml-32 h-32 w-auto sm:ml-0 sm:mt-16 sm:h-48"
							src="/discord-logo.svg"
						/>
					</a>
				</div>
				<div>
					<a 
						className="flex flex-col p-2 h-36 w-72 rounded-md shadow hover:shadow-lg active:shadow transition ease-in duration-200 ease-in-out overflow-hidden sm:h-48 sm:w-48 sm:p-4"
						href="https://twitter.com/rightoken"
						rel="_blank"
					>
						<p className="h-6 pt-2 pl-2 font-medium text-lg sm:pt-1 sm:pl-0 sm:text-xl">Get updates</p>
						<img
							className="flex mt-6 ml-32 h-32 w-auto sm:ml-0 sm:mt-16 sm:h-48"
							src="/twitter-logo.svg"
						/>
					</a>
				</div>
				<div>
					<a 
						className="flex flex-col p-2 h-32 w-72 rounded-md shadow hover:shadow-lg active:shadow transition ease-in duration-200 ease-in-out overflow-hidden sm:h-48 sm:w-48 sm:p-4"
						href="https://reddit.com/r/rightoken"
						rel="_blank"
					>
						<p className="h-6 pt-2 pl-2 font-medium text-lg sm:pt-1 sm:pl-0 sm:text-xl">Join the community</p>
						<img
							className="flex mt-6 ml-32 h-32 w-auto sm:ml-0 sm:mt-16 sm:h-48"
							src="/reddit-logo.svg"
						/>
					</a>
				</div>
			</div>
		</div>
	)
}