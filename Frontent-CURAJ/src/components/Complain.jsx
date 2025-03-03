import { Images } from "../constants.astro";


export const Complain = ({ ...props }) => {
    const { complain } = props;
    return (<div key={complain._id} className="bg-white p-4 min-h-fit shadow rounded-lg flex items-center gap-4 border border-gray-200">
        <img
            src={Images.userIcon}
            alt="User"
            className={`w-12 h-12 rounded-full border-[1px] ${!complain?.isOpen ? 'border-red-500' : 'border-green-500'} `}
        />
        <a href={`/dashboard/reports/report/id?id=${complain._id}`} className="flex-1 overflow-hidden">
            <div className="flex gap-2 flex-wrap items-center justify-between">
                <h3 className="text-lg font-semibold">{complain.userDetails.username}</h3>
                <p className="text-xs text-gray-400">{new Date(complain.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex flex-row relative items-center gap-1">
                <div className="group cursor-pointer">
                    <div className={`red-dot  size-3 ${!complain?.isOpen ? 'bg-red-600' : 'bg-green-500'} rounded-full`}>
                    </div>
                    <div className="hidden top-0 left-5 absolute group-hover:flex bg-gray-700 text-white p-2 rounded-md">
                        <p>
                            <b>{complain?.isOpen ? 'Open' : 'Closed'}</b>
                        </p>
                    </div>
                </div>
                <p className="text-gray-600 font-medium">{complain.title}</p>
            </div>
            <p className="text-gray-500 text-sm truncate overflow-hidden">{complain.description}</p>
        </a>
        <a href={`/dashboard/reports/report/id?id=${complain._id}`} title="Reply">
            <img
                src="https://cdn-icons-png.flaticon.com/512/481/481675.png"
                alt="Reply Icon"
                className="w-6 h-6"
            />
        </a>
    </div >
    )
}