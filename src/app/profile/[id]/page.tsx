export default function UserProfile ({params} :any) {
    return (
        <div className="">
            <p className="flex justify-center items-center text-4xl">ProfilePage <span className="bg-cyan-300 p-3">{params.id}</span></p>
        </div>
    )
}