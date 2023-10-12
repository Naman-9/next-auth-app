export default function UserProfile ({params} :any) {
    return (
        <div>
            <h1>Profile Page</h1>
            <p className="text-4xl">ProfilePage <span className="bg-cyan-300 p-3">{params.id}</span></p>
        </div>
    )
}